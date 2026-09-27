"""Shared harness for the render examiner tests (fixtures/render). Written by Claude Code; gates Codex's engine/render and
engine/providers/render (PRD §8A.3). The tests call the engine through its HTTP API only (render-spec.json → api).

Engine discovery:
  DRAWLOGIC_ENGINE_URL=http://host:port   a running engine; or
  engine.app:app                          the FastAPI app, imported in process (needed for the provider tests).
Neither → every engine test errors with "engine render API not available" — the right reason to fail before Prompt 5.
"""

from __future__ import annotations

import functools
import json
import os
import re
import sys
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

import pytest

ROOT = Path(__file__).resolve().parent.parent
REPO = ROOT.parent.parent
SPEC = json.loads((ROOT / "render-spec.json").read_text(encoding="utf-8"))
COPY = json.loads((REPO / "contracts" / "copy.json").read_text(encoding="utf-8"))
THRESHOLDS = json.loads((REPO / "contracts" / "render.thresholds.json").read_text(encoding="utf-8"))
DETAILS = sorted(p.name for p in (ROOT / "details").iterdir() if p.is_dir())
CONVENTIONS = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "conventions").glob("*.json"))}
SVG_NS = "{http://www.w3.org/2000/svg}"


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def ddl(detail: str) -> dict[str, Any]:
    return load(ROOT / "details" / detail / "input.ddl.json")


def expected(detail: str, kind: str) -> dict[str, Any]:
    return load(ROOT / "details" / detail / f"expected.{kind}.json")


# ----------------------------------------------------------------------------------------------------------------------
# Engine client


class Engine:
    def __init__(self) -> None:
        self.in_process = False
        url = os.environ.get(SPEC["api"]["base_url_env"])
        if url:
            import httpx

            self.client: Any = httpx.Client(base_url=url, timeout=600)
            return
        module, _, attr = SPEC["api"]["asgi_app"].partition(":")
        sys.path.insert(0, str(REPO))
        try:
            app = getattr(__import__(module, fromlist=[attr]), attr)
        except Exception as exc:  # noqa: BLE001 — any import failure means the engine is not there yet
            raise RuntimeError(f"engine render API not available: set {SPEC['api']['base_url_env']} or provide {SPEC['api']['asgi_app']} ({exc!r})") from exc
        from starlette.testclient import TestClient

        self.client = TestClient(app)
        self.in_process = True

    def post(self, endpoint: str, body: dict[str, Any]) -> Any:
        return self.client.post(SPEC["api"][endpoint]["path"], json=body)


@pytest.fixture(scope="session")
def engine() -> Engine:
    try:
        return Engine()
    except RuntimeError as exc:
        pytest.fail(str(exc), pytrace=False)


@pytest.fixture
def in_process_engine(engine: Engine) -> Engine:
    if not engine.in_process:
        pytest.fail(
            "provider tests set the fixture provider through the environment, so they need the in-process app "
            f"({SPEC['api']['asgi_app']}), not {SPEC['api']['base_url_env']}",
            pytrace=False,
        )
    return engine


@pytest.fixture
def fixture_provider(monkeypatch: pytest.MonkeyPatch) -> Any:
    fp = SPEC["api"]["fixture_provider"]

    def use(*, stills: list[str] | None = None, video: list[str] | None = None) -> None:
        monkeypatch.setenv(fp["env"], fp["value"])
        if stills is not None:
            monkeypatch.setenv(fp["image_env"], ",".join(str(ROOT / "fidelity" / s) for s in stills))
        if video is not None:
            monkeypatch.setenv(fp["video_outcomes_env"], ",".join(video))

    return use


@functools.cache
def _render_cached(kind: str, detail: str, conventions: str) -> tuple[int, bytes, str]:
    eng = Engine()
    r = eng.post(kind, {"ddl": ddl(detail), "conventions": CONVENTIONS[conventions]})
    return r.status_code, r.content, r.headers.get("content-type", "")


@pytest.fixture
def render(engine: Engine) -> Any:
    """render(kind, detail, conventions) → bytes, asserting a 200. Cached across tests for the same inputs."""

    def go(kind: str, detail: str, conventions: str = "gb-eng") -> bytes:
        status, content, ctype = _render_cached(kind, detail, conventions)
        assert status == 200, f"POST {SPEC['api'][kind]['path']} for {detail} returned {status}: {content[:300]!r}"
        return content

    return go


# ----------------------------------------------------------------------------------------------------------------------
# Banned words (trust rule 8): everywhere, compliance-claim patterns, outside Studio, and render/preview output.


def _word_re(w: str) -> re.Pattern[str]:
    return re.compile(r"\b" + re.escape(w).replace(r"\ ", r"[\s-]+") + r"\b", re.I)


BANNED = [
    (w, _word_re(w))
    for w in COPY["banned"] + COPY["banned_scoped"]["outside_studio_output"]["words"] + COPY["banned_scoped"]["render_and_preview_output"]["words"]
]
BANNED += [(p["id"], re.compile(p["pattern"], re.I if "i" in p["flags"] else 0)) for p in COPY["banned_patterns"]]


def banned_hits(text: str) -> list[str]:
    return [w for w, rx in BANNED if rx.search(text)]


# ----------------------------------------------------------------------------------------------------------------------
# SVG helpers


def tag(el: ET.Element) -> str:
    return el.tag.replace(SVG_NS, "")


def classes(el: ET.Element) -> set[str]:
    return set((el.get("class") or "").split())


def style_value(el: ET.Element, prop: str) -> str | None:
    if el.get(prop) is not None:
        return el.get(prop)
    for part in (el.get("style") or "").split(";"):
        k, _, v = part.partition(":")
        if k.strip() == prop:
            return v.strip()
    return None


def parse_svg(data: bytes) -> tuple[ET.Element, dict[ET.Element, ET.Element]]:
    root = ET.fromstring(data)
    parents = {child: parent for parent in root.iter() for child in parent}
    return root, parents


def inherited(el: ET.Element, prop: str, parents: dict[ET.Element, ET.Element]) -> str | None:
    node: ET.Element | None = el
    while node is not None:
        v = style_value(node, prop)
        if v is not None:
            return v
        node = parents.get(node)
    return None


def number(v: str | None) -> float | None:
    if v is None:
        return None
    m = re.match(r"\s*([0-9.]+)", v)
    return float(m.group(1)) if m else None


SHAPES = {"path", "polygon", "polyline", "rect", "line", "circle", "ellipse"}


def stroke_widths(group: ET.Element, parents: dict[ET.Element, ET.Element], *, exclude_class: str | None = None) -> list[float]:
    out = []
    for el in group.iter():
        if tag(el) not in SHAPES or (exclude_class and exclude_class in classes(el)):
            continue
        if (inherited(el, "stroke", parents) or "").lower() in ("", "none"):
            continue
        w = number(inherited(el, "stroke-width", parents))
        out.append(1.0 if w is None else w)
    return out


def all_text(root: ET.Element) -> str:
    parts = [t for t in root.itertext()]
    for el in root.iter():
        parts += [el.get(a) or "" for a in ("aria-label", "title")]
    return "\n".join(parts)

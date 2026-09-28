"""Shared harness for the render examiner tests (fixtures/render). Written by Claude Code; gates Codex's engine/render and
engine/providers/render (PRD §8A.3). The tests call the engine through its HTTP API only; every response is validated
against contracts/render-api.schema.json (render-spec.json → api).

Engine discovery:
  DRAWLOGIC_ENGINE_URL=http://host:port   a running engine (structure tests only); or
  engine.app:app                          the FastAPI app, imported in process.
Provider tests (stills, preview video) build their own app per case with engine.app:create_app(render_provider=...), so
the fixture provider is bound before the app exists and nothing carries over between jobs. With no engine, every engine
test errors with "engine render API not available" — the right reason to fail before Prompts 5 and 12.
"""

from __future__ import annotations

import functools
import importlib
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

import pytest
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

ROOT = Path(__file__).resolve().parent.parent
REPO = ROOT.parent.parent
SPEC = json.loads((ROOT / "render-spec.json").read_text(encoding="utf-8"))
COPY = json.loads((REPO / "contracts" / "copy.json").read_text(encoding="utf-8"))
THRESHOLDS = json.loads((REPO / "contracts" / "render.thresholds.json").read_text(encoding="utf-8"))
DETAILS = sorted(p.name for p in (ROOT / "details").iterdir() if p.is_dir())
CONVENTIONS = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "conventions").glob("*.json"))}
SVG_NS = "{http://www.w3.org/2000/svg}"
POLL_SECONDS = 120
sys.path.insert(0, str(REPO))


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def ddl(detail: str) -> dict[str, Any]:
    return load(ROOT / "details" / detail / "input.ddl.json")


def expected(detail: str, kind: str) -> dict[str, Any]:
    return load(ROOT / "details" / detail / f"expected.{kind}.json")


# ----------------------------------------------------------------------------------------------------------------------
# Contract validation of responses


@functools.cache
def _api_validator(definition: str) -> Draft202012Validator:
    schemas = [json.loads(p.read_text(encoding="utf-8")) for p in (REPO / "contracts").glob("*.schema.json")]
    registry = Registry().with_resources((s["$id"], Resource.from_contents(s)) for s in schemas)
    base = "https://drawlogic.invalid/contracts/render-api.schema.json"
    return Draft202012Validator({"$ref": f"{base}#/$defs/{definition}"}, registry=registry)


def api_valid(definition: str, document: Any) -> Any:
    """Asserts the document matches contracts/render-api.schema.json#/$defs/<definition> and returns it."""
    errors = [f"{'/'.join(map(str, e.absolute_path))}: {e.message}" for e in _api_validator(definition).iter_errors(document)]
    assert not errors, f"response does not match render-api {definition}: {errors[:5]}"
    return document


# ----------------------------------------------------------------------------------------------------------------------
# Engine clients


def _import(target: str) -> Any:
    module, _, attr = target.partition(":")
    try:
        return getattr(importlib.import_module(module), attr)
    except Exception as exc:  # noqa: BLE001 — any import failure means the engine is not there yet
        raise RuntimeError(f"engine render API not available: set {SPEC['api']['base_url_env']} or provide {target} ({exc!r})") from exc


class Engine:
    """Structure endpoints (SVG, DXF, PDF, artefacts): a running engine, or engine.app:app in process."""

    def __init__(self) -> None:
        url = os.environ.get(SPEC["api"]["base_url_env"])
        if url:
            import httpx

            self.client: Any = httpx.Client(base_url=url, timeout=600)
            return
        from starlette.testclient import TestClient

        self.client = TestClient(_import(SPEC["api"]["asgi_app"]))

    def post(self, endpoint: str, body: dict[str, Any]) -> Any:
        return self.client.post(SPEC["api"][endpoint]["path"], json=body)


class ProviderEngine:
    """A fresh in-process app with the fixture provider bound at construction (Codex review of PR #6, point 4)."""

    def __init__(self, *, stills: list[str] | None, video: list[str] | None) -> None:
        fp = SPEC["api"]["fixture_provider"]
        factory = _import(fp["app_factory"])
        provider = _import(fp["provider"])(stills=[str(ROOT / "fidelity" / s) for s in (stills or [])], video_outcomes=list(video or []))
        from starlette.testclient import TestClient

        self.client = TestClient(factory(**{fp["factory_kwarg"]: provider}))

    def submit(self, endpoint: str, body: dict[str, Any]) -> Any:
        """POST a job; returns the raw response (202 with job_accepted, or an error)."""
        return self.client.post(SPEC["api"][endpoint]["path"], json=body)

    def settle(self, accepted: dict[str, Any]) -> dict[str, Any]:
        """Polls the job until it is no longer queued or running; every status must match the contract."""
        api_valid("job_accepted", accepted)
        deadline = time.monotonic() + POLL_SECONDS
        while True:
            response = self.client.get(accepted["status_url"])
            assert response.status_code == 200, f"GET {accepted['status_url']} returned {response.status_code}: {response.text[:300]}"
            status = api_valid("job_status", response.json())
            if status["state"] not in ("queued", "running"):
                return status
            assert time.monotonic() < deadline, f"job {accepted['job_id']} did not settle within {POLL_SECONDS} s"
            time.sleep(0.05)

    def run(self, endpoint: str, body: dict[str, Any]) -> dict[str, Any]:
        response = self.submit(endpoint, body)
        assert response.status_code == 202, f"POST {SPEC['api'][endpoint]['path']} returned {response.status_code}: {response.text[:300]}"
        return self.settle(response.json())


@pytest.fixture(scope="session")
def engine() -> Engine:
    try:
        return Engine()
    except RuntimeError as exc:
        pytest.fail(str(exc), pytrace=False)


@pytest.fixture
def provider_engine() -> Any:
    """provider_engine(stills=[...], video=[...]) → a ProviderEngine with a fresh app and a fresh fixture provider."""

    def build(*, stills: list[str] | None = None, video: list[str] | None = None) -> ProviderEngine:
        try:
            return ProviderEngine(stills=stills, video=video)
        except RuntimeError as exc:
            pytest.fail(str(exc), pytrace=False)

    return build


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

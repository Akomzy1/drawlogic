"""Conditioning artefacts (PRD FR-50, FR-57a, 5A.3 hook 3): line-art, depth map and a material map keyed by material_id.
The material map is an ID map: exact colours, one per material, no blending."""

from __future__ import annotations

import base64
import io
import json

import numpy as np
import pytest
from conftest import DETAILS, api_valid, ddl, expected
from PIL import Image

MIN_VISIBLE_MM = 20  # objects thinner than this may vanish at artefact resolution; everything thicker must appear


def decode(b64: str) -> Image.Image:
    return Image.open(io.BytesIO(base64.b64decode(b64)))


@pytest.fixture
def artefacts(render):
    def load(detail: str):
        body = api_valid("artefacts_response", json.loads(render("artefacts", detail)))
        drawing = ddl(detail)["drawing"]
        assert body["drawing_hash"] == drawing["hash"] and body["drawing_rev"] == drawing["rev"], "FR-53: artefacts carry their drawing"
        return body

    return load


def hexrgb(h: str) -> tuple[int, int, int]:
    assert len(h) == 7 and h.startswith("#"), h
    return tuple(int(h[i : i + 2], 16) for i in (1, 3, 5))  # type: ignore[return-value]


@pytest.mark.parametrize("detail", DETAILS)
def test_images_align(artefacts, detail):
    a = artefacts(detail)
    sizes = {k: decode(a[k]).size for k in ("line_art", "depth", "material_map")}
    grid = (a["grid"]["width_px"], a["grid"]["height_px"])
    assert set(sizes.values()) == {grid}, f"artefacts must share the declared {grid} pixel grid: {sizes}"
    line = np.asarray(decode(a["line_art"]).convert("L"))
    assert line.min() < 128 < line.max(), "line-art is blank"


@pytest.mark.parametrize("detail", DETAILS)
def test_material_map_is_keyed_by_material_id(artefacts, detail):
    a = artefacts(detail)
    legend = a["legend"]
    assert sorted(legend) == expected(detail, "artefacts")["legend_material_ids"], "legend must name exactly the drawing's materials"
    colours = [hexrgb(v) for v in legend.values()]
    assert len(set(colours)) == len(colours), "each material needs its own colour"
    img = np.asarray(decode(a["material_map"]).convert("RGB")).reshape(-1, 3)
    present = {tuple(int(c) for c in px) for px in np.unique(img, axis=0)}
    extra = present - set(colours) - {hexrgb(a["background"])}
    assert not extra, f"material map has colours outside the legend and background (blending or anti-aliasing?): {sorted(extra)[:5]}"
    thick = set()
    for o in ddl(detail)["objects"]:
        pts = o["geometry"]["points"]
        w = max(p[0] for p in pts) - min(p[0] for p in pts)
        h = max(p[1] for p in pts) - min(p[1] for p in pts)
        if o["material_id"] and min(w, h) >= MIN_VISIBLE_MM:
            thick.add(o["material_id"])
    missing = [m for m in thick if hexrgb(legend[m]) not in present]
    assert not missing, f"materials drawn at {MIN_VISIBLE_MM} mm or more are absent from the material map: {missing}"

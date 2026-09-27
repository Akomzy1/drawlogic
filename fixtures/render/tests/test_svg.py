"""SVG structure goldens (PRD FR-20, FR-24, FR-41, FR-57): layers, provenance-carrying objects, hatching, dimensions,
leaders and line weights, all driven by profile conventions. Structure is compared, never pixels."""

from __future__ import annotations

import statistics

import pytest
from conftest import CONVENTIONS, DETAILS, all_text, banned_hits, classes, expected, inherited, parse_svg, stroke_widths, tag

CASES = [(d, c) for d in DETAILS for c in CONVENTIONS]


def groups(root, cls):
    return [el for el in root.iter() if tag(el) == "g" and cls in classes(el)]


@pytest.mark.parametrize("detail,conv", CASES)
def test_root_carries_drawing_identity(render, detail, conv):
    root, _ = parse_svg(render("svg", detail, conv))
    exp = expected(detail, "svg")
    assert tag(root) == "svg"
    assert root.get("data-drawing-id") == exp["drawing_id"]
    assert root.get("data-drawing-hash") == exp["drawing_hash"], "FR-53: every output carries the drawing hash it came from"
    assert root.get("data-rev") == exp["rev"]


@pytest.mark.parametrize("detail,conv", CASES)
def test_layers_match_the_ddl(render, detail, conv):
    root, _ = parse_svg(render("svg", detail, conv))
    got = [(g.get("data-layer-id"), g.get("data-layer-name")) for g in groups(root, "layer")]
    want = [(layer["id"], layer["name"]) for layer in expected(detail, "svg")["layers"]]
    assert sorted(got) == sorted(want)


@pytest.mark.parametrize("detail,conv", CASES)
def test_every_object_is_drawn_on_its_layer_with_provenance(render, detail, conv):
    root, parents = parse_svg(render("svg", detail, conv))
    objs = {g.get("data-object-id"): g for g in groups(root, "object")}
    for o in expected(detail, "svg")["objects"]:
        g = objs.get(o["id"])
        assert g is not None, f"object {o['id']} not drawn"
        assert g.get("data-source") == o["source"], f"FR-41 provenance: {o['id']}"
        assert g.get("data-verify") == str(o["verify"]).lower(), f"FR-40 verify flag: {o['id']}"
        assert (g.get("data-material-id") or None) == o["material_id"], o["id"]
        layer = parents.get(g)
        while layer is not None and "layer" not in classes(layer):
            layer = parents.get(layer)
        assert layer is not None and layer.get("data-layer-id") == o["layer_id"], f"{o['id']} not on layer {o['layer_id']}"
        assert any(tag(el) in {"path", "polygon", "polyline", "rect"} for el in g.iter()), f"{o['id']} has no geometry"


@pytest.mark.parametrize("detail,conv", CASES)
def test_hatching_follows_material_category(render, detail, conv):
    root, parents = parse_svg(render("svg", detail, conv))
    patterns = {el.get("id") for el in root.iter() if tag(el) == "pattern"}
    objs = {g.get("data-object-id"): g for g in groups(root, "object")}
    by_category: dict[str, set[str]] = {}
    for o in expected(detail, "svg")["objects"]:
        fills = {(inherited(el, "fill", parents) or "") for el in objs[o["id"]].iter() if tag(el) in {"path", "polygon", "rect"}}
        refs = {f[5:-1] for f in fills if f.startswith("url(#") and f.endswith(")")}
        hatches = refs & patterns
        if o["hatch_category"]:
            assert len(hatches) == 1, f"{o['id']} ({o['hatch_category']}) must be hatched with one pattern, found {hatches or fills}"
            by_category.setdefault(o["hatch_category"], set()).update(hatches)
    for category, ids in by_category.items():
        assert len(ids) == 1, f"every {category} object must share one hatch pattern, found {ids}"
    assert len({next(iter(v)) for v in by_category.values()}) == len(by_category), "different categories must use different hatches"


@pytest.mark.parametrize("detail,conv", CASES)
def test_dimensions_use_the_conventions(render, detail, conv):
    root, _ = parse_svg(render("svg", detail, conv))
    dims = {g.get("data-dimension-id"): g for g in groups(root, "dimension")}
    for d in expected(detail, "svg")["dimensions"]:
        g = dims.get(d["id"])
        assert g is not None, f"dimension {d['id']} not drawn"
        text = " ".join("".join(el.itertext()).strip() for el in g.iter() if tag(el) == "text").strip()
        assert text == d["text"][conv], f"{d['id']}: text {text!r}, conventions {conv} give {d['text'][conv]!r}"
        term = d["terminator"][conv]
        terminators = [el for el in g.iter() if "terminator" in classes(el)]
        assert len(terminators) >= 2, f"{d['id']}: dimension needs two terminators"
        assert all(f"terminator-{term}" in classes(el) for el in terminators), f"{d['id']}: conventions {conv} require {term} terminators"


@pytest.mark.parametrize("detail,conv", CASES)
def test_annotations_are_leaders_with_their_text(render, detail, conv):
    root, _ = parse_svg(render("svg", detail, conv))
    anns = {g.get("data-annotation-id"): g for g in groups(root, "annotation")}
    for a in expected(detail, "svg")["annotations"]:
        g = anns.get(a["id"])
        assert g is not None, f"annotation {a['id']} not drawn"
        text = " ".join(" ".join(el.itertext()).split() for el in g.iter() if tag(el) == "text").strip()
        assert a["text"] in text, f"{a['id']}: expected {a['text']!r}, found {text!r}"
        if a["leader"]:
            assert any("leader" in classes(el) for el in g.iter()), f"{a['id']}: leader line missing"


@pytest.mark.parametrize("detail,conv", CASES)
def test_line_weights_follow_the_conventions(render, detail, conv):
    root, parents = parse_svg(render("svg", detail, conv))
    weights = CONVENTIONS[conv]["line_weights_mm"]
    measured: dict[str, float] = {}
    for layer in groups(root, "layer"):
        widths = [w for obj in layer.iter() if "object" in classes(obj) for w in stroke_widths(obj, parents)]
        if widths:
            measured[layer.get("data-layer-name")] = statistics.median(widths)
    dim_widths = [w for g in groups(root, "dimension") for w in stroke_widths(g, parents, exclude_class="terminator")]
    if dim_widths:
        measured["A-Dims"] = statistics.median(dim_widths)
    names = [n for n in measured if n in weights]
    assert len(names) >= 2, f"need at least two weighted layers to compare, measured {measured}"
    ref = names[0]
    for n in names[1:]:
        want = weights[n] / weights[ref]
        got = measured[n] / measured[ref]
        assert abs(got - want) <= 0.05 * want, f"{n}/{ref} stroke ratio {got:.3f}, conventions {conv} give {want:.3f}"


@pytest.mark.parametrize("detail", DETAILS)
def test_no_banned_words(render, detail):
    root, _ = parse_svg(render("svg", detail, "gb-eng"))
    assert banned_hits(all_text(root)) == []

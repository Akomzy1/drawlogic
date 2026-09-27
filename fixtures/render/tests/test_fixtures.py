"""The fixtures themselves are valid and current. Runs green before any renderer exists (Prompt 2 gate: fixtures validate)."""

from __future__ import annotations

import importlib.util

from conftest import CONVENTIONS, DETAILS, ROOT, expected

FR23 = {
    "window_head",
    "window_jamb",
    "window_sill",
    "door_threshold",
    "eaves",
    "verge",
    "parapet",
    "warm_flat_roof_abutment",
    "ground_floor_wall_dpc",
    "cavity_closer",
    "wall_to_foundation",
    "balcony_threshold",
    "steel_beam_bearing",
}


def _build():
    spec = importlib.util.spec_from_file_location("build", ROOT / "scripts" / "build.py")
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_every_fr23_detail_type_has_fixtures() -> None:
    assert set(DETAILS) == FR23


def test_generated_files_are_current_and_valid() -> None:
    # outputs() validates every DDL against contracts/ddl.schema.json, both conventions against the profile schema,
    # recomputes every drawing hash (RFC 8785) and proves the fidelity fixtures separate at the contract threshold.
    build = _build()
    files = build.outputs()
    stale = [str(p) for p, data in files.items() if not build.same(p, data)]
    assert not stale, f"run python fixtures/render/scripts/build.py: {stale}"


def test_conventions_differ_where_the_renderer_must_follow_them() -> None:
    gb, variant = CONVENTIONS["gb-eng"], CONVENTIONS["variant"]
    assert gb["dimension_style"]["terminator"] != variant["dimension_style"]["terminator"]
    assert gb["dimension_style"]["precision"] != variant["dimension_style"]["precision"]
    ratios = {c: v["line_weights_mm"]["A-Walls"] / v["line_weights_mm"]["A-Openings"] for c, v in CONVENTIONS.items()}
    assert ratios["gb-eng"] != ratios["variant"]


def test_goldens_cover_every_object_dimension_and_annotation() -> None:
    for detail in DETAILS:
        svg = expected(detail, "svg")
        assert svg["objects"] and svg["dimensions"] and svg["annotations"], detail
    # The provenance attributes are only tested if some fixtures carry verify objects and several sources.
    assert sum(any(o["verify"] for o in expected(d, "svg")["objects"]) for d in DETAILS) >= 5
    assert {o["source"] for d in DETAILS for o in expected(d, "svg")["objects"]} >= {"user", "profile", "ai_inferred"}

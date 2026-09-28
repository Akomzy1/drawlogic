"""Builds the render fixtures: one resolved DDL per FR-23 detail type, its structural goldens, and the fidelity images.

usage: python fixtures/render/scripts/build.py [--check]
--check regenerates into memory and fails if any committed file differs (CI).

Examiner fixtures for Codex's engine/render and engine/providers/render (PRD §8A.3). Derived from the PRD and the
contract, not from any renderer. Geometry is illustrative drawing geometry for testing structure; it is not design
guidance, and sizes of structural elements are marked as supplied by the user (never invented by Drawlogic).
"""

from __future__ import annotations

import io
import json
import sys
import uuid
from pathlib import Path
from typing import Any

import rfc8785
from jsonschema import Draft202012Validator
from PIL import Image, ImageDraw
from referencing import Registry, Resource

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from engine.core.ddl import validate as core_validate  # noqa: E402 — the real core validator (issue #12)

ROOT = Path(__file__).resolve().parent.parent
REPO = ROOT.parent.parent
CONTRACTS = REPO / "contracts"

# ---------------------------------------------------------------------------------------------------------------------
# Materials. category drives hatching (render-spec.json); basis follows FR-163.

MATERIALS: dict[str, dict[str, Any]] = {
    "brick_facing": {"name": "Facing brick", "category": "masonry"},
    "block_dense": {"name": "Dense concrete block", "category": "masonry"},
    "pir_board": {"name": "PIR insulation board", "category": "insulation"},
    "mineral_wool": {"name": "Mineral wool quilt", "category": "insulation"},
    "closer_ins": {"name": "Insulated cavity closer", "category": "insulation"},
    "concrete_c25": {"name": "Concrete", "category": "concrete"},
    "lean_mix": {"name": "Lean-mix concrete cavity fill", "category": "concrete"},
    "sand_cement_screed": {"name": "Sand and cement screed", "category": "screed"},
    "plasterboard_skim": {"name": "Plasterboard and skim", "category": "finish"},
    "timber_sw": {"name": "Softwood timber", "category": "timber"},
    "timber_door": {"name": "Timber door leaf", "category": "timber"},
    "steel_lintel": {"name": "Steel cavity lintel", "category": "steel"},
    "steel_section": {"name": "Steel beam (engineer's schedule)", "category": "steel"},
    "dpc_polymer": {"name": "Polymer damp-proof course", "category": "dpc"},
    "dpm_sheet": {"name": "Damp-proof membrane", "category": "membrane"},
    "vcl_sheet": {"name": "Vapour control layer", "category": "membrane"},
    "bitumen_membrane": {"name": "Reinforced bitumen membrane", "category": "membrane"},
    "lead_flashing": {"name": "Lead cover flashing", "category": "metal"},
    "alu_coping": {"name": "Aluminium coping", "category": "metal", "basis": "colour_code", "colour_ref": {"system": "RAL", "code": "7016", "value": None}},
    "alu_threshold": {"name": "Aluminium threshold", "category": "metal"},
    "upvc_frame": {"name": "uPVC window frame", "category": "frame"},
    "glazing_dg": {"name": "Double glazed unit", "category": "glazing"},
    "stone_sill": {"name": "Reconstituted stone sill", "category": "stone"},
    "concrete_paving": {"name": "Concrete paving slab", "category": "stone"},
    "roof_tile": {"name": "Concrete roof tile", "category": "tile"},
    "fibre_cement": {"name": "Fibre cement undercloak", "category": "board"},
    "upvc_trim": {"name": "uPVC dry verge trim", "category": "trim"},
    "upvc_gutter": {"name": "uPVC gutter", "category": "trim"},
    "thermal_break": {"name": "Structural thermal break unit", "category": "insulation"},
    "granular_backfill": {"name": "Backfill", "category": "earth"},
    "topsoil": {"name": "Topsoil", "category": "earth"},
}

GB = {"id": "gb-eng-residential", "version": "0.1.0"}
LAYERS = {
    "walls": "A-Walls",
    "roof": "A-Roof",
    "floor": "A-Floor",
    "structure": "A-Structure",
    "openings": "A-Openings",
    "ground": "A-Ground",
    "anno": "A-Anno",
}


def rect(x0: float, y0: float, x1: float, y1: float) -> list[list[float]]:
    return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]


def obj(
    oid: str, cls: str, label: str, mat: str | None, layer: str, pts: list[list[float]], *, src: str = "user", conf: float = 1.0, note: str | None = None
) -> dict[str, Any]:
    return {"id": oid, "class": cls, "label": label, "mat": mat, "layer": layer, "pts": pts, "src": src, "conf": conf, "note": note}


def cavity_wall(y0: float, y1: float, suffix: str = "", *, plaster: bool = True, plan: bool = False) -> list[dict[str, Any]]:
    """The GB-ENG default build-up (construction_defaults gb_cavity_brick_block): brick / cavity / PIR / block / finish."""
    bands = [
        ("brick", "masonry", "Outer leaf", "brick_facing", 0, 102.5),
        ("cavity", "cavity", "Residual cavity", None, 102.5, 152.5),
        ("ins", "insulation", "Cavity insulation", "pir_board", 152.5, 252.5),
        ("block", "masonry", "Inner leaf", "block_dense", 252.5, 352.5),
    ]
    if plaster:
        bands.append(("plaster", "finish", "Internal finish", "plasterboard_skim", 352.5, 365))
    out = []
    for key, cls, label, mat, a, b in bands:
        pts = rect(y0, a, y1, b) if plan else rect(a, y0, b, y1)
        out.append(obj(f"{key}{suffix}", cls, label, mat, "walls", pts, src="profile" if key in ("ins", "plaster") else "user"))
    return out


def dim(did: str, axis: str, a: tuple[str, str], b: tuple[str, str], *, src: str = "user") -> dict[str, Any]:
    return {"id": did, "axis": axis, "a": a, "b": b, "src": src}


def ann(aid: str, target: str, text: str) -> dict[str, Any]:
    return {"id": aid, "target": target, "text": text}


INFERRED = {"src": "ai_inferred", "conf": 0.7, "note": "Position read from the reference; confirm on site."}
ENGINEER = "Size supplied by the user from the structural engineer's schedule; Drawlogic never sizes structure."

# ---------------------------------------------------------------------------------------------------------------------
# The thirteen detail types listed in PRD FR-23.

DETAILS: dict[str, dict[str, Any]] = {
    "window_head": {
        "title": "Window head, cavity wall",
        "objects": [
            *[o for o in cavity_wall(604, 1200) if o["id"] != "plaster"],
            obj("plaster", "finish", "Internal finish", "plasterboard_skim", "walls", rect(352.5, 454, 365, 1200), src="profile"),
            obj("lintel", "lintel", "Steel cavity lintel", "steel_lintel", "structure", rect(0, 560, 252.5, 600), note=ENGINEER),
            obj("tray", "dpc", "Cavity tray", "dpc_polymer", "walls", rect(0, 600, 252.5, 604)),
            obj("inner_lintel", "lintel", "Inner leaf lintel", "concrete_c25", "structure", rect(252.5, 454, 352.5, 604), note=ENGINEER),
            obj("frame", "window_frame", "Window frame head", "upvc_frame", "openings", rect(60, 400, 200, 560), **INFERRED),
            obj("glass", "glazing", "Glazing", "glazing_dg", "openings", rect(100, 0, 160, 400)),
        ],
        "dims": [
            dim("wall_total", "h", ("brick", "min"), ("plaster", "max")),
            dim("frame_setback", "h", ("brick", "min"), ("frame", "min"), src="ai_inferred"),
        ],
        "anns": [
            ann("an_lintel", "lintel", "Steel cavity lintel"),
            ann("an_tray", "tray", "Cavity tray with stop ends"),
            ann("an_frame", "frame", "Frame set back 60 (to be confirmed)"),
        ],
    },
    "window_jamb": {
        "title": "Window jamb, plan",
        "objects": [
            *cavity_wall(300, 900, plan=True),
            obj("closer", "cavity_closer", "Insulated cavity closer", "closer_ins", "walls", rect(260, 102.5, 300, 252.5)),
            obj("frame", "window_frame", "Window frame jamb", "upvc_frame", "openings", rect(140, 40, 260, 110), **INFERRED),
            obj("glass", "glazing", "Glazing", "glazing_dg", "openings", rect(0, 60, 140, 90)),
        ],
        "dims": [dim("wall_total", "v", ("brick", "min"), ("plaster", "max")), dim("closer_width", "h", ("closer", "min"), ("brick", "min"))],
        "anns": [ann("an_closer", "closer", "Insulated cavity closer"), ann("an_frame", "frame", "Frame overlaps closer (to be confirmed)")],
    },
    "window_sill": {
        "title": "Window sill, cavity wall",
        "objects": [
            *cavity_wall(0, 596),
            obj("dpc", "dpc", "DPC under sill", "dpc_polymer", "walls", rect(0, 596, 120, 600)),
            obj("sill", "sill", "External sill", "stone_sill", "openings", [[-40, 600], [120, 600], [120, 640], [-40, 620]]),
            obj("frame", "window_frame", "Window frame sill", "upvc_frame", "openings", rect(100, 640, 220, 720), **INFERRED),
            obj("board", "window_board", "Window board", "timber_sw", "openings", rect(252.5, 700, 400, 725)),
        ],
        "dims": [dim("wall_total", "h", ("brick", "min"), ("plaster", "max")), dim("sill_projection", "h", ("sill", "min"), ("brick", "min"))],
        "anns": [ann("an_sill", "sill", "Sill falls outward with drip"), ann("an_dpc", "dpc", "DPC under sill turned up at back")],
    },
    "door_threshold": {
        "title": "Door threshold",
        "objects": [
            obj("paving", "paving", "External paving", "concrete_paving", "ground", rect(-600, -200, 0, -150)),
            obj("brick", "masonry", "Outer leaf below threshold", "brick_facing", "walls", rect(0, -600, 102.5, -30)),
            obj("dpc", "dpc", "DPC below threshold", "dpc_polymer", "walls", rect(0, -30, 180, -20)),
            obj("threshold", "threshold", "Threshold", "alu_threshold", "openings", rect(0, -20, 180, 0)),
            obj("door_frame", "door_frame", "Door frame", "timber_sw", "openings", rect(60, 0, 180, 300), **INFERRED),
            obj("door_leaf", "door_leaf", "Door leaf", "timber_door", "openings", rect(90, 10, 130, 300)),
            obj("slab", "slab", "Floor slab", "concrete_c25", "floor", rect(180, -300, 1000, -150)),
            obj("floor_ins", "insulation", "Floor insulation", "pir_board", "floor", rect(180, -150, 1000, -75), src="profile"),
            obj("screed", "screed", "Screed", "sand_cement_screed", "floor", rect(180, -75, 1000, 0)),
        ],
        "dims": [dim("step", "v", ("paving", "max"), ("screed", "max")), dim("frame_setback", "h", ("brick", "min"), ("door_frame", "min"), src="ai_inferred")],
        "anns": [ann("an_threshold", "threshold", "Aluminium threshold"), ann("an_dpc", "dpc", "DPC linked to floor DPM")],
    },
    "eaves": {
        "title": "Eaves, pitched roof",
        "objects": [
            *cavity_wall(0, 400),
            obj("wall_plate", "wall_plate", "Wall plate", "timber_sw", "roof", rect(252.5, 400, 352.5, 450)),
            obj("rafter", "rafter", "Rafter", "timber_sw", "roof", [[-300, 250], [600, 775], [600, 925], [-300, 400]]),
            obj("joist", "ceiling_joist", "Ceiling joist", "timber_sw", "roof", rect(252.5, 450, 900, 550)),
            obj("loft_ins", "insulation", "Loft insulation", "mineral_wool", "roof", rect(450, 550, 900, 650), src="profile"),
            obj("tiles", "roof_tile", "Roof tiles", "roof_tile", "roof", [[-350, 400], [600, 954], [600, 974], [-350, 420]], src="profile"),
            obj("fascia", "fascia", "Fascia", "timber_sw", "roof", rect(-320, 230, -300, 400)),
            obj("gutter", "gutter", "Gutter", "upvc_gutter", "roof", rect(-420, 300, -320, 360)),
        ],
        "dims": [dim("overhang", "h", ("fascia", "min"), ("brick", "min")), dim("wall_total", "h", ("brick", "min"), ("plaster", "max"))],
        "anns": [ann("an_plate", "wall_plate", "Wall plate strapped to inner leaf"), ann("an_loft", "loft_ins", "Loft insulation (profile default)")],
    },
    "verge": {
        "title": "Verge at gable",
        "objects": [
            *cavity_wall(0, 600),
            obj("undercloak", "undercloak", "Undercloak", "fibre_cement", "roof", rect(-50, 620, 300, 630)),
            obj("battens", "batten", "Tile battens", "timber_sw", "roof", rect(-50, 630, 1000, 655)),
            obj("tiles", "roof_tile", "Roof tiles", "roof_tile", "roof", rect(-50, 655, 1000, 675), src="profile"),
            obj("verge_trim", "verge_trim", "Dry verge trim", "upvc_trim", "roof", rect(-70, 610, -50, 690)),
            obj("rafter", "rafter", "Gable rafter", "timber_sw", "roof", rect(365, 480, 415, 630)),
        ],
        "dims": [dim("verge_overhang", "h", ("verge_trim", "min"), ("brick", "min")), dim("wall_total", "h", ("brick", "min"), ("plaster", "max"))],
        "anns": [ann("an_trim", "verge_trim", "Dry verge trim"), ann("an_undercloak", "undercloak", "Undercloak")],
    },
    "parapet": {
        "title": "Parapet at warm flat roof",
        "objects": [
            *cavity_wall(-300, 900, plaster=False),
            obj("deck", "deck", "Roof deck", "concrete_c25", "roof", rect(352.5, 0, 1400, 150)),
            obj("vcl", "membrane", "Vapour control layer", "vcl_sheet", "roof", rect(352.5, 150, 1400, 154), src="profile"),
            obj("roof_ins", "insulation", "Roof insulation", "pir_board", "roof", rect(352.5, 154, 1400, 294), **INFERRED),
            obj("membrane", "membrane", "Roof membrane", "bitumen_membrane", "roof", rect(352.5, 294, 1400, 300)),
            obj("upstand", "upstand", "Membrane upstand", "bitumen_membrane", "roof", rect(352.5, 300, 358.5, 450)),
            obj("dpc", "dpc", "DPC under coping", "dpc_polymer", "walls", rect(0, 900, 352.5, 904)),
            obj("coping", "coping", "Coping", "alu_coping", "walls", [[-40, 904], [392.5, 904], [392.5, 944], [-40, 960]]),
        ],
        "dims": [
            dim("upstand_height", "v", ("membrane", "max"), ("upstand", "max")),
            dim("parapet_height", "v", ("membrane", "max"), ("coping", "max")),
            dim("coping_overhang", "h", ("coping", "min"), ("brick", "min")),
        ],
        "anns": [
            ann("an_coping", "coping", "Aluminium coping RAL 7016"),
            ann("an_upstand", "upstand", "Membrane upstand"),
            ann("an_ins", "roof_ins", "Roof insulation (to be confirmed)"),
        ],
    },
    "warm_flat_roof_abutment": {
        "title": "Warm flat roof abutment",
        "objects": [
            obj("brick_lower", "masonry", "Outer leaf", "brick_facing", "walls", rect(0, 0, 102.5, 460)),
            obj("tray", "dpc", "Cavity tray", "dpc_polymer", "walls", rect(0, 460, 152.5, 464)),
            obj("brick_upper", "masonry", "Outer leaf", "brick_facing", "walls", rect(0, 464, 102.5, 1200)),
            obj("cavity_lower", "cavity", "Residual cavity", None, "walls", rect(102.5, 0, 152.5, 460)),
            obj("cavity_upper", "cavity", "Residual cavity", None, "walls", rect(102.5, 464, 152.5, 1200)),
            obj("ins", "insulation", "Cavity insulation", "pir_board", "walls", rect(152.5, 0, 252.5, 1200), src="profile"),
            obj("block", "masonry", "Inner leaf", "block_dense", "walls", rect(252.5, 0, 352.5, 1200)),
            obj("plaster", "finish", "Internal finish", "plasterboard_skim", "walls", rect(352.5, 0, 365, 1200), src="profile"),
            obj("deck", "deck", "Roof deck", "concrete_c25", "roof", rect(-1200, 0, 0, 150)),
            obj("vcl", "membrane", "Vapour control layer", "vcl_sheet", "roof", rect(-1200, 150, 0, 154), src="profile"),
            obj("roof_ins", "insulation", "Roof insulation", "pir_board", "roof", rect(-1200, 154, 0, 294)),
            obj("membrane", "membrane", "Roof membrane", "bitumen_membrane", "roof", rect(-1200, 294, 0, 300)),
            obj("upstand", "upstand", "Membrane upstand", "bitumen_membrane", "roof", rect(-6, 300, 0, 450)),
            obj("flashing", "flashing", "Cover flashing", "lead_flashing", "roof", rect(-25, 400, -6, 458)),
        ],
        "dims": [dim("upstand_height", "v", ("membrane", "max"), ("upstand", "max")), dim("wall_total", "h", ("brick_lower", "min"), ("plaster", "max"))],
        "anns": [ann("an_tray", "tray", "Cavity tray above roof level"), ann("an_flashing", "flashing", "Lead cover flashing over upstand")],
    },
    "ground_floor_wall_dpc": {
        "title": "Ground floor and wall junction with DPC",
        "objects": [
            obj("external_ground", "external_ground", "External ground", "topsoil", "ground", rect(-600, -400, 0, 0)),
            obj("brick_lower", "masonry", "Outer leaf below DPC", "brick_facing", "walls", rect(0, -400, 102.5, 150)),
            obj("dpc_outer", "dpc", "DPC outer leaf", "dpc_polymer", "walls", rect(0, 150, 102.5, 155)),
            obj("brick_upper", "masonry", "Outer leaf", "brick_facing", "walls", rect(0, 155, 102.5, 600)),
            obj("cavity_fill", "cavity_fill", "Cavity fill below ground", "lean_mix", "walls", rect(102.5, -400, 252.5, 0)),
            obj("cavity", "cavity", "Residual cavity", None, "walls", rect(102.5, 0, 152.5, 600)),
            obj("ins", "insulation", "Cavity insulation", "pir_board", "walls", rect(152.5, 0, 252.5, 600), src="profile"),
            obj("block_lower", "masonry", "Inner leaf below DPC", "block_dense", "walls", rect(252.5, -400, 352.5, 150)),
            obj("dpc_inner", "dpc", "DPC inner leaf", "dpc_polymer", "walls", rect(252.5, 150, 352.5, 155)),
            obj("block_upper", "masonry", "Inner leaf", "block_dense", "walls", rect(252.5, 155, 352.5, 600)),
            obj("plaster", "finish", "Internal finish", "plasterboard_skim", "walls", rect(352.5, 175, 365, 600), src="profile"),
            obj("dpm", "membrane", "Damp-proof membrane", "dpm_sheet", "floor", rect(365, -154, 1400, -150)),
            obj("slab", "slab", "Floor slab", "concrete_c25", "floor", rect(365, -150, 1400, 0)),
            obj("floor_ins", "insulation", "Floor insulation", "pir_board", "floor", rect(365, 0, 1400, 100), **INFERRED),
            obj("screed", "screed", "Screed", "sand_cement_screed", "floor", rect(365, 100, 1400, 175)),
        ],
        "dims": [
            dim("dpc_height", "v", ("external_ground", "max"), ("dpc_outer", "min")),
            dim("ffl", "v", ("external_ground", "max"), ("screed", "max")),
            dim("wall_total", "h", ("brick_lower", "min"), ("plaster", "max")),
        ],
        "anns": [
            ann("an_dpc", "dpc_outer", "DPC 150 above ground"),
            ann("an_fill", "cavity_fill", "Lean-mix cavity fill"),
            ann("an_ins", "floor_ins", "Floor insulation (to be confirmed)"),
        ],
    },
    "cavity_closer": {
        "title": "Cavity closer at opening, plan",
        "objects": [
            *cavity_wall(300, 900, plan=True),
            obj("closer", "cavity_closer", "Insulated cavity closer", "closer_ins", "walls", rect(260, 102.5, 300, 252.5)),
            obj("reveal", "finish", "Reveal finish", "plasterboard_skim", "walls", rect(290, 252.5, 300, 365), src="profile"),
            obj("frame", "window_frame", "Frame", "upvc_frame", "openings", rect(160, 40, 260, 120), **INFERRED),
        ],
        "dims": [dim("closer_width", "h", ("closer", "min"), ("brick", "min")), dim("wall_total", "v", ("brick", "min"), ("plaster", "max"))],
        "anns": [ann("an_closer", "closer", "Insulated cavity closer"), ann("an_reveal", "reveal", "Reveal finish")],
    },
    "wall_to_foundation": {
        "title": "Wall to strip foundation",
        "objects": [
            obj("footing", "foundation", "Strip foundation", "concrete_c25", "structure", rect(-150, -1000, 515, -775), note=ENGINEER),
            obj("backfill", "backfill", "Backfill", "granular_backfill", "ground", rect(-600, -775, 0, 0)),
            obj("block_outer", "masonry", "Trench block, outer", "block_dense", "walls", rect(0, -775, 102.5, -150)),
            obj("cavity_fill", "cavity_fill", "Cavity fill", "lean_mix", "walls", rect(102.5, -775, 252.5, -225)),
            obj("block_inner", "masonry", "Trench block, inner", "block_dense", "walls", rect(252.5, -775, 352.5, -150)),
            obj("brick", "masonry", "Outer leaf", "brick_facing", "walls", rect(0, -150, 102.5, 300)),
        ],
        "dims": [dim("foundation_depth", "v", ("footing", "min"), ("backfill", "max")), dim("footing_width", "h", ("footing", "min"), ("footing", "max"))],
        "anns": [ann("an_footing", "footing", "Strip foundation to engineer's design"), ann("an_fill", "cavity_fill", "Lean-mix cavity fill")],
    },
    "balcony_threshold": {
        "title": "Balcony threshold",
        "objects": [
            obj("slab", "slab", "Internal slab", "concrete_c25", "structure", rect(0, -250, 1200, -75)),
            obj("break", "thermal_break", "Thermal break unit", "thermal_break", "structure", rect(-80, -250, 0, 0), note=ENGINEER),
            obj("balcony", "slab", "Balcony slab", "concrete_c25", "structure", [[-1500, -250], [-80, -250], [-80, -40], [-1500, -70]], note=ENGINEER),
            obj("membrane", "membrane", "Balcony membrane", "bitumen_membrane", "roof", [[-1500, -70], [-80, -40], [-80, -36], [-1500, -66]]),
            obj("threshold", "threshold", "Threshold", "alu_threshold", "openings", rect(0, 0, 150, 20)),
            obj("door_frame", "door_frame", "Door frame", "timber_sw", "openings", rect(40, 20, 150, 300), **INFERRED),
            obj("screed", "screed", "Screed", "sand_cement_screed", "floor", rect(150, -75, 1200, 0)),
        ],
        "dims": [dim("break_width", "h", ("break", "min"), ("break", "max"), src="user"), dim("drop", "v", ("membrane", "max"), ("screed", "max"))],
        "anns": [ann("an_break", "break", "Thermal break unit to engineer's design"), ann("an_membrane", "membrane", "Membrane falls away from door")],
    },
    "steel_beam_bearing": {
        "title": "Steel beam bearing on inner leaf",
        "objects": [
            obj("brick", "masonry", "Outer leaf", "brick_facing", "walls", rect(0, 0, 102.5, 1600)),
            obj("cavity", "cavity", "Residual cavity", None, "walls", rect(102.5, 0, 152.5, 1600)),
            obj("ins", "insulation", "Cavity insulation", "pir_board", "walls", rect(152.5, 0, 252.5, 1600), src="profile"),
            obj("block_lower", "masonry", "Inner leaf", "block_dense", "walls", rect(252.5, 0, 352.5, 1000)),
            obj("padstone", "padstone", "Padstone", "concrete_c25", "structure", rect(252.5, 1000, 352.5, 1140), note=ENGINEER),
            obj("beam", "steel_beam", "Steel beam", "steel_section", "structure", rect(262.5, 1140, 1500, 1343), note=ENGINEER),
            obj("block_upper", "masonry", "Inner leaf above beam", "block_dense", "walls", rect(252.5, 1343, 352.5, 1600)),
        ],
        "dims": [dim("bearing", "h", ("beam", "min"), ("block_lower", "max")), dim("padstone_height", "v", ("padstone", "min"), ("padstone", "max"))],
        "anns": [ann("an_beam", "beam", "Steel beam to engineer's schedule"), ann("an_padstone", "padstone", "Padstone to engineer's design")],
    },
}

# ---------------------------------------------------------------------------------------------------------------------


def jcs_hash(doc: dict[str, Any]) -> str:
    import hashlib

    return "sha256:" + hashlib.sha256(rfc8785.dumps(doc)).hexdigest()


def ddl_hash(ddl: dict[str, Any]) -> str:
    rest = {k: v for k, v in ddl.items() if k not in ("checks", "stamp")}
    rest["drawing"] = {k: v for k, v in ddl["drawing"].items() if k != "hash"}
    return jcs_hash(rest)


def extent(o: dict[str, Any], axis: str, end: str) -> float:
    vals = [p[0] if axis == "h" else p[1] for p in o["pts"]]
    return min(vals) if end == "min" else max(vals)


def provenance(src: str, conf: float, note: str | None, model_task: str = "interpret") -> dict[str, Any]:
    p: dict[str, Any] = {"source": src, "confidence": conf, "verify": src == "ai_inferred" and conf < 0.8}
    detail: dict[str, Any] = {}
    if src == "profile":
        detail["profile"] = GB
    if src == "ai_inferred":
        detail["model"] = {"provider": "anthropic", "model_id": "claude-opus-5-5", "task": model_task}
    if note:
        detail["note"] = note
    if detail:
        p["source_detail"] = detail
    return p


def build_ddl(name: str, spec: dict[str, Any]) -> dict[str, Any]:
    objs = {o["id"]: o for o in spec["objects"]}
    used = sorted({o["mat"] for o in spec["objects"] if o["mat"]})
    layer_keys = [k for k in LAYERS if any(o["layer"] == k for o in spec["objects"])] + ["anno"]
    materials = []
    for mid in used:
        m = MATERIALS[mid]
        entry = {
            "id": mid,
            "name": m["name"],
            "category": m["category"],
            "basis": m.get("basis", "description_only"),
            "source": "user",
            "confidence": 1,
            "verify": False,
        }
        if "colour_ref" in m:
            entry["colour_ref"] = m["colour_ref"]
        materials.append(entry)
    objects = []
    for o in spec["objects"]:
        objects.append(
            {
                "id": o["id"],
                "class": o["class"],
                "label": o["label"],
                "material_id": o["mat"],
                "thickness": None,
                "height": None,
                "level": None,
                "base_offset": None,
                "geometry": {"kind": "polygon", "points": o["pts"], "closed": True},
                **provenance(o["src"], o["conf"], o["note"]),
                "rule_refs": [],
                "layer_id": o["layer"],
            }
        )
    dimensions = []
    for d in spec["dims"]:
        value = extent(objs[d["b"][0]], d["axis"], d["b"][1]) - extent(objs[d["a"][0]], d["axis"], d["a"][1])
        assert value > 0 and float(value).is_integer(), f"{name}.{d['id']}: dimension {value} must be a positive whole number"
        dimensions.append(
            {
                "id": d["id"],
                "kind": "linear",
                "refs": [d["a"][0], d["b"][0]],
                "value": int(value),
                "driving": d["src"] == "user",
                **provenance(d["src"], 1.0 if d["src"] != "ai_inferred" else 0.7, None),
                "display": True,
            }
        )
    annotations = []
    for a in spec["anns"]:
        t = objs[a["target"]]
        cx = sum(p[0] for p in t["pts"]) / len(t["pts"])
        cy = sum(p[1] for p in t["pts"]) / len(t["pts"])
        annotations.append(
            {
                "id": a["id"],
                "kind": "leader",
                "text": a["text"],
                "targets": [a["target"]],
                "position": [round(cx - 400, 1), round(cy + 150, 1)],
                "layer_id": "anno",
                "source": "user",
                "confidence": 1,
            }
        )
    ddl: dict[str, Any] = {
        "ddl_version": "0.1.0",
        "drawing": {
            "id": str(uuid.uuid5(uuid.NAMESPACE_URL, f"https://drawlogic.invalid/fixtures/render/{name}")),
            "title": spec["title"],
            "discipline": "architecture",
            "type": "detail",
            "detail_type": name,
            "mode": "draft",
            "scale": 10,
            "units": "mm",
            "jurisdiction": "GB-ENG",
            "rev": "A",
            "hash": "",
            "parent_hash": None,
            "profile_stack": [
                {"id": GB["id"], "name": "GB-ENG Residential", "version": GB["version"], "layer": "jurisdiction", "tier": 1, "signer": None},
                {"id": "generic", "name": "Generic", "version": "0.1.0", "layer": "generic", "tier": None, "signer": None},
            ],
            "card_id": f"card-render-fixture-{name}",
            "created_at": "2026-09-27T09:00:00Z",
        },
        "materials": materials,
        "objects": objects,
        "connections": [],
        "constraints": [],
        "dimensions": dimensions,
        "annotations": annotations,
        "layers": [{"id": k, "name": LAYERS[k]} for k in layer_keys],
        "schedules": [],
        "solver": {"status": "resolved", "conflicts": [], "resolved_at": "2026-09-27T09:00:01Z"},
        "checks": None,
        "stamp": None,
    }
    ddl["drawing"]["hash"] = ddl_hash(ddl)
    return ddl


def hatch_of(conventions: dict[str, Any], category: str | None) -> str | None:
    """The pattern a category is hatched with, or None. An unmapped category is a configuration error, never a guess."""
    if category is None:
        return None
    if category not in conventions["hatches"]:
        raise AssertionError(f"conventions.hatches has no entry for material category {category!r}")
    entry = conventions["hatches"][category]
    return None if entry is None else str(entry["pattern_id"])


def dim_text(value: float, precision: int) -> str:
    return f"{value:.{precision}f}"


def goldens(name: str, ddl: dict[str, Any], conventions: dict[str, dict[str, Any]]) -> dict[str, Any]:
    cat = {m["id"]: m["category"] for m in ddl["materials"]}
    layer_name = {layer["id"]: layer["name"] for layer in ddl["layers"]}
    head = {
        "detail_type": name,
        "input": "input.ddl.json",
        "drawing_id": ddl["drawing"]["id"],
        "drawing_hash": ddl["drawing"]["hash"],
        "rev": ddl["drawing"]["rev"],
        "title": ddl["drawing"]["title"],
        "scale": ddl["drawing"]["scale"],
    }
    svg = {
        **head,
        "layers": [{"id": layer["id"], "name": layer["name"]} for layer in ddl["layers"]],
        "objects": [
            {
                "id": o["id"],
                "layer_id": o["layer_id"],
                "source": o["source"],
                "verify": o["verify"],
                "material_id": o["material_id"],
                "category": cat[o["material_id"]] if o["material_id"] else None,
                # Pattern per convention set, from conventions.hatches (profile.schema 0.2.0); null = drawn unhatched.
                "hatch": {k: hatch_of(c, cat.get(o["material_id"])) for k, c in conventions.items()},
            }
            for o in ddl["objects"]
        ],
        "dimensions": [
            {
                "id": d["id"],
                "value": d["value"],
                "text": {k: dim_text(d["value"], c["dimension_style"]["precision"]) for k, c in conventions.items()},
                "terminator": {k: c["dimension_style"]["terminator"] for k, c in conventions.items()},
            }
            for d in ddl["dimensions"]
        ],
        "annotations": [{"id": a["id"], "text": a["text"], "leader": a["kind"] == "leader", "targets": a["targets"]} for a in ddl["annotations"]],
    }
    dxf = {
        **head,
        "layers": sorted({layer["name"] for layer in ddl["layers"]}),
        "objects": [
            {
                "id": o["id"],
                "layer": layer_name[o["layer_id"]],
                "hatch": {k: hatch_of(c, cat.get(o["material_id"])) is not None for k, c in conventions.items()},
            }
            for o in ddl["objects"]
        ],
        "dimensions": [{"id": d["id"], "value": d["value"]} for d in ddl["dimensions"]],
        "texts": [a["text"] for a in ddl["annotations"]],
    }
    art = {**head, "legend_material_ids": sorted({o["material_id"] for o in ddl["objects"] if o["material_id"]})}
    pdf = {**head, "must_contain": [ddl["drawing"]["title"], f"Rev {ddl['drawing']['rev']}", f"1:{ddl['drawing']['scale']}"]}
    return {"expected.svg.json": svg, "expected.dxf.json": dxf, "expected.artefacts.json": art, "expected.pdf.json": pdf}


# ---------------------------------------------------------------------------------------------------------------------
# Fidelity fixture (FR-52): a source line-art, a faithful render and a drifted render.

SIZE = (512, 384)


def line_art(draw: ImageDraw.ImageDraw, dx: float = 0, dy: float = 0, skew: float = 0.0) -> None:
    """A simple elevation: wall outline, parapet, two windows and a door, drawn with 3 px lines."""

    def t(x: float, y: float) -> tuple[float, float]:
        return (x + dx + skew * y, y + dy)

    def poly(points: list[tuple[float, float]]) -> None:
        draw.line([t(*p) for p in points + points[:1]], fill=0, width=3)

    poly([(56, 96), (456, 96), (456, 344), (56, 344)])
    poly([(40, 80), (472, 80), (472, 96), (40, 96)])
    poly([(96, 150), (196, 150), (196, 250), (96, 250)])
    poly([(316, 150), (416, 150), (416, 250), (316, 250)])
    poly([(226, 220), (286, 220), (286, 344), (226, 344)])


def png(img: Image.Image) -> bytes:
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=False)
    return buf.getvalue()


def fidelity_images() -> dict[str, bytes]:
    src = Image.new("L", SIZE, 255)
    line_art(ImageDraw.Draw(src))
    faithful = Image.new("RGB", SIZE, (205, 214, 222))
    d = ImageDraw.Draw(faithful)
    d.rectangle([56, 96, 456, 344], fill=(176, 96, 72))
    d.rectangle([96, 150, 196, 250], fill=(120, 150, 170))
    d.rectangle([316, 150, 416, 250], fill=(120, 150, 170))
    d.rectangle([226, 220, 286, 344], fill=(90, 60, 40))
    d.rectangle([40, 80, 472, 96], fill=(70, 72, 76))
    line_art(ImageDraw.Draw(faithful))
    drifted = Image.new("RGB", SIZE, (205, 214, 222))
    d = ImageDraw.Draw(drifted)
    d.rectangle([90, 60, 500, 300], fill=(176, 96, 72))
    line_art(ImageDraw.Draw(drifted), dx=38, dy=-30, skew=0.18)
    return {"source-line-art.png": png(src), "faithful.png": png(faithful), "drifted.png": png(drifted)}


def edges(img: Image.Image) -> Any:
    import numpy as np

    g = np.asarray(img.convert("L"), dtype=float)
    gx = np.abs(np.diff(g, axis=1, prepend=g[:, :1]))
    gy = np.abs(np.diff(g, axis=0, prepend=g[:1, :]))
    return (gx + gy) > 40


def reference_iou(source: bytes, render: bytes, tolerance_px: int = 3) -> float:
    """Reference edge-overlay IoU used only to prove the fixture is well-formed. Codex's scorer is its own."""
    import numpy as np

    a = np.asarray(Image.open(io.BytesIO(source)).convert("L")) < 128
    b = edges(Image.open(io.BytesIO(render)))

    def dilate(m: Any, r: int) -> Any:
        out = m.copy()
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                out |= np.roll(np.roll(m, dy, axis=0), dx, axis=1)
        return out

    a_d, b_d = dilate(a, tolerance_px), dilate(b, tolerance_px)
    matched_a = (a & b_d).sum()
    matched_b = (b & a_d).sum()
    inter = (matched_a + matched_b) / 2
    union = a.sum() + b.sum() - inter
    return float(inter / union)


# ---------------------------------------------------------------------------------------------------------------------


def schema_validator() -> Draft202012Validator:
    resources = []
    for f in CONTRACTS.glob("*.schema.json"):
        s = json.loads(f.read_text(encoding="utf-8"))
        resources.append((s["$id"], Resource.from_contents(s)))
    registry = Registry().with_resources(resources)
    ddl_schema = json.loads((CONTRACTS / "ddl.schema.json").read_text(encoding="utf-8"))
    return Draft202012Validator(ddl_schema, registry=registry)


def conventions_validator() -> Draft202012Validator:
    resources = [
        (json.loads(f.read_text(encoding="utf-8"))["$id"], Resource.from_contents(json.loads(f.read_text(encoding="utf-8"))))
        for f in CONTRACTS.glob("*.schema.json")
    ]
    registry = Registry().with_resources(resources)
    return Draft202012Validator({"$ref": "https://drawlogic.invalid/contracts/profile.schema.json#/$defs/conventions"}, registry=registry)


def dumps(doc: Any) -> bytes:
    return (json.dumps(doc, indent=2, ensure_ascii=False) + "\n").encode("utf-8")


def outputs() -> dict[Path, bytes]:
    conventions = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "conventions").glob("*.json"))}
    cv = conventions_validator()
    for name, c in conventions.items():
        errs = [e.message for e in cv.iter_errors(c)]
        assert not errs, f"conventions/{name}.json: {errs}"
    validator = schema_validator()
    files: dict[Path, bytes] = {}
    for name, spec in DETAILS.items():
        ddl = build_ddl(name, spec)
        errs = [f"{'/'.join(map(str, e.absolute_path))}: {e.message}" for e in validator.iter_errors(ddl)]
        errs += [f"{i.path}: {i.message}" for i in core_validate(ddl)]
        assert not errs, f"{name}: DDL does not validate against contracts/ddl.schema.json: {errs[:5]}"
        layers_used = {layer["name"] for layer in ddl["layers"]}
        for cname, c in conventions.items():
            missing = layers_used - set(c["line_weights_mm"]) - {"A-Dims"}
            assert not missing, f"conventions/{cname}.json has no line weight for {missing}"
        base = ROOT / "details" / name
        files[base / "input.ddl.json"] = dumps(ddl)
        for fname, doc in goldens(name, ddl, conventions).items():
            files[base / fname] = dumps(doc)
        if name == "parapet":
            # FR-96: an Idea-mode drawing, so stills can be tested for the Concept watermark.
            idea = json.loads(json.dumps(ddl))
            idea["drawing"]["mode"] = "idea"
            del idea["drawing"]["card_id"]
            idea["drawing"]["id"] = str(uuid.uuid5(uuid.NAMESPACE_URL, "https://drawlogic.invalid/fixtures/render/parapet-idea"))
            idea["drawing"]["hash"] = ddl_hash(idea)
            errs = [e.message for e in validator.iter_errors(idea)]
            errs += [f"{i.path}: {i.message}" for i in core_validate(idea)]
            assert not errs, f"parapet idea variant: {errs[:5]}"
            files[ROOT / "idea" / "parapet.idea.ddl.json"] = dumps(idea)
    images = fidelity_images()
    for fname, data in images.items():
        files[ROOT / "fidelity" / fname] = data
    faithful = reference_iou(images["source-line-art.png"], images["faithful.png"])
    drifted = reference_iou(images["source-line-art.png"], images["drifted.png"])
    threshold = json.loads((CONTRACTS / "render.thresholds.json").read_text(encoding="utf-8"))["fidelity"]["modes"]["drawing_to_photoreal"]["min"]
    assert faithful >= threshold + 0.05, f"faithful fixture scores {faithful:.3f}; it must clear {threshold} with margin"
    assert drifted <= threshold - 0.3, f"drifted fixture scores {drifted:.3f}; it must fall well below {threshold}"
    files[ROOT / "fidelity" / "expected.json"] = dumps(
        {
            "source": "source-line-art.png",
            "threshold_ref": "contracts/render.thresholds.json → fidelity.modes.drawing_to_photoreal.min",
            "cases": {
                "faithful.png": {"verdict": "deliver", "reference_iou": round(faithful, 3)},
                "drifted.png": {"verdict": "fail", "reference_iou": round(drifted, 3)},
            },
            "note": "reference_iou comes from scripts/build.py (3 px tolerance) and only proves the fixture is well-formed. The engine's scorer must "
            "reach the same verdicts: deliver faithful.png, fail drifted.png.",
        }
    )
    return files


def same(path: Path, data: bytes) -> bool:
    """Byte-equal, or for PNGs pixel-equal (compressed bytes depend on the platform's zlib)."""
    if not path.exists():
        return False
    current = path.read_bytes()
    if current == data:
        return True
    if path.suffix == ".png":
        a, b = Image.open(io.BytesIO(current)), Image.open(io.BytesIO(data))
        return a.mode == b.mode and a.size == b.size and a.tobytes() == b.tobytes()
    return False


def main() -> int:
    files = outputs()
    if "--check" in sys.argv:
        stale = [str(p.relative_to(REPO)) for p, data in files.items() if not same(p, data)]
        if stale:
            print("fixtures/render is stale; run python fixtures/render/scripts/build.py and commit:\n  " + "\n  ".join(stale), file=sys.stderr)
            return 1
        print(f"fixtures/render is up to date ({len(files)} generated files; {len(DETAILS)} detail types).")
        return 0
    changed = [p for p, data in files.items() if not same(p, data)]
    for path in changed:  # unchanged files are left alone (synced folders lock files that are rewritten needlessly)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(files[path])
    print(f"wrote {len(changed)} of {len(files)} files for {len(DETAILS)} detail types")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

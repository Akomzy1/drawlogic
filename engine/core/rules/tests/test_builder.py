"""Builder's unit tests for engine/core/rules (Claude Code). Not a gate: the gate is Codex's trust/tests suite, and
engine/tests is Codex's folder. These cover behaviour the gate does not reach yet (auto-fix, measures, per-object
dispatch). Inputs are Codex's fixtures, read only."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

import pytest

from engine.core import rules, solver
from engine.core.contracts import schema_errors
from engine.core.ddl import apply_diff, with_hash

ROOT = Path(__file__).resolve().parents[4]
SIGNER = {"name": "Synthetic signer", "credential": "TEST-ONLY", "signed_at": "2026-09-27T00:00:00Z"}


def load(path: str) -> Any:
    return json.loads((ROOT / path).read_text(encoding="utf-8-sig"))


def detail(name: str) -> dict[str, Any]:
    return load(f"fixtures/core/details/{name}/resolved.ddl.json")


def profiles() -> list[dict[str, Any]]:
    return [load(f"fixtures/core/profiles/{p}.json") for p in ("generic", "gb-eng-residential")]


def only(ps: list[dict[str, Any]], detail_type: str, **changes: Any) -> list[dict[str, Any]]:
    for p in ps:
        p["rules"] = [r for r in p["rules"] if r["applies_to"].get("detail_type") == detail_type]
        for r in p["rules"]:
            r.update(copy.deepcopy(changes))
    return ps


def run(ddl: dict[str, Any], ps: list[dict[str, Any]]) -> dict[str, Any]:
    stack, issues = rules.load_stack(ps, ddl)
    assert stack is not None, issues
    result = rules.check(ddl, stack)
    assert schema_errors("check-result", result) == []
    return result


def test_object_rule_runs_once_per_object_of_its_class() -> None:
    result = run(detail("window_jamb"), only(profiles(), "window_jamb"))
    assert sorted((r["rule_id"], r["object_ids"][0]) for r in result["results"]) == [
        ("gb-eng-residential-window_jamb-continuity", "inner"),
        ("gb-eng-residential-window_jamb-continuity", "outer"),
        ("generic-window_jamb-geometry", "inner"),
        ("generic-window_jamb-geometry", "outer"),
    ]


def test_absent_object_class_is_needs_input_not_silence() -> None:
    ddl = detail("parapet")
    ddl["objects"] = [o for o in ddl["objects"] if o["class"] != "masonry"]
    ddl["connections"] = []
    ddl["constraints"] = []
    ddl["dimensions"][0]["refs"] = [o["id"] for o in ddl["objects"]]
    result = run(with_hash(ddl), only(profiles(), "parapet"))
    assert {(r["reason"], tuple(r["object_ids"])) for r in result["results"]} == {("needs_input", ())}
    assert {c["category"] for c in result["checks_not_performed"]} >= {"geometry", "thermal"}


def test_verified_rule_holding_in_idea_is_out_of_scope_never_pass() -> None:
    ddl = detail("parapet")
    ddl["drawing"]["mode"] = "idea"
    ps = only(profiles(), "parapet", state="verified", signer=SIGNER, modes=["draft", "idea"])
    result = run(with_hash(ddl), ps)
    assert [r["status"] for r in result["results"]] == ["out_of_scope", "out_of_scope"]
    assert result["summary"] == {"performed": 0, "passed": 0, "flagged": 0, "out_of_scope": 2}


def test_missing_required_input_is_needs_input() -> None:
    ddl = detail("parapet")
    next(o for o in ddl["objects"] if o["id"] == "wall")["height"] = None
    result = run(with_hash(ddl), only(profiles(), "parapet", state="verified", signer=SIGNER))
    assert {r["reason"] for r in result["results"]} == {"needs_input"}
    assert not any(r["status"] == "pass" for r in result["results"])


def test_pinned_versions_must_match_the_supplied_stack() -> None:
    ps = profiles()
    ps[1]["metadata"]["version"] = "0.1.1"
    for r in ps[1]["rules"]:
        r["profile"]["version"] = "0.1.1"
    stack, issues = rules.load_stack(ps, detail("parapet"))
    assert stack is None and any("0.1.0" in i.message for i in issues)


def _failing_upstand_rule() -> list[dict[str, Any]]:
    ps = only(profiles(), "parapet")
    rule = ps[1]["rules"][0]
    rule["applies_to"]["object_class"] = "upstand"
    rule["condition"] = {"cmp": {"left": {"field": "height"}, "op": ">=", "right": {"value": 200, "unit": "mm"}}}
    rule["auto_fix"] = {"action": "min", "field": "height", "value": 200}
    ps[0]["rules"] = []
    return ps


def test_autofix_is_offered_on_fail_and_records_auto_fix_provenance() -> None:
    ddl, ps = detail("parapet"), _failing_upstand_rule()
    (row,) = run(ddl, ps)["results"]
    assert (row["reason"], row["auto_fix"]["available"]) == ("fail", True)

    stack, _ = rules.load_stack(ps, ddl)
    assert stack is not None
    change = rules.autofix(ddl, stack, row["auto_fix"]["fix_id"])
    assert schema_errors("ddl-diff", change) == []
    assert change["origin"]["kind"] == "auto_fix" and change["ops"]
    assert all(op["source"] == "auto_fix" for op in change["ops"])

    fixed = solver.resolve(apply_diff(ddl, change))
    assert fixed["drawing"]["hash"] == change["result_hash"]
    upstand = next(o for o in fixed["objects"] if o["id"] == "upstand")
    assert upstand["height"] == 200
    assert upstand["field_provenance"]["height"]["source"] == "auto_fix"
    assert upstand["source"] == "user"  # the object's other fields keep their provenance
    assert run(fixed, ps)["results"][0]["reason"] == "unverified"


def test_autofix_refuses_a_fix_the_run_did_not_offer() -> None:
    ddl = detail("parapet")
    stack, _ = rules.load_stack(profiles(), ddl)
    assert stack is not None
    with pytest.raises(rules.FixRefused):
        rules.autofix(ddl, stack, "generic-parapet-geometry@wall")


def test_measures_read_geometry_in_drawing_units() -> None:
    ddl = detail("parapet")
    ps = only(profiles(), "parapet")
    ps[0]["rules"][0]["condition"] = {
        "cmp": {
            "left": {
                "measure": "vertical_distance",
                "args": {"from_class": "masonry", "from": "min", "to_class": "coping", "to": "min"},
            },
            "op": "==",
            "right": {"value": 0.6, "unit": "m"},
        }
    }
    ps[1]["rules"][0]["condition"] = {
        "cmp": {
            "left": {"measure": "is_connected", "args": {"from_class": "masonry", "to_class": "insulation"}},
            "op": "==",
            "right": {"value": True},
        }
    }
    assert [r["reason"] for r in run(ddl, ps)["results"]] == ["unverified", "unverified"]
    ps[1]["rules"][0]["condition"]["cmp"]["left"]["args"]["to_class"] = "coping"
    assert [r["reason"] for r in run(ddl, ps)["results"]] == ["unverified", "fail"]


def test_unmeasurable_is_needs_input() -> None:
    ps = only(profiles(), "parapet")
    ps[0]["rules"][0]["condition"] = {
        "cmp": {
            "left": {"measure": "is_continuous", "args": {"path": "thermal_line"}},
            "op": "==",
            "right": {"value": True},
        }
    }
    reasons = [r["reason"] for r in run(detail("parapet"), ps)["results"]]
    assert reasons == ["needs_input", "unverified"]

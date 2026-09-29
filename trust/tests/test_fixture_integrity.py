"""Offline fixture gate; derived from PRD and approved schema invariants."""

import copy

import pytest
from jsonschema import ValidationError
from support import (
    MANIFEST,
    audit_hash,
    check_projection,
    ddl_hash,
    detail,
    load,
    profiles,
    provenance,
    validate,
)

pytestmark = pytest.mark.fixtures


@pytest.mark.parametrize("row", MANIFEST["documents"], ids=lambda r: r["path"])
def test_document_conforms_to_approved_schema(row):
    validate(row["schema"], load(row["path"]))


def test_every_named_fr23_type_is_covered():
    assert {r["id"] for r in MANIFEST["details"]} == {
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
    assert len(MANIFEST["ideas"]) == 3
    assert len(MANIFEST["learn"]) == 2


@pytest.mark.parametrize("row", MANIFEST["details"], ids=lambda r: r["id"])
def test_detail_hash_references_solver_oracle_and_unsigned_checks(row):
    original, resolved, expected, card = (
        load(row[k]) for k in ("input", "resolved", "check", "card")
    )
    for ddl in (original, resolved):
        assert ddl_hash(ddl) == ddl["drawing"]["hash"]
        ids = {o["id"] for o in ddl["objects"]}
        assert len(ids) == len(ddl["objects"])
        materials = {m["id"] for m in ddl["materials"]}
        assert all(
            o.get("material_id") is None or o["material_id"] in materials
            for o in ddl["objects"]
        )
        assert all(c["from"] in ids and c["to"] in ids for c in ddl["connections"])
        assert ddl["drawing"]["card_id"] == card["card_id"]
    assert provenance(original) == provenance(resolved)
    assert resolved["constraints"] == original["constraints"]
    assert resolved["objects"] == original["objects"]
    assert original["dimensions"][0]["value"] is None
    assert resolved["dimensions"][0]["value"] == sum(
        o["thickness"] for o in original["objects"]
    )
    assert expected["drawing_hash"] == resolved["drawing"]["hash"]
    # These two details have two masonry leaves. Both must be checked even
    # though only outer carries rule_refs (rule.schema.json applies_to).
    object_ids = (
        {"outer", "inner"}
        if row["id"] in {"window_jamb", "cavity_closer"}
        else {original["objects"][0]["id"]}
    )
    rule_ids = {
        rule["id"]
        for profile in profiles()
        for rule in profile["rules"]
        if rule["applies_to"]["detail_type"] == row["id"]
    }
    assert len(rule_ids) == 2
    assert {
        (result["rule_id"], tuple(result["object_ids"]))
        for result in expected["results"]
    } == {(rule_id, (object_id,)) for rule_id in rule_ids for object_id in object_ids}
    result_count = 2 * len(object_ids)
    assert len(expected["results"]) == result_count
    assert expected["summary"] == {
        "performed": result_count,
        "passed": 0,
        "flagged": result_count,
        "out_of_scope": 0,
    }
    assert all(
        r["reason"] == "unverified" and r["status"] == "flag" and r["signer"] is None
        for r in expected["results"]
    )
    assert {r["category"] for r in expected["checks_not_performed"]} == {
        "structural",
        "fire_stopping",
        "acoustic",
    }
    assert {r["rule_id"] for r in expected["results"]} <= {
        r["id"] for p in profiles() for r in p["rules"]
    }


@pytest.mark.parametrize("field", ["source", "confidence"])
def test_schema_rejects_missing_provenance(field):
    invalid = detail()
    del invalid["objects"][0][field]
    with pytest.raises(ValidationError):
        validate("ddl", invalid)


def test_schema_rejects_false_pass():
    bad = detail(field="check")
    bad["results"][0].update(status="pass", reason=None)
    with pytest.raises(ValidationError):
        validate("check-result", bad)


def test_idea_assumptions_have_provenance_and_no_engineering_guesses():
    for row in MANIFEST["ideas"]:
        card = load(row["card"])
        assert card["assumptions"]
        for assumption in card["assumptions"]:
            assert assumption["editable"] and assumption["text"].strip()
            if assumption["source"] == "profile":
                assert assumption["source_detail"]["profile"]["version"] == "0.1.0"
            if assumption["source"] == "ai_inferred":
                assert assumption["verify"]
        assert not any(
            a["key"] in {"load", "member_size", "cable_size", "fire_period"}
            for a in card["assumptions"]
        )


def test_learn_initially_locks_generation_and_has_reasons():
    for row in MANIFEST["learn"]:
        value = load(row["expected"])
        assert value["generation_unlocked"] == {"unlocked": False, "by": None}
        assert value["compare"] is None
        assert 2 <= len(value["inspiration"]) <= 3
        for point in value["points"]:
            assert point["reason"].strip() and point["why"].strip()
            assert point["worked_answer_available"] is False
            if point["grade"] == "discuss":
                assert point["source"]["kind"] == "general_good_practice"


def test_audit_fixture_hashes_and_chain():
    chain = load("trust/tests/fixtures/audit.chain.json")
    for i, record in enumerate(chain):
        assert record["seq"] == i
        assert record["hash"] == audit_hash(record)
        assert record["prev_hash"] == (chain[i - 1]["hash"] if i else None)
        if i:
            assert record["before_hash"] == chain[i - 1]["after_hash"]


def test_golden_projection_does_not_drop_rule_semantics():
    expected = detail(field="check")
    changed = copy.deepcopy(expected)
    changed["results"][0]["reason"] = "fail"
    assert check_projection(expected) != check_projection(changed)

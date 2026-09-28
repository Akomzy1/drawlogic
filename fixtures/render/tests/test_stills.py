"""Render Studio stills through the production path with the fixture provider (render-spec.json → api.fixture_provider).

PRD FR-52 (drift fails, retries, never delivered), FR-53 (drawing hash and revision), FR-56 and the contract review of
27 Sept 2026 (charged once per delivered render; retries and failed jobs never consume credits), FR-96 (Concept
watermark on Idea images), FR-161–164 and trust rule 11a (material basis; colour approximate). Every status is validated
against contracts/render-api.schema.json by the harness.
"""

from __future__ import annotations

from typing import Any

from conftest import CONVENTIONS, ROOT, THRESHOLDS, ddl, expected, load

MODE = "detail_to_built"
MIN = THRESHOLDS["fidelity"]["modes"][MODE]["min"]
MAX_ATTEMPTS = THRESHOLDS["fidelity"]["max_attempts"]
JOB = {"engine": "diffusion", "mode": MODE, "variants": 1, "camera_id": "cam-01", "resolution": "low"}


def still_request(drawing: dict[str, Any], job: dict[str, Any] = JOB) -> dict[str, Any]:
    return {"ddl": drawing, "conventions": CONVENTIONS["gb-eng"], "job": job}


def test_faithful_render_is_delivered_with_its_drawing_hash(provider_engine):
    d = ddl("parapet")
    status = provider_engine(stills=["faithful.png"]).run("still", still_request(d))
    assert status["state"] == "delivered", status
    [out] = status["outputs"]
    assert out["engine"] == "diffusion"
    assert out["fidelity"] is not None and out["fidelity"] >= MIN, f"faithful fixture scored {out['fidelity']}"
    assert out["drawing_hash"] == d["drawing"]["hash"] and out["drawing_rev"] == d["drawing"]["rev"], "FR-53"
    assert status["credits_charged"] == 1, "one credit per delivered variant (PRD §10)"


def test_drifted_render_fails_and_is_never_delivered(provider_engine):
    status = provider_engine(stills=["drifted.png"]).run("still", still_request(ddl("parapet")))
    assert status["state"] == "failed", f"FR-52: a drifted render must fail, got {status['state']}"
    assert status["reason"] == "fidelity"
    assert status["attempts"] == MAX_ATTEMPTS, "it retries up to max_attempts before failing"
    assert status.get("last_fidelity") is not None and status["last_fidelity"] < MIN
    assert status["credits_charged"] == 0, "a failed job charges nothing"
    assert "outputs" not in status


def test_retries_never_consume_credits(provider_engine):
    status = provider_engine(stills=["drifted.png", "faithful.png"]).run("still", still_request(ddl("parapet")))
    assert status["state"] == "delivered"
    assert status["attempts_total"] == 2
    assert status["credits_charged"] == 1, "the failed first attempt must not be charged"


def test_idea_mode_images_carry_the_concept_watermark(provider_engine):
    status = provider_engine(stills=["faithful.png"]).run("still", still_request(load(ROOT / "idea" / "parapet.idea.ddl.json")))
    assert status["state"] == "delivered"
    assert "watermark.concept" in status["outputs"][0]["label_keys"], "FR-96"


def test_draft_images_do_not_carry_the_concept_watermark(provider_engine):
    status = provider_engine(stills=["faithful.png"]).run("still", still_request(ddl("parapet")))
    assert "watermark.concept" not in status["outputs"][0]["label_keys"], "a Draft render is not a concept"


def test_every_material_states_its_basis(provider_engine):
    d = ddl("parapet")
    status = provider_engine(stills=["faithful.png"]).run("still", still_request(d))
    materials = {m["material_id"]: m for m in status["outputs"][0]["materials"]}
    assert sorted(materials) == expected("parapet", "artefacts")["legend_material_ids"], "FR-163: every visible material states a basis"
    declared = {m["id"]: m for m in d["materials"]}
    for mid, m in materials.items():
        assert m["basis"] == declared[mid]["basis"], f"{mid}: basis {m['basis']}, drawing says {declared[mid]['basis']}"
        assert m["basis"] != "manufacturer_texture", "FR-162: manufacturer data only from a signed product profile, and none is attached"
    coping = materials["alu_coping"]
    assert coping["basis"] == "colour_code"
    if THRESHOLDS["colour"]["colour_approximate_above"] is None:
        assert coping["colour_approximate"] is True, "until the ΔE threshold is set, colour-coded materials are labelled colour approximate"
    else:
        assert coping["delta_e"] is not None
        assert coping["colour_approximate"] == (coping["delta_e"] > THRESHOLDS["colour"]["colour_approximate_above"])
    for mid, m in materials.items():
        if m["basis"] != "colour_code":
            assert m["delta_e"] is None, f"{mid}: ΔE only for colour-coded materials"


def test_each_delivered_variant_is_charged_once(provider_engine):
    status = provider_engine(stills=["faithful.png"]).run("still", still_request(ddl("parapet"), {**JOB, "variants": 2}))
    assert status["state"] == "delivered" and len(status["outputs"]) == 2
    assert status["credits_charged"] == 2

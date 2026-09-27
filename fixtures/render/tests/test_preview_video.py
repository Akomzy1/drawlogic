"""Preview video (PRD FR-55, FR-127–131, FR-163; trust rules 7 and 11a): starts from a geometry-locked Drawlogic still,
carries the preview label and no fidelity score, is capped at 10 seconds, retries moderation failures on another model
then fails visibly, and only a delivered clip is charged."""

from __future__ import annotations

import pytest
from conftest import THRESHOLDS, ddl
from test_stills import still


@pytest.fixture
def start_still(in_process_engine, fixture_provider):
    fixture_provider(stills=["faithful.png"])
    status = still(in_process_engine, ddl("parapet"))
    assert status["state"] == "delivered", "needs a delivered still to start from"
    out = status["outputs"][0]
    return {"asset_id": out["asset_id"], "drawing_hash": out["drawing_hash"], "drawing_rev": out["drawing_rev"]}


def clip(engine, start, *, seconds=10, idea_mode=True):
    job = {"engine": "generative_video", "start_still": start, "camera_move": "push_in", "seconds": seconds, "idea_mode": idea_mode}
    return engine.post("preview_video", {"job": job})


def test_clip_carries_the_preview_label_and_no_fidelity_score(in_process_engine, fixture_provider, start_still):
    fixture_provider(video=["ok"])
    r = clip(in_process_engine, start_still)
    assert r.status_code == 200, r.text[:300]
    status = r.json()
    assert status["state"] == "delivered", status
    [out] = status["outputs"]
    assert out["engine"] == "generative_video"
    assert out["fidelity"] is None, "FR-130: preview clips carry no fidelity score"
    assert "label.preview" in out["label_keys"], "FR-130: Generated preview — not a model render"
    assert "watermark.concept" in out["label_keys"], "FR-130: Idea-mode clips also carry the Concept watermark"
    assert out["drawing_hash"] == start_still["drawing_hash"] and out["drawing_rev"] == start_still["drawing_rev"], "FR-129/130"
    assert out["pinning"] in ("start_only", "start_and_end"), "FR-129: the adapter records which pinning it used"
    assert out["materials"] and all(m["basis"] for m in out["materials"]), "FR-163: every clip states each material's basis"
    assert status["credits_charged"] > 0


def test_draft_clip_still_carries_the_preview_label(in_process_engine, fixture_provider, start_still):
    fixture_provider(video=["ok"])
    status = clip(in_process_engine, start_still, idea_mode=False).json()
    assert "label.preview" in status["outputs"][0]["label_keys"]


def test_moderation_failure_retries_another_model_then_fails_visibly(in_process_engine, fixture_provider, start_still):
    fixture_provider(video=["moderation_failed"] * 5)
    status = clip(in_process_engine, start_still).json()
    assert status["state"] == "failed" and status["reason"] == "moderation", "FR-131: surfaced as failed, never silently altered"
    assert status["attempts"] >= 2, "FR-131: retried with a different model before failing"
    assert status["credits_charged"] == 0


def test_a_retry_that_succeeds_is_charged_once(in_process_engine, fixture_provider, start_still):
    fixture_provider(video=["ok"])
    single = clip(in_process_engine, start_still).json()["credits_charged"]
    fixture_provider(video=["moderation_failed", "ok"])
    status = clip(in_process_engine, start_still).json()
    assert status["state"] == "delivered" and status["attempts_total"] == 2
    assert status["credits_charged"] == single, "retries never consume credits"


def test_clips_are_capped_at_ten_seconds(in_process_engine, fixture_provider, start_still):
    fixture_provider(video=["ok"])
    cap = THRESHOLDS["generative_video"]["max_clip_seconds"]
    r = clip(in_process_engine, start_still, seconds=cap + 2)
    assert 400 <= r.status_code < 500, f"FR-127: a {cap + 2} s clip must be refused, got {r.status_code}"


def test_a_clip_must_start_from_a_drawlogic_still(in_process_engine, fixture_provider):
    fixture_provider(video=["ok"])
    r = clip(in_process_engine, {"asset_id": "not-a-drawlogic-still", "drawing_hash": "sha256:" + "0" * 64, "drawing_rev": "A"})
    assert 400 <= r.status_code < 500, "FR-129: every clip starts from a Render Studio still that carries a drawing hash"

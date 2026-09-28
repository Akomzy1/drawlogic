"""Preview video (PRD FR-55, FR-127–131, FR-163; trust rules 7 and 11a): starts from a stored, geometry-locked Drawlogic
still; carries the preview label and no fidelity score; takes Idea or Draft mode from that still, never from the client;
is capped at 10 seconds; retries moderation failures on another model, then fails visibly; only a delivered clip is
charged. Every status and error is validated against contracts/render-api.schema.json by the harness.
"""

from __future__ import annotations

from typing import Any

from conftest import ROOT, THRESHOLDS, api_valid, ddl, load
from test_stills import still_request


def start(engine: Any, drawing: dict[str, Any]) -> dict[str, str]:
    status = engine.run("still", still_request(drawing))
    assert status["state"] == "delivered", "needs a delivered still to start from"
    out = status["outputs"][0]
    return {"asset_id": out["asset_id"], "drawing_hash": out["drawing_hash"], "drawing_rev": out["drawing_rev"]}


def clip_request(start_still: dict[str, str], *, seconds: int = 10) -> dict[str, Any]:
    return {"job": {"engine": "generative_video", "start_still": start_still, "camera_move": "push_in", "seconds": seconds}}


IDEA = ROOT / "idea" / "parapet.idea.ddl.json"


def test_clip_carries_the_preview_label_and_no_fidelity_score(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["ok"])
    s = start(engine, load(IDEA))
    status = engine.run("preview_video", clip_request(s))
    assert status["state"] == "delivered", status
    [out] = status["outputs"]
    assert out["engine"] == "generative_video"
    assert out["fidelity"] is None, "FR-130: preview clips carry no fidelity score"
    assert "label.preview" in out["label_keys"], "FR-130: Generated preview — not a model render"
    assert "watermark.concept" in out["label_keys"], "FR-130: a clip from an Idea still carries the Concept watermark"
    assert out["drawing_hash"] == s["drawing_hash"] and out["drawing_rev"] == s["drawing_rev"], "FR-129/130"
    assert out["pinning"] in ("start_only", "start_and_end"), "FR-129: the adapter records which pinning it used"
    assert out["materials"] and all(m["basis"] for m in out["materials"]), "FR-163: every clip states each material's basis"
    assert status["credits_charged"] > 0


def test_draft_clip_carries_the_preview_label_and_no_concept_watermark(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["ok"])
    labels = engine.run("preview_video", clip_request(start(engine, ddl("parapet"))))["outputs"][0]["label_keys"]
    assert "label.preview" in labels
    assert "watermark.concept" not in labels


def test_moderation_failure_retries_another_model_then_fails_visibly(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["moderation_failed"] * 5)
    status = engine.run("preview_video", clip_request(start(engine, load(IDEA))))
    assert status["state"] == "failed" and status["reason"] == "moderation", "FR-131: surfaced as failed, never silently altered"
    assert status["attempts"] >= 2, "FR-131: retried with a different model before failing"
    assert status["credits_charged"] == 0


def test_a_retry_that_succeeds_is_charged_once(provider_engine):
    once = provider_engine(stills=["faithful.png"], video=["ok"])
    single = once.run("preview_video", clip_request(start(once, load(IDEA))))["credits_charged"]
    retried = provider_engine(stills=["faithful.png"], video=["moderation_failed", "ok"])
    status = retried.run("preview_video", clip_request(start(retried, load(IDEA))))
    assert status["state"] == "delivered" and status["attempts_total"] == 2
    assert status["credits_charged"] == single, "retries never consume credits"


def refused(engine: Any, request: dict[str, Any], code: str) -> None:
    response = engine.submit("preview_video", request)
    assert 400 <= response.status_code < 500, f"expected a 4xx refusal ({code}), got {response.status_code}"
    assert api_valid("error", response.json())["error"]["code"] == code


def test_clips_are_capped_at_ten_seconds(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["ok"])
    cap = THRESHOLDS["generative_video"]["max_clip_seconds"]
    refused(engine, clip_request(start(engine, load(IDEA)), seconds=cap + 2), "clip_too_long")


def test_a_clip_must_start_from_a_stored_drawlogic_still(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["ok"])
    fake = {"asset_id": "not-a-drawlogic-still", "drawing_hash": "sha256:" + "0" * 64, "drawing_rev": "A"}
    refused(engine, clip_request(fake), "unknown_start_still")


def test_a_start_still_with_the_wrong_hash_or_revision_is_refused(provider_engine):
    engine = provider_engine(stills=["faithful.png"], video=["ok"])
    s = start(engine, load(IDEA))
    refused(engine, clip_request({**s, "drawing_hash": "sha256:" + "1" * 64}), "start_still_mismatch")
    refused(engine, clip_request({**s, "drawing_rev": "Z"}), "start_still_mismatch")

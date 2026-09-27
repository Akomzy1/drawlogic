"""FR-43, FR-111–115: review gate and signing event are distinct."""

import pytest
from hypothesis import given
from hypothesis import strategies as st
from support import load, validate

pytestmark = pytest.mark.runtime


def initial():
    return load("trust/tests/fixtures/gate.initial.json")


def complete():
    gate = initial()
    gate["drawings_opened"]["opened"] = 1
    gate["verify_items"]["resolved"] = 1
    gate["flags"].update(
        cleared_or_accepted=1,
        notes=[
            {
                "result_id": "flag-1",
                "state": "accepted",
                "note": "Reviewed with project-specific evidence.",
            }
        ],
    )
    gate["report_reviewed"] = True
    gate["evidence"].update(
        items_opened=gate["drawing_ids"] + ["verify-1", "flag-1"],
        assumptions_resolved=1,
        flags_accepted=1,
        time_in_review_s=120,
    )
    return gate


@given(
    opened=st.booleans(),
    resolved=st.booleans(),
    flags=st.booleans(),
    report=st.booleans(),
    credential=st.booleans(),
    jurisdiction=st.booleans(),
    discipline=st.booleans(),
    forged_enabled=st.booleans(),
)
def test_gate_enablement_is_derived_and_cannot_be_forged(
    trust,
    opened,
    resolved,
    flags,
    report,
    credential,
    jurisdiction,
    discipline,
    forged_enabled,
):
    state = complete()
    state["drawings_opened"]["opened"] = int(opened)
    state["verify_items"]["resolved"] = int(resolved)
    state["flags"]["cleared_or_accepted"] = int(flags)
    if not flags:
        state["flags"]["notes"] = []
    state["report_reviewed"] = report
    state["signer_checks"].update(
        credential_verified=credential,
        jurisdiction_match=jurisdiction,
        discipline_match=discipline,
    )
    state["enabled"] = forged_enabled
    actual = trust.post("/gate/evaluate", state)
    validate("signing-gate", actual)
    assert actual["enabled"] is all(
        [opened, resolved, flags, report, credential, jurisdiction, discipline]
    )


@pytest.mark.parametrize("role", ["Owner", "Signer", "Author", "Member", "Viewer"])
def test_no_role_bypasses_incomplete_review(trust, role):
    state = initial()
    state["enabled"] = True
    response = trust.raw("/gate/sign", {"state": state, "actor_role": role})
    assert response.status_code in (403, 409, 422)


@pytest.mark.parametrize("note", ["", " ", "\n\t"])
def test_accepting_flag_requires_meaningful_note(trust, note):
    state = complete()
    state["flags"]["notes"][0]["note"] = note
    response = trust.raw("/gate/evaluate", state)
    assert response.status_code in (400, 422) or (
        response.status_code == 200 and response.json()["enabled"] is False
    )


@pytest.mark.parametrize("second_factor", ["not_requested", "pending", "failed"])
def test_review_complete_is_not_permission_to_sign_without_event_2fa(
    trust, second_factor
):
    state = complete()
    state["signer_checks"]["second_factor"] = second_factor
    evaluated = trust.post("/gate/evaluate", state)
    # The contract's enabled flag opens the signing flow. 2FA gates the final event.
    assert evaluated["enabled"] is True
    response = trust.raw("/gate/sign", {"state": evaluated, "actor_role": "Signer"})
    assert response.status_code in (403, 409, 422)


def test_pending_credential_never_enables_signing(trust):
    state = complete()
    state["signer_checks"]["verification_level"] = "pending"
    response = trust.raw("/gate/evaluate", state)
    assert response.status_code in (400, 422) or response.json()["enabled"] is False


def test_count_overflow_or_duplicate_drawing_evidence_cannot_unlock(trust):
    for field, count in [
        ("drawings_opened", "opened"),
        ("verify_items", "resolved"),
        ("flags", "cleared_or_accepted"),
    ]:
        state = complete()
        state[field][count] = state[field]["total"] + 1
        response = trust.raw("/gate/evaluate", state)
        assert response.status_code in (400, 422) or response.json()["enabled"] is False
    state = complete()
    state["drawing_ids"].append("10000000-0000-4000-8000-000000000099")
    state["drawings_opened"] = {"total": 2, "opened": 2}
    state["evidence"]["items_opened"] = [state["drawing_ids"][0]] * 2
    response = trust.raw("/gate/evaluate", state)
    assert response.status_code in (400, 422) or response.json()["enabled"] is False


def test_review_progress_and_new_revision_relock(trust):
    state = initial()
    events = [
        {"type": "drawing.open", "drawing_id": state["drawing_ids"][0]},
        {"type": "verify.resolve", "object_id": "verify-1", "resolution": "accept"},
        {
            "type": "flag.accept",
            "result_id": "flag-1",
            "note": "Reviewed against supplied project evidence.",
        },
        {"type": "report.review", "checks_not_performed_reviewed": True},
    ]
    for i, event in enumerate(events):
        state = trust.post("/gate/transition", {"state": state, "event": event})
        validate("signing-gate", state)
        assert state["enabled"] is (i == len(events) - 1)
    assert state["drawing_ids"][0] in state["evidence"]["items_opened"]
    assert state["evidence"]["assumptions_resolved"] == 1
    assert state["evidence"]["flags_accepted"] == 1
    state = trust.post(
        "/gate/transition",
        {
            "state": state,
            "event": {"type": "ddl.edit", "after_hash": "sha256:" + "b" * 64},
        },
    )
    assert not state["enabled"]
    assert state["signer_checks"]["second_factor"] != "passed"


def test_signing_records_review_evidence_and_consumes_step_up(trust):
    state = complete()
    state["signer_checks"]["second_factor"] = "passed"
    result = trust.post("/gate/sign", {"state": state, "actor_role": "Signer"})
    record = result["audit_record"]
    validate("audit-record", record)
    assert record["action"] == "sign"
    assert record["actor"]["id"] == state["signer_id"]
    assert record["actor"].get("credential")
    assert record["payload"]["evidence"] == state["evidence"]
    assert record["after_hash"] == result["drawing_hash"]
    # Same second-factor event cannot authorise a second signature.
    replay = trust.raw("/gate/sign", {"state": state, "actor_role": "Signer"})
    assert replay.status_code in (403, 409, 422)

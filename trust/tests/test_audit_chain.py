"""FR-44/45/114: independent RFC 8785 oracle and adversarial chain verification."""

import copy

import pytest
from hypothesis import given
from hypothesis import strategies as st
from support import audit_hash, load, validate

pytestmark = pytest.mark.runtime


def chain():
    return load("trust/tests/fixtures/audit.chain.json")


def test_intact_chain_is_accepted(trust):
    assert trust.post("/audit/verify", {"records": chain()})["valid"] is True


@given(
    index=st.integers(0, 2),
    field=st.sampled_from(["actor", "action", "payload", "ts", "after_hash"]),
)
def test_changing_any_record_content_breaks_chain(trust, index, field):
    records = chain()
    changes = {
        "actor": {"kind": "user", "id": "different-reviewer"},
        "action": "export",
        "payload": {"review_note": "altered"},
        "ts": "2026-09-28T00:00:00Z",
        "after_hash": "sha256:" + "f" * 64,
    }
    records[index][field] = changes[field]
    assert trust.post("/audit/verify", {"records": records})["valid"] is False


@pytest.mark.parametrize(
    "attack",
    [
        "delete_middle",
        "reorder",
        "duplicate",
        "foreign_chain",
        "forged_genesis",
        "rehash_middle",
    ],
)
def test_link_and_sequence_attacks_are_rejected(trust, attack):
    records = chain()
    if attack == "delete_middle":
        del records[1]
    elif attack == "reorder":
        records[1], records[2] = records[2], records[1]
    elif attack == "duplicate":
        records.insert(1, copy.deepcopy(records[0]))
    elif attack == "foreign_chain":
        records[1]["chain_id"] = "another-chain"
        records[1]["hash"] = audit_hash(records[1])
    elif attack == "forged_genesis":
        records[0]["prev_hash"] = "sha256:" + "1" * 64
    else:
        records[1]["payload"]["review_note"] = (
            "Changed evidence with a recalculated local hash"
        )
        records[1]["hash"] = audit_hash(records[1])
    response = trust.raw("/audit/verify", {"records": records})
    assert response.status_code in (400, 422) or (
        response.status_code == 200 and response.json()["valid"] is False
    )


def test_tail_truncation_detected_against_external_head(trust):
    records = chain()
    assert (
        trust.post(
            "/audit/verify",
            {
                "records": records[:-1],
                "expected_head": records[-1]["hash"],
                "expected_length": len(records),
            },
        )["valid"]
        is False
    )


@given(number=st.sampled_from([0, 1.0, -0.0, 1e-7, 1e20, 0.125]))
def test_appended_record_hash_matches_independent_jcs(trust, number):
    records = chain()
    event = {
        "actor": {"kind": "user", "id": "examiner"},
        "action": "report.review",
        "drawing_id": records[0]["drawing_id"],
        "before_hash": records[-1]["after_hash"],
        "after_hash": records[-1]["after_hash"],
        "ts": "2026-09-27T01:00:00Z",
        "payload": {"value": number, "note": "Review \u2014 \u00a3"},
    }
    actual = trust.post("/audit/append", {"records": records, "event": event})
    validate("audit-record", actual)
    assert actual["hash"] == audit_hash(actual)
    assert actual["prev_hash"] == records[-1]["hash"]
    assert actual["seq"] == len(records)
    assert actual["chain_id"] == records[0]["chain_id"]
    assert actual["payload"] == event["payload"]
    assert actual["actor"] == event["actor"]

"""Real FastAPI boundary tests. No mocks, skips or xfails for missing implementations."""

import pytest
from support import MANIFEST, check_projection, load, profiles, validate

pytestmark = pytest.mark.runtime


@pytest.mark.parametrize("row", MANIFEST["details"], ids=lambda r: r["id"])
def test_solver_golden(core, row):
    actual = core.post("/ddl/resolve", load(row["input"]))
    validate("ddl", actual)
    # resolved_at is optional operational metadata, not part of the solver oracle.
    expected = load(row["resolved"])
    assert actual == expected


@pytest.mark.parametrize("row", MANIFEST["details"], ids=lambda r: r["id"])
def test_check_golden(core, row):
    actual = core.post("/check", {"ddl": load(row["resolved"]), "profiles": profiles()})
    validate("check-result", actual)
    assert check_projection(actual) == check_projection(load(row["check"]))


@pytest.mark.parametrize("row", MANIFEST["ideas"], ids=lambda r: r["id"])
def test_idea_assumptions(core, row):
    request = load(row["request"])
    request["profiles"] = profiles()
    if request["jurisdiction"] == "NG-LA":
        request["profiles"][1] = load("fixtures/core/profiles/ng-la.json")
    actual = core.post("/interpret", request)
    validate("interpretation", actual)
    expected = load(row["card"])
    assert actual["jurisdiction"] == expected["jurisdiction"]
    assert actual["mode"] == "idea"
    expected_values = {
        (a["key"], str(a["value"]), a["source"]) for a in expected["assumptions"]
    }
    actual_values = {
        (a["key"], str(a["value"]), a["source"]) for a in actual["assumptions"]
    }
    assert expected_values <= actual_values
    for a in actual["assumptions"]:
        assert a["text"].strip() and a["editable"]
        if a["source"] == "ai_inferred":
            assert a["verify"]


@pytest.mark.parametrize("row", MANIFEST["learn"], ids=lambda r: r["id"])
def test_learn_critique_reason_and_why(core, row):
    actual = core.post(
        "/learn/critique", {**load(row["request"]), "profiles": profiles()}
    )
    validate("critique", actual)
    expected = load(row["expected"])
    # Natural-language explanations may vary; grades, topics, provenance and locks cannot.
    assert {(p["title"], p["grade"]) for p in expected["points"]} <= {
        (p["title"], p["grade"]) for p in actual["points"]
    }
    assert actual["generation_unlocked"] == expected["generation_unlocked"]
    assert actual["compare"] is None
    assert {(b["key"], b["kind"]) for b in expected["blocked"]} <= {
        (b["key"], b["kind"]) for b in actual["blocked"]
    }
    for p in actual["points"]:
        assert (
            p["reason"].strip()
            and p["why"].strip()
            and not p["worked_answer_available"]
        )
        assert p["source"]["kind"] in {"rule", "general_good_practice"}

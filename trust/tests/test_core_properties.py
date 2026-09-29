"""Independent invariants across generated inputs; no production algorithms are imported."""

import copy

import pytest
from hypothesis import given
from hypothesis import strategies as st
from support import detail, load, profiles, provenance, rehash, validate

pytestmark = pytest.mark.runtime
sizes = st.lists(st.integers(min_value=1, max_value=1000), min_size=4, max_size=4)


@given(values=sizes)
def test_solver_conserves_supplied_values_and_dependent_sum(core, values):
    ddl = detail()
    for obj, value in zip(ddl["objects"], values, strict=True):
        obj["thickness"] = value
    rehash(ddl)
    actual = core.post("/ddl/resolve", ddl)
    validate("ddl", actual)
    assert actual["solver"]["status"] == "resolved"
    assert actual["constraints"] == ddl["constraints"]
    assert [o["thickness"] for o in actual["objects"]] == values
    assert actual["dimensions"][0]["value"] == sum(values)
    assert provenance(actual) == provenance(ddl)


@given(
    value=st.integers(1, 1000),
    offset=st.integers(1, 200),
    kind=st.sampled_from(["equality", "offset", "min", "max"]),
)
def test_all_constraint_types_preserve_user_values(core, value, offset, kind):
    ddl = detail()
    a, b = ddl["objects"][:2]
    a["thickness"] = value
    b["thickness"] = value + offset if kind == "offset" else value
    constraint = {"id": "relationship", "type": kind, "source": "user", "confidence": 1}
    if kind == "equality":
        constraint["of"] = [a["id"] + ".thickness", b["id"] + ".thickness"]
    elif kind == "offset":
        constraint.update(
            target=b["id"] + ".thickness",
            **{"from": a["id"] + ".thickness"},
            value=offset,
        )
    else:
        constraint.update(target=a["id"] + ".thickness", value=value)
    ddl["constraints"].append(constraint)
    actual = core.post("/ddl/resolve", rehash(ddl))
    assert actual["solver"]["status"] == "resolved"
    assert actual["constraints"] == ddl["constraints"]
    assert actual["objects"] == ddl["objects"]


@given(values=sizes, delta=st.integers(1, 100))
def test_conflicting_driving_dimension_is_surfaced_not_overwritten(core, values, delta):
    ddl = detail()
    for obj, value in zip(ddl["objects"], values, strict=True):
        obj["thickness"] = value
    ddl["dimensions"][0].update(value=sum(values) + delta, driving=True)
    actual = core.post("/ddl/resolve", rehash(ddl))
    validate("ddl", actual)
    assert actual["solver"]["status"] == "conflict"
    assert any(
        "sum-thickness" in c["constraint_ids"] for c in actual["solver"]["conflicts"]
    )
    assert actual["objects"] == ddl["objects"]
    assert actual["dimensions"] == ddl["dimensions"]


@given(values=sizes)
def test_solver_and_rule_outputs_are_byte_identical_across_two_runs(core, values):
    ddl = detail()
    for obj, value in zip(ddl["objects"], values, strict=True):
        obj["thickness"] = value
    rehash(ddl)
    first = core.raw("/ddl/resolve", ddl)
    second = core.raw("/ddl/resolve", ddl)
    assert first.status_code == second.status_code == 200
    assert first.content == second.content
    request = {"ddl": first.json(), "profiles": profiles()}
    first_check, second_check = core.raw("/check", request), core.raw("/check", request)
    assert first_check.status_code == second_check.status_code == 200
    assert first_check.content == second_check.content


@given(
    source=st.sampled_from(
        [
            "user",
            "project",
            "reference",
            "profile",
            "manufacturer",
            "ai_inferred",
            "auto_fix",
        ]
    ),
    confidence=st.sampled_from([0, 0.3, 0.79, 0.8, 1]),
)
def test_solver_preserves_every_provenance_source(core, source, confidence):
    ddl = detail()
    obj = ddl["objects"][0]
    obj.update(
        source=source,
        confidence=confidence,
        verify=source == "ai_inferred" and confidence < 0.8,
    )
    details = {
        "profile": {"profile": {"id": "generic", "version": "0.1.0"}},
        "manufacturer": {
            "manufacturer_profile": {"id": "test-product", "version": "0.1.0"}
        },
        "reference": {
            "reference": {"asset_id": "owned-reference", "rights_confirmed": True}
        },
        "auto_fix": {"auto_fix": {"rule_id": "fixture-rule"}},
    }
    if source in details:
        obj["source_detail"] = details[source]
    validate("ddl", rehash(ddl))
    actual = core.post("/ddl/resolve", ddl)
    assert provenance(actual) == provenance(ddl)


@given(
    verified=st.booleans(),
    signed=st.booleans(),
    mode=st.sampled_from(["draft", "idea"]),
)
def test_no_pass_without_verified_signed_rule(core, verified, signed, mode):
    ps = profiles()
    for p in ps:
        p["rules"] = [
            r for r in p["rules"] if r["applies_to"]["detail_type"] == "parapet"
        ]
        p["coverage"]["rules_total"] = len(p["rules"])
        p["coverage"]["rules_verified"] = len(p["rules"]) if verified and signed else 0
        for rule in p["rules"]:
            rule["modes"] = ["draft", "idea", "learn"]
            rule["state"] = "verified" if verified else "unverified"
            rule["signer"] = (
                {
                    "name": "Synthetic examiner signer",
                    "credential": "TEST-ONLY",
                    "signed_at": "2026-09-27T00:00:00Z",
                }
                if signed
                else None
            )
    ddl = detail(field="resolved")
    ddl["drawing"]["mode"] = mode
    response = core.raw("/check", {"ddl": rehash(ddl), "profiles": ps})
    if verified != signed:
        # Invalid rule documents must be rejected; no silent promotion or repair.
        assert response.status_code in (400, 422)
        return
    assert response.status_code == 200
    run = response.json()
    validate("check-result", run)
    assert run["results"], "Empty output cannot satisfy fail-closed coverage"
    relevant = [
        r
        for r in run["results"]
        if r["rule_id"] in {r["id"] for p in ps for r in p["rules"]}
    ]
    assert len(relevant) == 2
    if not verified:
        assert all(
            r["status"] == "flag" and r["reason"] == "unverified" for r in relevant
        )
    elif mode == "draft":
        assert all(r["status"] == "pass" and r["signer"] for r in relevant)
    else:
        assert all(r["status"] != "pass" for r in run["results"])


def test_absent_coverage_is_no_rule_and_lists_unperformed_categories(core):
    ps = profiles()
    for p in ps:
        p["rules"] = []
        p["coverage"]["rules_total"] = 0
        p["coverage"]["checks_available"] = []
        p["coverage"]["checks_not_available"] = list(p["check_categories"])
    result = core.post("/check", {"ddl": detail(field="resolved"), "profiles": ps})
    validate("check-result", result)
    assert result["results"]
    assert any(
        r["reason"] == "no_rule" and r["status"] == "flag" for r in result["results"]
    )
    assert not any(r["status"] == "pass" for r in result["results"])
    assert result["checks_not_performed"]


@given(
    kind=st.sampled_from(
        [
            "load",
            "rating",
            "member_size",
            "cable_size",
            "fire_period",
            "u_value_target",
            "structural_connection",
        ]
    ),
    mode=st.sampled_from(["draft", "idea", "learn"]),
)
def test_missing_engineering_value_is_blocked_never_invented(core, kind, mode):
    request = {
        "mode": mode,
        "jurisdiction": "GB-ENG",
        "profiles": profiles(),
        "inputs": [
            {
                "kind": "text",
                "text": "Draw a detail requiring a "
                + kind.replace("_", " ")
                + ". I have not supplied that value; ask me for it.",
            }
        ],
        "required_engineering": [{"key": kind, "kind": kind}],
    }
    actual = core.post("/interpret", request)
    validate("interpretation", actual)
    blocked = [b for b in actual["blocked"] if b["kind"] == kind]
    assert blocked and all(b["request"].strip() for b in blocked)
    assert all(i["value"] is None for i in actual["recognised"] if i["key"] == kind)
    assert not any(i["key"] == kind for i in actual["assumptions"])


@given(jurisdiction=st.sampled_from(["GB-ENG", "NG-LA"]), attach_client=st.booleans())
def test_fr09_jurisdiction_defaults_are_not_replaced_by_client_conventions(
    core, jurisdiction, attach_client
):
    generic, gb = profiles()
    chosen = (
        gb if jurisdiction == "GB-ENG" else load("fixtures/core/profiles/ng-la.json")
    )
    ps = [generic, chosen]
    if attach_client:
        client = copy.deepcopy(gb)
        client["metadata"].update(id="uk-client-conventions", type="client")
        client.pop("construction_defaults", None)
        client["rules"] = []
        client["coverage"].update(rules_total=0, rules_verified=0, checks_available=[])
        ps.append(client)
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": jurisdiction,
            "profiles": ps,
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a small house; I have not specified materials.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    wall = next(a for a in actual["assumptions"] if a["key"] == "wall_build_up")
    expected = (
        "gb_cavity_brick_block" if jurisdiction == "GB-ENG" else "ng_sandcrete_render"
    )
    assert wall["value"] == expected
    assert wall["source"] == "profile"
    assert wall["source_detail"]["profile"] == {
        "id": chosen["metadata"]["id"],
        "version": "0.1.0",
    }
    forbidden = "sandcrete" if jurisdiction == "GB-ENG" else "brick"
    assert forbidden not in wall["text"].lower()


def test_user_material_overrides_default_and_keeps_user_provenance(core):
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": "NG-LA",
            "profiles": [profiles()[0], load("fixtures/core/profiles/ng-la.json")],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Use a brick cavity wall for this Lagos house; this is my explicit material choice.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    walls = [x for x in actual["recognised"] if x["key"] == "wall_build_up"]
    assert walls and all(x["source"] == "user" for x in walls)
    assert all("brick" in str(x["value"]).lower() for x in walls)
    assert not any(a["key"] == "wall_build_up" for a in actual["assumptions"])


def test_draft_compile_requires_confirmed_card(core):
    ddl = detail()
    for card in (None, {"card_id": "unconfirmed", "status": "draft"}):
        response = core.raw("/compile", {"mode": "draft", "ddl": ddl, "card": card})
        assert response.status_code in (400, 409, 422)


@pytest.mark.parametrize(
    "region,expected",
    [
        ("west_africa_coastal", "ng_sandcrete_render"),
        ("northern_europe", "gb_cavity_brick_block"),
    ],
)
def test_generic_regional_defaults_are_inferred_and_require_verification(
    core, region, expected
):
    generic = profiles()[0]
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": "GENERIC:" + region,
            "climate_region": region,
            "profiles": [generic],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a house; materials have not been supplied.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    wall = next(a for a in actual["assumptions"] if a["key"] == "wall_build_up")
    assert wall["value"] == expected
    assert wall["source"] == "ai_inferred" and wall["verify"] is True
    assert wall["confidence"] < 0.8


def test_explicit_client_material_override_is_visible(core):
    generic, gb = profiles()
    client = copy.deepcopy(gb)
    client["metadata"].update(id="explicit-client-wall", type="client", signers=[])
    client["rules"] = []
    client["coverage"].update(rules_total=0, rules_verified=0, checks_available=[])
    # Only an explicit wall default: the rest of the client's conventions do not imply material overrides.
    client["construction_defaults"]["walls"][0]["id"] = "client_brick_cavity"
    for material in client["construction_defaults"]["materials"]:
        material["source_detail"]["profile"] = {
            "id": "explicit-client-wall",
            "version": "0.1.0",
        }
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": "NG-LA",
            "profiles": [generic, load("fixtures/core/profiles/ng-la.json"), client],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Use the attached client profile's explicit wall default.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    wall = next(a for a in actual["assumptions"] if a["key"] == "wall_build_up")
    assert wall["value"] == "client_brick_cavity"
    assert wall["source_detail"]["profile"] == {
        "id": "explicit-client-wall",
        "version": "0.1.0",
    }
    assert "client" in wall["text"].lower()

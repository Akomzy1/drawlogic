"""Prompt 3: examine authored profiles, not the synthetic Prompt 2 profile inputs."""

import copy
import importlib
import json
import re

import pytest
from support import MANIFEST, ROOT, load, validate

pytestmark = pytest.mark.profiles
CASES = load("fixtures/core/profile-cases.json")
PROFILE_CASES = CASES["profiles"]


def authored(profile_id):
    directory = ROOT / "profiles" / profile_id
    matches = []
    for path in sorted(directory.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8-sig"))
        if isinstance(data, dict) and data.get("metadata", {}).get("id") == profile_id:
            matches.append(data)
    assert len(matches) == 1, (
        f"PROFILE_UNAVAILABLE: expected one authored profile document for {profile_id} "
        f"in {directory}; found {len(matches)}. Prompt 2 fixtures are not substitutes."
    )
    return matches[0]


def defaults(profile):
    if profile["metadata"]["type"] == "generic":
        return list(profile["construction_defaults_by_region"].values())
    return [profile["construction_defaults"]]


def builds(block):
    return (
        block["walls"]
        + [block["frame"]]
        + block["roofs"]
        + block["floors"]
        + block["windows"]
        + block["doors"]
        + [item for group in block["finishes"].values() for item in group]
    )


def material_text(block, build):
    materials = {m["id"]: m for m in block["materials"]}
    return " ".join(
        " ".join(
            str(materials[layer["material_id"]].get(key, ""))
            for key in ("id", "name", "category")
        )
        for layer in build["layers"]
        if layer["material_id"] is not None
    ).lower()


def assert_coverage(profile, coverage):
    validate("profile", {**profile, "coverage": coverage})
    available = {r["category"] for r in profile["rules"]}
    categories = set(profile["check_categories"])
    assert available <= categories
    assert coverage["rules_total"] == len(profile["rules"])
    assert coverage["rules_verified"] == sum(
        r["state"] == "verified" for r in profile["rules"]
    )
    assert set(coverage["checks_available"]) == available
    assert set(coverage["checks_not_available"]) == categories - available
    statement = coverage["statement"].strip()
    assert statement and profile["metadata"]["version"] in statement
    assert profile["metadata"]["name"].casefold() in statement.casefold()
    if profile["metadata"]["tier"] is not None:
        assert re.search(
            rf"tier\s*{profile['metadata']['tier']}\b", statement, re.IGNORECASE
        )
    assert re.search(
        r"unsigned|no signer|not signed|unverified", statement, re.IGNORECASE
    )
    if not profile["rules"]:
        assert "no rules yet" in statement.casefold()


@pytest.mark.parametrize("case", PROFILE_CASES, ids=lambda c: c["id"])
def test_authored_profile_schema_version_and_stub_scope(case):
    profile = authored(case["id"])
    validate("profile", profile)
    assert profile["metadata"]["version"] == "0.1.0"
    assert profile["metadata"]["type"] == case["type"]
    if "jurisdiction" in case:
        assert profile["metadata"]["jurisdiction"] == case["jurisdiction"]
    if case["stub"]:
        assert profile["rules"] == []
        assert profile["metadata"].get("signers", []) == []
    else:
        assert profile["rules"], "An empty Generic or GB profile cannot pass by vacuity"


@pytest.mark.parametrize("case", PROFILE_CASES, ids=lambda c: c["id"])
def test_every_launch_rule_is_unsigned_unverified_and_explained(case):
    from contracts.scripts.condition_text import condition_text

    profile = authored(case["id"])
    assert profile["metadata"].get("signers", []) == []
    ids = [r["id"] for r in profile["rules"]]
    assert len(ids) == len(set(ids))
    for rule in profile["rules"]:
        assert rule["state"] == "unverified" and rule["signer"] is None
        assert rule["profile"] == {"id": case["id"], "version": "0.1.0"}
        assert rule["message"].strip()
        assert rule["condition_text"] == condition_text(rule)
        why = rule["why"].strip()
        assert len(re.findall(r"\w+", why)) >= 5, "Explain the reason in a sentence"
        assert not re.search(
            r"\b(?:todo|tbd|placeholder|lorem ipsum)\b", why, re.IGNORECASE
        )
        if case["id"] == "gb-eng-residential":
            assert rule["document"] and rule["document"]["ref"].strip()
            assert rule["document"]["ref"] in {
                d["ref"] for d in profile["applicable_documents"]
            }
        elif case["id"] == "generic":
            assert rule["document"] is None


@pytest.mark.parametrize("case", PROFILE_CASES, ids=lambda c: c["id"])
def test_stored_coverage_truthfully_describes_authored_rules(case):
    profile = authored(case["id"])
    assert_coverage(profile, profile["coverage"])


@pytest.mark.parametrize("case", PROFILE_CASES, ids=lambda c: c["id"])
def test_coverage_generator_derives_counts_and_exclusions(case):
    profile = authored(case["id"])
    try:
        generate = importlib.import_module("profiles.coverage").generate_coverage
    except (ImportError, AttributeError) as exc:
        pytest.fail(
            f"COVERAGE_GENERATOR_UNAVAILABLE: profiles.coverage:generate_coverage ({exc})",
            pytrace=False,
        )
    original = copy.deepcopy(profile)
    result = generate(profile)
    assert profile == original, "Coverage generation must not mutate its input"
    assert_coverage(profile, result)
    assert result == generate(profile), "Same profile must produce identical coverage"
    # A cached or hand-authored paragraph cannot pass this mutation.
    changed = copy.deepcopy(profile)
    changed["rules"] = []
    changed["coverage"] = {
        **profile["coverage"],
        "statement": "stale",
        "rules_total": 999,
        "rules_verified": 999,
        "checks_available": ["stale"],
        "checks_not_available": [],
    }
    assert_coverage(changed, generate(changed))
    if profile["rules"]:
        changed = copy.deepcopy(profile)
        removed_category = profile["rules"][0]["category"]
        changed["rules"] = [
            r for r in changed["rules"] if r["category"] != removed_category
        ]
        coverage = generate(changed)
        assert_coverage(changed, coverage)
        assert removed_category in coverage["checks_not_available"]


@pytest.mark.parametrize("case", PROFILE_CASES, ids=lambda c: c["id"])
def test_conventions_and_material_references_are_complete(case):
    profile = authored(case["id"])
    conventions = profile["conventions"]
    if case["id"] == "generic":
        assert conventions.get("by_region")
        convention_sets = list(conventions["by_region"].values())
    else:
        convention_sets = [conventions]
    for item in convention_sets:
        for key in ("units", "sheets", "layer_standard", "symbol_set"):
            assert item.get(key), f"Missing {key} in {case['id']}"
    for block in defaults(profile):
        ids = [m["id"] for m in block["materials"]]
        assert ids and len(ids) == len(set(ids))
        for build in builds(block):
            assert build["plain_description"].strip()
            for layer in build["layers"]:
                assert layer["material_id"] is None or layer["material_id"] in ids
    methods = {b["id"] for block in defaults(profile) for b in builds(block)}
    for typical in profile["typical_details"]:
        assert typical["construction_method"] in methods
        assert typical["principles"] and all(p.strip() for p in typical["principles"])
        if typical.get("ddl_ref"):
            directory = (ROOT / "profiles" / case["id"]).resolve()
            path = (directory / typical["ddl_ref"]).resolve()
            assert path.is_relative_to(directory)
            assert path.is_file(), f"Missing typical detail: {path}"
            ddl = json.loads(path.read_text(encoding="utf-8-sig"))
            validate("ddl", ddl)
            material_names = json.dumps(ddl["materials"]).lower()
            if case["id"] == "ng-la":
                assert not (
                    "brick" in material_names and "cavity" in json.dumps(ddl).lower()
                )
            elif case["id"] == "gb-eng-residential":
                assert "sandcrete" not in material_names


def test_gb_has_required_constraints_and_typical_details_for_every_named_type():
    profile = authored("gb-eng-residential")
    types = {d["id"] for d in MANIFEST["details"]}
    assert types <= profile["required_constraints"].keys()
    assert types <= {t["detail_type"] for t in profile["typical_details"]}
    for kind in types:
        variants = profile["required_constraints"][kind]
        assert variants["draft"], f"{kind} lacks Draft required constraints"
        assert "idea" in variants
        for items in variants.values():
            for item in items:
                if item["kind"] == "engineering":
                    assert item["engineering_kind"]
                    assert "default_from" not in item


def test_gb_documents_and_generic_good_practice_coverage():
    gb = authored("gb-eng-residential")
    refs = {d["ref"] for d in gb["applicable_documents"]}
    assert set(CASES["required_gb_documents"]) <= refs
    assert any(ref.startswith(("BS ", "PAS ")) for ref in refs)
    generic = authored("generic")
    # Readable rules must cover each FR-34 topic; category IDs are pack vocabulary.
    text = " ".join(
        " ".join(str(r.get(k, "")) for k in ("id", "category", "message", "why"))
        for r in generic["rules"]
    ).lower()
    for terms in (
        ("closure", "closed"),
        ("dimension",),
        ("symbol", "legend"),
        ("annotation",),
        ("thermal", "insulation"),
        ("drainage", "water path"),
    ):
        assert any(term in text for term in terms), f"Missing Generic topic: {terms}"


def test_ng_material_defaults_and_typical_details_never_select_brick_cavity():
    profile = authored("ng-la")
    block = profile["construction_defaults"]
    assert block["walls"]
    for wall in block["walls"]:
        text = material_text(block, wall)
        assert "sandcrete" in text
        assert "brick" not in text
        assert not any(layer["role"] == "cavity" for layer in wall["layers"])
    whole = json.dumps(block).lower()
    assert "render" in whole
    assert re.search(
        r"reinforced.?concrete|\brc\b|rc_", material_text(block, block["frame"])
    )
    assert "aluminium" in " ".join(material_text(block, w) for w in block["windows"])
    roof = " ".join(material_text(block, r) for r in block["roofs"])
    assert "aluminium" in roof or "concrete" in roof
    assert not any(
        "brick" in t["construction_method"].lower() for t in profile["typical_details"]
    )


def test_gb_material_defaults_never_select_sandcrete():
    profile = authored("gb-eng-residential")
    block = profile["construction_defaults"]
    for wall in block["walls"]:
        text = material_text(block, wall)
        assert "sandcrete" not in text
    assert any(
        "brick" in material_text(block, w)
        and "block" in material_text(block, w)
        and any(layer["role"] == "cavity" for layer in w["layers"])
        for w in block["walls"]
    )
    assert not any(
        "sandcrete" in t["construction_method"].lower()
        for t in profile["typical_details"]
    )


def test_generic_has_distinct_regional_construction_defaults():
    profile = authored("generic")
    regions = profile["construction_defaults_by_region"]
    assert set(CASES["regions"]) <= regions.keys()
    west = regions["west_africa_coastal"]
    north = regions["northern_europe"]
    assert all("brick" not in material_text(west, wall) for wall in west["walls"])
    assert any("block" in material_text(west, wall) for wall in west["walls"])
    assert all("sandcrete" not in material_text(north, wall) for wall in north["walls"])
    assert west["walls"] != north["walls"]


@pytest.mark.runtime
@pytest.mark.parametrize("region", CASES["regions"])
def test_generic_resolution_uses_inferred_provenance_and_verify(core, region):
    profile = authored("generic")
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": "GENERIC:" + region,
            "climate_region": region,
            "profiles": [profile],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a house; no construction materials were specified.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    assumptions = {a["key"]: a for a in actual["assumptions"]}
    for key, slot in (
        ("wall_build_up", "walls"),
        ("roof_type", "roofs"),
        ("frame", "frame"),
    ):
        assumption = assumptions[key]
        choices = profile["construction_defaults_by_region"][region][slot]
        if isinstance(choices, dict):
            choices = [choices]
        assert assumption["value"] in {b["id"] for b in choices}
        assert assumption["source"] == "ai_inferred" and assumption["verify"] is True
        assert assumption["confidence"] < profile.get("provenance_settings", {}).get(
            "verify_threshold", 0.8
        )
        assert assumption["text"].strip()


@pytest.mark.runtime
@pytest.mark.parametrize(
    "profile_id,jurisdiction,forbidden",
    [
        ("ng-la", "NG-LA", "brick"),
        ("gb-eng-residential", "GB-ENG", "sandcrete"),
    ],
)
def test_authored_jurisdiction_defaults_flow_into_real_core(
    core, profile_id, jurisdiction, forbidden
):
    profile = authored(profile_id)
    actual = core.post(
        "/interpret",
        {
            "mode": "idea",
            "jurisdiction": jurisdiction,
            "profiles": [authored("generic"), profile],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a house; I have not specified any materials.",
                }
            ],
        },
    )
    validate("interpretation", actual)
    assumption = next(a for a in actual["assumptions"] if a["key"] == "wall_build_up")
    walls = {b["id"]: b for b in profile["construction_defaults"]["walls"]}
    assert assumption["value"] in walls
    assert forbidden not in material_text(
        profile["construction_defaults"], walls[assumption["value"]]
    )
    assert assumption["source"] == "profile"
    assert assumption["source_detail"]["profile"] == {
        "id": profile_id,
        "version": "0.1.0",
    }

"""FR-07–09 integration against real Prompt 3 data and the core interpreter."""

import copy

import pytest
from profile_support import REGIONS, assert_regional_wall, shipped_profile
from support import validate

pytestmark = [pytest.mark.profiles, pytest.mark.runtime]


@pytest.mark.parametrize(
    "profile_id,jurisdiction", [("ng-la", "NG-LA"), ("gb-eng-residential", "GB-ENG")]
)
@pytest.mark.parametrize("mode", ["draft", "idea"])
@pytest.mark.parametrize("overlay_type", [None, "client", "office"])
def test_real_jurisdiction_defaults_survive_convention_only_overlays(
    core, profile_id, jurisdiction, mode, overlay_type
):
    generic = shipped_profile("generic")
    profile = shipped_profile(profile_id)
    stack = [generic, profile]
    if overlay_type:
        overlay = copy.deepcopy(shipped_profile("gb-eng-residential"))
        overlay["metadata"].update(id=f"exam-{overlay_type}", type=overlay_type)
        overlay.pop("construction_defaults")
        overlay["rules"] = []
        overlay["typical_details"] = []
        overlay["coverage"].update(
            rules_total=0,
            rules_verified=0,
            checks_available=[],
            checks_not_available=overlay["check_categories"],
        )
        validate("profile", overlay)
        stack.append(overlay)
    result = core.post(
        "/interpret",
        {
            "mode": mode,
            "jurisdiction": jurisdiction,
            "profiles": stack,
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a small house. I have not specified any materials.",
                }
            ],
        },
    )
    validate("interpretation", result)
    choices = result["assumptions"] if mode == "idea" else result["recognised"]
    walls = [row for row in choices if row["key"] == "wall_build_up"]
    assert walls
    defaults = profile["construction_defaults"]
    for row in walls:
        assert row["source"] == "profile"
        assert row["source_detail"]["profile"] == {"id": profile_id, "version": "0.1.0"}
        wall = next((w for w in defaults["walls"] if w["id"] == row["value"]), None)
        assert wall is not None
        assert_regional_wall(defaults, wall, jurisdiction)


@pytest.mark.parametrize("region", REGIONS)
@pytest.mark.parametrize("mode", ["draft", "idea"])
def test_real_generic_resolves_region_with_inferred_provenance_and_confirmation(
    core, region, mode
):
    generic = shipped_profile("generic")
    result = core.post(
        "/interpret",
        {
            "mode": mode,
            "jurisdiction": "GENERIC:" + region,
            "climate_region": region,
            "profiles": [generic],
            "inputs": [
                {
                    "kind": "text",
                    "text": "Draw a small house. Materials have not been supplied.",
                }
            ],
        },
    )
    validate("interpretation", result)
    choices = result["assumptions"] if mode == "idea" else result["recognised"]
    walls = [row for row in choices if row["key"] == "wall_build_up"]
    assert walls
    defaults = generic["construction_defaults_by_region"][region]
    for row in walls:
        assert row["source"] == "ai_inferred"
        assert row["verify"] is True and row["confidence"] < 0.8
        wall = next((w for w in defaults["walls"] if w["id"] == row["value"]), None)
        assert wall is not None
        assert_regional_wall(defaults, wall, region)
    if mode == "draft":
        assert result["status"] != "confirmed"
        assert any(
            q["key"] == "wall_build_up" and q["question"].strip()
            for q in result["missing"]
        )

"""Shared Prompt 3 runtime assertions; no production profile implementation."""

from support import validate
from test_profiles_prompt3 import CASES, authored

REGIONS = tuple(CASES["regions"])


def shipped_profile(profile_id):
    profile = authored(profile_id)
    validate("profile", profile)
    return profile


def material_text(defaults, build_up):
    materials = {m["id"]: m for m in defaults["materials"]}
    parts = [build_up["name"], build_up["plain_description"]]
    for layer in build_up["layers"]:
        parts.append(layer["role"])
        if layer["material_id"] is not None:
            material = materials[layer["material_id"]]
            parts.extend((material["id"], material["name"]))
    return " ".join(parts).lower().replace("_", " ").replace("-", " ")


def assert_regional_wall(defaults, wall, region):
    text = material_text(defaults, wall)
    if region in ("NG-LA", "west_africa_coastal", "gulf"):
        assert not ("brick" in text and "cavity" in text), text
        assert "block" in text or "sandcrete" in text, text
        if region == "NG-LA":
            assert "sandcrete" in text and "render" in text, text
    else:
        assert "sandcrete" not in text, text
        assert "brick" in text or "timber" in text, text

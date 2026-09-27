"""Coverage statement for a profile (PRD FR-04, FR-32), derived only from its rules and check categories.

Pure: the same profile always yields the same coverage, the input is never mutated, and any stored coverage is ignored.
"""

from __future__ import annotations

from typing import Any


def _label(category: str) -> str:
    return category.replace("_", " ")


def _join(items: list[str]) -> str:
    return ", ".join(_label(c) for c in items) if items else "none"


def generate_coverage(profile: dict[str, Any]) -> dict[str, Any]:
    meta = profile["metadata"]
    rules = profile.get("rules", [])
    categories = list(profile.get("check_categories", []))
    # A rule category missing from check_categories still counts as covered.
    for rule in rules:
        if rule["category"] not in categories:
            categories.append(rule["category"])
    covered = {r["category"] for r in rules}
    available = [c for c in categories if c in covered]
    not_available = [c for c in categories if c not in covered]
    verified = sum(1 for r in rules if r["state"] == "verified")

    title = f"{meta['name']} v{meta['version']}"
    if meta.get("tier") is not None:
        title += f" (Tier {meta['tier']})"
    if not rules:
        statement = (
            f"{title} has no rules yet and is unsigned: it supplies conventions and construction defaults only. "
            f"Checks not available: {_join(not_available)}."
        )
    else:
        plural = "s" if len(rules) != 1 else ""
        if verified == 0:
            state = "All are unverified and unsigned, so every result is a flag for professional review, never a pass."
        elif verified == len(rules):
            state = "All are verified and signed."
        else:
            state = f"{verified} are verified and signed; the other {len(rules) - verified} are unverified and can only flag."
        statement = (
            f"{title} runs {len(rules)} automated check{plural} covering {_join(available)}. {state} "
            f"Checks not available: {_join(not_available)}."
        )
    return {
        "statement": statement,
        "checks_available": available,
        "checks_not_available": not_available,
        "rules_total": len(rules),
        "rules_verified": verified,
    }

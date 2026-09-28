"""The profile stack a check runs against (PRD FR-03, FR-30; contracts/profile.schema.json, rule.schema.json).

Profiles are validated against the contract before any rule runs, so an inconsistent rule — `verified` without a
signer, or a signer on an `unverified` rule — is rejected, never repaired or quietly downgraded (trust rule 3).
The supplied profiles must be exactly the versions the drawing pins in `drawing.profile_stack`.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from engine.core.contracts import schema_errors
from engine.core.ddl import Issue

# Evaluation order: Generic first, then jurisdiction → regional → client → office → manufacturer (FR-03).
LAYER_ORDER = ("generic", "jurisdiction", "regional", "client", "office", "manufacturer")


@dataclass(frozen=True)
class Stack:
    profiles: list[dict[str, Any]]

    @property
    def versions(self) -> dict[str, str]:
        return {p["metadata"]["id"]: p["metadata"]["version"] for p in self.profiles}

    @property
    def rules(self) -> list[dict[str, Any]]:
        return [rule for p in self.profiles for rule in p["rules"]]

    @property
    def categories(self) -> list[str]:
        """Every check category the stack recognises, in stack order, without repeats."""
        seen: dict[str, None] = {}
        for p in self.profiles:
            for category in [*p.get("check_categories", []), *p["coverage"]["checks_not_available"]]:
                seen.setdefault(category, None)
        return list(seen)


def load_stack(profiles: Any, ddl: dict[str, Any]) -> tuple[Stack | None, list[Issue]]:
    if not isinstance(profiles, list) or not profiles:
        return None, [Issue("/profiles", "supply the drawing's profile stack as a non-empty list")]
    issues: list[Issue] = []
    for i, profile in enumerate(profiles):
        issues += [Issue(f"/profiles/{i}{e['path']}", e["message"]) for e in schema_errors("profile", profile)]
    if issues:
        return None, issues

    for i, profile in enumerate(profiles):
        ref = {"id": profile["metadata"]["id"], "version": profile["metadata"]["version"]}
        for j, rule in enumerate(profile["rules"]):
            if rule["profile"] != ref:
                issues.append(
                    Issue(f"/profiles/{i}/rules/{j}/profile", f"rule {rule['id']!r} names {rule['profile']}, not {ref}")
                )
    supplied = {(p["metadata"]["id"], p["metadata"]["version"]) for p in profiles}
    if len(supplied) != len(profiles):
        issues.append(Issue("/profiles", "a profile is supplied more than once"))
    pinned = {(p["id"], p["version"]) for p in ddl["drawing"]["profile_stack"]}
    for pid, version in sorted(pinned - supplied):
        issues.append(Issue("/profiles", f"the drawing pins {pid} {version}, which was not supplied"))
    for pid, version in sorted(supplied - pinned):
        issues.append(Issue("/profiles", f"{pid} {version} is not in the drawing's profile stack"))
    rule_ids = [r["id"] for p in profiles for r in p["rules"]]
    for rid in sorted({r for r in rule_ids if rule_ids.count(r) > 1}):
        issues.append(Issue("/profiles", f"rule id {rid!r} appears more than once in the stack"))
    if issues:
        return None, issues

    ordered = sorted(enumerate(profiles), key=lambda ip: (LAYER_ORDER.index(ip[1]["metadata"]["type"]), ip[0]))
    return Stack([p for _, p in ordered]), []

"""One check run: a resolved DDL against its profile stack → contracts/check-result.schema.json (PRD FR-30–34, FR-97).

Fail-closed (trust rule 3):
  - ✓ pass needs a verified rule with a signer, whose condition holds, outside Idea mode;
  - an unverified rule is ⚠ unverified — or ⚠ fail when its condition does not hold;
  - a rule whose inputs the drawing does not carry is ⚠ needs_input — including an object rule whose class is not drawn;
  - a drawing no rule in the stack applies to gets ⚠ no_rule for every category the stack recognises;
  - every recognised category without a completed check is listed in checks_not_performed.
In Idea mode a verified rule whose condition holds is — out of scope: Idea reports things to check with a
professional and never shows ✓ (FR-97).

Deterministic: the same request gives the same bytes. `run_id` is derived from the inputs, and `generated_at` is the
as-of time of the revision checked (solver.resolved_at, else drawing.created_at); the trust layer records when a run
happened.
"""

from __future__ import annotations

import uuid
from typing import Any

from engine.core.ddl import digest
from engine.core.rules.evaluate import Context, Missing, has_input, holds
from engine.core.rules.stack import Stack

SCHEMA_VERSION = "0.1.0"
RUN_NAMESPACE = uuid.UUID("5b0c3f55-2a8e-4f7c-9c1e-6d0a8f1e2b47")


def run_id(ddl: dict[str, Any], stack: Stack) -> str:
    return str(uuid.uuid5(RUN_NAMESPACE, digest({"drawing_hash": ddl["drawing"]["hash"], "profiles": stack.profiles})))


def applies(rule: dict[str, Any], drawing: dict[str, Any]) -> bool:
    target = rule["applies_to"]
    return (
        drawing["mode"] in rule["modes"]
        and target["drawing_type"] == drawing["type"]
        and target.get("detail_type", drawing.get("detail_type")) == drawing.get("detail_type")
    )


def fix_id(rule: dict[str, Any], subject: dict[str, Any] | None) -> str:
    return f"{rule['id']}@{subject['id'] if subject else 'drawing'}"


def _row(
    rule: dict[str, Any], subject: dict[str, Any] | None, status: str, reason: str | None, message: str
) -> dict[str, Any]:
    can_fix = reason == "fail" and rule["auto_fix"] is not None and subject is not None
    return {
        "rule_id": rule["id"],
        "profile": rule["profile"],
        "category": rule["category"],
        "status": status,
        "reason": reason,
        "object_ids": [subject["id"]] if subject else [],
        "message": message,
        "document": rule["document"],
        "rule_state": rule["state"],
        "signer": rule["signer"],
        "auto_fix": {"available": True, "fix_id": fix_id(rule, subject)} if can_fix else {"available": False},
        "resolution": None,
    }


def _needs(rule: dict[str, Any], subject: dict[str, Any] | None, what: str) -> dict[str, Any]:
    return _row(rule, subject, "flag", "needs_input", f"{rule['message']} Needs information to check: {what}.")


def evaluate(rule: dict[str, Any], ddl: dict[str, Any], subject: dict[str, Any] | None) -> dict[str, Any]:
    """The result row for one rule on one subject object (or on the whole drawing)."""
    ctx = Context(ddl, subject)
    verified = rule["state"] == "verified"
    if verified and not (rule["signer"] and rule["signer"].get("name") and rule["signer"].get("credential")):
        raise ValueError(f"rule {rule['id']} is verified but has no signer")  # schema-validated; never reached
    try:
        absent = [name for name in rule.get("requires_inputs", []) if not has_input(ctx, name)]
        if absent:
            raise Missing("the drawing does not give " + ", ".join(absent))
        ok = holds(rule["condition"], ctx)
    except Missing as exc:
        return _needs(rule, subject, str(exc))
    if not ok:
        return _row(rule, subject, "flag", "fail", rule["message"])
    if not verified:
        return _row(rule, subject, "flag", "unverified", rule["message"])
    if ddl["drawing"]["mode"] == "idea":
        return _row(rule, subject, "out_of_scope", None, rule["message"])
    return _row(rule, subject, "pass", None, rule["message"])


def _rows(rule: dict[str, Any], ddl: dict[str, Any]) -> list[dict[str, Any]]:
    """An object rule runs once per object of its class (rule.schema.json → applies_to.object_class)."""
    cls = rule["applies_to"].get("object_class")
    if cls is None:
        return [evaluate(rule, ddl, None)]
    subjects = [o for o in ddl["objects"] if o["class"] == cls]
    if not subjects:
        return [_needs(rule, None, f"the drawing has no {cls}")]
    return [evaluate(rule, ddl, o) for o in subjects]


def _label(category: str) -> str:
    return category.replace("_", " ")


def check(ddl: dict[str, Any], stack: Stack) -> dict[str, Any]:
    """Runs every applicable rule. `ddl` is a validated, resolved DDL; `stack` a loaded profile stack."""
    drawing = ddl["drawing"]
    results = [row for rule in stack.rules if applies(rule, drawing) for row in _rows(rule, ddl)]
    if not results:
        results = [
            {
                "rule_id": None,
                "category": category,
                "status": "flag",
                "reason": "no_rule",
                "object_ids": [],
                "message": f"No rule in the active profiles covers {_label(category)} for this drawing.",
                "document": None,
                "rule_state": None,
                "signer": None,
                "auto_fix": {"available": False},
                "resolution": None,
            }
            for category in stack.categories or ["coverage"]
        ]
    results = [{"id": f"result-{i}", **row} for i, row in enumerate(results, start=1)]

    performed = {r["category"] for r in results if r["reason"] not in ("no_rule", "needs_input")}
    passed = sum(r["status"] == "pass" for r in results)
    flagged = sum(r["status"] == "flag" for r in results)
    return {
        "schema_version": SCHEMA_VERSION,
        "run_id": run_id(ddl, stack),
        "drawing_id": drawing["id"],
        "drawing_hash": drawing["hash"],
        "mode": drawing["mode"],
        "profile_versions": stack.versions,
        "results": results,
        "checks_not_performed": [{"category": c, "label": _label(c)} for c in stack.categories if c not in performed],
        "blocked": [],
        "summary": {
            "performed": passed + flagged,
            "passed": passed,
            "flagged": flagged,
            "out_of_scope": sum(r["status"] == "out_of_scope" for r in results),
        },
        "generated_at": (ddl.get("solver") or {}).get("resolved_at") or drawing["created_at"],
    }

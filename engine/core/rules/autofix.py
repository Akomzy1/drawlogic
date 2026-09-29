"""Deterministic auto-fix (PRD FR-33): a rule's `auto_fix` applied to one failing object → contracts/ddl-diff.

Only a result the check run marked `auto_fix.available` can be fixed — a ⚠ fail on an object rule that carries a fix.
The fixed field records `source: auto_fix` with the rule id in the object's field_provenance; the object's other
fields keep their own provenance. The diff is applied and re-resolved; its result_hash is the resolved drawing's hash.
A fix that leaves the drawing in solver conflict is refused rather than delivered.
"""

from __future__ import annotations

import copy
from decimal import Decimal
from typing import Any

from engine.core import solver
from engine.core.ddl import apply_diff, diff, digest
from engine.core.rules.check import check
from engine.core.rules.evaluate import OBJECT_FIELDS, read_field
from engine.core.rules.stack import Stack


class FixRefused(Exception):
    pass


def _fixed_value(action: str, current: Any, value: Any) -> Any:
    if action == "set" or current is None:
        return value
    if isinstance(current, bool) or not isinstance(current, int | float) or not isinstance(value, int | float):
        raise FixRefused(f"cannot apply {action} to a non-numeric value")
    # min: raise to at least the value; max: lower to at most the value.
    now, bound = Decimal(repr(current)), Decimal(repr(value))
    keep = now >= bound if action == "min" else now <= bound
    return current if keep else value


def autofix(ddl: dict[str, Any], stack: Stack, fix: str) -> dict[str, Any]:
    run = check(ddl, stack)
    row = next((r for r in run["results"] if r["auto_fix"].get("fix_id") == fix), None)
    if row is None:
        raise FixRefused(f"{fix!r} is not an available fix for this drawing and profile stack")
    rule = next(r for r in stack.rules if r["id"] == row["rule_id"])
    (object_id,) = row["object_ids"]
    spec = rule["auto_fix"]
    provenance = {
        "source": "auto_fix",
        "confidence": 1,
        "verify": False,
        "source_detail": {"auto_fix": {"rule_id": rule["id"]}},
    }

    after = copy.deepcopy(ddl)
    obj = next(o for o in after["objects"] if o["id"] == object_id)
    field = spec["field"]
    value = _fixed_value(spec["action"], read_field(obj, field), spec["value"])
    if field in OBJECT_FIELDS:
        obj[field] = value
    else:
        obj.setdefault("properties", {})[field] = value
    obj.setdefault("field_provenance", {})[field] = provenance

    change = diff(
        ddl,
        after,
        origin={"kind": "auto_fix", "rule_id": rule["id"], "check_run_id": run["run_id"]},
        diff_id="autofix-" + digest({"base": ddl["drawing"]["hash"], "fix": fix})[7:23],
        provenance=provenance,
    )
    for op in change["ops"]:
        op.update(copy.deepcopy(provenance))
        op["summary"] = f"{rule['message']} Auto-fix: {field} on {object_id} set to {value}."
    resolved = solver.resolve(apply_diff(ddl, change))
    if resolved["solver"]["status"] == "conflict":
        raise FixRefused(
            "the fix would leave the drawing in conflict: " + resolved["solver"]["conflicts"][0]["message"]
        )
    change["result_hash"] = resolved["drawing"]["hash"]
    return change

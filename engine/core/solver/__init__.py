"""Constraint solver (PRD FR-20, FR-22). Deterministic; no model is called.

Constraints are first-class: sum, equality, offset, min, max. The solver
  - computes dependent values: non-driving dimensions, and object fields that are empty;
  - never overwrites a supplied value (an object field that has a value, or a driving dimension);
  - surfaces every conflict and changes nothing when one exists — conflicts are never silently resolved;
  - preserves provenance: it writes values only, never source, confidence, verify or source_detail.
Arithmetic is exact (decimal), so 102.5 + 120 + 2 + 25 is 249.5, not 249.49999…
"""

from __future__ import annotations

import copy
from dataclasses import dataclass
from decimal import Decimal
from typing import Any

from engine.core.ddl.hashing import with_hash

Number = Decimal


def _num(value: Any) -> Decimal | None:
    if value is None or isinstance(value, bool) or not isinstance(value, int | float):
        return None
    return Decimal(repr(value)) if isinstance(value, float) else Decimal(value)


def _out(value: Decimal) -> int | float:
    return int(value) if value == value.to_integral_value() else float(value)


@dataclass
class Slot:
    """One operand: a literal, a dimension value, or an object field (object_id.field[.sub…])."""

    key: str
    value: Decimal | None
    writable: bool  # the solver may set it (it is dependent and currently unknown)


class Model:
    def __init__(self, ddl: dict[str, Any]) -> None:
        self.ddl = ddl
        self.dimensions = {d["id"]: d for d in ddl["dimensions"]}
        self.objects = {o["id"]: o for o in ddl["objects"]}
        self.slots: dict[str, Slot] = {}

    def slot(self, operand: Any) -> Slot:
        if not isinstance(operand, str):
            return Slot(key=f"literal:{operand}", value=_num(operand), writable=False)
        if operand in self.slots:
            return self.slots[operand]
        if "." not in operand:
            dim = self.dimensions[operand]
            # A driving dimension is supplied; a non-driving one is measured, so the solver computes it.
            slot = Slot(operand, _num(dim["value"]) if dim["driving"] else None, writable=not dim["driving"])
        else:
            current = self._read(operand)
            slot = Slot(operand, _num(current), writable=current is None)
        self.slots[operand] = slot
        return slot

    def _read(self, operand: str) -> Any:
        head, *path = operand.split(".")
        node: Any = self.objects[head]
        for part in path:
            if isinstance(node, list):
                node = node[int(part)] if part.isdigit() and int(part) < len(node) else None
            elif isinstance(node, dict):
                node = node.get(part)
            else:
                return None
        return node

    def write(self, out: dict[str, Any]) -> None:
        dims = {d["id"]: d for d in out["dimensions"]}
        objs = {o["id"]: o for o in out["objects"]}
        for key, slot in self.slots.items():
            if not slot.writable or slot.value is None:
                continue
            if "." not in key:
                dims[key]["value"] = _out(slot.value)
                continue
            head, *path = key.split(".")
            node: Any = objs[head]
            for part in path[:-1]:
                node = node[int(part)] if isinstance(node, list) else node.setdefault(part, {})
            if isinstance(node, list):
                node[int(path[-1])] = _out(slot.value)
            else:
                node[path[-1]] = _out(slot.value)


class Conflict(Exception):
    pass


def _step(model: Model, c: dict[str, Any]) -> bool:
    """Applies one constraint once. Returns True if it set a value; raises Conflict if it cannot hold."""
    kind = c["type"]
    if kind == "sum":
        parts = [model.slot(o) for o in c["of"]]
        total = model.slot(c["equals"])
        unknown = [s for s in [*parts, total] if s.value is None]
        known = sum((s.value for s in parts if s.value is not None), Decimal(0))
        if total.value is not None and not unknown:
            if known != total.value:
                raise Conflict(f"the parts add up to {_out(known)}, not {_out(total.value)}")
            return False
        if len(unknown) == 1 and unknown[0].writable:
            if unknown[0] is total:
                total.value = known
            elif total.value is not None:
                unknown[0].value = total.value - known
            return unknown[0].value is not None
        return False
    if kind == "equality":
        slots = [model.slot(o) for o in c["of"]]
        seen = {s.value for s in slots if s.value is not None}
        if len(seen) > 1:
            raise Conflict("values that must be equal differ: " + ", ".join(str(_out(x)) for x in sorted(seen)))
        changed = False
        if seen:
            (v,) = seen
            for s in slots:
                if s.value is None and s.writable:
                    s.value, changed = v, True
        return changed
    if kind == "offset":
        target, base, delta = model.slot(c["target"]), model.slot(c["from"]), model.slot(c["value"])
        if None not in (target.value, base.value, delta.value):
            if target.value != base.value + delta.value:  # type: ignore[operator]
                raise Conflict(f"{c['target']} should be {c['from']} + {_out(delta.value)}")  # type: ignore[arg-type]
            return False
        if target.value is None and target.writable and base.value is not None and delta.value is not None:
            target.value = base.value + delta.value
            return True
        if base.value is None and base.writable and target.value is not None and delta.value is not None:
            base.value = target.value - delta.value
            return True
        return False
    if kind in ("min", "max"):
        target, bound = model.slot(c["target"]), model.slot(c["value"])
        if target.value is not None and bound.value is not None:
            if (kind == "min" and target.value < bound.value) or (kind == "max" and target.value > bound.value):
                word = "at least" if kind == "min" else "at most"
                raise Conflict(f"{c['target']} is {_out(target.value)}; it must be {word} {_out(bound.value)}")
        return False
    raise ValueError(f"unknown constraint type {kind!r}")


def resolve(ddl: dict[str, Any]) -> dict[str, Any]:
    """Resolves a validated DDL. Returns a new document with solver state set and a fresh hash."""
    model = Model(copy.deepcopy(ddl))
    conflicts: list[dict[str, Any]] = []
    constraints = ddl["constraints"]
    changed = True
    while changed:  # fixed point; each pass can only fill values, so it terminates
        changed = False
        for c in constraints:
            if any(c["id"] in x["constraint_ids"] for x in conflicts):
                continue
            try:
                changed = _step(model, c) or changed
            except Conflict as exc:
                conflicts.append({"constraint_ids": [c["id"]], "message": str(exc)})

    out = copy.deepcopy(ddl)
    if conflicts:
        status = "conflict"  # nothing is written: the user decides which value gives way
    else:
        model.write(out)
        pending = any(_has_unknown(model, c) for c in constraints)
        status = "unresolved" if pending else "resolved"
    out["solver"] = {"status": status, "conflicts": conflicts}
    return with_hash(out)


def _has_unknown(model: Model, c: dict[str, Any]) -> bool:
    operands: list[Any] = []
    for key in ("of", "equals", "target", "from"):
        value = c.get(key)
        operands += value if isinstance(value, list) else [value] if value is not None else []
    if c["type"] in ("min", "max"):
        operands = [c["target"]]
    return any(model.slot(o).value is None for o in operands)

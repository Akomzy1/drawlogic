"""DDL diffs (contracts/ddl-diff.schema.json): what changed between two revisions, and applying a change set.

Element-level and field-level: an element added or removed is one op; a changed element is one `set` op per top-level
field, carrying the previous value so every change can be undone (FR-21).
"""

from __future__ import annotations

import copy
from typing import Any

from engine.core.ddl.hashing import with_hash

COLLECTIONS = ("materials", "objects", "connections", "constraints", "dimensions", "annotations", "layers", "schedules")
PROVENANCE = ("source", "confidence", "verify", "source_detail")


def _provenance(element: dict[str, Any], fallback: dict[str, Any]) -> dict[str, Any]:
    out = {k: element[k] for k in PROVENANCE if k in element}
    return out if "source" in out else dict(fallback)


def diff(
    before: dict[str, Any], after: dict[str, Any], *, origin: dict[str, Any], diff_id: str, provenance: dict[str, Any]
) -> dict[str, Any]:
    """The change set that turns `before` into `after`. `provenance` is recorded on ops for elements that carry none."""
    ops: list[dict[str, Any]] = []
    for coll in COLLECTIONS:
        old = {e["id"]: e for e in before.get(coll, [])}
        new = {e["id"]: e for e in after.get(coll, [])}
        for eid in old.keys() - new.keys():
            ops.append(
                {"op": "remove", "collection": coll, "id": eid, "before": old[eid], **_provenance(old[eid], provenance)}
            )
        for eid in [e["id"] for e in after.get(coll, []) if e["id"] not in old]:
            ops.append(
                {"op": "add", "collection": coll, "id": eid, "value": new[eid], **_provenance(new[eid], provenance)}
            )
        for eid in [e["id"] for e in after.get(coll, []) if e["id"] in old]:
            for field in sorted(old[eid].keys() | new[eid].keys()):
                if old[eid].get(field) != new[eid].get(field):
                    ops.append(
                        {
                            "op": "set",
                            "collection": coll,
                            "id": eid,
                            "field": field,
                            "value": new[eid].get(field),
                            "before": old[eid].get(field),
                            **_provenance(new[eid], provenance),
                        }
                    )
    ops.sort(key=lambda o: (COLLECTIONS.index(o["collection"]), o["id"], o.get("field", ""), o["op"]))
    return {
        "schema_version": "0.1.0",
        "id": diff_id,
        "base_hash": before["drawing"]["hash"],
        "result_hash": None,
        "origin": origin,
        "ops": ops,
    }


def apply_diff(ddl: dict[str, Any], change: dict[str, Any]) -> dict[str, Any]:
    """Applies a change set to the revision it was made against; the result carries a fresh hash."""
    if change["base_hash"] != ddl["drawing"]["hash"]:
        raise ValueError("diff base_hash does not match the drawing it is applied to")
    out = copy.deepcopy(ddl)
    for op in change["ops"]:
        coll = out[op["collection"]]
        index = next((i for i, e in enumerate(coll) if e["id"] == op["id"]), None)
        if op["op"] == "add":
            if index is not None:
                raise ValueError(f"cannot add {op['id']!r}: it already exists")
            coll.append(copy.deepcopy(op["value"]))
        elif index is None:
            raise ValueError(f"cannot {op['op']} {op['id']!r}: it does not exist")
        elif op["op"] == "remove":
            del coll[index]
        else:
            _set(coll[index], op["field"], copy.deepcopy(op["value"]))
    return with_hash(out)


def _set(element: dict[str, Any], path: str, value: Any) -> None:
    parts = path.split(".")
    node: Any = element
    for part in parts[:-1]:
        node = node[int(part)] if isinstance(node, list) else node.setdefault(part, {})
    if isinstance(node, list):
        node[int(parts[-1])] = value
    elif value is None and parts[-1] not in node:
        return
    else:
        node[parts[-1]] = value

"""DDL validation: the contract schema, then the invariants the schema cannot express (contracts/README.md)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from engine.core.contracts import schema_errors
from engine.core.ddl.hashing import ddl_hash

SUPPORTED_MAJOR_MINOR = (0, 1)
COLLECTIONS = ("materials", "objects", "connections", "constraints", "dimensions", "annotations", "layers", "schedules")
OPERAND_KEYS = ("of", "equals", "target", "from", "value")


@dataclass(frozen=True)
class Issue:
    path: str
    message: str

    def as_dict(self) -> dict[str, str]:
        return {"path": self.path, "message": self.message}


def _version_issue(ddl: dict[str, Any]) -> Issue | None:
    parts = str(ddl.get("ddl_version", "")).split(".")
    try:
        major, minor = int(parts[0]), int(parts[1])
    except (ValueError, IndexError):
        return Issue("/ddl_version", "ddl_version must be a semantic version")
    if (major, minor) != SUPPORTED_MAJOR_MINOR:
        return Issue("/ddl_version", f"ddl_version {ddl['ddl_version']} is not supported; this engine reads 0.1.x")
    return None


def validate(ddl: Any, *, check_hash: bool = True) -> list[Issue]:
    """Every problem with a DDL document; empty means valid."""
    issues = [Issue(e["path"], e["message"]) for e in schema_errors("ddl", ddl)]
    if issues:
        return issues
    version = _version_issue(ddl)
    if version:
        issues.append(version)

    ids: dict[str, str] = {}
    for coll in COLLECTIONS:
        for i, element in enumerate(ddl[coll]):
            if element["id"] in ids:
                issues.append(Issue(f"/{coll}/{i}/id", f"id {element['id']!r} is already used in {ids[element['id']]}"))
            ids.setdefault(element["id"], coll)

    materials = {m["id"] for m in ddl["materials"]}
    for i, obj in enumerate(ddl["objects"]):
        if obj.get("material_id") and obj["material_id"] not in materials:
            issues.append(Issue(f"/objects/{i}/material_id", f"material {obj['material_id']!r} is not in materials"))
    objects = {o["id"] for o in ddl["objects"]}
    for i, conn in enumerate(ddl["connections"]):
        for end in ("from", "to"):
            if conn[end] not in ids:
                issues.append(Issue(f"/connections/{i}/{end}", f"connection refers to unknown element {conn[end]!r}"))
    dimensions = {d["id"] for d in ddl["dimensions"]}
    for i, constraint in enumerate(ddl["constraints"]):
        for key in OPERAND_KEYS:
            values = constraint.get(key)
            for operand in values if isinstance(values, list) else [values] if values is not None else []:
                if isinstance(operand, str):
                    head = operand.split(".", 1)[0]
                    where = f"/constraints/{i}/{key}"
                    if "." not in operand and operand not in dimensions:
                        issues.append(
                            Issue(where, f"{operand!r} is not a dimension id; object operands are object_id.field")
                        )
                    elif "." in operand and head not in objects:
                        issues.append(Issue(where, f"{operand!r} refers to unknown object {head!r}"))
    if check_hash and not issues and ddl["drawing"]["hash"] != ddl_hash(ddl):
        issues.append(Issue("/drawing/hash", "drawing.hash does not match the document's content"))
    return issues

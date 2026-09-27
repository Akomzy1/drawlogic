"""Loads the approved JSON Schemas from contracts/ — the validation authority for every document the core accepts."""

from __future__ import annotations

import json
import os
from functools import cache
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator
from referencing import Registry, Resource

CONTRACTS = Path(os.environ.get("DRAWLOGIC_CONTRACTS_ROOT", Path(__file__).resolve().parents[2] / "contracts"))
BASE = "https://drawlogic.invalid/contracts/"


@cache
def _registry() -> Registry[Any]:
    resources = []
    for path in sorted(CONTRACTS.glob("*.schema.json")):
        schema = json.loads(path.read_text(encoding="utf-8"))
        resources.append((schema["$id"], Resource.from_contents(schema)))
    if not resources:
        raise RuntimeError(f"no contract schemas found in {CONTRACTS}")
    return Registry().with_resources(resources)


@cache
def validator(name: str) -> Draft202012Validator:
    """Validator for contracts/<name>.schema.json, optionally with a #/$defs/<def> suffix."""
    return Draft202012Validator({"$ref": BASE + (name if "#" in name else f"{name}.schema.json")}, registry=_registry())


def schema_errors(name: str, document: Any) -> list[dict[str, str]]:
    errors = sorted(validator(name).iter_errors(document), key=lambda e: [str(p) for p in e.absolute_path])
    return [{"path": "/" + "/".join(str(p) for p in e.absolute_path), "message": e.message} for e in errors]

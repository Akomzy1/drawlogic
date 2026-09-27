"""Examiner helpers only. No solver, rule engine or trust implementation."""

import copy
import hashlib
import json
import os
from functools import cache
from pathlib import Path

import rfc8785
from jsonschema import Draft202012Validator, FormatChecker
from referencing import Registry, Resource

ROOT = Path(__file__).resolve().parents[2]
CONTRACTS = Path(os.environ.get("DRAWLOGIC_CONTRACTS_ROOT", ROOT / "contracts"))
CORE = ROOT / "fixtures" / "core"


def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8-sig"))


MANIFEST = load("fixtures/core/manifest.json")


def digest(value):
    return "sha256:" + hashlib.sha256(rfc8785.dumps(value)).hexdigest()


def ddl_hash(ddl):
    value = copy.deepcopy(ddl)
    value.pop("checks", None)
    value.pop("stamp", None)
    value["drawing"].pop("hash", None)
    return digest(value)


def rehash(ddl):
    ddl["drawing"]["hash"] = ddl_hash(ddl)
    return ddl


def audit_hash(record):
    return digest({k: v for k, v in record.items() if k != "hash"})


@cache
def validator(name):
    schemas = [
        json.loads(p.read_text(encoding="utf-8-sig"))
        for p in CONTRACTS.glob("*.schema.json")
    ]
    if not schemas:
        raise AssertionError(
            "CONTRACTS_UNAVAILABLE: use the approved contracts or DRAWLOGIC_CONTRACTS_ROOT"
        )
    registry = Registry().with_resources(
        (s["$id"], Resource.from_contents(s)) for s in schemas
    )
    schema = next(s for s in schemas if s["$id"].endswith("/" + name + ".schema.json"))
    return Draft202012Validator(
        schema, registry=registry, format_checker=FormatChecker()
    )


def validate(name, document):
    validator(name).validate(document)


def profiles():
    return [
        load("fixtures/core/profiles/" + name + ".json")
        for name in ("generic", "gb-eng-residential")
    ]


def detail(name="parapet", field="input"):
    row = next(row for row in MANIFEST["details"] if row["id"] == name)
    return load(row[field])


def provenance(document):
    keys = ("source", "confidence", "verify", "source_detail", "field_provenance")
    return {
        (group, item["id"]): {key: item[key] for key in keys if key in item}
        for group in (
            "materials",
            "objects",
            "connections",
            "constraints",
            "dimensions",
            "annotations",
        )
        for item in document[group]
    }


def check_projection(run):
    """Ignore transport metadata only; determinism is asserted separately on bytes."""
    value = copy.deepcopy(run)
    value.pop("run_id", None)
    value.pop("generated_at", None)
    for row in value["results"]:
        row.pop("id", None)
        if row.get("resolution") is None:
            row.pop("resolution", None)
    value["results"].sort(key=lambda row: (row["rule_id"] or "", row["category"]))
    value["checks_not_performed"].sort(key=lambda row: row["category"])
    return value

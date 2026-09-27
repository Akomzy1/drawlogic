"""Contract hashes (contracts/README.md): sha256 over the RFC 8785 canonical JSON."""

from __future__ import annotations

import copy
import hashlib
from typing import Any

import rfc8785


def digest(value: Any) -> str:
    return "sha256:" + hashlib.sha256(rfc8785.dumps(value)).hexdigest()


def ddl_hash(ddl: dict[str, Any]) -> str:
    """drawing.hash: the DDL with drawing.hash, checks and stamp removed."""
    body = {k: v for k, v in ddl.items() if k not in ("checks", "stamp")}
    body["drawing"] = {k: v for k, v in ddl["drawing"].items() if k != "hash"}
    return digest(body)


def with_hash(ddl: dict[str, Any]) -> dict[str, Any]:
    out = copy.deepcopy(ddl)
    out["drawing"]["hash"] = ddl_hash(out)
    return out

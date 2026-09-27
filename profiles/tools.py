"""Refreshes the derived fields of every profile document and checks them in CI.

usage: python -m profiles.tools [--check]
Derived fields: each rule's condition_text (contracts/scripts/condition_text.py) and the profile's coverage
(profiles/coverage.py). The authored fields are everything else. --check fails if any document is stale.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

from contracts.scripts.condition_text import condition_text
from profiles.coverage import generate_coverage

ROOT = Path(__file__).resolve().parent


def documents() -> list[Path]:
    out = []
    for directory in sorted(
        p for p in ROOT.iterdir() if p.is_dir() and not p.name.startswith(("_", "."))
    ):
        docs = [
            p
            for p in sorted(directory.glob("*.json"))
            if json.loads(p.read_text(encoding="utf-8")).get("metadata", {}).get("id")
            == directory.name
        ]
        if len(docs) != 1:
            raise SystemExit(
                f"profiles/{directory.name}: expected one profile document, found {len(docs)}"
            )
        out.append(docs[0])
    return out


def refreshed(profile: dict[str, Any]) -> dict[str, Any]:
    out: dict[str, Any] = json.loads(json.dumps(profile))
    for rule in out.get("rules", []):
        rule["condition_text"] = condition_text(rule)
    out["coverage"] = generate_coverage(out)
    return out


def dumps(doc: dict[str, Any]) -> str:
    return json.dumps(doc, indent=2, ensure_ascii=False) + "\n"


def main() -> int:
    stale = []
    for path in documents():
        current = path.read_text(encoding="utf-8")
        fresh = dumps(refreshed(json.loads(current)))
        if current != fresh:
            stale.append(path)
            if "--check" not in sys.argv:
                path.write_text(fresh, encoding="utf-8", newline="\n")
    if "--check" in sys.argv and stale:
        print(
            "stale derived fields; run python -m profiles.tools:\n  "
            + "\n  ".join(str(p.relative_to(ROOT.parent)) for p in stale),
            file=sys.stderr,
        )
        return 1
    print(
        f"{len(documents())} profiles {'checked' if '--check' in sys.argv else 'refreshed'}; {len(stale)} {'stale' if '--check' in sys.argv else 'updated'}."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

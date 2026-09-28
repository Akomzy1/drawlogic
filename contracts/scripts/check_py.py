"""Loads every contract example into its generated pydantic model and the config files into theirs.

The JSON Schemas are the validation authority (scripts/validate.mjs); this proves the Python types accept the same documents.
usage: python scripts/check_py.py
"""

from __future__ import annotations

import importlib
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
sys.dont_write_bytecode = True  # keep __pycache__ out of generated/ (and out of synced folders)
sys.path.insert(0, str(ROOT / "generated" / "py"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from condition_text import condition_text  # noqa: E402

MODELS = {
    "ddl": ("ddl_schema", "DDL"),
    "object": ("object_schema", "DrawingObject"),
    "rule": ("rule_schema", "Rule"),
    "profile": ("profile_schema", "Profile"),
    "check-result": ("check_result_schema", "CheckResult"),
    "interpretation": ("interpretation_schema", "Interpretation"),
    "stamp": ("stamp_schema", "Stamp"),
    "signing-gate": ("signing_gate_schema", "SigningGate"),
    "audit-record": ("audit_record_schema", "AuditRecord"),
    "precedent-card": ("precedent_card_schema", "PrecedentCard"),
    "narration-script": ("narration_script_schema", "NarrationScript"),
    "idea-result": ("idea_result_schema", "IdeaResult"),
    "critique": ("critique_schema", "Critique"),
    "ddl-diff": ("ddl_diff_schema", "DdlDiff"),
    "thread-state": ("thread_state_schema", "ThreadState"),
    "llm-outputs.route_result": ("llm_outputs_schema", "RouteResult"),
    "llm-outputs.explanation": ("llm_outputs_schema", "Explanation"),
    "render-api.job_status": ("render_api_schema", "JobStatus"),
    "render-api.preview_request": ("render_api_schema", "RenderPreviewRequest"),
    "render-api.job_accepted": ("render_api_schema", "RenderJobAccepted"),
    "render-api.error": ("render_api_schema", "RenderError"),
}
CONFIG = {
    "copy.json": ("copy_schema", "Copy"),
    "models.json": ("models_schema", "Models"),
    "render.thresholds.json": ("render_thresholds_schema", "RenderThresholds"),
}


def model(module: str, name: str) -> Any:
    return getattr(importlib.import_module(f"drawlogic_contracts.{module}"), name)


def main() -> int:
    failures: list[str] = []
    checked = 0
    for path in sorted((ROOT / "examples").glob("*.json")):
        parts = path.stem.split(".")
        key = ".".join(parts[:2]) if parts[0] in ("llm-outputs", "render-api") else parts[0]
        if key not in MODELS:
            failures.append(f"{path.name}: no pydantic model mapped for {key}")
            continue
        try:
            model(*MODELS[key]).model_validate(json.loads(path.read_text(encoding="utf-8")))
            checked += 1
        except Exception as exc:  # noqa: BLE001 — report every failure, keep going
            failures.append(f"{path.name}: {exc}")
    for name, target in CONFIG.items():
        try:
            model(*target).model_validate(json.loads((ROOT / name).read_text(encoding="utf-8")))
            checked += 1
        except Exception as exc:  # noqa: BLE001
            failures.append(f"{name}: {exc}")
    # The Python condition renderer must produce the stored text, which validate.mjs has already proved equals the JS renderer's.
    rules = [json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "examples").glob("rule.*.json"))]
    for p in sorted((ROOT / "examples").glob("profile.*.json")):
        rules += json.loads(p.read_text(encoding="utf-8"))["rules"]
    for rule in rules:
        if condition_text(rule) != rule["condition_text"]:
            failures.append(f"rule {rule['id']}: Python renders {condition_text(rule)!r}, stored {rule['condition_text']!r}")
    if failures:
        print("pydantic check failed:\n" + "\n".join(f"  x {f}" for f in failures), file=sys.stderr)
        return 1
    print(f"pydantic models accept all {checked} documents; Python condition text matches for {len(rules)} rules.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

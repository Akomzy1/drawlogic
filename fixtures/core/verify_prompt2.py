"""Reproduce Prompt 2 evidence without treating missing modules as a green runtime gate."""

import hashlib
import json
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = Path(tempfile.gettempdir()) / "drawlogic-prompt2-examiner"
REPORT.mkdir(exist_ok=True)


def run(args):
    result = subprocess.run(
        args,
        cwd=ROOT,
        capture_output=True,
        check=False,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    return result


def snapshots():
    paths = list((ROOT / "fixtures/core").rglob("*.json")) + list((ROOT / "trust/tests/fixtures").glob("*.json"))
    return {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in paths}


first = run(["node", "fixtures/core/generate.mjs"])
assert first.returncode == 0, first.stderr
before = snapshots()
second = run(["node", "fixtures/core/generate.mjs"])
assert second.returncode == 0, second.stderr
assert snapshots() == before, "Fixture generation is not byte-identical"
offline = run(
    [
        sys.executable,
        "-m",
        "pytest",
        "-c",
        "trust/tests/pytest.ini",
        "-m",
        "fixtures",
        "-q",
        "--tb=short",
        "--junitxml=" + str(REPORT / "fixtures.xml"),
    ]
)
(REPORT / "fixtures.txt").write_text(offline.stdout + offline.stderr, encoding="utf-8")
assert offline.returncode == 0, offline.stdout[-4000:]
runtime = run(
    [
        sys.executable,
        "-m",
        "pytest",
        "-c",
        "trust/tests/pytest.ini",
        "-m",
        "runtime",
        "trust/tests/test_core_goldens.py",
        "trust/tests/test_core_properties.py",
        "trust/tests/test_signing_gate.py",
        "trust/tests/test_audit_chain.py",
        "-q",
        "--tb=no",
        "--junitxml=" + str(REPORT / "runtime.xml"),
    ]
)
(REPORT / "runtime.txt").write_text(runtime.stdout + runtime.stderr, encoding="utf-8")
xml = ET.parse(REPORT / "runtime.xml")
cases = xml.findall(".//testcase")
errors = [e for case in cases for e in case.findall("error")]
assert runtime.returncode == 1 and len(errors) == len(cases) and cases
assert all("CORE_UNAVAILABLE" in e.attrib.get("message", "") or "TRUST_UNAVAILABLE" in e.attrib.get("message", "") for e in errors)
assert not xml.findall(".//failure") and not xml.findall(".//skipped")
offline_cases = ET.parse(REPORT / "fixtures.xml").findall(".//testcase")
report = {
    "fixture_checks_passed": len(offline_cases),
    "runtime_cases_intentionally_red": len(cases),
    "runtime_error_reasons": ["CORE_UNAVAILABLE", "TRUST_UNAVAILABLE"],
    "fixture_generation_byte_identical_across_two_runs": True,
    "json_files_compared": len(before),
    "python": sys.version.split()[0],
    "contracts_root": "contracts",
    "logs_location": "system temporary directory / drawlogic-prompt2-examiner",
    "production_implementation_changed": False,
    "contract_changed": False,
}
(ROOT / "fixtures/core/validation-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))

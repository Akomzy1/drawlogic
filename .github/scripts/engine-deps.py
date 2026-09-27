"""Prints the engine's runtime and dev dependencies from engine/pyproject.toml, for pip install.

engine/ holds several top-level packages (core, render, geo, providers, 3d), so it is imported from the repository root
rather than installed; CI installs its dependencies with: pip install $(python .github/scripts/engine-deps.py)
"""

import tomllib
from pathlib import Path

project = tomllib.loads((Path(__file__).resolve().parents[2] / "engine" / "pyproject.toml").read_text(encoding="utf-8"))["project"]
print(" ".join(project["dependencies"] + project["optional-dependencies"]["dev"]))

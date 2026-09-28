"""Rule engine (PRD FR-30–34, FR-97): evaluates a resolved DDL against its profile stack. Deterministic; no model."""

from engine.core.rules.autofix import FixRefused, autofix
from engine.core.rules.check import check
from engine.core.rules.stack import Stack, load_stack

__all__ = ["FixRefused", "Stack", "autofix", "check", "load_stack"]

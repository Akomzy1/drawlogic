"""HTTP boundary for the core (fixtures/core/README.md, transport binding).

engine/app.py includes this router with Codex's render router; engine/core/main.py serves it alone for CI.
"""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from engine.core import rules, solver
from engine.core.ddl import Issue, validate

router = APIRouter()


def _invalid(issues: list[Any]) -> JSONResponse:
    return JSONResponse(status_code=422, content={"detail": {"errors": [i.as_dict() for i in issues]}})


@router.post("/ddl/validate")
def ddl_validate(ddl: Any = Body(...)) -> JSONResponse:  # noqa: B008 — FastAPI body declaration
    issues = validate(ddl)
    return JSONResponse({"valid": not issues, "errors": [i.as_dict() for i in issues]})


@router.post("/ddl/resolve")
def ddl_resolve(ddl: Any = Body(...)) -> JSONResponse:  # noqa: B008
    issues = validate(ddl)
    if issues:
        return _invalid(issues)
    return JSONResponse(solver.resolve(ddl))


def _check_inputs(body: Any) -> tuple[dict[str, Any], rules.Stack] | JSONResponse:
    """A validated, resolved DDL and its loaded profile stack, or the 422 that says why not."""
    if not isinstance(body, dict):
        return _invalid([Issue("", "send {ddl, profiles}")])
    issues = [Issue("/ddl" + i.path, i.message) for i in validate(body.get("ddl"))]
    if issues:
        return _invalid(issues)
    ddl: dict[str, Any] = body["ddl"]
    if ddl["solver"]["status"] != "resolved":
        return _invalid([Issue("/ddl/solver/status", "resolve the drawing before checking it")])
    stack, issues = rules.load_stack(body.get("profiles"), ddl)
    if stack is None:
        return _invalid(issues)
    return ddl, stack


@router.post("/check")
def check(body: Any = Body(...)) -> JSONResponse:  # noqa: B008
    inputs = _check_inputs(body)
    if isinstance(inputs, JSONResponse):
        return inputs
    try:
        return JSONResponse(rules.check(*inputs))
    except ValueError as exc:  # a rule the contract admits but this engine cannot evaluate, e.g. an unknown unit
        return _invalid([Issue("/profiles", str(exc))])


@router.post("/check/autofix")
def check_autofix(body: Any = Body(...)) -> JSONResponse:  # noqa: B008
    inputs = _check_inputs(body)
    if isinstance(inputs, JSONResponse):
        return inputs
    fix = body.get("fix_id")
    if not isinstance(fix, str):
        return _invalid([Issue("/fix_id", "name the fix to apply, from a check result's auto_fix.fix_id")])
    try:
        return JSONResponse(rules.autofix(*inputs, fix))
    except rules.FixRefused as exc:
        return JSONResponse(status_code=409, content={"detail": {"errors": [Issue("/fix_id", str(exc)).as_dict()]}})
    except ValueError as exc:
        return _invalid([Issue("/profiles", str(exc))])

"""HTTP boundary for the core (fixtures/core/README.md, transport binding).

engine/app.py will include this router with Codex's render router (Prompt 5).
Until then engine/core/main.py serves it alone.
"""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse

from engine.core import solver
from engine.core.ddl import validate

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

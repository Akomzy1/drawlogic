"""Render HTTP boundary, validated against contracts/render-api.schema.json."""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse, Response

from engine.render import artefacts, dxf, pdf, svg
from engine.render.scene import Scene

router = APIRouter(prefix="/render", tags=["render"])


def headers(scene: Scene) -> dict[str, str]:
    return {
        "X-Drawing-Hash": scene.drawing["hash"],
        "X-Drawing-Revision": quote(scene.drawing["rev"], safe=""),
        "Cache-Control": "private, no-store",
    }


@router.post("/svg", response_class=Response)
def render_svg(body: Any = Body(...)) -> Response:  # noqa: B008
    scene = Scene(body)
    return Response(svg.render(scene), media_type="image/svg+xml", headers=headers(scene))


@router.post("/dxf", response_class=Response)
def render_dxf(body: Any = Body(...)) -> Response:  # noqa: B008
    scene = Scene(body)
    return Response(dxf.render(scene), media_type="application/dxf", headers=headers(scene))


@router.post("/pdf", response_class=Response)
def render_pdf(body: Any = Body(...)) -> Response:  # noqa: B008
    scene = Scene(body)
    return Response(pdf.render(scene), media_type="application/pdf", headers=headers(scene))


@router.post("/artefacts")
def render_artefacts(body: Any = Body(...)) -> JSONResponse:  # noqa: B008
    scene = Scene(body)
    return JSONResponse(artefacts.render(scene), headers=headers(scene))

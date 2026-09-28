"""Shared engine entrypoint: core and deterministic render routes in one process."""

from fastapi import FastAPI, Request
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, Response

from engine.core.api import router as core_router
from engine.render.api import router as render_router
from engine.render.scene import RenderError


def create_app() -> FastAPI:
    application = FastAPI(title="Drawlogic engine", version="0.1.0")
    application.include_router(core_router)
    application.include_router(render_router)

    @application.exception_handler(RenderError)
    async def render_error(request: Request, exc: RenderError) -> JSONResponse:
        return JSONResponse(exc.body(), status_code=422)

    @application.exception_handler(RequestValidationError)
    async def validation_error(request: Request, exc: RequestValidationError) -> Response:
        if request.url.path.startswith("/render/"):
            return JSONResponse(
                RenderError("invalid_request", "Supply a valid JSON render request.").body(), status_code=422
            )
        return await request_validation_exception_handler(request, exc)

    @application.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    return application


app = create_app()

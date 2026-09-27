"""Core-only FastAPI app, used by CI until engine/app.py includes the core and render routers together (Prompt 5)."""

from fastapi import FastAPI

from engine.core.api import router

app = FastAPI(title="Drawlogic engine — core", version="0.1.0")
app.include_router(router)

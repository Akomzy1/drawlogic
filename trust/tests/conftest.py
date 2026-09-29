import importlib
import os
import sys

import httpx
import pytest
from fastapi.testclient import TestClient
from hypothesis import settings
from support import ROOT

sys.path.insert(0, str(ROOT))
settings.register_profile("examiner", max_examples=35, deadline=None, derandomize=True)
settings.load_profile("examiner")


class Boundary:
    def __init__(self, client):
        self.client = client

    def post(self, path, body, expected=200):
        response = self.client.post(path, json=body)
        assert response.status_code == expected, (
            f"{path}: expected {expected}, got {response.status_code}: {response.text[:1000]}"
        )
        return response.json()

    def raw(self, path, body):
        return self.client.post(path, json=body)


@pytest.fixture(scope="session")
def core():
    url = os.environ.get("DRAWLOGIC_CORE_URL") or os.environ.get("DRAWLOGIC_ENGINE_URL")
    if url:
        client = httpx.Client(base_url=url, timeout=10, trust_env=False)
        try:
            client.get("/openapi.json").raise_for_status()
        except httpx.HTTPError as exc:
            client.close()
            pytest.fail(
                f"CORE_UNAVAILABLE: real FastAPI service required: {exc}", pytrace=False
            )
        with client:
            yield Boundary(client)
        return
    target = os.environ.get("DRAWLOGIC_CORE_APP", "engine.app:app")
    module, symbol = target.split(":")
    try:
        app = getattr(importlib.import_module(module), symbol)
    except (ModuleNotFoundError, AttributeError) as exc:
        pytest.fail(
            f"CORE_UNAVAILABLE: {target}; Prompt 4/6/9 implementation absent ({exc})",
            pytrace=False,
        )
    with TestClient(app) as client:
        yield Boundary(client)


@pytest.fixture(scope="session")
def trust():
    url = os.environ.get("DRAWLOGIC_TRUST_URL", "http://127.0.0.1:8765")
    if not url:
        pytest.fail(
            "TRUST_UNAVAILABLE: start the real trust service and set DRAWLOGIC_TRUST_URL",
            pytrace=False,
        )
    with httpx.Client(base_url=url, timeout=10, trust_env=False) as client:
        try:
            client.get("/health").raise_for_status()
        except httpx.HTTPError as exc:
            pytest.fail(f"TRUST_UNAVAILABLE: {exc}", pytrace=False)
        yield Boundary(client)

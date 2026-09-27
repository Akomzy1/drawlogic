"""PDF (PRD FR-57): vector, with a title block. The stamp is injected later by trust's export assembler, so the renderer
leaves a placeholder and never writes stamp content itself (trust rule 7: stamp text comes only from copy.json via trust)."""

from __future__ import annotations

import io

import pytest
from conftest import COPY, DETAILS, banned_hits, expected
from pypdf import PdfReader


def pdf_text(data: bytes) -> str:
    reader = PdfReader(io.BytesIO(data))
    assert len(reader.pages) >= 1
    return "\n".join(page.extract_text() or "" for page in reader.pages)


@pytest.mark.parametrize("detail", DETAILS)
def test_title_block(render, detail):
    text = pdf_text(render("pdf", detail))
    assert text.strip(), "PDF has no extractable text: it must be vector, not an image"
    for item in expected(detail, "pdf")["must_contain"]:
        assert item in text, f"title block lacks {item!r}"


@pytest.mark.parametrize("detail", DETAILS)
def test_renderer_writes_no_stamp_content(render, detail):
    text = pdf_text(render("pdf", detail))
    for key in ("closing_sentence", "unsigned"):
        assert COPY["stamp"][key] not in text, f"stamp text {key!r} belongs to trust's export assembler, not the renderer"
    assert banned_hits(text) == []

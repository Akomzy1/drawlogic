"""DXF structure goldens (PRD FR-57: layers, blocks, dims and text preserved). Read with ezdxf; structure, not pixels."""

from __future__ import annotations

from pathlib import Path

import ezdxf
import pytest
from conftest import DETAILS, SPEC, banned_hits, expected

APPID = SPEC["dxf"]["appid"]


@pytest.fixture
def dxf(render, tmp_path: Path):
    def load(detail: str):
        path = tmp_path / f"{detail}.dxf"
        path.write_bytes(render("dxf", detail))
        doc = ezdxf.readfile(path)
        auditor = doc.audit()
        assert not auditor.has_errors, f"{detail}: DXF audit errors {[str(e) for e in auditor.errors][:5]}"
        return doc

    return load


def xdata(entity) -> dict[str, str]:
    if not entity.has_xdata(APPID):
        return {}
    out = {}
    for code, value in entity.get_xdata(APPID):
        if code == 1000 and ":" in str(value):
            k, _, v = str(value).partition(":")
            out[k] = v
    return out


@pytest.mark.parametrize("detail", DETAILS)
def test_layers_are_preserved(dxf, detail):
    doc = dxf(detail)
    names = {layer.dxf.name for layer in doc.layers}
    missing = set(expected(detail, "dxf")["layers"]) - names
    assert not missing, f"DXF lacks layers {missing}"


@pytest.mark.parametrize("detail", DETAILS)
def test_every_object_is_on_its_layer_with_provenance(dxf, detail):
    msp = dxf(detail).modelspace()
    tagged: dict[str, list] = {}
    for e in msp:
        oid = xdata(e).get("object_id")
        if oid:
            tagged.setdefault(oid, []).append(e)
    ddl_sources = {o["id"]: (o["source"], o["verify"]) for o in expected(detail, "svg")["objects"]}
    for o in expected(detail, "dxf")["objects"]:
        ents = tagged.get(o["id"])
        assert ents, f"object {o['id']} has no entity carrying {APPID} xdata"
        assert all(e.dxf.layer == o["layer"] for e in ents), f"{o['id']} not on layer {o['layer']}: {[e.dxf.layer for e in ents]}"
        x = xdata(ents[0])
        src, verify = ddl_sources[o["id"]]
        assert x.get("source") == src and x.get("verify") == str(verify).lower(), f"{o['id']}: provenance xdata {x}"
        if o["hatch"]["gb-eng"]:
            assert any(e.dxftype() == "HATCH" for e in ents), f"{o['id']} must be hatched"


@pytest.mark.parametrize("detail", DETAILS)
def test_dimensions_are_real_dimension_entities(dxf, detail):
    msp = dxf(detail).modelspace()
    dims = {xdata(e).get("dimension_id"): e for e in msp.query("DIMENSION")}
    for d in expected(detail, "dxf")["dimensions"]:
        e = dims.get(d["id"])
        assert e is not None, f"dimension {d['id']} is not a DIMENSION entity"
        assert abs(float(e.get_measurement()) - d["value"]) < 0.01, f"{d['id']}: measures {e.get_measurement()}, DDL says {d['value']}"


@pytest.mark.parametrize("detail", DETAILS)
def test_annotation_text_is_preserved(dxf, detail):
    msp = dxf(detail).modelspace()
    texts = [e.dxf.text for e in msp.query("TEXT")] + [e.plain_text() for e in msp.query("MTEXT")]
    joined = "\n".join(" ".join(t.split()) for t in texts)
    for t in expected(detail, "dxf")["texts"]:
        assert t in joined, f"annotation text {t!r} missing from DXF"
    assert banned_hits(joined) == []

"""Editable DXF entities, shared hatch geometry, real dimensions and provenance XDATA."""

from __future__ import annotations

import io
import math
import re
import uuid
from datetime import datetime
from importlib.metadata import version
from typing import Any

from ezdxf.entities.dxfentity import DXFEntity
from ezdxf.entities.dxfgfx import DXFGraphic
from ezdxf.filemanagement import new
from ezdxf.tools.juliandate import juliandate

from engine.render.hatches import PATTERNS
from engine.render.scene import Point, RenderError, Scene

APPID = "DRAWLOGIC"
LINEWEIGHTS = (0, 5, 9, 13, 15, 18, 20, 25, 30, 35, 40, 50, 53, 60, 70, 80, 90, 100, 106, 120, 140, 158, 200, 211)


def weight(mm: float) -> int:
    return min(LINEWEIGHTS, key=lambda v: abs(v - mm * 100))


def tag(entity: DXFEntity, **values: Any) -> None:
    entity.set_xdata(
        APPID,
        [(1000, f"{key}:{str(value).lower() if isinstance(value, bool) else value}") for key, value in values.items()],
    )


def stable_metadata(value: str, scene: Scene) -> bytes:
    """Normalize only generated timestamps/GUIDs, without process-global ezdxf test options."""
    date = str(juliandate(datetime.fromisoformat(scene.drawing["created_at"].replace("Z", "+00:00"))))
    identifiers = {
        "$FINGERPRINTGUID": str(uuid.uuid5(uuid.NAMESPACE_URL, scene.drawing["id"])).upper(),
        "$VERSIONGUID": str(uuid.uuid5(uuid.NAMESPACE_URL, scene.drawing["hash"])).upper(),
    }
    rows = value.splitlines()
    for i in range(0, len(rows) - 3, 2):
        if rows[i].strip() != "9":
            continue
        key = rows[i + 1]
        if key in ("$TDCREATE", "$TDUCREATE", "$TDUPDATE", "$TDUUPDATE"):
            rows[i + 3] = date
        elif key in identifiers:
            rows[i + 3] = "{" + identifiers[key] + "}"
    value = "\n".join(rows) + "\n"
    value = re.sub(
        r"^" + re.escape(version("ezdxf")) + r" @[^\n]*$",
        version("ezdxf") + " @ " + scene.drawing["created_at"],
        value,
        flags=re.MULTILINE,
    )
    return value.encode("utf-8")


def render(scene: Scene) -> bytes:
    if scene.drawing["mode"] == "idea":
        raise RenderError("invalid_ddl", "Promote this concept to Draft before requesting DXF.")
    doc = new("R2013")
    doc.units = {"in": 1, "ft": 2, "mm": 4, "m": 6}[scene.drawing["units"]]
    doc.appids.new(APPID)
    metadata = doc.ezdxf_metadata()
    metadata["drawing_hash"] = scene.drawing["hash"]
    metadata["drawing_rev"] = scene.drawing["rev"]
    metadata["drawing_id"] = scene.drawing["id"]
    msp = doc.modelspace()

    def point(p: Point) -> Point:
        return p[0] / scene.factor, p[1] / scene.factor

    for lid, layer in scene.layers.items():
        if layer["name"] not in doc.layers:
            doc.layers.new(layer["name"], dxfattribs={"lineweight": weight(scene.layer_weight(lid) / scene.scale)})
    for shape in scene.shapes:
        attrs = {"layer": scene.layers[shape.layer]["name"]}
        entity: DXFGraphic
        if shape.data["geometry"]["kind"] == "arc":
            g = shape.data["geometry"]
            entity = msp.add_arc(g["center"], g["radius"], g["start_deg"], g["end_deg"], dxfattribs=attrs)
        elif len(shape.points) == 1:
            entity = msp.add_point(point(shape.points[0]), dxfattribs=attrs)
        else:
            entity = msp.add_lwpolyline([point(p) for p in shape.points], close=shape.closed, dxfattribs=attrs)
        provenance = {
            "object_id": shape.data["id"],
            "source": shape.data["source"],
            "verify": shape.data.get("verify", False),
            "material_id": shape.data.get("material_id") or "",
        }
        tag(entity, **provenance)
        if shape.hatch and shape.closed:
            spec = shape.hatch
            hatch = msp.add_hatch(color=7, dxfattribs={**attrs, "lineweight": weight(spec["line_weight_mm"])})
            hatch.paths.add_polyline_path([point(p) for p in shape.points], is_closed=True)
            if spec["pattern_id"] != "solid":
                hatch.set_pattern_fill(
                    spec["pattern_id"].upper(),
                    color=7,
                    angle=spec["angle_deg"],
                    scale=spec["scale"] * scene.scale / scene.factor,
                    pattern_type=0,
                    definition=list(PATTERNS[spec["pattern_id"]]),
                )
            tag(hatch, **provenance)
    if scene.dimensions and "A-Dims" not in doc.layers:
        doc.layers.new("A-Dims", dxfattribs={"lineweight": weight(scene.dimension_weight / scene.scale)})
    for dim in scene.dimensions:
        angle = 0 if math.isclose(dim.start[1], dim.end[1]) else 90
        term = scene.dimension_style["terminator"]
        arrow = {"tick": "OBLIQUE", "arrow": "", "dot": "DOT"}[term]
        dimension = msp.add_linear_dim(
            base=point(dim.start),
            p1=point(dim.witness_start),
            p2=point(dim.witness_end),
            angle=angle,
            dxfattribs={"layer": "A-Dims"},
            override={
                "dimblk": arrow,
                "dimtsz": 0,
                "dimasz": 2.5,
                "dimtxt": scene.dimension_height / scene.scale,
                "dimscale": scene.scale / scene.factor,
                "dimdec": scene.dimension_style["precision"],
                "dimzin": 0,
                "dimtad": 1,
                "dimlwd": weight(scene.dimension_weight / scene.scale),
                "dimlwe": weight(scene.dimension_weight / scene.scale),
            },
        )
        tag(dimension.dimension, dimension_id=dim.data["id"])
        dimension.render()
    for ann in scene.annotations:
        attrs = {"layer": scene.layers[ann.data["layer_id"]]["name"]}
        if ann.data["kind"] == "leader":
            for target in ann.targets:
                leader = msp.add_leader([point(target), point(ann.position)], dxfattribs=attrs)
                tag(leader, annotation_id=ann.data["id"])
        annotation = msp.add_text(
            ann.data["text"], dxfattribs={**attrs, "height": scene.annotation_height / scene.factor}
        )
        annotation.set_placement(point(ann.position))
        tag(annotation, annotation_id=ann.data["id"])
    # The content is an intermediate drawing asset; trust assembles the issued export.
    for i, label in enumerate(scene.labels):
        msp.add_text(label, dxfattribs={"height": 3 * scene.scale / scene.factor}).set_placement(
            point((scene.bounds[0], scene.bounds[1] + i * 4 * scene.scale))
        )
    output = io.StringIO()
    doc.write(output)
    return stable_metadata(output.getvalue(), scene)

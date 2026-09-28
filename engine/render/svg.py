"""Escaped SVG markup with stable provenance selectors and profile-controlled hatches."""

from __future__ import annotations

import hashlib
import math
import xml.etree.ElementTree as ET

import rfc8785

from engine.render.hatches import segments
from engine.render.scene import Point, Scene, number


def element(parent: ET.Element, tag: str, **attrs: object) -> ET.Element:
    return ET.SubElement(parent, tag, {key.replace("_", "-"): str(value) for key, value in attrs.items()})


def points_text(points: list[Point]) -> str:
    return " ".join(f"{number(x)},{number(-y)}" for x, y in points)


def line(parent: ET.Element, a: Point, b: Point, **attrs: object) -> ET.Element:
    return element(parent, "line", x1=number(a[0]), y1=number(-a[1]), x2=number(b[0]), y2=number(-b[1]), **attrs)


def text(parent: ET.Element, value: str, point: Point, height: float, **attrs: object) -> None:
    node = element(
        parent,
        "text",
        x=number(point[0]),
        y=number(-point[1]),
        font_size=number(height),
        font_family="sans-serif",
        fill="black",
        stroke="none",
        **attrs,
    )
    node.text = value


def terminator_points(point: Point, other: Point, size: float) -> list[Point]:
    angle = math.atan2(other[1] - point[1], other[0] - point[0])
    u, v = (math.cos(angle), math.sin(angle)), (-math.sin(angle), math.cos(angle))
    return [
        point,
        (point[0] + size * u[0] + size * 0.25 * v[0], point[1] + size * u[1] + size * 0.25 * v[1]),
        (point[0] + size * u[0] - size * 0.25 * v[0], point[1] + size * u[1] - size * 0.25 * v[1]),
    ]


def render(scene: Scene) -> bytes:
    x0, y0, x1, y1 = scene.bounds
    # Stable across runs; differing convention variants cannot alias pattern definitions.
    prefix = "dl-" + hashlib.sha256(rfc8785.dumps([scene.drawing["hash"], scene.conventions])).hexdigest()[:20]
    root = ET.Element(
        "svg",
        {
            "xmlns": "http://www.w3.org/2000/svg",
            "version": "1.1",
            "viewBox": f"{number(x0)} {number(-y1)} {number(x1 - x0)} {number(y1 - y0)}",
            "width": f"{number((x1 - x0) / scene.scale)}mm",
            "height": f"{number((y1 - y0) / scene.scale)}mm",
            "data-drawing-id": scene.drawing["id"],
            "data-drawing-hash": scene.drawing["hash"],
            "data-rev": scene.drawing["rev"],
            "role": "img",
        },
    )
    element(root, "title").text = scene.drawing["title"]
    defs = element(root, "defs")
    patterns: dict[str, str] = {}
    for shape in scene.shapes:
        if not shape.hatch or shape.category in patterns:
            continue
        category = str(shape.category)
        hatch = shape.hatch
        pid = f"{prefix}-{category}"
        patterns[category] = pid
        spacing = float(hatch["scale"]) * scene.scale
        pattern = element(
            defs,
            "pattern",
            id=pid,
            patternUnits="userSpaceOnUse",
            width=number(spacing),
            height=number(spacing),
            patternTransform=f"rotate({number(-hatch['angle_deg'])})",
            data_hatch_pattern=hatch["pattern_id"],
        )
        element(pattern, "rect", width=number(spacing), height=number(spacing), fill="white", stroke="none")
        if hatch["pattern_id"] == "solid":
            element(pattern, "rect", width=number(spacing), height=number(spacing), fill="black", stroke="none")
        else:
            for a, b in segments(hatch["pattern_id"]):
                # Map the library's y-up tile into the SVG tile.
                element(
                    pattern,
                    "line",
                    x1=number(a[0] * spacing),
                    y1=number((1 - a[1]) * spacing),
                    x2=number(b[0] * spacing),
                    y2=number((1 - b[1]) * spacing),
                    stroke="black",
                    stroke_width=number(hatch["line_weight_mm"] * scene.scale),
                )
    layers = {
        lid: element(root, "g", **{"class": "layer"}, data_layer_id=lid, data_layer_name=data["name"])
        for lid, data in scene.layers.items()
    }
    for shape in scene.shapes:
        obj = shape.data
        group = element(
            layers[shape.layer],
            "g",
            **{"class": "object"},
            data_object_id=obj["id"],
            data_source=obj["source"],
            data_verify=str(obj.get("verify", False)).lower(),
            data_material_id=obj.get("material_id") or "",
            stroke="black",
            stroke_width=number(shape.weight),
        )
        fill = (
            f"url(#{patterns[str(shape.category)]})"
            if shape.hatch and shape.closed
            else "white"
            if shape.closed
            else "none"
        )
        if len(shape.points) == 1:
            p = shape.points[0]
            element(group, "circle", cx=number(p[0]), cy=number(-p[1]), r=number(shape.weight), fill="black")
        else:
            element(group, "polygon" if shape.closed else "polyline", points=points_text(shape.points), fill=fill)
    for dim in scene.dimensions:
        group = element(
            root,
            "g",
            **{"class": "dimension"},
            data_dimension_id=dim.data["id"],
            stroke="black",
            stroke_width=number(scene.dimension_weight),
            fill="none",
        )
        line(group, dim.start, dim.end)
        line(group, dim.witness_start, dim.start)
        line(group, dim.witness_end, dim.end)
        term = scene.dimension_style["terminator"]
        for p, other in ((dim.start, dim.end), (dim.end, dim.start)):
            attrs = {"class": f"terminator terminator-{term}"}
            size = 2.5 * scene.scale
            if term == "arrow":
                element(group, "polygon", points=points_text(terminator_points(p, other, size)), fill="black", **attrs)
            elif term == "dot":
                element(group, "circle", cx=number(p[0]), cy=number(-p[1]), r=number(size * 0.2), fill="black", **attrs)
            else:
                line(group, (p[0] - size / 2, p[1] - size / 2), (p[0] + size / 2, p[1] + size / 2), **attrs)
        text(group, dim.text, dim.text_position, scene.dimension_height)
    for ann in scene.annotations:
        group = element(
            root,
            "g",
            **{"class": "annotation"},
            data_annotation_id=ann.data["id"],
            data_layer_id=ann.data["layer_id"],
            data_layer_name=scene.layers[ann.data["layer_id"]]["name"],
            stroke="black",
            stroke_width=number(scene.layer_weight(ann.data["layer_id"])),
        )
        if ann.data["kind"] == "leader":
            for target in ann.targets:
                line(group, target, ann.position, **{"class": "leader"})
        text(group, ann.data["text"], ann.position, scene.annotation_height)
    for i, label in enumerate(scene.labels):
        text(
            root,
            label,
            (x0 + scene.scale * 2, y0 + scene.scale * (2 + i * 4)),
            3 * scene.scale,
            **{"class": "watermark"},
        )
    return bytes(ET.tostring(root, encoding="utf-8", xml_declaration=True))

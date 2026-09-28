"""One validated, millimetre-based scene shared by all drawing formats."""

from __future__ import annotations

import json
import math
import re
from dataclasses import dataclass
from functools import cache
from pathlib import Path
from typing import Any

import rfc8785

from engine.core.contracts import schema_errors
from engine.core.ddl import validate

Point = tuple[float, float]
Document = dict[str, Any]
MM = {"mm": 1.0, "m": 1000.0, "in": 25.4, "ft": 304.8}


class RenderError(ValueError):
    def __init__(self, code: str, message: str, path: str = "") -> None:
        self.code, self.message, self.path = code, message, path
        super().__init__(message)

    def body(self) -> Document:
        error: Document = {"code": self.code, "message": self.message}
        if self.path:
            error["details"] = [{"path": self.path, "message": self.message}]
        return {"error": error}


@cache
def copy_config() -> Document:
    path = Path(__file__).resolve().parents[2] / "contracts" / "copy.json"
    return dict(json.loads(path.read_text(encoding="utf-8")))


@cache
def banned_patterns() -> tuple[re.Pattern[str], ...]:
    config = copy_config()
    words = list(config["banned"])
    for scope in ("outside_studio_output", "render_and_preview_output"):
        words.extend(config["banned_scoped"][scope]["words"])
    patterns = [re.compile(r"\b" + re.escape(w).replace(r"\ ", r"[\s-]+") + r"\b", re.IGNORECASE) for w in words]
    patterns.extend(
        re.compile(p["pattern"], re.IGNORECASE if "i" in p["flags"] else 0) for p in config["banned_patterns"]
    )
    return tuple(patterns)


def safe_text(text: str) -> str:
    if any(pattern.search(text) for pattern in banned_patterns()):
        raise RenderError("invalid_ddl", "Drawing text contains a restricted claim.")
    if any(ord(c) < 32 and c not in "\n\t" for c in text):
        raise RenderError("invalid_ddl", "Drawing text contains control characters.")
    return text


def number(value: float) -> str:
    return f"{value:.8f}".rstrip("0").rstrip(".") if value else "0"


def bounds(points: list[Point]) -> tuple[float, float, float, float]:
    return min(p[0] for p in points), min(p[1] for p in points), max(p[0] for p in points), max(p[1] for p in points)


@dataclass(frozen=True)
class Shape:
    data: Document
    points: list[Point]
    closed: bool
    layer: str
    weight: float  # model mm; paper weight multiplied by drawing scale
    hatch: Document | None
    category: str | None

    @property
    def centre(self) -> Point:
        x0, y0, x1, y1 = bounds(self.points)
        return (x0 + x1) / 2, (y0 + y1) / 2


@dataclass(frozen=True)
class Dimension:
    data: Document
    start: Point
    end: Point
    witness_start: Point
    witness_end: Point
    text: str
    text_position: Point


@dataclass(frozen=True)
class Annotation:
    data: Document
    position: Point
    targets: list[Point]


def geometry(data: Document, factor: float) -> tuple[list[Point], bool]:
    kind = data.get("kind")
    closed = kind in ("polygon", "rect") or bool(data.get("closed", False))
    try:
        if kind in ("polygon", "polyline", "point"):
            raw = data.get("points") or ([data["origin"]] if kind == "point" else [])
            points = [(float(p[0]) * factor, float(p[1]) * factor) for p in raw]
        elif kind == "rect":
            x, y = data["origin"]
            w, h = data["width"], data["height"]
            if w <= 0 or h <= 0:
                raise ValueError
            angle = math.radians(data.get("rotation_deg", 0))
            points = [
                (
                    (x + a * math.cos(angle) - b * math.sin(angle)) * factor,
                    (y + a * math.sin(angle) + b * math.cos(angle)) * factor,
                )
                for a, b in ((0, 0), (w, 0), (w, h), (0, h))
            ]
        elif kind == "arc":
            x, y = data["center"]
            radius = data["radius"]
            if radius <= 0:
                raise ValueError
            start, end = float(data["start_deg"]), float(data["end_deg"])
            sweep = (end - start) % 360 or 360.0
            # Chord error <= 0.02 model mm, bounded for large radii.
            step = math.degrees(2 * math.acos(max(-1.0, 1 - 0.02 / (radius * factor))))
            count = max(8, min(8192, math.ceil(sweep / max(step, 0.01))))
            points = [
                (
                    (x + radius * math.cos(math.radians(start + sweep * i / count))) * factor,
                    (y + radius * math.sin(math.radians(start + sweep * i / count))) * factor,
                )
                for i in range(count + 1)
            ]
        else:
            raise RenderError("invalid_ddl", "Geometry must be resolved to explicit drawing coordinates.")
        if len(points) < (3 if closed else 1 if kind == "point" else 2):
            raise ValueError
        if not all(math.isfinite(v) and abs(v) <= 1e9 for p in points for v in p):
            raise ValueError
        return points, closed
    except (KeyError, TypeError, ValueError) as exc:
        if isinstance(exc, RenderError):
            raise
        raise RenderError(
            "invalid_ddl", "Drawing geometry is incomplete or outside the supported coordinate range."
        ) from exc


class Scene:
    def __init__(self, request: Any) -> None:
        if not isinstance(request, dict) or set(request) != {"ddl", "conventions"}:
            raise RenderError("invalid_request", "Supply a drawing and resolved profile conventions.")
        ddl, conventions = request["ddl"], request["conventions"]
        try:
            issues = validate(ddl)
        except (rfc8785.CanonicalizationError, OverflowError) as exc:
            raise RenderError("invalid_ddl", "The drawing contains unsupported numeric values.") from exc
        if issues:
            raise RenderError("invalid_ddl", "The drawing failed validation.", issues[0].path)
        if schema_errors("profile.schema.json#/$defs/conventions", conventions):
            raise RenderError("invalid_conventions", "The profile conventions failed validation.")
        if ddl.get("solver", {}).get("status") != "resolved":
            raise RenderError("invalid_ddl", "Resolve drawing constraints before rendering.")
        self.ddl: Document = ddl
        self.conventions: Document = conventions
        self.drawing: Document = ddl["drawing"]
        self.scale = float(self.drawing["scale"])
        self.factor = MM[self.drawing["units"]]
        self.layers: dict[str, Document] = {layer["id"]: layer for layer in ddl["layers"]}
        self.materials: dict[str, Document] = {material["id"]: material for material in ddl["materials"]}
        self.shapes: list[Shape] = []
        hatches = conventions.get("hatches", {})
        if len(ddl["objects"]) > 5000:
            raise RenderError("invalid_ddl", "This drawing exceeds the renderer's object limit.")
        for obj in ddl["objects"]:
            layer_id = obj.get("layer_id")
            if layer_id not in self.layers:
                raise RenderError("invalid_ddl", "Every rendered object must name a drawing layer.")
            material = self.materials.get(obj.get("material_id"))
            category = material["category"] if material else None
            if category is not None and category not in hatches:
                raise RenderError("missing_hatch_mapping", "A drawn material category has no profile hatch mapping.")
            hatch = hatches.get(category)
            if hatch and (hatch["scale"] < 0.1 or hatch["line_weight_mm"] > hatch["scale"]):
                raise RenderError(
                    "invalid_conventions", "Hatch spacing must be at least 0.1 mm and exceed its line weight."
                )
            points, closed = geometry(obj.get("geometry", {}), self.factor)
            self.shapes.append(Shape(obj, points, closed, layer_id, self.layer_weight(layer_id), hatch, category))
        if not self.shapes or sum(len(s.points) for s in self.shapes) > 200000:
            raise RenderError("invalid_ddl", "Supply a nonempty drawing within the renderer's geometry limit.")
        # SVG groups objects by layer. Apply the same stacking order in every format.
        layer_order = {lid: i for i, lid in enumerate(self.layers)}
        self.shapes.sort(key=lambda shape: layer_order[shape.layer])
        self.by_id = {s.data["id"]: s for s in self.shapes}
        self.object_bounds = bounds([p for s in self.shapes for p in s.points])
        self.dimension_style = conventions.get("dimension_style", {})
        if ddl["dimensions"] and not {"terminator", "precision", "text_height_mm"} <= self.dimension_style.keys():
            raise RenderError("invalid_conventions", "Supply dimension terminators, precision and text height.")
        self.dimensions = [self.dimension(d, i) for i, d in enumerate(ddl["dimensions"]) if d.get("display", True)]
        self.annotations: list[Annotation] = []
        for a in ddl["annotations"]:
            safe_text(a["text"])
            if a.get("layer_id") not in self.layers or "position" not in a:
                raise RenderError("invalid_ddl", "Annotations need a layer and an explicit position.")
            targets = []
            for ref in a.get("targets", []):
                if ref not in self.by_id:
                    raise RenderError("invalid_ddl", "An annotation target is missing.")
                targets.append(self.by_id[ref].centre)
            position = tuple(float(v) * self.factor for v in a["position"])
            self.annotations.append(Annotation(a, (position[0], position[1]), targets))
        safe_text(self.drawing["title"])
        safe_text(self.drawing["rev"])
        for layer in self.layers.values():
            safe_text(layer["name"])
        self.annotation_height = self.text_height("annotation")
        self.dimension_height = self.text_height("dimension")
        pts = [p for s in self.shapes for p in s.points]
        for d in self.dimensions:
            pts.extend((d.start, d.end, d.text_position))
            pts.append(
                (
                    d.text_position[0] + len(d.text) * self.dimension_height * 0.65,
                    d.text_position[1] + self.dimension_height,
                )
            )
        for a in self.annotations:
            pts.extend(
                (
                    a.position,
                    (
                        a.position[0] + len(a.data["text"]) * self.annotation_height * 0.65,
                        a.position[1] + self.annotation_height,
                    ),
                )
            )
        x0, y0, x1, y1 = bounds(pts)
        margin = 8 * self.scale
        self.bounds = x0 - margin, y0 - margin, x1 + margin, y1 + margin

    def layer_weight(self, layer_id: str) -> float:
        layer = self.layers[layer_id]
        value = self.conventions.get("line_weights_mm", {}).get(layer["name"], layer.get("line_weight_mm"))
        if value is None or value <= 0:
            raise RenderError("invalid_conventions", "Every drawing layer needs a positive line weight.")
        return float(value) * self.scale

    def text_height(self, kind: str) -> float:
        value = self.conventions.get("text_heights_mm", {}).get(kind)
        if value is None and kind == "dimension":
            value = self.dimension_style.get("text_height_mm")
        if value is None or value <= 0:
            raise RenderError("invalid_conventions", "Supply a positive profile text height.")
        return float(value) * self.scale

    @property
    def dimension_weight(self) -> float:
        # Dimension layer name is a presentation fallback; no material/jurisdiction selection.
        value = self.conventions.get("line_weights_mm", {}).get("A-Dims")
        if value is None or value <= 0:
            raise RenderError("invalid_conventions", "Supply the dimension line weight in profile conventions.")
        return float(value) * self.scale

    def dimension(self, d: Document, index: int) -> Dimension:
        if d["kind"] != "linear" or d["value"] is None or d["value"] <= 0:
            raise RenderError("invalid_ddl", "This renderer requires resolved, positive linear dimensions.")
        refs = [r.split(".", 1)[0] for r in d["refs"]]
        if not refs or any(r not in self.by_id for r in refs):
            raise RenderError("invalid_ddl", "A displayed dimension refers to missing geometry.")
        first = self.by_id[refs[0]].points
        second = self.by_id[refs[-1]].points
        value = float(d["value"]) * self.factor
        choices = [
            (abs(a[1 - axis] - b[1 - axis]), axis, a, b)
            for axis in (0, 1)
            for a in first
            for b in second
            if math.isclose(abs(a[axis] - b[axis]), value, rel_tol=1e-7, abs_tol=1e-5)
        ]
        if not choices:
            raise RenderError("invalid_ddl", "The supplied dimension does not match its referenced drawing edges.")
        _, axis, a, b = min(choices)
        x0, y0, x1, _ = self.object_bounds
        offset = (8 + index * 8) * self.scale
        if axis == 0:
            start, end = (a[0], y0 - offset), (b[0], y0 - offset)
        else:
            start, end = (x1 + offset, a[1]), (x1 + offset, b[1])
        text_position = ((start[0] + end[0]) / 2 + self.scale, (start[1] + end[1]) / 2 + self.scale)
        text = f"{d['value']:.{self.dimension_style['precision']}f}"
        return Dimension(d, start, end, a, b, text, text_position)

    @property
    def labels(self) -> list[str]:
        config = copy_config()
        if self.drawing["mode"] == "idea":
            return [str(config["watermark"]["concept"])]
        if self.drawing["mode"] == "learn":
            return [str(config["watermark"]["student"]), str(config["mark"]["made_with"])]
        return []

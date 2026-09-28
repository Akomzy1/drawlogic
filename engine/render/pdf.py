"""Cairo vector PDF with a measured sheet scale and a blank trust-stamp region."""

from __future__ import annotations

import io
import math
from typing import Any

import cairo

from engine.render.hatches import segments
from engine.render.scene import Point, RenderError, Scene
from engine.render.svg import terminator_points

PT_PER_MM = 72 / 25.4
SHEETS = {
    "A0": (841, 1189),
    "A1": (594, 841),
    "A2": (420, 594),
    "A3": (297, 420),
    "A4": (210, 297),
    "A5": (148, 210),
    "A6": (105, 148),
    "Letter": (215.9, 279.4),
    "Legal": (215.9, 355.6),
    "Tabloid": (279.4, 431.8),
}


def path(ctx: cairo.Context[Any], points: list[Point], closed: bool = False) -> None:
    ctx.new_path()
    ctx.move_to(*points[0])
    for p in points[1:]:
        ctx.line_to(*p)
    if closed:
        ctx.close_path()


def text(ctx: cairo.Context[Any], value: str, position: Point, height: float) -> None:
    ctx.save()
    ctx.translate(*position)
    ctx.scale(1, -1)
    ctx.select_font_face("sans-serif")
    ctx.set_font_size(height)
    ctx.move_to(0, 0)
    ctx.show_text(value)
    ctx.restore()


def draw(ctx: cairo.Context[Any], scene: Scene) -> None:
    for shape in scene.shapes:
        ctx.set_source_rgb(0, 0, 0)
        ctx.set_line_width(shape.weight)
        if len(shape.points) == 1:
            ctx.arc(*shape.points[0], shape.weight, 0, 2 * math.pi)
            ctx.fill()
            continue
        path(ctx, shape.points, shape.closed)
        if shape.closed:
            ctx.set_source_rgb(1, 1, 1)
            ctx.fill_preserve()
            if shape.hatch:
                hatch = shape.hatch
                if hatch["pattern_id"] == "solid":
                    ctx.set_source_rgb(0, 0, 0)
                else:
                    spacing = hatch["scale"] * scene.scale
                    tile = cairo.RecordingSurface(cairo.CONTENT_COLOR_ALPHA, cairo.Rectangle(0, 0, spacing, spacing))
                    tile_ctx = cairo.Context(tile)
                    tile_ctx.set_line_width(hatch["line_weight_mm"] * scene.scale)
                    for a, b in segments(hatch["pattern_id"]):
                        tile_ctx.move_to(a[0] * spacing, a[1] * spacing)
                        tile_ctx.line_to(b[0] * spacing, b[1] * spacing)
                    tile_ctx.stroke()
                    pattern = cairo.SurfacePattern(tile)
                    pattern.set_extend(cairo.EXTEND_REPEAT)
                    matrix = cairo.Matrix()
                    matrix.rotate(-math.radians(hatch["angle_deg"]))
                    pattern.set_matrix(matrix)
                    ctx.set_source(pattern)
                ctx.fill_preserve()
        ctx.set_source_rgb(0, 0, 0)
        ctx.stroke()
    for dim in scene.dimensions:
        ctx.set_line_width(scene.dimension_weight)
        for a, b in ((dim.start, dim.end), (dim.witness_start, dim.start), (dim.witness_end, dim.end)):
            path(ctx, [a, b])
            ctx.stroke()
        for p, other in ((dim.start, dim.end), (dim.end, dim.start)):
            size = 2.5 * scene.scale
            term = scene.dimension_style["terminator"]
            if term == "arrow":
                path(ctx, terminator_points(p, other, size), True)
                ctx.fill()
            elif term == "dot":
                ctx.arc(*p, size * 0.2, 0, 2 * math.pi)
                ctx.fill()
            else:
                path(ctx, [(p[0] - size / 2, p[1] - size / 2), (p[0] + size / 2, p[1] + size / 2)])
                ctx.stroke()
        text(ctx, dim.text, dim.text_position, scene.dimension_height)
    for ann in scene.annotations:
        ctx.set_line_width(scene.layer_weight(ann.data["layer_id"]))
        if ann.data["kind"] == "leader":
            for target in ann.targets:
                path(ctx, [target, ann.position])
                ctx.stroke()
        text(ctx, ann.data["text"], ann.position, scene.annotation_height)


def render(scene: Scene) -> bytes:
    sheets = scene.conventions.get("sheets", [])
    if not sheets or sheets[0]["size"] not in SHEETS:
        raise RenderError("invalid_conventions", "Select a supported paper size in profile conventions.")
    width, height = SHEETS[sheets[0]["size"]]
    if sheets[0].get("orientation", "portrait") == "landscape":
        width, height = height, width
    x0, y0, x1, y1 = scene.bounds
    drawing_width, drawing_height = (x1 - x0) / scene.scale, (y1 - y0) / scene.scale
    if drawing_width > width - 20 or drawing_height > height - 65:
        raise RenderError("invalid_conventions", "The drawing does not fit this sheet at its declared scale.")
    output = io.BytesIO()
    surface = cairo.PDFSurface(output, width * PT_PER_MM, height * PT_PER_MM)
    surface.set_metadata(cairo.PDF_METADATA_TITLE, scene.drawing["title"])
    surface.set_metadata(cairo.PDF_METADATA_SUBJECT, scene.drawing["hash"] + "; revision " + scene.drawing["rev"])
    surface.set_metadata(cairo.PDF_METADATA_CREATOR, "Drawlogic")
    for field in (cairo.PDF_METADATA_CREATE_DATE, cairo.PDF_METADATA_MOD_DATE):
        surface.set_metadata(field, scene.drawing["created_at"])
    ctx = cairo.Context(surface)
    ctx.scale(PT_PER_MM, PT_PER_MM)
    ctx.save()
    ctx.translate((width - drawing_width) / 2, 10)
    ctx.scale(1 / scene.scale, -1 / scene.scale)
    ctx.translate(-x0, -y1)
    draw(ctx, scene)
    ctx.restore()
    # Paper coordinates. The right-hand box is deliberately blank for trust's assembler.
    ctx.set_line_width(0.25)
    ctx.rectangle(10, height - 45, width - 20, 35)
    ctx.move_to(width - 100, height - 45)
    ctx.line_to(width - 100, height - 10)
    ctx.stroke()
    ctx.select_font_face("sans-serif")
    ctx.set_font_size(scene.text_height("title") / scene.scale)
    ctx.move_to(15, height - 35)
    ctx.show_text(scene.drawing["title"])
    ctx.set_font_size(3)
    ctx.move_to(15, height - 28)
    ctx.show_text(f"Rev {scene.drawing['rev']}     1:{scene.drawing['scale']}")
    ctx.set_font_size(2)
    ctx.move_to(15, height - 22)
    ctx.show_text(scene.drawing["hash"])
    ctx.set_font_size(3)
    for i, label in enumerate(scene.labels):
        ctx.move_to(15, height - 16 + i * 4)
        ctx.show_text(label)
    surface.show_page()
    surface.finish()
    return output.getvalue()

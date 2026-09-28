"""Aligned orthographic 2D conditioning maps, never inferred extrusion or materials."""

from __future__ import annotations

import base64
import hashlib
import io
import math

from PIL import Image, ImageDraw, PngImagePlugin

from engine.render.scene import Document, Scene


def render(scene: Scene) -> Document:
    x0, y0, x1, y1 = scene.object_bounds
    margin = max(x1 - x0, y1 - y0, 1) * 0.025
    x0, y0, x1, y1 = x0 - margin, y0 - margin, x1 + margin, y1 + margin
    pixel = max(x1 - x0, y1 - y0) / 1024
    width, height = max(1, math.ceil((x1 - x0) / pixel)), max(1, math.ceil((y1 - y0) / pixel))
    line = Image.new("L", (width, height), 255)
    depth = Image.new("L", (width, height), 255)
    material = Image.new("RGB", (width, height), "white")
    ld, dd, md = ImageDraw.Draw(line), ImageDraw.Draw(depth), ImageDraw.Draw(material)
    legend: dict[str, str] = {}
    used = {0xFFFFFF, 0}
    for mid in sorted(scene.materials):
        colour = int.from_bytes(hashlib.sha256(mid.encode()).digest()[:3], "big")
        while colour in used:
            colour = (colour + 1) % 0x1000000
        used.add(colour)
        legend[mid] = f"#{colour:06X}"
    for shape in scene.shapes:
        points = [((x - x0) / pixel, (y1 - y) / pixel) for x, y in shape.points]
        material_id = shape.data.get("material_id")
        ink = legend[material_id] if material_id else "white"
        if shape.closed:
            # The same layer/object stacking order as SVG and PDF.
            ld.polygon(points, fill=255, outline=0, width=max(1, round(shape.weight / pixel)))
            dd.polygon(points, fill=0)
            md.polygon(points, fill=ink)
        elif len(points) > 1:
            stroke = max(1, round(shape.weight / pixel))
            ld.line(points, fill=0, width=stroke)
            dd.line(points, fill=0, width=stroke)
            md.line(points, fill=ink, width=stroke)
        else:
            ld.point(points[0], fill=0)
            dd.point(points[0], fill=0)
            md.point(points[0], fill=ink)
    info = PngImagePlugin.PngInfo()
    info.add_text("drawing_hash", scene.drawing["hash"])
    info.add_text("drawing_rev", scene.drawing["rev"])
    info.add_text("depth_basis", "2D drawing plane; background is not model geometry")

    def encode(image: Image.Image) -> str:
        output = io.BytesIO()
        image.save(output, format="PNG", pnginfo=info, compress_level=9)
        return base64.b64encode(output.getvalue()).decode("ascii")

    return {
        "drawing_hash": scene.drawing["hash"],
        "drawing_rev": scene.drawing["rev"],
        "grid": {
            "width_px": width,
            "height_px": height,
            "mm_per_px": pixel,
            "origin": [x0 / scene.factor, y1 / scene.factor],
        },
        "line_art": encode(line),
        "depth": encode(depth),
        "material_map": encode(material),
        "depth_encoding": {"bits": 8, "near_mm": 0, "far_mm": 0},
        "legend": legend,
        "background": "#FFFFFF",
    }

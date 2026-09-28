"""Jurisdiction-neutral hatch geometry; profiles select patterns, spacing and rotation."""

from __future__ import annotations

import math
from functools import cache

from engine.render.scene import Point

# DXF pattern definitions: angle, base point, offset to the next line, dash/gap lengths.
PatternLine = tuple[float, Point, Point, tuple[float, ...]]
PATTERNS: dict[str, tuple[PatternLine, ...]] = {
    "diagonal": ((45, (0, 0), (0, 1), ()),),
    "cross_diagonal": ((45, (0, 0), (0, 1), ()), (135, (0, 0), (0, 1), ())),
    "brick": ((0, (0, 0), (0, 0.5), ()), (90, (0, 0), (0.5, 0.5), (0.5, -0.5))),
    "block": ((0, (0, 0), (0, 1), ()), (90, (0, 0), (0.5, 1), (1, -1))),
    "insulation_rigid": ((45, (0, 0), (0, 0.5), ()), (135, (0, 0), (0, 0.5), ())),
    "insulation_batt": (
        (45, (0, 0), (0, 1), (math.sqrt(0.5), -math.sqrt(0.5))),
        (135, (1, 0), (0, 1), (math.sqrt(0.5), -math.sqrt(0.5))),
    ),
    "concrete": (
        (0, (0.15, 0.2), (0, 1), (0.2, -0.8)),
        (45, (0.15, 0.2), (0, 1), (0.14, -math.sqrt(2) + 0.14)),
        (135, (0.35, 0.2), (0, 1), (0.14, -math.sqrt(2) + 0.14)),
    ),
    "screed": ((0, (0.2, 0.2), (0.5, 0.5), (0.03, -0.97)),),
    "timber_grain": ((0, (0, 0), (0, 0.33), ()), (0, (0.2, 0.17), (0, 1), (0.4, -0.6))),
    "stone": ((0, (0, 0), (0, 0.5), ()), (90, (0, 0), (0.5, 0.5), (0.5, -0.5))),
    "earth": (
        (0, (0.1, 0.1), (0, 1), (0.3, -0.7)),
        (0, (0.1, 0.2), (0, 1), (0.3, -0.7)),
        (90, (0.6, 0.6), (1, 0), (0.3, -0.7)),
        (90, (0.7, 0.6), (1, 0), (0.3, -0.7)),
    ),
    "solid": (),
}


@cache
def segments(pattern: str) -> tuple[tuple[Point, Point], ...]:
    """Clip the same DXF pattern definitions to a repeating unit square."""
    result: list[tuple[Point, Point]] = []
    for angle, base, offset, dashes in PATTERNS[pattern]:
        ux, uy = math.cos(math.radians(angle)), math.sin(math.radians(angle))
        for k in range(-8, 9):
            x, y = base[0] + k * offset[0], base[1] + k * offset[1]
            lo, hi = -math.inf, math.inf
            for origin, direction in ((x, ux), (y, uy)):
                if abs(direction) < 1e-8:
                    if not -1e-8 <= origin <= 1 + 1e-8:
                        hi = -math.inf
                else:
                    a, b = -origin / direction, (1 - origin) / direction
                    lo, hi = max(lo, min(a, b)), min(hi, max(a, b))
            if lo >= hi:
                continue
            intervals = [(lo, hi)]
            if dashes:
                intervals = []
                period = sum(abs(d) for d in dashes)
                for repeat in range(math.floor(lo / period) - 1, math.ceil(hi / period) + 1):
                    t = repeat * period
                    for dash in dashes:
                        end = t + abs(dash)
                        if dash > 0 and max(t, lo) < min(end, hi):
                            intervals.append((max(t, lo), min(end, hi)))
                        t = end
            result.extend((((x + a * ux, y + a * uy), (x + b * ux, y + b * uy))) for a, b in intervals)
    return tuple(result)

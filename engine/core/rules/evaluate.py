"""Evaluates a rule condition (contracts/rule.schema.json → $defs.expr) over a resolved DDL. Pure; no model is called.

A condition evaluates to True or False, or raises `Missing` when the drawing does not carry what the rule reads — an
absent field, an object class that is not drawn, something the drawing does not record. Missing never becomes a
default: the engine reports ⚠ needs_input rather than guessing (trust rule 4).

Measures are the contract's jurisdiction-neutral primitives. Geometry is read from each object's bounding box in the
drawing's local frame (x across, y up). A measure the drawing cannot supply raises Missing with the reason.
"""

from __future__ import annotations

from decimal import Decimal
from typing import Any

UNITS_MM = {"mm": Decimal(1), "cm": Decimal(10), "m": Decimal(1000)}
# Object keys a rule `field` reads directly; any other name is read from the object's typed `properties`.
OBJECT_FIELDS = ("label", "material_id", "thickness", "height", "level", "base_offset", "status", "layer_id")


class Missing(Exception):
    """The drawing does not carry what the rule reads; the message says what is absent."""


class Context:
    def __init__(self, ddl: dict[str, Any], subject: dict[str, Any] | None) -> None:
        self.ddl = ddl
        self.subject = subject
        self.scale = UNITS_MM[ddl["drawing"]["units"]]

    def of_class(self, cls: str) -> list[dict[str, Any]]:
        return [o for o in self.ddl["objects"] if o["class"] == cls]

    def need_class(self, cls: Any) -> list[dict[str, Any]]:
        objects = self.of_class(str(cls))
        if not objects:
            raise Missing(f"the drawing has no {cls}")
        return objects


def read_field(obj: dict[str, Any], field: str) -> Any:
    if field in OBJECT_FIELDS:
        return obj.get(field)
    return (obj.get("properties") or {}).get(field)


def has_input(ctx: Context, name: str) -> bool:
    """A required input is present as a field on the subject or, for drawing-level inputs, as a drawn object class."""
    if ctx.subject is not None and read_field(ctx.subject, name) is not None:
        return True
    return bool(ctx.of_class(name))


def _number(value: Any) -> Decimal | None:
    if isinstance(value, bool) or not isinstance(value, int | float):
        return None
    return Decimal(repr(value)) if isinstance(value, float) else Decimal(value)


def _literal(ref: dict[str, Any], ctx: Context) -> Any:
    value = ref["value"]
    unit = ref.get("unit")
    if unit is None or _number(value) is None:
        return value
    if unit not in UNITS_MM:
        raise ValueError(f"unit {unit!r} is not a length unit this engine converts")
    return _number(value) * UNITS_MM[unit] / ctx.scale  # type: ignore[operator]


def operand(ref: dict[str, Any], ctx: Context) -> list[Any]:
    """The values an operand denotes; a list so `select: all` compares every object."""
    if "value" in ref:
        return [_literal(ref, ctx)]
    if "param" in ref:
        raise Missing(f"no profile in the stack defines the parameter {ref['param']}")
    if "measure" in ref:
        return [measure(ref["measure"], ref.get("args", {}), ctx)]
    if "object_class" in ref:
        values = [read_field(o, ref["field"]) for o in ctx.need_class(ref["object_class"])]
        if any(v is None for v in values):
            raise Missing(f"a {ref['object_class']} has no {ref['field']}")
        select = ref.get("select", "all")
        if select == "one":
            if len(values) != 1:
                raise Missing(f"the rule reads one {ref['object_class']}; the drawing has {len(values)}")
            return values
        if select in ("min", "max"):
            numbers = [_numeric(v, ref["field"]) for v in values]
            return [min(numbers) if select == "min" else max(numbers)]
        return values
    if ctx.subject is None:
        raise Missing(f"the rule reads {ref['field']} but applies to the whole drawing, not an object")
    value = read_field(ctx.subject, ref["field"])
    if value is None:
        raise Missing(f"{ctx.subject['id']} has no {ref['field']}")
    return [value]


def _numeric(value: Any, what: str) -> Decimal:
    number = _number(value) if not isinstance(value, Decimal) else value
    if number is None:
        raise Missing(f"{what} is not a number")
    return number


def _compare(left: Any, op: str, right: Any) -> bool:
    if op in ("==", "!="):
        if _number(left) is not None or isinstance(left, Decimal):
            left, right = _numeric(left, "the left value"), _numeric(right, "the right value")
        return bool(left == right) if op == "==" else bool(left != right)
    a, b = _numeric(left, "the left value"), _numeric(right, "the right value")
    return {">=": a >= b, "<=": a <= b, ">": a > b, "<": a < b}[op]


def holds(expr: dict[str, Any], ctx: Context) -> bool:
    if "all" in expr:
        return all(holds(e, ctx) for e in expr["all"])
    if "any" in expr:
        return any(holds(e, ctx) for e in expr["any"])
    if "not" in expr:
        return not holds(expr["not"], ctx)
    if "exists" in expr:
        try:
            return all(v is not None for v in operand(expr["exists"], ctx))
        except Missing:
            return False
    cmp = expr["cmp"]
    lefts, rights = operand(cmp["left"], ctx), operand(cmp["right"], ctx)
    return all(_compare(a, cmp["op"], b) for a in lefts for b in rights)


# --- measures ---------------------------------------------------------------------------------------------------


def _box(obj: dict[str, Any]) -> tuple[Decimal, Decimal, Decimal, Decimal]:
    """(x_min, y_min, x_max, y_max) of an object's geometry."""
    g = obj.get("geometry")
    if not g:
        raise Missing(f"{obj['id']} has no geometry")
    if g["kind"] == "rect" and "origin" in g and "width" in g and "height" in g:
        x, y = (_numeric(c, "a coordinate") for c in g["origin"][:2])
        w, h = _numeric(g["width"], "width"), _numeric(g["height"], "height")
        return min(x, x + w), min(y, y + h), max(x, x + w), max(y, y + h)
    if g.get("points"):
        xs = [_numeric(p[0], "a coordinate") for p in g["points"]]
        ys = [_numeric(p[1], "a coordinate") for p in g["points"]]
        return min(xs), min(ys), max(xs), max(ys)
    if g["kind"] == "point" and "origin" in g:
        x, y = (_numeric(c, "a coordinate") for c in g["origin"][:2])
        return x, y, x, y
    raise Missing(f"{obj['id']} has {g['kind']} geometry this measure cannot read")


def _extent(objects: list[dict[str, Any]], axis: int, end: Any) -> Decimal:
    """The min or max coordinate along an axis (0 = x, 1 = y) over the objects' bounding boxes."""
    boxes = [_box(o) for o in objects]
    if end == "min":
        return min(b[axis] for b in boxes)
    if end == "max":
        return max(b[axis + 2] for b in boxes)
    raise ValueError(f"measure end must be min or max, not {end!r}")


def _distance(args: dict[str, Any], ctx: Context, axis: int) -> Decimal:
    start = _extent(ctx.need_class(args["from_class"]), axis, args.get("from", "max"))
    end = _extent(ctx.need_class(args["to_class"]), axis, args.get("to", "min"))
    return end - start


def _is_closed(g: dict[str, Any] | None) -> bool | None:
    if not g:
        return None
    if g["kind"] in ("rect", "polygon"):
        return True
    if g["kind"] == "polyline":
        points = g.get("points") or []
        return bool(g.get("closed")) or (len(points) > 2 and points[0] == points[-1])
    return None  # point, arc and layer_band are not outlines


def _unannotated_materials(ctx: Context) -> int:
    targets = {t for a in ctx.ddl["annotations"] for t in a.get("targets", [])}
    used: dict[str, set[str]] = {}
    for o in ctx.ddl["objects"]:
        if o.get("material_id"):
            used.setdefault(o["material_id"], set()).add(o["id"])
    return sum(1 for mid, objs in used.items() if mid not in targets and not objs & targets)


NAMED_SETS = {
    "dimension_conflicts": lambda ctx: len((ctx.ddl.get("solver") or {}).get("conflicts", [])),
    "materials_without_annotation": _unannotated_materials,
}


def measure(name: str, args: dict[str, Any], ctx: Context) -> Any:
    if name == "count":
        if "object_class" in args:
            return Decimal(len(ctx.of_class(str(args["object_class"]))))
        if args.get("of") in NAMED_SETS:
            return Decimal(NAMED_SETS[str(args["of"])](ctx))
        raise Missing(f"the drawing does not record {args.get('of')}")
    if name == "vertical_distance":
        return _distance(args, ctx, axis=1)
    if name == "horizontal_distance":
        return _distance(args, ctx, axis=0)
    if name == "thickness_sum":
        objects = ctx.need_class(args["object_class"])
        return sum((_numeric(o.get("thickness"), f"{o['id']} thickness") for o in objects), Decimal(0))
    if name == "is_connected":
        a = {o["id"] for o in ctx.need_class(args["from_class"])}
        b = {o["id"] for o in ctx.need_class(args["to_class"])}
        return any(
            (c["from"] in a and c["to"] in b) or (c["from"] in b and c["to"] in a) for c in ctx.ddl["connections"]
        )
    if name == "overlap_length":
        axis = 0 if args.get("axis") == "horizontal" else 1
        overlaps = [
            min(fa[axis + 2], ta[axis + 2]) - max(fa[axis], ta[axis])
            for fa in map(_box, ctx.need_class(args["from_class"]))
            for ta in map(_box, ctx.need_class(args["to_class"]))
        ]
        return max(Decimal(0), max(overlaps))
    if name == "is_closed":
        verdicts = [_is_closed(o.get("geometry")) for o in ctx.ddl["objects"]]
        outlines = [v for v in verdicts if v is not None]
        if not outlines:
            raise Missing("the drawing has no outlines to check for closure")
        return all(outlines)
    if name == "area":
        boxes = [_box(o) for o in ctx.need_class(args["object_class"])]
        return sum(((b[2] - b[0]) * (b[3] - b[1]) for b in boxes), Decimal(0))
    # is_continuous, fall_ratio, coverage_ratio, setback: the DDL does not yet carry what these read.
    detail = ", ".join(f"{k}={v}" for k, v in sorted(args.items()))
    raise Missing(f"the drawing does not record what {name}({detail}) measures")

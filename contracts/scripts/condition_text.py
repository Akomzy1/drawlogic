"""Python twin of scripts/condition-text.mjs: renders a rule's structured condition as its display text.

`condition_text` is always this output, never authored. The grammar is documented in condition-text.mjs;
scripts/check_py.py proves both renderers produce the same text for every rule in the examples.
"""

from __future__ import annotations

from typing import Any


def _scalar(v: Any) -> str:
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, list):
        return "[" + ", ".join(_scalar(x) for x in v) + "]"
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    return str(v)


def _operand(o: dict[str, Any], subject: str) -> str:
    if "value" in o:
        return f"{_scalar(o['value'])} {o['unit']}" if o.get("unit") else _scalar(o["value"])
    if "param" in o:
        return f"param.{o['param']}"
    if "measure" in o:
        args = o.get("args") or {}
        return f"{o['measure']}(" + ", ".join(f"{k}={_scalar(args[k])}" for k in sorted(args)) + ")"
    if "object_class" in o:
        ref = f"{o['object_class']}.{o['field']}"
        return f"{o['select']}({ref})" if o.get("select") else ref
    if "field" in o:
        return f"{subject}.{o['field']}"
    raise ValueError(f"unknown operand {o!r}")


def _expr(e: dict[str, Any], subject: str) -> str:
    if "cmp" in e:
        c = e["cmp"]
        return f"{_operand(c['left'], subject)} {c['op']} {_operand(c['right'], subject)}"
    if "exists" in e:
        return f"exists({_operand(e['exists'], subject)})"
    if "not" in e:
        return f"not ({_expr(e['not'], subject)})"
    for key, word in (("all", "and"), ("any", "or")):
        if key in e:
            items = e[key]
            if len(items) == 1:
                return _expr(items[0], subject)
            return f" {word} ".join(f"({_expr(x, subject)})" for x in items)
    raise ValueError(f"unknown expression {e!r}")


def condition_text(rule: dict[str, Any]) -> str:
    """The display text for a rule."""
    return _expr(rule["condition"], (rule.get("applies_to") or {}).get("object_class") or "drawing")

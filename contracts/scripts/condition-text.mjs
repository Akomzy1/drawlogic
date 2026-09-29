// Renders a rule's structured `condition` as its display text. `condition_text` is always this output, never authored
// (contract review, 27 Sept 2026). scripts/condition_text.py is the Python twin; check_py.py proves they agree.
//
// Grammar
//   cmp      left op right                  e.g. upstand.height >= 150 mm
//   field    <subject>.<field>               subject = applies_to.object_class, else "drawing"
//   object   <object_class>.<field>          with select: select(<object_class>.<field>)
//   param    param.<name>
//   measure  <measure>(k=v, …)                args in key order; arrays as [a, b]
//   value    <value>[ <unit>]                booleans true/false
//   all/any  (a) and (b) / (a) or (b)        a single child is rendered without brackets
//   not      not (x)
//   exists   exists(<operand>)

const scalar = (v) => (Array.isArray(v) ? `[${v.map(scalar).join(", ")}]` : String(v));

function operand(o, subject) {
  if ("value" in o) return o.unit ? `${scalar(o.value)} ${o.unit}` : scalar(o.value);
  if ("param" in o) return `param.${o.param}`;
  if ("measure" in o) {
    const args = Object.keys(o.args ?? {}).sort().map((k) => `${k}=${scalar(o.args[k])}`);
    return `${o.measure}(${args.join(", ")})`;
  }
  if ("object_class" in o) {
    const ref = `${o.object_class}.${o.field}`;
    return o.select ? `${o.select}(${ref})` : ref;
  }
  if ("field" in o) return `${subject}.${o.field}`;
  throw new Error(`unknown operand ${JSON.stringify(o)}`);
}

function expr(e, subject) {
  if (e.cmp) return `${operand(e.cmp.left, subject)} ${e.cmp.op} ${operand(e.cmp.right, subject)}`;
  if (e.exists) return `exists(${operand(e.exists, subject)})`;
  if (e.not) return `not (${expr(e.not, subject)})`;
  for (const [key, word] of [["all", "and"], ["any", "or"]]) {
    if (e[key]) return e[key].length === 1 ? expr(e[key][0], subject) : e[key].map((x) => `(${expr(x, subject)})`).join(` ${word} `);
  }
  throw new Error(`unknown expression ${JSON.stringify(e)}`);
}

/** The display text for a rule. */
export function conditionText(rule) {
  return expr(rule.condition, rule.applies_to?.object_class ?? "drawing");
}

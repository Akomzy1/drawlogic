// RFC 8785 JSON Canonicalization Scheme, and the Drawlogic hashes defined in contracts/README.md.
// ES2015 JSON.stringify already emits RFC 8785 numbers and strings; JCS adds key order by UTF-16 code units.
import { createHash } from "node:crypto";

export function canonicalize(value) {
  if (value === null || typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value)) throw new Error("JCS: non-finite number");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const keys = Object.keys(value).filter((k) => value[k] !== undefined).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalize(value[k])}`).join(",")}}`;
}

export const sha256 = (text) => `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;

/** drawing.hash: the DDL with drawing.hash, checks and stamp removed. */
export function ddlHash(ddl) {
  const { checks: _c, stamp: _s, ...rest } = ddl;
  const { hash: _h, ...drawing } = rest.drawing;
  return sha256(canonicalize({ ...rest, drawing }));
}

/** audit record hash: the record without `hash`. */
export function auditHash(record) {
  const { hash: _h, ...rest } = record;
  return sha256(canonicalize(rest));
}

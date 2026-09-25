import fs from "node:fs";
import { MANIFEST_FILE } from "./common.mjs";

// Manifest keys that name Drawlogic drawings rather than generated imagery. These need no "Illustrative" caption.
const DRAWING_KEYS = /^(source|lineart|provenance|conditioning.*|structure_file|drawing)$/;
const HEX64 = /^[0-9a-f]{64}$/i;
const REJECTED = /reject|fail/i;

export function loadManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) return null;
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
}

const normPath = (p) => decodeURI(p.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0]).replace(/\/+/g, "/");

/**
 * Every manifest object that lists this path as one of its string values.
 * An entry is approved when neither it nor its review says rejected or failed; its hash is any 64-hex
 * value on the entry whose key names a hash (sha256, *_sha256, hash).
 */
export function findEntries(manifest, assetPath) {
  const want = normPath(assetPath);
  const found = [];
  const walk = (node, trail) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${trail}[${i}]`));
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === "string" && v.startsWith("/") && normPath(v) === want) {
        const hashes = Object.entries(node).filter(([hk, hv]) => /sha256|hash/i.test(hk) && typeof hv === "string" && HEX64.test(hv)).map(([hk, hv]) => ({ key: hk, value: hv.toLowerCase() }));
        const review = [node.visual_review?.status, node.geometry_gate?.status ?? node.geometry_gate, node.status, node.review_status].filter((s) => typeof s === "string");
        found.push({ trail: `${trail}.${k}`, key: k, hashes, rejected: review.some((s) => REJECTED.test(s)), review, isDrawing: DRAWING_KEYS.test(k) });
      }
      walk(v, `${trail}.${k}`);
    }
  };
  walk(manifest, "manifest");
  return found;
}

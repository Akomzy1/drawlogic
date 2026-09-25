import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES, SITE_DIR } from "../lib/common.mjs";
import { readSections } from "../lib/dom.mjs";
import { loadManifest } from "../lib/manifest.mjs";
import { openSite } from "../lib/site.mjs";

// Copy is served from site/content/*.json, not written inline in components. Each rendered line must be made of
// strings from the content files (asset captions and preview labels may also come from the media manifest).
const CONTENT_DIR = path.join(SITE_DIR, "content");

function strings(node: unknown, out: string[] = []) {
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => strings(n, out));
  else if (node && typeof node === "object") Object.values(node).forEach((n) => strings(n, out));
  return out;
}
const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

function loadCopy() {
  const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR, { recursive: true }).map(String).filter((f) => f.endsWith(".json")) : [];
  const all = files.flatMap((f) => strings(JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"))));
  const m = loadManifest();
  if (m) all.push(...[m.caption, m.preview_label].filter(Boolean));
  // Longest first, so a line is explained by the fewest, largest strings.
  return { files, pieces: [...new Set(all.map(norm).filter((s) => s.length >= 2))].sort((a, b) => b.length - a.length) };
}

/**
 * True when the line is entirely made of content strings plus punctuation, numbers and symbols, or is part of one
 * content string (a string broken across lines by <br> renders as several lines).
 */
function explained(line: string, pieces: string[]) {
  const whole = norm(line);
  if (pieces.some((p) => p.includes(whole))) return true;
  let rest = whole;
  for (const p of pieces) if (rest.includes(p)) rest = rest.split(p).join(" ");
  return /^[\s\p{P}\p{S}\d]*$/u.test(rest);
}

const copy = loadCopy();

for (const p of PAGES) {
  test(`${p.name}: copy is served from site/content/*.json`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Checked once, at 1280.");
    expect(copy.files.length, `No content files in ${CONTENT_DIR}`).toBeGreaterThan(0);
    await openSite(page, p);
    for (const s of await readSections(page)) {
      const inline = s.lines.filter((l: string) => /\p{L}{2}/u.test(l) && !explained(l, copy.pieces));
      expect.soft(inline.slice(0, 15), `${p.name} — "${s.key}": lines not found in site/content/*.json (written inline?)${inline.length > 15 ? ` — ${inline.length} in all` : ""}`).toEqual([]);
    }
  });
}

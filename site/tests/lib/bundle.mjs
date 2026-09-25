// Read a Claude Design export: the page template inside its bundle (or the file itself when it is plain HTML).
import fs from "node:fs";

export function exportSource(file) {
  const s = fs.readFileSync(file, "utf8");
  for (const m of s.matchAll(/<script[^>]*type="__bundler\/template"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { return JSON.parse(m[1].trim()); } catch { /* the loader also mentions the type; skip it */ }
  }
  return s;
}

/** Every *.html reference written in the source, including ones built by script ('…'+x+'.standalone.html' is skipped). */
export function htmlReferences(source) {
  const out = new Set();
  for (const m of source.matchAll(/["'(=]\s*([\w./%-]+?\.html)(?:[#?][^"'\s)]*)?["')\s]/g)) out.add(decodeURIComponent(m[1]));
  return [...out];
}

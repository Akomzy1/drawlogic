import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { PROTOTYPE_FILE } from "../lib/common.mjs";
import { exportSource, htmlReferences } from "../lib/bundle.mjs";

// Prototype integrity: every file in design/prototype/ is loaded, and every internal link — in the rendered page and
// in the export's own source — must resolve to a file in design/prototype/. Exports keep their exported filenames
// (*.standalone.html) so their links work unedited (fidelity skill). Every link target must be one of these files,
// and every one of them is loaded by its own test, so each link is followed to a page that loads.
const DIR = path.dirname(PROTOTYPE_FILE);
const FILES = fs.readdirSync(DIR).filter((f) => f.endsWith(".html")).sort();

const EXTERNAL = /^(https?:|mailto:|tel:|javascript:|data:|blob:|about:)/i;
function resolveLink(href: string, from: string): string | null {
  if (!href || href.startsWith("#") || EXTERNAL.test(href)) return null;
  const clean = href.split(/[?#]/)[0];
  if (!clean) return null;
  const abs = clean.startsWith("file:") ? fileURLToPath(clean) : path.resolve(path.dirname(from), decodeURIComponent(clean));
  return abs;
}

for (const file of FILES) {
  test(`prototype ${file}: every internal link resolves to a file in design/prototype/`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Checked once.");
    test.setTimeout(180_000);
    const full = path.join(DIR, file);
    await page.goto(pathToFileURL(full).href, { waitUntil: "load", timeout: 120_000 });
    // Bundled exports render after load; wait until the set of links stops changing.
    let last = -1;
    for (let i = 0; i < 40; i++) {
      const n = await page.evaluate(() => document.querySelectorAll("a[href], area[href]").length);
      if (n === last && i > 3) break;
      last = n;
      await page.waitForTimeout(500);
    }
    const rendered = await page.evaluate(() => [...document.querySelectorAll("a[href], area[href]")].map((a) => a.getAttribute("href") ?? ""));
    const written = htmlReferences(exportSource(full));
    const broken: string[] = [];
    for (const href of new Set([...rendered, ...written])) {
      const abs = resolveLink(href, full);
      if (!abs) continue;
      if (!abs.startsWith(DIR + path.sep) || !fs.existsSync(abs)) broken.push(href);
    }
    expect(broken, `${file}: links that do not resolve to a file in design/prototype/`).toEqual([]);
  });
}

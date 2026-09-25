import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES, PROTOTYPE_FILE } from "../lib/common.mjs";
import { openSite, prototype } from "../lib/site.mjs";
import { collectStyle } from "../lib/style.mjs";

// Tokens only. Colours: every rendered colour is one the prototype's tokens.css defines or the prototype renders.
// Fonts (the prototype wins on visuals: Source Sans 3, IBM Plex Mono, Material Symbols Outlined): every family named
// anywhere in a rendered font stack, and every web font the page declares, must be one the prototype's font stacks or
// tokens.css --font-* stacks name. Any other font family fails.
const style = prototype().style;

function tokenFontFamilies() {
  const css = fs.readFileSync(path.join(path.dirname(PROTOTYPE_FILE), "tokens.css"), "utf8");
  const out = new Set<string>();
  for (const m of css.matchAll(/--font-[a-z-]+\s*:\s*([^;]+);/gi)) {
    for (const f of m[1].split(",")) {
      const name = f.trim().replace(/^["']|["']$/g, "").toLowerCase();
      if (name && !/^var\(/.test(name) && !/^[\d.]/.test(name)) out.add(name); // skip --font-weight-*, --font-size-* values
    }
  }
  return out;
}
const allowedFonts = new Set([...Object.keys(style.fonts), ...tokenFontFamilies()]);

for (const p of PAGES) {
  test(`${p.name}: colours and fonts come from the prototype's tokens`, async ({ page }, info) => {
    await openSite(page, p);
    const used = await collectStyle(page);
    const colors = Object.entries(used.colors).filter(([c]) => !(c in style.colors)).map(([c, el]) => `${c} (first on ${el})`);
    const fonts = Object.entries(used.fonts).filter(([f]) => !allowedFonts.has(f)).map(([f, el]) => `${f} (first on ${el})`);
    expect.soft(colors, `${info.project.name} ${p.name}: colours not in the prototype's tokens`).toEqual([]);
    expect.soft(fonts, `${info.project.name} ${p.name}: font families other than the prototype's (allowed: ${[...allowedFonts].join(", ")})`).toEqual([]);
  });
}

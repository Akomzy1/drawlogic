import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { openSite, prototype } from "../lib/site.mjs";
import { collectStyle } from "../lib/style.mjs";

// Tokens only: every colour and font family the site renders is one the prototype's tokens define or the prototype renders.
const style = prototype().style;

for (const p of PAGES) {
  test(`${p.name}: colours and fonts come from the prototype's tokens`, async ({ page }, info) => {
    await openSite(page, p);
    const used = await collectStyle(page);
    const colors = Object.entries(used.colors).filter(([c]) => !(c in style.colors)).map(([c, el]) => `${c} (first on ${el})`);
    const fonts = Object.entries(used.fonts).filter(([f]) => !(f in style.fonts)).map(([f, el]) => `${f} (first on ${el})`);
    expect.soft(colors, `${info.project.name} ${p.name}: colours not in the prototype's tokens`).toEqual([]);
    expect.soft(fonts, `${info.project.name} ${p.name}: font families not in the prototype's tokens (allowed: ${Object.keys(style.fonts).join(", ")})`).toEqual([]);
  });
}

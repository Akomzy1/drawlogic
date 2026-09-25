import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES, SITE_OUT } from "../lib/common.mjs";
import { readSections } from "../lib/dom.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Every prototype page exists on the site, with its sections in the prototype's order (header, main > section…, footer).
const proto = prototype();

for (const p of PAGES) {
  test(`${p.name}: sections in prototype order`, async ({ page }, info) => {
    await openSite(page, p);
    const expected = proto.pages[p.name].section_keys_by_viewport[info.project.name];
    const actual = (await readSections(page)).map((s) => s.key);
    expect(actual, `Section order on ${p.route} differs from the prototype page "${p.name}"`).toEqual(expected);
  });
}

// No pages beyond the prototype's: the build ships exactly the prototype's pages, plus the not-found page.
test("build output: no HTML pages beyond the prototype's", async ({}, info) => {
  test.skip(info.project.name !== "w1280", "Checked once.");
  expect(fs.existsSync(SITE_OUT), `No build output at ${SITE_OUT}`).toBe(true);
  const allowed = new Set(PAGES.map((p) => (p.route === "/" ? "index.html" : `${p.route.slice(1)}.html`)));
  const allowedDirs = new Set(PAGES.map((p) => (p.route === "/" ? "index.html" : `${p.route.slice(1)}/index.html`)));
  const extra: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== "_next") walk(f); continue; }
      if (!/\.html?$/i.test(e.name)) continue;
      const rel = path.relative(SITE_OUT, f).replace(/\\/g, "/");
      if (!allowed.has(rel) && !allowedDirs.has(rel) && !/^(404|_not-found)(\/index)?\.html$/.test(rel)) extra.push(rel);
    }
  };
  walk(SITE_OUT);
  expect(extra, "HTML pages in the build that are not pages of the prototype (remove them, or add the page to the prototype first)").toEqual([]);
});

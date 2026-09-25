import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { readSections } from "../lib/dom.mjs";
import { GOVERNED_LINE } from "../lib/rules.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Copy is part of the design: each section's text matches the prototype, line by line.
// Lines carrying PRD-governed values (prices, credits, seats) are left to prd.spec.ts.
const proto = prototype();

function difference(a: string[], b: string[]) {
  const counts = new Map<string, number>();
  for (const l of b) counts.set(l, (counts.get(l) ?? 0) + 1);
  const out: string[] = [];
  for (const l of a) {
    const n = counts.get(l) ?? 0;
    if (n > 0) counts.set(l, n - 1);
    else out.push(l);
  }
  return out;
}

for (const p of PAGES) {
  test(`${p.name}: copy matches the prototype`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Copy is compared once, at 1280.");
    await openSite(page, p);
    const actual = await readSections(page);
    for (const s of proto.pages[p.name].sections) {
      const site = actual.find((a) => a.key === s.key);
      if (!site) {
        expect.soft(site, `Section "${s.key}" is missing on ${p.route}, so none of its copy is present`).toBeTruthy();
        continue;
      }
      const want = s.lines.filter((l: string) => !GOVERNED_LINE.test(l));
      const have = site.lines.filter((l: string) => !GOVERNED_LINE.test(l));
      expect.soft(difference(want, have), `${p.name} — "${s.key}": prototype lines missing on the site`).toEqual([]);
      expect.soft(difference(have, want), `${p.name} — "${s.key}": site lines not in the prototype`).toEqual([]);
    }
  });
}

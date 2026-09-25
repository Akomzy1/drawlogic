import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { readSections } from "../lib/dom.mjs";
import { compare, observe } from "../lib/interact.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Interactive elements behave as the prototype's do: hero wall, site-feasibility options and boundary polygon,
// preview-video tile, currency toggle, Teach me first toggle, tabs and the signing gate. Each interaction's outcome was
// recorded from the prototype (fixture item.expect); the site must produce the same outcome, in full and reduced motion.
const proto = prototype();

for (const p of PAGES) {
  const items = proto.pages[p.name].interactive ?? [];
  if (!items.length) continue;
  for (const motion of ["full", "reduced"] as const) {
    test.describe(() => {
      test.use({ reducedMotion: motion === "full" ? "no-preference" : "reduce" });
      test(`${p.name}: interactive elements behave as the prototype's (${motion} motion)`, async ({ page }, info) => {
        test.setTimeout(300_000);
        await openSite(page, p);
        const sections = await readSections(page);
        for (const item of items) {
          const { observed, problems } = await observe(page, item, sections, motion);
          const all = [...problems, ...compare(item, observed, item.expect?.[motion])];
          expect.soft(all, `${info.project.name} ${p.name}: ${item.kind} in "${item.section}"`).toEqual([]);
        }
      });
    });
  }
}

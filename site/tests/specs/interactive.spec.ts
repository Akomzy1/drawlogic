import { expect, test } from "@playwright/test";
import path from "node:path";
import { FIXTURES_DIR, PAGES, readJSON } from "../lib/common.mjs";
import { readSections } from "../lib/dom.mjs";
import { compare, observe } from "../lib/interact.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Interactive elements behave as the prototype's do: hero wall, site-feasibility options and boundary polygon,
// preview-video tile, currency toggle, Teach me first toggle, tabs and the signing gate. Each interaction's outcome was
// recorded from the prototype (fixture item.expect); the site must produce the same outcome, in full and reduced motion.
const proto = prototype();
// Where a PRD rule or DECIDED decision replaces the export's behaviour, prd.spec.ts checks it instead (precedence).
const overrides = readJSON(path.join(FIXTURES_DIR, "prd-governed.json")).behaviour_overrides ?? [];
const overridden = (page: string, item: any) => overrides.find((o: any) => o.page === page && o.kind === item.kind && o.section === item.section);

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
          const o = overridden(p.name, item);
          if (o) info.annotations.push({ type: "behaviour override", description: `${item.kind} in "${item.section}": ${o.reason}` });
          const all = [...problems, ...(o ? [] : compare(item, observed, item.expect?.[motion]))];
          expect.soft(all, `${info.project.name} ${p.name}: ${item.kind} in "${item.section}"`).toEqual([]);
        }
      });
    });
  }
}

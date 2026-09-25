import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { openSite } from "../lib/site.mjs";

// WCAG 2.2 AA: zero axe violations on every page at every width.
for (const p of PAGES) {
  test(`${p.name}: WCAG 2.2 AA (axe)`, async ({ page }, info) => {
    await openSite(page, p);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = violations.map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`);
    expect(summary, `${info.project.name} ${p.name}: axe violations`).toEqual([]);
  });
}

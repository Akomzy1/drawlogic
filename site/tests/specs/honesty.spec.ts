import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { HONESTY } from "../lib/rules.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Honesty strips wherever the prototype shows them, as visible DOM text — not images, canvas, pseudo-content or aria-hidden.
const proto = prototype();

for (const p of PAGES) {
  test(`${p.name}: honesty strips are visible DOM text`, async ({ page }, info) => {
    await openSite(page, p);
    for (const id of proto.pages[p.name].honesty) {
      const rule = HONESTY.find((h) => h.id === id)!;
      const ok = await page.evaluate((src) => {
        const re = new RegExp(src, "i");
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        for (let n = walker.nextNode() as HTMLElement | null; n; n = walker.nextNode() as HTMLElement | null) {
          if (!re.test(n.innerText ?? "")) continue;
          if ([...n.children].some((c) => re.test((c as HTMLElement).innerText ?? ""))) continue;
          if (n.closest("[aria-hidden='true']") || !n.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
          return true;
        }
        return false;
      }, rule.re.source);
      expect.soft(ok, `${info.project.name} ${p.name}: "${rule.re.source}" is on the prototype page but not visible DOM text on the site`).toBe(true);
    }
  });
}

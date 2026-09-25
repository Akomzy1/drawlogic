import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
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

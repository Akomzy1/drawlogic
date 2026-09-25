import { expect, test } from "@playwright/test";
import path from "node:path";
import { FIXTURES_DIR, PAGES, readJSON } from "../lib/common.mjs";
import { checkCurrencies, readCurrencies } from "../lib/currency.mjs";
import { readSections, visibleText } from "../lib/dom.mjs";
import { prdPricing } from "../lib/prd.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// PRD-governed values (prices, credits, seats): checked against docs/PRD.md, not the prototype.
// Values tied to an OPEN decision are reported as annotations, never asserted.
const gov = readJSON(path.join(FIXTURES_DIR, "prd-governed.json"));
// Prices come from docs/PRD.md §10 itself (single source); the fixture adds only amounts the PRD does not state.
const prices = prdPricing();
const usdAllowed = new Set([...prices.usd, ...gov.usd_allowed.prd_silent.flatMap((s: any) => s.values)]);
const pricing = PAGES.find((p) => p.name === "Pricing")!;

for (const p of PAGES) {
  test(`${p.name}: prices and seats agree with the PRD`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Checked once, at 1280.");
    await openSite(page, p);
    const text = await visibleText(page);
    const usd = [...new Set(text.match(/\$\s?\d[\d,]*(\.\d+)?/g) ?? [])].map((v) => v.replace(/\s/g, ""));
    expect.soft(usd.filter((v) => !usdAllowed.has(v)), `${p.name}: US-dollar amounts not in PRD §10`).toEqual([]);
    for (const f of gov.forbidden_anywhere) {
      expect.soft(new RegExp(f.pattern, "i").test(text), `${p.name}: "${f.pattern}" contradicts PRD (${f.prd})`).toBe(false);
    }
    for (const d of gov.open_decisions) {
      const shown = d.pattern ? (text.match(new RegExp(d.pattern, "g")) ?? []) : d.values.filter((v: string) => text.includes(v));
      if (shown.length) info.annotations.push({ type: `Decision ${d.decision} OPEN`, description: `${d.what}: page shows ${[...new Set(shown)].join(", ")} — not asserted until decided` });
    }
    for (const s of gov.usd_allowed.prd_silent) {
      const shown = s.values.filter((v: string) => usd.includes(v));
      if (shown.length) info.annotations.push({ type: "PRD silent", description: `${s.what}: ${shown.join(", ")} — ${s.status}` });
    }
  });
}

test("Pricing: PRD §10 values are shown", async ({ page }, info) => {
  test.skip(info.project.name !== "w1280", "Checked once, at 1280.");
  await openSite(page, pricing);
  const text = await visibleText(page);
  for (const r of gov.required_on_pricing) {
    const present = r.text ? text.includes(r.text) : new RegExp(r.pattern, "i").test(text);
    expect.soft(present, `Pricing: ${r.what} (${r.text ?? r.pattern}) not shown — PRD ${r.prd}`).toBe(true);
  }
  const cells = await page.evaluate((wanted) => {
    const norm = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();
    return wanted.map((c: any) => {
      for (const table of document.querySelectorAll("table")) {
        const head = [...(table.querySelector("thead tr, tr")?.children ?? [])].map((c) => norm(c.textContent));
        const col = head.findIndex((h) => h === c.tier || h.startsWith(c.tier + " "));
        const row = [...table.querySelectorAll("tr")].find((tr) => norm(tr.children[0]?.textContent) === c.row);
        if (col >= 0 && row) return { ...c, found: norm(row.children[col]?.textContent) };
      }
      return { ...c, found: null };
    });
  }, gov.comparison_table.cells);
  for (const c of cells) {
    expect.soft(c.found, `Pricing table "${c.row}" / ${c.tier}: expected ${c.value} — PRD ${c.prd}`).toBe(c.value);
  }
});

// Currency toggles (every one the prototype has, including Lagos): choosing a currency switches every displayed price
// in the section to it; NGN amounts are PRD §10's Nigeria tier prices, USD amounts its plan prices.
const proto = prototype();
for (const p of PAGES) {
  const toggles = (proto.pages[p.name].interactive ?? []).filter((i: any) => i.kind === "currency");
  if (!toggles.length) continue;
  test(`${p.name}: currency toggles switch every price; NGN matches PRD §10`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Checked once, at 1280.");
    await openSite(page, p);
    const sections = await readSections(page);
    for (const item of toggles) {
      const readings = await readCurrencies(page, sections, item);
      if (!readings) { expect.soft(readings, `${p.name}: section "${item.section}" with the ${item.options.join("/")} toggle is missing`).toBeTruthy(); continue; }
      const { problems, notes } = checkCurrencies(readings, gov, prices);
      for (const n of notes) info.annotations.push({ type: "PRD silent", description: `${p.name} — "${item.section}": ${n}` });
      expect.soft(problems, `${p.name} — "${item.section}" (${item.options.join("/")} toggle)`).toEqual([]);
    }
  });
}

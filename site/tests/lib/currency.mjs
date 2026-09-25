// Currency toggles: choosing a currency must switch every displayed price in the section to that currency, and the
// amounts must be the governed ones (PRD §10 for USD, Decision 12 for NGN). Used by prd.spec.ts; runnable on the
// prototype to check the logic.

const SYMBOL = { GBP: "£", USD: "$", NGN: "₦", EUR: "€" };
const AMOUNT = /([£$₦€])\s?(\d[\d,]*(?:\.\d+)?)/g;

/** For one currency item (from the fixture inventory), choose each currency in turn and read every amount shown. */
export async function readCurrencies(page, sections, item) {
  const match = sections.find((s) => s.key === item.section);
  if (!match) return null;
  const sec = page.locator(`[data-fidelity-idx="${match.idx}"]`);
  const readings = {};
  for (const code of item.options) {
    const btn = sec.getByRole("button", { name: new RegExp(`\\b${code}\\b`) }).first();
    if (!(await btn.count())) { readings[code] = null; continue; }
    await btn.click();
    await page.waitForTimeout(300);
    const text = await sec.evaluate((e) => e.innerText.replace(/\s+/g, " "));
    readings[code] = [...text.matchAll(AMOUNT)].map((m) => `${m[1]}${m[2]}`);
  }
  return readings;
}

/** Problems with the readings: every price switches, counts match across currencies, amounts are governed. */
export function checkCurrencies(readings, gov) {
  const problems = [];
  const notes = [];
  const usdAllowed = new Set([...gov.usd_allowed.prd, ...gov.usd_allowed.prd_silent.flatMap((s) => s.values)]);
  const usdSilent = new Set(gov.usd_allowed.prd_silent.flatMap((s) => s.values));
  const ngnAllowed = new Set(Object.keys(gov.ngn.values));
  const ngnSilent = new Set(gov.ngn.prd_silent.flatMap((s) => s.values));
  const counts = new Set();
  for (const [code, amounts] of Object.entries(readings)) {
    if (!amounts) { problems.push(`no ${code} button`); continue; }
    if (!amounts.length) { problems.push(`with ${code} chosen, no prices are shown`); continue; }
    counts.add(amounts.length);
    const other = amounts.filter((a) => a[0] !== SYMBOL[code]);
    if (other.length) problems.push(`with ${code} chosen, ${other.length} price(s) stay in another currency: ${[...new Set(other)].join(", ")}`);
    const mine = amounts.filter((a) => a[0] === SYMBOL[code]);
    if (code === "NGN") {
      const bad = [...new Set(mine.filter((a) => !ngnAllowed.has(a) && !ngnSilent.has(a)))];
      if (bad.length) problems.push(`NGN amounts not in Decision 12: ${bad.join(", ")} (allowed: ${[...ngnAllowed].join(", ")})`);
      const silent = [...new Set(mine.filter((a) => ngnSilent.has(a)))];
      if (silent.length) notes.push(`NGN ${silent.join(", ")}: ${gov.ngn.prd_silent[0].status}`);
    }
    if (code === "USD") {
      const bad = [...new Set(mine.filter((a) => !usdAllowed.has(a)))];
      if (bad.length) problems.push(`USD amounts not in PRD §10: ${bad.join(", ")}`);
      const silent = [...new Set(mine.filter((a) => usdSilent.has(a)))];
      if (silent.length) notes.push(`USD ${silent.join(", ")}: ${gov.usd_allowed.prd_silent[0].status}`);
    }
  }
  if (counts.size > 1) problems.push(`a different number of prices shows in each currency (${Object.entries(readings).map(([c, a]) => `${c}: ${a?.length ?? 0}`).join(", ")}); every price must switch`);
  return { problems, notes };
}

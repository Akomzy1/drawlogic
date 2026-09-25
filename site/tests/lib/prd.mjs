// Prices read from docs/PRD.md §10 at run time, so the PRD is the single source for the pricing checks.
//   usd: every US-dollar amount in the Price column of the plan table ("$3k"-style ranges are not prices shown on the site)
//   ngn: every naira amount in the "Nigeria tier prices" table
import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "./common.mjs";

export const PRD_FILE = path.join(REPO_ROOT, "docs/PRD.md");

export function prdPricing() {
  const md = fs.readFileSync(PRD_FILE, "utf8").replace(/\r\n/g, "\n");
  const start = md.indexOf("## 10. Pricing and packaging");
  if (start < 0) throw new Error("docs/PRD.md has no '## 10. Pricing and packaging' section");
  const end = md.indexOf("\n## ", start + 4);
  const section = md.slice(start, end < 0 ? undefined : end);

  const usd = new Set();
  for (const row of section.split("\n").filter((l) => l.startsWith("| **"))) {
    const price = row.split("|")[2] ?? "";
    for (const m of price.matchAll(/\$(\d[\d,]*)(?![\d,]*\s*k)/g)) usd.add(`$${m[1]}`);
  }

  const at = section.indexOf("**Nigeria tier prices");
  if (at < 0) throw new Error("PRD §10 has no 'Nigeria tier prices' table");
  const ngn = new Map();
  let inTable = false;
  for (const line of section.slice(at).split("\n").slice(1)) {
    if (line.startsWith("|")) inTable = true;
    else if (inTable) break;
    else continue;
    const [, plan, price] = line.split("|").map((c) => c.trim());
    if (!price || /^-+$/.test(price) || plan === "Plan") continue;
    for (const m of price.matchAll(/₦\s?(\d[\d,]*)/g)) ngn.set(`₦${m[1]}`, plan);
  }
  if (!ngn.size) throw new Error("PRD §10 'Nigeria tier prices' table has no naira amounts");
  return { usd, ngn, source: "docs/PRD.md §10" };
}

// Examiner self-check: re-render prototype pages and compare with the cached baselines.
// Identical input must give identical section keys and a pixel difference well inside the 2% budget, or the visual
// test is not trustworthy. Measured noise: 0–0.31% (anti-aliasing of 1px translucent borders under parallel rendering);
// the check fails above a quarter of the budget.
// Usage: node scripts/self-check.mjs [page name …]   (defaults to Home and Pricing)
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { MAX_SECTION_DIFF, PAGES, PROTOTYPE_FILE, PROTOTYPE_URL, VIEWPORTS, baselineDir, prototypeFixtureFile, readJSON, sha256File } from "../lib/common.mjs";
import { readSections, settle, shootSection } from "../lib/dom.mjs";
import { compareImages } from "../lib/pixels.mjs";

const names = process.argv.slice(2).length ? process.argv.slice(2) : ["Home", "Pricing"];
const sha = sha256File(PROTOTYPE_FILE);
const fixture = readJSON(prototypeFixtureFile);
const browser = await chromium.launch();
let worst = 0;
let failed = false;
for (const name of names) {
  if (!PAGES.some((p) => p.name === name)) throw new Error(`Unknown page ${name}`);
  const ctx = await browser.newContext({ viewport: VIEWPORTS.w1280, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${PROTOTYPE_URL}#${encodeURIComponent(name)}`, { waitUntil: "commit", timeout: 120000 });
  await page.waitForSelector("main section.dl-section", { timeout: 180000 });
  await page.addStyleTag({ content: "#viewtoggle{display:none!important}" });
  await page.waitForTimeout(1000);
  for (const [vp, size] of Object.entries(VIEWPORTS)) {
    await page.setViewportSize(size);
    await page.waitForTimeout(500);
    await settle(page);
    const sections = await readSections(page);
    const keysOk = JSON.stringify(sections.map((s) => s.key)) === JSON.stringify(fixture.pages[name].section_keys_by_viewport[vp]);
    if (!keysOk) failed = true;
    const ratios = [];
    for (const s of sections) {
      const r = compareImages(fs.readFileSync(path.join(baselineDir(sha, vp, name), `${s.idx}.png`)), await shootSection(page, s.idx));
      ratios.push(r.ratio);
      worst = Math.max(worst, r.ratio);
    }
    console.log(`${name} ${vp}: keys ${keysOk ? "identical" : "DIFFER"}; max section diff ${(Math.max(...ratios) * 100).toFixed(3)}%`);
  }
  await ctx.close();
}
await browser.close();
console.log(`Worst section difference on identical input: ${(worst * 100).toFixed(3)}%`);
if (failed || worst > MAX_SECTION_DIFF / 4) { console.error("Self-check failed: the measurement is not stable enough to judge the site."); process.exit(1); }

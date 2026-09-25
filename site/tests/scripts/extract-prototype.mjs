// Renders design/prototype/marketing-site.html and records what the site is tested against:
//   fixtures/prototype.json  — per page: section keys (per viewport), section copy, honesty strips, roadmap tags, captions (committed, reviewable)
//   .cache/prototype/<sha>/  — per viewport, per page, one PNG per section (regenerated from the prototype, not committed)
// Usage: node scripts/extract-prototype.mjs [--baselines-only]
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES, PROTOTYPE_FILE, PROTOTYPE_URL, REPO_ROOT, VIEWPORTS, baselineDir, baselineRoot, prototypeFixtureFile, sha256File } from "../lib/common.mjs";
import { readSections, settle, shootSection } from "../lib/dom.mjs";
import { HONESTY, ILLUSTRATIVE, PREVIEW_LABEL } from "../lib/rules.mjs";

const baselinesOnly = process.argv.includes("--baselines-only");
const protoSha = sha256File(PROTOTYPE_FILE);
const CONCURRENCY = Number(process.env.EXTRACT_CONCURRENCY ?? 3);

async function openPrototypePage(browser, name) {
  const context = await browser.newContext({ viewport: VIEWPORTS.w1280, reducedMotion: "reduce" });
  const page = await context.newPage();
  // The prototype decodes a large bundle and compiles in-browser; allow for it. It never reaches network idle.
  await page.goto(`${PROTOTYPE_URL}#${encodeURIComponent(name)}`, { waitUntil: "commit", timeout: 120000 });
  await page.waitForSelector("main section.dl-section", { timeout: 180000 });
  // Prototype-only chrome: the preview-width toggle is not part of the design.
  await page.addStyleTag({ content: "#viewtoggle{display:none!important}" });
  await page.waitForTimeout(1000);
  return { context, page };
}

async function extractPage(browser, { name, route }) {
  const t0 = Date.now();
  const { context, page } = await openPrototypePage(browser, name);
  const result = { route, section_keys_by_viewport: {} };
  try {
    for (const [vp, size] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize(size);
      await page.waitForTimeout(500);
      await settle(page);
      const sections = await readSections(page);
      result.section_keys_by_viewport[vp] = sections.map((s) => s.key);
      if (vp === "w1280") result.sections = sections.map(({ key, lines }) => ({ key, lines }));
      const dir = baselineDir(protoSha, vp, name);
      fs.mkdirSync(dir, { recursive: true });
      for (const s of sections) fs.writeFileSync(path.join(dir, `${s.idx}.png`), await shootSection(page, s.idx));
    }
    await page.setViewportSize(VIEWPORTS.w1280);
    await settle(page);
    const text = await page.evaluate(() => document.body.innerText);
    result.honesty = HONESTY.filter((h) => h.re.test(text)).map((h) => h.id);
    result.captions = {
      illustrative: (text.match(new RegExp(ILLUSTRATIVE.source, "gi")) ?? []).length,
      preview_label: (text.match(new RegExp(PREVIEW_LABEL.source, "gi")) ?? []).length,
    };
    // Roadmap tags: each item the prototype marks as roadmap, with the item it tags. A bare "Roadmap" badge
    // is read together with its parent, so the entry names the discipline or jurisdiction it belongs to.
    result.roadmap = await page.evaluate(() => {
      const norm = (s) => s.replace(/\s+/g, " ").trim();
      const out = new Map();
      for (const el of document.querySelectorAll("body *")) {
        if (!el.checkVisibility?.() || el.closest("#viewtoggle")) continue;
        if (!/roadmap/i.test(el.innerText ?? "")) continue;
        if ([...el.children].some((c) => /roadmap/i.test(c.innerText ?? ""))) continue;
        let node = el;
        while (/^roadmap$/i.test(norm(node.innerText)) && node.parentElement) node = node.parentElement;
        const text = norm(node.innerText);
        if (text.length > 140) continue;
        // "Interior — roadmap" → Interior; "Electrical on roadmap — supply …" → Electrical; "Survey ROADMAP" → Survey.
        const item = norm(text.replace(/roadmap/gi, " ").replace(/\s[—–]\s?.*$|\s[—–]$/, "").replace(/\s+(is\s+)?on(\s+the)?\s*$/i, ""));
        if (item) out.set(text, { text, item });
      }
      return [...out.values()];
    });
  } finally {
    await context.close();
  }
  console.log(`  ${name}: ${result.sections.length} sections, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  return result;
}

const browser = await chromium.launch();
console.log(`Prototype ${path.relative(REPO_ROOT, PROTOTYPE_FILE)} sha256 ${protoSha}`);
const pages = {};
const queue = [...PAGES];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  for (let p = queue.shift(); p; p = queue.shift()) pages[p.name] = await extractPage(browser, p);
}));
await browser.close();

const ordered = Object.fromEntries(PAGES.map((p) => [p.name, pages[p.name]]));
const fixture = {
  note: "Generated from the prototype by scripts/extract-prototype.mjs. Do not edit by hand; re-run the script when the prototype changes and review the diff.",
  prototype_file: path.relative(REPO_ROOT, PROTOTYPE_FILE).replace(/\\/g, "/"),
  prototype_sha256: protoSha,
  pages: ordered,
};
if (baselinesOnly) {
  const committed = JSON.parse(fs.readFileSync(prototypeFixtureFile, "utf8"));
  if (JSON.stringify(committed.pages) !== JSON.stringify(fixture.pages)) {
    console.error("The prototype renders differently from fixtures/prototype.json. Re-run without --baselines-only and review the diff.");
    process.exit(1);
  }
} else {
  fs.writeFileSync(prototypeFixtureFile, JSON.stringify(fixture, null, 2) + "\n");
  console.log(`Wrote ${path.relative(process.cwd(), prototypeFixtureFile)}`);
}
fs.writeFileSync(path.join(baselineRoot(protoSha), "complete.json"), JSON.stringify({ at: new Date().toISOString() }));

import { chromium, expect, test } from "@playwright/test";
import lighthouse from "lighthouse";
import { PAGES } from "../lib/common.mjs";

// Lighthouse ≥ 90 on Home in every category (default mobile emulation and throttling).
// Until launch (SITE_LAUNCHED unset), crawlers stay blocked by decision, so the is-crawlable audit is excluded.
// Performance depends on the machine: it gates only on the CI runner; elsewhere the score is reported, not asserted.
const home = PAGES.find((p) => p.name === "Home")!;
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
const LAUNCHED = process.env.SITE_LAUNCHED === "true";
const ON_CI = !!process.env.CI;

test("Home: Lighthouse ≥ 90 in performance, accessibility, best practices and SEO", async ({ baseURL }, info) => {
  test.skip(info.project.name !== "w1280", "Run once.");
  test.setTimeout(300_000);
  if (!LAUNCHED) info.annotations.push({ type: "pre-launch", description: "is-crawlable excluded: crawlers stay blocked until launch (set SITE_LAUNCHED=true at launch)" });
  const port = 9300 + Math.floor(Math.random() * 500);
  const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
  try {
    // A run that fails to load (e.g. NO_FCP on a busy machine) produces zeros, not scores: retry once, then report the
    // failed run as a failed run.
    let lhr: any;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const result = await lighthouse(new URL(home.route, baseURL).href, {
        port,
        output: "json",
        logLevel: "error",
        onlyCategories: CATEGORIES,
        skipAudits: LAUNCHED ? [] : ["is-crawlable"],
      });
      lhr = result!.lhr;
      if (!lhr.runtimeError) break;
    }
    await info.attach("lighthouse-home.json", { body: JSON.stringify(lhr), contentType: "application/json" });
    expect(lhr.runtimeError, `Lighthouse could not measure Home (${lhr.runtimeError?.code}): ${lhr.runtimeError?.message} — a run failure, not a score`).toBeUndefined();
    for (const c of CATEGORIES) {
      const score = Math.round((lhr.categories[c]?.score ?? 0) * 100);
      if (c === "performance" && !ON_CI) {
        info.annotations.push({ type: "performance (local, not asserted)", description: `${score} — re-measured on the CI runner, which is the gate` });
        continue;
      }
      expect.soft(score, `Home Lighthouse ${c}: ${score}`).toBeGreaterThanOrEqual(90);
    }
  } finally {
    await browser.close();
  }
});

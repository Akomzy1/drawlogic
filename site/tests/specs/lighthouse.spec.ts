import { chromium, expect, test } from "@playwright/test";
import lighthouse from "lighthouse";
import { PAGES } from "../lib/common.mjs";

// Lighthouse ≥ 90 on Home in every category (default mobile emulation and throttling).
const home = PAGES.find((p) => p.name === "Home")!;
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

test("Home: Lighthouse ≥ 90 in performance, accessibility, best practices and SEO", async ({ baseURL }, info) => {
  test.skip(info.project.name !== "w1280", "Run once.");
  test.setTimeout(300_000);
  const port = 9300 + Math.floor(Math.random() * 500);
  const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
  try {
    const result = await lighthouse(new URL(home.route, baseURL).href, { port, output: "json", logLevel: "error", onlyCategories: CATEGORIES });
    const lhr = result!.lhr;
    await info.attach("lighthouse-home.json", { body: JSON.stringify(lhr), contentType: "application/json" });
    for (const c of CATEGORIES) {
      const score = Math.round((lhr.categories[c]?.score ?? 0) * 100);
      expect.soft(score, `Home Lighthouse ${c}: ${score}`).toBeGreaterThanOrEqual(90);
    }
  } finally {
    await browser.close();
  }
});

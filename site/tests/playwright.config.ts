import { defineConfig } from "@playwright/test";
import path from "node:path";
import { REPORTS_DIR, SITE_URL, VIEWPORTS } from "./lib/common.mjs";

// Site fidelity tests (docs/TESTING.md layer 5a). Examiner: Claude Code. The site's builder never edits this folder.
export default defineConfig({
  testDir: "./specs",
  // The prototype link check has its own CI job (prototype-links.yml): it tests design assets, not the site, so a
  // missing design file never blocks a site PR. Set PROTOTYPE_LINKS=1 to run it.
  testIgnore: process.env.PROTOTYPE_LINKS ? [] : ["**/prototype-links.spec.ts"],
  timeout: 240_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  globalSetup: "./lib/global-setup.mjs",
  outputDir: path.join(REPORTS_DIR, "test-results"),
  reporter: [["list"], ["html", { outputFolder: path.join(REPORTS_DIR, "html"), open: "never" }], ["json", { outputFile: path.join(REPORTS_DIR, "results.json") }]],
  use: { baseURL: SITE_URL, reducedMotion: "reduce" },
  projects: Object.entries(VIEWPORTS).map(([name, viewport]) => ({ name, use: { viewport } })),
  // NO_SITE=1 runs checks that need no site (e.g. prototype-links) without serving site/out.
  webServer: process.env.SITE_URL || process.env.NO_SITE
    ? undefined
    : { command: "node scripts/serve-static.mjs", url: SITE_URL, reuseExistingServer: true, timeout: 30_000 },
});

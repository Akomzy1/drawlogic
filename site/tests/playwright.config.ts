import { defineConfig } from "@playwright/test";
import path from "node:path";
import { REPORTS_DIR, SITE_URL, VIEWPORTS } from "./lib/common.mjs";

// Site fidelity tests (docs/TESTING.md layer 5a). Examiner: Claude Code. The site's builder never edits this folder.
export default defineConfig({
  testDir: "./specs",
  timeout: 240_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  globalSetup: "./lib/global-setup.mjs",
  outputDir: path.join(REPORTS_DIR, "test-results"),
  reporter: [["list"], ["html", { outputFolder: path.join(REPORTS_DIR, "html"), open: "never" }], ["json", { outputFile: path.join(REPORTS_DIR, "results.json") }]],
  use: { baseURL: SITE_URL, reducedMotion: "reduce" },
  projects: Object.entries(VIEWPORTS).map(([name, viewport]) => ({ name, use: { viewport } })),
  webServer: process.env.SITE_URL
    ? undefined
    : { command: "node scripts/serve-static.mjs", url: SITE_URL, reuseExistingServer: true, timeout: 30_000 },
});

// Before any test: the committed fixture must describe the current prototype, and the section baselines must exist.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PROTOTYPE_FILE, TESTS_DIR, baselineRoot, prototypeFixtureFile, readJSON, prototypeSha } from "./common.mjs";

export default function globalSetup() {
  if (!fs.existsSync(prototypeFixtureFile)) throw new Error("fixtures/prototype.json is missing. Run `npm run extract`.");
  const sha = prototypeSha();
  const fixture = readJSON(prototypeFixtureFile);
  if (fixture.prototype_sha256 !== sha) {
    throw new Error(`design/prototype/marketing-site.html changed (sha256 ${sha.slice(0, 12)}, fixture ${fixture.prototype_sha256.slice(0, 12)}). The examiner re-runs \`npm run extract\` and reviews the fixture diff; the builder does not.`);
  }
  if (!fs.existsSync(path.join(baselineRoot(sha), "complete.json"))) {
    console.log("Rendering prototype section baselines (first run for this prototype version)…");
    execFileSync(process.execPath, ["scripts/extract-prototype.mjs", "--baselines-only"], { cwd: TESTS_DIR, stdio: "inherit" });
  }
}

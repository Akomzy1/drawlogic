// Shared paths and settings for the site fidelity tests (TESTING.md layer 5a).
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const TESTS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const REPO_ROOT = path.resolve(TESTS_DIR, "../..");
// Test settings may be set in the repository's .env (see .env.example). Only these keys are read from it,
// and a value already in the environment wins.
const ENV_KEYS = ["REPORTS_DIR", "SITE_DIR", "SITE_OUT", "SITE_URL", "SITE_PORT", "SITE_LAUNCHED", "PROTOTYPE_FILE"];
const envFile = path.join(REPO_ROOT, ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && ENV_KEYS.includes(m[1]) && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

export const PROTOTYPE_FILE = path.resolve(process.env.PROTOTYPE_FILE ?? path.join(REPO_ROOT, "design/prototype/marketing-site.html"));
export const PROTOTYPE_URL = pathToFileURL(PROTOTYPE_FILE).href;
// The site under test. Defaults to this checkout's site/; point SITE_DIR at another worktree to examine its build.
export const SITE_DIR = path.resolve(process.env.SITE_DIR ?? path.join(REPO_ROOT, "site"));
export const SITE_OUT = path.resolve(process.env.SITE_OUT ?? path.join(SITE_DIR, "out"));
export const MANIFEST_FILE = path.join(SITE_DIR, "public/media/manifest.json");
export const SITE_PORT = Number(process.env.SITE_PORT ?? 4310);
export const SITE_URL = process.env.SITE_URL ?? `http://127.0.0.1:${SITE_PORT}`;
export const FIXTURES_DIR = path.join(TESTS_DIR, "fixtures");
export const CACHE_DIR = path.join(TESTS_DIR, ".cache");
// Test output and reports. Override with REPORTS_DIR to keep them off a synced folder (e.g. OneDrive).
export const REPORTS_DIR = path.resolve(process.env.REPORTS_DIR ?? path.join(TESTS_DIR, "reports"));

export const VIEWPORTS = {
  w375: { width: 375, height: 812 },
  w768: { width: 768, height: 1024 },
  w1280: { width: 1280, height: 900 },
};

// Per-section visual budget: at most 2% of pixels may differ.
export const MAX_SECTION_DIFF = 0.02;

export const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
export const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
export const sha256File = (file) => sha256(fs.readFileSync(file));
/** The prototype's identity, independent of line endings (a Windows checkout may convert them). */
export const prototypeSha = () => sha256(fs.readFileSync(PROTOTYPE_FILE, "utf8").replace(/\r\n/g, "\n"));

export const PAGES = readJSON(path.join(FIXTURES_DIR, "routes.json")).pages;
export const slug = (name) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const prototypeFixtureFile = path.join(FIXTURES_DIR, "prototype.json");
export const baselineRoot = (protoSha) => path.join(CACHE_DIR, "prototype", protoSha.slice(0, 12));
export const baselineDir = (protoSha, viewport, pageName) => path.join(baselineRoot(protoSha), viewport, slug(pageName));

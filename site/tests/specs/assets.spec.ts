import { expect, test } from "@playwright/test";
import { PAGES, sha256 } from "../lib/common.mjs";
import { findEntries, loadManifest } from "../lib/manifest.mjs";
import { collectMedia } from "../lib/media.mjs";
import { openSite } from "../lib/site.mjs";

// Only approved assets from site/public/media/manifest.json, referenced by the manifest path, with the manifest's hash.
const manifest = loadManifest();
// Media is checked in the default (full-motion) experience; the reduced-motion path has its own spec.
test.use({ reducedMotion: "no-preference" });

for (const p of PAGES) {
  test(`${p.name}: every image and video is an approved manifest asset with a matching hash`, async ({ page, request }, info) => {
    expect(manifest, "site/public/media/manifest.json is missing").toBeTruthy();
    await openSite(page, p);
    const media = await collectMedia(page);
    const origin = new URL(page.url()).origin;
    const seen = new Set<string>();
    for (const m of media) {
      if (seen.has(m.url)) continue;
      seen.add(m.url);
      const where = `${info.project.name} ${p.name}: <${m.tag}> ${m.kind} ${m.url.replace(origin, "")}`;
      if (m.url.startsWith("data:") || !m.url.startsWith(origin)) {
        expect.soft(false, `${where} — not served from the manifest (inline or third-party)`).toBe(true);
        continue;
      }
      const assetPath = new URL(m.url).pathname;
      const entries = findEntries(manifest, assetPath);
      if (!entries.length) {
        expect.soft(entries.length, `${where} — not listed in the manifest`).toBeGreaterThan(0);
        continue;
      }
      const res = await request.get(m.url);
      expect.soft(res.status(), `${where} — not served`).toBe(200);
      const hash = sha256(await res.body());
      expect.soft(entries.some((e) => e.hashes.some((h) => h.value === hash)), `${where} — manifest records no sha256 matching the served file (${hash.slice(0, 12)}…); entries: ${entries.map((e) => e.trail).join(", ")}`).toBe(true);
      expect.soft(entries.filter((e) => e.rejected).map((e) => `${e.trail} (${e.review.join(", ")})`), `${where} — marked rejected in the manifest`).toEqual([]);
    }
  });
}

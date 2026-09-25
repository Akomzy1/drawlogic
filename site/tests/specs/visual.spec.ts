import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { MAX_SECTION_DIFF, PAGES, PROTOTYPE_FILE, baselineDir, sha256File } from "../lib/common.mjs";
import { readSections, shootSection } from "../lib/dom.mjs";
import { compareImages } from "../lib/pixels.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Per-section visual regression against the prototype: ≤ 2% differing pixels, dynamic media masked, animations frozen.
const proto = prototype();
const protoSha = sha256File(PROTOTYPE_FILE);

for (const p of PAGES) {
  test(`${p.name}: each section matches the prototype within ${MAX_SECTION_DIFF * 100}%`, async ({ page }, info) => {
    await openSite(page, p);
    const vp = info.project.name;
    const expectedKeys: string[] = proto.pages[p.name].section_keys_by_viewport[vp];
    const actual = await readSections(page);
    const dir = baselineDir(protoSha, vp, p.name);
    for (const [i, key] of expectedKeys.entries()) {
      const match = actual.find((s) => s.key === key);
      if (!match) {
        expect.soft(match, `Section "${key}" is missing on ${p.route}`).toBeTruthy();
        continue;
      }
      const baseline = fs.readFileSync(path.join(dir, `${i}.png`));
      const shot = await shootSection(page, match.idx);
      const r = compareImages(baseline, shot);
      const label = `${vp} ${p.name} — ${key}`;
      if (r.ratio > MAX_SECTION_DIFF) {
        const base = `${i}-${key.replace(/[^a-z0-9]+/gi, "-").slice(0, 40)}`;
        await info.attach(`${base}-prototype.png`, { body: baseline, contentType: "image/png" });
        await info.attach(`${base}-site.png`, { body: shot, contentType: "image/png" });
        await info.attach(`${base}-diff.png`, { body: r.diffPng, contentType: "image/png" });
      }
      expect.soft(Number(r.ratio.toFixed(4)), `${label}: ${(r.ratio * 100).toFixed(1)}% of pixels differ (prototype ${r.expectedSize.join("×")}, site ${r.actualSize.join("×")})`).toBeLessThanOrEqual(MAX_SECTION_DIFF);
    }
  });
}

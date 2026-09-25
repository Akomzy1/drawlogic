import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { findEntries, loadManifest } from "../lib/manifest.mjs";
import { collectMedia } from "../lib/media.mjs";
import { ILLUSTRATIVE, PREVIEW_LABEL } from "../lib/rules.mjs";
import { openSite, prototype } from "../lib/site.mjs";

// Generated stills carry the "Illustrative" caption; generated video also carries the preview label; roadmap tags stay.
const proto = prototype();
const manifest = loadManifest();
const RASTER = /\.(png|jpe?g|webp|avif|gif|mp4|webm)(\?|$)/i;
// Media is checked in the default (full-motion) experience; the reduced-motion path has its own spec.
test.use({ reducedMotion: "no-preference" });

for (const p of PAGES) {
  test(`${p.name}: generated media is captioned and roadmap tags are present`, async ({ page }, info) => {
    await openSite(page, p);
    const media = (await collectMedia(page)).filter((m) => RASTER.test(m.url) && m.kind !== "background");
    for (const m of media) {
      const path = new URL(m.url).pathname;
      // Drawlogic drawings (source, line-art, provenance) are not generated imagery and need no caption.
      // Anything the manifest does not describe is treated as generated (fail closed).
      const entries = manifest ? findEntries(manifest, path) : [];
      if (entries.some((e) => e.isDrawing)) continue;
      const unlisted = entries.length ? "" : " (not in the manifest, so treated as generated; list it as a drawing if it is one)";
      const scopeText = await page.evaluate((idx) => {
        const el = document.querySelector(`[data-media-idx="${idx}"]`);
        const scope = el?.closest("figure, [data-caption-scope]") ?? el?.closest("section, header, footer, main");
        return scope ? (scope as HTMLElement).innerText : "";
      }, m.idx);
      const where = `${info.project.name} ${p.name}: ${m.tag} ${path}${unlisted}`;
      expect.soft(ILLUSTRATIVE.test(scopeText), `${where} — no "Illustrative — generated from a Drawlogic drawing" caption in its figure or section`).toBe(true);
      if (m.tag === "video") expect.soft(PREVIEW_LABEL.test(scopeText), `${where} — no "Generated preview — not a model render" label in its figure or section`).toBe(true);
    }
    // Live vs roadmap is PRD-governed and must survive: each roadmap item keeps a visible roadmap tag beside it.
    const tagged: boolean[] = await page.evaluate((items) => {
      const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
      const els = [...document.querySelectorAll("body *")] as HTMLElement[];
      return items.map((item: string) => els.some((el) => {
        const t = norm(el.innerText ?? "");
        return t.length <= item.length + 60 && t.includes(item.toLowerCase()) && t.includes("roadmap") && el.checkVisibility();
      }));
    }, proto.pages[p.name].roadmap.map((r: any) => r.item));
    proto.pages[p.name].roadmap.forEach((r: any, i: number) => {
      expect.soft(tagged[i], `${info.project.name} ${p.name}: "${r.item}" is marked roadmap in the prototype ("${r.text}") but has no roadmap tag on the site`).toBe(true);
    });
  });
}

import { expect, test } from "@playwright/test";
import { PAGES } from "../lib/common.mjs";
import { DYNAMIC_MEDIA, readSections } from "../lib/dom.mjs";
import { measureMotion } from "../lib/motion.mjs";
import { openSite, prototype } from "../lib/site.mjs";

const proto = prototype();

// Motion only where the prototype has it: in full motion, a section may move on its own or with scrolling only if the
// prototype's same section does.
for (const p of PAGES) {
  test.describe(() => {
    test.use({ reducedMotion: "no-preference" });
    test(`${p.name}: motion only where the prototype has it`, async ({ page }, info) => {
      test.skip(info.project.name !== "w1280", "Measured once, at 1280.");
      test.setTimeout(300_000);
      await openSite(page, p);
      const allowed = proto.pages[p.name].motion ?? {};
      for (const s of await readSections(page)) {
        const m = await measureMotion(page, s.idx);
        const a = allowed[s.key] ?? { time: false, scroll: false };
        const where = `${p.name} — "${s.key}"${s.key in allowed ? "" : " (not a prototype section)"}`;
        expect.soft(m.time && !a.time, `${where}: moves on its own; the prototype's section does not`).toBe(false);
        expect.soft(m.scroll && !a.scroll, `${where}: scroll-driven motion; the prototype's section has none`).toBe(false);
      }
    });
  });
}

// prefers-reduced-motion: nothing autoplays or animates, and all content is visible.
for (const p of PAGES) {
  test.describe(() => {
    test.use({ reducedMotion: "reduce" });
    test(`${p.name}: reduced-motion path`, async ({ page }, info) => {
      await openSite(page, p);
      const where = `${info.project.name} ${p.name}`;
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const stops = [0, 0.33, 0.66, 1].map((f) => Math.round(Math.max(0, height - 900) * f));
      for (const y of stops) {
        await page.evaluate((y) => scrollTo(0, y), y);
        await page.waitForTimeout(700);
        const state = await page.evaluate(() => ({
          playing: [...document.querySelectorAll("video")].filter((v) => !v.paused || v.autoplay).map((v) => v.currentSrc || v.getAttribute("src") || "video"),
          running: document.getAnimations().filter((a) => {
            if (a.playState !== "running") return false;
            const t = a.effect?.getComputedTiming();
            return (Number(t?.duration) || 0) > 1 || t?.iterations === Infinity;
          }).map((a) => (a as any).animationName ?? (a as any).transitionProperty ?? a.constructor.name),
          hidden: [...document.querySelectorAll("main *")].filter((el) => {
            if (!(el as HTMLElement).innerText?.trim() || el.children.length) return false;
            let o = 1;
            for (let n: Element | null = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
            return o < 0.99 || getComputedStyle(el).visibility === "hidden";
          }).map((el) => (el as HTMLElement).innerText.trim().slice(0, 60)),
        }));
        expect.soft(state.playing, `${where} @${y}px: video autoplays or plays under reduced motion`).toEqual([]);
        expect.soft(state.running, `${where} @${y}px: CSS/Web animations still running under reduced motion`).toEqual([]);
        expect.soft(state.hidden.slice(0, 10), `${where} @${y}px: content hidden (opacity/visibility) under reduced motion`).toEqual([]);
        // Script-driven motion (GSAP, Lenis, rAF) is invisible to getAnimations(): the viewport must be still.
        const a = await page.screenshot({ mask: [page.locator(DYNAMIC_MEDIA)], caret: "hide" });
        await page.waitForTimeout(800);
        const b = await page.screenshot({ mask: [page.locator(DYNAMIC_MEDIA)], caret: "hide" });
        expect.soft(a.equals(b), `${where} @${y}px: the page is still moving under reduced motion`).toBe(true);
      }
    });
  });
}

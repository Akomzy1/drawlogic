// Per-section motion inventory, measured identically on the prototype and the site (full-motion preference).
//   time:   the section changes on its own while the page is still (slideshows, loops, autoplaying video)
//   scroll: the section's content moves relative to the section as the page scrolls (parallax, pinning, scroll-driven sequences)
import { PNG } from "pngjs";
import { isolate, parkPointer, releasePointer } from "./dom.mjs";

const MOVING = 0.001; // share of pixels that must change to count as motion (anti-aliasing noise is far below this)

function changed(a, b) {
  const A = PNG.sync.read(a);
  const B = PNG.sync.read(b);
  if (A.width !== B.width || A.height !== B.height) return 1;
  let n = 0;
  for (let i = 0; i < A.data.length; i += 4) if (A.data[i] !== B.data[i] || A.data[i + 1] !== B.data[i + 1] || A.data[i + 2] !== B.data[i + 2]) n++;
  return n / (A.width * A.height);
}

/** Crop rows [top, top+height) of a viewport PNG. */
function rows(buf, top, height) {
  const src = PNG.sync.read(buf);
  const out = new PNG({ width: src.width, height });
  PNG.bitblt(src, out, 0, top, src.width, height, 0, 0);
  return PNG.sync.write(out);
}

export async function measureMotion(page, idx) {
  const vh = page.viewportSize().height;
  const { top, height } = await page.evaluate((idx) => {
    const r = document.querySelector(`[data-fidelity-idx="${idx}"]`).getBoundingClientRect();
    return { top: r.top + scrollY, height: r.height };
  }, idx);
  const restore = await isolate(page, idx);
  try {
    await parkPointer(page);
    // Time: hold still with the section at the top of the viewport and watch only the section's own rows, for longer
    // than one slideshow interval (the prototype's hero advances every 5 s).
    await page.evaluate((y) => scrollTo(0, y), Math.max(0, top));
    await page.waitForTimeout(600);
    const inView = Math.round(top - (await page.evaluate(() => scrollY)));
    const from = Math.max(0, inView);
    const h = Math.min(vh, inView + Math.round(height)) - from;
    let time = false;
    if (h > 0) {
      const t0 = rows(await page.screenshot({ caret: "hide" }), from, h);
      for (let t = 0; t < 11 && !time; t++) {
        await page.waitForTimeout(500);
        time = changed(t0, rows(await page.screenshot({ caret: "hide" }), from, h)) > MOVING;
      }
    }
    // Scroll: two positions 120px apart; after shifting, the overlapping band must be identical if nothing is scroll-driven.
    const shift = 120;
    const y1 = Math.max(0, top - vh / 2);
    await page.evaluate((y) => scrollTo(0, y), y1);
    await page.waitForTimeout(600);
    const s0 = await page.screenshot({ caret: "hide" });
    await page.evaluate((y) => scrollTo(0, y), y1 + shift);
    await page.waitForTimeout(600);
    const d = Math.round((await page.evaluate(() => scrollY)) - y1);
    const s1 = await page.screenshot({ caret: "hide" });
    let scroll = false;
    if (d > 0) {
      // Content at viewport row r in the first shot sits at row r - d in the second. Compare only rows the section occupies.
      const secTop0 = Math.round(top - y1);
      const secBottom0 = Math.round(top + height - y1);
      const start0 = Math.max(secTop0, d, 0);
      const end0 = Math.min(vh, secBottom0);
      const h = end0 - start0;
      if (h > 20) scroll = changed(rows(s0, start0, h), rows(s1, start0 - d, h)) > MOVING;
    }
    // Without the time component, a moving section would also look scroll-driven.
    return { time, scroll: scroll && !time };
  } finally {
    await releasePointer(page);
    await restore();
  }
}

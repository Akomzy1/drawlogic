// Page helpers used identically on the prototype and on the site, so both sides are measured the same way.

// Dynamic media is masked in screenshots (TESTING.md 5a): video, canvas, iframes, and anything the page marks as dynamic.
export const DYNAMIC_MEDIA = "video, canvas, iframe, [data-dynamic-media]";

/**
 * Wait for fonts and images, scroll the full page once so lazy content loads, then return to the top.
 * content-visibility:auto skips rendering off-screen content, which empties innerText there; it is forced visible
 * so text checks read what a reader sees on scrolling to it. Pixels on screen are unchanged.
 */
export async function settle(page) {
  await page.addStyleTag({ content: "*{content-visibility:visible!important}" });
  await page.evaluate(async () => {
    await document.fonts?.ready;
    const step = Math.max(200, Math.floor(innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo(0, 0);
    const pending = [...document.images].filter((img) => !img.complete);
    await Promise.race([
      Promise.all(pending.map((img) => new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); }))),
      new Promise((r) => setTimeout(r, 15000)),
    ]);
    await document.fonts?.ready;
  });
  await page.waitForTimeout(300);
}

/**
 * The page's sections in document order: the site header, each direct <section> child of <main>, and the site footer.
 * Each is keyed by its first h1–h3 (or its first line of text when it has no heading) and tagged with
 * data-fidelity-idx so it can be located for screenshots.
 */
export async function readSections(page) {
  return page.evaluate(() => {
    const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();
    const outside = (el) => !el.closest("main");
    const header = [...document.querySelectorAll("header")].find(outside);
    const footer = [...document.querySelectorAll("footer")].filter(outside).pop();
    const main = document.querySelector("main");
    const sections = main ? [...main.children].filter((el) => el.tagName === "SECTION") : [];
    const list = [];
    if (header) list.push({ el: header, key: "header" });
    for (const el of sections) {
      const h = el.querySelector("h1, h2, h3");
      const first = norm(el.innerText.split("\n").find((l) => norm(l)));
      list.push({ el, key: h ? norm(h.textContent) : `untitled: ${first.slice(0, 60)}` });
    }
    if (footer) list.push({ el: footer, key: "footer" });
    const seen = {};
    return list.map(({ el, key }, idx) => {
      seen[key] = (seen[key] ?? 0) + 1;
      const k = seen[key] > 1 ? `${key} #${seen[key]}` : key;
      el.setAttribute("data-fidelity-idx", String(idx));
      const lines = el.innerText.split("\n").map(norm).filter(Boolean);
      return { idx, key: k, lines };
    });
  });
}

/**
 * Hide fixed and sticky elements that are not part of the target, so a section screenshot shows only that section.
 * Applied identically to prototype and site. Returns a restore function.
 */
export async function isolate(page, idx) {
  await page.evaluate((idx) => {
    const target = document.querySelector(`[data-fidelity-idx="${idx}"]`);
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if ((pos === "fixed" || pos === "sticky") && !el.contains(target) && !target.contains(el)) {
        el.setAttribute("data-fidelity-hidden", el.style.visibility || "-");
        el.style.visibility = "hidden";
      }
    }
  }, idx);
  return () => page.evaluate(() => {
    for (const el of document.querySelectorAll("[data-fidelity-hidden]")) {
      const v = el.getAttribute("data-fidelity-hidden");
      el.style.visibility = v === "-" ? "" : v;
      el.removeAttribute("data-fidelity-hidden");
    }
  });
}

/** Screenshot one section (by data-fidelity-idx) with dynamic media masked and animations frozen. */
export async function shootSection(page, idx) {
  const restore = await isolate(page, idx);
  // No hover or focus state in the shot: clear focus and park the pointer on a transparent full-screen shield.
  await page.evaluate(() => {
    document.activeElement?.blur?.();
    const shield = document.createElement("div");
    shield.id = "fidelity-shield";
    shield.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:transparent;pointer-events:auto";
    document.body.appendChild(shield);
  });
  await page.mouse.move(2, 2);
  try {
    return await page.locator(`[data-fidelity-idx="${idx}"]`).screenshot({
      animations: "disabled",
      caret: "hide",
      scale: "css",
      mask: [page.locator(DYNAMIC_MEDIA)],
      maskColor: "#FF00FF",
      timeout: 60000,
    });
  } finally {
    await page.evaluate(() => document.getElementById("fidelity-shield")?.remove());
    await restore();
  }
}

/** Visible body text, as a reader sees it (excludes alt text, pseudo-content, canvas and hidden elements). */
export const visibleText = (page) => page.evaluate(() => document.body.innerText.replace(/[ \t]+/g, " "));

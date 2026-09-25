/** Every image and video the page renders: <img> (src, srcset), <picture>/<video> sources, video src and poster, CSS background images. */
export function collectMedia(page) {
  return page.evaluate(() => {
    const out = [];
    const add = (url, kind, el) => {
      if (!url) return;
      const idx = el.getAttribute("data-media-idx") ?? String(out.length);
      el.setAttribute("data-media-idx", idx);
      out.push({ url: new URL(url, location.href).href, kind, tag: el.tagName.toLowerCase(), idx });
    };
    const srcset = (s) => (s ?? "").split(",").map((c) => c.trim().split(/\s+/)[0]).filter(Boolean);
    for (const img of document.querySelectorAll("img")) {
      add(img.getAttribute("src"), "image", img);
      srcset(img.getAttribute("srcset")).forEach((u) => add(u, "image", img));
    }
    for (const s of document.querySelectorAll("picture source")) srcset(s.getAttribute("srcset")).forEach((u) => add(u, "image", s.closest("picture").querySelector("img") ?? s));
    for (const v of document.querySelectorAll("video")) {
      add(v.getAttribute("src"), "video", v);
      add(v.getAttribute("poster"), "poster", v);
      for (const s of v.querySelectorAll("source")) add(s.getAttribute("src"), "video", v);
    }
    for (const el of document.querySelectorAll("body *")) {
      const bg = getComputedStyle(el).backgroundImage;
      for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add(m[1], "background", el);
    }
    return out;
  });
}

// Rendered colours and fonts, measured identically on the prototype and the site (tokens-only check).

/** Every colour and font family the page actually renders, normalised. */
export function collectStyle(page) {
  return page.evaluate(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    const norm = (c) => {
      if (!c || c === "none" || c === "transparent" || /^url\(/.test(c)) return null;
      ctx.fillStyle = "#010203";
      ctx.fillStyle = c;
      const v = ctx.fillStyle;
      if (v === "#010203" && c.replace(/\s/g, "") !== "#010203") return null; // unparseable (e.g. currentcolor keyword leftovers)
      const m = /^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/.exec(v);
      if (m) return Number(m[4]) === 0 ? null : `rgba(${m[1]},${m[2]},${m[3]},${Number(m[4]).toFixed(2)})`;
      return v.toLowerCase();
    };
    // Every family named in a font stack, normalised. next/font renames families ("__Inter_a1b2c3") and adds metric
    // fallbacks ("__Inter_Fallback_a1b2c3"); both are reported as the family they stand for.
    const families = (f) => f.split(",").map((x) => {
      const name = x.trim().replace(/^["']|["']$/g, "");
      const next = /^__(.+?)(_Fallback)?_[0-9a-f]{6,}$/i.exec(name);
      return (next ? next[1].replace(/_/g, " ") : name).toLowerCase();
    }).filter(Boolean);
    const colors = new Map();
    const fonts = new Map();
    const note = (map, key, el) => { if (key && !map.has(key)) map.set(key, `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : ""}`); };
    for (const el of document.querySelectorAll("body *")) {
      if (el.closest("#viewtoggle, #fidelity-shield") || !el.checkVisibility?.({ opacityProperty: true, visibilityProperty: true })) continue;
      const cs = getComputedStyle(el);
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (hasText) { note(colors, norm(cs.color), el); for (const f of families(cs.fontFamily)) note(fonts, f, el); }
      note(colors, norm(cs.backgroundColor), el);
      for (const side of ["Top", "Right", "Bottom", "Left"]) {
        if (parseFloat(cs[`border${side}Width`]) > 0 && cs[`border${side}Style`] !== "none") note(colors, norm(cs[`border${side}Color`]), el);
      }
      if (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) note(colors, norm(cs.outlineColor), el);
      if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) { note(colors, norm(cs.fill), el); note(colors, norm(cs.stroke), el); }
    }
    // Web fonts the page declares (@font-face or FontFace), whether or not any text uses them.
    for (const face of document.fonts) for (const f of families(face.family)) if (!fonts.has(f)) fonts.set(f, `@font-face (${face.status})`);
    return { colors: Object.fromEntries(colors), fonts: Object.fromEntries(fonts) };
  });
}

/** Colours defined as custom properties in a token stylesheet, resolved and normalised. */
export async function resolveTokenColors(page, css) {
  await page.setContent(`<style>${css}</style><div id="probe"></div>`);
  return page.evaluate(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    const probe = document.getElementById("probe");
    const names = new Set();
    for (const sheet of document.styleSheets) {
      const walk = (rules) => { for (const r of rules) { if (r.style) for (const p of r.style) if (p.startsWith("--")) names.add(p); if (r.cssRules) walk(r.cssRules); } };
      walk(sheet.cssRules);
    }
    const out = new Set();
    const root = getComputedStyle(document.documentElement);
    for (const n of names) {
      const raw = root.getPropertyValue(n).trim();
      if (!raw || !CSS.supports("color", raw)) continue; // not a colour token
      probe.style.color = raw;
      const c = getComputedStyle(probe).color;
      ctx.fillStyle = "#010203";
      ctx.fillStyle = c;
      const v = ctx.fillStyle;
      const m = /^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/.exec(v);
      if (m) { if (Number(m[4]) > 0) out.add(`rgba(${m[1]},${m[2]},${m[3]},${Number(m[4]).toFixed(2)})`); }
      else if (v !== "#010203" || c === "rgb(1, 2, 3)") out.add(v.toLowerCase());
    }
    return [...out];
  });
}

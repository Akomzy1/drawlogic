// Interactive elements named by the fidelity skill (hero wall, site-feasibility options and boundary polygon,
// preview-video tile, currency toggle, Teach me first toggle) plus the prototype's tabs and signing gate.
//
// The behaviour is recorded from the prototype, not assumed: extraction runs observe() on the prototype and stores what
// each interaction does (item.expect.full / item.expect.reduced). The site test runs observe() on the site and compare()
// requires the same outcome. A few requirements are absolute (preview label, boundary source and imagery date, a visible
// disabled gate); observe() reports them as problems, and extraction refuses to write a fixture the prototype fails.
import { parkPointer, releasePointer } from "./dom.mjs";
import { PREVIEW_LABEL } from "./rules.mjs";

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sectionText = (sec) => sec.evaluate((e) => e.innerText.replace(/\s+/g, " "));

/** Interactive elements per section, keyed by section key. Call after readSections(). */
export function inventory(page, sections) {
  return page.evaluate((secs) => {
    const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();
    const label = (el) => norm(el.getAttribute("aria-label") || el.innerText);
    const items = [];
    const mainIdx = secs.filter((s) => s.key !== "header" && s.key !== "footer").map((s) => s.idx);
    for (const { idx, key } of secs) {
      const sec = document.querySelector(`[data-fidelity-idx="${idx}"]`);
      if (!sec || key === "header" || key === "footer") continue;
      const groups = new Map();
      for (const b of sec.querySelectorAll("button[aria-pressed]")) {
        const g = groups.get(b.parentElement) ?? [];
        g.push(b);
        groups.set(b.parentElement, g);
      }
      for (const btns of groups.values()) {
        const names = btns.map(label);
        const codes = names.map((n) => (/\b(GBP|USD|NGN|EUR)\b/.exec(n) ?? [])[1]);
        if (codes.every(Boolean)) items.push({ kind: "currency", section: key, options: codes });
        else items.push({ kind: "options", section: key, options: names });
      }
      for (const sw of sec.querySelectorAll("[role=switch]")) items.push({ kind: "switch", section: key, name: label(sw).replace(/\s+(on|off)$/i, "") });
      for (const tl of sec.querySelectorAll("[role=tablist]")) items.push({ kind: "tabs", section: key, options: [...tl.querySelectorAll("[role=tab]")].map(label) });
      if (sec.querySelector("video")) items.push({ kind: "video-tile", section: key });
      if (sec.querySelector("svg polygon") && /boundary/i.test(sec.innerText)) items.push({ kind: "boundary", section: key });
      if (idx === mainIdx[0] && sec.querySelectorAll("img").length >= 3) items.push({ kind: "hero-wall", section: key });
      const gate = [...sec.querySelectorAll("button")].find((b) => b.disabled || b.getAttribute("aria-disabled") === "true");
      if (gate && sec.querySelector("input[type=checkbox], [role=checkbox]")) items.push({ kind: "gate", section: key, button: label(gate).replace(/^draw\s*/, "") });
    }
    return items;
  }, sections.map(({ idx, key }) => ({ idx, key })));
}

async function states(sec, role, attr, names, byCode) {
  const out = {};
  for (const n of names) {
    const el = byCode ? sec.getByRole(role, { name: new RegExp(`\\b${n}\\b`) }).first() : sec.getByRole(role, { name: n, exact: true }).first();
    out[n] = (await el.count()) ? ((await el.getAttribute(attr)) ?? "none") : "missing";
  }
  return out;
}

/**
 * Exercise one item and record what happens. Returns { observed, problems } where problems are absolute requirements
 * (they must hold on the prototype too). motion: "full" or "reduced".
 */
export async function observe(page, item, sections, motion = "full") {
  const match = sections.find((s) => s.key === item.section);
  if (!match) return { observed: null, problems: [`section "${item.section}" is missing, so its ${item.kind} cannot be checked`] };
  const sec = page.locator(`[data-fidelity-idx="${match.idx}"]`);
  const problems = [];
  const observed = {};

  if (item.kind === "currency" || item.kind === "options" || item.kind === "tabs") {
    const byCode = item.kind === "currency";
    const role = item.kind === "tabs" ? "tab" : "button";
    const attr = item.kind === "tabs" ? "aria-selected" : "aria-pressed";
    observed.initial = await states(sec, role, attr, item.options, byCode);
    observed.steps = [];
    for (const name of item.options) {
      const el = byCode ? sec.getByRole(role, { name: new RegExp(`\\b${name}\\b`) }).first() : sec.getByRole(role, { name, exact: true }).first();
      if (!(await el.count())) { observed.steps.push({ choose: name, missing: true }); continue; }
      const before = await sectionText(sec);
      await el.click();
      await page.waitForTimeout(300);
      const after = await sectionText(sec);
      const step = { choose: name, states: await states(sec, role, attr, item.options, byCode), changed: after !== before };
      if (byCode) step.symbols = [...new Set([...after.matchAll(/([£$₦€])\s?\d/g)].map((m) => m[1]))].sort();
      observed.steps.push(step);
    }
  }

  if (item.kind === "switch") {
    const sw = sec.getByRole("switch", { name: new RegExp(esc(item.name), "i") }).first();
    if (!(await sw.count())) observed.missing = true;
    else {
      observed.initial = await sw.getAttribute("aria-checked");
      const t0 = await sectionText(sec);
      await sw.click();
      await page.waitForTimeout(300);
      observed.after = await sw.getAttribute("aria-checked");
      observed.changed = (await sectionText(sec)) !== t0;
      await sw.click();
    }
  }

  if (item.kind === "video-tile") {
    const video = sec.locator("video").first();
    await page.waitForTimeout(1500);
    const s = await video.evaluate((v) => ({ paused: v.paused, autoplay: v.autoplay }));
    if (!s.paused || s.autoplay) problems.push(`plays on its own (${motion} motion); the preview plays only when asked`);
    const play = sec.getByRole("button", { name: /play/i }).first();
    if (!(await play.count())) problems.push("no play control");
    else {
      await play.click();
      await page.waitForTimeout(800);
      if (await video.evaluate((v) => v.paused)) problems.push("the play control does not start the clip");
    }
    const text = await sectionText(sec);
    if (!PREVIEW_LABEL.test(text)) problems.push('no "Generated preview — not a model render" label');
    if (/fidelity[^.]{0,24}\d/i.test(text)) problems.push("shows a fidelity score; preview video carries none");
  }

  if (item.kind === "boundary") {
    if (!(await sec.locator("svg polygon, svg path").count())) problems.push("no vector boundary (svg polygon or path)");
    const text = await sectionText(sec);
    if (!/\b(traced|survey)\b/i.test(text)) problems.push("boundary source (traced or survey) not shown as text");
    if (!/imagery[^.]{0,30}\d{4}/i.test(text)) problems.push("imagery date not shown as text");
  }

  if (item.kind === "hero-wall") {
    const shot = () => sec.screenshot({ caret: "hide" });
    await parkPointer(page); // a hovered slideshow pauses
    const a = await shot();
    let moved = false;
    const tries = motion === "full" ? 6 : 3;
    for (let t = 0; t < tries && !moved; t++) { await page.waitForTimeout(2000); moved = !a.equals(await shot()); }
    await releasePointer(page);
    observed.advances = moved;
  }

  if (item.kind === "gate") {
    const btn = sec.locator("button:disabled, button[aria-disabled=true]").first();
    if (!(await btn.count()) || !(await btn.isVisible())) problems.push(`"${item.button}" is not shown disabled (the gate is visible and disabled until complete)`);
  }
  return { observed, problems };
}

/** Differences between what the site did and what the prototype did. */
export function compare(item, site, proto) {
  if (!site || !proto) return [];
  const out = [];
  const fmt = (o) => Object.entries(o).map(([k, v]) => `${k}=${v}`).join(", ");
  if (site.missing) return [`no ${item.kind === "switch" ? `switch named "${item.name}"` : item.kind}`];
  if ("initial" in proto && JSON.stringify(site.initial) !== JSON.stringify(proto.initial)) out.push(`starts ${typeof site.initial === "object" ? fmt(site.initial) : site.initial}; prototype starts ${typeof proto.initial === "object" ? fmt(proto.initial) : proto.initial}`);
  if (proto.steps) {
    for (const p of proto.steps) {
      const s = site.steps?.find((x) => x.choose === p.choose);
      if (!s || s.missing) { out.push(`no control for "${p.choose}"`); continue; }
      if (JSON.stringify(s.states) !== JSON.stringify(p.states)) out.push(`after choosing "${p.choose}": ${fmt(s.states)}; prototype: ${fmt(p.states)}`);
      if (p.changed && !s.changed) out.push(`choosing "${p.choose}" does not change what the section shows; in the prototype it does`);
      if (p.symbols && JSON.stringify(s.symbols) !== JSON.stringify(p.symbols)) out.push(`after choosing "${p.choose}": prices in ${s.symbols.join(" ") || "no currency"}; prototype: ${p.symbols.join(" ")}`);
    }
  }
  if (item.kind === "switch") {
    if (site.after !== proto.after) out.push(`after switching: aria-checked=${site.after}; prototype: ${proto.after}`);
    if (proto.changed && !site.changed) out.push("switching does not change what the section shows; in the prototype it does");
  }
  if (item.kind === "hero-wall" && site.advances !== proto.advances) out.push(site.advances ? "moves on its own; the prototype's hero is still here" : "does not advance on its own; the prototype's does");
  return out;
}

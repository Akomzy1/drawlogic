import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES, SITE_OUT } from "../lib/common.mjs";
import { findBanned, loadBanned } from "../lib/rules.mjs";
import { openSite } from "../lib/site.mjs";

// Banned words (contracts/copy.json → banned): none in rendered text, attributes, or anything in the build output.
const banned = loadBanned();

for (const p of PAGES) {
  test(`${p.name}: no banned words in rendered text or attributes`, async ({ page }, info) => {
    test.skip(info.project.name !== "w1280", "Checked once, at 1280.");
    info.annotations.push({ type: "banned-words source", description: banned.source });
    await openSite(page, p);
    const text = await page.evaluate(() => [
      document.title,
      document.body.innerText,
      ...[...document.querySelectorAll("[alt],[title],[aria-label],[placeholder],[aria-description]")].flatMap((el) => ["alt", "title", "aria-label", "placeholder", "aria-description"].map((a) => el.getAttribute(a) ?? "")),
      ...[...document.querySelectorAll("meta[content]")].map((m) => m.getAttribute("content") ?? ""),
    ].join("\n"));
    expect(findBanned(text, banned), `${p.name}: banned words (${banned.source})`).toEqual([]);
  });
}

test("build output: no banned words in any shipped text file", async ({}, info) => {
  test.skip(info.project.name !== "w1280", "Checked once.");
  info.annotations.push({ type: "banned-words source", description: banned.source });
  expect(fs.existsSync(SITE_OUT), `No build output at ${SITE_OUT}`).toBe(true);
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (/\.(html|txt|js|json|css|svg|xml|webmanifest)$/i.test(e.name)) {
        for (const h of findBanned(fs.readFileSync(f, "utf8"), banned)) hits.push(`${path.relative(SITE_OUT, f)}: ${h.word} — …${h.context}…`);
      }
    }
  };
  walk(SITE_OUT);
  expect(hits).toEqual([]);
});

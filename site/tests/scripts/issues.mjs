// Turns Playwright JSON results into one issue per check for the site's builder: issues.md and issues.json in REPORTS_DIR.
// Usage: node scripts/issues.mjs [results.json …]   (default: REPORTS_DIR/results.json). With several files, a test's
// result in a later file replaces its result in an earlier one, so a partial re-run can be layered over a full run.
import fs from "node:fs";
import path from "node:path";
import { REPORTS_DIR } from "../lib/common.mjs";

const files = process.argv.slice(2).length ? process.argv.slice(2) : [path.join(REPORTS_DIR, "results.json")];
const strip = (s) => (s ?? "").replace(/\u001b\[[0-9;]*m/g, "");

const AREAS = {
  structure: "Pages missing or sections out of prototype order",
  visual: "Sections differ visually from the prototype (> 2% pixels)",
  copy: "Copy differs from the prototype",
  prd: "Prices, seats or credits disagree with PRD §10",
  assets: "Media not approved in the manifest, or hash not recorded",
  labels: "Generated media without its caption or preview label; roadmap tags missing",
  honesty: "Honesty strips missing or not visible DOM text",
  motion: "Reduced-motion path incomplete",
  banned: "Banned words",
  a11y: "WCAG 2.2 AA violations (axe)",
  lighthouse: "Lighthouse below 90 on Home",
};

const latest = new Map(); // area|title|project → { area, title, project, result, annotations }
const walk = (suite, file) => {
  for (const s of suite.suites ?? []) walk(s, s.file ?? file);
  for (const spec of suite.specs ?? []) {
    const area = path.basename((spec.file ?? file ?? "").replace(/\\/g, "/"), ".spec.ts");
    for (const t of spec.tests) {
      const r = t.results.at(-1);
      if (r) latest.set(`${area}|${spec.title}|${t.projectName}`, { area, title: spec.title, project: t.projectName, result: r, annotations: t.annotations ?? [] });
    }
  }
};
for (const f of files) for (const s of JSON.parse(fs.readFileSync(f, "utf8")).suites) walk(s, s.file);

const byArea = {};
const notes = [];
for (const { area, title, project, result: r, annotations } of latest.values()) {
  for (const a of annotations) if (/Decision|PRD silent|source/.test(a.type)) notes.push(`- ${title} (${project}) — **${a.type}**: ${a.description}`);
  if (r.status === "passed" || r.status === "skipped") continue;
  const messages = (r.errors ?? []).map((e) => strip(e.message).split("\n").filter((l) => l.trim() && !/^\s+at /.test(l) && !/^\s*\d+ \|/.test(l) && !/^\s*>\s*\d+ \|/.test(l) && !/^\s*\|\s*\^/.test(l)).slice(0, 8).join("\n"));
  (byArea[area] ??= []).push({ title, project, status: r.status, messages });
}

const issues = Object.entries(byArea).map(([area, fails]) => {
  const pages = [...new Set(fails.map((f) => f.title.split(":")[0]))];
  const body = [
    `**Check:** \`site/tests/specs/${area}.spec.ts\` (TESTING.md layer 5a). Spec: \`design/prototype/marketing-site.html\`; PRD wins on content and rules (\`skills/drawlogic-prototype-fidelity/SKILL.md\`).`,
    `**Failing:** ${fails.length} test(s) across ${pages.length} page(s): ${pages.join(", ")}.`,
    "",
    ...fails.map((f) => `### ${f.title} — ${f.project} (${f.status})\n\n\`\`\`\n${f.messages.join("\n---\n").slice(0, 3000)}\n\`\`\``),
    "",
    "Fix in `site/` without editing `site/tests/`. If a test is wrong, reply here citing the prototype or PRD clause.",
  ].join("\n");
  return { area, title: `site fidelity: ${AREAS[area] ?? area}`, body, count: fails.length, pages };
});

fs.writeFileSync(path.join(REPORTS_DIR, "issues.json"), JSON.stringify(issues, null, 2));
const md = [
  `# Site fidelity failures — ${new Date().toISOString().slice(0, 10)}`,
  "",
  `${issues.reduce((n, i) => n + i.count, 0)} failing tests in ${issues.length} areas.`,
  "",
  ...issues.map((i) => `## ${i.title}\n\n${i.body}\n`),
  notes.length ? `## Reported, not asserted\n\n${[...new Set(notes)].join("\n")}\n` : "",
].join("\n");
fs.writeFileSync(path.join(REPORTS_DIR, "issues.md"), md);
console.log(issues.map((i) => `${String(i.count).padStart(4)}  ${i.title}`).join("\n") || "No failures.");

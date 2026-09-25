// Turns Playwright JSON results into issues for the site's builder: one issue per page, Home first, then the prototype's
// navigation order (fixtures/routes.json), then site-wide checks. Writes issues.md and issues.json in REPORTS_DIR.
// Usage: node scripts/issues.mjs [results.json …]   (default: REPORTS_DIR/results.json). With several files, a test's
// result in a later file replaces its result in an earlier one, so a partial re-run can be layered over a full run.
import fs from "node:fs";
import path from "node:path";
import { PAGES, REPORTS_DIR } from "../lib/common.mjs";

const files = process.argv.slice(2).length ? process.argv.slice(2) : [path.join(REPORTS_DIR, "results.json")];
const strip = (s) => (s ?? "").replace(/\u001b\[[0-9;]*m/g, "");
const FENCE = "```";

const AREAS = {
  structure: "Page missing or sections out of prototype order",
  visual: "Sections differ visually from the prototype (> 2% pixels)",
  copy: "Copy differs from the prototype",
  prd: "Prices, seats or credits disagree with PRD §10",
  assets: "Media not approved in the manifest, or hash not recorded",
  labels: "Generated media without its caption or preview label; roadmap tags missing",
  honesty: "Honesty strips missing or not visible DOM text",
  motion: "Motion: only where the prototype has it; reduced-motion path",
  tokens: "Colours or fonts outside the prototype's tokens",
  content: "Copy not served from site/content/*.json",
  interactive: "Interactive elements do not behave as the prototype's",
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

const noise = (l) => !l.trim() || /^\s+at /.test(l) || /^\s*>?\s*\d+ \|/.test(l) || /^\s*\|\s*\^/.test(l);
const fails = [];
const notes = [];
for (const { area, title, project, result: r, annotations } of latest.values()) {
  for (const a of annotations) if (/Decision|PRD silent|source|pre-launch|performance/.test(a.type)) notes.push(`- ${title} (${project}) — **${a.type}**: ${a.description}`);
  if (r.status === "passed" || r.status === "skipped") continue;
  const messages = (r.errors ?? []).map((e) => strip(e.message).split("\n").filter((l) => !noise(l)).slice(0, 8).join("\n"));
  fails.push({ area, title, project, status: r.status, messages });
}

// One issue per page: a test title starts with its page name ("Home: …"); anything else is site-wide.
const order = [...PAGES.map((p) => p.name), "Site-wide"];
const pageOf = (title) => PAGES.find((p) => title.startsWith(`${p.name}:`))?.name ?? "Site-wide";
const issues = order.map((page) => {
  const mine = fails.filter((f) => pageOf(f.title) === page);
  if (!mine.length) return null;
  const route = PAGES.find((p) => p.name === page)?.route;
  const missing = mine.some((f) => f.messages.some((m) => /page is missing/.test(m)));
  const areas = [...new Set(mine.map((f) => f.area))].sort((a, b) => Object.keys(AREAS).indexOf(a) - Object.keys(AREAS).indexOf(b));
  const lines = [
    `**Page:** ${page}${route ? ` (\`${route}\`)` : ""}. Spec: \`design/prototype/marketing-site.html\`; PRD wins on content and rules (\`skills/drawlogic-prototype-fidelity/SKILL.md\`).`,
    missing ? "**The page does not exist.** Every check on it fails until it is built." : null,
    `**Failing checks:** ${areas.map((a) => AREAS[a] ?? a).join("; ")} (${mine.length} test(s)).`,
    "",
  ];
  for (const a of areas) {
    lines.push(`### ${AREAS[a] ?? a} — \`site/tests/specs/${a}.spec.ts\``, "");
    for (const f of mine.filter((x) => x.area === a)) lines.push(`**${f.project}** (${f.status})`, "", FENCE, f.messages.join("\n---\n").slice(0, 3000), FENCE, "");
  }
  lines.push("Fix in `site/` without editing `site/tests/`. If a test is wrong, reply citing the prototype or PRD clause.");
  return { page, route, title: `site fidelity: ${page}${missing ? " — page missing" : ""}`, body: lines.filter((l) => l !== null).join("\n"), count: mine.length, areas };
}).filter(Boolean);

fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.writeFileSync(path.join(REPORTS_DIR, "issues.json"), JSON.stringify(issues, null, 2));
const md = [
  `# Site fidelity failures — ${new Date().toISOString().slice(0, 10)}`,
  "",
  `${fails.length} failing tests across ${issues.length} issues: Home first, then the prototype's navigation order.`,
  "",
  ...issues.map((i) => `## ${i.title}\n\n${i.body}\n`),
  notes.length ? `## Reported, not asserted\n\n${[...new Set(notes)].join("\n")}\n` : "",
].join("\n");
fs.writeFileSync(path.join(REPORTS_DIR, "issues.md"), md);
console.log(issues.map((i) => `${String(i.count).padStart(4)}  ${i.title}`).join("\n") || "No failures.");

// Prompt 1 gate: design/prototype/ holds every file the fidelity skill lists. The list is read from the skill itself,
// so adding a screen to the skill adds it to this check. Exit 1 with the missing files named.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SKILL = path.join(ROOT, "skills/drawlogic-prototype-fidelity/SKILL.md");
const PROTOTYPE = path.join(ROOT, "design/prototype");

const skill = fs.readFileSync(SKILL, "utf8");
const listed = new Set();
// Screen table rows: | `file` | … or | `a`, `b` | …
for (const line of skill.split("\n").filter((l) => l.startsWith("| `"))) {
  const cell = line.split("|")[1];
  for (const m of cell.matchAll(/`([^`]+\.(?:html|css))`/g)) listed.add(m[1]);
}
// The marketing site's source of truth, named in the skill's site section.
for (const m of skill.matchAll(/design\/prototype\/([\w .-]+\.html)/g)) listed.add(m[1]);

if (listed.size < 20) {
  console.error(`Read only ${listed.size} files from the fidelity skill; the table format may have changed.`);
  process.exit(1);
}
const missing = [...listed].filter((f) => !fs.existsSync(path.join(PROTOTYPE, f))).sort();
if (missing.length) {
  console.error(`design/prototype/ is missing ${missing.length} file(s) the fidelity skill lists; app/ work stops until they are added:\n` + missing.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log(`design/prototype/ holds all ${listed.size} files the fidelity skill lists.`);

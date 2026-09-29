import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "./common.mjs";

// Honesty strips (fidelity skill, "The marketing site"): must be real DOM text wherever the prototype shows them.
export const HONESTY = [
  { id: "liability", re: /not a statement of legal compliance/i },
  { id: "training", re: /never used for training/i },
  { id: "preview-label", re: /Generated preview — not a model render/i },
  { id: "concept-watermark", re: /concept — not for construction/i },
  { id: "illustrative", re: /Illustrative — generated from/i },
  { id: "unsigned", re: /UNSIGNED — professional verification required/i },
];

// The prototype writes "from Drawlogic drawings"; the site's manifest writes "from a Drawlogic drawing". Either is the label.
export const ILLUSTRATIVE = /Illustrative — generated from (a )?Drawlogic drawings?/i;
export const PREVIEW_LABEL = /Generated preview — not a model render/i;

// Lines that carry PRD-governed values (prices, credits, seats). The copy diff leaves these to the PRD checks.
export const GOVERNED_LINE = /[£$₦€]\s?\d|\bcredits?\b|\bseats?\b|\/mo\b|\/user\b|\bper month\b/i;

/**
 * Banned words. contracts/copy.json → banned is the source of truth. Until Prompt 0 drafts it, the list in
 * skills/drawlogic-trust-rules/SKILL.md §8 is used; the result says which source applied.
 * "approved" is banned only as a compliance claim, so only claim-shaped phrases are matched.
 *
 * Scopes (examiner's reading of trust-rules §8, 29 Sept 2026). The site applies every banned_scoped list:
 * - outside_studio_output: the site is never Studio (ray-traced) output, so flythrough/walkthrough/cinematic are banned.
 * - render_and_preview_output: the site shows render stills and preview clips and describes them; a colour-accuracy
 *   claim in marketing is the same claim.
 * - estimate_output: the site advertises quantities and cost ranges; "quote" there promises what the estimate
 *   labels deny. The scope's permitted_phrases are removed from the text before the scan, as they are in the product.
 */
export function loadBanned() {
  const copy = path.join(REPO_ROOT, "contracts/copy.json");
  if (fs.existsSync(copy)) {
    const c = JSON.parse(fs.readFileSync(copy, "utf8"));
    const scopes = Object.values(c.banned_scoped ?? {});
    const words = [...(c.banned ?? []), ...scopes.flatMap((s) => s.words ?? [])];
    return {
      source: "contracts/copy.json",
      permitted: scopes.flatMap((s) => s.permitted_phrases ?? []),
      patterns: [
        ...words.map((w) => ({ word: w, re: new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "[\\s-]+")}\\b`, "i") })),
        ...(c.banned_patterns ?? []).map((p) => ({ word: p.id, re: new RegExp(p.pattern, p.flags) })),
      ],
    };
  }
  const words = ["compliant", "code-compliant", "meets code", "guaranteed", "stamp marketplace", "get your plans stamped", "stamping service", "flythrough", "walkthrough", "cinematic", "quote", "quotation", "guaranteed price", "fixed price", "exact match", "exact colour", "true colour"];
  return {
    source: "skills/drawlogic-trust-rules/SKILL.md §8 (contracts/copy.json not drafted yet)",
    permitted: ["Indicative — not a quote", "This is an estimate, not a quotation."],
    patterns: [
      ...words.map((w) => ({ word: w, re: new RegExp(`\\b${w.replace(/\s+/g, "[\\s-]+")}\\b`, "i") })),
      { word: "approved (compliance claim)", re: /\b(code|building[\s-]control|council|regulator|regulation|planning)[\s-]approved\b|\bapproved (by|for) (building control|the council|planning|code|regulators?)\b/i },
    ],
  };
}

export function findBanned(text, banned) {
  for (const p of banned.permitted ?? []) text = text.split(p).join(" ");
  const hits = [];
  for (const { word, re } of banned.patterns) {
    const m = text.match(re);
    if (m) hits.push({ word, context: text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).replace(/\s+/g, " ") });
  }
  return hits;
}

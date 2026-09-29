// Contract validation (TESTING.md layer 1). Compiles every schema, validates every example and config file,
// then checks the invariants JSON Schema cannot express. Exit code 1 on any failure.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import { conditionText } from "./condition-text.mjs";
import { auditHash, ddlHash } from "./jcs.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXAMPLES = path.join(ROOT, "examples");
const BASE = "https://drawlogic.invalid/contracts/";
const read = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// 1. Compile every schema.
const ajv = new Ajv2020({ strict: true, allErrors: true, allowUnionTypes: true, strictRequired: false, strictTypes: false });
const schemaFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".schema.json")).sort();
for (const f of schemaFiles) {
  const s = read(path.join(ROOT, f));
  if (s.$id !== BASE + f) fail(f, `$id must be ${BASE + f}`);
  ajv.addSchema(s);
}
for (const f of schemaFiles) {
  try { ajv.getSchema(BASE + f); } catch (e) { fail(f, `does not compile: ${e.message}`); }
}

function check(where, ref, doc) {
  let validate;
  try { validate = ajv.getSchema(BASE + ref); } catch (e) { return fail(where, `schema ${ref}: ${e.message}`); }
  if (!validate) return fail(where, `no schema ${ref}`);
  if (!validate(doc)) for (const e of validate.errors) fail(where, `${e.instancePath || "/"} ${e.message}${e.params ? " " + JSON.stringify(e.params) : ""}`);
}

// 2. Config files.
const CONFIG = { "copy.json": "copy.schema.json", "models.json": "models.schema.json", "render.thresholds.json": "render-thresholds.schema.json" };
const config = {};
for (const [file, schema] of Object.entries(CONFIG)) {
  config[file] = read(path.join(ROOT, file));
  check(file, schema, config[file]);
}

// 3. Examples: <schema>.<subject>.json, or llm-outputs.<def>.<subject>.json.
const examples = {};
for (const f of fs.readdirSync(EXAMPLES).filter((f) => f.endsWith(".json")).sort()) {
  const doc = read(path.join(EXAMPLES, f));
  const [schema, ...rest] = f.replace(/\.json$/, "").split(".");
  const ref = schema === "llm-outputs" ? `llm-outputs.schema.json#/$defs/${rest[0]}` : `${schema}.schema.json`;
  if (!schemaFiles.includes(`${schema}.schema.json`)) { fail(`examples/${f}`, `no schema named ${schema}`); continue; }
  check(`examples/${f}`, ref, doc);
  (examples[schema] ??= []).push({ file: `examples/${f}`, doc });
}

// Every document schema has at least one example.
const DOCUMENT_SCHEMAS = schemaFiles.filter((f) => !["common.schema.json", "copy.schema.json", "models.schema.json", "render-thresholds.schema.json"].includes(f)).map((f) => f.replace(".schema.json", ""));
for (const s of DOCUMENT_SCHEMAS) if (!examples[s]?.length) fail(`examples/`, `no example for ${s}.schema.json`);

// 4. Invariants.
const all = (s) => examples[s] ?? [];
const ddls = all("ddl");
const byId = (s, key) => new Map(all(s).map((e) => [key(e.doc), e]));
const cards = byId("interpretation", (d) => d.card_id);

for (const { file, doc } of ddls) {
  const h = ddlHash(doc);
  if (doc.drawing.hash !== h) fail(file, `drawing.hash is ${doc.drawing.hash}, computed ${h}`);
  const ids = new Set();
  for (const coll of ["materials", "objects", "connections", "constraints", "dimensions", "annotations", "layers", "schedules"])
    for (const el of doc[coll]) { if (ids.has(el.id)) fail(file, `duplicate id ${el.id}`); ids.add(el.id); }
  const materials = new Set(doc.materials.map((m) => m.id));
  for (const o of doc.objects) if (o.material_id && !materials.has(o.material_id)) fail(file, `object ${o.id} material_id ${o.material_id} not in materials`);
  const refOk = (v) => typeof v === "number" || ids.has(String(v).split(".")[0]);
  for (const c of doc.constraints) for (const k of ["of", "equals", "target", "from", "value"]) for (const v of [].concat(c[k] ?? [])) if (!refOk(v)) fail(file, `constraint ${c.id}.${k} refers to unknown ${v}`);
  for (const x of [...doc.connections]) for (const v of [x.from, x.to]) if (!ids.has(v)) fail(file, `connection ${x.id} refers to unknown ${v}`);
  // Trust rule 6: a Draft drawing names a confirmed card.
  if (doc.drawing.mode === "draft") {
    const card = cards.get(doc.drawing.card_id);
    if (!card) fail(file, `card_id ${doc.drawing.card_id} has no interpretation example`);
    else if (card.doc.status !== "confirmed") fail(file, `card ${doc.drawing.card_id} is not confirmed`);
  }
  // Trust rule 5: ai_inferred below the threshold must carry verify: true.
  const threshold = 0.8;
  for (const coll of ["materials", "objects", "constraints", "dimensions", "annotations", "connections"])
    for (const el of doc[coll]) if (el.source === "ai_inferred" && el.confidence < threshold && el.verify !== true) fail(file, `${el.id}: ai_inferred at ${el.confidence} without verify`);
}
const ddlByHash = new Map(ddls.map((e) => [e.doc.drawing.hash, e]));

for (const { file, doc } of all("check-result")) {
  const n = (s) => doc.results.filter((r) => r.status === s).length;
  const want = { performed: n("pass") + n("flag"), passed: n("pass"), flagged: n("flag"), out_of_scope: n("out_of_scope") };
  for (const k of Object.keys(want)) if (doc.summary[k] !== want[k]) fail(file, `summary.${k} is ${doc.summary[k]}, results give ${want[k]}`);
  if (!ddlByHash.has(doc.drawing_hash)) fail(file, `drawing_hash matches no DDL example`);
}
const checkByRun = byId("check-result", (d) => d.run_id);

for (const { file, doc } of all("stamp")) {
  const ddl = ddlByHash.get(doc.drawing_hash);
  if (!ddl) fail(file, `drawing_hash matches no DDL example`);
  if (doc.check_run_id) {
    const run = checkByRun.get(doc.check_run_id)?.doc;
    if (!run) fail(file, `check_run_id matches no check-result example`);
    else {
      for (const k of ["performed", "passed", "flagged"]) if (doc.checks[k] !== run.summary[k]) fail(file, `checks.${k} ${doc.checks[k]} ≠ run ${run.summary[k]}`);
      const np = run.checks_not_performed.map((c) => c.label);
      if (JSON.stringify(np) !== JSON.stringify(doc.checks_not_performed)) fail(file, `checks_not_performed differs from the run`);
    }
  }
  if (ddl) {
    const unverified = ddl.doc.objects.filter((o) => o.verify).map((o) => o.id).sort();
    const listed = doc.unverified_objects.items.map((i) => i.object_id).sort();
    if (doc.unverified_objects.count !== unverified.length || JSON.stringify(unverified) !== JSON.stringify(listed)) fail(file, `unverified_objects ${JSON.stringify(listed)} ≠ DDL verify objects ${JSON.stringify(unverified)}`);
  }
}

for (const { file, doc } of all("signing-gate")) {
  const derived = doc.drawings_opened.opened === doc.drawings_opened.total && doc.verify_items.resolved === doc.verify_items.total &&
    doc.flags.cleared_or_accepted === doc.flags.total && doc.report_reviewed && doc.signer_checks.credential_verified &&
    doc.signer_checks.jurisdiction_match && doc.signer_checks.discipline_match && ["verified", "verified_insured"].includes(doc.signer_checks.verification_level);
  if (doc.enabled !== derived) fail(file, `enabled is ${doc.enabled}, derivation gives ${derived}`);
}

for (const { file, doc } of all("audit-record")) {
  const h = auditHash(doc);
  if (doc.hash !== h) fail(file, `hash is ${doc.hash}, computed ${h}`);
}

for (const { file, doc } of all("idea-result")) {
  if (!doc.assumptions.length) fail(file, "Idea result with no assumptions (trust rule 6)");
}

// Rule display text is generated from the structured condition, never authored separately.
const textDiverges = (rule) => rule.condition_text !== conditionText(rule);
const everyRule = [
  ...all("rule").map(({ file, doc }) => ({ file, rule: doc })),
  ...all("profile").flatMap(({ file, doc }) => doc.rules.map((rule, i) => ({ file: `${file} rules/${i}`, rule }))),
];
for (const { file, rule } of everyRule)
  if (textDiverges(rule)) fail(file, `condition_text "${rule.condition_text}" differs from the generated "${conditionText(rule)}"`);

// 5. models.json covers every task in providers/llm.ts, and every structured_output resolves.
const llmTs = fs.readFileSync(path.join(ROOT, "providers/llm.ts"), "utf8");
const taskUnion = llmTs.match(/export type LlmTask =([^;]+);/);
if (!taskUnion) fail("providers/llm.ts", "no LlmTask union");
else {
  const tasks = [...taskUnion[1].matchAll(/"([a-z_]+)"/g)].map((m) => m[1]);
  const configured = Object.keys(config["models.json"].tasks);
  for (const t of tasks) if (!configured.includes(t)) fail("models.json", `task ${t} missing`);
  for (const t of configured) if (!tasks.includes(t)) fail("models.json", `task ${t} not in LlmTask`);
}
for (const [task, t] of Object.entries(config["models.json"].tasks)) {
  try { if (!ajv.getSchema(BASE + t.structured_output)) fail("models.json", `${task}.structured_output ${t.structured_output} does not resolve`); }
  catch (e) { fail("models.json", `${task}.structured_output: ${e.message}`); }
}

// 6. Banned words (trust rule 8) in copy strings and example text. copy.json's own banned lists are excluded.
const copy = config["copy.json"];
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "[\\s-]+");
const everywhere = [...copy.banned.map((w) => new RegExp(`\\b${esc(w)}\\b`, "i")), ...copy.banned_patterns.map((p) => new RegExp(p.pattern, p.flags))];
const scoped = Object.values(copy.banned_scoped).flatMap((s) => s.words.map((w) => new RegExp(`\\b${esc(w)}\\b`, "i")));
const permitted = copy.banned_scoped.estimate_output.permitted_phrases;
function* strings(v, at = "") {
  if (typeof v === "string") yield [at, v];
  else if (Array.isArray(v)) for (let i = 0; i < v.length; i++) yield* strings(v[i], `${at}/${i}`);
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) yield* strings(x, `${at}/${k}`);
}
const { banned: _b, banned_patterns: _p, banned_scoped: _s, ...copyText } = copy;
for (const [at, s] of strings(copyText)) {
  for (const re of everywhere) if (re.test(s)) fail("copy.json", `${at}: banned word in "${s}"`);
  if (!permitted.includes(s)) for (const re of scoped) if (re.test(s)) fail("copy.json", `${at}: scoped banned word in "${s}"`);
}
for (const [schema, list] of Object.entries(examples))
  for (const { file, doc } of list)
    for (const [at, s] of strings(doc)) for (const re of [...everywhere, ...scoped]) if (re.test(s)) fail(file, `${at}: banned word in "${s}"`);

// 7. Self-test: each mutation breaks a trust rule; the schema must reject it. A mutation that validates is a hole in the contract.
const ex = (name) => structuredClone(read(path.join(EXAMPLES, name)));
const MUTATIONS = [
  ["no ✓ from an unverified rule (rule 3)", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); Object.assign(d.results[1], { status: "pass", reason: null }); return d; }],
  ["no ✓ without a signer (rule 3)", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); d.results[0].signer = null; return d; }],
  ["no ✓ from no rule (rule 3)", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); Object.assign(d.results[3], { status: "pass", reason: null }); return d; }],
  ["a flag carries a reason", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); d.results[1].reason = null; return d; }],
  ["checks_not_performed always present (FR-32)", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); delete d.checks_not_performed; return d; }],
  ["Idea never passes (FR-97)", "check-result.schema.json", () => { const d = ex("check-result.parapet.json"); d.mode = "idea"; return d; }],
  ["object without source (rule 5)", "object.schema.json", () => { const d = ex("object.ins-01.json"); delete d.source; return d; }],
  ["object with null source (rule 5)", "object.schema.json", () => { const d = ex("object.ins-01.json"); d.source = null; return d; }],
  ["object without confidence (rule 5)", "object.schema.json", () => { const d = ex("object.ins-01.json"); delete d.confidence; return d; }],
  ["source outside the enum (rule 5)", "object.schema.json", () => { const d = ex("object.ins-01.json"); d.source = "model"; return d; }],
  ["profile source names its profile (FR-07)", "ddl.schema.json", () => { const d = ex("ddl.parapet.json"); delete d.objects[5].source_detail; return d; }],
  ["auto_fix names its rule (FR-33)", "object.schema.json", () => { const d = ex("object.ins-01.json"); d.source = "auto_fix"; return d; }],
  ["Draft drawing needs a card (rule 6)", "ddl.schema.json", () => { const d = ex("ddl.parapet.json"); delete d.drawing.card_id; return d; }],
  ["Draft card cannot confirm with missing values (FR-12)", "interpretation.schema.json", () => { const d = ex("interpretation.parapet.json"); d.missing.push({ key: "coping_material", label: "Coping", question: "What is the coping?" }); return d; }],
  ["Draft card cannot confirm with blocked values (FR-14)", "interpretation.schema.json", () => { const d = ex("interpretation.parapet.json"); d.blocked.push({ key: "wind_load", kind: "load", request: "Wind load on the parapet from the structural engineer." }); return d; }],
  ["upload needs rights confirmation (FR-177)", "interpretation.schema.json", () => { const d = ex("interpretation.parapet.json"); delete d.inputs[1].rights_confirmed; return d; }],
  ["verified rule needs a signer (FR-62)", "rule.schema.json", () => { const d = ex("rule.parapet-upstand.json"); d.signer = null; return d; }],
  ["unverified rule has no signer", "rule.schema.json", () => { const d = ex("rule.parapet-upstand.json"); d.state = "unverified"; return d; }],
  ["engineering constraint never defaulted (rule 4)", "profile.schema.json", () => { const d = ex("profile.gb-eng-residential.json"); d.required_constraints.parapet.idea.push({ key: "wind_load", label: "Wind load", kind: "engineering", engineering_kind: "load", default_from: "typical_detail" }); return d; }],
  ["jurisdiction profile has construction defaults (FR-06)", "profile.schema.json", () => { const d = ex("profile.gb-eng-residential.json"); delete d.construction_defaults; return d; }],
  ["colour_code basis needs a colour (rule 11a)", "ddl.schema.json", () => { const d = ex("ddl.parapet.json"); d.materials[6].colour_ref = null; return d; }],
  ["manufacturer texture needs a signed product profile (FR-162)", "ddl.schema.json", () => { const d = ex("ddl.parapet.json"); d.materials[0].basis = "manufacturer_texture"; return d; }],
  ["Idea stamp carries the Concept watermark (principle 7)", "stamp.schema.json", () => { const d = ex("stamp.parapet.json"); d.mode = "idea"; d.checks.passed = 0; return d; }],
  ["Learn stamp carries Made with Drawlogic (FR-165)", "stamp.schema.json", () => { const d = ex("stamp.parapet.json"); d.mode = "learn"; d.marks = ["watermark.student"]; d.integrity_summary = { student_supplied_share: 0.6, ai_inferred_share: 0.4, critique_points_raised: 4, critique_points_addressed: 3, revision_cycles: 1, generate_anyway_used: false }; return d; }],
  ["signed stamp states the responsible-charge basis (FR-115)", "stamp.schema.json", () => { const d = ex("stamp.parapet.json"); d.signed.signed = true; return d; }],
  ["signed stamp needs a verified signer (FR-111, FR-115)", "stamp.schema.json", () => { const d = ex("stamp.parapet.json"); d.signed = { signed: true, signer: { name: "H. Marsh", credential: "ARB 098234", jurisdiction: "GB-ENG", verification_level: "pending" }, basis_key: "stamp.signed_basis", audit_record_hash: `sha256:${"a".repeat(64)}`, signed_at: "2026-09-29T12:00:00Z" }; return d; }],
  ["set op names its field (FR-21)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); delete d.ops[0].field; return d; }],
  ["set op carries its new value (FR-21)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); delete d.ops[0].value; return d; }],
  ["set op keeps the previous value for undo (FR-21)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); delete d.ops[0].before; return d; }],
  ["add op carries the element (FR-21)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); d.ops[0].op = "add"; delete d.ops[0].value; return d; }],
  ["remove op keeps the element for undo (FR-21)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); d.ops[0].op = "remove"; delete d.ops[0].before; return d; }],
  ["closing sentence cannot be swapped", "stamp.schema.json", () => { const d = ex("stamp.parapet.json"); d.closing_sentence_key = "stamp.title"; return d; }],
  ["gate cannot enable with the report unreviewed (FR-113)", "signing-gate.schema.json", () => { const d = ex("signing-gate.parapet.json"); d.enabled = true; return d; }],
  ["accepted flag needs a note (FR-113)", "signing-gate.schema.json", () => { const d = ex("signing-gate.parapet.json"); d.flags.notes.push({ result_id: "res-02", state: "accepted", note: "" }); return d; }],
  ["first audit record has no prev_hash", "audit-record.schema.json", () => { const d = ex("audit-record.parapet.json"); d.seq = 0; return d; }],
  ["model actor names the model (FR-44)", "audit-record.schema.json", () => { const d = ex("audit-record.parapet.json"); d.actor = { kind: "model", id: "interpret" }; return d; }],
  ["no third-party image without a licence (rule 13c)", "precedent-card.schema.json", () => { const d = ex("precedent-card.parapet.json"); d.images.push({ asset_id: "ast-x", credit: "Photographer" }); return d; }],
  ["inferred narration fact is hedged (rule 13a)", "narration-script.schema.json", () => { const d = ex("narration-script.parapet.json"); d.segments[2].hedge = false; return d; }],
  ["narration segment has an element (rule 13a)", "narration-script.schema.json", () => { const d = ex("narration-script.parapet.json"); delete d.segments[0].element_id; return d; }],
  ["no compare before generation is unlocked (FR-140)", "critique.schema.json", () => { const d = ex("critique.parapet.json"); d.compare = { ddl_hash: `sha256:${"0".repeat(64)}`, differences: [] }; return d; }],
  ["judgement points are not graded (FR-142)", "critique.schema.json", () => { const d = ex("critique.parapet.json"); d.points[2].source = { kind: "rule", rule_id: "x", document: null }; return d; }],
  ["Idea result carries the Concept watermark (FR-96)", "idea-result.schema.json", () => { const d = ex("idea-result.kitchen-extension.json"); d.marks = []; return d; }],
  ["auto_fix diff records source auto_fix (FR-33)", "ddl-diff.schema.json", () => { const d = ex("ddl-diff.parapet.json"); d.origin = { kind: "auto_fix", rule_id: "gb-eng-roof-upstand-150", check_run_id: "r" }; return d; }],
  ["drafted rules are unverified (FR-61)", "llm-outputs.schema.json#/$defs/profile_draft_result", () => ({ document: { ref: "Approved Document C" }, rules: [ex("rule.parapet-upstand.json")] })],
  ["preview video is never fidelity-scored (FR-130)", "render-thresholds.schema.json", () => { const d = read(path.join(ROOT, "render.thresholds.json")); d.generative_video.fidelity_scored = true; return d; }],
  ["retries never consume credits (review 27 Sept)", "render-thresholds.schema.json", () => { const d = read(path.join(ROOT, "render.thresholds.json")); d.metering.retries_charged = true; return d; }],
  ["failed renders charge nothing (review 27 Sept)", "render-thresholds.schema.json", () => { const d = read(path.join(ROOT, "render.thresholds.json")); d.metering.failed_jobs_charged = true; return d; }],
  ["Generate anyway is logged (FR-140)", "thread-state.schema.json", () => { const d = ex("thread-state.parapet-learn.json"); d.generate_anyway = { used: true, audit_record_id: null }; return d; }],
  ["new threads seed from DDL plus thread state (review 27 Sept)", "models.schema.json", () => { const d = read(path.join(ROOT, "models.json")); d.defaults.new_thread_seed.thread_state = null; return d; }],
  ["refusal is always logged (§8A.2)", "models.schema.json", () => { const d = read(path.join(ROOT, "models.json")); d.defaults.on_refusal.log = false; return d; }],
];
let holes = 0;
for (const [name, ref, make] of MUTATIONS) {
  const v = ajv.getSchema(BASE + ref);
  if (v(make())) { holes++; fail("self-test", `accepted a document that breaks: ${name}`); }
}
{
  const edited = ex("rule.parapet-upstand.json");
  edited.condition_text = "upstand height at least 150";
  if (!textDiverges(edited)) fail("self-test", "an authored condition_text was not caught");
}

// Report.
const counted = Object.values(examples).reduce((n, l) => n + l.length, 0);
if (errors.length) {
  console.error(`Contract validation failed (${errors.length}):\n` + errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Contract validation passed: ${schemaFiles.length} schemas, ${Object.keys(CONFIG).length} config files, ${counted} examples, ${MUTATIONS.length} rule-breaking mutations rejected.`);

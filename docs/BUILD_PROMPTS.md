# BUILD_PROMPTS.md — sequenced build prompts

Run in order. Each prompt names its owner (CC = Claude Code in `drawlogic-trust`; CX = Codex in `drawlogic-engine`), its inputs, deliverables and gate. Do not start a prompt whose gate predecessor is red. Every prompt implicitly begins: *"Read CLAUDE.md/AGENTS.md, load the two skills, read docs/PRD.md sections named, check docs/DECISIONS.md; stop on any OPEN decision you need."*

---

## Prompt 0 — Contract (CC) · STOP FOR REVIEW
```
Read docs/PRD.md fully (v0.2.5). Draft every file listed in docs/CONTRACTS.md: JSON Schemas with generated TS types and pydantic models, contracts/copy.json (stamp closing sentence, preview label, concept and student watermark text, "checks not performed — none" text, banned words), contracts/render.thresholds.json, and contracts/examples/ — one valid example per schema describing the Appendix A parapet detail, plus the kitchen-extension Idea concept and the Lekki site. Add a CI job that validates every example against its schema. Do not write engine or trust code. Stop and present the contract for review.
```
Gate: Tokunbo approves the contract.

## Prompt 1 — Repo, worktrees, CI (CC)
```
git init on main; add ../drawlogic-trust (trust-spine) and ../drawlogic-engine (ddl-engine) worktrees; create the layout in docs/REPO_LAYOUT.md; copy PRD, prototype and prompt docs into place; .github/workflows/ci.yml running contract validation, trust-rule tests (banned words, provenance schema), lint and type checks for TS and Python; nightly-eval.yml stub. Confirm design/prototype/ contains all files listed in the fidelity skill; if any are missing, list them and stop.
```
Gate: CI green on an empty repo; prototype files present.

## Prompt 2 — Fixtures and golden tests (CC) · before any engine code
```
From contracts/examples and the twelve architecture detail types in PRD §7.3 FR-23, write fixtures/: for each detail type a valid DDL, its resolved DDL after the solver, and its expected check result against Generic + GB-ENG residential v0.1 (mark every expected ✓ only where the rule will be verified — otherwise ⚠ unverified). Add three Idea-mode fixtures (kitchen extension, restaurant, Lekki site) with expected assumptions lists, and two Learn-mode fixtures with expected critique points (each with reason and why-text). Write trust/tests/engine/ golden tests that load fixtures and call the engine through trust/mocks/ interfaces. Tests must fail now (engine absent).
```
Gate: fixtures validate; golden tests exist and fail for the right reason.

## Prompt 3 — Profiles v0.1 (CC)
```
Author profiles/generic/ (conventions keyed by region: units, sheets, layer standard, symbol set; good-practice checks: geometry closure, dimension chain integrity, legend/symbol consistency, missing annotation, thermal-line drawn, drainage path drawn) and profiles/gb-eng-residential/ v0.1 (conventions; required-constraint lists for the twelve detail types, Draft and Idea variants; rules with document refs to Approved Documents L, F, C, B, M and relevant BS/PAS, every rule with a plain-language why; typical details; coverage statement). All rules state: unverified until a signer record is added. Add profile tests. Stub profiles/us-ibc-base/ and profiles/ng-la/ with conventions only and an explicit "no rules yet" coverage statement.
```
Gate: profiles validate against contracts/profile.schema.json; coverage statements generated.

## Prompt 4 — DDL parse/validate + solver (CX)
```
Implement engine/ddl/ (parse, validate, version, diff, hash) and engine/solver/ (constraints as first-class; sum/equality/offset/min/max; conflict surfacing, never silent resolution; shapely/networkx for topology). Make fixtures/ golden tests for resolved DDL pass. Property tests: constraint conservation, determinism across runs, provenance preserved through solving. Expose POST /ddl/validate and /ddl/resolve.
```
Gate: solver goldens green; property tests green.

## Prompt 5 — Renderers (CX)
```
Implement engine/render/: SVG (line weights, hatching, dimension ticks, leaders, layers) driven by profile conventions; DXF via ezdxf preserving layers/blocks/dims/text; PDF via Cairo with title block and stamp block placeholder; artefacts: line-art, depth map, material map keyed by material_id. Golden tests compare SVG/DXF structure (not pixels) for the twelve details. Expose /render/{svg,dxf,pdf,artefacts}.
```
Gate: renderer goldens green; DXF opens in a reference CAD viewer (attach screenshot).

## Prompt 6 — Rule engine runtime (CX)
```
Implement engine/rules/: load profile stacks (jurisdiction → regional → client → office → manufacturer), evaluate rules as pure functions over resolved DDL, emit contracts/check-result (status, reason codes fail|unverified|no_rule|needs_input, checks_not_performed always present, blocked list, auto_fix availability). Never ✓ without state=verified and a signer. Deterministic auto_fix application returning a DDL diff with source=auto_fix. Make fixtures/ check-result goldens pass. Property test: no ✓ without verified+signed rule. Expose /check and /check/autofix.
```
Gate: check goldens green; fail-closed property test green.

## Prompt 7 — Trust spine core (CC)
```
Implement trust/: provenance service (enforces source/confidence on every object; verify flag thresholding from profile); rule-state enforcement wrapper over engine /check (rejects any ✓ lacking verified+signer as a hard error and logs it); stamp generator from contracts/stamp.schema.json + copy.json; hash-chained audit log (Supabase table + verification function); export assembler that injects the stamp and watermarks (concept, student, Free tier). Tests per trust-rules skill §3, §5, §7, §8.
```
Gate: trust-rule tests green against engine (not mocks).

## Prompt 8 — App: tokens, shell, Idea mode (CC)
```
Load the fidelity skill. Port design/prototype/tokens.css into tailwind.config.ts (replace theme.colors); build the 12 system components; build shell, idea-home, idea-results, site-boundary and idea-site routes to the prototype, wired to engine via trust APIs with mocks where engine endpoints are pending. Assumptions panel from interpretation payload; export menu without DXF; Concept watermark on every image. Snapshot tests at 375/768/1280. Attach side-by-sides.
```
Gate: fidelity checklist complete for five screens; snapshots green.

## Prompt 9 — Interpreter and compiler (CX)
```
Implement engine/interpret/: interpreter (text/sketch/PDF/image/photo → contracts/interpretation payload with per-object source and confidence, missing[], blocked[]; Draft vs Idea vs Learn required-constraint variants from profile); compiler (confirmed card → DDL). Providers behind contracts/providers/llm.ts (Claude tiered) with a second adapter slot for provider comparison. Build the eval harness in fixtures/eval/ (manifest format, metrics: recall/precision, dimension accuracy, ECE, card acceptance) and run it on the seed set. Never emit an engineering value that was not supplied.
```
Gate: interpretation fixtures green; eval report produced; blocked-values test green.

## Prompt 10 — App: Promote, Draft workspace, Check panel, Export (CC)
```
Build promote (modal → interpretation card with Missing gating), draft-workspace (chat + live SVG + change list + undo + provenance layer + chip), check-panel (Standards Report drawer with auto-fix and "Checks not performed" block), export (format choice, sheet preview, stamp, Free watermark) to the prototype. Draft compile is refused without a confirmed card id. Snapshot and behaviour tests for every binding behaviour in the skill.
```
Gate: journey A runs end to end against the engine up to export.

## Prompt 11 — Signing (CC)
```
Implement trust/gate (state machine per contracts/signing-gate.schema.json), 2FA step-up at signing, signature block from copy.json, review-evidence recording into the audit chain, signer verification flow (identity via KYC adapter stub, registry match adapter stubs for ARB/state boards/ARCON/COREN, contact match, verification levels, one-licence-one-account, monthly re-check job). Build sign.html and signers.html routes to the prototype. Gate tests: control disabled-not-absent; enablement only when all items complete.
```
Gate: gate state-machine tests green; sign route matches prototype.

## Prompt 12 — Render providers and fidelity (CX)
```
Implement engine/providers/render/: diffusion adapter (conditioned on line-art/depth/material map; region edits for material swaps; provider per Decision 6), edge-overlay fidelity scorer against contracts/render.thresholds.json with fail-and-retry, Higgsfield adapter for generative_video (image-to-video; start+end frame where supported; label from copy.json; no fidelity score; moderation-failure retry then fail), raytraced stub returning not_available. Every job records source drawing hash and revision; outdated detection. Expose /render/still, /render/preview-video.
```
Gate: drifted-image fixture fails; preview-video fixture carries label and null fidelity; PROVIDERS.md checks ticked before enabling.

## Prompt 13 — App: Render Studio and Preview video (CC)
```
Build render.html and preview-video.html routes to the prototype: engine selector (Fast / Preview video / Studio greyed Stage 3), variants with hash and fidelity readouts, outdated label, credits meter, three-step preview flow with permanent label and moderation-failure state. Credit metering wired to billing stubs.
```
Gate: fidelity checklist; no fidelity score on preview tiles (test).

## Prompt 14 — Learn mode (CC + CX)
```
CX: engine/interpret/critique — given a student sketch/description and profile, return inspiration (principles + partial diagrams from typical details) and graded critique points (green/amber/red, reason, source or "general good practice — not a verified check", why-text, tutor-discuss tag for judgement items), plus a compare payload (differences between original and generated with resolved critique point ids). Never a copy-ready detail at the inspiration step.
CC: Learn flow in trust (generation lock until one revision cycle; logged "Generate anyway"; integrity summary computed from provenance and critique state; student watermark), and learn-critique / learn-compare routes to the prototype, plus the "Teach me first" toggle on idea-results. Learn fixtures green.
```
Gate: journey C runs end to end; integrity export fields present.

## Prompt 15 — Profiles UI: marketplace and Authoring Studio (CC + CX)
```
CX: engine/profiles — validate authored profiles; AI-assisted rule drafting from an uploaded document (every drafted rule state=unverified); profile diff and version bump.
CC: profiles.html routes to the prototype (browse with tier/signer badges; Authoring Studio with unverified highlighting, structured rule editor, signing with credential confirmation, versioning, publish private/link/marketplace with 70/30 note). Marketplace listing model in Supabase; Stripe Connect payout stub.
```
Gate: an authored profile round-trips through engine validation and appears in browse.

## Prompt 16 — Lagos readiness, settings, billing (CC)
```
Build lagos-readiness.html (EPPPS checklist split "Drawlogic produces / you provide"; surveyed-levels requirement; NG-LA coverage) and settings.html (roles, profile stack order, data residency, billing with GBP/USD/NGN, audit log export, plan gates visible-and-locked). Billing: Stripe (Free/Idea/Individual/Professional/Practice), Paystack NGN tier with eligibility rules, render and site-feasibility credits, student verification. Plan-gate tests: gated features present and disabled on lower tiers.
```
Gate: journey B runs end to end; billing webhooks tested.

## Prompt 17 — Integration, audits, benchmark (CC)
```
Run journeys A, B, C against the real engine. Run the banned-words scan over the built app, engine strings, profiles and docs; list and fix hits. Run the fidelity audit: every route vs its prototype file, side-by-sides attached, gaps into docs/DESIGN_GAPS.md. Run the eval harness and report against docs/TESTING.md Stage 1 gates. Produce docs/STAGE1_REPORT.md.
```
Gate: Stage 1 benchmark report reviewed by Tokunbo before any Stage 2 prompt.

---
Stage 2 prompts (Lagos profile Tier 2, PreCheck API, manufacturer profiles, MCP server, Interior pack, photo→as-existing) are written after the Stage 1 report, not before.

---
name: drawlogic-trust-rules
description: Use this skill for any work on Drawlogic — engine, trust spine, app, profiles, fixtures, copy or docs — whenever code or content touches drawings, checks, provenance, stamps, signing, profiles, rendering, Idea mode, Learn mode, exports or user-facing text. It states the product rules that are non-negotiable and how each is enforced by test. Load it before writing any rule, fixture, stamp, export, prompt or UI string. Do not rely on memory of the PRD; the rules here are the ones that carry liability.
---

# Drawlogic Trust Rules

These rules come from PRD v0.2.5 §6 and §7.5. They are enforced by tests in `trust/tests/`; a PR that breaks one does not merge. They apply to both agents.

## 1. Config is law
Conventions, rules, symbol sets, required-constraint lists, document references and typical details live in versioned profiles under `profiles/`. Nothing jurisdiction- or discipline-specific is hard-coded. **Test:** grep for jurisdiction/discipline literals in `engine/` and `app/` fails outside profile loaders.

## 2. Generator / examiner separation
LLMs propose DDL and edits. The deterministic solver and rule engine validate. The generator never grades its own work. **Test:** no module in `engine/interpret/` imports `engine/rules/` results to alter its own output.

## 3. Fail-closed
- No rule coverage → ⚠ `no_rule`, never ✓.
- Rule with `state: unverified` → ⚠ `unverified`, never ✓.
- A ✓ requires `state: verified` **and** a signer on the rule.
**Test:** property test over random profiles asserts no ✓ without a verified, signed rule.

## 4. Never invent engineering values
Loads, ratings, member sizes, cable sizes, fire periods, U-value targets, structural connections. Absent → `blocked` with a specific request. **Test:** interpreter fixtures with missing engineering values must return `blocked`, never a value.

## 5. Provenance is mandatory
Every DDL object carries `source ∈ {user, project, reference, profile, manufacturer, ai_inferred, auto_fix}` and `confidence ∈ [0,1]`; `ai_inferred` below threshold sets `verify: true`. **Test:** schema validation rejects objects without them; no code path writes `source: null`.

## 6. Question first in Draft, assumptions visible in Idea
Draft: no generation without a confirmed interpretation card. Idea: gaps filled from profile defaults as `ai_inferred` and listed in the assumptions panel. Learn: critique before generation; "Generate anyway" allowed and logged. **Test:** API rejects Draft compile without a confirmed card id; Idea results carry a non-empty assumptions list when defaults were used.

## 7. Honest stamps and labels
Every export carries the stamp fields in `contracts/stamp.schema.json` including `checks_not_performed` (always present) and the closing sentence from `contracts/copy.json`. Concept exports carry the Concept watermark; student exports carry the educational watermark and the provenance summary; Preview video carries the preview label and no fidelity score. **Test:** export fixtures assert every field; image tests assert watermark presence.

## 8. Banned words
From `contracts/copy.json` → `banned`: compliant, code-compliant, approved (as a compliance claim), meets code, guaranteed, stamp marketplace, get your plans stamped, stamping service; and, outside Studio (ray-traced) output, flythrough, walkthrough, cinematic. **Test:** string scan over `app/`, `engine/` emitted strings, `profiles/` messages, and `docs/` copy.

## 9. Signing is responsible charge
The Sign control is enabled only when: all drawings in the set opened; every `verify: true` item resolved; every ⚠ cleared or accepted with a note; report reviewed including checks not performed. Signer credential verified (identity + registry + contact), jurisdiction and discipline matched, 2FA at signing. Review evidence is recorded in the hash-chained audit log. **Test:** gate state machine tests; audit record hash continuity test.

## 10. User data is never training data
Uploads and drawings are workspace-private; office profiles store conventions only; provider adapters must use terms/settings that exclude training on inputs. **Test:** provider config asserts the no-training flag where the API exposes one; a checklist item in `docs/PROVIDERS.md` per provider.

## 11. Renders are faithful or they fail
Diffusion renders are conditioned on the drawing's own line-art/depth/material map and carry an edge-overlay fidelity score; below threshold the job fails and retries, never delivers. Every render carries the source drawing hash and revision; outdated renders are labelled. **Test:** render pipeline fixtures with a drifted image must fail.

## 12. Simple in front, rigorous behind
Idea and Learn use plain language with technical terms on hover; the professional machinery appears after Promote to Draft. Adding consumer simplicity never removes a professional control. **Test:** UI snapshot tests assert gate controls exist and are disabled (not absent) on all tiers.

## 13. Decisions are not defaults
`docs/DECISIONS.md` lists open decisions. No agent resolves one by assumption. Stop and ask.

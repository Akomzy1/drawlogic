# CONTRACTS.md — the interfaces between engine and trust

`contracts/` is the shared boundary. It is owned by nobody, versioned from day one, and changed only by pull request with rationale. Both agents build and test against it using mocks of the other side. **The first build task is to draft these files from the PRD and stop for review** (see BUILD_PROMPTS.md, Prompt 0).

## Files to exist before any engine or trust code
| File | Purpose | Source in PRD |
|---|---|---|
| `contracts/ddl.schema.json` (+ `ddl.ts`, `ddl.py`) | DDL v0.1: drawing header (discipline, type, scale, units, jurisdiction, rev, hash, profile_stack), objects, connections, constraints, dimensions, annotations, layers, schedules, checks, stamp | App. A, 5A.3 |
| `contracts/object.schema.json` | Object: stable `id`, `class`, `material_id` (not free text), `source` enum (7 values), `confidence`, `verify`, `rule_refs`, nullable `height` / `level` / `base_offset` | 7.5, 5A.3 |
| `contracts/rule.schema.json` | Rule: id, profile@version, `state: verified|unverified`, signer {name, credential, signed_at}, document {ref, edition, clause}, applies_to, condition, severity, auto_fix, message, **why** (plain language, used by Learn mode) | App. B, 7.12 |
| `contracts/profile.schema.json` | Profile: metadata (type: jurisdiction/office/client/manufacturer), scope, tier, conventions (units, sheets, title block, layer standard, symbol set, dimension style, annotation language), applicable documents, required-constraint lists per drawing type (Draft and Idea variants), rules, typical details, coverage statement | 2.2 concept, 7.8 |
| `contracts/check-result.schema.json` | Check run: run_id, profile_versions, results[] {rule_id, status ✓/⚠/—, reason code (`fail`, `unverified`, `no_rule`, `needs_input`), message, document ref, auto_fix available}, `checks_not_performed[]` (always present), blocked[] | 7.4 |
| `contracts/interpretation.schema.json` | Interpretation card payload: recognised objects with value/source/confidence, missing[], blocked[] (engineering values), profile stack, mode (draft/idea/learn) | 7.2 |
| `contracts/stamp.schema.json` | Verification stamp: profiles+versions+tier+signer, checks performed/passed/flagged, checks_not_performed, unverified_objects, signed {bool, signer, credential, basis}, drawing_hash, generated_at, closing sentence key | App. C |
| `contracts/signing-gate.schema.json` | Gate state: drawings_opened, verify_items {total, resolved}, flags {total, cleared_or_accepted, notes}, report_reviewed, enabled (derived), evidence {items_opened, changes[], time_in_review} | 7.11 |
| `contracts/audit-record.schema.json` | Hash-chained audit entry: actor (user / model+version / auto_fix), action, before_hash, after_hash, prev_hash, ts | 7.5, FR-45 |
| `contracts/providers/llm.ts` | Tiered LLM interface (route/interpret/compile/explain) | 4.4 |
| `contracts/providers/render.ts` | Render interface: engine `diffusion | generative_video | raytraced`; inputs (line-art, depth, material map, still, end frame); outputs (asset, drawing_hash, fidelity score or null, label key) | 7.6, 5A.1a |
| `contracts/providers/geo.ts` | Basemap/terrain/context interface with provenance (imagery date, resolution, boundary source, DEM name/resolution) | FR-102–105 |
| `contracts/render.thresholds.json` | Fidelity thresholds per mode | FR-52 |
| `contracts/copy.json` | Stamp closing sentence, preview label, concept watermark text, student watermark text, "checks not performed — none" text, **banned words list** | §8 NFR, trust rules 7–8 |
| `contracts/examples/` | One valid example per schema, all describing the same parapet detail from Appendix A, plus the Idea-mode kitchen extension and the Lekki site | — |

## Rules for the contract
- Semantic versioning on every schema; `ddl.version` is mandatory in every document.
- Additive changes are minor; any change that invalidates an example is major and needs both agents' fixtures updated in the same PR.
- Examples are executable: CI validates every example against its schema.
- `copy.json` strings are the only source of stamp, label and watermark text. Code never hard-codes them.

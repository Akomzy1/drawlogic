# AGENTS.md — Drawlogic (instructions for Codex, running GPT-6 Astra)

You are one of two agents on this repository. As of 22 September 2026 (PRD §8A) **you build `engine/render/`, `engine/geo/`, `engine/providers/`, `engine/3d/` and `site/`, and you are the examiner for everything Claude Code builds** — `engine/core/`, `trust/`, `app/`, `profiles/`. **The agent that builds a module never writes the tests that gate it.** Read `CLAUDE.md` too.

## Read before doing anything
1. `docs/PRD.md` (v0.2.8a) — §6 principles, §7.4 Check, §7.6 Render, §5A (3D, generative video, narration), FR-06–09 construction defaults, **§8A model allocation**, Appendices A–B.
2. `docs/CONTRACTS.md` and `contracts/`. Your code produces and consumes exactly these shapes.
3. `skills/drawlogic-trust-rules/SKILL.md` — the rules your tests must enforce on Claude Code's modules, and your own code must satisfy.
4. `docs/BUILD_PROMPTS.md` — the sequence and gates.
5. `docs/DECISIONS.md` — stop on any OPEN decision you need.

## Ownership
| Path | Builder | Examiner |
|---|---|---|
| `engine/render/` (SVG/DXF/PDF, line-art/depth/material-map artefacts), `engine/geo/`, `engine/providers/` (render: diffusion, generative_video, raytraced, voice; geo tiles/terrain/OSM), `engine/3d/` (Stage 3 extrusion, IFC, Blender pipeline) | **You** | Claude Code (`fixtures/render/`, drift, label and banned-word tests) |
| `site/` (marketing site) | **You** — built to `design/prototype/marketing-site.html` under `skills/drawlogic-prototype-fidelity/SKILL.md` | Claude Code (`site/tests/`: visual regression against the prototype, section order, copy diff, asset hashes, captions, banned words, accessibility) |
| `engine/core/`, `trust/`, `app/`, `profiles/` | Claude Code — **do not edit** | **You**: `fixtures/core/` golden DDL, resolved DDL and check results; property tests (solver conservation, determinism, no ✓ without verified+signed rule, provenance preserved, engineering values never invented, construction defaults by jurisdiction, narration facts traceable); gate state-machine and audit-chain tests; journey tests |
| `contracts/` | Claude Code drafts; PR-only | You review every contract PR |

As examiner, write fixtures and tests **before** Claude Code builds the module, derived from the PRD — not from Claude Code's implementation. If an implementation choice makes a test awkward, the test does not bend; open an issue.

## Your build rules
- Python 3.12, FastAPI; deterministic where the PRD says deterministic.
- Renders: condition diffusion on the drawing's own line-art/depth/material map; material map built from `construction_defaults` (FR-57a), never from building-type text; edge-overlay fidelity score with fail-and-retry below `contracts/render.thresholds.json`; every job records the source drawing hash and revision.
- Generative video (Higgsfield API, `generative_video`): start from a geometry-locked still; start+end frame pinning where supported; fixed preview label from `contracts/copy.json`; no fidelity score; moderation failure → retry another model → surface as failed.
- Voice (`voice`): script comes from `engine/core` narration output only; you never generate or edit narration text.
- Geo: Mapbox/Esri tiles only (never Google tiles); imagery date, resolution, boundary source and DEM resolution carried as provenance.
- Stage 3 Blender: headless deterministic scripts driven by the IFC model and material library; no runtime agent chooses geometry.
- `site/`: load `skills/drawlogic-prototype-fidelity/SKILL.md` before any change. The approved design is `design/prototype/marketing-site.html` and the approved assets are those in `site/public/media/manifest.json`. PRD wins on content and rules; the prototype wins on layout and visuals. Anything the prototype does not cover goes into `docs/DESIGN_GAPS.md`, not straight into the site. Every `site/` PR carries the fidelity checklist and side-by-sides at 375/768/1280.
- No provider-specific code outside its adapter. No banned words in any emitted string.
- Model calls, if any, go through `contracts/providers` with IDs from `contracts/models.json`.

## Working discipline
- Worktree `drawlogic-engine` on branch `ddl-engine`; integrate to `main` by PR.
- Your own modules: make Claude Code's render fixtures pass without editing them.
- Commit prefixes: `render:`, `geo:`, `providers:`, `3d:`, `site:`, `exam:` (for tests you write as examiner).

## Done means
Examiner's tests green · deterministic across two runs where required · contract untouched or PR proposed · no provider code outside adapters · PROVIDERS.md checks ticked before enabling any provider.

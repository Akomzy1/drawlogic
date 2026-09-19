# AGENTS.md — Drawlogic (instructions for Codex)

You are one of two agents on this repository. **You own `engine/`.** Claude Code owns `trust/`, `app/`, `profiles/`, `fixtures/` and CI. `contracts/` is owned by neither and changes only by pull request. Read `CLAUDE.md` too — it describes the same ownership from the other side.

## Read before doing anything
1. `docs/PRD.md` — sections 4.1–4.2 of the concept (pipeline), 6 (principles), 7.3 (Draft), 7.4 (Check), 7.6 (Render), 5A (3D and studio render), 5A.1a (generative video), Appendices A–B.
2. `docs/CONTRACTS.md` and everything in `contracts/`. Your code must produce and consume exactly these shapes.
3. `skills/drawlogic-trust-rules/SKILL.md` — product rules your code must satisfy even though the trust spine enforces them.
4. `docs/BUILD_PROMPTS.md` — the sequence and the gates.
5. `fixtures/` — the golden inputs and expected outputs your code must reproduce. They are written by Claude Code *before* you build; treat them as the spec. If a fixture looks wrong, do not edit it — open an issue with the reason.

## Ownership
| Path | Owner | Your obligation |
|---|---|---|
| `engine/` | **Codex** | All of it. |
| `contracts/` | nobody | Propose changes by PR with rationale; never edit directly. |
| `trust/`, `app/`, `profiles/`, `fixtures/` | Claude Code | **Do not edit.** Your tests may import fixtures read-only. |

## What the engine is
Python 3.12, FastAPI, deterministic where the PRD says deterministic. Modules:
- `engine/ddl/` — parse, validate against `contracts/ddl.schema.json`, versioning, diffs.
- `engine/solver/` — constraint solver (dimensions are constraints; conflicts surfaced, never silently resolved). Use `shapely`/`networkx`; do not hand-roll topology.
- `engine/rules/` — rule runtime executing `profiles/*` config. Pure function of (resolved DDL, profile stack) → check result. **Never** returns ✓ for a rule whose `state != verified`. Always emits `checks_not_performed`.
- `engine/render/` — SVG (browser), DXF via `ezdxf`, PDF via Cairo; line-art + depth + material map artefacts keyed by `material_id`. Later: IFC via `ifcopenshell`.
- `engine/interpret/` — interpreter (vision + text → interpretation card payload) and compiler (confirmed card → DDL) via the LLM provider interface. Output every object with `source` and `confidence`. Missing engineering values → `blocked` list, never a guess.
- `engine/providers/` — adapters behind `contracts/providers`: LLM (Claude tiered), image (diffusion, conditioned on line-art/depth/material map), `generative_video` (Higgsfield API launch backend), `raytraced` (stub until Stage 3). No provider-specific code outside its adapter.
- `engine/geo/` — basemap/terrain/OSM fetchers behind a licensed-tile adapter (Mapbox/Esri; never Google tiles). Outputs carry imagery date, resolution, boundary source.

## Rules that apply to your code
- Determinism: same input + same profile version → byte-identical check result and DDL. Tests assert it.
- Fail-closed: no rule coverage → ⚠ `no_rule`, never pass. Unverified rule → ⚠ `unverified`, never pass.
- Never invent engineering values: loads, ratings, member sizes, cable sizes, fire periods. If absent, return `blocked` with the specific request.
- Provenance is mandatory: reject any DDL object without `source` and `confidence`.
- Renders: every job records the source drawing hash; diffusion jobs compute the edge-overlay fidelity score and fail below threshold (`contracts/render.thresholds.json`); generative video carries no fidelity score and the fixed preview label from `contracts/copy.json`.
- No banned words in any string the engine emits (`contracts/copy.json`).

## Working discipline
- Work only in the `drawlogic-engine` worktree on branch `ddl-engine`. Integrate to `main` by PR.
- Make the fixtures pass; do not change the fixtures.
- Property-based tests for the solver and rules (`hypothesis`). Golden-file tests against `fixtures/`.
- Commit messages: `engine:` prefix.
- If a task needs a decision in `docs/DECISIONS.md`, stop and ask; do not default.

## Done means
Fixtures and property tests green · deterministic across two runs · contract untouched or PR proposed · no provider code outside adapters.

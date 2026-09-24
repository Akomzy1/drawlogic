# TESTING.md — what must be green

## Layers
1. **Contract validation** — every `contracts/examples/*` validates against its schema. Runs on every PR.
2. **Golden tests** (`trust/tests/engine/`, fixtures in `fixtures/`) — known DDL → expected resolved DDL; known DDL + profile stack → expected check result; known drawing → expected stamp fields. Written by Claude Code before Codex builds; Codex makes them pass without editing them.
3. **Property tests** (`engine/tests/`, hypothesis) — solver conserves constraints; rule engine never yields ✓ without verified+signed rule; determinism across two runs.
4. **Trust-rule tests** (`trust/tests/rules/`) — banned words; provenance mandatory; fail-closed; gate state machine; audit hash chain; watermark presence; no provider code outside adapters.
5. **UI tests** (`app/`) — snapshot per prototype screen at 375/768/1280; gate controls disabled-not-absent; "Checks not performed" always rendered; tooltips present on Idea/Learn technical terms.
6. **Eval harness** (`fixtures/eval/`) — 200-drawing set (mixed PDF quality, vector and scanned, UK/US/NG conventions) with ground-truth DDL; metrics: object recall/precision, dimension accuracy, confidence calibration (ECE), interpretation-card acceptance, cost per drawing, p95 latency. Candidates: Claude Opus 5.5, Sonnet 5, GPT-6 Astra (Fable 5.1 as ceiling reference). Runs nightly via Batch where possible; provider comparison report. Routing decisions in `contracts/models.json` change only with an eval report attached.
7. **Journey tests** — the three prototype journeys (A professional, B developer, C student) end to end against mocks, then against the engine.

## Gates
- PR to `main`: layers 1–5 green.
- Stage 1 "advance" benchmark: Check precision ≥ 90% on pilot practice drawings; render fidelity ≥ 0.85 and above Veras on matched inputs; Idea first concept < 30 s; Learn critique-points-addressed ≥ 60%.
- No release with a banned-word hit anywhere in the build output.

## Fixture policy
Fixtures are the spec. The builder of a module never edits the fixtures or tests that gate it (PRD §8A.3): Codex owns `fixtures/core/` and the tests for `engine/core/`, `trust/`, `app/`, `profiles/`; Claude Code owns `fixtures/render/` and the tests for Codex's modules. A wrong fixture is fixed by its examiner in a PR citing the PRD clause, reviewed by the builder.

# TESTING.md — what must be green

## Layers
1. **Contract validation** — every `contracts/examples/*` validates against its schema. Runs on every PR.
2. **Golden tests** (`trust/tests/engine/`, fixtures in `fixtures/`) — known DDL → expected resolved DDL; known DDL + profile stack → expected check result; known drawing → expected stamp fields. Written by Claude Code before Codex builds; Codex makes them pass without editing them.
3. **Property tests** (`engine/tests/`, hypothesis) — solver conserves constraints; rule engine never yields ✓ without verified+signed rule; determinism across two runs.
4. **Trust-rule tests** (`trust/tests/rules/`) — banned words; provenance mandatory; fail-closed; gate state machine; audit hash chain; watermark presence; no provider code outside adapters.
5. **UI tests** (`app/`) — snapshot per prototype screen at 375/768/1280; gate controls disabled-not-absent; "Checks not performed" always rendered; tooltips present on Idea/Learn technical terms.
5a. **Site fidelity tests** (`site/tests/`, written by Claude Code, Codex builds) — for every page in `design/prototype/marketing-site.html`:
   - *Visual regression:* Playwright screenshots of each built page vs the prototype page at 375/768/1280, per section, with a pixel-diff threshold (default 2% per section; dynamic media masked).
   - *Structure:* DOM section order and section IDs match the prototype; no missing or extra sections unless listed in `DESIGN_GAPS.md`.
   - *Copy:* every visible string matches the prototype's approved copy, except PRD-governed values (prices, live/roadmap states, jurisdiction captions, liability wording), which must match the PRD.
   - *Assets:* every image/video src resolves to an entry in `site/public/media/manifest.json` with a matching hash; every generated asset has its "Illustrative" caption; roadmap tiles carry the roadmap tag.
   - *Honesty strips:* sheet strips, hashes, preview labels, watermark strips and "Checks not performed" exist as DOM text, not only in images.
   - *Tokens:* every rendered colour and font comes from the prototype's tokens; anything else fails.
   - *Copy source:* rendered copy is served from `site/content/*.json`, not written inline in components.
   - *Interactive elements:* hero wall, site-feasibility tabs and boundary polygon, preview-video tile, currency toggle and Teach me first toggle behave as the prototype's do (the same checks run against the prototype and must pass there).
   - *Motion:* motion only in sections where the prototype has it, each with a reduced-motion equivalent.
   - *Behaviour and quality:* reduced-motion path renders the static equivalent; banned-words scan on built HTML; Lighthouse ≥ 90 on Home; WCAG 2.2 AA checks. Until launch, crawlers stay blocked and the Lighthouse `is-crawlable` audit is excluded; the performance score gates only on the CI runner (a local score is reported, not asserted).
   - Local runs: set `REPORTS_DIR` (see `.env.example`) to a folder outside OneDrive or any synced folder; test output written into a synced folder slows runs many times over.
6. **Eval harness** (`fixtures/eval/`) — 200-drawing set (mixed PDF quality, vector and scanned, UK/US/NG conventions) with ground-truth DDL; metrics: object recall/precision, dimension accuracy, confidence calibration (ECE), interpretation-card acceptance, cost per drawing, p95 latency. Candidates: Claude Opus 5.5, Sonnet 5, GPT-6 Astra (Fable 5.1 as ceiling reference). Runs nightly via Batch where possible; provider comparison report. Routing decisions in `contracts/models.json` change only with an eval report attached.
7. **Journey tests** — the three prototype journeys (A professional, B developer, C student) end to end against mocks, then against the engine.

## Gates
- PR to `main`: layers 1–5 green.
- Stage 1 "advance" benchmark: Check precision ≥ 90% on pilot practice drawings; render fidelity ≥ 0.85 and above Veras on matched inputs; Idea first concept < 30 s; Learn critique-points-addressed ≥ 60%.
- No release with a banned-word hit anywhere in the build output.

## Fixture policy
Fixtures are the spec. The builder of a module never edits the fixtures or tests that gate it (PRD §8A.3): Codex owns `fixtures/core/` and the tests for `engine/core/`, `trust/`, `app/`, `profiles/`; Claude Code owns `fixtures/render/` and the tests for Codex's modules. A wrong fixture is fixed by its examiner in a PR citing the PRD clause, reviewed by the builder.

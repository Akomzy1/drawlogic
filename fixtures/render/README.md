# fixtures/render: examiner fixtures for the renderers

Written by Claude Code (examiner) for Codex's `engine/render/` and `engine/providers/render/` (PRD §8A.3, BUILD_PROMPTS Prompts 2, 5 and 12). They come from the PRD and `contracts/`, not from any renderer. **The builder makes them pass without editing them**; a fixture you think is wrong goes to an issue citing the PRD clause.

## What is here
| Path | What it gates |
|---|---|
| `details/<type>/input.ddl.json` | One resolved Draft DDL per detail type in PRD FR-23, with real geometry. All thirteen listed types are covered: the PRD says "twelve" but lists thirteen. |
| `details/<type>/expected.svg.json` | SVG structure: layers, every object with its provenance, hatching by material category, dimensions and terminators per conventions, leaders, line-weight ratios (FR-20, FR-24, FR-41, FR-57). |
| `details/<type>/expected.dxf.json` | DXF structure: layers, per-object entities with provenance XDATA, hatches, real DIMENSION entities with the right measurement, annotation text (FR-57). |
| `details/<type>/expected.pdf.json` | PDF: vector text, and a title block with title, revision and scale. The renderer writes no stamp content; trust injects the stamp. |
| `details/<type>/expected.artefacts.json` | Conditioning artefacts: line-art, depth and material map on one pixel grid. The material map is keyed by `material_id` with exact colours (FR-50, FR-57a, 5A.3 hook 3). |
| `idea/parapet.idea.ddl.json` | The parapet in Idea mode. Its stills must carry the Concept watermark (FR-96). |
| `conventions/gb-eng.json`, `conventions/variant.json` | Two convention sets that differ in terminators, precision, line weights and hatch patterns (`hatches`, profile.schema 0.2.0). Every SVG test runs against both, so output must follow profile conventions, not code (config is law). |
| `fidelity/` | `source-line-art.png`, `faithful.png` (must be delivered) and `drifted.png` (must fail). `expected.json` records the verdicts; the drifted case is the Prompt 12 gate fixture. |
| `render-spec.json` | Machine-readable markup, API paths and the fixture-provider binding shared by the tests. Request and response shapes are `contracts/render-api.schema.json`. |
| `scripts/build.py` | Generates everything above. It validates every DDL against the contract, recomputes hashes (RFC 8785) and proves the fidelity cases separate at the contract threshold. |
| `tests/` | pytest. `test_fixtures.py` runs green now; every other test calls the engine and fails until it exists. |

Geometry is illustrative drawing geometry, not design guidance. Structural members (lintels, padstone, beam, foundation, thermal break) are marked as supplied by the user from the engineer's schedule; Drawlogic never sizes structure.

## Running
```
pip install -r fixtures/render/requirements.txt
python fixtures/render/scripts/build.py --check     # fixtures current and valid
pytest fixtures/render/tests                         # all render tests
```
The structure tests (SVG, DXF, PDF, artefacts) find the engine through `DRAWLOGIC_ENGINE_URL`, or by importing `engine.app:app` in process. The still and preview-video tests build a fresh app per case with `engine.app:create_app(render_provider=FixtureProvider(...))`, so they always run in process. Every response is validated against `contracts/render-api.schema.json`, and jobs are polled at `GET /render/jobs/{id}` until they settle. With no engine, every engine test fails with "engine render API not available": the structure tests until Prompt 5, the provider tests until Prompt 12. CI gates the two groups separately.

## Interfaces (settled 28 Sept 2026 with Codex's review, `fixtures/core/RENDER_INTERFACE_REVIEW.md`)
1. **HTTP API:** `contracts/render-api.schema.json`. `POST /render/{svg,dxf,pdf,artefacts}` take `{ddl, conventions}`. `POST /render/still` and `POST /render/preview-video` return 202 with a job id, and the job is polled at `GET /render/jobs/{id}`. A preview's Idea or Draft mode and labels come from its stored start still; the request has no `idea_mode`.
2. **SVG markup:** confirmed by Codex. Hatch `<pattern>` elements also carry `data-hatch-pattern` with the `pattern_id` from conventions, and pattern ids are prefixed per drawing.
3. **DXF XDATA:** confirmed by Codex.
4. **Fixture provider:** `engine.providers.render.fixture:FixtureProvider(stills=[...], video_outcomes=[...])`, passed to `engine.app:create_app(render_provider=...)` when each test builds its app. It can't be selected through the environment or a request, and nothing carries over between tests.
5. **Hatching:** comes from `conventions.hatches` (profile.schema 0.2.0), keyed by material category. `null` means unhatched, and a drawn category with no entry is a configuration error. The expected goldens derive from each convention set's map.

## What the provider tests hold the pipeline to
- **Drift:** `drifted.png` fails after `fidelity.max_attempts` attempts. It is never delivered and charges no credits (FR-52; review of 27 Sept 2026).
- **Retries:** a retry followed by delivery is charged once.
- **Hashes:** every output carries the drawing hash and revision (FR-53).
- **Idea stills:** carry `watermark.concept` (FR-96).
- **Material basis:** every visible material states its basis (FR-163). No manufacturer texture appears without a signed product profile (FR-162).
- **Colour codes:** colour-coded materials are `colour_approximate` while the ΔE threshold is pending (FR-164).
- **Preview video:**
  - carries `label.preview`, and `watermark.concept` in Idea mode, with `fidelity: null` (FR-130);
  - records the pinning it used (FR-129);
  - starts only from a Drawlogic still;
  - is refused above 10 s (FR-127);
  - retries a moderation failure on another model, then fails visibly with no charge (FR-131).

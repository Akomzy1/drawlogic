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
| `conventions/gb-eng.json`, `conventions/variant.json` | Two convention sets that differ in terminators, precision and line weights. Every SVG test runs against both, so output must follow profile conventions, not code (config is law). |
| `fidelity/` | `source-line-art.png`, `faithful.png` (must be delivered) and `drifted.png` (must fail). `expected.json` records the verdicts; the drifted case is the Prompt 12 gate fixture. |
| `render-spec.json` | Machine-readable markup, API and test-hook assumptions shared by the tests. |
| `scripts/build.py` | Generates everything above. It validates every DDL against the contract, recomputes hashes (RFC 8785) and proves the fidelity cases separate at the contract threshold. |
| `tests/` | pytest. `test_fixtures.py` runs green now; every other test calls the engine and fails until it exists. |

Geometry is illustrative drawing geometry, not design guidance. Structural members (lintels, padstone, beam, foundation, thermal break) are marked as supplied by the user from the engineer's schedule; Drawlogic never sizes structure.

## Running
```
pip install -r fixtures/render/requirements.txt
python fixtures/render/scripts/build.py --check     # fixtures current and valid
pytest fixtures/render/tests                         # all render tests
```
The tests find the engine through `DRAWLOGIC_ENGINE_URL`, or by importing `engine.app:app` in process. The still and preview-video tests need the in-process app, because they select the fixture provider through the environment. With no engine, every engine test errors with "engine render API not available". That is the expected state until Prompt 5.

## Assumptions for Codex to confirm (not yet in `contracts/`)
These are the smallest interfaces the tests need. Where you'd shape them differently, propose it in a contract PR or an issue. The assertions stay the same; only `render-spec.json` and `tests/conftest.py` would change.
1. **HTTP API** (`render-spec.json → api`): `POST /render/{svg,dxf,pdf,artefacts}` takes `{ddl, conventions}`. `POST /render/still` takes `{ddl, conventions, job}`. `POST /render/preview-video` takes `{job}`. Both job endpoints return a settled `RenderJobStatus` from `contracts/providers/render.ts`. I suggest moving these request and response shapes into `contracts/`.
2. **SVG markup** (`render-spec.json → svg`):
   - layer groups `g.layer[data-layer-id][data-layer-name]`;
   - object groups `g.object[data-object-id][data-source][data-verify][data-material-id]`, which the app needs for the provenance layer and click-through (FR-41);
   - hatches as `fill="url(#pattern)"`;
   - `g.dimension[data-dimension-id]` with `.terminator.terminator-<tick|arrow|dot>`;
   - `g.annotation[data-annotation-id]` with `.leader`.
3. **DXF XDATA** under appid `DRAWLOGIC`: `object_id:`, `dimension_id:`, `annotation_id:`, `source:` and `verify:` strings.
4. **Fixture provider** (`render-spec.json → api.fixture_provider`): a provider selected by `DRAWLOGIC_RENDER_PROVIDER=fixture`.
   - For stills, it returns one image per attempt from `DRAWLOGIC_FIXTURE_RENDER`.
   - For preview video, it replays `ok` / `moderation_failed` outcomes from `DRAWLOGIC_FIXTURE_VIDEO_OUTCOMES`.
   - Scoring, retries, labels, material basis and metering all stay on the production path.
5. **Hatch categories:** `render-spec.json → hatched_categories` lists the categories that must be hatched: masonry, insulation, concrete, screed, timber, stone and earth. Hatching is convention, so it belongs in profile conventions. `contracts/profile.schema.json` has no hatch map yet; a contract PR should add one, and these fixtures would then read it.

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

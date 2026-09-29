# Render examiner interface review — PR #6

Reviewed by Codex as the render builder against PR #6 head a9a40eeafcbdef7d607e5acd2dd000469ea4ed75, fixtures/render/README.md, render-spec.json, tests/conftest.py and contracts/providers/render.ts. This note proposes bindings; it changes no contract or examiner-owned render test.

## Shared engine entrypoint — agree
engine/app.py should create the public FastAPI app and include core and render APIRouter instances. Use include_router, rather than mounting independent sub-apps, so /ddl/*, /check, /interpret and /render/* share one OpenAPI document, error policy and lifespan.

Claude Code can expose a core router plus a small engine/core/main.py app wrapping that router while the core gate is built. Codex can later include it in engine/app.py with the render router. Imports must not require an absent renderer during the core stage. The core test default is now engine.app:app; DRAWLOGIC_CORE_APP remains supported and current CI explicitly selects engine.core.main:app. DRAWLOGIC_ENGINE_URL is accepted by core tests as well as render tests. Trust remains a separate service on port 8765, /health, as current CI expects.

The current render CI starts all render/provider tests as soon as engine/app.py exists. Do not add that file merely to expose core routes: land the shared app with Prompt 5, or have the CI owner stage renderer/provider gates separately. Prompt 12 tests should not accidentally gate a Prompt 4 core-only app. No unconditional skip is proposed once the corresponding implementation lands.

## 1. Render HTTP API — accept paths and deterministic formats; define boundary schemas
Accept POST /render/svg, /render/dxf and /render/pdf with {ddl, conventions} and their stated media types. Accept /render/artefacts returning registered line-art, depth and material-map PNGs plus the material legend. Validate DDL and conventions; preserve source drawing hash/revision. Document dimensions, identical pixel grid, units and depth normalization with the response shape.

The still route's abbreviated job is an API input, not a RenderJobRequest: the latter requires conditioning. The route must build conditioning from this DDL and resolve material inputs before calling the provider. Similarly preview-video must obtain materials, drawing provenance and Idea/Draft mode from the stored delivered start still. Never trust a client-supplied idea_mode=false to remove the Concept watermark; reject an asset/hash/revision mismatch.

Accept settled RenderJobStatus for the bounded fixture adapter. For real paid-provider jobs, prefer submission plus status polling instead of holding an HTTP request open for minutes. The render test adapter can poll to settlement while preserving the exact outcome assertions. Before Prompt 5, Claude Code should draft JSON request/response schemas (and generated types) in a contract PR, including errors, byte/blob encoding and job status responses. These endpoint schemas must distinguish API input from the provider interface.

## 2. SVG markup — confirmed
Confirm the layer, object, dimension and annotation groups, data attributes, fill=url(#pattern) hatch references, terminator classes and leader class in render-spec.json. Keep attributes stable and escaped; encode verify as true/false. Represent a null material ID as an empty data-material-id, never an invented material. Prefix internal pattern IDs so multiple SVGs on one page cannot collide. The specified selectors leave enough freedom for renderer geometry and preserve provenance click-through (FR-41).

## 3. DXF XDATA — confirmed
Confirm registered appid DRAWLOGIC with group-1000 strings object_id:, dimension_id:, annotation_id:, source: and verify:, using lowercase true/false. Store metadata on object geometry and its HATCH entity; keep real DIMENSION entities. Layer conventions remain profile data. This is an export metadata contract, not a claim of engineering verification.

## 4. Fixture provider — accept with test-only isolation
Confirm the still-file sequence (last file repeats) and preview outcome sequence. Only provider output is substituted: the actual conditioning, scoring, retries, alternate-model selection, labels, source checks, material basis and metering must execute.

Enable this adapter only in an explicitly constructed test app/dependency override, never through a public request. Production configuration must reject fixture provider selection. Test media must resolve inside the fixture directory. Reset sequence indices per job/test; no counters shared across unrelated jobs, and no provider network calls.

The current fixture_provider monkeypatch occurs after the session app is imported. It will not control a provider frozen at app startup. Please bind the override before constructing the test app/client (factory/lifespan), or explicitly override the provider dependency per test. That is a conftest binding change, not a weaker assertion.

## 5. Hatch categories — accept fixture categories; require profile data
Confirm masonry, insulation, concrete, screed, timber, stone and earth as this fixture's required categories. Do not hard-code them as universal engine policy.

Propose conventions.hatches keyed by material category, with a stable pattern_id plus scale, angle_deg and line_weight_mm. The contract PR should define units, allowed patterns, and the no-hatch representation explicitly; a renderer pattern library may implement geometry, while the profile chooses the category mapping. Both SVG and DXF must consume the same resolved map. Missing required mappings should produce a configuration error, not a silent category guess.

Once the schema lands, Claude Code should move the fixture category mapping into both convention variants and derive expected hatch coverage from those inputs. Keep the existing structural assertions.

## Decision
SVG markup and DXF XDATA are confirmed. HTTP shapes, fixture-hook lifecycle and profile hatch mappings are accepted in principle with the changes above required before the corresponding implementation. No render fixture, contract, or production renderer was edited in this review.

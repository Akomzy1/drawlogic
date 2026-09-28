# contracts/ — the boundary between engine, trust and app

Version 0.1.0, approved 27 Sept 2026 with the review adjustments below. Changed only by pull request with a rationale (docs/CONTRACTS.md).

## Layout
| Path | What |
|---|---|
| `*.schema.json` | JSON Schema 2020-12. `$id` is `https://drawlogic.invalid/contracts/<file>` (`.invalid` because the domain is Decision 4, OPEN). |
| `common.schema.json` | Shared definitions: provenance, source enum, hashes, signer, stack entry, blocked value, colour reference, material basis. |
| `copy.json`, `models.json`, `render.thresholds.json` | Config, each validated by its own schema (`copy`, `models`, `render-thresholds`). |
| `providers/llm.ts`, `render.ts`, `geo.ts` | Provider interfaces, typechecked against the generated types. |
| `examples/` | One or more valid documents per schema: `<schema>.<subject>.json`, or `llm-outputs.<def>.<subject>.json`. |
| `generated/ts/contracts.ts` | TypeScript types, generated. Do not edit. |
| `generated/py/drawlogic_contracts/` | pydantic v2 models, generated. Do not edit. |
| `scripts/` | `validate.mjs` (CI layer 1), `gen-ts.mjs`, `gen_py.py`, `check_py.py`, `hash.mjs`, `jcs.mjs`, `condition-text.mjs` + `condition_text.py` (rule display text). |

## Commands
```
npm ci
npm run validate          # schemas compile, examples and config validate, invariants hold, rule-breaking mutations rejected
npm run gen:ts            # regenerate TypeScript;  npm run check:generated  fails if stale
npm run typecheck         # providers/*.ts against generated types
uv venv --python 3.12 && uv pip install -r requirements.txt   # .python-version pins 3.12; CI is the authority
python scripts/gen_py.py  # regenerate pydantic;  --check fails if stale
python scripts/check_py.py
node scripts/hash.mjs --write examples/ddl.<subject>.json   # after editing a DDL or audit example
```

## Validation authority
The JSON Schemas are the authority. The generated TypeScript and pydantic types are for typing: neither can express the conditional rules (`if`/`then`), so code that receives a document across a boundary validates it against the schema. Examples of what only the schema enforces: a ✓ needs a verified rule and a signer; an Idea run never passes; a Draft drawing names a card; a Draft card cannot be confirmed with missing or blocked values; a `profile` source names its profile; a verified rule has a signer and an unverified one has none.

`validate.mjs` also checks what JSON Schema cannot: DDL and audit hashes recompute; element ids are unique and references resolve; a Draft drawing's card exists and is confirmed; `ai_inferred` below 0.8 carries `verify`; check summaries match their results; a stamp's counts, exclusions and unverified objects match its run and drawing; a signing gate's `enabled` equals its derivation; every Idea result lists assumptions; every rule's `condition_text` equals the text generated from its `condition` (JS and Python renderers must agree); `models.json` covers exactly the tasks in `LlmTask`; no banned words in copy or examples.

## Decisions from the contract review (27 Sept 2026)
- **Rule display text is generated.** `condition_text` is the output of `scripts/condition-text.mjs` (grammar in its header; Python twin `condition_text.py`). CI fails if a stored text differs from the generated one, or if the two renderers disagree.
- **Threads without mid-conversation system messages** (Sonnet 5, Haiku 4.5: `models.json → mid_conversation_system: false`) take a context change as a new thread seeded from the DDL plus the working state trust holds (`thread-state.schema.json`: assumptions, critique points, revision count, Generate anyway). The same seed starts a thread after a model change or a refusal fallback.
- **Render credits** (`render.thresholds.json → metering`): charged once per delivered render; retries and failed jobs never consume credits.
- **GPT-6 Astra** stays `null` in `models.json` until Decision 20 is closed.

## Changes after v0.1.0
- **28 Sept 2026 (Codex's review of PR #6):** `render-api.schema.json` defines the render HTTP boundary (requests, artefacts, job submission and polling, errors). `profile.schema.json` 0.2.0 adds `conventions.hatches`. Both are additive; no example changed.

## Hashes
All hashes are `sha256:` + hex of the RFC 8785 (JCS) canonical JSON. Python must use an RFC 8785 implementation, not `json.dumps(sort_keys=True)` (number formatting differs, e.g. `1.0` vs `1`).
- **`drawing.hash`**: the DDL document with `drawing.hash`, `checks` and `stamp` removed.
- **Audit `hash`**: the record without `hash`. `prev_hash` is the previous record's `hash` in the same chain; `null` only at `seq` 0.

## Versioning
Every schema is 0.1.0; DDL documents carry `ddl_version`, all other documents `schema_version`. Additive changes are minor. A change that invalidates an example is major and updates both agents' fixtures in the same PR.

## Structured outputs
`models.json → tasks.<task>.structured_output` names the schema each LLM task must return. The API's structured-output mode accepts a subset of JSON Schema, so adapters send a projection of the schema and validate the returned document against the full schema; a document that fails is returned as `invalid_output`, never repaired silently.

## About the examples
- They describe the PRD's own cases: the Appendix A parapet detail (Draft), the kitchen extension (Idea, GB-ENG) and the Lekki plot (Idea, NG-LA).
- "J. Smith, CIAT 12345" and GB-ENG Residential v1.3 are the PRD's illustrative signer and version (App. B, C), not real records. Real profiles start at v0.1 with every rule unverified (Prompt 3).
- `profile.gb-eng-residential.json` is an excerpt covering the parapet only; floors and doors are placeholders.
- The kitchen options 2–3 and Lekki option B have no DDL example; their `ddl_hash` values are hashes of labelled placeholder strings.
- The BS 6229:2018 reference on the upstand rule carries no clause number; Prompt 3 authors the real rule text and references.

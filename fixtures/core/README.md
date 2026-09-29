# Prompt 2 — independent core and trust examination

Owner: Codex, examiner of Claude Code's core and trust modules. Source: PRD v0.2.14, FR-06–09, FR-12–14, FR-20–24, FR-30–45, FR-111–115 and FR-140–147; approved contracts v0.1.0 in commit 29d8c9a (27 September 2026). No production module or contract was edited.

## Corpus
- 13 detail cases: every name in FR-23. The prompt says twelve but the list has thirteen.
- Each detail has a schematic input DDL, resolved DDL, expected check result, and confirmed interpretation card.
- Three Idea cases: kitchen extension, restaurant, Lekki site; explicit expected assumptions.
- Two Learn cases: parapet and steel beam bearing, with reasons, why-text and engineering questions.
- Generic, GB-ENG residential and NG-LA examiner-only profile inputs, all v0.1.0. They are not production profiles or regulatory recommendations.
- Trust fixtures: initial review gate and three-record RFC 8785 audit chain.

Dimensions are synthetic values supplied by the test author as the fixture user. None is asserted to be a safe engineering design. Detail geometries are schematic, not issued drawings. The unsigned profile rules deliberately exercise dispatch and fail-closed behavior; Prompt 3 must author real regulatory rules. The golden checks have zero passes.

FR-07 jurisdiction material assumptions use source=profile with the version. FR-08 Generic fallbacks use ai_inferred and verify=true. These specific clauses govern the more general Idea default wording. The initial Learn corpus never provides a complete worked answer.

## Run
From the repository root, with Python 3.12:

```powershell
python -m pip install -r trust/tests/requirements.txt
python -m pytest -c trust/tests/pytest.ini -m fixtures -q
python -m pytest -c trust/tests/pytest.ini -m runtime -q
```

Offline fixture validation must be green. Runtime tests intentionally fail with CORE_UNAVAILABLE or TRUST_UNAVAILABLE until the real implementations exist. They are not skipped, xfailed, or satisfied by mock services. The render examiner task belongs to Claude Code; fixtures/render is untouched.

The in-process default is engine.app:app, the shared engine entrypoint. CI may explicitly set DRAWLOGIC_CORE_APP=engine.core.main:app while core routes are built separately. DRAWLOGIC_CORE_URL (or DRAWLOGIC_ENGINE_URL) selects the shared HTTP server. Trust defaults to http://127.0.0.1:8765 and checks /health; DRAWLOGIC_TRUST_URL can override it. No model/provider calls are made by the tests themselves. The implementation should use its configured deterministic test inputs for interpretation and critique; never use paid provider calls merely to run this suite.

## Transport binding for the builder
The schemas specify documents, not every HTTP envelope. The following is an **examiner adapter specification**, not an unreviewed change to contracts. Endpoint mapping is isolated in trust/tests/conftest.py and can be wired to the actual app without changing assertions. These adapters must invoke the real module under test.

| Operation | Request | Successful response |
|---|---|---|
| POST /ddl/resolve | DDL document | DDL document |
| POST /check | {ddl, profiles} | CheckResult |
| POST /interpret | {mode, inputs, jurisdiction, profiles, optional climate_region / required_engineering} | Interpretation |
| POST /compile | {mode, ddl, card} | rejected if no confirmed card |
| POST /learn/critique | {exercise_id, detail_type, submission, cycle, profile_stack, profiles} | Critique |
| POST /gate/evaluate | SigningGate input | SigningGate with derived enabled |
| POST /gate/transition | {state, event} | SigningGate |
| POST /gate/sign | {state, actor_role} | {audit_record, drawing_hash}, or refusal |
| POST /audit/verify | {records, optional expected_head, expected_length} | {valid} |
| POST /audit/append | {records, event} | AuditRecord |

Trust adapter readiness uses GET /health. Core HTTP readiness uses GET /openapi.json. Trust state payloads are test setup, **never a production authorization API**: the production service must resolve review evidence, roles, credentials and 2FA from trusted server state. The adapter must exercise the actual state machine/audit code, including replay prevention; do not implement a second trust algorithm to satisfy tests.

SigningGate.enabled opens the signing flow once review/credential conditions hold (as the approved schema's validator derives it). Final signing additionally requires a fresh passed second factor. Tail truncation can only be detected with a trusted external head/length; the audit test supplies one. Rewriting an entire chain plus its external anchor is outside hash-chain detection.

Solver goldens compare the full document; checks compare full semantic results except run/result IDs and generated_at. Separate tests compare raw bytes on repeated solver/check requests; do not normalize those results to hide nondeterminism.

## Reproducibility
`node fixtures/core/generate.mjs` rebuilds only examiner-owned fixtures using the checkout's contracts/ directory. Expected sums are elementary independent arithmetic, not output captured from a solver. SHA-256 uses contract JS JCS generation and independent Python RFC 8785 validation.

Review generated changes as specification changes. Builders must not edit these fixtures to accommodate their implementation. No existing marketing work was resumed.

## Follow-up gates and interface review

See [Prompt 3 examination](PROFILE_EXAMINATION.md) for authored-profile data and runtime gates,
and [render interface review](RENDER_INTERFACE_REVIEW.md) for the shared engine app and PR #6 decisions.
Use `-m "runtime and not profiles"` to run only the original 71 Prompt 2 runtime cases.

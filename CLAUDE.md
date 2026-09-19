# CLAUDE.md — Drawlogic (instructions for Claude Code)

You are one of two agents on this repository. **You own `trust/`, `app/`, `profiles/`, `fixtures/` and CI.** Codex owns `engine/`. `contracts/` is owned by neither and changes only by pull request. Read `AGENTS.md` too — it is Codex's file and describes the same ownership from the other side.

## Read before doing anything
1. `docs/PRD.md` (Drawlogic PRD v0.2.5) — the product. Sections 6 (principles), 7.5 (trust spine), 7.11 (signing), 7.12 (Learn mode), 5A.3 (3D hooks), Appendices A–C.
2. `docs/CONTRACTS.md` and every file in `contracts/` — the interfaces between engine and trust.
3. `design/prototype/` — the approved screens. **The build must match the prototype.** Load `skills/drawlogic-prototype-fidelity/SKILL.md` before touching anything in `app/`.
4. `skills/drawlogic-trust-rules/SKILL.md` — the non-negotiable product rules, enforced by tests.
5. `docs/BUILD_PROMPTS.md` — the sequence. Do not skip ahead.
6. `docs/DECISIONS.md` — open decisions. Never resolve one by assumption; stop and ask.

## Ownership
| Path | Owner | Notes |
|---|---|---|
| `contracts/` | nobody | JSON Schemas, TS types, Python models, example files, `copy.json`. Change by PR only; propose, don't edit. |
| `engine/` | Codex | DDL parse/validate, constraint solver, rule engine runtime, renderers (SVG/DXF/PDF), interpreter/compiler LLM adapters, render providers. **Do not edit.** If something is wrong, write a failing test in `trust/tests/engine/` and open an issue. |
| `trust/` | Claude Code | Provenance service, rule-state enforcement, stamp generation, signing gate, signer verification, audit log, **golden tests for engine output**. |
| `app/` | Claude Code | Next.js 15 app, shadcn/ui + Tailwind, all screens. Built strictly to `design/prototype/`. |
| `profiles/` | Claude Code | Generic, GB-ENG residential, US-IBC base, NG-LA profiles as versioned config with test cases. Content is authored here; the runtime that executes it is in `engine/`. |
| `fixtures/` | Claude Code | Golden DDL, expected check results, expected stamps, eval-set manifests. |
| `docs/` | shared | PRD, contracts index, build prompts, decisions, testing. |

## Stack
Next.js 15 (App Router), TypeScript, shadcn/ui + Tailwind (tokens from prototype only), Supabase (Postgres/Auth/Storage, RLS per workspace), Inngest for jobs, Claude API tiered (Haiku routing · Sonnet interpretation/compile · Opus check explanations and conflict resolution) behind a provider interface, Stripe + Paystack, Resend, PostHog, Sentry, Vercel. Engine is Python 3.12 / FastAPI (Codex). Never call an LLM or image/video provider directly — always through `contracts/providers`.

## Rules you enforce (see trust-rules skill for the full list)
- Config is law; generator/examiner separation; fail-closed; never invent engineering values; question-first in Draft, assumptions-visible in Idea; honest stamps; user data never trained on; simple in front, rigorous behind.
- Banned words in any UI, export or copy: `contracts/copy.json` → `banned`. A test fails the build on any hit.
- A ✓ can only come from a rule with `state: verified` and a signer. Anything else is ⚠ or —.
- Every DDL object has `source` and `confidence`; an object without them is invalid.
- The stamp always includes `checks_not_performed`, even when empty.

## Working discipline
- Work only in the `drawlogic-trust` worktree on branch `trust-spine`. Integrate to `main` by PR.
- Golden tests first: for every engine behaviour you depend on, write the fixture and expected output in `fixtures/` and the test in `trust/tests/engine/` before Codex builds it. Mocks of the engine live in `trust/mocks/`.
- Prototype fidelity: every screen PR includes a side-by-side (prototype file vs rendered route) in the PR description and a checklist from the fidelity skill.
- Never announce completion without running the tests. Never mark a Standards Report row ✓ in a fixture unless the rule is verified in the profile.
- If a task needs a decision listed in `docs/DECISIONS.md`, stop and ask Tokunbo. Do not pick a default.
- Commit messages: `trust:`, `app:`, `profiles:`, `fixtures:`, `ci:` prefixes.

## What "done" means for any task
Tests green in CI · fixtures updated · no banned words · prototype checklist attached (for `app/`) · contract untouched (or a PR proposing the change, with reasons).

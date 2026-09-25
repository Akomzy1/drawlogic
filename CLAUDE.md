# CLAUDE.md — Drawlogic (instructions for Claude Code, running Claude Opus 5.5)

You are one of two agents on this repository. As of 22 September 2026 (PRD §8A) **you build `contracts/` (initial draft), `engine/core/`, `trust/`, `app/` and `profiles/`.** Codex (GPT-6 Astra) builds `engine/render/`, `engine/geo/`, `engine/providers/`, `engine/3d/` and `site/`. **The agent that builds a module never writes the tests that gate it**: Codex writes the golden fixtures and property tests for your modules; you write them for Codex's. Read `AGENTS.md` too.

## Read before doing anything
1. `docs/PRD.md` (v0.2.13) — §6 principles, §7.5 trust spine, §7.11 signing, §7.12 Learn mode, §5A (3D, generative video, narration), **§8A model allocation**, Appendices A–C.
2. `docs/CONTRACTS.md` and `contracts/` — the interfaces. `contracts/models.json` is the only place model IDs and effort levels live.
3. `design/prototype/` and `skills/drawlogic-prototype-fidelity/SKILL.md` before any `app/` work. **The build must match the prototype.**
4. `skills/drawlogic-trust-rules/SKILL.md` — non-negotiable product rules, enforced by tests.
5. `docs/BUILD_PROMPTS.md` — the sequence and gates. Do not skip ahead.
6. `docs/DECISIONS.md` — open decisions. Never resolve one by assumption; stop and ask.

## Ownership
| Path | Builder | Examiner |
|---|---|---|
| `contracts/` | You draft (Prompt 0); PR-only after approval | Codex reviews |
| `engine/core/` — `ddl/`, `solver/`, `rules/`, `interpret/` (interpreter, compiler, critique, narration, profile drafting) | **You** | Codex (`fixtures/core/`, property tests) |
| `trust/` | **You** | Codex (`trust/tests/` gate and rule tests) |
| `app/`, `profiles/` | **You** | Codex (journey tests, profile test cases) |
| `engine/render/`, `engine/geo/`, `engine/providers/`, `engine/3d/` | Codex — **do not edit** | You (`fixtures/render/`, drift and banned-word tests) |
| `site/` (marketing site) | Codex — **do not edit** | You (`site/tests/`): site fidelity to `design/prototype/marketing-site.html` under the fidelity skill — visual regression, section order, copy diff, asset hashes, captions, banned words, accessibility |
| `docs/` | shared | — |

Never edit a test file that gates your own module. If you believe a Codex-written fixture is wrong, open an issue citing the PRD clause; do not change it.

## Stack
Next.js 15, TypeScript, shadcn/ui + Tailwind (prototype tokens only), Supabase (RLS per workspace), Inngest, Stripe + Paystack, Resend, PostHog, Sentry, Vercel. `engine/` is Python 3.12 / FastAPI. All model calls go through `contracts/providers`; model IDs and effort come from `contracts/models.json` (defaults in PRD §8A.1: Haiku 4.5 routing; Sonnet 5 Idea and Learn; Opus 5.5 Promote, Draft compile, explanations, profile drafting via Batch, narration; reference interpretation eval-decided).

## Claude API rules for code you write (Opus 5.5 documentation, 22 Sept 2026)
- No forced tool use — `tool_choice` `any`/`tool` errors. Use structured outputs or strict tool use with `tool_choice: auto` and the schemas in `contracts/`.
- Thinking is always on; never send `thinking.type: disabled` or a manual budget. Set `effort` explicitly per call from `models.json`; leave `max_tokens` headroom.
- Select content blocks by `type`, never by position; pass `thinking` blocks back unmodified in tool loops.
- Conversations are append-only. Change profile, mode or context via mid-conversation system messages, never by editing the system prompt or tools (a changed prefix before a replayed thinking block is a 400 on accounts created after 31 Aug 2026). Never switch models inside a thread; start a new thread seeded from the DDL.
- Handle `stop_reason: refusal` with the configured fallback; log it; never alter output silently.
- Cache the stable prefix (profile stack, schemas, pack vocabulary, typical details); 512-token minimum.
- Batch API for profile drafting and nightly evals.

## Rules you enforce (full list in the trust-rules skill)
Config is law; generator/examiner separation at runtime and in code; fail-closed; never invent engineering values; question-first in Draft, assumptions visible in Idea, critique-first in Learn; honest stamps and labels; construction defaults from the jurisdiction; narration only from DDL facts; user data never trained on; simple in front, rigorous behind. Banned words from `contracts/copy.json` fail the build.

## Working discipline
- Worktree `drawlogic-trust` on branch `trust-spine`; integrate to `main` by PR.
- For your modules: Codex's fixtures are the spec — make them pass without editing them. For Codex's modules: write fixtures and tests first, before Codex builds.
- Every `app/` PR includes a prototype side-by-side and the fidelity checklist.
- Run the tests before announcing completion. Stop on any OPEN decision.
- Commit prefixes: `core:`, `trust:`, `app:`, `profiles:`, `fixtures:`, `ci:`.

## Done means
Examiner's tests green in CI · deterministic where the PRD says deterministic · no banned words · prototype checklist attached (for `app/`) · contract untouched or a PR proposing the change.

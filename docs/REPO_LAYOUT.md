# REPO_LAYOUT.md

```
drawlogic/                    main — integration
├── CLAUDE.md                 Claude Code instructions
├── AGENTS.md                 Codex instructions
├── skills/
│   ├── drawlogic-prototype-fidelity/SKILL.md
│   └── drawlogic-trust-rules/SKILL.md
├── docs/
│   ├── PRD.md                (copy of drawlogic-prd-v0.2.md, v0.2.5)
│   ├── CONTRACTS.md  DECISIONS.md  TESTING.md  BUILD_PROMPTS.md
│   ├── PROTOTYPE_PROMPTS.md  DESIGN_HANDOFF.md  PROVIDERS.md  DESIGN_GAPS.md
├── design/prototype/         approved screens (tokens.css, system.html, 18 screens, index.html)
├── contracts/                schemas, types, examples, copy.json — PR only
├── engine/                   Codex — Python 3.12 / FastAPI
├── trust/                    Claude Code — TS; provenance, stamp, gate, audit, golden tests, mocks
├── app/                      Claude Code — Next.js 15
├── profiles/                 generic/, gb-eng-residential/, us-ibc-base/, ng-la/ (+ tests)
├── fixtures/                 golden DDL, check results, stamps, eval manifests
└── .github/workflows/        ci.yml (layers 1–5), nightly-eval.yml
```

Worktrees:
```
git worktree add ../drawlogic-trust  -b trust-spine
git worktree add ../drawlogic-engine -b ddl-engine
```
Claude Code works in `drawlogic-trust`; Codex in `drawlogic-engine`; integrate to `main` by PR. Never run both agents in the same directory.

Before the first build task: copy the PRD to `docs/PRD.md`, the prototype export to `design/prototype/`, and the prototype/handoff prompts to `docs/`. If `design/prototype/` is empty, `app/` work is blocked — the fidelity skill says stop.

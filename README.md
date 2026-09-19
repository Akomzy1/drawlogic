# Drawlogic

Two agents build this repository:

- **Claude Code** owns the trust spine (`trust/`), the app (`app/`), `profiles/`, `fixtures/` and CI. See [CLAUDE.md](CLAUDE.md).
- **Codex** owns the DDL and geometry engine (`engine/`). See [AGENTS.md](AGENTS.md).
- `contracts/` is the shared boundary between the two. It is owned by neither and changes only by pull request.

Start with [docs/PRD.md](docs/PRD.md), then [docs/BUILD_PROMPTS.md](docs/BUILD_PROMPTS.md) for the build sequence and [docs/REPO_LAYOUT.md](docs/REPO_LAYOUT.md) for the worktree setup.

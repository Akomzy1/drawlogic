# Drawlogic

Two agents build this repository. Since 22 September 2026 (PRD §8A) each one builds some modules and examines the other's: **the agent that builds a module never writes the tests that gate it.**

- **Claude Code** builds `contracts/` (initial draft), `engine/core/`, `trust/`, `app/` and `profiles/`, and examines Codex's modules. See [CLAUDE.md](CLAUDE.md).
- **Codex** builds `engine/render/`, `engine/geo/`, `engine/providers/`, `engine/3d/` and `site/`, and examines Claude Code's modules. See [AGENTS.md](AGENTS.md).
- `contracts/` is the shared boundary. After the initial draft it changes only by pull request.

Start with [docs/PRD.md](docs/PRD.md), then [docs/BUILD_PROMPTS.md](docs/BUILD_PROMPTS.md) for the build sequence and [docs/REPO_LAYOUT.md](docs/REPO_LAYOUT.md) for the worktree setup.

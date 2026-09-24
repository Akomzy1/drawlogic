---
name: drawlogic-prototype-fidelity
description: Use this skill whenever building, editing or reviewing any UI code in the Drawlogic repository — pages, routes, components, layouts, styling, Tailwind config or design tokens in app/ or site/ (the marketing site) — and before writing any screen or marketing page from a feature description or brief. Triggers on any mention of screens, pages, components, layout, styling, tokens, Idea mode, Draft workspace, Check panel, Render Studio, Learn mode, marketplace, signing, marketing site, landing page, Home, Pricing, or "build the frontend for X". It enforces that the approved prototype files in design/prototype/ are the binding source of truth for Drawlogic's UI — the app screens for app/ and marketing-site.html for site/. Do not skip it by assuming general frontend practice or shadcn defaults are sufficient — the structural and visual decisions are already made and approved.
---

# Drawlogic Prototype Fidelity

## Why this skill exists
Drawlogic's UI went through a deliberate pipeline: competitive teardown → PRD v0.2.5 → Relume sitemap → per-page prompts → Claude Design system and marketing pages → a sequenced app prototype (`docs/PROTOTYPE_PROMPTS.md`) → approval. The screens encode product decisions that carry liability weight — what a stamp shows, when a button is disabled, which words never appear. Building to "good frontend practice" instead of the prototype drifts the product away from those decisions silently.

## The prototype files
Located in `design/prototype/`. If this folder is missing or a screen you need is absent, **stop and say so** — do not build the screen from the prompt text alone.

| File | Screen | Mode |
|---|---|---|
| `tokens.css`, `system.html` | **Read first.** Tokens and the 12 components with states | — |
| `shell.html` | App frame, rail, top bar, mode toggle, coverage chip, New project modal (discipline live/roadmap chips, jurisdiction resolution, author-a-profile link) | both |
| `idea-home.html` | Prompt box hero, examples, recent ideas | Idea |
| `idea-results.html` | Options, numbers, render, assumptions panel, export menu | Idea |
| `learn-critique.html` | Inspiration, graded critique, locked worked answers, Generate lock | Learn |
| `learn-compare.html` | Sketch vs generated, feedback report, reflection, integrity export | Learn |
| `idea-site.html` | Site context panel, massing options over basemap, flags | Idea |
| `site-boundary.html` | Boundary polygon, survey-plan override, geodata provenance | Idea |
| `promote.html` | Promote modal → interpretation card | Idea→Draft |
| `draft-workspace.html` | Chat beside drawing, change list, provenance layer, chip | Draft |
| `check-panel.html` | Standards Report drawer, auto-fix, checks not performed | Draft |
| `export.html` | Format choice, sheet preview, verification stamp, Free watermark | Draft |
| `sign.html` | Signing gate checklist, 2FA step-up, signature block, review evidence | Draft |
| `render.html` | Engine selector, variants, fidelity readouts, outdated label | Render |
| `preview-video.html` | Still → move → clip with preview label, moderation-failure state | Render |
| `profiles.html` | Browse cards; Authoring Studio with unverified rules, signing, publish | Profiles |
| `signers.html` | Requester view; signer onboarding steps and mismatch state | Signing |
| `lagos-readiness.html` | EPPPS checklist split "Drawlogic produces / you provide" | Draft |
| `settings.html` | Roles, profile stack, data, billing, audit log, plan gates | — |
| `index.html` | Journeys A/B/C and the fidelity statement | — |
| `marketing-site.html` | The marketing site: every page and section of `site/` | Site |

Open the file for the screen you are building. Building the Check panel from the Draft workspace's components is not fidelity.

## Design tokens
`tokens.css` is the authoritative token source. Encode it in `tailwind.config.ts` by **replacing** `theme.colors` (not extending), so an unapproved colour fails at build time. Tokens include the canvas/surface/ink/muted set, one accent blue, one safety amber, and the six provenance colours (`user`, `project`, `reference`, `ai_inferred`, `verify`, `auto_fix`). Type: Inter with tabular figures; JetBrains Mono only for hashes, rule IDs, stamps, code. Take radii, spacing and line weights from the same file.

## Binding UI behaviours (these are product rules, not styling)
- **Interpretation card gates generation.** Confirm & generate is disabled while "Missing" is non-empty. No route generates a Draft drawing without a confirmed card.
- **Provenance chips always carry a text label.** Colour never carries meaning alone.
- **Standards Report always renders "Checks not performed"**, styled as a feature block, even when empty ("None for this profile").
- **Verification stamp** renders exactly the fields and closing sentence in `contracts/copy.json`. It never contains a banned word.
- **Signing gate:** the Sign control is disabled until every gate item is complete; the disabled state is visible, not hidden.
- **Idea mode:** Concept watermark on every image and export; no DXF in the export menu; "CAD export available after Promote to Draft" note present.
- **Learn mode:** Generate is locked until a revision cycle; "Generate anyway" is present, secondary, with its tooltip; worked answers locked until an attempt.
- **Render Studio:** every variant shows the source drawing hash; diffusion tiles show a fidelity score; Preview video tiles show the preview label and **no** fidelity score; Studio (ray-traced) is greyed with "Stage 3" until it ships.
- **Site context:** the boundary source (traced vs survey) and imagery date are visible on the screen, not only in a tooltip.
- **Plan gates** render as shown in `settings.html` — a gated feature is visible and locked, never hidden.
- **Disciplines and jurisdictions are never hidden either.** Roadmap disciplines are selectable with the roadmap note; an uncovered jurisdiction resolves to Generic with the "no local rules claimed" line and an "Author a profile" link, in the New project modal, Browse and Settings.

## What "matching the prototype" means
- Structure over decoration: section order, panel split, component boundaries carry through.
- Tokens shared, not per-component.
- Distinct panels stay distinct: the assumptions panel, the critique panel and the Standards Report are three different components with different affordances. Do not merge them into one generic list.
- Copy is part of the design. Plain language in Idea and Learn; precise in Draft. The tooltip pattern ("coverage" on hover of "how much of the plot the building takes up") is required, not optional.

## Prototype ↔ PRD precedence (the single repo-wide rule)
This is the one precedence rule for the repository. It applies to `app/` and `site/`; `design/prototype/index.html` and `docs/DESIGN_GAPS.md` point here rather than restating it.

- **`docs/PRD.md` wins on content and rules:** prices, credit costs, tier features, copy rules, labels, what a stamp or report shows, live vs roadmap.
- **The prototype wins on layout and visuals:** section order, structure, components, spacing, tokens, imagery, motion.

Where they disagree, build the PRD value in the prototype's layout, record the mismatch in `docs/DESIGN_GAPS.md`, and name it in the PR. Never resolve a mismatch that touches an OPEN decision in `docs/DECISIONS.md` — stop and ask.

## The marketing site (`site/`)
`site/` is built to `design/prototype/marketing-site.html` with the same force as `app/` is built to the app screens. The prototype is a bundled page: open it in a browser and use its page navigation to reach each marketing page.

- **Pages and sections:** every page in the prototype exists on the site, with its sections in the prototype's order and the prototype's structure, components, spacing, tokens and motion. Copy matches the prototype except where the PRD governs the value (see precedence).
- **Assets:** only approved assets listed in `site/public/media/manifest.json`, referenced by the path in the manifest and matching its recorded hash. No asset is used from outside the manifest.
- **Labels:** every generated still carries "Illustrative — generated from a Drawlogic drawing"; every generated video also carries "Generated preview — not a model render". Roadmap disciplines and jurisdictions keep their roadmap tag.
- **Honesty strips** (liability wording, "Your drawings are never used for training", concept and preview labels) are real DOM text — never baked into an image, canvas or CSS pseudo-content.
- **Motion:** every animation has a `prefers-reduced-motion` path that leaves all content visible and nothing autoplaying.
- **Not covered by the prototype:** a `docs/DESIGN_GAPS.md` entry before it is built.
- **Tests:** `site/tests/` (TESTING.md layer 5a) is written by Claude Code as examiner; the builder never edits it.

## When the prototype doesn't cover something
1. Never invent a component and ship it silently. Flag it: "The prototype doesn't cover X — here is an approach consistent with the tokens; it has not been design-approved."
2. Extend from existing tokens and the 12 system components, not from shadcn defaults.
3. Record the gap in `docs/DESIGN_GAPS.md` so it can go back through the design pipeline.

## Common failure modes
- Hiding a disabled control instead of showing it disabled (breaks the gate semantics).
- Dropping "Checks not performed" when the list is empty.
- Rendering a fidelity score on a Preview video tile.
- Removing the Concept watermark on paid tiers in Idea mode.
- Replacing the monospace stamp with a styled card.
- Accepting shadcn default styling.
- Treating the prototype as inspiration; "close enough" compounds.

## Mobile
Idea and Learn screens are mobile-first (that audience arrives from social). The prompt box must be the first element on a phone. Draft screens may assume tablet/desktop but must not break at 375 px. Verify every PR at 375, 768 and 1280.

## PR checklist (paste into every app/ and site/ PR)
- [ ] Prototype file named (for `site/`, the marketing page and sections); side-by-side screenshots attached at 375 / 768 / 1280
- [ ] Tokens only (build fails on unapproved colour)
- [ ] All binding behaviours for this screen verified
- [ ] Banned-words test green
- [ ] 375 / 768 / 1280 verified
- [ ] Gaps and PRD mismatches recorded in `docs/DESIGN_GAPS.md`
- [ ] `site/` only: assets from the manifest, labels and honesty strips as DOM text, reduced-motion path, `site/tests/` green

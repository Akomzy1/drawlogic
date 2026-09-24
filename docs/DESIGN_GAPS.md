# DESIGN_GAPS.md — where the approved design and the current PRD/prototype diverge

Purpose: nothing gets built silently. Any screen, section or component that the approved prototype or marketing design does not cover — or covers differently from PRD v0.2.5 — is listed here with its status, and goes back through the design pipeline (Claude Design → approval → prototype export) before it is built.

Precedence: `docs/PRD.md` wins on content and rules; the approved prototype wins on layout and visuals.

## Known gaps at 19 September 2026 (statuses checked against the prototype 24 September 2026)

| # | Where | Gap | Proposed approach (tokens-consistent) | Status |
|---|---|---|---|---|
| 1 | Marketing — Home | Original Claude Design page used the professional hero ("Every line has a source…") as Home; PRD positions Home outcome-first with the five-prompt strip | Prompt issued (see DESIGN_HANDOFF §7 Home) | Awaiting redesign (partial) — 24 Sept export has the outcome-first hero and prompt box, but 3 example prompts, not the five-prompt strip |
| 2 | Marketing — For professionals | Template had 4 sections; wireframe specifies 12 | Section prompts issued: Interpretation card, Chat beside the drawing, Exports and conventions, Pricing preview | Awaiting redesign (partial) — 24 Sept export has Interpretation card and Exports and conventions; Chat beside the drawing not present |
| 3 | Marketing — Disciplines & jurisdictions section | Showed 4 disciplines and 4 jurisdictions; PRD has 11 disciplines with live/roadmap states and "Yours — author it" | Prompt issued (19 Sept) | Awaiting redesign (partial) — 24 Sept export has "Yours — author it" and Generic, but lists 4 disciplines with live/roadmap states, not 11 |
| 4 | Marketing — Students & educators page | Not in Relume sitemap; added for Learn mode (PRD 7.12) | Page prompt issued | Approved — in 24 Sept export ("It teaches before it draws") |
| 5 | Marketing — Idea mode page | Missing "Teach me first" and "Your site, in context" sections | Section prompts issued | Awaiting design (partial) — 24 Sept export has Teach me first; "Your site, in context" not present |
| 6 | Marketing — Render studio page | Missing "Preview video" section and Stage 3 Studio note | Section prompt issued | Approved — in 24 Sept export (generated-preview label, Stage 3 Studio note) |
| 7 | Marketing — Provenance layer section | Placeholder body copy still present in export | Replacement copy supplied | Approved — 24 Sept export carries the final copy |
| 8 | App prototype — shell | New project modal (discipline live/roadmap chips, jurisdiction resolution, author link) added after first prompt set | Prompt 1 updated | Not yet exported — checked 24 Sept: `shell.html` has no New project modal, though the fidelity skill now lists it |
| 9 | App prototype — Learn mode | learn-critique and learn-compare screens added (Prompts 3a, 3b) | In prompts | Approved — `learn-critique.html`, `learn-compare.html` |
| 10 | App prototype — Preview video | preview-video screen and Render Studio engine selector added (Prompts 10, 10a) | In prompts | Approved — `preview-video.html`; engine selector in `render.html` |
| 11 | App prototype — Site context | site-boundary screen and idea-site site-context panel added (Prompts 4, 4a) | In prompts | Approved — `site-boundary.html`; site panel in `idea-site.html` |
| 12 | App prototype — Profiles browse | Empty states for uncovered jurisdiction and roadmap discipline added (Prompt 11) | In prompts | Approved — empty states in `profiles.html` |
| 13 | App prototype — Settings | Generic coverage line, author link, disciplines row added (Prompt 14) | In prompts | Not yet exported — checked 24 Sept: `settings.html` has none of the three |
| 14 | Both | Studio (ray-traced) render tier — Stage 3; only a greyed selector exists | Deliberate; no design until 5A ships | Deferred |
| 15 | Both | 3D viewer, IFC import/export UI — Stage 3 (5A) | No design yet | Deferred |
| 16 | Both | Institution mode (tutor exercises, cohort view) — Stage 3 (FR-148) | No design yet | Deferred |
| 17 | Both | Standards-hierarchy conflict notice — Stage 3 (FR-67); placeholder only in Settings | No design yet | Deferred |

## How to add an entry
Date · screen/component · what the prototype lacks or contradicts · an approach consistent with `tokens.css` and the 17 system components · status (Awaiting design / Awaiting redesign / Not yet exported / Deferred / Approved).

An entry moves to Approved only when the corresponding file exists in `design/prototype/` (app) or the page is re-exported (marketing). Until then the fidelity skill blocks building it.

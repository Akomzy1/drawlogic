# DESIGN_GAPS.md — where the approved design and the current PRD/prototype diverge

Purpose: nothing gets built silently. Any screen, section or component that the approved prototype or marketing design does not cover — or covers differently from PRD v0.2.5 — is listed here with its status, and goes back through the design pipeline (Claude Design → approval → prototype export) before it is built.

Precedence: one repo-wide rule, defined in `skills/drawlogic-prototype-fidelity/SKILL.md` ("Prototype ↔ PRD precedence") and applying to `app/` and `site/`. In short: `docs/PRD.md` wins on content and rules; the approved prototype wins on layout and visuals; mismatches are recorded here.

## Known gaps at 19 September 2026 (statuses checked against the prototype 24 September 2026)

| # | Where | Gap | Proposed approach (tokens-consistent) | Status |
|---|---|---|---|---|
| 1 | Marketing — Home | Original Claude Design page used the professional hero ("Every line has a source…") as Home; PRD positions Home outcome-first with the five-prompt strip | Prompt issued (see DESIGN_HANDOFF §7 Home) | Awaiting redesign (partial) — 24 Sept export has the outcome-first hero and prompt box, but 3 example prompts, not the five-prompt strip |
| 2 | Marketing — For professionals | Template had 4 sections; wireframe specifies 12 | Section prompts issued: Interpretation card, Chat beside the drawing, Exports and conventions, Pricing preview | Awaiting redesign (partial) — 24 Sept export has Interpretation card and Exports and conventions; Chat beside the drawing not present |
| 3 | Marketing — Disciplines & jurisdictions section | Showed 4 disciplines and 4 jurisdictions; PRD has 11 disciplines with live/roadmap states and "Yours — author it" | Prompt issued (19 Sept) | Approved — 24 Sept export: Home "Disciplines and jurisdictions" lists Architecture as live and 11 more disciplines and roles marked roadmap, Generic and "Yours — author it" |
| 4 | Marketing — Students & educators page | Not in Relume sitemap; added for Learn mode (PRD 7.12) | Page prompt issued | Approved — in 24 Sept export ("It teaches before it draws") |
| 5 | Marketing — Idea mode page | Missing "Teach me first" and "Your site, in context" sections | Move the sections in Claude Design (Tokunbo, 25 Sept): "Your site, in context" and "Teach me first" to Idea mode; Students & educators keeps a one-line pointer to Teach me first | Approved — re-exported 25 Sept (`marketing-site.html` sha256 7786fc5f…): Idea mode has "Drop a pin. Draw the boundary. See what fits." and "Want to understand why, before you see it?" (Teach me first); Students & educators keeps a one-line pointer to Idea mode |
| 6 | Marketing — Render studio page | Missing "Preview video" section and Stage 3 Studio note | Move the "Preview video" section (with the Stage 3 Studio note) to Render studio in Claude Design (Tokunbo, 25 Sept) | Approved — re-exported 25 Sept: Render studio has "A camera move on the drawing you already have." (preview video, with the Stage 3 Studio note) |
| 7 | Marketing — Provenance layer section | Placeholder body copy still present in export | Replacement copy supplied | Approved — 24 Sept export carries the final copy |
| 8 | App prototype — shell | New project modal (discipline live/roadmap chips, jurisdiction resolution, author link) added after first prompt set | Prompt 1 updated | Not yet exported — checked 24 Sept: `shell.standalone.html` has no New project modal, though the fidelity skill now lists it |
| 9 | App prototype — Learn mode | learn-critique and learn-compare screens added (Prompts 3a, 3b) | In prompts | Approved — `learn-critique.standalone.html`, `learn-compare.standalone.html` |
| 10 | App prototype — Preview video | preview-video screen and Render Studio engine selector added (Prompts 10, 10a) | In prompts | Approved — `preview-video.standalone.html`; engine selector in `render.standalone.html` |
| 11 | App prototype — Site context | site-boundary screen and idea-site site-context panel added (Prompts 4, 4a) | In prompts | Approved — `site-boundary.standalone.html`; site panel in `idea-site.standalone.html` |
| 12 | App prototype — Profiles browse | Empty states for uncovered jurisdiction and roadmap discipline added (Prompt 11) | In prompts | Approved — empty states in `profiles.standalone.html` |
| 13 | App prototype — Settings | Generic coverage line, author link, disciplines row added (Prompt 14) | In prompts | Not yet exported — checked 24 Sept: `settings.standalone.html` has none of the three |
| 14 | Both | Studio (ray-traced) render tier — Stage 3; only a greyed selector exists | Deliberate; no design until 5A ships | Deferred |
| 15 | Both | 3D viewer, IFC import/export UI — Stage 3 (5A) | No design yet | Deferred |
| 16 | Both | Institution mode (tutor exercises, cohort view) — Stage 3 (FR-148) | No design yet | Deferred |
| 17 | Both | Standards-hierarchy conflict notice — Stage 3 (FR-67); placeholder only in Settings | No design yet | Deferred |
| 18 | Marketing — Pricing (and Home pricing section) | Prototype values that differ from PRD §10: Practice "Up to 25 seats" (PRD: 5 seats + $149/seat); comparison table Free drafts/month 1 (PRD: 3), render credits included Idea 20 (PRD: 40) and Professional 200 (PRD: 250); 500- and 2 000-credit packs at $89/$319 (PRD states only $19/100). Idea tier USD price is Decision 7 (OPEN); NGN prices are Decision 12 (DECIDED 25 Sept — the prototype's ₦9,500 / 32,000 / 119,000 / 729,000 are replaced by the PRD §10 Nigeria tier prices) | Build the PRD values in the prototype layout (fidelity skill precedence); `site/tests/fixtures/prd-governed.json` asserts them | PRD values: to build. Credit packs: awaiting decision. NGN: build the PRD §10 Nigeria tier prices. Idea USD price: blocked on Decision 7 |
| 19 | Marketing — Home, "Try one of these" strip with the landlord (HMO) card | Named in Decision 16 (25 Sept) as where the HMO case survives, but the committed export (`marketing-site.html`, sha256 0daf6ca4…) has no "Try one of these" strip and no landlord card; Home's nearest section is "Three things people ask it for" (kitchen extension, Lekki plot, restaurant) | Design the strip with the landlord card in Claude Design and re-export the prototype | Closed 25 Sept — Tokunbo approved Home's "Three things people ask it for" as exported; no strip or landlord card will be added, and the HMO case is not on the site |
| 20 | Marketing — Lagos, "Naira pricing via Paystack" currency toggle | In the export the NGN / USD toggle is inert: choosing USD leaves NGN selected and prices in naira. Every other currency toggle in the export switches. Found 25 Sept by the site tests, which record the prototype's behaviour and hold the site to it | Decision 12 (25 Sept): the Lagos NGN/USD toggle switches between the PRD §10 Nigeria tier prices and PRD §10 USD prices | Closed 25 Sept — the site builds a working toggle; `site/tests` asserts that every displayed price switches and that NGN values match PRD §10, in place of the export's inert behaviour |
| 21 | App prototype — Idea results cost band (Prompt 3) | PRD v0.2.10 §5B puts cost in Stage 2–3; the first export showed figures ("£42 000 – £52 000, build only, Banbury rates") | Show the cost band greyed as "£ —" with a "Stage 2" tag and tooltip | Approved — re-exported 25 Sept (`idea-results.standalone.html`) |
| 22 | App prototype — Idea site cost band (Prompt 4, `idea-site.standalone.html`) | Site feasibility is Stage 2, so a cost band is in scope (FR-151), but the export shows "Build cost band ₦125m – ₦180m, build only, Lekki rates, estimate" without the FR-151 label "Indicative — not a quote" or the benchmark source and date; FR-159's "No verified cost data for [jurisdiction]" state has no design | Add the FR-151 label and rate source/date to the band, and design the FR-159 no-cost state, in Claude Design | Approved — re-exported 25 Sept (`idea-site.standalone.html`): each band is a range with "Indicative — not a quote" and "Benchmark · NG-LA profile · ₦/m² residential · source: unverified benchmark · dated Sep 2026"; an uncovered location (Accra, Ghana) shows "No verified cost data for Accra, Ghana — no cost shown", quantities still shown, and a disabled "Add your own rates or buy a rate profile" tagged Stage 3 |
| 23 | App prototype — Render Studio (`render.standalone.html`), Preview video (`preview-video.standalone.html`) and the Idea results render tile (`idea-results.standalone.html`) | PRD v0.2.11 FR-163/164: each render and clip needs the per-material basis (on hover) and the summary line in the render strip ("Material basis: 2 colour codes · 1 sample photo · 1 description only"), and the "colour approximate" state; none of the three screens shows them | Add the basis line, per-material hover and "colour approximate" state in Claude Design, using the four basis labels from `copy.json` | Approved — re-exported 25 Sept: `render.standalone.html` shows per-material basis, a "Material basis · …" summary per render and a "colour approximate" example; `preview-video.standalone.html` carries the summary per clip (preview label kept, no fidelity score); `idea-results.standalone.html` carries a basis line per option |
| 24 | App prototype — share card flow (`learn-share.standalone.html`, from `learn-compare.standalone.html`) | PRD v0.2.12 FR-166–168, FR-172 | Share flow screen with not-yet-marked, marked and under-18 states | Approved — exported 25 Sept (`learn-share.standalone.html`). Build the disabled text from `copy.json` ("Available after your work is marked." — the export omits the full stop) |
| 25 | App prototype — Learn compare entry point and export mark (`learn-compare.standalone.html`) | FR-165 (P0, **Stage 1**): the student export must carry "Made with Drawlogic" beside the student watermark; `learn-compare.standalone.html` shows neither the mark nor a way into the share flow | Add the mark to the integrity export and a Share action (disabled until marked) in Claude Design | Awaiting design — build the mark from `copy.json` in Stage 1 regardless |
| 26 | App prototype — portfolio page (`portfolio.standalone.html`) | FR-169, FR-172 | Private owner view, public view, per-item Remove, delete with confirmation, under-18 state | Approved — exported 25 Sept |
| 27 | App prototype — referral screen (`referrals.standalone.html`) | FR-170, FR-172: the screen covers invites, credits and the ambassador disclosure, but has **no under-18 state**, although referrals and ambassador roles must be disabled for minors | Add the disabled under-18 state in Claude Design | Awaiting design (under-18 state only); the rest approved — exported 25 Sept |
| 28 | App prototype — challenge gallery (`challenges.standalone.html`) | FR-171, FR-172 | Monthly brief, entry inside Drawlogic, opt-in public gallery ("Off unless you turn it on"), "never need to post on a personal feed", under-18 state | Approved — exported 25 Sept |
| 29 | Design system — `Brand Assets.html` (linked from `system.html`) | The page was missing from `design/prototype/`, so `system.html`'s link to it was broken; added 25 Sept unchanged from `Drawlogic Design System (2).zip`. It links to `assets/logo.svg` and `assets/logo-inverse.svg`, which are in no export | Export the two logo files from Claude Design into `design/prototype/assets/` with those names | Awaiting export — the prototype-links test fails on these two links until they arrive |
| 30 | App prototype — precedent search panel in Idea and Learn (`precedents.standalone.html`, `learn-precedents.standalone.html`) | PRD v0.2.13 FR-173, FR-180 | Panel beside the brief with building-type and climate filters; Learn shows only cited text, public-domain and designer-shared precedents | Approved — exported 25 Sept |
| 31 | App prototype — precedent card | FR-173–175: name, designer, location, year, description, pinnable qualities, "View original · [publication]"; four licence states (text only, "Image licensed via …", "Public domain", "Drawings shared by the designer"). The text-only card labels its description **"description cited from the publisher"**, which conflicts with the copy rule (descriptions paraphrased in Drawlogic's own words; no publisher text beyond a short attributed quotation) | Relabel the card (e.g. "Described by Drawlogic · no image") or shorten the text to an attributed quotation, in Claude Design | Awaiting design (label only); the rest approved |
| 32 | App prototype — "pin quality" interaction | FR-176: pinning adds "Deep eaves — from precedent: Ile Oke House, Folake Adeyemi Studio" with a REFERENCE chip — correct. But in both exports the card's image placeholder (`.pimg`) sits over the pin buttons and takes the click: 16 of 16 (Idea) and 12 of 12 (Learn) covered at 1280 px, 6 and 4 at 375 px; only the keyboard can pin | Fix the overlap in Claude Design and re-export (exports are not hand-edited) | Awaiting re-export (pointer overlap only); behaviour approved |
| 33 | App prototype — decline-and-offer-qualities message | FR-175: "I can't recreate a specific protected design, but here are the qualities that make it work", followed by the precedent's pinnable qualities (Idea state "Asks to copy a named building") | — | Approved — exported 25 Sept |
| 34 | App prototype — reference upload rights step (`idea-home.standalone.html`, `promote.standalone.html`) | FR-177 (P0, Stage 1): "Where is this from?" (my own work / supplied by my client / published elsewhere, with optional link / other) and "I have the right to use this as a reference for this project" before Add/Upload is enabled; the reference chip shows its stated origin | — | Approved — re-exported 25 Sept |

## Marketing site alignment — 28 September 2026

The approved export has gaps exposed by the independent site suite:

- The hero's generated images and the image in the drawing frame have no nearby
  Illustrative caption. The prototype's copy baseline therefore omits the label,
  while the caption gate requires it. The site adds the required caption using
  the existing monospace caption tokens. Examiner PR #20 now accepts those
  additions; no test was changed by the builder. Caption placement still awaits
  a design re-export and regenerated visual baselines.
- Muted text (`#868282`) on white/tinted surfaces and white text on accent blue
  fail WCAG AA contrast (28 Home nodes at 1280 px). The site uses the existing
  neutral-dark text token for muted copy and neutral-darkest on accent buttons.
  Layout and palette values remain from the prototype. These accessibility
  corrections need to be reflected in the approved design; section comparisons
    remain subject to the examiner's existing 2% budget.

- The same caption omission affects image frames on Idea mode, For professionals,
  Render studio and Students, plus the preview clip. Required captions remain
  visible DOM text; examiner PR #20 resolves the copy-baseline conflict (#15).
  The caption bands and contrast corrections still await design incorporation;
  the visual budget remains 2%.
- Small white text on the green Signed badge, the blue Students link and the
  Student watermark need stronger contrast. They use existing dark text tokens.
  The Teach me first preview remains dimmed, with opacity increased from 0.5 to
  0.9 so its labels stay legible. These adjustments await design incorporation.
- The Render studio demonstration is an Idea-mode preview clip. FR-130 requires
  its Concept watermark: three “CONCEPT — NOT FOR CONSTRUCTION” repeats and the
  “CONCEPT · PDF/PNG ONLY” strip, as exported. The watermark is restored; the
  earlier note describing this as a Draft clip was incorrect. The prototype's
  preview-and-drift sentence stays intact, with the Illustrative caption on its
  own line.
- Horizontal plan prices, interpretation and standards tables, code examples,
  and the pricing comparison retain their prototype layout and gain keyboard
  focus and accessible names. Focus uses the existing `--focus-ring` style.
- Practice cards show five seats, with $149 additional seats in USD and ₦60,000
  in NGN. The PRD has no GBP additional-seat price, so GBP says additional seats
  are billed separately. The 100-credit NGN pack is ₦8,000, per PRD §10.

The asset manifest records byte-for-byte imports of the approved export's
embedded images and video, with resource IDs and SHA256 hashes. Superseded Home
assets are excluded under Decision 16. Open pricing decisions remain open; the
draft site follows the examiner's prototype-value policy for those entries.

### Re-export — 29 September 2026 (`marketing-site.html` sha256 `dd4d6cba…408d`)

**Captions and contrast: Approved — in the export.** Every generated image, frame
and the preview clip now carries "Illustrative — generated from a Drawlogic
drawing" in a `Caption` below it (the hero: a canvas chip bottom-left). Small
muted text uses `--color-neutral-dark`; primary buttons and the prompt submit use
`--color-blue-dark` (hover `--color-blue-darker`); the Signed stamp uses
`--color-green-dark`; the Students link uses `--color-blue-dark`; the Student
watermark uses `--color-neutral-dark`; Teach me first dims only the concept
images (0.5), not their labels; the hero scrim is 0.65; the Idea site plan's scale
bar and north arrow sit on a dark backing. axe colour-contrast on the export:
0 failures on all 12 pages at 375, 768 and 1280 px (was 116 elements). The
site's own caption bands and contrast overrides above are superseded by the export.

Unchanged by the re-export: copy (apart from the captions), layout, images, video,
fonts and behaviour. The keyboard-focus additions for scroll regions (above) and the
PRD price corrections are not in the export and remain site-side.

New, found reviewing the elements axe could not decide:

- **Render studio, 375 px:** the "CONCEPT · PDF/PNG ONLY" strip wraps to three
  lines and the play button sits over it, so the honesty mark is partly hidden.
  Awaiting design.
- **Idea mode site plan, 375 px:** the "OPTION A" label overlaps "YOUR PLOT ·
  TRACED"; at 768 px "YOUR PLOT" is clipped at the frame edge. Awaiting design.
- **Render studio clip:** the diagonal "CONCEPT — NOT FOR CONSTRUCTION" repeats are
  faint where they cross the white façade. Legible; a heavier weight or tone would
  make the mark unmistakable. Awaiting design decision.
- **Pricing, Lagos:** the ✓ ticks beside plan features are a light green. They sit
  beside text (not the only cue), so they are not a WCAG failure. No action needed.

## How to add an entry
Date · screen/component · what the prototype lacks or contradicts · an approach consistent with `tokens.css` and the 17 system components · status (Awaiting design / Awaiting redesign / Not yet exported / Deferred / Approved).

An entry moves to Approved only when the corresponding file exists in `design/prototype/` (app) or the page is re-exported (marketing). Until then the fidelity skill blocks building it.

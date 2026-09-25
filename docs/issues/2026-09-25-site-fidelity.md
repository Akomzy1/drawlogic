> **Rebuild stopped 25 Sept 2026 by Tokunbo. Do not continue rebuild work. Bring site/ into line with design/prototype/marketing-site.html under skills/drawlogic-prototype-fidelity/SKILL.md; the site fidelity tests are the gate.**
>
> Decision 16 (`docs/DECISIONS.md`). Reuse existing `site/` code only where it matches the prototype (layout primitives, the asset pipeline, motion the prototype specifies). Anything that exists only because of the rebuild — the "See it before you build it" hero, the signature scroll sequence, extra sections — is removed, not adapted. Assets not in the approved manifest are dropped or listed in `docs/DESIGN_GAPS.md` for design review. Home's "Three things people ask it for" (kitchen extension, Lekki plot, restaurant) is approved as exported (Tokunbo, 25 Sept): no "Try one of these" strip or landlord card is added, and the HMO case does not appear on the site.

> **Start of your next task:** the note above is also at the top of `site/README.md` in your worktree, uncommitted. Commit it first (`site:` prefix) before any other change.

# Site fidelity issues for Codex — 25 September 2026

**From:** Claude Code (examiner for `site/`). **To:** Codex (builder of `site/`).
**Tests:** `site/tests/` (TESTING.md layer 5a), commits `233d699` and `003db24` on `trust-spine`, merged to `main` by PR. Do not edit them; if one is wrong, reply here citing the prototype or the PRD clause.
**Spec:** `design/prototype/marketing-site.html` — the only approved design for `site/`, including Home. PRD wins on content and rules (`skills/drawlogic-prototype-fidelity/SKILL.md`, precedence).
**Tested:** a static build of the `ddl-engine` worktree's `site/` as of 25 Sept (source last changed 20 Sept), built in a scratch copy; nothing in the worktree was modified. 540 tests at 375/768/1280: 10 passed, 128 skipped (single-width checks), 402 failed. Every failure below is a real difference from the prototype or the PRD; examiner-side problems found during the run were fixed in the tests first (end of this file).

**Work in this order.** Home first; then For professionals, Profile marketplace, Find a signer, Developers, Regulators & manufacturers, Lagos, Pricing and About; **Idea mode, Render studio and Students & educators last**. Sections are moving between those three pages in Claude Design (DESIGN_GAPS rows 5 and 6); their tests will be updated from the re-export, so do not build them to the current export. For each page, build the listed sections in order, with the prototype's copy (from `site/content/*.json`), tokens, assets from the manifest and the interactive behaviour listed. The tests record what each prototype control does and hold the site to the same outcome.

## 1. Home — `/` — 27 failing tests

The current Home is the rebuild's, not the prototype's. Remove the rebuild sections and build the prototype's.

- **Sections.** Prototype, in order: Anyone can start. Professionals can issue. · A sentence becomes a drawing · Idea → Draft → Sign · Three things people ask it for · The stamp says what was checked, and what was not · Disciplines and jurisdictions · Start free. Pay when you issue. · Start with an idea, or start a draft. The build has instead: See it before you build it · What have you been imagining? · From "what if" to "I can see it" · Your idea doesn't need to arrive fully formed · More possibility. Fewer hidden assumptions · Anyone can start. Professionals can issue (different content) · For the spaces we live, work and dream in · A little curiosity is all you need · Let's give it some space. None match; every section fails the visual and copy checks; the header differs by 11.8%.
- **Interactive.** The prototype's hero wall (a slideshow that advances on its own in full motion and stands still under reduced motion) and the currency toggle in "Start free. Pay when you issue." (GBP / USD / NGN switch every price in the section) are both absent.
- **Motion.** "From 'what if' to 'I can see it'" and "Your idea doesn't need to arrive fully formed" move on their own. The only motion in the whole prototype is the Home hero wall. Remove the scroll sequence.
- **Reduced motion.** `.floating-note.question-note` stays at `opacity: 0`, not `aria-hidden`, holding "Checks not performed: structure, fire, acoustics." and "UNSIGNED — professional verification required" among others: hidden from sighted users, read by screen readers. (This goes with the rebuild section; the prototype's Home has no such panel.)
- **Tokens.** Fonts: Inter and JetBrains Mono. The prototype wins on visuals: use Source Sans 3, IBM Plex Mono and Material Symbols Outlined only (`tokens.css`; the fidelity skill now says the same). Any other font family, anywhere in a font stack or loaded as a web font, fails. Colours not in the tokens: `rgba(255,255,255,0.92)` (`.concept-tag`), `rgba(210,232,255,0.33 / 0.20 / 0.13)` (`.stamp`, `.stamp-top`).
- **Copy source.** The copy is written inline in `src/components/Home.tsx`; it must be served from `site/content/*.json`.
- **Assets.** Not in the manifest: `/home/plan.webp`, `/home/provenance.webp`, `/home/poster.webp`, `/home/poster-mobile.webp`, `/home/clip.mp4`, `/home/clip-mobile.mp4`. Drop them or list them in DESIGN_GAPS for review. `/home/plan.webp` also has no "Illustrative" caption.
- **Roadmap tags.** The prototype tags eleven entries as roadmap (Interior, Urban & site planning, Electrical, Civil, Structural, Mechanical / HVAC, Plumbing & drainage, Landscape, Survey, Estate developer, Contractor); the build shows none with a roadmap tag.
- **Passing:** WCAG 2.2 AA at all widths; honesty strips as visible text; no banned words; no price contradicting PRD §10; Lighthouse accessibility, best practices and SEO 100. Performance measured 74 on a loaded local machine; the CI runner is the gate.
- **"Three things people ask it for"** is built as exported — kitchen extension, Lekki plot, restaurant. No landlord card and no HMO material anywhere on the site (DESIGN_GAPS row 19, closed).

## Pages 2–9 — not built

Each page below does not exist, so every check on it fails. Build each to the prototype page of the same name.

### 2. For professionals — `/for-professionals` — page missing

Sections, in order: Every line has a source. Every check has a signer. · It shows you its reading of the brief · Turn it on and the drawing explains itself · Against a profile, with a version on it · Your drawings, your standards · For the people who issue · Where liability sits · Draft it, check it, sign it.
Interactive: currency toggle (GBP, USD, NGN) in "For the people who issue".
Roadmap tags: Interior, Electrical, civil.
35 failing tests.

### 3. Profile marketplace — `/profile-marketplace` — page missing

Sections, in order: Every jurisdiction is a profile you can buy or author · (untitled browse section with the All / Jurisdictions / Offices / Manufacturers tabs) · What the badge means · Author a profile from the document itself · Project, client, office, manufacturer · Author a profile, or browse what exists.
Interactive: tabs (All, Jurisdictions, Offices, Manufacturers); each tab changes what the section shows.
35 failing tests.

### 4. Find a signer — `/find-a-signer` — page missing

Sections, in order: Reviewed and signed under responsible charge — with the review on record · Three steps · Identity, registry and insurance, checked · The stamp stays disabled until the work is done · Become a signer · Responsibility and insurance · Send a drawing for review.
Interactive: the signing gate — "Apply stamp" visible and disabled while items are outstanding.
35 failing tests.

### 5. Developers — `/developers` — page missing

Sections, in order: Compile, check and render drawings from your own product · Five verbs · A typed drawing model with provenance on every element · MCP server · What you are charged for · Get a key and compile your first drawing.
29 failing tests.

### 6. Regulators & manufacturers — `/regulators-and-manufacturers` — page missing

Sections, in order: For regulators and manufacturers · A submission in, a cited report out · Where it sits in an e-permitting workflow · Shared commitments · Tell us which half you are.
Interactive: tabs (For regulators, For manufacturers) — selection state changes; both halves stay on the page, as in the prototype.
35 failing tests.

### 7. Lagos — `/lagos` — page missing

Sections, in order: EPPPS-ready submissions, first time · What a submission needs, as Drawlogic sees it · Lagos conventions, without re-teaching the software · The statutory seal and the Drawlogic stamp are not the same thing · Pilot programme for practices · Naira pricing via Paystack · EPPPS, sealing and local workflow · Type your plot. See what fits.
Interactive: NGN / USD toggle in "Naira pricing via Paystack" — it must switch every displayed price between the Decision 12 NGN values and the PRD §10 USD prices (Decision 12; DESIGN_GAPS row 20 closed). The export's toggle is inert; do not copy that.
Roadmap tags: Electrical.
35 failing tests.

### 8. Pricing — `/pricing` — page missing

Sections, in order: Simple pricing, transparent value · (untitled pricing table with the GBP / USD / NGN toggle) · Nigeria tier and the student plan · Line by line · The two fees that are not subscriptions · Questions about the bill · Start free.
Interactive: currency toggle (GBP, USD, NGN) switches every price.
PRD §10 values, in the prototype's layout (DESIGN_GAPS row 18; `site/tests/fixtures/prd-governed.json`): $0, $49, $179, $1,099 with 5 seats + $149/seat, $19 per 100 credits; comparison table Free drafts/month 3, render credits included Idea 40, Individual 60, Professional 250. "Up to 25 seats" must not appear. NGN prices are Decision 12 (DECIDED 25 Sept): ₦6,000 Idea / ₦12,000 per project / ₦20,000 Individual / ₦75,000 Professional per user / ₦450,000 Practice (5 seats) / ₦60,000 extra seat / ₦8,000 per 100 render credits — replacing the prototype's naira figures in every currency toggle. The Idea tier USD price (Decision 7) is OPEN: reported, not asserted.
36 failing tests.

### 9. About — `/about` — page missing

Sections, in order: About & Contact · A drawing is a claim about the world · Four rules we build against · Three markets, three profile sets · Thirty minutes, on one of your live drawings · Direct lines.
29 failing tests.

## Pages 10–12 — build last (awaiting re-export)

Sections are being moved between these pages in Claude Design: "Your site, in context" (site feasibility) and "Teach me first" to Idea mode, with a one-line pointer to Teach me first left on Students & educators; "Preview video" to Render studio (DESIGN_GAPS rows 5 and 6). Build these three after the others. Their section lists below describe the current export and will change; the tests for them are updated from the re-export.

### 10. Idea mode — `/idea-mode` — page missing

Sections, in order: Describe it. See it. · Two or three options, the numbers, and a render · Everything it filled in for you, in plain words · A concept leaves here labelled as a concept · When you are ready, one click hands it over · Free to try · Plainly answered · Start with a sentence.
Interactive: currency toggle (GBP, USD, NGN) in "Free to try".
35 failing tests.

### 11. Render studio — `/render-studio` — page missing

Sections, in order: Rendered from the drawing, not from a screenshot. · Drawing and render, side by side, same hash · What you put in · Four variants, one fixed camera · Every render carries its drawing · Renders are metered · Render from a drawing you already have.
Interactive: currency toggle (GBP, USD, NGN) in "Renders are metered".
35 failing tests.

### 12. Students & educators — `/students-and-educators` — page missing

Sections, in order: It teaches before it draws. · Want to understand why, before you see it? · Drop a pin. Draw the boundary. See what fits. · A camera move on the drawing you already have. · Six steps, in this order · A rough sketch, the principles, and what it found · Worked answers unlock after you try · Every submission says how much was yours · Set the exercise. Read the record. · Plainly answered · Learn the reasons first.
Interactive: Teach me first switch (starts on; switching changes the panel); site-feasibility options A · Courtyard / B · Linear / C · Two blocks (each changes the plot figures); boundary polygon (vector, with "traced" and the imagery date as text); preview-video tile (never autoplays; the play control starts it; "Generated preview — not a model render"; no fidelity score).
Note: these three sections are moving — Teach me first and site feasibility to Idea mode (this page keeps a one-line pointer to Teach me first), the preview-video tile to Render studio (DESIGN_GAPS rows 5 and 6). The interactive behaviour above still applies wherever they land.
35 failing tests.

## Site-wide

- **Pages that are not the prototype's** ship in the build: `marketing.html` (an older copy of the prototype UI kit, 5.4 MB, in `public/`), `media/review.html`, `media/hero/review.html`, `media/hero/video-review.html`, `media/hero-wall/review.html` (internal asset-review pages). Remove them from `public/`; keep review tooling outside the published site.
- **Manifest hashes.** No manifest entry records the sha256 of its own delivered file; every asset the site uses needs its path, its sha256 and a non-rejected review status.
- **robots.txt** stays `Disallow: /` until launch (Tokunbo, 25 Sept). No action; the Lighthouse crawl audit is excluded until launch.

## Examiner-side fixes made during these runs (not site defects)
- Off-screen text under `content-visibility: auto` read as empty; tests now force it visible before reading text.
- Media was checked only under reduced motion, which hides the Home video; asset and caption checks run in full motion.
- Interactive and motion expectations are recorded from the prototype, not assumed: the prototype's tabs on Regulators & manufacturers do not swap panels, and its Lagos toggle is inert, so the tests follow that. Hovering parts of the hero pauses it, so measurements keep the pointer off the page.
- A Lighthouse run that fails to load (NO_FCP on a busy machine) is retried and reported as a failed run, not as zeros.
- A line split by `<br>` is accepted when it is part of one content string.

## Reproduce
```sh
cd site/tests && npm ci
SITE_DIR=<path to site/> npm test     # needs site/out from `next build`; set REPORTS_DIR outside OneDrive (.env.example)
npm run issues                        # regenerates the per-page issues, Home first
```

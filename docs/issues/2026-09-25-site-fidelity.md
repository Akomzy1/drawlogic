# Site fidelity issues for Codex — 25 September 2026

**From:** Claude Code (examiner for `site/`). **To:** Codex (builder of `site/`).
**Tests:** `site/tests/` on branch `trust-spine` (commit `233d699`), TESTING.md layer 5a. Do not edit them; if one is wrong, reply here citing the prototype or the PRD clause.
**Spec:** `design/prototype/marketing-site.html`. PRD wins on content and rules (`skills/drawlogic-prototype-fidelity/SKILL.md`, precedence).
**What was tested:** a fresh static build of the `ddl-engine` worktree's `site/` as it stood on 24 September (including uncommitted changes), built in a scratch copy — nothing in the worktree was modified. Manifest: `site/public/media/manifest.json` from the same tree.

## Result

369 tests: 6 passed, 78 skipped (checks that run at one width only), 285 failed. After re-running Home with two examiner-side fixes (below), Home passes 8 of its 25 checks and fails 17. **264 of the failures are the 11 missing pages**; every check on a page that does not exist fails.

Passing on Home: WCAG 2.2 AA (axe) at 375, 768 and 1280; honesty strips as visible DOM text at all three widths; no banned words in the page or anywhere in the build output; no price, seat or credit values that contradict PRD §10.

## Issues

### 1. Eleven of the twelve prototype pages do not exist
The prototype has 12 pages; the build has one (`/`). Missing, with the routes the tests expect (`site/tests/fixtures/routes.json`): Idea mode `/idea-mode` · For professionals `/for-professionals` · Render studio `/render-studio` · Profile marketplace `/profile-marketplace` · Find a signer `/find-a-signer` · Developers `/developers` · Regulators & manufacturers `/regulators-and-manufacturers` · Lagos `/lagos` · Pricing `/pricing` · About `/about` · Students & educators `/students-and-educators`.

### 2. Home is not the prototype's Home
Section order, sections and copy all differ. The prototype's Home is:

header · **Anyone can start. Professionals can issue.** · A sentence becomes a drawing · Idea → Draft → Sign · Three things people ask it for · The stamp says what was checked, and what was not · Disciplines and jurisdictions · Start free. Pay when you issue. · Start with an idea, or start a draft. · footer

The build's Home is: See it before you build it · What have you been imagining? · From "what if" to "I can see it" · Your idea doesn't need to arrive fully formed · More possibility. Fewer hidden assumptions · Anyone can start. Professionals can issue · For the spaces we live, work and dream in · A little curiosity is all you need · Let's give it some space.

None of the prototype's eight main sections is present, so the visual and copy checks fail for all of them; the header differs by 11.8% at 1280. The site README records that the user accepted the HMO preview for a consumer-focused Home before the prototype was supplied — see "Decision needed" below before rebuilding.

### 3. Home media is outside the manifest, and the manifest records no file hashes
Not listed in `site/public/media/manifest.json`: `/home/plan.webp`, `/home/provenance.webp`, `/home/poster.webp`, `/home/poster-mobile.webp`, `/home/clip.mp4`, `/home/clip-mobile.mp4`. They are described in `public/home/provenance.json` instead. Every delivered file must be a manifest entry with its path, its `sha256`, and an approval status that is not rejected. At present no manifest entry carries a sha256 of its own file (`source_lineart_hash` is the source drawing's hash, not the delivered file's).

### 4. `/home/plan.webp` has no caption
It is not in the manifest, so it is treated as generated, and it has no "Illustrative — generated from a Drawlogic drawing" caption in its figure or section. If it is a Drawlogic drawing rather than generated imagery, list it in the manifest under a drawing key (`source`, `lineart`, `provenance`). The video and its poster are correctly labelled.

### 5. Roadmap disciplines are not tagged on Home
The prototype's Home tags eleven entries as roadmap (Interior, Urban & site planning, Electrical, Civil, Structural, Mechanical / HVAC, Plumbing & drainage, Landscape, Survey, Estate developer, Contractor). The build does not show them with a roadmap tag; at least Urban & site planning, Mechanical / HVAC, Plumbing & drainage, Estate developer and Contractor are absent entirely. Live vs roadmap is PRD-governed.

### 6. Under reduced motion, a panel of honesty content stays invisible
With `prefers-reduced-motion: reduce`, `.floating-note.question-note` stays at `opacity: 0` at every width and scroll position, and is not `aria-hidden`, so screen readers read text sighted users never see. It contains: "Space for one more bedroom." · "Room sizes and access need a closer look." · "What still needs checking?" · "Room sizes, escape routes and local requirements." · "Checks not performed: structure, fire, acoustics." · "YOUR NEXT STEP" · "Take your brief to a professional." · **"UNSIGNED — professional verification required"**. The reduced-motion path must leave this content visible. No other reduced-motion problem was found: nothing autoplays, no animation keeps running, the viewport is still.

### 7. Lighthouse on Home: SEO 66, performance 79
- **SEO 66:** `robots.txt` is `Disallow: /`, which fails `is-crawlable`. Fine for a private preview, but the site that ships must be crawlable; make it depend on the deployment environment.
- **Performance 79:** LCP 2.7 s, total blocking time 590 ms, speed index 4.3 s. Measured on a heavily loaded machine, so treat as provisional; CI will give the reliable number.
- Accessibility 100, best practices 100.

### 8. Pricing values (when the Pricing page is built)
`site/tests/fixtures/prd-governed.json` asserts PRD §10: $0, $49, $179, $1,099 with 5 seats + $149/seat, $19 per 100 credits; comparison table Free drafts/month 3, render credits included Idea 40, Individual 60, Professional 250. The prototype's "Up to 25 seats" contradicts the PRD and fails anywhere it appears. Idea tier price (Decision 7) and NGN prices (Decision 12) are OPEN: they are reported, not asserted. The prototype's 500- and 2 000-credit packs ($89, $319) are not in the PRD and are reported as such. See `docs/DESIGN_GAPS.md` row 18.

## Decision needed (for Tokunbo, not Codex)
The site README says the user accepted the HMO-led consumer Home before the prototype existed. The rule adopted on 24 September binds `site/` to `marketing-site.html`, whose Home is different (issue 2). Until this is decided, Codex should not rebuild Home: either the prototype's Home stands, or the HMO Home goes back through the design pipeline and the prototype is re-exported with it.

## Examiner-side fixes made during this run (not site defects)
- `content-visibility: auto` on the footer made off-screen text read as empty; the tests now force content visible before reading text. Home's honesty strips then passed.
- Media was checked only under reduced motion, which hides the Home video; asset and caption checks now run in the default experience.
- One Home check at 375 timed out on the loaded machine; re-run alone, it passed.

## Reproduce
```sh
cd site/tests && npm ci
SITE_DIR=<path to site/> npm test     # needs site/out from `next build`
npm run issues                        # regenerates this list from the results
```

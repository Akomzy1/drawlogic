# DRAWLOGIC — Design handoff note (Relume wireframes → Claude Design)

> **25 Sept 2026 — Pre-export design brief.** Where it differs from design/prototype/marketing-site.html (Home hero and sections, fonts, section placement, the five-prompt strip, landlord/HMO material), the approved export governs; PRD rules still govern content.

**Scope:** marketing website, 12 pages (Home; Product: Idea mode, For professionals, Students & educators, Render studio, Profile marketplace, Find a signer, Developers; Markets: For regulators & manufacturers, Lagos; Pricing; About/Contact). Revised 19 Sept 2026 for PRD v0.2.5: outcome-first Home, Learn mode, Preview video, site context from geodata, eleven disciplines with live/roadmap states, author-your-own jurisdiction. The wireframes fix section order and content; this note fixes everything the wireframes don't: brand, tone, colour, type, components and the rules that must survive design.

---

## 1. What Drawlogic is, in the words the site must use

Drawlogic turns an idea, sketch, photo or reference drawing into technical drawings and renders for the built environment — with every element traceable and every check signed.

Two front doors on one engine, plus a learning path:
- **Idea mode** — anyone types an idea and gets concept options, numbers and a render in seconds, watermarked "Concept — not for construction". Includes site feasibility on a real satellite basemap and a "Teach me first" toggle.
- **Draft mode** — professionals get question-first interpretation, checks against jurisdiction profiles, a provenance layer and a verification stamp, exported to DXF/PDF.
- **Learn mode** — verified students (and anyone via the toggle) get inspiration and a sourced critique of their own idea *before* anything is drawn; exports carry an integrity summary.

**Positioning line (use verbatim, Home — as the strapline under the outcome-first hero):** *Anyone can start. Professionals can issue.*

**Home hero (use verbatim):** heading *See it before you build it.* Sub: *Type an idea, sketch it or upload a photo. In seconds you get options, numbers and a picture. When you're ready, it becomes a real drawing a professional can sign.* Directly under it, a "Try one of these" strip of five prompts in the reader's own words (landlord HMO conversion, interior designer restaurant, homeowner kitchen extension, developer Lekki plot, architect reference-to-detail), each a card with the prompt as the text and the audience as a small eyebrow.

**Professional line (hero of For professionals):** *Every line has a source. Every check has a signer.*

Same brand for both doors — no separate consumer name.

---

## 2. Audiences and how the design treats each

| Audience | Door | Design treatment |
|---|---|---|
| Homeowners, landlords, developers with a plot, small-business owners, designers pitching | Idea mode | Plain language, larger type, one text box as the hero, results-first imagery, no jargon visible without hover; the reader identifies with a sentence they might type, not a job title |
| Students, tutors, institutions | Students & educators | Same plain language; the six-step sequence, the graded critique and the integrity summary are the visuals |
| Architects, technologists, engineers, interior designers, practice principals | For professionals | Denser, precise, drawing-native visuals, the stamp and provenance layer as proof |
| Regulators, manufacturers | Regulators & manufacturers | Enterprise calm, form-led, data/trust statements up front |
| Lagos developers and ARCON/COREN professionals | Lagos | Same system, local specifics (EPPPS checklist, Naira), no stock "Africa" imagery |
| Developers/agent builders | Developers | Code-forward, monospace blocks, minimal decoration |

Rule: the simplicity for Idea mode never removes the rigour shown to professionals. The two doors share one system; they differ in density and vocabulary, not in visual identity.

---

## 3. Tone and copy rules (binding)

- Precise, plain-spoken, calm. No hype, no exclamation marks, no "revolutionary", "AI-powered" as a headline word.
- **Never** use "compliant", "code-compliant", "approved", "meets code", or "guaranteed" anywhere. The platform performs automated checks and lists what it did not check.
- **Never** use "stamp marketplace", "get your plans stamped", "stamping service". The marketplace is a *responsible-charge* marketplace; professionals *review and sign under responsible charge*.
- **Never** use "flythrough", "walkthrough" or "cinematic" for Preview video; those words are reserved for the Stage 3 Studio (ray-traced) tier. Preview video is always labelled "Generated preview — not a model render".
- **Disciplines and jurisdictions are stated with their status.** Architecture is live in Draft; the other ten disciplines are shown as roadmap, never hidden. Generic — anywhere "runs conventions only, with no local rules claimed"; every jurisdiction chip set ends with "Yours — author it" and the sentence "Until they're signed they flag, never pass."
- Every mock of a stamp, report or export must show the line **"Checks not performed: …"** — this is the honesty signal and the brand's proof.
- Idea-mode copy uses everyday phrasing with the technical term on hover/tooltip: "how much of the plot the building takes up" (*coverage*), "how far the building sits from the boundary" (*setback*).
- UK English throughout.

---

## 4. Visual direction

**Engineering-grade calm, not startup gloss.** The visual language is the technical drawing itself: thin lines, dimension ticks, section hatching, revision clouds, title blocks. Not glossy 3D hero renders. Renders appear only where the Render Studio is the subject, and always alongside the drawing they came from.

- **Canvas:** light neutral (near-white with a warm grey tint), generous whitespace, wide margins. Dark mode optional for the app, not required for the site.
- **Accent:** one technical blue for actions and links. One safety amber reserved for ⚠ flags and "verify" states. Nothing else competes.
- **Provenance colour system** — define once as tokens and reuse site-wide as the brand's signature. Suggested (adjust for contrast, keep hue meaning):
  - User supplied — green
  - Project data — blue
  - Reference-derived — violet
  - AI inferred — amber
  - Requires verification — red
  - Auto-fix — teal
  Use these as the colour key on the provenance layer explainer, on stamp mocks, and as subtle accents on the pages that correspond (e.g. Idea mode pages lean amber since concepts are mostly inferred; professional pages lean green/blue).
- **Imagery:** real-looking drawing fragments (sections, details, site plans, single-line diagrams) as illustrations; the interpretation card, assumptions panel and stamp as UI illustrations. No stock photos of people at desks. Lagos page: a site plan of a Lekki-style plot and the EPPPS checklist, not skyline photography.
- **Motion:** minimal. One hero interaction — a sentence becoming a drawing, with provenance colours appearing — is enough. No parallax.

---

## 5. Typography

- **Primary:** a neutral grotesque with good numerals (e.g. Inter, Söhne-class). Headlines medium weight, never bold-black.
- **Monospace:** used only for hashes, rule IDs, stamps, code blocks and the DDL sample. Its presence signals "this is on record".
- **Scale:** Idea-mode pages one step larger in body size than professional pages. Minimum 16px body everywhere.
- Numbers are content here (mm, m², %, £/$/₦) — use tabular figures.

---

## 6. Components to design once and reuse

These are the product's real UI; on the site they are illustrations, but they must look like the product.

1. **Two-door hero** (Home): equal-weight "Try an idea" / "For professionals". Never let one door dominate.
2. **Prompt box** (Idea mode hero): single text field with a placeholder from the three examples, an upload affordance, a location chip. This is the most important element on the site.
3. **Interpretation card**: table of what the AI understood — object, value, source colour — plus a "Missing" list and Confirm/Edit. Shows a question, not a guess.
4. **Assumptions panel**: plain-language list beside a result ("I assumed 3 m ceilings"), each editable. Amber accents.
5. **Standards Report**: rows of ✓ / ⚠ / — with rule ID and document reference, and the mandatory "Checks not performed" block.
6. **Verification stamp block** (monospace): profiles and versions, checks performed/flagged/not performed, unverified elements count, signer or "UNSIGNED — professional verification required", drawing hash, timestamp, and the sentence "This is an automated design-rule check. It is not a statement of legal compliance."
7. **Provenance chip**: small colour-coded tag on an element, expands to source, confidence, rule refs.
8. **Concept watermark**: diagonal "CONCEPT — NOT FOR CONSTRUCTION" on every Idea-mode image; designed to be unmistakable, not decorative.
9. **Profile card** (marketplace): type (jurisdiction/office/manufacturer), tier badge (Tier 1 / Tier 2 / Generic), signer name and credential, price, adoption count.
10. **Signer card** (Find a signer): verified name, credential and registry, jurisdiction(s), discipline(s), verification level badge (Verified / Verified + Insured), review-evidence summary. No star ratings for speed.
11. **Pricing table**: six tiers with a currency toggle (GBP/USD/NGN); Idea tier visually grouped with Free, professional tiers together.
12. **"What we don't do" block**: reused on Idea mode, Find a signer and Lagos. Short list, no softening.
13. **Critique panel** (Learn): graded points green/amber/red, each with reason and source line, "Discuss with your tutor" tag, "Show me the principle" open and "Show worked answer" locked until an attempt.
14. **Integrity summary block** (Learn): student-supplied vs AI-inferred share, critique points raised/addressed, revision cycles, Generate anyway used/not, with the "Student — educational use" watermark.
15. **Preview video tile**: clip with play glyph, the permanent preview label, source drawing hash and revision, credit cost; never a fidelity score.
16. **Site context panel**: satellite basemap with editable boundary polygon, boundary-source chip (traced amber / survey green), terrain strip, context-layer toggles with OSM credit, imagery date visible.
17. **Discipline chips**: two states — live (filled) and roadmap (outlined with tag). **Jurisdiction chips**: UK, US, Nigeria, Generic — anywhere, Yours — author it.

---

## 7. Page-specific notes

- **Home:** cut Relume's generic services/stats/testimonial sections; no numbers we don't have. Sections: outcome-first hero with two buttons (Try an idea / I'm a professional), "Try one of these" five-prompt strip, 30-second demo, how it works (Idea → Draft → Sign), plain-language trust trio ("See what the AI assumed", "Know what's been checked — and what hasn't", "Get it signed by a real professional") with the technical term one level down, disciplines and jurisdictions strip (eleven disciplines with live/roadmap states; five jurisdiction chips incl. "Yours — author it"), pricing preview, CTA.
- **Idea mode:** results-first. Show what comes back before explaining how. The honesty section (watermark, PDF/PNG only, no CAD until promoted) is a feature, style it as one. Add the "Teach me first" section after the assumptions panel and the "Your site, in context" section after the developer example; the restaurant and HMO examples sit among the three hero prompts.
- **Students & educators:** the six-step stepper, the three-panel critique illustration, the worked-answers-unlock paragraph, the integrity summary mock, the institution section and the FAQ. Free for verified students is stated in the hero.
- **For professionals:** lead with the interpretation card, then the checks, then the stamp. The provenance layer should be shown on a real-looking detail (a parapet or window jamb), not an abstract diagram.
- **Render studio:** every render shown next to its source drawing with the drawing hash visible; that pairing is the point. Add the "Preview video" section after Geometry fidelity with the preview tile and a one-line "Coming at Stage 3: ray-traced Studio renders from the 3D model" note; no flythrough/walkthrough/cinematic wording.
- **Profile marketplace:** browse first, author second. Tier badges must be readable at a glance.
- **Find a signer:** the signing gate and the audit record are the differentiators; illustrate the gate as disabled-until-complete. Verification levels prominent. Keep the "why this isn't plan stamping" section short and factual.
- **Pricing:** Nigeria tier and student plan visible without scrolling into FAQ.
- **Regulators & manufacturers:** two anchored halves, each with its own CTA; trust/data statements shared at the bottom.
- **Lagos:** the EPPPS checklist as a designed component; the sealing section must visually separate the ARCON/COREN statutory seal from Drawlogic's stamp.
- **Developers:** code block above the fold; DDL sample in monospace with provenance colours applied to the `source` values.
- **About/Contact:** principles list; demo form with audience selector.

---

## 8. Navigation

Top nav: **Product** (dropdown: Idea mode, For professionals, Students & educators, Render studio, Profile marketplace, Find a signer, Developers) · **Markets** (dropdown: Regulators & manufacturers, Lagos) · **Pricing** · **About**. Right side: "Sign in" and the primary CTA "Try an idea". Footer repeats the full sitemap plus legal, data policy ("your drawings are never used for training"), and the liability wording.

---

## 9. Responsive and accessibility

- Mobile-first for Idea mode pages (that audience arrives from social); the prompt box must work as the first thing on a phone.
- Professional pages may assume tablet/desktop but must not break on mobile.
- WCAG 2.2 AA: provenance colours never carry meaning alone — always paired with a label or icon; amber/red flags include the ⚠ glyph; contrast checked on the light canvas.
- Tables (pricing, Standards Report) scroll horizontally inside their container on small screens.

---

## 10. Deliverables from Claude Design

1. Design tokens: colour (including the six provenance colours, accent, amber), type scale, spacing, radius, elevation.
2. The 17 components above as reusable elements.
3. All 12 pages at desktop and mobile.
4. A one-page style guide summarising tone and copy rules (section 3) so they travel with the design.

Export as a shareable Claude Design link plus a token file the Next.js/Tailwind build can consume.

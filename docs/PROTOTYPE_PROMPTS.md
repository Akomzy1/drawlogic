# DRAWLOGIC — Prototype build prompts

**What these build:** the product prototype — a clickable, high-fidelity set of app screens (not the marketing site, which the Relume wireframes and design handoff cover). Once approved, these screens become the binding source of truth for the Next.js build, the same way the Toastly prototype does.

**How to use:** run Prompt 0 first and keep its output open; every later prompt says "use the Drawlogic prototype system". Run 1–14 in order — each screen links to the previous. Static HTML + Tailwind (one file per screen, shared `tokens.css`), realistic mock data, no backend. Same prompts work in Claude Design or Claude Code.

---

## Prompt 0 — Prototype system (run first)

```
Build the Drawlogic prototype system as a single HTML page that documents and demonstrates the design tokens and the twelve reusable components below. Output: tokens.css (CSS variables) and system.html (a living style guide). Static HTML + Tailwind via CDN, no frameworks.

Brand: Drawlogic — the verifiable drawing platform for the built environment. Two modes on one engine: Idea mode (non-professionals: a text box, concept options, plain language) and Draft mode (professionals: interpretation card, checks, provenance, verification stamp). Visual direction: engineering-grade calm; the technical drawing is the visual language (thin lines, dimension ticks, hatching, revision clouds, title blocks). Light warm-grey canvas, generous whitespace. One accent blue for actions. One safety amber reserved for ⚠ and "verify" states.

Tokens: colour (canvas, surface, ink, muted, accent-blue, amber, plus the provenance set: user=green, project=blue, reference=violet, ai_inferred=amber, verify=red, auto_fix=teal), type scale (Inter, tabular figures; JetBrains Mono for hashes, rule IDs, stamps, code), spacing (4px base), radius (4/8), elevation (one soft shadow), line weights for drawing illustrations (0.5/1/2 px).

Components (build each as a copyable snippet with states):
1. Two-door hero buttons ("Try an idea" / "For professionals", equal weight)
2. Prompt box (text field, upload affordance, location chip, submit)
3. Interpretation card (rows: object, value, source chip; "Missing" list; Confirm / Edit)
4. Assumptions panel (plain-language list, each editable, amber accents)
5. Standards Report (rows ✓ / ⚠ / —, rule ID, document reference; mandatory "Checks not performed" block)
6. Verification stamp block (monospace; profiles+versions; checks performed/flagged/not performed; unverified count; signer or "UNSIGNED — professional verification required"; hash; timestamp; closing sentence "This is an automated design-rule check. It is not a statement of legal compliance.")
7. Provenance chip (colour + label + icon; expands to source, confidence, rule refs)
8. Concept watermark (diagonal "CONCEPT — NOT FOR CONSTRUCTION" overlay)
9. Profile card (type, Tier 1/2/Generic badge, signer + credential, price, adoption)
10. Signer card (verified name, credential + registry, jurisdictions, disciplines, Verified / Verified + Insured badge, review-evidence summary)
11. Chat message + change list (an instruction and the DDL diff it produced, undo)
12. "What we don't do" block

Copy rules (enforce in all sample text): UK English; never "compliant", "approved", "meets code", "guaranteed"; never "stamp marketplace" or "get your plans stamped"; provenance colours always paired with a label or icon (WCAG 2.2 AA).
```

---

## Prompt 1 — App shell and navigation

```
Use the Drawlogic prototype system. Build shell.standalone.html: the authenticated app frame used by every screen. Left rail: workspace switcher, Projects, Ideas, Drawings, Render Studio, Profiles, Find a signer, Settings. Top bar: project name with jurisdiction and coverage statement chip ("GB-ENG Residential v1.3 · Tier 1 · signed J. Smith CIAT" — click to expand profile stack), mode toggle Idea | Draft, search, user menu with plan badge (Free / Idea / Individual / Professional / Practice). Content area empty with a slot comment. Include a "New project" modal launched from the workspace switcher: fields — project name; location (address search or dropped pin, with the detected jurisdiction shown as a chip and "change" link); building type; discipline picker as chips in two states — live (filled: Architecture) and roadmap (outlined with a "roadmap" tag: Interior, Urban & site planning, Electrical, Civil, Structural, Mechanical / HVAC, Plumbing & drainage, Landscape, Survey, Contractor) — a roadmap discipline can be selected and shows an inline note "Idea mode available now; Draft mode and checks for this discipline are on the roadmap"; profile stack preview showing what resolved for the location (e.g. "GB-ENG Residential v1.3 · Tier 1" or, for an uncovered location, "Generic — anywhere · conventions only · no local rules claimed" with a secondary link "Author a profile for [jurisdiction]"). Responsive: rail collapses to icons under 1024px, becomes a bottom bar on mobile. Include a mobile variant and the modal on mobile.
```

---

## Prompt 2 — Idea mode: home

```
Use the Drawlogic prototype system inside shell.standalone.html (Idea mode active). Build idea-home.standalone.html. The hero is the prompt box, centred, with rotating placeholders: "extend my kitchen 3m into the garden, bifold doors", "60 × 120 ft plot in Lekki, 4-bed duplex with BQ", "80-cover restaurant, 200 m², moody, open kitchen". Below: "or upload a photo, sketch or plan"; location chip auto-detected ("Banbury, England — change"); three example cards that prefill the box; a strip of recent ideas (cards with watermarked thumbnails). Plain language, body text one step larger than Draft mode. No jargon visible. Mobile-first: on a phone the prompt box is the first element.
```

---

## Prompt 3 — Idea mode: results with assumptions panel

```
Use the Drawlogic prototype system. Build idea-results.standalone.html for the prompt "extend my kitchen 3m into the garden, bifold doors" (Banbury, England). Layout: left 60% results, right 40% assumptions panel. Results: three option cards labelled by what differs ("More garden", "Bigger kitchen", "Cheaper build"), each with a concept plan (simple SVG floor plan with the extension hatched), key numbers (added area m², new kitchen size, and a cost band shown greyed as "£ —" with a "Stage 2" tag and the tooltip "Indicative cost ranges arrive in Stage 2. Quantities and priced estimates follow in Stage 3." — no figures in Stage 1, PRD §5B), one low-res render (placeholder with watermark), and a "Things to check with a professional" list in plain language (e.g. "A 3 m rear extension is usually within permitted development for a detached house — check with a professional", "Drains run under the proposed extension"). Watermark on every image. Assumptions panel: "I assumed…" list, each editable inline (ceiling height 2.4 m, house is detached, garden faces north, existing kitchen 4 × 3.5 m), with a "Regenerate" button that appears on edit. Footer actions: Share link, Export PDF/PNG, Promote to Draft, Find a signer. Show the Export menu open with no DXF option and a note "CAD export available after Promote to Draft". Each option's render tile carries a material basis line (FR-163), e.g. "Material basis · 4 description only", or "1 colour code" where the user wrote one ("white render, RAL 9010 windows").
```

---

## Prompt 4 — Idea mode: site feasibility (Lagos)

```
Use the Drawlogic prototype system. Build idea-site.standalone.html for "60 × 120 ft plot in Lekki, 4-bed duplex with BQ and gate house". Location chip: "Lekki, Lagos — NG-LA Tier 2 profile · generic checks + Lagos setback/coverage rules". Top of the results area: a site-context panel — a satellite basemap placeholder (muted aerial texture) with the plot boundary drawn on it as an editable polygon, a "Boundary: traced on imagery — upload survey plan (UTM Zone 31) to replace" notice, a terrain strip showing slope and fall direction from a 30 m elevation model, and toggleable context layers (roads, water, power lines, neighbours) with an OpenStreetMap credit. Below: three massing/site options as SVG site plans drawn over the same basemap, setbacks as dashed lines, building footprints, BQ and gate house placed, coverage % and floor areas per option, a build cost band per option shown as a range labelled "Indicative — not a quote" with its benchmark source and date (PRD FR-151), and — for a location with no cost data — "No verified cost data for [jurisdiction] — no cost shown" with quantities still shown (FR-159), an aerial massing render placeholder on the basemap with watermark. Flags in plain language with the amber ⚠ style ("Side setback on option B is below the Lagos minimum — check with a professional"; "Imagery dated 2024 — verify site condition"). Assumptions panel includes geodata provenance: imagery date and resolution, boundary source, elevation model and resolution ("30 m grid — not suitable for drainage design"), plus plot orientation, road on the short side, setback values used, two floors. Actions as in idea-results, plus "Send to a Lagos architect" (Find a signer prefiltered to NG-LA, ARCON). Include NGN pricing hint in the plan badge and a small "site-feasibility credits" meter.
```

---

## Prompt 5 — Promote to Draft → interpretation card

```
Use the Drawlogic prototype system. Build promote.standalone.html: the transition from a concept to Draft mode. Step 1: a modal from Promote to Draft explaining "Every assumption becomes a question. Nothing is drawn until you confirm." Step 2: the interpretation card, full width in Draft mode, for a parapet detail derived from the kitchen-extension concept's warm flat roof. Rows with source chips: Detail type — Parapet / warm flat roof (project); Wall — 102.5 brick + 100 cavity + 100 blockwork (reference); Insulation — 120 PIR (ai_inferred, 0.78, verify); Parapet height — 900 above roof (user); Scale 1:10 (profile); Jurisdiction GB-ENG Residential v1.3 Tier 1. "Missing" list: membrane system, coping material, fall direction — each with an inline input. Confirm & generate is disabled until Missing is empty; show both states. A note: "Blocked items: none. (Engineering values such as loads or ratings are never inferred — they are requested here.)"
```

---

## Prompt 6 — Draft workspace: chat beside drawing

```
Use the Drawlogic prototype system. Build draft-workspace.standalone.html. Left 35%: chat with the drawing history — user instructions and, under each, the change list it produced with Undo ("Increase insulation to 140 mm" → "ins_01.thickness 120 → 140; wall_total recomputed 442.5 → 462.5; 2 dimensions updated"). Right 65%: the live drawing — an SVG 1:10 parapet detail with brick hatching, cavity, insulation, blockwork, membrane, coping with drip, dimension chains with ticks, annotations with leaders, layer-correct line weights. Toolbar above the drawing: Provenance layer toggle, Confidence shading toggle, Check (badge "3 ⚠"), Render, Export, Sign. Show the provenance layer ON: elements tinted by source colour with a legend. One element selected (insulation) with its provenance chip expanded: source ai_inferred, confidence 0.78, verify true, rule refs gb-eng-L-4.2, edit history. Bottom status bar: DDL version hash, last check time, profile stack.
```

---

## Prompt 7 — Standards Report and auto-fix

```
Use the Drawlogic prototype system. Build check-panel.standalone.html as a right-hand drawer over draft-workspace.standalone.html. Header: "Standards Report — GB-ENG Residential v1.3 (Tier 1, signed J. Smith CIAT 12345) + Generic v0.9". Summary: 41 checks · 38 ✓ · 3 ⚠ · Not performed: fire stopping, structural, acoustic. Rows grouped by category, each with ✓/⚠/— glyph, plain title, rule ID in monospace, document reference and clause, and for ⚠ a one-line reason and an action (Auto-fix if deterministic, else "Needs your input"). Example ⚠ rows: DPC height 120 mm below 150 mm minimum (Auto-fix available); Membrane termination height not defined (Needs input); Fire stopping at parapet — no rule coverage (Requires professional verification). Mandatory "Checks not performed" block at the bottom, styled as a feature not a footnote. Buttons: Fix all auto-fixable, Export report. Show the state after Fix all: DPC row turned ✓ with source chip auto_fix.
```

---

## Prompt 8 — Export and verification stamp

```
Use the Drawlogic prototype system. Build export.standalone.html. Modal with format choices DXF / PDF / SVG (DWG greyed "Stage 3"), title block choice (Drawlogic default vs practice title block — the latter locked on Free with a note), and a preview of the PDF sheet: A1 sheet, the parapet detail, practice title block, and the Verification Stamp block in monospace exactly as the system defines it, populated: profiles and versions; 41 performed / 38 passed / 3 flagged; Not performed: fire stopping, structural, acoustic; Unverified elements: 1; "UNSIGNED — professional verification required"; hash; timestamp; the closing sentence. Second state: the Free-tier preview with the visible "AI-assisted — professional verification required" watermark across the sheet.
```

---

## Prompt 9 — Signing flow (responsible charge)

```
Use the Drawlogic prototype system. Build sign.standalone.html as the Signer's view of the parapet drawing. Header shows signer identity: "Signing as J. Smith · CIAT 12345 · GB-ENG · Verified + Insured". The signing gate as a checklist that must be complete before the Sign button enables: All drawings in set opened (2/2 ✓); Assumptions resolved (0/1 — insulation type, with Accept / Change / Reject inline); Flags cleared or accepted (2/3 — the open one with a required note field); Standards Report reviewed including "Checks not performed" (checkbox). Sign button disabled state, then enabled state after the gate completes. On Sign: a 2FA step-up prompt, then the signature block preview: "Reviewed and modified under responsible charge by J. Smith, CIAT 12345, England — audit record 4f2a…c91e". Side panel: Review evidence so far — items opened, changes made (before/after), time in review 00:41:12, exportable.
```

---

## Prompt 10 — Render Studio

```
Use the Drawlogic prototype system. Build render.standalone.html. Tabs: Drawing → built view · Sketch/plan → photoreal · Photo → proposed. An engine selector at the top right: "Fast (diffusion)" selected, "Preview video" available, "Studio (ray-traced)" greyed with a "Stage 3" tag. Add a fourth tile in the variants grid showing a Preview video: a 10-second clip placeholder with a play glyph, the label "Generated preview — not a model render", the source drawing hash and revision, and "12 credits" — no fidelity score on this tile. Active tab: Drawing → built view for the parapet detail. Left: the source drawing thumbnail with its hash and revision. Right: four render variants on a fixed camera (placeholders) with material swap chips (coping: aluminium / stone / GRP; brick: red multi / buff). Under each variant a fidelity readout "Geometry fidelity 0.91 ✓" and one failed job shown as "Fidelity 0.72 — below threshold, retrying (not delivered)". Credits meter (250, 4 used). Every render carries "From drawing 4f2a…c91e Rev B"; one render labelled "Outdated — drawing has changed since" in amber. Export and Send to client actions. Each render carries its material basis (PRD FR-163): per material, one of "manufacturer texture", "sample photo", "colour code [code]" or "description only", and a summary line such as "Material basis · 2 colour codes · 1 manufacturer texture · 1 description only"; a colour-coded material whose rendered colour misses the target is marked "colour approximate" with a plain-language note (FR-164).
```

---

## Prompt 10a — Preview video flow (added v0.2.4)

```
Use the Drawlogic prototype system. Build preview-video.standalone.html as a three-step flow launched from Render Studio. Step 1 — Choose a still: a grid of the four geometry-locked variants from render.standalone.html, each with its drawing hash and revision; one selected. Optional "Pin an end frame" toggle that lets the user pick a second still of the same drawing (show it selected: a second camera position) with the note "Pinning both ends limits drift". Step 2 — Choose a move: camera-move tiles (Push-in, Orbit, Drift over site, Interior pan) with duration chips 5 s / 10 s (10 s max, greyed beyond), and the credit cost updating (12 credits for 10 s). A one-line label above the button: "Generated preview — not a model render. First frame is faithful; later frames may drift." Generate button. Step 3 — Result: the clip placeholder with a play glyph, the permanent label, source hash and revision, the model used shown as provider metadata ("Backend: generative video · model: kling"), Download and "Add to client pack" actions, and a "Failed moderation — retried on another model" state shown as a secondary example with a plain-language notice and no altered output. In Idea mode the same screen shows the Concept watermark on the clip. No fidelity score anywhere on this screen. Each clip carries the material basis summary of its source still (FR-163), e.g. "Material basis · 2 colour codes · 1 sample photo · 1 description only".
```

## Prompt 4a — Site boundary and survey plan (added v0.2.3)

```
Use the Drawlogic prototype system. Build site-boundary.standalone.html as the modal opened from the site-context panel in idea-site.standalone.html. Left: satellite basemap placeholder with an editable polygon (draggable vertices) and area readout in m² and ft². Right: "Boundary source" selector with two options — "Traced on imagery" (selected, amber chip "assumption") and "Survey plan" (upload field for PDF/DXF, coordinate system chip "UTM Zone 31 (Lagos)"), with the rule shown in plain text: "A survey plan always replaces a traced boundary." Below: geodata provenance rows — Imagery: provider, date, resolution; Elevation: model name, 30 m grid, note "not suitable for drainage design"; Context layers: OpenStreetMap, with a credit line. A second state showing the survey plan uploaded: polygon replaced, chip turns green "survey", and the assumptions panel entry updated. Apply/Cancel. Mobile layout stacks the map above the controls.
```

## Prompt 3a — Learn mode: critique before generation (added v0.2.5)

```
Use the Drawlogic prototype system. Build learn-critique.standalone.html for a verified student account (plan badge "Student"), request: uploaded hand sketch of a parapet detail plus "warm flat roof, 215 blockwork, 100 PIR". Layout in three panels. Left: the student's sketch (rough SVG line drawing). Centre: "Inspiration" — two precedent cards showing principles and partial diagrams only (warm roof layer order; upstand ≥ 150 mm; coping with drip), each with a source line, and a note "These are principles, not a drawing to copy." Right: "Critique of your proposal" — graded points: green "Insulation above the deck — correct for a warm roof"; amber "100 mm PIR — thermally weak against the profile target; 120–150 typical (Approved Document L ref)"; red "No cavity tray shown above the abutment — water path undefined (general good practice — not a verified check)"; a "Discuss with your tutor" tag on a judgement item. Each point has "Show me the principle" (opens) and "Show worked answer" (locked with "Available after you attempt a revision"). Bottom bar: "Revise your idea" (primary), "Generate anyway" (secondary, with tooltip "This will be recorded in your submission summary"), and a locked "Generate" that unlocks after one revision. Second state: after revision, two points turned green, worked answer unlocked on the remaining one, Generate enabled.
```

## Prompt 3b — Learn mode: compare and integrity export (added v0.2.5)

```
Use the Drawlogic prototype system. Build learn-compare.standalone.html. Left: student's original sketch; right: the generated parapet detail with the provenance layer on. Between them, an annotated differences list (what changed, why, which critique point it resolves). Below: the Standards Report styled as a feedback report with explanations, and three reflection prompts with "Reveal model answer" locked until an attempt is typed. Export panel: PDF preview with "Student — educational use" watermark and a provenance summary block: elements student-supplied 62% / AI-inferred 38%; critique points raised 5, addressed 4; revision cycles 2; Generate anyway: not used. Also show the Idea-mode variant of this flow as a small toggle labelled "Teach me first" on the Idea results screen, with the assumptions panel replaced by the critique panel.
```

## Prompt 11 — Profile marketplace and Authoring Studio

```
Use the Drawlogic prototype system. Build profiles.standalone.html with two views. View A, Browse: filter bar (jurisdiction, type: jurisdiction/office/client/manufacturer, tier, discipline, price), grid of profile cards using the system component (examples: GB-ENG Residential Tier 1 £29/mo signed J. Smith CIAT; US-IBC/IRC Base Tier 2 free; NG-LA Lagos Planning Tier 2 ₦ pricing; ACME Roofing System X manufacturer profile free; "Practice standard — Studio Nine" private). Coverage statement on hover. Include two empty/prompt states in Browse: (a) a search for a jurisdiction with no profile ("Accra, Ghana") returns a card "No profile for Accra yet — Generic conventions apply. Author one: upload the local code, the AI drafts rules, a licensed professional signs them. Until signed, rules flag — never pass." with a primary "Author a profile" button; (b) a discipline filter set to a roadmap discipline ("Electrical") returns "Electrical profiles will appear when the Electrical pack ships" with a link to the roadmap. View B, Authoring Studio: left, uploaded document "Approved Document C 2013 (2015 amendments)" with the page shown; right, drafted rules list where every rule is marked UNVERIFIED in amber with condition, threshold, clause reference and severity; a structured rule editor for one rule (gb-eng-C-dpc-height); a Sign rule set button that opens credential confirmation; version and changelog panel; Publish options private / link / marketplace with price and 70/30 note.
```

---

## Prompt 12 — Find a signer and signer onboarding

```
Use the Drawlogic prototype system. Build signers.standalone.html with two views. View A, Requester: prefilter chips (GB-ENG, Architecture, Verified + Insured); signer cards using the system component; a request panel: scope, fee, "Send drawing in Draft mode"; progress states shown as a stepper: Received → Under review → Questions for you (2) → Signed, with the questions surfacing in the assumptions panel style. Copy block "What this is" — responsible charge, not plan stamping, three sentences. View B, Become a signer onboarding: steps Identity (ID + liveness placeholder), Licence (registry lookup field showing ARB / state board / ARCON / COREN options, name-match result, certificate upload), Contact (verified email/domain), Insurance (PI certificate optional → Verified + Insured), Review (status Pending, "2 working days"). Show a mismatch state routed to manual review. Note the rule "one licence number, one account".
```

---

## Prompt 13 — Lagos submission-readiness

```
Use the Drawlogic prototype system. Build lagos-readiness.standalone.html for the Lekki duplex project in Draft mode (profile NG-LA Tier 2). A readiness checklist organised as the EPPPS checklist: Drawings at A3 — site plan, floor plans, elevations, sections (✓), 3D architectural drawings (— not required: 2 floors), M&E (— not required for this category); Seals — ARCON seal block present on architectural set (⚠ awaiting signer), COREN structural set (⚠ external: structural drawings, calculation sheets, structural stability letter, letter of supervision — checklist items, not generated); Non-drawing documents — survey plan reference (UTM Zone 31) entered, surveyed levels (⚠ required before the site layout can be promoted; public 30 m terrain currently in use), proof of ownership uploaded, tax clearance pending, land use charge receipt pending. Clear visual separation between "Drawlogic produces" and "You or your professionals provide". Actions: Send to ARCON signer, Export A3 PDF pack (indexed). The "What we don't do" block: submit, obtain documents, replace statutory seals, guarantee approval. ₦ pricing shown in the plan badge.
```

---

## Prompt 14 — Settings, billing and plan gates

```
Use the Drawlogic prototype system. Build settings.standalone.html: Workspace (members and roles Owner / Signer / Author / Member / Viewer; SSO toggle locked to Practice), Profiles in use (stack order with drag handles: jurisdiction → regional → client → office → manufacturer; conflict notice placeholder "Stage 3"; when the jurisdiction slot resolves to Generic, show the coverage line "Generic — conventions only, no local rules claimed" and an "Author a profile for this jurisdiction" link; a discipline row listing the project's disciplines with live/roadmap tags), Data (residency UK/EU/US, "Your drawings are never used for training", delete workspace), Billing (current plan, currency toggle GBP/USD/NGN, render credits, invoices), Audit log (filterable table: actor user / AI model+version / auto_fix, timestamp, before/after hash, export). Include three plan-gate states used across the prototype: Free (watermarked export, no practice title block), Idea (no Draft mode — Promote to Draft prompts an upgrade), Professional (everything except Signer role and SSO).
```

---

## After the fourteen screens

```
Assemble index.html linking all screens in the order of the two hero journeys: (A) Idea → results → promote → interpretation card → workspace → check → export → sign → render → preview video; (B) developer: idea-site → site boundary → find a signer → lagos-readiness; (C) student: learn-critique → learn-compare. Add a fidelity note at the top: "These screens are the binding source of truth for the Drawlogic build. Structural and visual decisions here are approved, not open choices." Run a copy audit: search all files for "compliant", "approved", "meets code", "guaranteed", "stamp marketplace", "stamped" and list every hit for removal. Check every provenance colour is paired with a label or icon.
```

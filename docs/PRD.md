# DRAWLOGIC — Product Requirements Document v0.2

| | |
|---|---|
| **Status** | Draft for review |
| **Owner** | Tokunbo Akomolede (AkomzyAi Consulting Ltd) |
| **Date** | 15 September 2026 (v0.1: 14 September 2026) |
| **Changes in v0.2** | Adds Idea mode for non-professionals (homeowners, developers, small-business designers); Promote-to-Draft bridge; consumer pricing tier; site-feasibility pulled forward into Stage 2 for Lagos; personas, flows, principles, risks and decisions updated accordingly. v0.2.1 (15 Sept): Find-a-signer reframed as a responsible-charge marketplace (FR-99, 7.11, Decision 8). v0.2.2 (16 Sept): Stage 3 extension — 3D model and studio render (5A, FR-120–127) and four Stage 1 TRD hooks (5A.3). v0.2.3 (16 Sept): site context from geodata (FR-102–106). v0.2.4 (18 Sept): Preview video via generative-video backend (FR-55, FR-127 amended, FR-128–131). v0.2.5 (19 Sept): Learn mode — critique-before-generation student version, also available as a toggle in Idea mode (7.12, FR-140–149; FR-82 replaced). v0.2.6 (21 Sept): construction and material defaults are jurisdiction data — no brick cavity walls on a Lagos project unless the user says so (FR-06–09, FR-57a). v0.2.7 (22 Sept): narrated property film — script generated from the DDL with provenance in the narration, Stage 3 with the Studio walkthrough (FR-132–135). v0.2.8 (22 Sept): AI model allocation re-set for Claude Opus 5.5 — runtime routing, Opus 5.5 integration rules, build-time builder/examiner split between Claude Code and Codex (§8A) |
| **Inputs** | Concept doc (universal, multi-discipline, v2); Competitive analysis & innovation strategy (Sept 2026 research report); Tokunbo's standard build methodology |
| **Next artefacts** | TRD (DDL schema, profile schema, rule engine) → MVP scope → user flow → design system → DB schema → monetisation → launch → acquisition → growth |

---

## 1. Positioning

**Drawlogic is the verifiable drawing platform for the built environment.** Every line has a source. Every check has a signer. Every jurisdiction is a profile you can buy or author.

It is *not* marketed as "AI that edits or renders drawings" — natural-language editing (Autodesk Assistant, SWAPP Frank, ArchiLabs), cited QA/QC (Structured AI, Stru AI, Nomic, Helonic) and model-aware AI rendering (Veras, D5, Enscape, SketchUp AI) are table stakes in 2026. Drawlogic ships all of them, but sells the three things no competitor has:

1. **A trust spine** — element-level provenance and a fail-closed verification stamp with named-professional sign-off, built into the drawing model rather than bolted onto it.
2. **A profile marketplace** — versioned jurisdiction, office, client and manufacturer profiles that third parties author, sign and sell; the compounding data and network asset.
3. **One semantic model driving Draft → Check → Render** across disciplines, tool-agnostic (no Revit/Autodesk dependency), with a geographic wedge Western incumbents ignore (Lagos EPPPS, mandatory since 1 April 2026).

**Two front doors, one engine.** *Idea mode* lets anyone — a homeowner, a developer with a plot, a designer pitching a job — type an idea and see concept options, numbers and renders in seconds, with every assumption listed and every output watermarked "Concept — not for construction". *Draft mode* is the professional product: question-first interpretation, fail-closed checks, signed stamps, issued drawings. **Promote to Draft** turns any concept into a professional drawing with its assumptions converted into questions and its provenance intact. Idea mode is the acquisition funnel and a consumer revenue line; it never dilutes the professional trust spine.

**Positioning line:** *Anyone can start. Professionals can issue.*

**One-liner for the site:** *Describe it, sketch it or upload it. See the idea in seconds. Get a checked, editable drawing and a faithful render — with every element traceable and every check signed.*

---

## 2. Problem and evidence

- Practices produce technical drawings under time pressure and personal liability. AI tools now generate and check drawings fast, but none show, per element, where a line came from or whether a check was actually performed. Scan-to-plan tools explicitly disclaim their output as "not suitable for permits… require a licensed professional".
- Compliance tooling is US-centric and code-text-centric (UpCodes: 1,700+ US codes, ~800k MAU) or regulator-walled (Archistar: 30+ governments). Nothing lets a practice in Manchester, Austin or Lagos load *its* jurisdiction, *its* client's standard and *its* office standard as stacked, versioned data.
- Cross-discipline coordination exists only inside BIM ecosystems (Autodesk, SWAPP). 2D-first practices, non-Revit shops and emerging markets have nothing.
- Lagos State discontinued and outlawed manual planning permits on 1 April 2026, targeting 40,000–45,000 approvals a year through EPPPS. No AI authoring or pre-check layer sits on top of it.
- Autodesk is colonising in-tool natural-language editing and standards flagging (Assistant GA in Revit April 2026, previews in AutoCAD/Civil 3D). Any product competing on those features alone will lose. Drawlogic must own layers Autodesk structurally will not: liability-grade verification, third-party profile marketplace, non-Autodesk geographies.

---

## 3. Goals, non-goals, success metrics

### Goals
- G1. A user can go from intent (text/sketch/reference/photo) to an exported, checked 2D drawing with full provenance in under 10 minutes on first use.
- G2. Every exported drawing carries a verification stamp that is honest: it lists checks performed, checks not performed, unverified rules, and the signer (if any).
- G3. Third parties can author, sign and publish profiles without Drawlogic engineering involvement.
- G4. Renders are provably geometry-faithful to the drawing they come from.
- G5. The platform works anywhere in the world on day one (Generic profile) and gets better wherever a signed profile exists.
- G6. A non-professional can get a concept (options, key numbers, render) from a single sentence in under 30 seconds with no project setup, and can hand it to a professional without losing anything.
- G7. A student is taught before being served: Learn mode gives inspiration and a sourced critique of the student's own idea before any drawing is generated, and every student export shows how much of the result was the student's thinking.

### Non-goals (explicit)
- Not a BIM authoring tool. No competition with Revit/ArchiCAD/Snaptrude/Motif on 3D modelling. A 3D model and studio renders are *generated from the DDL* at Stage 3 (5A); there is no 3D editing UI.
- Not a code-text library. No competition with UpCodes on code Q&A; profiles reference codes, they do not republish them.
- Not a "semantic BIM knowledge graph" product. The DDL is the internal model, not the headline.
- Not a general LLM co-designer. Conversation is the interface, not the product.
- Never claims legal compliance. Never invents design values (loads, ratings, sizes).
- Idea mode is not a construction-drawing product. Concept exports never resemble an issued drawing and never carry a ✓ from any rule.

### Success metrics
| Metric | Stage 1 target | Stage 2 target |
|---|---|---|
| Check precision (findings confirmed by client professionals) | ≥ 90% | ≥ 92% |
| Interpretation-card acceptance without edit | ≥ 60% | ≥ 75% |
| Render geometry fidelity (edge-overlay IoU vs source line-art) | > Veras on same input, ≥ 0.85 | ≥ 0.90 |
| Time to first exported drawing (new user) | < 10 min | < 6 min |
| Signed third-party profiles published | 3 (seeded) | 25, ≥ 10 external authors |
| Paying practices | 25 | 150 |
| Lagos pilot | — | 1 paying practice + LASPPPA engagement |
| Manufacturer listings | — | 3 paying |
| Free → paid conversion | 4% | 6% |
| Idea-mode time to first concept | < 30 s | < 20 s |
| Idea → Promote to Draft rate | 5% of concepts | 8% |
| Idea → professional handoff (marketplace signer) | — | 2% of concepts |
| Learn mode: critique points addressed before generation | ≥ 60% | ≥ 70% |
| Learn mode: revision cycles per exercise (median) | ≥ 1 | ≥ 1.5 |
| Institutions running exercises (Stage 3) | — | 5 |

---

## 4. Users

| Persona | Stage | Job to be done | What they pay for |
|---|---|---|---|
| **Architectural technologist / small-practice architect (UK)** | 1 | Produce Stage 4 details and drawings quickly without carrying unknown AI risk | Draft + Check + provenance; office profile |
| **Practice principal** | 1 | Sign issued drawings with a defensible audit trail | Verification stamp, audit log, PI-relevant record |
| **Lagos architect / planning consultant** | 2 | Prepare EPPPS-ready submissions that pass first time | Lagos profile, local-currency tier |
| **Code consultant / approved inspector** | 2 | Monetise expertise as a signed profile | Marketplace revenue share, authoring studio |
| **Manufacturer (roofing, insulation, windows, MEP)** | 2 | Be specified correctly in drawings | Paid product profile listing |
| **Regulator / planning authority** | 2–3 | Pre-check submissions at volume | PreCheck API (Archistar-style, but profile-driven) |
| **Student / academic** | 1 (Learn) | Get inspiration, have their own idea critiqued, and learn what works and what doesn't *before* anything is drawn | Free verified-student plan (Learn mode, 7.12) |
| **Tutor / institution** | 3 | Set exercises, see how much of a submission was the student's own thinking | Institution mode |
| **Electrical / civil / MEP engineer** | 3 | 2D schematics and layouts from prompts, coordinated with architecture | Discipline packs |
| **Homeowner / small landlord** | 1 (Idea) | See an extension, loft or refit before talking to anyone; know if it needs planning | Idea tier; handoff to a professional |
| **Property developer / sourcer (UK, Nigeria)** | 2 (Idea) | "I have a 60 × 120 ft plot in Lekki — what fits?" Massing and site options with coverage and setback flags | Idea tier per project; Promote to Draft; Lagos profile |
| **Small-business owner / interior designer pitching** | 1 (Idea) | Layout and look options for a shop, restaurant or office to win a client or a lease | Idea tier; renders; Promote to Draft when the job is won |

---

## 5. Scope by stage

### Stage 1 — Trust spine + one discipline end to end (months 0–6)
- Universal engine: DDL v0.1 with provenance enum and rule-state schema **from day one** (verified / unverified / no-rule). These are foundational; they are not retrofittable.
- Interpretation-card compiler as the default gate before any drawing is produced.
- **Architecture pack** only: construction details (12 types, below) + plans/sections/elevations at drawing level.
- Check engine with three profiles: **Generic** (conventions + good-practice checks, everywhere), **UK-England residential (Tier 1, in-house signed)** seeded from Approved Documents L, F, C, B, M and relevant BS/PAS; **US-IBC/IRC base (Tier 2, drafted, partially signed)**.
- Render Studio: render-from-drawing-twin (mode 1: detail → built view; mode 2: sketch/plan/elevation → photoreal, 4 variants, fixed-camera material swaps). Fidelity drift check on every job.
- Export DXF, PDF, SVG. Verification stamp on every export.
- Profile Authoring Studio v1 (author, version, sign, publish privately or to marketplace) — shipped so the marketplace starts compounding immediately.
- **Idea mode v1** for architecture and interior concepts: single-prompt entry, assumptions panel, 2–3 options, concept plan, render, key numbers, "Concept" watermark, Promote to Draft. Reuses the same compiler with looser required-constraint lists; precision target is "plausible and honest", not the 90% check-precision benchmark.
- Consumer **Idea tier** billing (Stripe).
- Billing: Free, Individual, Professional, Practice (Stripe).
- **Benchmark to advance:** ≥ 90% Check precision with pilot practices; render fidelity measurably above Veras on matched inputs; Idea-mode first concept < 30 s with ≥ 5% Promote-to-Draft rate.

### Stage 2 — Occupy the moats (months 6–12)
- **Lagos EPPPS profile** (Tier 2 → Tier 1 with local signer) + Paystack-billed Nigeria tier; pilot with one Lagos practice and open dialogue with LASPPPA.
- **Site feasibility in Idea mode (pulled forward from Stage 3):** plot dimensions or address → 2–3 massing/site options with coverage, setbacks, approximate floor areas and unit counts, checked against the Lagos and UK-England profiles' setback/coverage rules, rendered as aerial massing on the real satellite basemap with terrain and open context layers (FR-102–105). Uses the Urban & Site pack's site-plan drawing type only; full urban pack remains Stage 3. This is the Lagos consumer/developer wedge — nothing serves Nigerian plots today, and TestFit/Archistar serve only Western markets.
- **Preview video** (FR-55, FR-128–131): image-to-video from geometry-locked stills via the Higgsfield API behind the render provider abstraction — the investor-deck and client-pitch clip for developers and interior designers, labelled as a preview until the Stage 3 Studio tier exists.
- **Responsible-charge marketplace (Find a signer):** a concept or draft can be sent to a credentialed professional who takes responsible charge of it — reviewing, resolving and changing it in Draft mode — and signs. Not a stamp-for-hire service; see 7.11. Referral fee to Drawlogic.
- **Regulator PreCheck API**: stateless endpoint; drawing in, cited pass/flag report out, driven by the same profile engine.
- **Manufacturer product profiles**: first three paying manufacturers; "use System X" in the compiler.
- **Free verified-student plan in Learn mode** (7.12): critique-before-generation for the twelve architecture detail types.
- **MCP server + REST API** exposing compile / check / render so other agents can call Drawlogic as the drawing engine.
- Interior pack (plans, elevations, joinery, finishes/FF&E schedules) — same DDL, lowest incremental cost.
- Photo → as-existing drawing → proposed render (with verification stamp), building on the Stage 1 vision ingestion.
- **Go / no-go:** if neither a paying Lagos pilot nor a paying manufacturer converts within two quarters, narrow to UK/US and treat Africa as later expansion.

### Stage 3 — Widen disciplines, defend (months 12–24)
- **Electrical pack**: single-line diagrams and power/lighting layouts from prompts; IEC 60617 ↔ ANSI/IEEE 315 symbol switching as profile data. Nobody does prompt → SLD.
- **Urban & site pack** (full: masterplan layouts for large land holdings — plots, roads, phasing, open space — FAR/parking checks, land-use plans; site feasibility for single plots and small clusters ships in Stage 2) and **Civil pack** (roads, drainage layouts and long sections, levels). Survey and drone ingestion (FR-106) lands here.
- **Standards-hierarchy conflict detection** (project location vs client vs office vs manufacturer).
- **Multi-drawing coordination graph** on 2D sets ("17 affected drawings — update all?"), tool-agnostic.
- **Markup → revision automation** (Rev A + redlined PDF → Rev B with clouds and revision schedule).
- **PI-insurance-linked audit trail**: hash-chained per-drawing record (elements, provenance, signer, rule versions); conversation with a PI insurer.
- DWG export (ODA/APS licence), IFC export.
- **3D model and studio render** — see 5A below.
- **Re-evaluation trigger:** if Autodesk Assistant ships tool-agnostic third-party rule profiles or a signed-verification marketplace, pivot hard to geographies and disciplines Autodesk under-serves.

### 5A. Stage 3 extension — 3D model and studio render

**Position.** Drawlogic does not become a 3D modelling tool. The DDL remains the source of truth; a 3D model and cinematic renders are *generated from it* with provenance intact, and Revit, ArchiCAD, Lumion, Twinmotion and D5 remain export targets, not competitors. No geometry kernel and no 3D modelling UI are built.

**5A.1 What ships (Stage 3, months 12–24)**
- FR-120 (P2) **2D → 3D extrusion by rule.** A deterministic engine turns typed 2D objects into IFC entities (IfcWall with layered material set, IfcSlab, IfcOpeningElement, IfcWindow/IfcDoor from manufacturer profiles, IfcRoof, IfcSite) using plans for footprint, sections/details for build-up and heights, and project storey data for the vertical dimension. Every 3D element inherits the provenance of the 2D objects it came from; any value the extruder assumed (e.g. a storey height not stated) is `ai_inferred` in 3D.
- FR-121 (P2) **IFC export and import.** IFC4 out for Revit/ArchiCAD/Solibri; IFC in to derive 2D drawings and details from an existing model, which are then checked and signed like any other drawing.
- FR-122 (P2) **In-browser 3D viewer** (open IFC engine): orbit, sections, storey filter, element inspection with the same provenance chip, cross-pack clash list (e.g. structural opening vs architectural wall), quantities per element class. View and coordinate only; no editing in 3D.
- FR-123 (P2) **Studio render tier.** Ray-traced stills and camera-path video from the generated 3D model on a headless GPU render farm (Blender Cycles), with a PBR material library mapped from the DDL material map, sun from project location and date, cameras chosen in the viewer. Output carries the model and drawing hashes. Metered as Studio credits, priced above diffusion credits to cover compute.
- FR-124 (P2) **Fidelity by construction.** Studio renders are ray-traced from the model, so the diffusion drift check does not apply; the render's model hash is the guarantee. Diffusion renders remain for Idea mode and fast professional variants.
- FR-125 (P2) **Hand-off exports.** GLB/FBX with materials and IFC so users can open the model in Twinmotion, Lumion, D5, Unreal or their BIM tool. Marketed as export, never as integration.
- FR-126 (P2) **Speckle sync** (optional, demand-gated) for two-way exchange with Revit/ArchiCAD teams.
- **Narrated property film.** For estate agents, developers and sellers: a walkthrough with a spoken explainer generated from the drawing, not from a prompt. See FR-132–135 below.
- FR-132 (P2) **Script from the DDL.** A narration script is generated from the resolved model — room names, areas, orientation, storey heights, materials, what is existing vs proposed — with every spoken fact traced to a DDL element and its `source`. The script generator never invents a fact absent from the model.
- FR-133 (P2) **Provenance in the narration.** Any fact whose element is `ai_inferred` or `verify: true` is spoken with a hedge ("the ceiling height shown is assumed at 2.7 metres") or omitted; the script carries the same fail-closed discipline as the Standards Report. Facts from `user` or `reference` elements are spoken as stated.
- FR-134 (P2) **Voice and sync.** Text-to-speech via a voice provider behind the provider abstraction (engine type `voice`), synced to the Studio camera path so each room's narration plays as the camera enters it; language and units from the project profile. Output: MP4 with narration, burned or soft subtitles from the script, the model and drawing hashes in the metadata; an optional presenter overlay is a separate, clearly labelled add-on. Proposed (unbuilt) properties carry the "Illustrative" caption throughout.
- FR-135 (P1, Stage 2 interim) **Narrated property story.** Before the Studio walkthrough ships, the same DDL-driven, provenance-aware script narrates a stitched sequence of geometry-locked stills and Preview video clips (FR-55). Not labelled a walkthrough; positioned as a listing story for estate agents and developers, and the natural product for the Property Potential use case.
- FR-127 (P2, amended v0.2.4) **Generative video is preview-grade.** Generative video (Idea-mode teasers and Preview video for paid tiers, FR-55) is capped at 10 seconds per clip, always starts from a geometry-locked Drawlogic still, and is never sold as cinematic output or as a substitute for the Studio render tier (FR-123). Only ray-traced Studio output may be described as a flythrough or walkthrough of the model.

**5A.1a Generative-video backend (Stage 2, precedes 5A)**
- FR-128 (P1) **Provider.** Generative video runs through an aggregator API behind the render provider abstraction (engine type `generative_video`), with the Higgsfield API as the launch backend (pay-per-generation, 50+ image and video models incl. Kling, Seedance, Wan, MiniMax and Higgsfield DoP/Soul; official Node/TypeScript SDK; asynchronous jobs). The same key may serve as a secondary image-model provider for diffusion renders. Backend is swappable; no model-specific code outside the adapter.
- FR-129 (P1) **Inputs and pinning.** Every clip starts from a Render Studio still that carries a drawing hash. Where the chosen model accepts a start and end frame, both are Drawlogic stills of the same drawing (e.g. two camera positions) to limit drift; the adapter records which mode was used.
- FR-130 (P1) **Labelling.** Clips carry the source drawing hash and revision, the label "Generated preview — not a model render", and no fidelity score. Idea-mode clips also carry the Concept watermark. Marketing and UI copy call this "Preview video"; the words flythrough, walkthrough and cinematic are reserved for FR-123 Studio output.
- FR-131 (P1) **Metering, terms and safety.** Preview video is metered in render credits at a rate above stills (indicatively 10–20 credits per 10-second clip against a supplier cost in the ~$0.10–1.30 range per clip). Before enabling: confirm the provider's terms permit commercial use of outputs and do not use customer inputs for training (consistent with the no-training promise), and test moderation behaviour on architectural imagery; clips that fail moderation are retried with a different model in the catalogue, then surfaced to the user as failed, never silently altered.

**5A.2 Effort and cost (indicative)**
- Extrusion + IFC + viewer: ~1 engineer-quarter. Studio pipeline + material library: ~1 engineer-quarter. Both live in the existing Python geometry service plus a GPU worker pool.
- Cinematic render compute: low single dollars per still/short clip at 2026 cloud GPU rates; priced through Studio credits.
- Gate: ships only after the Stage 2 go/no-go passes and Stage 3 discipline packs are underway.

**5A.3 Stage 1 TRD hooks (so 5A is an extension, not a rewrite)**
1. **DDL objects carry 3D slots from v0.1**: stable `id`; nullable `height` / `level` / `base_offset`; materials referenced by `material_id` (not free text) so they can map to PBR assets later.
2. **Storey and datum are project data**: storey heights, FFLs and site datum live on the project, so plans and sections already share the vertical dimension.
3. **Material map is a stored artefact** keyed by `material_id`, produced by Render Studio for conditioning and reusable unchanged by the ray-traced pipeline.
4. **Render provider abstraction accepts engine type**: `diffusion` and `raytraced` are backends behind one interface from day one, alongside the image-model provider abstraction.

### Dropped or deprioritised (from the prior ChatGPT innovation list)
- "Semantic BIM knowledge graph" as a headline — Autodesk, Motif ($46m), Qonic own this; it stays internal.
- "LLM co-designer" as a differentiator — table stakes.
- Generic "confidence & audit layer" — only element-level provenance + fail-closed stamp are new; reframed accordingly.
- GIS-aware dynamic compliance near-term — Archistar's entrenched government GIS integrations; enter via profiles and emerging markets first.
- ISO 27001 as an innovation — hygiene, planned, not marketed as a differentiator.

---

## 6. Product principles (binding on every feature)

1. **Config is law.** Conventions, rules, symbol sets and document references live in versioned profiles, never in code.
2. **Generator / examiner separation.** LLMs propose DDL edits; deterministic solver and rule engine validate. The generator never grades its own work.
3. **Fail-closed.** No rule → ⚠ flag, never ✓. Unverified rule → ⚠ flag only. A missing design value blocks generation of anything that would imply a design decision.
4. **Provenance is not optional.** Every object carries `source` and `confidence`. An object with no source cannot exist in the model.
5. **Question first in Draft, assumptions visible in Idea.** In Draft mode the interpretation card gates every generation; ambiguity produces a question, never a confident guess. In Idea mode the compiler fills gaps with profile defaults so the user gets a result in seconds — but every filled value is listed in the assumptions panel as `ai_inferred`, is editable, and becomes a question the moment the concept is promoted. Speed never hides an assumption.
6. **Never invent engineering.** Loads, ratings, cable sizes, member sizes, fire periods: supplied or blocked.
7. **Honest stamps.** Every export states what was checked, what was not, and who signed. Concept exports carry a "Concept — not for construction" watermark that cannot be removed on any tier and never carry a ✓.
8. **Tool-agnostic.** DXF/PDF/SVG first; DWG and IFC as exports, not dependencies. No Revit plugin in the critical path.
9. **User data is never training data.** References and drawings are workspace-private and deletable; office profiles store conventions, not drawings.
10. **Simple in front, rigorous behind.** Idea mode is one text box and plain language; the professional machinery (card, checks, stamp, layers) appears only after Promote to Draft. Adding consumer simplicity never removes professional controls.

---

## 7. Functional requirements

Priority: **P0** = Stage 1 must-have · **P1** = Stage 1 should-have / Stage 2 · **P2** = Stage 3.

### 7.1 Workspaces, projects and profiles
- FR-01 (P0) Workspace with members, roles (Owner, Signer, Author, Member, Viewer), SSO at Practice tier.
- FR-02 (P0) Project holds: location (address or jurisdiction pick), building type, disciplines, units, active profile stack, office profile, client profile (optional), manufacturer profiles (optional).
- FR-03 (P0) Profile stack resolution order: project jurisdiction → regional amendment → client → office → manufacturer. Stage 3 adds conflict detection between layers (FR-60).
- FR-04 (P0) Every project displays its **coverage statement**: profiles in use, tier of each, signer of each, checks available vs not available.
- FR-05 (P1) Project memory: confirmed interpretations and user corrections persist per project and per workspace (the equivalent of SWAPP's "workflow memory", scoped to conventions and decisions, not drawings).

**Construction and material defaults (jurisdiction data, never prompt-dependent)**
- FR-06 (P0) Every jurisdiction profile carries a `construction_defaults` block: typical wall build-ups, frame type, roof types, floor construction, window and door systems, external and internal finishes, and the typical-details library keyed to those methods. Examples: NG-LA — sandcrete block walls with cement render and paint, reinforced concrete frame and slabs, aluminium sliding windows, long-span aluminium roofing sheets or concrete flat roof with parapet, ceramic/porcelain floor tiles; GB-ENG — brick outer leaf / cavity / block inner leaf, timber trussed pitched roof with concrete or clay tiles, uPVC or aluminium windows, plasterboard and skim.
- FR-07 (P0) Whenever a material or construction method is not stated by the user, the compiler (Draft and Idea), the typical-details library and the Render Studio material map take the value from the active jurisdiction profile's `construction_defaults`, record it as `source: profile` with the profile version, and list it in the assumptions panel or interpretation card in plain language ("I assumed sandcrete block walls with cement render — the usual construction in Lagos"). A user statement always overrides the default and becomes `source: user`.
- FR-08 (P0) The Generic profile resolves construction defaults by country and climate region where no signed jurisdiction profile exists (e.g. West Africa coastal → block-and-render, RC frame; Gulf → block, RC frame, external insulation and render; Northern Europe → brick or timber frame). These are recorded as `ai_inferred` with reduced confidence and `verify: true`, and in Draft mode the interpretation card asks the user to confirm them before generation.
- FR-09 (P0) Standards hierarchy for materials: the project jurisdiction's construction defaults govern; a client or office profile can override them only where it explicitly declares a material default, and the override is shown as such. A UK client standard attached to a Lagos project does not silently change the walls to brick cavity construction. **Test:** a Lagos project with no material instruction never yields a brick cavity wall build-up in DDL, typical details or renders; a Banbury project never yields sandcrete block by default.

### 7.2 Input and interpretation
- FR-10 (P0) Inputs: free text; sketch canvas; upload of PDF, DXF, PNG/JPG; site photo. Voice (P1, via transcription) — a differentiator no competitor ships, cheap to add once text works.
- FR-11 (P0) Reference ingestion: DXF parsed to DDL objects with `source: reference`; PDF/image interpreted by vision model with per-object confidence.
- FR-12 (P0) **Interpretation card** before any generation: discipline, drawing type, scale, units, profile stack, every recognised object with value and source, every missing required constraint. User confirms, edits or supplies. No card → no drawing.
- FR-13 (P0) Required-constraint lists are profile/pack data (e.g. a parapet detail requires wall build-up, parapet height, membrane system, coping material, fall direction).
- FR-14 (P0) Where a required value is engineering (load, rating, size) and absent, generation is blocked with a specific request; the card shows why.

### 7.3 Draft
- FR-20 (P0) Compiler produces DDL; constraint solver resolves dependent geometry; SVG renders in browser < 3 s for details, < 8 s for plans.
- FR-21 (P0) Natural-language editing in a chat-beside-drawing workspace; each instruction produces a DDL diff, shown as a change list, undoable.
- FR-22 (P0) Dimensions are constraints: changing one recomputes dependents; conflicts are surfaced, not silently resolved.
- FR-23 (P0) Architecture pack detail types at launch: window head, jamb, sill; door threshold; eaves; verge; parapet; warm flat-roof abutment; ground-floor/wall junction with DPC; cavity closer; wall-to-foundation; balcony threshold; steel beam bearing (drawing-level only).
- FR-24 (P0) Conventions applied from profile: sheet size, title block, dimension style, text heights, layer naming (ISO 13567 / BS EN ISO 19650 / AIA), line weights, annotation language.
- FR-25 (P1) Office profile learned from uploaded issued drawings (conventions only) and applied on request.
- FR-26 (P2) Plans, sections, elevations with schedules as views over objects (schedule and drawing cannot disagree).

### 7.4 Check
- FR-30 (P0) Rule engine evaluates the resolved DDL against the active profile stack on every change; deterministic; each rule carries `state ∈ {verified, unverified}`, document reference, version, signer.
- FR-31 (P0) Standards Report per drawing: ✓ pass (verified rule only), ⚠ flag (fail, unverified rule, or no rule), — out of scope. Every line cites the rule id and document reference.
- FR-32 (P0) "Checks not performed" section is mandatory and lists every check category the profile does not cover.
- FR-33 (P0) Auto-fix applies only deterministic corrections (e.g. move DPC to minimum height) and records `source: auto_fix`.
- FR-34 (P0) Generic profile ships good-practice checks that are jurisdiction-independent (geometry closure, dimension chain integrity, layer/symbol legend consistency, missing annotation, thermal-line continuity drawn, drainage path drawn).
- FR-35 (P1) Check history per drawing; diff between check runs.

### 7.5 Provenance, verification and audit (the trust spine)
- FR-40 (P0) Provenance enum on every object: `user`, `project`, `reference`, `profile`, `manufacturer`, `ai_inferred`, `auto_fix`. `verify: true` on any `ai_inferred` object below confidence threshold (default 0.8, profile-configurable).
- FR-41 (P0) Provenance colour layer toggle in the workspace; click any element for source, confidence, rule references and edit history.
- FR-42 (P0) **Verification stamp** on every export: profile stack and versions; checks performed / flagged / not performed; count of unverified objects; signer name and role or "UNSIGNED — professional verification required"; drawing hash; timestamp.
- FR-43 (P0) Signing: a workspace Signer reviews the Standards Report and provenance summary and signs; signature is recorded against the DDL version hash. Signing is per drawing revision.
- FR-44 (P0) Audit log: every DDL change with actor (user / AI model+version / auto_fix), timestamp, before/after hash. Exportable.
- FR-45 (P2) Hash-chained, tamper-evident audit record per drawing suitable for PI insurer review.

### 7.6 Render Studio
- FR-50 (P0) Render is generated from the DDL's own line-art, depth and material/ID map as hard conditioning — never from a screenshot alone.
- FR-51 (P0) Mode 1: detail/section → built view (exploded or photoreal). Mode 2: sketch/plan/elevation → photoreal; 4 variants (Stage 1), 16 (Stage 2); fixed-camera material swaps driven by the material map.
- FR-52 (P0) Fidelity drift check: edge-overlay IoU between render and source line-art computed on every job; below threshold → job fails and is retried, never delivered.
- FR-53 (P0) Renders carry the drawing hash they were generated from; a render of an outdated revision is labelled as such.
- FR-54 (P1) Mode 3: photo → as-existing drawing → proposed render on the same camera; output carries the verification stamp of the drawing, not the render.
- FR-55 (P1, Stage 2) **Preview video.** Image-to-video from a geometry-locked Render Studio still through the generative-video backend (see FR-128–131): a camera move — push-in, orbit, drift — of up to 10 seconds. The first frame is the faithful still; later frames may drift, so the output is labelled and metered as a preview, not a model render. 4K/32 MP still upscale (P2).
- FR-56 (P0) Credit metering per variant; watermark on Free tier; commercial licence on paid tiers.

### 7.7 Export
- FR-57 (P0) DXF (layers, blocks, dims, text preserved), PDF (vector, title block, stamp), SVG.
- FR-57a (P0) Render Studio material defaults come from `construction_defaults` (FR-06–09), never from the image model's priors: the material map passed as conditioning names the profile's materials explicitly, and the render prompt is assembled from the material map, not from free text about the building type.
- FR-58 (P2) DWG via licensed library; IFC via ifcopenshell.
- FR-59 (P0) Free-tier exports carry a visible "AI-assisted — professional verification required" stamp and Drawlogic title block; paid tiers substitute the practice title block and QA block.

### 7.8 Profile Authoring Studio and marketplace
- FR-60 (P0) Author creates a profile: metadata (jurisdiction / office / client / manufacturer type, scope, applicable documents with edition), conventions, required-constraint lists, rules (condition, threshold, document reference, severity), typical details. Structured editor plus raw JSON/YAML.
- FR-61 (P0) AI-assisted drafting: upload a regulatory or manufacturer document; engine drafts rules in schema; every drafted rule is `unverified` and highlighted.
- FR-62 (P0) Signing: a named professional (with declared credential, e.g. ARB/RIBA/CIAT number, PE licence, COREN number) signs a rule set; signer identity is public on the marketplace listing. Only signed rules can produce ✓.
- FR-63 (P0) Versioning with changelog; projects pin a profile version; upgrades are explicit.
- FR-64 (P0) Publish: private (workspace), shared (link), marketplace (public). Marketplace listing shows tier, signer, coverage, price, adoption count.
- FR-65 (P1) Revenue share 70/30 to author; Stripe Connect payouts; free profiles allowed.
- FR-66 (P1) Manufacturer product profiles: components with geometry templates, material data, required companion elements, installation constraints; "use System X" resolves in the compiler.
- FR-67 (P2) Standards-hierarchy conflict detection: rules from two active profiles that disagree are surfaced with a recommended governing layer; professional approval required; never auto-resolved.

### 7.9 API, MCP, integrations
- FR-70 (P1) REST API: compile, check, render, export; API keys per workspace; usage metered.
- FR-71 (P1) MCP server exposing the same operations so Claude/Cursor/other agents can request drawings and checks.
- FR-72 (P1) Regulator PreCheck endpoint: submission in (PDF/DXF), cited pass/flag report out, no persistence beyond the report unless the authority opts in.

### 7.10 Billing and plans
- FR-80 (P0) Stripe (GBP/USD/EUR local pricing), seats + render credit packs; FR-81 (P1) Paystack NGN tier; FR-82 (P1) verified-student plan (institution email or proof) — runs in Learn mode, see 7.12; FR-83 (P0) consumer Idea tier (monthly or per-project).

### 7.11 Responsible-charge marketplace (signing)
Context: no true marketplace exists today. The US has review-and-seal service firms (PEReviewStamp, LicensedPE, PEEngineer, PEStamping) and Fiverr gigs from ~€55; licensing boards treat "plan stamping" — sealing work not prepared by or under the licensee's supervision — as misconduct (e.g. Hawaii board notice, March 2025), while permitting a licensee to seal others' work only after substantive review with tests, calculations or changes as necessary ("responsible charge", e.g. Nevada NRS 625.565). The UK has no stamp regime: responsibility, not a seal, is what Building Control needs. Nigeria requires ARCON (architect) and COREN (engineer) seals on Lagos permit submissions, and seal-lending is a policed abuse. Drawlogic's differentiator is that its audit trail evidences the review — something no existing service can show.

- FR-110 (P1) The marketplace is named and marketed as a responsible-charge marketplace. The words "stamp marketplace" or "get your plans stamped" never appear in product or marketing copy.
- FR-111 (P1) **Signer verification (anti-impersonation).** A registry lookup alone is not enough — a fraudster can enter a real professional's licence number. Onboarding therefore binds three things together before a signer is activated: (a) *identity* — government ID plus liveness check via a KYC provider, name and date of birth captured; (b) *licence* — registry lookup (ARB register, US state board licence lookup, ARCON/COREN registers) with the registry record's name matched to the verified identity, plus upload of the licence certificate or registration card where the registry is not machine-checkable; (c) *contact* — a verified email or phone that matches the registry record where the registry publishes one, or the practice's domain. Any mismatch routes to manual review; no self-attestation path exists.
- FR-111a (P1) Verification levels shown publicly on the signer's listing: **Verified** (identity + registry match + contact), **Verified + Insured** (adds current PI certificate on file), **Pending** (never offered drawings). Requesters can only send to Verified or Verified + Insured signers.
- FR-111b (P1) Ongoing checks: automated registry re-check monthly where an API or scrapable register exists, otherwise annual re-verification with certificate re-upload; immediate suspension on registry lapse, suspension, or disciplinary listing; step-up re-authentication (2FA) at every signing event so a session cannot be borrowed.
- FR-111c (P1) Anti-fraud signals: one identity per account; a licence number can be bound to one Drawlogic account only (a second attempt triggers a fraud review of both); duplicate-device and duplicate-payout-account detection; velocity limits on signings per day per discipline; random sample of signed drawings reviewed by an independent professional in the same discipline.
- FR-111d (P1) Reporting and redress: a public "report this signer" route; a signer's verified name, credential type, jurisdiction and verification level appear on every stamp so an authority or client can check the registry themselves; Drawlogic notifies affected requesters and, where appropriate, the registry if a signer is found to be fraudulent.
- FR-111e (P2) Registry integrations as they become available (e.g. COREN and ARCON verification portals, NCEES/state board APIs, ARB open data) replace manual checks; until then manual review is the fallback, with SLA of 2 working days.
- FR-112 (P1) Jurisdiction and discipline matching is enforced: a signer can only be offered, and can only sign, drawings whose profile jurisdiction and discipline fall within their verified licence.
- FR-113 (P1) Signing gate. The stamp control is disabled until the signer has: opened every drawing in the set; resolved every `ai_inferred` item with `verify: true` (accept, change or reject); cleared or explicitly accepted every ⚠ flag with a note; and reviewed the Standards Report including "checks not performed". The gate is data-driven and cannot be bypassed by any role.
- FR-114 (P1) Review evidence is recorded in the hash-chained audit record: items opened, items changed (before/after), assumptions resolved, flags accepted with notes, total review time, signer identity and credential. The signer can export this record with the drawing as evidence of responsible charge.
- FR-115 (P1) The signature block on the stamp states the basis of signing: "Reviewed and modified under responsible charge by [name, credential, jurisdiction]" with the audit record hash. It never states "compliant".
- FR-116 (P1) Terms: the signer carries professional responsibility for the signed drawing; Drawlogic carries platform liability only; signers confirm they hold PI cover appropriate to their jurisdiction. Drawlogic may suspend signers on registry lapse, complaint or pattern evidence of trivial review (e.g. review time below a discipline threshold).
- FR-117 (P1) Handoff flow: requester selects a signer (or Drawlogic proposes a shortlist); scope and fee agreed in-platform; signer receives the drawing in Draft mode; requester sees progress states (received / under review / questions for you / signed); questions to the requester are asked through the assumptions panel.
- FR-118 (P2) Ratings are based on review evidence and outcome (permit accepted / rejected, if reported), not on speed.

### 7.12 Learn mode (student plan; also a toggle in Idea mode)
Principle: teach before you draw. For a verified student account the compiler does not generate first. The same mode is available to any Idea-mode user as a "Teach me first" toggle, because the engine is identical and the critique builds trust.

- FR-140 (P0) **Sequence.** Describe or sketch → inspiration → critique of the student's own proposal → revise → generate → compare → reflect. Generation is locked until at least one revision cycle has run, or the student chooses "Generate anyway", which is permitted and logged.
- FR-141 (P0) **Inspiration, not answers.** In response to the idea, Learn mode returns two or three precedents from the typical-details library and the active profile as *principles and partial diagrams* ("warm roof: insulation above the deck; membrane above insulation; upstand ≥ 150 mm"). It never returns a copy-ready detail at this step.
- FR-142 (P0) **Critique with reasons and sources.** The AI reads the student's sketch/description and returns what works and what doesn't, each point graded green / amber / red with a plain-language reason and a source: a profile rule and its document reference where one exists, otherwise "general good practice — not a verified check". Judgement clauses are tagged "discuss with your tutor" rather than graded. Engineering values are never supplied; the critique asks for them.
- FR-143 (P0) **Socratic by default.** The critique points to the principle and asks the student to fix it; a worked answer for any point is revealed only after the student has attempted a revision on that point (or after "Generate anyway").
- FR-144 (P0) **Generate and compare.** After generation, the Standards Report is presented as a feedback report with explanations, and a side-by-side shows the student's original against the generated drawing with every difference annotated: what changed, why, and which critique point it resolves. The full provenance layer is on.
- FR-145 (P1) **Reflection prompts.** Three short questions after each exercise with model answers revealed after an attempt.
- FR-146 (P0) **Integrity export.** Student exports carry a "Student — educational use" watermark and a provenance summary: share of elements student-supplied vs AI-inferred, critique points raised vs addressed, revision cycles, and whether "Generate anyway" was used. The summary is exportable alongside the drawing for submission.
- FR-147 (P0) **No bypass on the student plan.** The critique step cannot be disabled on verified-student accounts; the only route past it is the logged "Generate anyway".
- FR-148 (P2) **Institution mode.** Tutors set exercises from the detail-type library, choose which critique categories are visible, and receive the provenance summary with submissions; cohort view of common failure points. Sold to institutions; free to students.
- FR-149 (P1) **"Teach me first" toggle in Idea mode.** Any Idea-mode user can switch on the Learn sequence for a request; when on, the assumptions panel is replaced by the critique panel and the concept is generated only after the revise step. Outputs keep Idea-mode watermarking and labelling.

### 7.13 Idea mode (non-professional entry)
- FR-90 (P0) Entry is a single text box plus optional upload (photo, sketch, plan) and an optional location. No project setup; location, units and profile are inferred and shown, and can be changed inline.
- FR-91 (P0) Required-constraint lists in Idea mode are minimal (Idea-mode variant per drawing type in pack data). Every missing value is filled from profile defaults and recorded as `ai_inferred` with `verify: true`.
- FR-92 (P0) **Assumptions panel** beside every result lists each inferred value in plain language ("I assumed 3 m ceilings", "I assumed the plot faces north"), editable inline; editing regenerates.
- FR-93 (P0) Output per request: 2–3 options; for each, a concept plan or massing, key numbers (floor area, rooms, coverage, parking where relevant), and one render. Options are labelled by what differs ("more garden", "extra bedroom", "cheaper build").
- FR-94 (P0) Plain-language layer: technical terms replaced by everyday phrasing with the technical term available on hover/tap; no layer names, dimension styles or profile jargon visible.
- FR-95 (P0) First result in < 30 s (fast model tier, cached profile defaults, single low-resolution render first, higher resolution on demand).
- FR-96 (P0) Concept watermark on every image, plan and export; concept exports are PNG/PDF only (no DXF) unless promoted.
- FR-97 (P0) Idea-mode checks run the Generic profile plus any jurisdiction "flags" rules (e.g. permitted development limits, setbacks) and report in plain language as "things to check with a professional" — never as pass/fail.
- FR-98 (P0) **Promote to Draft:** one action creates a Draft-mode drawing from the concept; every `ai_inferred` value becomes an open question on the interpretation card; provenance and the assumptions history are preserved. Available to the user's own workspace or sent to a chosen professional (FR-99).
- FR-99 (P1) **Find a signer:** the concept or draft can be sent to a professional listed on the responsible-charge marketplace (filtered by jurisdiction, discipline, credential); the professional receives it in Draft mode with all assumptions as open questions; signing is gated by the review-evidence rules in 7.11; Drawlogic takes a referral fee.
- FR-100 (P1) Site feasibility flow: plot dimensions or address → massing/site options with coverage, setbacks and approximate areas checked against the active jurisdiction profile's site rules; aerial massing render. Stage 2, Lagos and UK-England first.
- FR-101 (P1) Saved ideas, share links, and "compare options" view for non-professional users; no workspace concepts exposed.

**Site context from geodata (supports FR-100 and the Stage 3 Urban & Site and Survey packs)**
- FR-102 (P1) **Basemap and terrain from a location.** From an address or dropped pin, the site-feasibility flow fetches licensed satellite/aerial imagery as the basemap and a public elevation model (Copernicus DEM/SRTM globally; national LiDAR where available, e.g. England) for slope, fall direction and indicative cut/fill. The developer draws or confirms the plot boundary on the imagery. An uploaded survey plan (e.g. Lagos UTM Zone 31) always governs over a traced boundary, and the assumptions panel states which is in use.
- FR-103 (P1) **Open context layers.** Roads, water bodies, power lines, railways and neighbouring land use from OpenStreetMap and national open data are shown under the layout and used by the generator for access points, buffers and orientation.
- FR-104 (P1) **Constraint layers as "things to check".** Where public layers exist (flood zones, conservation areas, protected trees, utility easements) they are displayed and surfaced in plain language as items to check with a professional. They are never used to make a pass/fail determination or a zoning/permission claim.
- FR-105 (P1) **Geodata provenance.** Imagery date and resolution, boundary source (traced vs survey), elevation model and its resolution, and each context layer's source appear in the assumptions panel and, on promotion, as `source: reference` objects with confidence. A note states that imagery may be out of date and that a 30 m elevation grid is not suitable for drainage design.
- FR-106 (P2) **Survey and drone ingestion.** Upload of photogrammetry outputs (DEM, orthomosaic, point cloud from DroneDeploy/Pix4D-class tools) and surveyed contours replaces public terrain for the site; the readiness checklist requires surveyed levels before a site layout can be promoted to a submission-grade drawing.
- TRD note: use Mapbox or Esri imagery under licence (Google Maps tiles are not permitted as a design basemap under Google's terms); tile loads and DEM fetches are metered inside site-feasibility credits.

---

## 8. Non-functional requirements

- **Liability language.** UI and exports never use "compliant", "approved" or "meets code". Fixed phrasing: "passes automated checks against [profile vX, tier, signer]; ⚠ items require professional verification; checks not performed: [list]". Terms place responsibility on the signing professional.
- **Performance.** Interpretation card < 15 s from upload; detail re-render < 3 s; check < 5 s; render < 60 s.
- **Availability.** 99.5% Stage 1; 99.9% for PreCheck API in Stage 2.
- **Security (hygiene, not marketing).** Encryption at rest/in transit; RLS per workspace; audit log immutable; ISO 27001 programme started Stage 2; SOC 2 Type I by Stage 3.
- **Data.** No training on customer data; deletion within 30 days; data residency option (UK/EU/US) at Practice tier.
- **Accessibility.** WCAG 2.2 AA for the web app.
- **Localisation.** Annotation language and units from profile; UI English at launch, Yoruba/French/Arabic UI candidates Stage 3.

---

## 8A. AI model allocation (v0.2.8, 22 September 2026)

**Principle.** Models are components behind `contracts/providers`, configured in `contracts/models.json`, never hard-coded. The DDL, constraint solver and rule engine are deterministic code and call no model at runtime — "which model runs the rule engine" is a build-time question (who writes the code), not a runtime one. Every generated image, clip or voice comes from a render/voice provider, never from a language model. Allocation is re-decided by the eval harness (TESTING.md) each quarter and on each major model release.

**8A.1 Runtime routing (defaults at 22 Sept 2026)**

| Task | Default model | Effort | Rationale |
|---|---|---|---|
| Routing, classification, plain-language rewrites, tooltips | Claude Haiku 4.5 | — | Cheapest; latency |
| Idea mode: interpretation, options, assumptions (DDL-first) | Claude Sonnet 5 | low–medium | < 30 s and consumer-tier economics |
| Learn mode: inspiration and critique | Claude Sonnet 5 | medium | Cited, graded critique on the free student tier |
| **Promote to Draft** (assumptions → interpretation-card questions) | Claude Opus 5.5 | medium | The funnel's integrity point; provenance must survive |
| Draft interpretation from references (PDF/image/sketch/photo → card) | **Eval-decided**; provisional Claude Opus 5.5 | high | Candidates Opus 5.5, Sonnet 5, GPT-6 Astra; Opus 5.5 provisional because Anthropic reports sharper reading of diagrams and layout-dependent visuals |
| Draft compile (card → DDL), natural-language edits | Claude Opus 5.5 | medium | Structured output against the DDL schema |
| Check explanations, standards-hierarchy conflicts | Claude Opus 5.5 | medium | Reasoning over rule text; never decides pass/fail |
| Profile drafting from regulatory documents | Claude Opus 5.5 via Batch API | high | Long documents; not latency-bound; half price |
| Narration scripts (FR-132–135) | Claude Opus 5.5 | medium | Fail-closed facts from DDL |
| Stills, video, voice | Render/voice providers (5A.1a, FR-134) | — | Pixels and audio are never an LLM output |
| Stage 3 Blender scene assembly | Deterministic scripts, no runtime agent | — | Scripts are written at build time (8A.3) |

GPT-6 Astra is a runtime candidate only for reference interpretation, and only if it wins the eval and OpenAI's API terms exclude training on inputs (PROVIDERS.md). Claude Fable 5.1 is an eval ceiling reference, not a production default, at $10/$50.

Indicative cost per Idea concept with a cached ~30k-token prefix (profile stack, schema, pack vocabulary): about $0.06 on Sonnet 5 and $0.12 on Opus 5.5 — acceptable for Promote and Draft, not as the default under a $14/month tier. Estimates, to be replaced by eval measurements.

**8A.2 Claude Opus 5.5 integration rules (from Anthropic's Opus 5.5 documentation)**
- **No forced tool use.** `tool_choice` `any`/`tool` returns an error. All structured outputs — interpretation payload, DDL diffs, critique points, narration segments — use structured outputs or strict tool use with `tool_choice: auto`, with the schemas in `contracts/`.
- **Thinking is always on; effort is the control.** Default effort is `medium`; every call sets effort explicitly from `models.json` and leaves `max_tokens` headroom for thinking.
- **Thinking blocks are bound to the model and to an unchanged prefix.** For accounts created after 31 August 2026 a changed system prompt or tools before a replayed thinking block returns an error. Workspace conversations are therefore append-only; profile, mode or drawing-context changes enter as mid-conversation system messages; a thread never switches model mid-conversation — a model change starts a new thread seeded from the DDL, which is the source of truth anyway.
- **Refusals are handled, never hidden.** `stop_reason: refusal` triggers the configured fallback; the event is logged and surfaced; output is never silently altered.
- **Caching is designed in.** Profile stack, schemas, pack vocabulary and typical details form a stable cached prefix (512-token minimum; Opus 5.5 cache reads $0.20 per million).
- **Compaction on demand** for long Draft workspace sessions.

**8A.3 Build-time allocation (which agent writes which code)**

| Area | Builder | Examiner (writes the gating tests) |
|---|---|---|
| `contracts/` | Claude Code (drafts; PR-only thereafter) | Codex reviews |
| `engine/core/` — DDL, solver, rule runtime, interpret, critique, narration, profile drafting | **Claude Code (Opus 5.5)** | **Codex** — golden fixtures and property tests |
| `trust/` — provenance, stamp, gate, audit, verification | Claude Code | Codex — trust-rule and gate tests |
| `app/`, `profiles/` | Claude Code | Codex — journey and profile tests |
| `engine/render/`, `engine/geo/`, `engine/providers/` (render, video, voice, geo adapters), `engine/3d/` (Stage 3 extrusion and Blender pipeline) | **Codex (GPT-6 Astra)** | Claude Code — render fixtures, drift tests |
| `site/` (marketing) | Codex | Claude Code — banned-words and accessibility tests |

Rule: the agent that builds a module never writes the tests that gate it. This is generator/examiner separation applied to code as well as to runtime output.

## 9. Key user flows

1. **First drawing (Stage 1 hero flow).** Sign up → create project (address → jurisdiction detected, profile stack shown with coverage statement) → "What are you drawing?" → upload reference PDF + type constraints → interpretation card → confirm → drawing appears with provenance colours → Standards Report on the right → natural-language edits → Signer signs → export PDF/DXF with stamp → optional "show me this built" → render in Render Studio.
2. **Author a profile.** Studio → new profile → upload Approved Document → AI drafts rules (all unverified) → author edits → signs with credential → publishes to marketplace with price.
3. **Lagos submission (Stage 2).** Project in Lagos → EPPPS profile applied → drawings produced → PreCheck report attached → package exported in EPPPS-required format.
4. **Regulator PreCheck (Stage 2).** Authority posts submission to API → cited report returned in < 5 min → authority reviewer opens flagged items.
5. **Idea mode — homeowner (Stage 1).** Land on home → type "extend my kitchen 3 m into the garden, bifold doors" → optional photo of the existing kitchen → 20 s → three options with a concept plan, render and "things to check" (permitted-development depth flag) → edit an assumption → share link → Promote to Draft or Find a signer.
6. **Idea mode — developer (Stage 2).** Type "60 × 120 ft plot in Lekki, 4-bed duplex with BQ and gate house" → Lagos profile inferred → three massing/site options with coverage %, setback flags, floor areas, aerial render → Promote to Draft → Lagos architect receives it with assumptions as questions.
7. **Idea mode — interior designer (Stage 1).** Type "80-cover restaurant, 200 m², moody, open kitchen" → layout options + finish concepts + fixed-camera renders with finish swaps → client picks → Promote to Draft → joinery and finishes schedules in Draft mode.

---

## 10. Pricing and packaging

| Plan | Price | Includes |
|---|---|---|
| **Free** | $0 | 3 Idea-mode concepts/month with low-res renders; 3 Draft drawings/month, Generic + public profiles, provenance, Standards Report, 5 watermarked renders, stamped exports. Must be genuinely useful — Snaptrude and Zoo set that bar. |
| **Idea** | $14/mo or $29/project | Unlimited concepts, assumptions editing, 40 render credits, share links, saved ideas, Find a signer. Consumer pricing against Visualizee ($15) and Planner 5D; Idea mode is never the justification for professional seat prices. |
| **Individual** | $49/mo | Unlimited drafts, all available profiles, 60 render credits, DXF/PDF/SVG, signing (self). |
| **Professional** | $179/user/mo | + office profile, project memory, 250 credits, client profiles, API access, priority check queue. Justified only because Draft + Check + Render + provenance are bundled; each replaces a point tool ($99 ArchiLabs, $25–270 checkers, $35–80 renderers). |
| **Practice** | $1,099/mo (5 seats) + $149/seat | + Signer roles, audit export, SSO, private marketplace, data residency. Positioned as replacing 3–4 point tools; below TestFit ($8–10k/yr) and STACK multi-seat. |
| **Enterprise / Regulator** | Custom | PreCheck API, SLA, on-prem reference store, custom profiles. |
| **Nigeria / emerging-market tier** | Paystack, ~70% below USD list | Same features; cross-subsidised. Idea tier in NGN is the Lagos developer entry point. |
| **Student** | Free (verified) | Learn mode (critique before generation), architecture detail types, non-commercial, "Student — educational use" watermark with provenance summary. |
| **Institution** | Custom (Stage 3) | Tutor exercises, cohort view, provenance summaries with submissions. |
| **Render credits** | $19 / 100 | 1 credit = 1 image variant; a 10-second Preview video costs 10–20 credits. |
| **Marketplace** | 70/30 to authors | Headline revenue line, not an afterthought. |
| **Manufacturer listing** | $3k–$15k/yr | Signed product profiles, specification analytics. |
| **Responsible-charge marketplace referral** | 10–15% of the professional's fee, or fixed lead fee | Fourth revenue line; concept/draft → professional under responsible charge. |

---

## 11. Go-to-market summary (detailed launch plan is a later artefact)

- **Stage 1 cohort:** UK architectural technologists and 1–15-person practices producing Stage 4 information (CIAT community, LABC-adjacent content, LinkedIn). Marketing asset is the product: "reference → checked detail → render, 60 seconds" clips with the provenance layer visible.
- **Stage 2 cohorts:** Lagos practices and planning consultants (EPPPS mandatory, volume tripling); Lagos and UK developers via the site-feasibility Idea flow; manufacturers via specification analytics; students via institution partnerships; agent developers via MCP.
- **Idea-mode acquisition:** consumer-facing content ("what can I build on my plot", "see your extension in 20 seconds"), share links as the viral loop, Find-a-signer as the bridge into the professional base.
- **Channels to avoid:** Autodesk Marketplace as a primary channel (dependency); Revit plugin as a wedge (SWAPP/ArchiLabs territory).

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Autodesk ships equivalent NL editing + standards flagging natively | Do not compete there; own verification, marketplace, non-Autodesk geographies; Stage 3 re-evaluation trigger |
| Liability from a wrong ✓ | Fail-closed; only signed rules produce ✓; stamp lists exclusions; signer responsibility in terms; PI cover for Drawlogic itself |
| Profile quality / bad-faith authors | Signer credentials verified; marketplace ratings; Drawlogic can suspend profiles; Tier labels visible everywhere |
| Lagos pilot fails to convert | Go/no-go at two quarters; Africa becomes later expansion |
| Render fidelity claims fail in practice | Automated drift check; publish the metric; fail rather than ship |
| DWG format dependency | DXF first; licensed DWG in Stage 3; never reverse-engineer |
| Reference-drawing IP | Workspace-private, never trained on, deletable; conventions-only office profiles |
| Model commoditisation | Moat is DDL, profiles, solver, parser, audit trail — model-agnostic by design |
| Scope creep toward "all disciplines now" | Packs are data; Stage 1 ships one pack end to end; benchmarks gate expansion |
| Idea mode dilutes the professional trust spine or brand | Two front doors, one engine; professional controls untouched behind Promote to Draft; concept watermark non-removable; Idea outputs never carry ✓ |
| Non-professionals treat concepts as buildable | Watermark, plain-language "things to check with a professional", no DXF from Idea mode, Find-a-signer path always visible |
| Marketplace becomes "plan stamping" and draws regulator action | Responsible-charge naming; registry-verified credentials; jurisdiction/discipline enforcement; data-driven signing gate; evidenced review in the audit record; suspension on trivial-review patterns; signer-carries-responsibility terms |
| Fake or impersonated professionals sign drawings | Identity (KYC + liveness) bound to registry record and contact (FR-111); licence number bound to one account; 2FA at every signing; monthly registry re-checks; sample audits; public verification level on every stamp; reporting route and registry notification |
| Consumer support and cost per concept | Fast model tier, low-res-first renders, rate limits on Free; Idea tier priced to cover inference |
| Learn mode becomes a homework machine / institutions ban it | Critique-before-generation cannot be disabled on student accounts; "Generate anyway" is logged; integrity export shows student-supplied vs AI-inferred share and critique points addressed; institution mode gives tutors the same view |
| Idea mode competes with cheap visualisers on features it can't win | Compete on honesty (assumptions panel), numbers (areas, coverage, flags) and the handoff to a real drawing — not on render quality alone |

---

## 13. Decisions required from Tokunbo

1. Confirm **architecture-only at Stage 1** (this PRD supersedes the earlier "four packs at launch" decision, per the research recommendation). Interior follows in Stage 2 at low cost.
2. Confirm **US-IBC/IRC base as Tier 2 at launch** vs deferring it entirely to focus signing effort on UK-England.
3. Confirm **Lagos as the Stage 2 wedge** and whether GeoBuild/LagosLandCore contacts can be used for the LASPPPA conversation.
4. **Working name.** Drawlogic is the placeholder; domain and trademark check before design system.
5. **Signer credential verification method** at launch (manual review vs registry lookup for ARB/RIBA/CIAT/COREN).
6. **Image/video provider** for Render Studio — must support edge/depth conditioning and region edits; decision belongs in the TRD but affects Stage 1 cost.
7. **Idea tier price point** ($14/mo vs per-project $29) and whether Free includes any Idea-mode renders at all.
8. **Responsible-charge marketplace at Stage 2 or Stage 3** — it needs enough registry-verified professionals to be credible, and the signing gate (FR-113) must be legally reviewed per jurisdiction (US state boards, ARB, ARCON/COREN) before launch. Confirm whether the UK pilot practices will opt in as the first signers, and whether the Lagos pilot practice will act as the first ARCON/COREN signer.
9. ~~Idea mode brand~~ **Decided (15 Sept 2026):** one product name, two modes — "Idea mode" and "Draft mode" inside Drawlogic, no separate consumer name. Marketing site includes a dedicated Lagos page from launch.

---

## Appendix A — DDL v0.1 core (product-level; full schema in TRD)

```json
{
  "drawing": {
    "id": "uuid", "discipline": "architecture", "type": "detail",
    "scale": 10, "units": "mm", "rev": "B", "hash": "sha256",
    "profile_stack": [ { "id": "gb-eng-residential", "version": "1.3", "tier": 1, "signer": "..." } ]
  },
  "objects": [
    { "id": "wall_outer", "class": "masonry", "material": "brick_102.5", "thickness": 102.5,
      "source": "user", "confidence": 1.0, "verify": false, "rule_refs": [] },
    { "id": "ins_01", "class": "insulation", "material": "PIR", "thickness": 120,
      "source": "ai_inferred", "confidence": 0.78, "verify": true, "rule_refs": ["gb-eng-L-4.2"] }
  ],
  "constraints": [ { "type": "sum", "of": ["wall_outer","cavity","ins_01","wall_inner"], "equals": "wall_total" } ],
  "dimensions": [], "annotations": [], "layers": [], "schedules": [],
  "checks": { "run_id": "uuid", "profile_versions": {}, "results": [] },
  "stamp": { "signed": false, "signer": null, "checks_performed": [], "checks_not_performed": [], "unverified_objects": 1 }
}
```

## Appendix B — Rule record

```yaml
id: gb-eng-C-dpc-height
profile: gb-eng-residential@1.3
state: verified            # verified | unverified
signer: { name: "...", credential: "CIAT 12345", signed_at: "2026-10-02" }
document: { ref: "Approved Document C", edition: "2013 incl. 2015 amendments", clause: "5.4" }
applies_to: { drawing_type: "detail", object_class: "dpc" }
condition: "dpc.height_above_ground >= 150"
severity: flag             # flag | info
auto_fix: { action: "set", field: "height_above_ground", value: 150 }
message: "DPC should be at least 150 mm above external ground level."
```

## Appendix C — Verification stamp (export block)

```
DRAWLOGIC VERIFICATION
Profiles: GB-ENG Residential v1.3 (Tier 1, signed: J. Smith CIAT 12345) · Generic v0.9
Checks performed: 41 · Passed: 38 · Flagged: 3 · Not performed: fire stopping, structural, acoustic
Unverified elements: 1 (ins_01 — insulation type inferred)
Signed: UNSIGNED — professional verification required
Drawing hash: 4f2a…c91e · Generated: 2026-09-14 14:02 UTC
This is an automated design-rule check. It is not a statement of legal compliance.
```

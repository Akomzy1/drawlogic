# DECISIONS.md — open decisions (no agent resolves these by assumption)

Status: OPEN unless marked. Decided items record date and answer.

| # | Decision | Status |
|---|---|---|
| 1 | Architecture-only at Stage 1 (Interior at Stage 2; Electrical/Urban/Civil at Stage 3) | OPEN — PRD assumes yes |
| 2 | Ship US-IBC/IRC base as Tier 2 at launch, or defer to concentrate signing on GB-ENG | OPEN |
| 3 | Lagos as Stage 2 wedge; use GeoBuild/LagosLandCore contacts for LASPPPA | OPEN |
| 4 | Working name "Drawlogic" — domain and trademark check | OPEN |
| 5 | Signer credential verification: KYC provider choice; manual review vs registry API per jurisdiction | OPEN |
| 6 | Image/video providers: diffusion provider with edge/depth conditioning; Higgsfield API terms (commercial use, no training) | OPEN — gate before FR-128 ships |
| 7 | Idea tier price point ($14/mo vs $29/project) and whether Free includes Idea renders | OPEN |
| 8 | Responsible-charge marketplace at Stage 2 or 3; legal review of signing gate per jurisdiction; first UK and Lagos signers | OPEN |
| 9 | Idea mode brand | **DECIDED 15 Sept 2026** — one product name, two modes, no separate consumer name; dedicated Lagos page on the site |
| 10 | Learn mode available to non-students as "Teach me first" toggle | **DECIDED 19 Sept 2026** — yes |
| 11 | Basemap provider (Mapbox vs Esri) and tile metering rate | OPEN |
| 12 | Nigeria pricing fixed in NGN for 12 months at the v0.2 table | **DECIDED 25 Sept 2026** — Prices in PRD §10. |
| 13 | Reference-interpretation model (Opus 5.5 vs Sonnet 5 vs GPT-6 Astra) | OPEN — eval-decided in Prompt 9; provisional default Opus 5.5 |
| 14 | Agent allocation: Claude Code builds contracts, engine/core, trust, app, profiles; Codex builds render, geo, providers, 3d, site; each examines the other | **APPLIED 22 Sept 2026** (PRD §8A.3) — revert here if not wanted |
| 15 | Runtime routing defaults per PRD §8A.1 (Haiku 4.5 / Sonnet 5 / Opus 5.5) | **APPLIED 22 Sept 2026** — revisit on eval results and each model release |
| 16 | Marketing site follows design/prototype/marketing-site.html; Codex rebuild instruction withdrawn | **DECIDED 25 Sept 2026** — the prototype is the only approved design for `site/`, including Home. The rebuild Home ("See it before you build it") and all rebuild-only pages, sections and motion are superseded and removed, not adapted; existing `site/` code is reused only where it matches the prototype. Assets outside the approved manifest are dropped or listed in DESIGN_GAPS.md. Home's "Three things people ask it for" (kitchen extension, Lekki plot, restaurant) is approved as exported (Tokunbo, 25 Sept): no "Try one of these" strip or landlord card is added, and the HMO case does not appear on the site. |
| 17 | Rate-data source per launch market for quantities and cost (PRD §5B, FR-151/153): UK — BCIS/SPONs licence vs QS-authored rate profiles; US — RSMeans licence vs QS-authored; Nigeria — QS-authored | OPEN |
| 18 | Student reach reward values (PRD FR-168, FR-170, FR-171): the exported screens show 20 render credits per rewarded share, 10 per referred classmate who completes an exercise, referral credits that do not expire while student status is verified, ambassador pay, and a £750 book grant plus 12 months of Individual as a challenge prize; the PRD sets none of these | OPEN |
| 19 | Legal review of precedent search, image licensing and the replicate-a-named-work rule (PRD §7.14, FR-173–177) in the UK, US and Nigeria, before Stage 2 launch | OPEN |

Process: an agent that hits an OPEN decision stops, states which one, and proposes at most two options. Tokunbo decides; the row is updated in the same PR as the work.

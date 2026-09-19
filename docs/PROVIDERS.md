# PROVIDERS.md — external providers and the checks before enabling each

| Provider | Role | Adapter | Pre-enable checks |
|---|---|---|---|
| Claude API (Haiku/Sonnet/Opus) | routing, interpretation, compile, explanations | `engine/providers/llm/anthropic` | commercial terms; no-training setting confirmed; data residency for Practice tier |
| Diffusion image provider (TBD, Decision 6) | Render Studio stills | `engine/providers/render/diffusion/*` | supports edge/depth conditioning and region edits; terms exclude training on inputs; latency < 60 s |
| Higgsfield API | Preview video (`generative_video`); optional secondary image provider | `engine/providers/render/generative_video/higgsfield` | commercial use of outputs; no training on inputs; start+end frame support per model recorded; moderation behaviour on architectural imagery tested; spend cap set |
| Blender Cycles farm (Stage 3) | Studio ray-traced renders | `engine/providers/render/raytraced/blender` | GPU cost model; per-job cap |
| Mapbox or Esri (Decision 11) | basemap tiles | `engine/providers/geo/tiles` | licence permits design basemap use (Google tiles do not); tile metering |
| Copernicus DEM / SRTM / national LiDAR | terrain | `engine/providers/geo/terrain` | attribution; resolution recorded in provenance |
| OpenStreetMap | context layers | `engine/providers/geo/osm` | ODbL attribution in UI |
| KYC provider (Decision 5; Smile ID for NG, Onfido/Veriff for UK/US) | signer identity + liveness | `trust/verification/kyc` | data retention; cost per check priced into referral fee |
| Stripe / Paystack | billing | `app/billing` | NGN tier eligibility rules |
| Resend, PostHog, Sentry, Inngest, Supabase, Vercel | infra | — | standard |

A provider is enabled only when its row's checks are ticked in the PR that turns it on.

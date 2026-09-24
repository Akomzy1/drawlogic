# PROVIDERS.md — external providers and the checks before enabling each

| Provider | Role | Adapter | Pre-enable checks |
|---|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`, $4/$20 per M; cache read $0.20; Batch $2/$10) | Promote to Draft, Draft compile, explanations, profile drafting (Batch), narration; provisional reference interpretation | `engine/core/providers/llm/anthropic` | commercial terms; no-training confirmed; data residency for Practice tier; §8A.2 rules implemented (no forced tool use, explicit effort, append-only threads, refusal fallback) |
| Claude Sonnet 5 (`claude-sonnet-5`, $2/$10) | Idea mode, Learn critique | same adapter | as above |
| Claude Haiku 4.5 (`claude-haiku-4-5-20251001`, $1/$5) | routing, classification, plain-language rewrites | same adapter | as above |
| Claude Fable 5.1 (`claude-fable-5-1`, $10/$50) | eval ceiling reference only | same adapter | not enabled in production |
| GPT-6 Astra (OpenAI API, $10/$50 per M) | eval candidate for reference interpretation only | `engine/core/providers/llm/openai` | OpenAI API terms exclude training on inputs; data residency; wins the eval on accuracy and calibration at acceptable cost/latency |
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

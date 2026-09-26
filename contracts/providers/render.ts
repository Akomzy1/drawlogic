// Render provider interface. Version 0.1.0. PRD §7.6 FR-50–56, FR-57a, FR-160–164, §5A.1a FR-128–131, FR-123, FR-134, 5A.3 hook 4.
// One interface, engine type chosen per job. No provider-specific code outside the adapter. Labels are copy.json keys.

import type { NarrationScript } from "../generated/ts/contracts";

export type RenderEngine = "diffusion" | "generative_video" | "raytraced" | "voice";

export type MaterialBasis = "manufacturer_texture" | "sample_photo" | "colour_code" | "description_only";

/** One material in the stored material map (5A.3 hook 3), keyed by material_id. Built from construction_defaults, never from building-type text (FR-57a). */
export interface MaterialMapEntry {
  material_id: string;
  /** Profile or user material name; the render prompt is assembled from these, never from free text. */
  name: string;
  /** Region mask for this material in the material/ID map. */
  mask_asset_id: string;
  /** Converted colour (FR-161), when the material has a colour code. */
  colour?: { code: string; system: string; srgb_hex: string; lab?: [number, number, number] };
  /** Sample photo texture, used only inside this material's mask (FR-161). */
  sample_asset_id?: string;
  /** Manufacturer asset, only from a signed product profile (FR-162). */
  manufacturer?: { profile_id: string; profile_version: string; product_id: string; texture_asset_id: string; signed: true };
  basis: MaterialBasis;
}

export interface ConditioningSet {
  drawing_id: string;
  drawing_hash: string;
  drawing_rev: string;
  line_art_asset_id: string;
  depth_asset_id: string;
  material_map_asset_id: string;
  materials: MaterialMapEntry[];
}

export type RenderMode = "detail_to_built" | "drawing_to_photoreal" | "idea_concept";

export type RenderJobRequest =
  | { engine: "diffusion"; mode: RenderMode; conditioning: ConditioningSet; variants: number; camera_id: string; resolution: "low" | "high"; region_edit?: { material_id: string; replacement: MaterialMapEntry } }
  | {
      engine: "generative_video";
      /** A geometry-locked Render Studio still (FR-129). */
      start_still: { asset_id: string; drawing_hash: string; drawing_rev: string };
      /** A second still of the same drawing, where the model supports end-frame pinning. */
      end_still?: { asset_id: string; drawing_hash: string; drawing_rev: string };
      camera_move: "push_in" | "orbit" | "drift";
      seconds: number;
      materials: MaterialMapEntry[];
      idea_mode: boolean;
    }
  | { engine: "raytraced"; model_hash: string; drawing_hash: string; camera_path_id: string; materials: MaterialMapEntry[] }
  | { engine: "voice"; script: NarrationScript; camera_path_id: string; language: string };

export interface MaterialOutcome {
  material_id: string;
  basis: MaterialBasis;
  /** ΔE2000 of the rendered region vs the target; null when the material has no colour code. */
  delta_e: number | null;
  /** Above render.thresholds.json colour threshold (or threshold pending). A flag, not a failure (FR-164). */
  colour_approximate: boolean;
}

export interface RenderOutput {
  engine: RenderEngine;
  asset_id: string;
  drawing_hash: string;
  drawing_rev: string;
  /** Edge-overlay IoU for diffusion; always null for generative_video, raytraced and voice (FR-124, FR-130). */
  fidelity: number | null;
  /** copy.json keys the UI must render with this asset, e.g. label.preview, watermark.concept, label.illustrative. */
  label_keys: string[];
  materials: MaterialOutcome[];
  /** generative_video: which pinning the adapter used (FR-129). */
  pinning?: "start_only" | "start_and_end";
  provider: string;
  provider_model: string;
  attempts: number;
}

/**
 * Credits follow render.thresholds.json → metering: charged once per delivered render; retries and failed jobs charge nothing.
 * Only a delivered status can carry a non-zero charge, and it is per output, never per attempt.
 */
export type RenderJobStatus =
  | { state: "queued" | "running"; job_id: string; credits_charged: 0 }
  | { state: "delivered"; job_id: string; outputs: RenderOutput[]; attempts_total: number; credits_charged: number }
  /** Fidelity below threshold after max_attempts, or moderation failure after retrying another model. Never delivered (FR-52, FR-131). */
  | { state: "failed"; job_id: string; reason: "fidelity" | "moderation" | "provider_error"; attempts: number; last_fidelity?: number; credits_charged: 0 }
  /** raytraced before Stage 3. */
  | { state: "not_available"; job_id: string; engine: RenderEngine; credits_charged: 0 };

export interface RenderProvider {
  readonly engine: RenderEngine;
  submit(job: RenderJobRequest): Promise<{ job_id: string }>;
  status(job_id: string): Promise<RenderJobStatus>;
}

/** A render is outdated when the drawing's current hash differs from the one it was made from (FR-53). */
export interface OutdatedCheck {
  isOutdated(output: Pick<RenderOutput, "drawing_hash">, current_drawing_hash: string): boolean;
}

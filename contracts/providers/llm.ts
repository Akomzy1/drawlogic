// LLM provider interface by task. Version 0.1.0. PRD §8A.1–8A.2, CONTRACTS.md.
// Model IDs, effort and cache keys come from contracts/models.json; nothing here names a model.
// Structured outputs are the contract schemas named per task in models.json → tasks.<task>.structured_output.
// Engine-side (Python) adapters implement the same shapes; the pydantic models are generated from the same schemas.

import type {
  CheckResult,
  Critique,
  DDL,
  DdlDiff,
  Explanation,
  IdeaResult,
  Interpretation,
  NarrationScript,
  PlainRewrite,
  PrecedentSearchResult,
  ProfileDraftResult,
  RouteResult,
  ThreadState,
} from "../generated/ts/contracts";

/**
 * What a new thread starts from: the DDL (source of truth) plus the working state trust holds for this work —
 * assumptions, critique points, revision count, Generate anyway (thread-state.schema.json). Never the old transcript.
 */
export interface ThreadSeed {
  ddl: DDL | null;
  state: ThreadState;
}

/** Every runtime LLM task. contracts/scripts/validate.mjs checks models.json has exactly these keys. */
export type LlmTask =
  | "route"
  | "rewrite"
  | "idea"
  | "learn_critique"
  | "precedent_search"
  | "promote"
  | "interpret"
  | "compile"
  | "explain"
  | "profile_draft"
  | "narrate";

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

/** One entry of contracts/models.json → tasks. */
export interface TaskConfig {
  provider: "anthropic" | "openai";
  model: string;
  /** null where the model has no effort control (Haiku 4.5). Otherwise always sent explicitly (§8A.2). */
  effort: Effort | null;
  max_tokens: number;
  cache_prefix_key: string;
  batch: boolean;
  tools?: Array<"web_search">;
  structured_output: string;
  /** false → a change of profile, mode or context starts a new thread seeded from the DDL. */
  mid_conversation_system: boolean;
  on_refusal?: RefusalPolicy;
}

export interface RefusalPolicy {
  action: "surface" | "new_thread_with";
  model?: string;
  log: true;
}

/** The only tool choice the interface can express. Forced tool use (`any` / `tool`) has no code path (§8A.2). */
export type ToolChoice = { type: "auto" };

/** A user-supplied input. Uploads of someone else's work carry rights confirmation (FR-177). */
export type TaskInput =
  | { kind: "text"; text: string }
  | { kind: "asset"; asset_id: string; media: "pdf" | "image" | "sketch" | "photo" | "dxf"; rights_confirmed: boolean };

/** What each task receives beyond the conversation. The stable prefix (profile stack, schemas, pack vocabulary, typical details) is assembled by the adapter and cached. */
export interface TaskInputs {
  route: { inputs: TaskInput[] };
  rewrite: { text: string; audience: "idea" | "learn" };
  idea: { inputs: TaskInput[]; card: Interpretation };
  learn_critique: { inputs: TaskInput[]; exercise_id: string; detail_type: string; cycle: number };
  precedent_search: { query: string; building_type?: string; climate_region?: string };
  promote: { idea_result: IdeaResult; option_id: string; ddl: DDL };
  interpret: { inputs: TaskInput[]; mode: "draft" | "idea" | "learn" };
  compile: { card: Interpretation & { status: "confirmed" }; ddl?: DDL; instruction?: string };
  explain: { check: CheckResult; result_id: string; ddl: DDL };
  profile_draft: { document_asset_id: string; profile_id: string };
  narrate: { ddl: DDL & { solver: { status: "resolved" } } };
}

export interface TaskOutputs {
  route: RouteResult;
  rewrite: PlainRewrite;
  idea: IdeaResult;
  learn_critique: Critique;
  precedent_search: PrecedentSearchResult;
  promote: Interpretation;
  interpret: Interpretation;
  compile: DdlDiff;
  explain: Explanation;
  profile_draft: ProfileDraftResult;
  narrate: NarrationScript;
}

export interface Usage {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

/** Result of one task call. A refusal or an output that fails its schema is never altered or passed off as success. */
export type TaskResult<T extends LlmTask> =
  | { kind: "ok"; task: T; output: TaskOutputs[T]; model: string; thread_id: string; usage: Usage; latency_ms: number }
  | { kind: "refusal"; task: T; model: string; thread_id: string; category: string | null; fallback: RefusalPolicy["action"]; fallback_thread_id?: string; audit_record_id: string }
  | { kind: "invalid_output"; task: T; model: string; thread_id: string; schema_errors: string[] }
  | { kind: "error"; task: T; retryable: boolean; message: string };

/**
 * A conversation bound to one model. Append-only: nothing earlier in the thread is edited (§8A.2).
 * A model change starts a new thread seeded from the DDL; there is no method to change a thread's model.
 */
export interface Thread {
  readonly id: string;
  readonly task: LlmTask;
  readonly model: string;
  /**
   * Profile, mode or drawing-context change. Only on tasks with mid_conversation_system: true (Opus 5.5 tasks);
   * elsewhere (Sonnet 5, Haiku 4.5) it rejects and the caller starts a new thread from a ThreadSeed.
   */
  appendSystem(text: string): Promise<void>;
  run<T extends LlmTask>(task: T, input: TaskInputs[T]): Promise<TaskResult<T>>;
}

export interface LlmProvider {
  readonly provider: "anthropic" | "openai";
  /** Starts a thread for a task using models.json. A context change without system messages, a model change or a refusal fallback passes a seed. */
  startThread(task: LlmTask, opts: { workspace_id: string; seed?: ThreadSeed; reason: "start" | "context_change" | "model_change" | "refusal_fallback" }): Promise<Thread>;
  /** Single-call convenience: a one-turn thread. */
  run<T extends LlmTask>(task: T, input: TaskInputs[T], opts: { workspace_id: string }): Promise<TaskResult<T>>;
  /** Batch API (profile_draft, nightly evals). Only for tasks with batch: true. */
  submitBatch<T extends LlmTask>(task: T, inputs: Array<{ custom_id: string; input: TaskInputs[T] }>): Promise<{ batch_id: string }>;
  batchResults<T extends LlmTask>(batch_id: string): Promise<Array<{ custom_id: string; result: TaskResult<T> }>>;
}

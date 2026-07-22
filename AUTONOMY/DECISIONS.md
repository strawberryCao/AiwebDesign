# Decision Log

Append-only architectural decisions. A reversal creates a new entry; do not rewrite old entries.

## ADR-001 — Single-writer closed loop
**Status:** accepted  
**Decision:** One automation running every two hours owns the full baseline-to-candidate product iteration. The previous five-stage hourly relay is retired.  
**Reason:** It preserves context inside one run, avoids races, reduces repeated hydration and ensures the same iteration owns its evidence.  
**Consequence:** Four other automations are independent supervisors and may not edit product source.

## ADR-002 — Repository-backed memory hierarchy
**Status:** accepted  
**Decision:** Persist state, working memory, durable memory, decisions, evaluations, research and episodic run evidence in `AUTONOMY/**`.  
**Reason:** Scheduled runs start as new conversations and cannot rely on chat memory. Git history provides persistence, attribution, diffability and rollback.  
**Consequence:** Every run must hydrate these files before acting and consolidate them after verified work.

## ADR-003 — Fixed kernel, mutable objective
**Status:** accepted  
**Decision:** Keep automation prompts stable and place the changing next objective in `AUTONOMY/NEXT_PROMPT.md`.  
**Reason:** Replacing a task's whole prompt every cycle risks prompt drift and accidental deletion of safety, deployment and validation invariants.  
**Consequence:** The verifier updates the repository objective, not the automation constitution.

## ADR-004 — Lease-based concurrency control
**Status:** accepted  
**Decision:** `STATE.json.lease` is the source-changing lock.  
**Reason:** Schedules may overlap or a run may be delayed. A repository lease prevents concurrent builders and supports recovery after interruption.  
**Consequence:** Source edits without a valid acquired lease are invalid.

## ADR-005 — Evidence-first scoring
**Status:** accepted  
**Decision:** Scores and completion claims require deployment identity and observable browser/build evidence.  
**Reason:** Self-reported visual progress without artifacts is unreliable.  
**Consequence:** Missing evidence produces `unknown` or `blocked`, never an invented score.

## ADR-006 — Original implementation boundary
**Status:** revised by ADR-007  
**Decision:** Reference sites define quality and interaction principles only.  
**Reason:** Their source, brands and assets are protected and unnecessary for an original reconstruction.  
**Consequence:** Prefer procedural geometry, generated textures and original copy.

## ADR-007 — Provenance-managed external assets
**Status:** accepted  
**Decision:** External models, HDRIs, textures, fonts, icons, audio, video, libraries, official samples and licensed stock assets may be used when they improve quality or iteration speed. Reference-site private bundles, brand copy, logos and files with unknown reuse rights remain excluded.  
**Reason:** The user explicitly authorized broad use of external assets, while `AGENTS.md` now requires provenance, licensing basis, attribution, optimization and fallback records. The earlier blanket prohibition in durable memory no longer matched the active contract.  
**Consequence:** Every non-trivial external asset must be registered in `AUTONOMY/ASSETS.md`; unknown-rights or undocumented assets cannot support a completion claim.
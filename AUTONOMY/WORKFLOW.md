# Autonomous WebGL Iteration Contract v2

## Goal
Build an original production-grade WebGL portfolio experience approaching the interaction architecture and perceived quality of leading immersive studios: cinematic spatial travel, authored transitions, procedural worlds, shader-led atmosphere, synchronized editorial typography, tactile interaction and stable adaptive performance. Do not copy third-party source code, branding, text or assets.

## Operating topology
Product source has exactly one writer: **WebGL 两小时闭环**. It runs once every two hours and completes the whole iteration inside one run.

Four independent support jobs operate at lower frequency:
- visual critic: independent deployed-output review;
- memory curator: evidence consolidation and forgetting;
- technical radar: primary-source research and experiment proposals;
- health guard: lease, CI, deployment and prompt-drift governance.

Support jobs do not edit product source.

## Primary state machine
1. **Hydrate** — read `AGENTS.md` and all relevant `AUTONOMY/**` memory.
2. **Acquire** — atomically acquire `STATE.json.lease`; skip if another valid writer exists.
3. **Baseline** — identify and deploy/verify the untouched current `main` SHA.
4. **Observe** — inspect desktop/mobile full journey, interactions, console, reduced motion and failure behavior.
5. **Plan** — select one evidence-supported objective from `NEXT_PROMPT.md` and `QUEUE.json`.
6. **Build** — implement one coherent batch only.
7. **Validate** — install, syntax check, production build and browser verification.
8. **Commit** — push `iter-N: <objective>` only after validation passes.
9. **Candidate** — deploy and inspect the new SHA.
10. **Compare** — score baseline vs candidate using `EVALUATION.md`; record regressions.
11. **Consolidate** — update run log, evaluation, working set, queue, next prompt and durable memory when eligible.
12. **Release** — write final state and clear the lease.

## Checkpoints
Write state after these boundaries:
- lease acquired;
- baseline verified or blocked;
- build validated;
- candidate verified;
- memory consolidated and lease released.

If interrupted, the next run reads the last checkpoint and resumes or safely rolls back. It must not invent missing evidence.

## Acceptance score (100)
- Spatial composition and art direction: 20
- Camera choreography and transitions: 20
- Materials, lighting, particles and post-processing: 20
- Typography, pacing and UI synchronization: 15
- Interaction depth and delight: 10
- Performance and adaptive quality: 10
- Accessibility and failure recovery: 5

Stop source modification only after an independent critic records at least 92/100 for two consecutive verified candidates.

## Memory policy
- `WORKING_SET.md`: current hypotheses and recent context; compact aggressively.
- `MEMORY.md`: stable lessons only; promotion requires user instruction or repeated evidence.
- `DECISIONS.md`: append-only architectural decisions.
- `RUN_LOG.md`: append-only episodic evidence.
- `NEXT_PROMPT.md`: mutable next objective.
- Fixed automation prompts are not self-rewritten. This protects invariants against prompt drift.

## Failure policy
- Missing Cloudflare credentials or access: record exact blocker and release lease without source edits.
- Baseline deployment failure: do not edit source.
- Build failure: do not push.
- Candidate regression: record rollback target and either revert in the same primary run when safe or mark blocked for the next run.
- Active lease or ambiguous state: skip rather than race.

## Evidence policy
Never claim deployment, screenshots, browser behavior, performance or scores without direct evidence tied to a commit and URL. Issue #1 may mirror status for humans, but repository files are the source of truth.
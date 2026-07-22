# Autonomous WebGL Iteration Contract v4

## Goal
Build a production-grade immersive WebGL portfolio experience approaching the interaction architecture and perceived quality of leading immersive studios: cinematic spatial travel, authored transitions, procedural worlds, shader-led atmosphere, synchronized editorial typography, tactile interaction and stable adaptive performance. External reusable assets are encouraged when they materially improve the result; product identity and implementation decisions must remain original.

## Operating topology
Product source has exactly one writer: **WebGL 两小时闭环**. It starts once every two hours and completes the whole iteration inside one run.

The same 120-minute window also contains four tightly staggered support checks:
- visual critic: independent deployed-output review;
- memory curator: evidence consolidation and forgetting;
- health guard: lease, CI, deployment and prompt-drift governance;
- technical radar: primary-source research, asset scouting and experiment proposals.

Support jobs do not edit product source. They must honor the primary lease and skip or remain read-only when the writer is active.

## Canonical deployment path
- GitHub Actions workflow: `.github/workflows/deploy-cloudflare.yml`.
- Cloudflare credentials exist only as GitHub Actions secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- Every push to `main` runs install, syntax check, production build, Wrangler deployment and an HTTP smoke test.
- Successful runs write immutable receipts to the `deployment-records` branch at `AUTONOMY/deployments/<source-sha>.json`.
- A deployment is valid evidence only when the receipt's `source_sha` equals the exact evaluated commit and `build.smoke_test` is `passed`.
- `AUTONOMY/deployments/latest.json` is a pointer, not proof of correspondence.

## Primary state machine
1. **Hydrate** — read `AGENTS.md` and all relevant `AUTONOMY/**` memory.
2. **Acquire** — atomically acquire `STATE.json.lease`; skip if another valid writer exists.
3. **Baseline** — identify current `main` SHA and fetch its immutable receipt from the `deployment-records` branch. A lease/state-only commit may trigger deployment, but product source must remain untouched until the receipt exists and matches.
4. **Observe** — inspect the receipt's public URL on desktop/mobile: full journey, interactions, console, reduced motion and failure behavior.
5. **Plan** — select one evidence-supported objective from `NEXT_PROMPT.md` and `QUEUE.json`.
6. **Source** — when useful, select reusable external models, HDRIs, textures, fonts, icons, audio, video or libraries; update `ASSETS.md` before shipping them.
7. **Build** — implement one coherent batch only.
8. **Validate** — install, syntax check, production build, asset loading/fallback checks and local/browser verification.
9. **Commit** — push `iter-N: <objective>` only after validation passes.
10. **Candidate** — wait for/fetch the immutable deployment receipt for the new commit and inspect its public URL.
11. **Compare** — score baseline vs candidate using `EVALUATION.md`; record regressions.
12. **Consolidate** — update run log, evaluation, working set, queue, next prompt, asset ledger and durable memory when eligible.
13. **Release** — write final state and clear the lease.

## Checkpoints
Write state after these boundaries:
- lease acquired;
- baseline receipt verified or blocked;
- asset selection/provenance recorded when applicable;
- build validated;
- candidate receipt and browser behavior verified;
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

## Asset policy
- Prefer assets with clear reuse rights: CC0, public domain, permissive licenses, purchased/stock licenses, official reusable demos or user-provided assets.
- Record provider, source, license/usage basis, attribution, local path, optimization status and fallback in `AUTONOMY/ASSETS.md`.
- Do not rely on undocumented hotlinks. Vendor or mirror into controlled storage when permitted.
- Test loading failures and lower-quality fallbacks.
- Reference sites may guide composition and interaction, but unknown-rights files, branding and source bundles are not reusable assets.

## Memory policy
- `WORKING_SET.md`: current hypotheses and recent context; compact aggressively.
- `MEMORY.md`: stable lessons only; promotion requires user instruction or repeated evidence.
- `DECISIONS.md`: append-only architectural decisions.
- `RUN_LOG.md`: append-only episodic evidence.
- `ASSETS.md`: append/update provenance ledger for external media and dependencies.
- `NEXT_PROMPT.md`: mutable next objective.
- Fixed automation prompts are not self-rewritten. This protects invariants against prompt drift.

## Failure policy
- Missing GitHub Actions Cloudflare secrets: record exact blocker and release lease without source edits.
- Missing, mismatched or failed deployment receipt: do not edit or accept product source.
- GitHub Actions build/deploy failure: do not claim a baseline/candidate and do not score it.
- Unknown or incompatible asset rights: replace the asset before shipping.
- Asset load failure without fallback: do not accept the candidate.
- Local build failure: do not push.
- Candidate regression: record rollback target and either revert in the same primary run when safe or mark blocked for the next run.
- Active lease or ambiguous state: skip rather than race.

## Evidence policy
Never claim deployment, screenshots, browser behavior, performance, asset rights or scores without direct evidence tied to a commit, immutable receipt, URL or source record. Issue #1 may mirror status for humans, but repository files and the deployment-records branch are the source of truth.

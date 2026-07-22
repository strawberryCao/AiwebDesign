# AiwebDesign Agent Contract

## Mission
Build an original, production-grade immersive WebGL website whose perceived craft, spatial storytelling, motion direction and interaction depth approach leading studios such as Igloo Inc. Do not copy third-party source code, brand copy, logos, models, textures, audio or proprietary assets.

## Mandatory read order
Before any action, read:
1. `AGENTS.md`
2. `AUTONOMY/STATE.json`
3. `AUTONOMY/NEXT_PROMPT.md`
4. `AUTONOMY/WORKING_SET.md`
5. `AUTONOMY/MEMORY.md`
6. `AUTONOMY/EVALUATION.md`
7. `AUTONOMY/DECISIONS.md`
8. the latest entries in `AUTONOMY/RUN_LOG.md`

## Concurrency and lease
- Only the primary two-hour loop may edit product source files.
- Before editing, acquire the lease in `AUTONOMY/STATE.json` with an owner, iteration number, acquired time and expiry time.
- If a non-expired lease exists, do not start another source-changing run.
- Support automations may update only their designated autonomy documents and must never overwrite a live primary lease.
- A stale lease may be cleared only after verifying that no newer commit, deployment or run-log entry belongs to it.

## Primary loop invariant
One scheduled run performs the complete sequence itself:
`hydrate memory -> acquire lease -> deploy untouched baseline -> inspect -> choose one batch -> edit -> validate -> commit -> deploy candidate -> compare -> score -> consolidate memory -> release lease`.

Do not split one iteration across stateless conversations.

## Build and evidence gates
- Baseline deployment must be attempted and recorded before source edits.
- Run `npm install --no-audit --no-fund`, `npm run check`, and `npm run build` before pushing.
- Never claim a deployment, URL, screenshot, performance result, browser result or score without direct evidence.
- A failed build must not be pushed.
- Each iteration ships one coherent improvement batch and uses commit message `iter-N: <objective>`.

## Memory discipline
- `WORKING_SET.md` is short-term, volatile context for the current and recent runs.
- `MEMORY.md` contains durable facts, preferences and proven lessons only.
- Promote a lesson to durable memory only after direct user instruction or confirmation by at least two independent pieces of evidence.
- `DECISIONS.md` is append-only for architectural decisions and reversals.
- `RUN_LOG.md` is append-only evidence; do not rewrite history.
- The fixed automation prompts are the operating kernel. Dynamic objectives belong in `NEXT_PROMPT.md`; do not self-rewrite away safety and validation invariants.

## Completion rule
Stop autonomous source modification only after two consecutive independently verified candidate scores of at least 92/100, with successful desktop and mobile verification and no critical accessibility, console, deployment or performance regression.
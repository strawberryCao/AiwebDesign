# AiwebDesign Agent Contract

## Mission
Build a production-grade immersive WebGL website whose perceived craft, spatial storytelling, motion direction and interaction depth approach leading studios such as Igloo Inc. The implementation and product identity must remain original, but suitable external assets are encouraged when they materially improve quality or iteration speed.

## Mandatory read order
Before any action, read:
1. `AGENTS.md`
2. `AUTONOMY/STATE.json`
3. `AUTONOMY/NEXT_PROMPT.md`
4. `AUTONOMY/WORKING_SET.md`
5. `AUTONOMY/MEMORY.md`
6. `AUTONOMY/EVALUATION.md`
7. `AUTONOMY/DECISIONS.md`
8. `AUTONOMY/ASSETS.md`
9. the latest entries in `AUTONOMY/RUN_LOG.md`

## External asset policy
- External models, HDRIs, textures, fonts, icons, audio, video, libraries and stock media may be used aggressively when they raise visual quality.
- Prefer CC0, public-domain, permissively licensed, purchased/stock, official demo, or otherwise clearly reusable assets.
- Record every non-trivial external asset in `AUTONOMY/ASSETS.md` with source, author/provider, license or usage basis, local path or URL, attribution requirement and fallback plan.
- Vendor assets into the repository or a controlled storage location when the license permits; avoid fragile hotlinks and undocumented dependencies.
- Optimize large assets, provide loading/error fallbacks, and include them in performance review.
- Publicly observable interaction principles from reference sites may be studied. Do not extract or republish their private source bundles, logos, brand copy, or files whose reuse rights are unknown.

## Concurrency and lease
- Only the primary two-hour loop may edit product source files.
- Before editing, acquire the lease in `AUTONOMY/STATE.json` with an owner, iteration number, acquired time and expiry time.
- If a non-expired lease exists, do not start another source-changing run.
- Support automations may update only their designated autonomy documents and must never overwrite a live primary lease.
- A stale lease may be cleared only after verifying that no newer commit, deployment or run-log entry belongs to it.

## Primary loop invariant
One scheduled run performs the complete sequence itself:
`hydrate memory -> acquire lease -> deploy untouched baseline -> inspect -> choose one batch -> source assets when useful -> edit -> validate -> commit -> deploy candidate -> compare -> score -> consolidate memory -> release lease`.

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
- `ASSETS.md` is the durable provenance ledger for external dependencies and media.
- The fixed automation prompts are the operating kernel. Dynamic objectives belong in `NEXT_PROMPT.md`; do not self-rewrite away validation invariants.

## Completion rule
Stop autonomous source modification only after two consecutive independently verified candidate scores of at least 92/100, with successful desktop and mobile verification and no critical accessibility, console, deployment, licensing or performance regression.
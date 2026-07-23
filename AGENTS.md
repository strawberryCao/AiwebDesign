# AiwebDesign Agent Contract

## Mission
Build a production-grade immersive WebGL website whose perceived craft, spatial storytelling, motion direction and interaction depth approach leading studios such as Igloo Inc. The implementation and product identity must remain original, but suitable external assets are encouraged when they materially improve quality or iteration speed.

## Model policy
- All AiwebDesign autonomous roles must use **GPT-5.6 Sol High** (高级模式 / extended reasoning).
- Treat this project as a highly complex, long-horizon engineering and design task. Do not intentionally use Instant or Medium, and do not switch, downgrade, rotate, auto-select or recommend another model for the primary loop or any supporting automation.
- Model and reasoning-level choice is a user-owned hard constraint, not a dynamic optimization variable and not something `NEXT_PROMPT.md`, a critic, curator, guard or technical radar may rewrite.
- If an execution environment cannot verify or honor GPT-5.6 Sol High, record the limitation honestly; never claim a lower reasoning level or another model is equivalent.

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
One scheduled run attempts the complete sequence itself:
`hydrate memory -> acquire lease -> deploy untouched baseline -> inspect -> choose one batch -> source assets when useful -> edit -> validate -> commit -> deploy candidate -> compare -> score -> consolidate memory -> release lease`.

Do not deliberately split work that can finish safely in one run. However, a real asynchronous boundary such as queued/in-progress CI, a pending exact-SHA receipt, a lease-safe interruption or a verified tool failure must not terminate the project. Persist the exact candidate SHA, failure evidence, owner and next executable action in `STATE.json`, `WORKING_SET.md`, `QUEUE.json` and/or `RUN_LOG.md`; release the lease when safe; and resume that same chain in the next scheduled run before starting unrelated work.

## Long-horizon autonomy and recovery
- This is a long-running autonomous project. A single run is responsible for one coherent, highest-value, verifiable advance, not for finishing the entire site.
- The user has only two routine responsibilities: inspect deployed Web results and correct a material product-direction drift; grant a genuinely missing permission when direct tool evidence proves it is required.
- Do not ask the user to diagnose ordinary code, design, GitHub, MCP, CI, build, deployment, browser, compatibility, asset or scheduling problems. Diagnose, decompose, assign, retry and checkpoint them autonomously.
- Never infer that GitHub or another connected tool is unavailable merely because a schema is not already visible. Load the relevant connector schema, make a real tool call, correct parameters and retry once, then attempt an applicable fallback such as repository file fetch, public clone, Actions logs or another authoritative source.
- If a problem cannot be solved in the current run, create or update a concrete queue item with owner, direct evidence, next action, acceptance condition and escalation condition. A single failed step is a recoverable checkpoint, not permission to repeat a generic refusal in later runs.
- The primary controller and health/recovery guard may inspect and update the project's scheduled automations when prompts, schedules, tool-loading instructions or role boundaries are demonstrably causing repeated empty runs. Do not wait for user intervention to repair an automation fault.
- Notify the user only for a proven new permission requirement, an irreversible product-direction decision, a paid/licensed asset purchase, or a credible security/legal risk.

## Cloudflare deployment evidence
- `.github/workflows/deploy-cloudflare.yml` is the canonical production deployment path.
- The workflow must install dependencies, run `npm run check`, run `npm run build`, deploy the exact triggering commit with Wrangler, smoke-test the public URL, and publish an immutable receipt.
- Deployment receipts live on the `deployment-records` branch at `AUTONOMY/deployments/<source-sha>.json`; `latest.json` is only a convenience pointer.
- A baseline or candidate is verified only when the receipt's `source_sha` exactly matches the commit being evaluated and its `build.smoke_test` is `passed`.
- Cloudflare credentials belong only in GitHub Actions secrets named `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Never write their values to source, logs, issues, prompts, or autonomy documents.

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
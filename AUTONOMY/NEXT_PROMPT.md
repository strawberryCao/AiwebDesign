# Next Objective — Iteration 3

## Objective ID
`Q-006`

## Queue binding
- State contract: `AUTONOMY/STATE_MACHINE.md` version 1.
- Queue schema: `AUTONOMY/QUEUE.json` version 2.
- `activeItemId`: `Q-006`.
- Owner: `main`.
- Status: `ready`.
- Attempt count: 0.
- Strategy version: 1.
- Resume rule: resolve the exact current `main` SHA and its dual receipts before acquiring the product lease or editing source. Do not fall back to an older verified SHA merely because it is recorded as the last product baseline.

## Measurable objective
Replace the active Google Fonts hotlink with a controlled, self-hosted font set while preserving the current editorial hierarchy and measurable layout behavior. Complete this as one coherent dependency-and-typography batch; do not combine it with camera, geometry, HDRI, loading-screen or adaptive-quality work.

## Baseline evidence gate
Before editing product source, identify the exact current `main` SHA and fetch both immutable receipts from `deployment-records`:

- `AUTONOMY/deployments/<main-sha>.json`
- `AUTONOMY/browser-audits/<main-sha>.json`

Proceed only when both receipts match the exact SHA and public URL, deployment `build.smoke_test` is `passed`, and browser audit `result` is `passed`. The ChatGPT automation runtime does not need direct access to `workers.dev`; GitHub Actions Playwright is the canonical functional browser evidence path. Use the uploaded screenshots/report for visual comparison when available.

If the workflow is queued/in-progress, transition Q-006 to `waiting_ci`, record the exact SHA/run and stop after one status query. If the workflow is complete but a receipt is not yet readable, transition to `waiting_evidence`. Resume the same Q-006 chain next run. Real failures increment attempt accounting under the state-machine rules; three equivalent failures require a new strategy before another attempt.

## Product and asset scope
- `src/style.css`
- a controlled local font directory such as `public/fonts/**`
- `package.json` only when a verified font package is needed to source files reproducibly
- `AUTONOMY/ASSETS.md`
- standard autonomy evidence files required by the closed loop

Do not edit WebGL scene behavior, camera choreography, geometry, particles, lighting, copy or page structure unless a strictly necessary font-loading fallback requires a minimal CSS adjustment.

## Asset provenance gate
Before shipping any font file, record in `AUTONOMY/ASSETS.md`:

- canonical family and package/source;
- author/provider;
- exact license or usage basis and attribution requirement;
- downloaded source version and project path;
- original and shipped WOFF2 sizes;
- retained weights/subsets and removed files;
- CSS loading strategy and system-font fallback;
- introducing commit and exact-SHA browser verification.

Inter and DM Mono provenance is already resolved in EXP-005 and ASSET-001. Do not restore the superseded claim that DM Mono licensing is unknown. If the selected DM Mono WOFF2 route cannot be traced to the canonical upstream files and commit, change the file-generation/package strategy rather than inventing metadata.

## Implementation constraints
- Prefer local WOFF2 files and only the weights actually used by the current CSS.
- Use `font-display: swap` or an equivalently resilient strategy.
- Remove all runtime requests to `fonts.googleapis.com` and `fonts.gstatic.com`.
- Preserve readable fallback stacks if local font loading fails.
- Asset size is not an abandon condition by itself; prioritize traceability, typography fidelity and the spectacle-first desktop experience.

## Validation
Run:

- `npm install --no-audit --no-fund`
- `npm run check`
- `npm run build`

After the `iter-3: self-host and audit active fonts` commit is deployed, require matching deployment and browser-audit receipts for the candidate SHA. Verify:

- desktop, mobile and reduced-motion browser scenarios pass;
- no document, script, stylesheet or font request fails;
- no request targets Google Fonts hosts;
- panel count, full-scroll completion, WebGL context and interactions remain intact;
- title wrapping, key text alignment and mobile overflow do not regress in screenshots;
- fallback remains usable when local font requests are deliberately blocked or renamed in a controlled test.

## Acceptance
- baseline and candidate evidence are tied to exact SHAs;
- active font files have verified provenance and usage rights;
- Google font hotlinks are eliminated;
- shipped font payload is measured and documented without using size alone as a rejection reason;
- desktop/mobile/reduced-motion audit remains passed;
- no critical typography, loading, licensing, console, navigation, WebGL or performance regression;
- `ASSETS.md`, `RUN_LOG.md`, `EVALUATION.md`, `WORKING_SET.md`, `QUEUE.json`, `NEXT_PROMPT.md` and `STATE.json` are updated in contract order;
- Q-006 transitions to `completed`, or to a specific recoverable state with attempt evidence and a changed next strategy.

## Stop conditions
- Active non-expired primary lease: skip source mutation and preserve the queue state.
- Missing or mismatched exact-SHA deployment/browser receipt: do not edit product source; use `waiting_ci`, `waiting_evidence` or `blocked_recoverable` as supported by evidence.
- Untraceable selected font file: do not vendor it; revise the sourcing/conversion strategy.
- Failed install, syntax check or production build: do not push; record the attempt and next changed action.
- Candidate browser audit failure or material typography regression: reject or roll back the candidate and record the evidence.

## Originality and model boundary
Use **GPT-5.6 Sol High** as required by `AGENTS.md`. Preserve the original Polar Index identity; font sourcing is an infrastructure and typography-quality improvement, not permission to copy branding or proprietary assets.

# Next Objective — Iteration 3

## Objective ID
`Q-006`

## Measurable objective
Replace the active Google Fonts hotlink with a controlled, self-hosted font set while preserving the current editorial hierarchy and measurable layout behavior. Complete this as one coherent dependency-and-typography batch; do not combine it with camera, geometry, HDRI, loading-screen or adaptive-quality work.

## Baseline evidence gate
Before editing product source, identify the exact current `main` SHA and fetch both immutable receipts from `deployment-records`:

- `AUTONOMY/deployments/<main-sha>.json`
- `AUTONOMY/browser-audits/<main-sha>.json`

Proceed only when both receipts match the exact SHA and public URL, deployment `build.smoke_test` is `passed`, and browser audit `result` is `passed`. The ChatGPT automation runtime does not need direct access to `workers.dev`; GitHub Actions Playwright is the canonical functional browser evidence path. Use the uploaded screenshots/report for visual comparison when available.

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

Do not infer DM Mono licensing from another DM family. If its exact source/license cannot be established, replace it with a metrically acceptable verified alternative or retain a system monospace fallback; do not vendor an uncertain file.

## Implementation constraints
- Prefer local WOFF2 files and only the weights actually used by the current CSS.
- Use `font-display: swap` or an equivalently resilient strategy.
- Remove all runtime requests to `fonts.googleapis.com` and `fonts.gstatic.com`.
- Preserve readable fallback stacks if local font loading fails.
- Avoid a font package or asset set whose transfer size is disproportionate to the visual benefit.

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
- shipped font payload is bounded and documented;
- desktop/mobile/reduced-motion audit remains passed;
- no critical typography, loading, licensing, console, navigation, WebGL or performance regression;
- `ASSETS.md`, `RUN_LOG.md`, `EVALUATION.md`, `WORKING_SET.md`, `QUEUE.json`, `NEXT_PROMPT.md` and `STATE.json` are updated in contract order.

## Stop conditions
- Active non-expired primary lease: skip.
- Missing or mismatched exact-SHA deployment/browser receipt: do not edit product source.
- Unknown font license or source: do not vendor that file.
- Failed install, syntax check or production build: do not push.
- Candidate browser audit failure or material typography regression: reject or roll back the candidate and record the evidence.

## Originality and model boundary
Use **GPT-5.6 Sol High** as required by `AGENTS.md`. Preserve the original Polar Index identity; font sourcing is an infrastructure and typography-quality improvement, not permission to copy branding or proprietary assets.

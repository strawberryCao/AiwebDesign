# Next Objective — Iteration 1

## Objective ID
`Q-001`

## Measurable objective
Establish the first trustworthy Cloudflare baseline for the exact current `main` SHA. Do not edit product source until the untouched baseline has been deployed or matched to an existing deployment and inspected.

If and only if baseline verification succeeds and enough execution time remains, select exactly one live-observed, high-impact defect and implement one coherent improvement batch. Prefer camera choreography only when the live audit confirms that the current linear descent is the dominant quality limiter.

## Required evidence before editing
- exact baseline commit SHA;
- real Cloudflare deployment URL and deployment/build evidence;
- HTTP success status;
- desktop full-scroll inspection;
- mobile full-scroll inspection;
- console-error observation;
- reduced-motion or fallback observation.

## Allowed product scope after baseline passes
- `src/main.js`
- `src/style.css`
- `index.html` only when required by the selected coherent batch
- dependency or asset changes only when they are necessary for the selected batch and are documented in `AUTONOMY/ASSETS.md`

## External asset gate
External models, HDRIs, textures, fonts, icons, audio, video, libraries and stock media may be used when they materially improve the result. Before accepting a candidate that introduces or materially changes an external asset, update `AUTONOMY/ASSETS.md` with its canonical source, author/provider, license or usage basis, attribution requirement, project path or controlled URL, optimization, loading/error fallback, introducing commit and shipped verification evidence. Do not use fragile undocumented hotlinks or files whose reuse rights are unknown.

## Acceptance
- baseline evidence is written to `STATE.json`, `RUN_LOG.md` and `EVALUATION.md`;
- any product change passes syntax check and production build;
- candidate is deployed and compared with the baseline;
- no critical mobile, console, navigation, accessibility, licensing, asset-loading or performance regression;
- all important external assets introduced or changed in the candidate are represented accurately in `ASSETS.md`;
- the next objective is rewritten from observed evidence, not aspiration.

## Stop conditions
- Missing or invalid Cloudflare credentials/access: record blocker, release lease and make no product edits.
- Active non-expired lease: skip.
- Ambiguous deployment-to-commit identity: mark blocked; do not guess.
- Failed build: do not push.
- Missing or unverifiable asset source/usage basis for a newly introduced asset: do not accept the candidate; replace or remove the asset.

## Originality and provenance boundary
Use Igloo Inc. and other reference sites as public visual/interaction quality references. Build an original product identity and implementation. Suitable external assets are allowed when their provenance and usage basis are recorded; do not extract private source bundles, brand copy, logos or unknown-rights files from reference sites.
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

## Acceptance
- baseline evidence is written to `STATE.json`, `RUN_LOG.md` and `EVALUATION.md`;
- any product change passes syntax check and production build;
- candidate is deployed and compared with the baseline;
- no critical mobile, console, navigation or accessibility regression;
- the next objective is rewritten from observed evidence, not aspiration.

## Stop conditions
- Missing or invalid Cloudflare credentials/access: record blocker, release lease and make no product edits.
- Active non-expired lease: skip.
- Ambiguous deployment-to-commit identity: mark blocked; do not guess.
- Failed build: do not push.

## Originality boundary
Use Igloo Inc. and other reference sites only as public visual/interaction quality references. Do not copy source code, brand copy, logos, media or proprietary assets.
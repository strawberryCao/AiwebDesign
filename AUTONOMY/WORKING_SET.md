# Working Set

Volatile context for the primary loop. Keep only the current iteration and the two most recent verified iterations.

## Current status
- Architecture-v3 control plane is active: one source-changing primary loop, four specialist supervisors and repository-backed queue state in `AUTONOMY/STATE_MACHINE.md` plus `AUTONOMY/QUEUE.json` schema v2.
- The last verified product baseline is commit `d22c6e8b2664965696ff7b02c792e6e1965f5fb2` at `https://aiwebdesign-polar-index.caoheming139.workers.dev`.
- Deployment receipt: `deployment-records:AUTONOMY/deployments/d22c6e8b2664965696ff7b02c792e6e1965f5fb2.json`; browser receipt: `deployment-records:AUTONOMY/browser-audits/d22c6e8b2664965696ff7b02c792e6e1965f5fb2.json`; GitHub Actions run `29924558425` passed.
- Desktop, Pixel 7 mobile and reduced-motion scenarios each returned HTTP 200, five panels, one WebGL2 canvas, complete scroll, no horizontal overflow, no page error, no failed request and no critical console error.
- `WEBGL_lose_context` loss and restoration passed; document content remained usable and canvas count remained one.
- Governance-only commits after the verified product baseline require their own exact-main deployment and browser receipts before Q-006 may edit product source. The next primary run must resolve the then-current `main` SHA and resume that evidence gate rather than infer the old receipt still applies.
- No product candidate or accepted visual score exists yet. Functional browser success is not an independent artistic score.
- Inter and DM Mono authorship and SIL OFL 1.1 licensing are verified. The remaining font issue is operational: remove the Google Fonts hotlink, vendor controlled browser files, retain license texts and prove fallback behavior.

## Active queue state
- `QUEUE.json.activeItemId`: `Q-006`.
- Owner: `main`.
- Status: `ready`, conditional on exact-current-main dual receipts and primary lease acquisition.
- Strategy version: 1; attempt count: 0.
- Concrete next action: verify the exact current-main receipts, acquire the lease, vendor Inter variable upright plus DM Mono 400/500, replace only font-loading CSS, run install/check/build and push the iteration-3 candidate.

## Current hypotheses
1. The verified canonical font files can remove the remote dependency without a critical title-wrap, alignment or mobile-overflow regression.
2. A controlled blocked-local-font audit can prove the fallback without changing WebGL scene behavior.
3. After Q-006, independent visual evidence should decide whether camera choreography or procedural-world differentiation is the next highest-value spectacle improvement.

## Open questions
- Which traceable browser-supported DM Mono WOFF2 route best preserves metrics: a pinned local conversion of the canonical TTFs or an audited package tied to the same upstream commit?
- Does the official Inter variable WOFF2 preserve the current hosted-build wrapping closely enough, or is a traceable static subset required within the typography-only batch?
- After the font candidate is independently verified, which one visual gap receives the highest critic priority: authored camera rail, distinct procedural worlds or cinematic loading direction?

## Recent evidence
- `AUTONOMY/RESEARCH.md` EXP-005 resolves DM Mono provenance and defines the Q-006 candidate, including source files, licenses, fallback, measurable acceptance and abandon conditions.
- `AUTONOMY/ASSETS.md` ASSET-001 records both font families as license-verified with hotlink remediation pending.
- The old statement that DM Mono provenance/license was unresolved is superseded and must not be restored.
- `AUTONOMY/STATE_MACHINE.md` now defines statuses, role ownership, CI checkpoints, attempt accounting and the mandatory strategy change after three equivalent failures.

## Compaction rule
At the end of each verified iteration, replace stale hypotheses with observed facts, retain at most three open questions and move repeated stable lessons to `MEMORY.md` only through the curator.

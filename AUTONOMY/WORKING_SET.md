# Working Set

Volatile context for the primary loop. Keep only the current iteration and the two most recent verified iterations.

## Current status
- Architecture-v2 is active: one source-changing two-hour loop plus read-only supervisors.
- Exact-SHA deployment and browser evidence now pass for commit `d22c6e8b2664965696ff7b02c792e6e1965f5fb2` at `https://aiwebdesign-polar-index.caoheming139.workers.dev`.
- Deployment receipt: `deployment-records:AUTONOMY/deployments/d22c6e8b2664965696ff7b02c792e6e1965f5fb2.json`; browser receipt: `deployment-records:AUTONOMY/browser-audits/d22c6e8b2664965696ff7b02c792e6e1965f5fb2.json`; GitHub Actions run `29924558425` passed.
- Desktop, Pixel 7 mobile and reduced-motion scenarios each returned HTTP 200, five panels, one WebGL2 canvas, complete scroll, no horizontal overflow, no page error, no failed request and no critical console error.
- `WEBGL_lose_context` loss and restoration passed; document content remained usable and canvas count remained one.
- No product candidate or accepted visual score exists yet. Functional browser success is not an independent artistic score.
- The active Google-hosted Inter and DM Mono requests loaded in this run, but the hotlink remains fragile and DM Mono exact provenance/license is still unresolved.

## Current hypotheses
1. Self-hosting the minimum verified WOFF2 font set can eliminate remote font dependency without changing title wrapping or mobile overflow.
2. The current camera rail may still be the largest artistic-quality gap, but it requires independent screenshot/visual review rather than inference from functional audit data.
3. GitHub Actions Playwright is suitable as the canonical functional browser gate; human/critic visual judgment must remain a separate evidence layer.

## Next primary objective
Execute `Q-006`: verify font provenance, self-host only required font files, remove Google Fonts requests and prove desktop/mobile/reduced-motion parity on the exact candidate SHA.

## Open questions
- Can DM Mono's exact source, author and license be verified for the specific files selected for shipping, or should it be replaced by a verified alternative/system fallback?
- What is the smallest WOFF2 weight/subset set that preserves the existing editorial hierarchy without unnecessary payload?
- After font dependency cleanup, which single visual gap receives the highest independent-critic priority: camera choreography, procedural-world differentiation or loading direction?

## Recent evidence
- Deployment receipt records `build.smoke_test: passed` for SHA `d22c6e8b2664965696ff7b02c792e6e1965f5fb2`.
- Browser audit result is `passed` with desktop, mobile, reduced-motion and WebGL recovery evidence, plus artifact `browser-audit-d22c6e8b2664965696ff7b02c792e6e1965f5fb2`.
- Browser audit reports `fonts_status: loaded` in all three scenarios and zero failed requests; this proves current-run loading only, not durable hotlink resilience or file-license completeness.
- `src/style.css` still imports Inter and DM Mono from `fonts.googleapis.com` and includes local family fallbacks.

## Compaction rule
At the end of each verified iteration, replace stale hypotheses with observed facts, retain at most three open questions and move repeated stable lessons to `MEMORY.md` only through the curator.

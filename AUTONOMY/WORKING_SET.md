# Working Set

Volatile context for the primary loop. Keep only the current iteration and the two most recent verified iterations.

## Current status
- Architecture-v2 is active: one source-changing two-hour loop plus read-only supervisors.
- The Cloudflare deployment channel is now verified. Commit `5bbc4a9bff1a1d31693884b7e90f2798b3aa3986` has an immutable deployment receipt, public URL `https://aiwebdesign-polar-index.caoheming139.workers.dev`, GitHub Actions run `29916167376`, and a passed HTTP smoke test.
- `STATE.json` records no active lease and phase `baseline_deployed_pending_browser_verification`.
- No product candidate or accepted score exists yet.
- Static source confirms a scroll-driven Three.js scene using GSAP/ScrollTrigger, bloom, particles, editorial typography and pointer parallax.
- Active external dependencies are Google-hosted Inter/DM Mono, Three.js and GSAP; licenses are partially resolved, while browser-level loading and fallback behavior remain pending.

## Current hypotheses
1. The deployed scene may need stronger authored camera choreography and scene-specific transformation density, but this requires browser observation rather than source inspection alone.
2. Mobile behavior, console health, reduced-motion behavior, loading recovery and WebGL failure handling still require direct verification on the exact deployed SHA.
3. External assets may improve visual quality, but adoption must remain evidence-driven and include provenance, payload and fallback checks.

## Next primary objective
Use the exact-SHA Cloudflare baseline URL to complete desktop/mobile browser verification. Only after that gate passes, select one highest-value coherent product change.

## Open questions
- What desktop/mobile frame behavior, console state, full-scroll behavior and reduced-motion behavior are observed on the current deployed baseline?
- Which single visual or interaction gap most limits perceived quality after that inspection?
- Do the active hosted fonts and bundled Three.js/GSAP dependencies load correctly in production, and are their failure fallbacks adequate?

## Recent evidence
- Deployment receipt: `deployment-records:AUTONOMY/deployments/5bbc4a9bff1a1d31693884b7e90f2798b3aa3986.json`; smoke test passed at `2026-07-22T11:34:11.474Z`.
- `src/main.js` imports Three.js, GSAP, ScrollTrigger and Three.js post-processing modules.
- `src/style.css` imports Inter and DM Mono from Google Fonts and includes system-family fallbacks.
- `STATE.json` contains a verified deployment identity but no browser verification, candidate or accepted score.

## Compaction rule
At the end of each verified iteration, replace stale hypotheses with observed facts, retain at most three open questions and move repeated stable lessons to `MEMORY.md` only through the curator.

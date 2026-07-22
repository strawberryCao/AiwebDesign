# Working Set

Volatile context for the primary loop. Keep only the current iteration and the two most recent verified iterations.

## Current status
- Architecture-v2 migration is complete; the repository now uses one source-changing two-hour loop plus read-only supervisors.
- No successful Cloudflare deployment, canonical live URL or deployed commit identity has yet been verified in repository evidence.
- Static source evidence confirms a scroll-driven Three.js scene using GSAP/ScrollTrigger, bloom, particles, editorial typography and pointer parallax.
- Static source evidence also confirms externally hosted Google Fonts plus npm dependencies on Three.js and GSAP; live loading, licensing documentation and production fallback remain only partially verified.

## Current hypotheses
1. The existing scene likely needs more authored camera choreography and scene-specific transformation density, but this must be judged from a real deployment rather than source inspection alone.
2. Loading, failure recovery, mobile quality adaptation and reduced-motion behavior still require direct live verification.
3. External assets may accelerate visual quality, but each candidate must be evaluated for provenance, cohesion, payload cost and fallback behavior.

## Next primary objective
Read `NEXT_PROMPT.md`. Establish a trustworthy baseline deployment first. After live inspection, implement only the highest-value coherent batch allowed by that objective.

## Open questions
- Are Cloudflare credentials configured, what is the canonical production URL, and does it map to the current `main` SHA?
- What desktop/mobile frame behavior, console state and reduced-motion behavior are observed on the deployed build?
- Which single visual or interaction gap most limits perceived quality after baseline inspection?

## Recent evidence
- `src/main.js` imports Three.js, GSAP, ScrollTrigger and Three.js post-processing modules.
- `src/style.css` imports Inter and DM Mono from Google Fonts and includes system-family fallbacks.
- `STATE.json`, `RUN_LOG.md` and `EVALUATION.md` contain no verified live deployment or accepted score.

## Compaction rule
At the end of each verified iteration, replace stale hypotheses with observed facts, retain at most three open questions and move repeated stable lessons to `MEMORY.md` only through the curator.
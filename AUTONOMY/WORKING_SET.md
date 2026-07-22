# Working Set

Volatile context for the primary loop. Keep only the current iteration and the two most recent verified iterations.

## Current status
- Architecture migration in progress.
- No successful Cloudflare deployment has yet been verified in repository evidence.
- Current implementation has a scroll-driven Three.js crystalline world, GSAP section choreography, bloom, particles, editorial typography and pointer parallax.
- The highest-risk unknown is deployment/browser evidence, not code existence.

## Current hypotheses
1. The existing scene has a coherent art direction but likely lacks the authored camera choreography, scene-specific transformation and transition density needed for the target quality bar.
2. Procedural crystal clusters are visually reusable but may read as repeated geometry rather than distinct project worlds.
3. Loading, failure recovery, mobile quality adaptation and reduced-motion behavior need direct live verification.

## Next primary objective
Read `NEXT_PROMPT.md`. Establish a trustworthy baseline deployment first. After live inspection, implement only the highest-value coherent batch allowed by that objective.

## Open questions
- Are Cloudflare repository secrets configured and usable by the current workflow?
- What is the canonical production URL and does it map to the current `main` SHA?
- What desktop/mobile frame rate and console behavior are observed on the deployed build?
- Which single visual gap most limits perceived quality after baseline inspection?

## Recent evidence
- Repository contains application source and a GitHub Actions Cloudflare workflow.
- `STATE.json` previously recorded deployment credentials and first live deployment as unverified blockers.

## Compaction rule
At the end of each verified iteration, replace stale hypotheses with observed facts, retain at most three open questions and move repeated stable lessons to `MEMORY.md` only through the curator.
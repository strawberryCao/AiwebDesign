# Autonomous WebGL Iteration Contract

## Goal
Build an original production-grade WebGL portfolio experience that reproduces the interaction architecture and perceived quality of `https://www.igloo.inc/`: a cinematic scroll-driven 3D journey, procedural frozen forms, shader-led transitions, tightly synchronized typography, playful particle interactions, and stable adaptive performance. Proprietary source code, brand text, logos and assets must not be copied.

## Acceptance score (100)
- Spatial composition and art direction: 20
- Camera choreography and transitions: 20
- Materials, lighting, particles and post-processing: 20
- Typography, pacing and UI synchronization: 15
- Interaction depth and delight: 10
- Performance and adaptive quality: 10
- Accessibility and failure recovery: 5

Stop modifying only after a score of at least 92 is independently recorded for two consecutive verification rounds. Until then, each round must ship one coherent improvement batch.

## Five-stage hourly pipeline
1. Orchestrator reads repository state and writes a single measurable iteration objective.
2. Baseline deployer deploys the untouched current commit and records URL, commit and failures.
3. Visual reviewer audits the live deployment and publishes prioritized, testable findings.
4. Builder implements only the approved batch, validates it, and pushes to `main`.
5. Verifier deploys the new commit, compares before/after, scores it, updates state, and replaces the builder automation prompt with the next iteration prompt.

## Guardrails
- Never claim deployment, testing, screenshots, Lighthouse results or visual parity without evidence.
- Never edit before a baseline deployment attempt has been recorded for that iteration.
- Never push broken builds.
- Keep each iteration reversible and attributable with commit message `iter-N: <objective>`.
- If Cloudflare credentials or deployment access are unavailable, record the blocker and do not fabricate a live URL.
- Prefer procedural geometry and generated textures over copied media.

# Evaluation Ledger

## Rubric
| Dimension | Weight | Evidence expected |
|---|---:|---|
| Spatial composition and art direction | 20 | Desktop/mobile captures across the full journey; distinct scene silhouettes and depth hierarchy |
| Camera choreography and transitions | 20 | Observable camera path, section transitions, continuity and input response |
| Materials, lighting, particles and post-processing | 20 | Material readability, lighting intent, effects stability and absence of distracting artifacts |
| Typography, pacing and UI synchronization | 15 | Legibility, hierarchy, timing and synchronization with the 3D state |
| Interaction depth and delight | 10 | Pointer/touch behavior, discoverable interactions and meaningful feedback |
| Performance and adaptive quality | 10 | Build evidence, console health, responsive quality controls and observed smoothness |
| Accessibility and recovery | 5 | Reduced-motion behavior, keyboard/semantic basics, loading and failure fallback |

## Scoring rules
- A dimension with no direct evidence is unknown, not full credit.
- Builder self-score and independent critic score are recorded separately.
- The accepted score is the lower evidence-supported score when they differ without resolution.
- A critical deployment, console, navigation or accessibility failure caps the total at 70.
- Completion requires two consecutive independent accepted scores of at least 92.

## History

### Independent audit — 2026-07-22 19:27 +08:00
- Repository head: b8da7f9c1549fac45da997c6b78576c0c806ccfe.
- Candidate SHA / URL: none. No deployment-records branch or SHA-bound deployment receipt was available.
- Evidence: deployment workflow and receipt contract exist, but no successful Cloudflare receipt, public URL, smoke-test result, desktop/mobile browser evidence, console evidence, reduced-motion evidence or asset-loading evidence exists for the current head.
- Independent critic score: unknown for every dimension.
- Accepted score: unknown.
- Regressions: not assessable.
- Decision: blocked until an exact commit SHA is tied to a live Cloudflare URL with a passed smoke test.

### Iteration 1 — 2026-07-22
- Objective: establish a verified Cloudflare baseline for exact main SHA c01b00362e3418c3e8836b161b7a10fd61bda45f.
- Baseline SHA / URL: SHA observed; URL unavailable and deployment identity unverified.
- Candidate SHA / URL: none.
- Evidence: no combined GitHub status checks; no callable Cloudflare deployment context, canonical URL, HTTP result or browser evidence.
- Builder score: unknown.
- Independent critic score: unknown.
- Accepted score: unknown.
- Regressions: none introduced because no product source or candidate was created.
- Decision: blocked.

### Bootstrap
- Baseline commit: unknown
- Deployment URL: unverified
- Builder score: unknown
- Independent score: unknown
- Accepted score: unknown
- Result: blocked pending first verified Cloudflare baseline

## Entry template
- Iteration and date
- Objective
- Baseline SHA and URL
- Candidate SHA and URL
- Evidence
- Builder score
- Independent critic score
- Accepted score
- Regressions
- Decision

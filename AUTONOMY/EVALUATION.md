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
- A dimension with no direct evidence is `unknown`, not full credit.
- Builder self-score and independent critic score are recorded separately.
- The accepted score is the lower evidence-supported score when they differ without resolution.
- A critical deployment, console, navigation or accessibility failure caps the total at 70.
- Completion requires two consecutive independent accepted scores of at least 92.

## History

### Bootstrap
- Baseline commit: unknown
- Deployment URL: unverified
- Builder score: unknown
- Independent score: unknown
- Accepted score: unknown
- Result: blocked pending first verified Cloudflare baseline

## Entry template
```md
### Iteration N — YYYY-MM-DD
- Objective:
- Baseline SHA / URL:
- Candidate SHA / URL:
- Evidence:
- Builder score:
- Independent critic score:
- Accepted score:
- Regressions:
- Decision: pass | continue | rollback | blocked
```
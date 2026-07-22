# Durable Autonomy Architecture

## Why the previous design was replaced
The original five-stage hourly relay depended on separate stateless runs passing context through issue comments. It created race conditions, compressed five tasks into less than one hour, duplicated repository hydration and allowed later stages to act on incomplete evidence.

The new design uses a **single-writer closed loop** for product changes and four slower, independent support loops. All continuity is stored in versioned repository files.

## Control-plane model

### 1. Primary two-hour closed loop
Runs every two hours and owns the complete product iteration. It is the only automation allowed to change `index.html`, `src/**`, build configuration or application assets.

Within one run it must:
1. hydrate repository memory;
2. acquire a state lease;
3. identify the exact baseline commit;
4. deploy or verify that untouched commit on Cloudflare;
5. inspect desktop and mobile output, scrolling, pointer interaction, console and reduced motion;
6. select one objective from `NEXT_PROMPT.md` and current evidence;
7. implement one coherent batch;
8. run checks and production build;
9. commit and push;
10. deploy and inspect the candidate;
11. compare baseline and candidate against the rubric;
12. update run log, evaluation, working set, next prompt and state;
13. release the lease.

This is a sequential state machine, not a relay between conversations.

### 2. Independent visual critic
Runs every six hours. It never edits product source. It audits the most recent verified deployment with fresh eyes, records reproducible findings and updates the evaluation/backlog. This prevents the builder from grading its own work exclusively.

### 3. Memory curator
Runs every six hours at a different offset. It compacts recent run logs and working notes, removes stale hypotheses and promotes only repeated or user-confirmed lessons to durable memory. It never edits product source.

### 4. Technical radar
Runs daily. It researches current primary-source guidance and high-quality public interaction patterns relevant to Three.js, WebGL/WebGPU, motion, accessibility and Cloudflare. It records principles and experiments, not copied code or assets.

### 5. Health and governance guard
Runs every four hours. It checks leases, repository consistency, CI/deployment health, evidence completeness and prompt drift. It may mark the project blocked and propose rollback, but it does not edit product source.

## Repository memory layers

| Layer | File | Purpose | Mutation policy |
|---|---|---|---|
| Operating constitution | `AGENTS.md` | Non-negotiable rules | Human or explicit architecture migration only |
| Machine state/checkpoint | `STATE.json` | Lease, phase, commits, URLs, scores, blockers | Atomic update; state written last |
| Dynamic objective | `NEXT_PROMPT.md` | Next measurable batch | Replaced after verified iteration or critic finding |
| Short-term memory | `WORKING_SET.md` | Current hypotheses and last few runs | Rolling/compact |
| Long-term memory | `MEMORY.md` | Stable lessons and preferences | Evidence-gated promotion |
| Decision memory | `DECISIONS.md` | Architectural decisions and reversals | Append-only |
| Episodic evidence | `RUN_LOG.md` | What actually happened each run | Append-only |
| Evaluation memory | `EVALUATION.md` | Rubric and score history | Append verified assessments |
| Research memory | `RESEARCH.md` | External principles and experiments | Source-backed, append/curate |
| Priority queue | `QUEUE.json` | Ranked candidate improvements | Structured updates |

## Lease and recovery protocol
`STATE.json.lease` is the single-writer lock. A source-changing run may proceed only when the lease is empty or safely expired. The primary loop checkpoints after baseline, after build and after candidate verification. If interrupted, the next run resumes from evidence instead of repeating or guessing.

Support jobs check the lease before writing autonomy files. If the primary loop is active, they either perform read-only analysis or skip.

## Prompt architecture
Automation prompts are fixed kernels containing role boundaries and safety gates. They read the mutable objective from `NEXT_PROMPT.md`. This is safer than replacing the whole automation prompt after every run, because self-modification can erase invariants and accumulate prompt drift.

## Scoring and stopping
The candidate is evaluated out of 100:
- spatial composition and art direction: 20;
- camera choreography and transitions: 20;
- materials, lighting, particles and post-processing: 20;
- typography, pacing and UI synchronization: 15;
- interaction depth and delight: 10;
- performance and adaptive quality: 10;
- accessibility and recovery: 5.

Autonomous source edits stop after two consecutive independent scores of at least 92 with successful deployment and no critical regression.
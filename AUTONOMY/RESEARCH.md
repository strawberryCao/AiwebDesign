# Technical and Interaction Research Memory

Record principles, authoritative sources and local experiments. Do not paste third-party implementation code or protected assets.

## Agent architecture sources adopted

### OpenAI Codex repository guidance
- Source: https://openai.com/index/introducing-codex/
- Adopted principle: keep repository-level operating instructions in `AGENTS.md`; require reliable tests and verifiable terminal/build evidence.

### OpenAI Agents SDK sessions and sandbox memory
- Sources:
  - https://openai.github.io/openai-agents-python/sessions/
  - https://openai.github.io/openai-agents-python/sandbox/memory/
- Adopted principle: distinguish conversational/session continuity from distilled file-backed memory. Scheduled tasks here cannot share a live session, so the repository stores both short-term working context and consolidated long-term lessons.

### LangGraph persistence
- Source: https://docs.langchain.com/oss/python/langgraph/persistence
- Adopted principle: checkpoint at meaningful state boundaries, support recovery from the last successful step and separate thread state from long-term memory.

### Anthropic orchestrator-worker pattern
- Source: https://www.anthropic.com/engineering/multi-agent-research-system
- Adopted principle: use a lead/orchestrator with specialist workers when work can be independently parallelized. For source mutation, use a single writer because visual implementation steps are tightly coupled; use specialists only for independent review, memory and research.

## Web experience research policy
The technical radar may study:
- official Three.js and WebGPU documentation;
- browser performance and accessibility guidance;
- publicly visible interaction behavior of high-quality sites;
- original procedural techniques suitable for this repository.

For each proposed technique, record:
1. source and date;
2. expected visual or performance benefit;
3. implementation risk;
4. a small local experiment or reason not to test it;
5. whether it was adopted, rejected or deferred.

## Current research backlog
- Camera rail and section-specific look targets rather than a single linear Y translation.
- Scene-specific procedural identities using distinct geometry systems, not cloned cluster layouts.
- GPU-friendly transition masks and depth-aware atmospheric effects.
- Adaptive pixel ratio, effect quality and particle count based on measured frame behavior.
- Deterministic seeded generation for reproducible visual comparisons.
- Loading progress and graceful WebGL failure fallback.
- Touch-specific interaction that is intentional rather than desktop pointer emulation.
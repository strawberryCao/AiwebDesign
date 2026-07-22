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

## Radar run — 2026-07-22

### EXP-001 — Self-host the active Inter and DM Mono families
- **Status:** proposed; source mutation blocked until Q-001 establishes a verified baseline.
- **Sources accessed 2026-07-22:**
  - Fontsource repository and package model: https://github.com/fontsource/fontsource
  - Fontsource MIT packaging license: https://github.com/fontsource/fontsource/blob/main/LICENSE
  - Inter canonical OFL record: https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt
  - Google Fonts repository licensing structure: https://github.com/google/fonts
- **Provider / authors:** Fontsource maintainers for packaging; Inter Project Authors for Inter; DM Mono authorship and exact canonical family license file still require package-level verification before implementation.
- **License / usage basis:** Fontsource packaging code is MIT. Inter is SIL OFL 1.1. Do not infer DM Mono licensing from the collection-level statement; inspect the exact `@fontsource/dm-mono` package metadata and bundled license before adoption.
- **Repository problem:** `src/style.css` currently hotlinks Google Fonts, while `ASSETS.md` records unverified production loading and incomplete author/license details. This is also one of the blockers in `STATE.json`.
- **Expected benefit:** removes a fragile cross-origin font dependency, makes typography deterministic/offline-capable, permits explicit weight/subset selection, and makes license provenance auditable.
- **Integration plan:** after Q-001, install only the required Fontsource packages/weights, import local CSS from the application entry, remove the remote `@import`, retain existing system fallbacks, and vendor/copy the exact font license records required by the package.
- **Optimization:** include only used Latin subsets and weights; prefer WOFF2; compare built font payload with current network transfer; preload only the critical display face if evidence supports it.
- **Risk:** importing full variable families or unnecessary weights can increase payload; font metrics may shift and alter editorial wrapping; DM Mono package metadata may not match assumptions.
- **Minimum experiment:** one candidate build replacing only Inter 400/600/800 and DM Mono 400/500, with no typography redesign.
- **Acceptance:** no request to `fonts.googleapis.com`/`fonts.gstatic.com`; first render remains legible with network font failure; heading/body wrapping has no critical regression; exact package licenses and authors are recorded; font payload is measured.
- **Abandon condition:** package-level license cannot be verified, payload materially exceeds the existing transfer without measurable resilience benefit, or metric changes break the composition.

### EXP-002 — CC0 snowy HDRI as controlled image-based lighting
- **Status:** asset candidate; do not add to `ASSETS.md` until selected for an actual candidate build.
- **Sources accessed 2026-07-22:**
  - Poly Haven asset license: https://polyhaven.com/license
  - Candidate `Snow Field`: https://polyhaven.com/a/snow_field
  - Three.js PMREMGenerator: https://threejs.org/docs/pages/PMREMGenerator.html
  - Three.js KTX2Loader: https://threejs.org/docs/pages/KTX2Loader.html
- **Provider / author:** Poly Haven; `Snow Field` by Sergej Majboroda.
- **License / usage basis:** Poly Haven states its downloadable HDRIs, textures and models are CC0; attribution is not required but should be recorded voluntarily. The asset page identifies the author and offers 1K–16K HDR/EXR variants; the 4K HDR shown on the page is approximately 11.55 MB.
- **Repository problem:** the current crystalline/frozen material direction is driven by procedural lighting only. A cool, low-contrast environment may add coherent reflections and material depth without requiring copied reference-site textures.
- **Expected benefit:** richer ice reflections, more believable roughness response, and a unified cold ambient palette; PMREM provides roughness-aware image-based lighting.
- **Integration plan:** after a verified baseline and live material inspection, download and vendor a controlled 1K or 2K HDR variant rather than hotlinking; load through `RGBELoader`, prefilter with `PMREMGenerator`, assign to `scene.environment`, and keep the current procedural lights as authored accents.
- **Optimization:** begin with 1K/2K HDR; measure decoded memory and startup cost; dispose source texture and PMREM generator; consider a later KTX2/BasisU path only if local tooling and browser coverage justify the added WASM/transcoder payload.
- **Fallback:** if HDR loading fails, retain the current procedural lights and neutral environment; loading failure must not block navigation or typography.
- **Risk:** outdoor photographic reflections may reveal the environment too literally, increase startup time, or conflict with the abstract dark-space identity. KTX2 adds worker/WASM complexity and older-browser limitations.
- **Minimum experiment:** one scene/material branch using a 1K or 2K local HDR, with unchanged geometry and camera.
- **Acceptance:** visible improvement in crystalline material depth in captured before/after views; no critical scene identity regression; HDR failure falls back cleanly; added compressed transfer and decoded memory are recorded; mobile loading remains acceptable.
- **Abandon condition:** reflections read as a literal snowy landscape, total startup cost is disproportionate, mobile memory becomes unstable, or the effect is not clearly better than procedural lighting.

## Radar run — 2026-07-22 browser-verification gate

### EXP-003 — Deterministic Playwright evidence matrix for the exact deployed SHA
- **Status:** proposed as a CI/developer verification tool; it is not a production asset and does not enter the shipped bundle.
- **Sources accessed 2026-07-22:**
  - Official Playwright emulation documentation: https://playwright.dev/docs/emulation
  - Official browser installation/documentation: https://playwright.dev/docs/browsers
  - Official repository and license: https://github.com/microsoft/playwright and https://github.com/microsoft/playwright/blob/main/LICENSE
- **Provider / author:** Microsoft and Playwright contributors.
- **License / usage basis:** Apache License 2.0. Retain the license/notice with development dependencies; no in-product attribution is required because it is CI-only tooling.
- **Repository problem:** Q-001 has an exact-SHA Cloudflare URL and HTTP smoke test, but desktop/mobile full-scroll behavior, touch emulation, console/page errors, reduced-motion behavior and screenshots remain unverified.
- **Expected benefit:** produces repeatable evidence tied to a URL and SHA instead of ad-hoc visual claims; Playwright supports desktop/mobile device profiles, touch/mobile viewport behavior, `reducedMotion`, screenshots and browser event capture.
- **Integration / format:** add `@playwright/test` as a development-only dependency after the primary loop accepts the tooling change; use Chromium first and store compact JSON evidence plus PNG screenshots as GitHub Actions artifacts. Browser binaries remain CI cache/runtime material and are never shipped in `dist`.
- **File/payload impact:** zero production transfer increase. Development installation adds the Playwright package and a separately installed browser binary; exact disk/download size must be measured in the adopting run rather than guessed.
- **Minimum experiment:** one test file against the immutable Cloudflare URL with three projects: desktop Chromium, a touch/mobile profile, and desktop Chromium with `reducedMotion: "reduce"`. Capture console errors, uncaught page errors, failed requests, initial/full-scroll/final screenshots and final scroll position.
- **Fallback:** if Playwright installation or browser launch is unavailable, keep the manual browser audit as the evidence path; do not weaken Q-001 or infer a pass from the HTTP smoke test.
- **Risk:** device emulation is not physical-device GPU testing; WebGL rendering can differ in headless/CI environments; screenshots may be nondeterministic because the scene uses animation or unseeded procedural generation.
- **Acceptance:** each project reaches network idle or a defined application-ready condition; zero unexpected console/page errors; full-scroll reaches the intended final section; reduced-motion visibly suppresses non-essential scroll/camera animation; artifacts identify exact SHA, URL, viewport and timestamp.
- **Abandon condition:** tests cannot distinguish app readiness from perpetual animation/network activity, WebGL is unavailable in the runner without an acceptable software-rendering path, or screenshots remain too nondeterministic to support comparisons.

### EXP-004 — WebGL context-loss fault injection and recovery evidence
- **Status:** proposed as a browser-only fault test supporting Q-001/Q-004; no external media or runtime library is required.
- **Sources accessed 2026-07-22:**
  - Khronos ratified `WEBGL_lose_context` specification: https://registry.khronos.org/webgl/extensions/WEBGL_lose_context/
  - MDN `WEBGL_lose_context`: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context
  - MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **Provider / author:** Khronos WebGL Working Group; browser implementations; MDN documentation.
- **License / usage basis:** browser-standard API and documentation reference; no downloadable asset or production dependency is introduced.
- **Repository problem:** `ASSETS.md` records no verified non-WebGL fallback, and Q-001/Q-004 require loading/failure recovery evidence. A top-level HTTP 2xx cannot prove behavior when the GPU context is lost.
- **Expected benefit:** verifies that typography/navigation remain available and that a controlled fallback or recovery message appears when rendering resources are destroyed; catches loops that continue throwing after context loss.
- **Integration / format:** in a Playwright or manual DevTools session, obtain the canvas WebGL/WebGL2 context, request `WEBGL_lose_context`, call `loseContext()`, observe `webglcontextlost`, console state and DOM usability, then optionally call `restoreContext()` and wait for `webglcontextrestored`. Do not ship test controls in production UI.
- **File/payload impact:** zero production transfer and zero external file size. Evidence is JSON/event timestamps plus before/lost/restored screenshots.
- **Fallback:** when the extension is unavailable, record the test as unsupported and separately test WebGL context creation failure; never mark recovery as passed without an observed event or user-visible fallback.
- **Risk:** Three.js may not recreate all resources automatically; forcing restoration can expose latent leaks or duplicate animation loops; the extension simulates context loss but not every GPU/driver failure mode.
- **Minimum experiment:** lose context after the first stable frame, assert the page remains scrollable/readable, record whether rendering stops cleanly, then restore once and assert no duplicate canvas/RAF loop or repeated console error storm.
- **Acceptance:** context-loss event is observed; navigation/editorial content remains usable; no uncontrolled exception loop occurs; either a clear fallback is shown or rendering restores exactly once; behavior is recorded for desktop and reduced-motion profiles.
- **Abandon condition:** browser/renderer does not expose the extension in the verification environment, or the test requires invasive production hooks rather than browser-side evaluation.

## Current research backlog
- Complete exact-SHA desktop/mobile/reduced-motion/browser-error verification using EXP-003 or equivalent direct evidence.
- Exercise WebGL context loss/failure behavior through EXP-004 before claiming resilience.
- Camera rail and section-specific look targets rather than a single linear Y translation.
- Scene-specific procedural identities using distinct geometry systems, not cloned cluster layouts.
- GPU-friendly transition masks and depth-aware atmospheric effects.
- Adaptive pixel ratio, effect quality and particle count based on measured frame behavior.
- Deterministic seeded generation for reproducible visual comparisons.
- Loading progress and graceful WebGL failure fallback.
- Touch-specific interaction that is intentional rather than desktop pointer emulation.

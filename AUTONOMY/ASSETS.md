# External Asset Ledger

This file is the source of truth for non-trivial external media, fonts, libraries and hosted dependencies used by the project.

## Required fields
For every asset, record:
- **ID**: stable identifier such as `ASSET-001`;
- **Type**: model, HDRI, texture, font, icon, audio, video, library or service;
- **Provider / author**;
- **Source**: canonical page or repository;
- **License / usage basis**;
- **Attribution requirement**;
- **Project location**: local path or controlled remote location;
- **Optimization**: compression, dimensions, polycount, transcoding or lazy-loading status;
- **Fallback**: what renders or plays if loading fails;
- **Introduced by**: iteration and commit;
- **Verification**: evidence that the shipped asset loads and that attribution is present when required.

## Selection priorities
1. CC0 or public-domain assets.
2. Permissively licensed assets with manageable attribution.
3. Purchased or stock assets covered by an applicable license.
4. Official demo/sample assets explicitly offered for reuse.
5. User-provided assets.

Unknown-rights files copied from reference websites are not acceptable substitutes. Recreate, license or replace them.

## Active assets

### ASSET-001 — Inter and DM Mono hosted fonts
- **Type:** font / hosted service
- **Provider / author:** Google Fonts service; Rasmus Andersson / Inter Project Authors for Inter; Colophon Foundry / DM Mono Project Authors for DM Mono
- **Source:**
  - Runtime stylesheet: `https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600;700;800;900&display=swap`
  - Inter upstream: `https://github.com/rsms/inter`
  - Inter canonical license: `https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt`
  - DM Mono canonical family directory: `https://github.com/google/fonts/tree/main/ofl/dmmono`
  - DM Mono metadata: `https://raw.githubusercontent.com/google/fonts/main/ofl/dmmono/METADATA.pb`
  - DM Mono canonical license: `https://raw.githubusercontent.com/google/fonts/main/ofl/dmmono/OFL.txt`
- **License / usage basis:** Inter and DM Mono are both verified as SIL Open Font License 1.1. Google Fonts metadata identifies DM Mono's designer as Colophon Foundry and points to upstream `googlefonts/dm-mono` commit `57fadabfb200a77de2812540026c249dc3013077`. Bundling, embedding and redistribution with the application are permitted when the copyright notice and OFL text are retained.
- **Attribution requirement:** retain each font's copyright notice and OFL text with redistributed font software. No visible in-product credit is required by the OFL text.
- **Project location:** `src/style.css` first-line remote `@import`
- **Optimization:** remote CSS/font loading; no local subset, preload or self-hosted package is recorded. Canonical upstream source sizes observed on 2026-07-23: Inter `InterVariable.woff2` 344 KB and `Inter-Regular.woff2` 109 KB; DM Mono `DMMono-Regular.ttf` 48.6 KB and `DMMono-Medium.ttf` 49.2 KB. Final candidate WOFF2 sizes must be measured after the pinned conversion/package step.
- **Fallback:** CSS falls back to `sans-serif` and `monospace`; a controlled blocked-font test is still required.
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static source and both canonical OFL records verified. Exact-SHA browser audit for `615fd15f43decd51a59e76481413e59e046153f4` reported `fonts_status: loaded` with zero failed requests in desktop, mobile and reduced-motion scenarios. This proves successful loading for that run, not hotlink durability or failure-fallback quality.
- **Status:** license_verified_hotlink_pending_remediation
- **Planned remediation:** EXP-005 in `RESEARCH.md` specifies direct canonical self-hosting for Q-006 using Inter variable upright plus DM Mono 400/500, with exact source commit, original/shipped sizes, retained OFL files and blocked-font fallback evidence.

### ASSET-002 — Three.js 0.185.1
- **Type:** library
- **Provider / author:** Three.js authors and contributors
- **Source:**
  - Repository: `https://github.com/mrdoob/three.js`
  - License: `https://github.com/mrdoob/three.js/blob/dev/LICENSE`
- **License / usage basis:** MIT License, copyright 2010–2026 three.js authors; reuse, modification, distribution and commercial use are permitted subject to retaining the copyright and permission notice in copies or substantial portions.
- **Attribution requirement:** retain the MIT copyright and permission notice in distributed source/package notices; no visible UI attribution is required by the MIT text.
- **Project location:** `package.json`; imported by `src/main.js`, including EffectComposer, RenderPass and UnrealBloomPass
- **Optimization:** bundled by Vite; renderer pixel ratio is capped, but production bundle size and code splitting are unverified
- **Fallback:** no verified non-WebGL application fallback beyond page-level HTML/CSS
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static imports and pinned version verified; canonical MIT license verified on 2026-07-22. Exact-SHA browser audit for `615fd15f43decd51a59e76481413e59e046153f4` passed desktop/mobile/reduced-motion WebGL2 initialization, complete scrolling and context loss/restoration. A user-facing WebGL creation-failure fallback remains unverified.
- **Status:** license_and_runtime_verified_fallback_pending

### ASSET-003 — GSAP 3.15.0 and ScrollTrigger
- **Type:** library
- **Provider / author:** GreenSock
- **Source:**
  - Repository: `https://github.com/greensock/GSAP`
  - Standard license: `https://gsap.com/standard-license`
- **License / usage basis:** GreenSock's current repository states GSAP, including previously bonus plugins, is free for commercial use under GreenSock's standard no-charge license. This is not an MIT license; the project must retain the applicable GreenSock license terms and avoid representing GSAP as open-source MIT code.
- **Attribution requirement:** no visible UI attribution was identified in the repository summary, but the standard license remains the controlling record and should be retained with dependency notices.
- **Project location:** `package.json`; `src/main.js` imports GSAP and ScrollTrigger
- **Optimization:** bundled by Vite; ScrollTrigger registration is skipped for reduced-motion users
- **Fallback:** reduced-motion path avoids ScrollTrigger registration; full no-JavaScript behavior remains unverified
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static imports and pinned version verified; canonical repository and standard-license basis verified on 2026-07-22. Exact-SHA browser audit for `615fd15f43decd51a59e76481413e59e046153f4` passed full desktop/mobile scrolling and reduced-motion behavior without console, page or failed-request errors.
- **Status:** license_and_runtime_verified_nojs_fallback_pending

## Candidate assets
No external model, HDRI, texture, icon, audio or video has entered a candidate build. `RESEARCH.md` EXP-002 records Poly Haven `Snow Field` as a researched CC0 HDRI candidate only; it must not be promoted here until selected and downloaded for an actual candidate build.

## Curator and radar findings
- No duplicate active asset entries were found.
- Inter and DM Mono authorship and canonical OFL 1.1 records are now verified; DM Mono license uncertainty is resolved.
- The remaining ASSET-001 blocker is operational: remove the Google Fonts hotlink, vendor controlled WOFF2 files, retain both OFL records, measure shipped sizes and prove the fallback.
- Three.js and GSAP licensing and normal-path browser behavior are verified by exact-SHA evidence; WebGL creation failure and no-JavaScript fallbacks remain open resilience work.
- Before completion, identify introduction commits, retain required notices, eliminate fragile hotlinks and verify every asset's failure path.

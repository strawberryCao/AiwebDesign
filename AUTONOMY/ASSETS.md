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
- **Provider / author:** Google Fonts service; Inter Project Authors for Inter; exact DM Mono author record still requires family/package-level verification
- **Source:**
  - Runtime stylesheet: `https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600;700;800;900&display=swap`
  - Inter canonical license: `https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt`
  - Google Fonts source/licensing repository: `https://github.com/google/fonts`
- **License / usage basis:** Inter is verified as SIL Open Font License 1.1. Google Fonts documents that each family directory carries its specific license. The exact DM Mono family directory, author record and license file were not conclusively resolved in this radar run and remain pending; do not infer them from another DM family.
- **Attribution requirement:** Inter OFL requires retention of the copyright notice and license when redistributing the font software; no visible in-product credit is established as mandatory. DM Mono requirements remain pending exact-family verification.
- **Project location:** `src/style.css` first-line remote `@import`
- **Optimization:** remote CSS/font loading; no local subset, preload or self-hosted package is recorded
- **Fallback:** CSS falls back to `sans-serif` and `monospace`
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static source verified; Inter license verified on 2026-07-22; DM Mono exact license/authorship and production loading/caching/failure behavior remain unverified
- **Status:** needs_review
- **Planned remediation:** EXP-001 in `RESEARCH.md` proposes package-level verified self-hosting through Fontsource after Q-001.

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
- **Verification:** static imports and pinned version verified; canonical MIT license verified on 2026-07-22; production load and fallback remain pending
- **Status:** license_verified_runtime_pending

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
- **Verification:** static imports and pinned version verified; canonical repository and standard-license basis verified on 2026-07-22; production behavior and fallback remain pending
- **Status:** license_verified_runtime_pending

## Candidate assets
No external model, HDRI, texture, icon, audio or video has entered a candidate build. `RESEARCH.md` EXP-002 records Poly Haven `Snow Field` as a researched CC0 HDRI candidate only; it must not be promoted here until selected and downloaded for an actual candidate build.

## Curator and radar findings
- The previous statement that no external project assets were registered was inconsistent with source evidence: hosted Google Fonts, Three.js and GSAP are active dependencies.
- No duplicate active asset entries were found.
- Three.js and GSAP licensing bases are now canonically recorded; their production loading/fallback behavior remains unverified.
- Inter licensing is now recorded; DM Mono exact family authorship/license remains unresolved and blocks ASSET-001 from verified status.
- Before completion, identify introduction commits, vendor required notices, verify production loading/fallback behavior, and either verify DM Mono exactly or replace/self-host it through a package carrying auditable metadata.

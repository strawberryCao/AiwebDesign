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
- **Provider / author:** Google Fonts; underlying font authors not yet recorded in-repository
- **Source:** `https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600;700;800;900&display=swap`
- **License / usage basis:** external hosted-font usage is present in source; exact upstream license files and author records have not yet been vendored or verified in this repository
- **Attribution requirement:** needs review against the canonical font pages/license records
- **Project location:** `src/style.css` first-line `@import`
- **Optimization:** remote CSS/font loading; no local subset, preload or self-hosted package is recorded
- **Fallback:** CSS falls back to `sans-serif` and `monospace`
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static source verified; production loading, caching and failure behavior remain unverified
- **Status:** needs_review

### ASSET-002 — Three.js 0.185.1
- **Type:** library
- **Provider / author:** Three.js contributors
- **Source:** npm package `three`; repository/package canonical source to be recorded by the technical radar
- **License / usage basis:** dependency is pinned in `package.json`; exact license file has not yet been checked into this ledger
- **Attribution requirement:** pending package-license verification
- **Project location:** `package.json`; imported by `src/main.js`, including EffectComposer, RenderPass and UnrealBloomPass
- **Optimization:** bundled by Vite; renderer pixel ratio is capped, but production bundle size and code splitting are unverified
- **Fallback:** no verified non-WebGL application fallback beyond page-level HTML/CSS
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static imports and pinned version verified; production load and license record pending
- **Status:** needs_review

### ASSET-003 — GSAP 3.15.0 and ScrollTrigger
- **Type:** library
- **Provider / author:** GreenSock
- **Source:** npm package `gsap`; canonical package/repository page to be recorded by the technical radar
- **License / usage basis:** dependency is pinned in `package.json`; exact applicable license terms have not yet been verified in this repository
- **Attribution requirement:** pending package-license verification
- **Project location:** `package.json`; `src/main.js` imports GSAP and ScrollTrigger
- **Optimization:** bundled by Vite; ScrollTrigger registration is skipped for reduced-motion users
- **Fallback:** reduced-motion path avoids ScrollTrigger registration; full no-JavaScript behavior remains unverified
- **Introduced by:** bootstrap implementation; exact introducing commit not yet identified
- **Verification:** static imports and pinned version verified; production behavior and license record pending
- **Status:** needs_review

## Curator findings
- The previous statement that no external project assets were registered was inconsistent with source evidence: hosted Google Fonts, Three.js and GSAP are already active dependencies.
- No duplicate asset entries were found.
- No external models, HDRIs, textures, icons, audio or video are evidenced in the reviewed files.
- Before completion, the technical radar or primary loop must replace the pending license fields with verified canonical records and validate production loading/fallback behavior.
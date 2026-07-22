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

No external project assets have been registered yet. Runtime npm dependencies remain governed by `package.json` and their upstream licenses; visually significant libraries or hosted services should also be summarized here when introduced.
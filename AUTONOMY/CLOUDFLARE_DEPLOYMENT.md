# Cloudflare Deployment and Browser Evidence

## Architecture

Production deployment and browser verification are performed by GitHub Actions. Cloudflare credentials never appear in an agent prompt or repository file.

- Workflow: `.github/workflows/deploy-cloudflare.yml`
- Trigger: every push to `main`, plus manual `workflow_dispatch`
- Build gates: dependency install, `npm run check`, `npm run build`
- Deploy command: Cloudflare official `wrangler-action` with Wrangler 4.63.0
- Browser gate: Playwright Chromium against the deployed public URL
- Runtime configuration: `wrangler.jsonc`
- Evidence branch: `deployment-records`
- Immutable deployment receipt: `AUTONOMY/deployments/<source-sha>.json`
- Immutable browser receipt: `AUTONOMY/browser-audits/<source-sha>.json`
- Convenience pointers: corresponding `latest.json` files; pointers are not exact-SHA proof
- Evidence artifact: `browser-audit-<source-sha>` retained by GitHub Actions for 30 days

## Required GitHub Actions secrets

Create these repository secrets exactly once:

1. `CLOUDFLARE_API_TOKEN`
   - Create a scoped Cloudflare API token using the **Edit Cloudflare Workers** template or equivalent minimum permissions.
   - Restrict the token to the Cloudflare account used by this project.
   - Do not paste the value into source files, issues, prompts, logs, or autonomy documents.
2. `CLOUDFLARE_ACCOUNT_ID`
   - Use the 32-character account ID for the target Cloudflare account.

GitHub location:

`Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

Cloudflare reference:

`https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/`

## Exact-SHA verification matrix

A successful run must:

1. install dependencies and pass syntax and Vite production build checks;
2. deploy the exact triggering SHA;
3. produce a public Cloudflare target URL;
4. pass an HTTP smoke test;
5. create `deployment-records:AUTONOMY/deployments/<sha>.json` with matching `source_sha`, public `deployment_url`, workflow metadata, and `build.smoke_test: passed`;
6. install Playwright Chromium in the GitHub runner;
7. visit the deployed URL using desktop, mobile-touch, and reduced-motion contexts;
8. verify the five-panel full-scroll journey, one WebGL canvas, a usable WebGL context, pointer/touch interaction, no fatal page error, no critical document/script/stylesheet request failure, no horizontal overflow, and accessible text after loading;
9. exercise `WEBGL_lose_context` when available and record whether context restoration succeeds without duplicate canvas creation or loss of document usability;
10. upload screenshots, Playwright report, traces/videos on failure, and structured audit output;
11. create `deployment-records:AUTONOMY/browser-audits/<sha>.json` with the same exact `source_sha`, `deployment_url`, workflow run, artifact name, scenario evidence, WebGL recovery result, and top-level `result`.

External Google font failure is recorded but does not by itself fail the core page gate because CSS fallbacks exist. It remains an asset-quality finding until the font is self-hosted or live loading is verified.

## Agent gate

Before editing product source, the primary loop must fetch both immutable receipts for the current `main` SHA:

- `AUTONOMY/deployments/<main-sha>.json`
- `AUTONOMY/browser-audits/<main-sha>.json`

Product source remains locked unless:

- both `source_sha` fields exactly equal the current `main` SHA;
- both receipts name the same public deployment URL;
- deployment `build.smoke_test` is `passed`;
- browser audit `result` is `passed`.

The same two-receipt rule applies to candidate verification after an iteration commit. Artifact names and `latest.json` pointers help navigation but do not replace exact-SHA receipts.

## Authorization checkpoint

- User confirmed on 2026-07-22 that both required GitHub Actions secrets were added.
- Secret values remain unreadable to agents and must never be copied into repository content or logs.

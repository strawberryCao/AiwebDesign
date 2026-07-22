# Cloudflare Deployment Bootstrap

## Architecture

Production deployment is performed by GitHub Actions, not by placing Cloudflare credentials in an agent prompt or repository file.

- Workflow: `.github/workflows/deploy-cloudflare.yml`
- Trigger: every push to `main`, plus manual `workflow_dispatch`
- Build gates: dependency install, `npm run check`, `npm run build`
- Deploy command: `npx wrangler deploy`
- Runtime configuration: `wrangler.jsonc`
- Evidence branch: `deployment-records`
- Immutable receipt: `AUTONOMY/deployments/<source-sha>.json`
- Convenience pointer: `AUTONOMY/deployments/latest.json`

## Required GitHub Actions secrets

Create these repository secrets exactly once:

1. `CLOUDFLARE_API_TOKEN`
   - Create a scoped Cloudflare API token using the **Edit Cloudflare Workers** template/custom permission.
   - Restrict the token to the Cloudflare account used by this project.
   - Do not paste the value into source files, issues, prompts, logs, or autonomy documents.
2. `CLOUDFLARE_ACCOUNT_ID`
   - Use the 32-character account ID for the target Cloudflare account.

GitHub location:

`Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

Cloudflare reference:

`https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/`

## Verification

After both secrets exist, run the workflow manually or push a commit to `main`.

A successful run must:

1. pass dependency installation, syntax check, and Vite build;
2. deploy the exact triggering SHA;
3. produce a public Cloudflare target URL;
4. pass the HTTP smoke test;
5. create `deployment-records:AUTONOMY/deployments/<sha>.json` with:
   - matching `source_sha`;
   - public `deployment_url`;
   - Cloudflare worker/version metadata when available;
   - `build.smoke_test` equal to `passed`.

## Agent usage

Before editing product source, the primary loop must fetch the receipt for the current `main` SHA from the `deployment-records` branch. If the receipt is absent, mismatched, or does not show a passed smoke test, the baseline is not verified and product source must remain unchanged.

The same rule applies to candidate verification after an iteration commit.

## Authorization checkpoint

- User confirmed on 2026-07-22 that both required GitHub Actions secrets were added.
- This documentation-only commit intentionally triggers the first credentialed deployment pipeline.
- Secret values remain unreadable to agents and must never be copied into repository content or logs.

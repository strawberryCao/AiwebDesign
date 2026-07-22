import fs from 'node:fs/promises';
import path from 'node:path';
import { devices, expect, test } from '@playwright/test';

const deploymentUrl = process.env.DEPLOYMENT_URL?.trim();
const sourceSha = process.env.SOURCE_SHA || process.env.GITHUB_SHA || 'unknown';
const auditDirectory = path.join(process.cwd(), 'test-results', 'browser-audit');
const auditPath = path.join(auditDirectory, 'audit.json');

const pixel7 = devices['Pixel 7'];
const scenarios = [
  {
    name: 'desktop',
    contextOptions: {
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    },
    interaction: 'pointer',
    reducedMotionExpected: false,
  },
  {
    name: 'mobile',
    contextOptions: {
      viewport: pixel7.viewport,
      userAgent: pixel7.userAgent,
      deviceScaleFactor: pixel7.deviceScaleFactor,
      isMobile: pixel7.isMobile,
      hasTouch: pixel7.hasTouch,
    },
    interaction: 'touch',
    reducedMotionExpected: false,
  },
  {
    name: 'reduced_motion',
    contextOptions: {
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    },
    interaction: 'pointer',
    reducedMotionExpected: true,
  },
];

function serializeError(error) {
  return {
    name: error?.name || 'Error',
    message: error?.message || String(error),
    stack: error?.stack || null,
  };
}

function isFallbackFontRequest(url) {
  return /https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//i.test(url);
}

async function auditScenario(browser, definition) {
  const result = {
    name: definition.name,
    status: 'failed',
    core_passed: false,
    console_errors: [],
    page_errors: [],
    failed_requests: [],
    notes: [],
  };

  const context = await browser.newContext(definition.contextOptions);
  const page = await context.newPage();

  page.on('console', (message) => {
    if (message.type() === 'error') result.console_errors.push(message.text());
  });
  page.on('pageerror', (error) => result.page_errors.push(serializeError(error)));
  page.on('requestfailed', (request) => {
    result.failed_requests.push({
      url: request.url(),
      resource_type: request.resourceType(),
      failure: request.failure()?.errorText || 'unknown',
    });
  });

  try {
    const response = await page.goto(deploymentUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    result.http_status = response?.status() ?? null;
    result.final_url = page.url();

    try {
      await page.waitForLoadState('networkidle', { timeout: 30_000 });
    } catch {
      result.notes.push('networkidle timeout; continued with explicit DOM and resource checks');
    }

    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('#scene')).toBeAttached();
    await page.waitForTimeout(1_000);

    result.title = await page.title();
    result.panel_count = await page.locator('main .panel').count();
    result.canvas_count = await page.locator('canvas#scene').count();
    result.webgl = await page.locator('#scene').evaluate((canvas) => {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return {
        available: Boolean(gl),
        context_type: gl instanceof WebGL2RenderingContext ? 'webgl2' : gl ? 'webgl' : null,
        canvas_width: canvas.width,
        canvas_height: canvas.height,
        drawing_buffer_width: gl?.drawingBufferWidth ?? null,
        drawing_buffer_height: gl?.drawingBufferHeight ?? null,
        lose_context_extension: Boolean(gl?.getExtension('WEBGL_lose_context')),
      };
    });

    const panelLocator = page.locator('main .panel');
    result.scroll_checkpoints = [];
    for (let index = 0; index < result.panel_count; index += 1) {
      await panelLocator.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(definition.reducedMotionExpected ? 150 : 450);
      result.scroll_checkpoints.push(await page.evaluate(() => Math.round(window.scrollY)));
    }

    if (definition.interaction === 'touch') {
      await page.locator('.menu').tap();
      result.interaction = { type: 'touch', completed: true };
    } else {
      await page.mouse.move(120, 120);
      await page.locator('.brand').hover();
      await page.waitForTimeout(250);
      result.interaction = {
        type: 'pointer',
        completed: true,
        cursor_active: await page.locator('.cursor').evaluate((element) => element.classList.contains('active')),
      };
    }

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(definition.reducedMotionExpected ? 200 : 700);

    result.layout = await page.evaluate(async () => {
      await document.fonts.ready;
      const root = document.documentElement;
      const grain = document.querySelector('.grain');
      const cursor = document.querySelector('.cursor');
      return {
        scroll_y: Math.round(window.scrollY),
        scroll_height: root.scrollHeight,
        viewport_height: window.innerHeight,
        bottom_reached: Math.ceil(window.scrollY + window.innerHeight) >= root.scrollHeight - 4,
        horizontal_overflow: root.scrollWidth > window.innerWidth + 2,
        prefers_reduced_motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        grain_animation_name: grain ? getComputedStyle(grain).animationName : null,
        cursor_display: cursor ? getComputedStyle(cursor).display : null,
        fonts_status: document.fonts.status,
        visible_text_length: document.body.innerText.trim().length,
        scene_label: document.querySelector('.scene-label b')?.textContent || null,
      };
    });

    result.reduced_motion_applied = definition.reducedMotionExpected
      ? result.layout.prefers_reduced_motion
        && result.layout.grain_animation_name === 'none'
        && result.layout.cursor_display === 'none'
      : true;

    result.critical_failed_requests = result.failed_requests.filter((request) => (
      ['document', 'script', 'stylesheet'].includes(request.resource_type)
      && !isFallbackFontRequest(request.url)
    ));

    result.screenshot = `test-results/browser-audit/${definition.name}.png`;
    await page.screenshot({
      path: path.join(auditDirectory, `${definition.name}.png`),
      fullPage: true,
      animations: 'disabled',
    });

    result.core_passed = Boolean(
      result.http_status
      && result.http_status < 400
      && result.panel_count >= 5
      && result.canvas_count === 1
      && result.webgl.available
      && result.layout.bottom_reached
      && !result.layout.horizontal_overflow
      && result.layout.visible_text_length > 100
      && result.page_errors.length === 0
      && result.critical_failed_requests.length === 0
      && result.reduced_motion_applied
    );
    result.status = result.core_passed ? 'passed' : 'failed';
  } catch (error) {
    result.fatal_error = serializeError(error);
  } finally {
    await context.close();
  }

  return result;
}

async function auditWebglRecovery(browser) {
  const result = {
    status: 'failed',
    supported: false,
    context_lost: false,
    context_restored: false,
    dom_usable_after_loss: false,
    canvas_count_after_restore: null,
    console_errors: [],
    page_errors: [],
  };

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') result.console_errors.push(message.text());
  });
  page.on('pageerror', (error) => result.page_errors.push(serializeError(error)));

  try {
    await page.goto(deploymentUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await expect(page.locator('#scene')).toBeAttached();
    await page.waitForTimeout(1_000);

    const setup = await page.locator('#scene').evaluate((canvas) => {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      const extension = gl?.getExtension('WEBGL_lose_context');
      window.__polarWebglAudit = {
        lost: false,
        restored: false,
        extension,
      };
      canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        window.__polarWebglAudit.lost = true;
      });
      canvas.addEventListener('webglcontextrestored', () => {
        window.__polarWebglAudit.restored = true;
      });
      extension?.loseContext();
      return { webgl: Boolean(gl), supported: Boolean(extension) };
    });

    result.supported = setup.supported;
    if (!setup.webgl) {
      result.status = 'failed';
      return result;
    }
    if (!setup.supported) {
      result.status = 'unsupported';
      return result;
    }

    try {
      await page.waitForFunction(() => window.__polarWebglAudit?.lost === true, null, { timeout: 8_000 });
      result.context_lost = true;
    } catch {
      result.context_lost = false;
    }

    result.dom_usable_after_loss = await page.evaluate(() => (
      document.querySelectorAll('main .panel').length >= 5
      && document.body.innerText.includes('POLAR/INDEX')
    ));

    await page.evaluate(() => window.__polarWebglAudit?.extension?.restoreContext());
    try {
      await page.waitForFunction(() => window.__polarWebglAudit?.restored === true, null, { timeout: 12_000 });
      result.context_restored = true;
    } catch {
      result.context_restored = false;
    }

    await page.waitForTimeout(1_000);
    result.canvas_count_after_restore = await page.locator('canvas#scene').count();
    result.status = result.context_lost
      && result.context_restored
      && result.dom_usable_after_loss
      && result.canvas_count_after_restore === 1
      && result.page_errors.length === 0
      ? 'passed'
      : result.context_lost && result.dom_usable_after_loss
        ? 'degraded'
        : 'failed';
  } catch (error) {
    result.fatal_error = serializeError(error);
  } finally {
    await context.close();
  }

  return result;
}

test('audit exact deployed SHA across desktop, mobile, reduced motion, and WebGL recovery', async ({ browser }) => {
  await fs.mkdir(auditDirectory, { recursive: true });

  const audit = {
    schema_version: 1,
    source_sha: sourceSha,
    deployment_url: deploymentUrl || null,
    verified_at: new Date().toISOString(),
    result: 'failed',
    scenarios: {},
    webgl_recovery: null,
    artifacts: {
      html_report: 'playwright-report',
      result_directory: 'test-results',
      screenshots: [],
      trace_on_failure: true,
      video_on_failure: true,
    },
  };

  let fatalError = null;
  try {
    expect(deploymentUrl, 'DEPLOYMENT_URL must be provided by the deployment workflow').toBeTruthy();

    for (const definition of scenarios) {
      const scenarioResult = await auditScenario(browser, definition);
      audit.scenarios[definition.name] = scenarioResult;
      if (scenarioResult.screenshot) audit.artifacts.screenshots.push(scenarioResult.screenshot);
    }

    audit.webgl_recovery = await auditWebglRecovery(browser);
    const scenariosPassed = Object.values(audit.scenarios).every((scenario) => scenario.core_passed);
    const recoveryAcceptable = ['passed', 'degraded', 'unsupported'].includes(audit.webgl_recovery.status);
    audit.result = scenariosPassed && recoveryAcceptable ? 'passed' : 'failed';
  } catch (error) {
    fatalError = error;
    audit.fatal_error = serializeError(error);
  } finally {
    audit.completed_at = new Date().toISOString();
    await fs.writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
  }

  if (fatalError) throw fatalError;
  expect(audit.result, `Browser audit failed. See ${auditPath}`).toBe('passed');
});

/**
 * Screenshots of content blocks for the admin block picker (pnpm previews:build).
 * Captures, headless, the site route /apercu/<slug> (blue silo, light mode, lorem ipsum demo data)
 * and writes public/apercus/<slug>.png. Every capture is a stage of PREVIEW_STAGE: standard
 * (480 × 360) or wide (960 × 360, the WIDE_PREVIEWS blocks), at 2x, so the PNGs have two sizes
 * only; the route centres the component in it and scales it down when it does not fit.
 * The dev server must be running (pnpm dev).
 *   PREVIEW_BASE: server address (default http://localhost:3000)
 *   PREVIEW_ONLY: comma-separated slugs, to capture only those
 */
import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

import {PREVIEW_SLUGS, PREVIEW_STAGE, WIDE_PREVIEWS} from '../src/fields/blocks/previews';

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3000';
const ONLY = process.env.PREVIEW_ONLY?.split(',').filter(Boolean);
const OUT = path.resolve('public/apercus');

await mkdir(OUT, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: PREVIEW_STAGE.wideWidth + 200, height: PREVIEW_STAGE.height + 200}, deviceScaleFactor: PREVIEW_STAGE.scale});
let done = 0;
for (const slug of PREVIEW_SLUGS) {
  if (ONLY && !ONLY.includes(slug)) continue;
  await page.goto(`${BASE}/apercu/${slug}`, {waitUntil: 'networkidle'});
  // Next's dev overlay (issue badge) must not end up in the capture
  await page.addStyleTag({content: 'nextjs-portal { display: none !important; }'});
  const box = page.locator('[data-apercu]');
  // ready: fonts and images loaded, component fitted
  const ready = await page.locator('[data-apercu][data-ready]').waitFor({timeout: 30000}).then(() => true, () => false);
  await page.waitForTimeout(300);
  const size = await box.boundingBox();
  const expected = WIDE_PREVIEWS.has(slug) ? PREVIEW_STAGE.wideWidth : PREVIEW_STAGE.width;
  if (!size || Math.round(size.width) !== expected || Math.round(size.height) !== PREVIEW_STAGE.height) throw new Error(`${slug}: stage of ${size?.width} × ${size?.height}, ${expected} × ${PREVIEW_STAGE.height} expected`);
  await box.screenshot({path: path.join(OUT, `${slug}.png`)});
  done += 1;
  console.log(`${slug}.png  ${WIDE_PREVIEWS.has(slug) ? 'wide    ' : 'standard'}  scale ${await box.getAttribute('data-scale')}${ready ? '' : '  (not ready after 30 s)'}`);
}
await browser.close();
console.log(`${done} aperçus écrits dans public/apercus`);

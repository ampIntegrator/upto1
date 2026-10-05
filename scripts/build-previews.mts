/**
 * Screenshots of content blocks for the admin block picker (pnpm previews:build).
 * Captures, headless, the site route /apercu/<slug> (blue silo, light mode, lorem ipsum demo data)
 * and writes public/apercus/<slug>.png: the component alone, edge to edge, at the width its frame
 * gives it (Apercu.tsx), at 2x. Every image has its own proportions; the script prints them.
 * The dev server must be running (pnpm dev).
 *   PREVIEW_BASE: server address (default http://localhost:3000)
 *   PREVIEW_ONLY: comma-separated slugs, to capture only those
 */
import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

import {PREVIEW_SCALE, PREVIEW_SLUGS} from '../src/fields/blocks/previews';

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3000';
const ONLY = process.env.PREVIEW_ONLY?.split(',').filter(Boolean);
const OUT = path.resolve('public/apercus');

await mkdir(OUT, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1280, height: 960}, deviceScaleFactor: PREVIEW_SCALE});
let done = 0;
for (const slug of PREVIEW_SLUGS) {
  if (ONLY && !ONLY.includes(slug)) continue;
  await page.goto(`${BASE}/apercu/${slug}`, {waitUntil: 'networkidle'});
  // Next's dev overlay (issue badge) must not end up in the capture
  await page.addStyleTag({content: 'nextjs-portal { display: none !important; }'});
  const box = page.locator('[data-apercu]');
  // ready: fonts and images loaded
  const ready = await page.locator('[data-apercu][data-ready]').waitFor({timeout: 30000}).then(() => true, () => false);
  await page.waitForTimeout(300);
  const size = await box.boundingBox();
  if (!size) throw new Error(`${slug}: no frame to capture`);
  await box.screenshot({path: path.join(OUT, `${slug}.png`)});
  done += 1;
  console.log(`${slug}.png  ${Math.round(size.width)} × ${Math.round(size.height)}  ratio ${(size.width / size.height).toFixed(2)}${ready ? '' : '  (not ready after 30 s)'}`);
}
await browser.close();
console.log(`${done} aperçus écrits dans public/apercus`);

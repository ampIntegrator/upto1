/**
 * Captures des blocs de contenu pour le sélecteur de blocs de l'admin (pnpm previews:build).
 * Photographie, en headless, la route /apercu/<slug> du site (silo bleu, données de démo) et
 * écrit public/apercus/<slug>.png en 2x. Le serveur de dev doit tourner (pnpm dev).
 *   PREVIEW_BASE : adresse du serveur (défaut http://localhost:3000)
 */
import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

import {CARD_SLUGS} from '../src/fields/sections/cardBlocks';
import {EMPTY_SLUG} from '../src/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '../src/fields/sections/mediaBlock';

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:3000';
const OUT = path.resolve('public/apercus');

await mkdir(OUT, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 800, height: 900}, deviceScaleFactor: 2});
let done = 0;
for (const slug of [EMPTY_SLUG, MEDIA_SLUG, ...CARD_SLUGS]) {
  await page.goto(`${BASE}/apercu/${slug}`, {waitUntil: 'networkidle'});
  const box = page.locator('[data-apercu]');
  await box.waitFor({timeout: 60000});
  await page.waitForTimeout(300);
  await box.screenshot({path: path.join(OUT, `${slug}.png`)});
  done += 1;
  console.log(`${slug}.png`);
}
await browser.close();
console.log(`${done} aperçus écrits dans public/apercus`);

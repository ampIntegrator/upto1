/**
 * Screenshots of the section manager's « Contenu » panel, one per column block (pnpm shots:content):
 * to review how each block's fields are laid out after a change of the grid (ColumnContent.tsx) or
 * of a block's fields. A throwaway page and a throwaway admin user, both deleted at the end; never
 * touches a real page. The dev server must be running (pnpm dev).
 *   SHOTS_OUT: folder for the PNGs (required)   SHOTS_WIDTH: window width (default 1920)
 *   SHOTS_ONLY: comma-separated block slugs, to capture only those
 */
import config from '@payload-config';
import {randomBytes} from 'node:crypto';
import {mkdirSync} from 'node:fs';
import {getPayload} from 'payload';

const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000';
const OUT = process.env.SHOTS_OUT;
const WIDTH = Number(process.env.SHOTS_WIDTH ?? 1920);
const ONLY = process.env.SHOTS_ONLY?.split(',').filter(Boolean);
const stamp = Date.now();
/** widths of the first column of the three rows: every block fits one of them */
const SPANS = ['12', '6', '4'];

async function main() {
  if (!OUT) throw new Error('SHOTS_OUT: the folder for the screenshots is required');
  mkdirSync(OUT, {recursive: true});
  const payload = await getPayload({config});
  const email = `zz-shots-${stamp}@example.test`;
  const password = randomBytes(12).toString('hex');
  const user = await payload.create({collection: 'users', data: {email, password, name: 'ZZ shots'} as never});
  let page: {id: number} | undefined;
  const {chromium} = await import('@playwright/test');
  const browser = await chromium.launch();
  try {
    const col = (span: string) => ({span, contents: []});
    const section = {blockType: 'section', mode: 'light', tint: 'light', texture: 'grid', rows: [{columns: [col('12')]}, {columns: [col('6'), col('6')]}, {columns: [col('4'), col('4'), col('4')]}]};
    page = (await payload.create({collection: 'pages', data: {title: 'ZZ shots', slug: `zz-shots-${stamp}`, hero: {variant: 'page-glow', title: 'Shots'}, sections: [section]} as never})) as {id: number};
    const ctx = await browser.newContext({viewport: {width: WIDTH, height: 1000}});
    const p = await ctx.newPage();
    await p.request.post(`${BASE}/api/users/login`, {data: {email, password}});
    await p.goto(`${BASE}/admin/collections/pages/${page.id}`, {waitUntil: 'networkidle'});
    await p.getByText('Contenu', {exact: true}).first().click();
    const toggle = p.locator('.blocks-field__rows .collapsible__toggle').first();
    if (await toggle.count()) await toggle.click();
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
    await p.locator('.section-preview__frame').waitFor();
    const tab = (key: string) => p.locator(`.section-manager__tab[aria-controls="section-manager-panel-${key}"]`).click();
    await tab('layout');
    await p.waitForTimeout(800);
    const squares = p.locator('.rows-builder__square');
    const picker = p.locator('.section-manager__picker-box');
    // what each row's first column accepts, read from the picker of an empty column
    const offered: string[][] = [];
    for (let row = 0; row < SPANS.length; row += 1) {
      await squares.nth(row).locator('.rows-builder__mini').first().dblclick();
      await picker.waitFor({timeout: 5000});
      offered.push(await picker.locator('.block-library__block').evaluateAll((els) => els.map((el) => el.getAttribute('data-block') ?? '')));
      await picker.getByRole('button', {name: /^(Fermer|Close)$/}).click();
      await p.waitForTimeout(300);
    }
    const slugs = [...new Set(offered.flat())].filter((s) => !ONLY || ONLY.includes(s));
    for (const slug of slugs) {
      const row = offered.findIndex((list) => list.includes(slug));
      await tab('layout');
      await p.waitForTimeout(400);
      await squares.nth(row).locator('.rows-builder__mini').first().dblclick();
      await picker.waitFor({timeout: 5000});
      await picker.locator(`.block-library__block[data-block="${slug}"]`).click();
      await p.waitForTimeout(900);
      await squares.nth(row).locator('.rows-builder__mini').first().dblclick();
      await p.waitForTimeout(1200);
      const m = await p.evaluate(() => {
        const el = document.querySelector('#section-manager-panel-content') as HTMLElement;
        const cells = [...el.querySelectorAll<HTMLElement>('.column-content__cell')].filter((c) => c.offsetWidth > 0);
        return {scrollX: el.scrollWidth - el.clientWidth, scrollY: el.scrollHeight - el.clientHeight, cells: cells.length, scrollingCells: cells.filter((c) => c.scrollHeight > c.clientHeight + 1).length};
      });
      console.log(`${slug.padEnd(16)} span ${SPANS[row].padEnd(2)} ${JSON.stringify(m)}`);
      const top = (await p.locator('.section-manager__panels').boundingBox())!;
      await p.screenshot({path: `${OUT}/${slug}.png`, clip: {x: 0, y: top.y, width: WIDTH, height: top.height + 8}});
      await p.locator('#section-manager-panel-content').getByRole('button', {name: /Vider la colonne|Empty the column/}).click();
      await p.waitForTimeout(500);
    }
  } finally {
    await browser.close();
    await payload.delete({collection: 'payload-locked-documents', where: {'user.value': {equals: user.id}}});
    await payload.delete({collection: 'payload-preferences', where: {'user.value': {equals: user.id}}});
    if (page) await payload.delete({collection: 'pages', id: page.id});
    await payload.delete({collection: 'users', id: user.id});
  }
  process.exit(0);
}

main();

/**
 * Smoke test of the « Gérer » dialog and its live preview (pnpm smoke:manager): a throwaway page
 * and a throwaway admin user, both deleted at the end (with their locks and preferences). Never
 * touches a real page. The dev server must be running (pnpm dev).
 *   SMOKE_BASE: server address (default http://localhost:3000)
 *   SMOKE_SHOTS: a folder for screenshots of the dialog (optional)
 */
import config from '@payload-config';
import {randomBytes} from 'node:crypto';
import {getPayload} from 'payload';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const SHOTS = process.env.SMOKE_SHOTS;
const stamp = Date.now();
const TITLE = 'Un titre d’essai';
const EDITED = 'Titre modifié en direct';

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };

  const email = `zz-manager-${stamp}@example.test`;
  const password = randomBytes(12).toString('hex');
  const user = await payload.create({collection: 'users', data: {email, password, name: 'ZZ smoke'} as never});
  const section = {blockType: 'section', mode: 'light', tint: 'light', texture: 'grid', rows: [{columns: [{span: '6', contents: [{blockType: 'textBox', title: TITLE, titleTag: 'h2'}]}, {span: '6', contents: []}]}]};
  const page = await payload.create({collection: 'pages', data: {title: 'ZZ smoke Gérer', slug: `zz-smoke-manager-${stamp}`, hero: {variant: 'page-glow', title: 'Smoke'}, sections: [section, {blockType: 'section', mode: 'light', tint: 'light', texture: 'dots', rows: []}]} as never});
  const {chromium} = await import('@playwright/test');
  const browser = await chromium.launch();
  try {
    // 1 · unsaved values are populated by the read operation (an image given as an ID comes back as a document)
    const media = (await payload.find({collection: 'media', limit: 1, depth: 0})).docs[0];
    if (media) {
      const data = {sections: [{...section, rows: [{columns: [{span: '12', contents: [{blockType: 'media', image: media.id}]}]}]}]};
      const doc = (await payload.findByID({collection: 'pages', id: page.id, data: data as never, depth: 2})) as unknown as {sections: {rows: {columns: {contents: {image: unknown}[]}[]}[]}[]};
      const image = doc.sections[0]?.rows[0]?.columns[0]?.contents[0]?.image as {url?: string} | number;
      check(typeof image === 'object' && Boolean(image?.url), 'an unsaved image ID is populated with its file');
    } else log('--  no media in the library: population not checked');

    // 2 · the preview page gives nothing to a visitor
    const anonymous = await (await fetch(`${BASE}/apercu-section?frame=smoke-${stamp}`)).text();
    check(anonymous.includes('Aperçu réservé') && !anonymous.includes(TITLE), 'the preview page is closed to visitors');

    // 3 · the dialog, in the admin
    const ctx = await browser.newContext({viewport: {width: 1600, height: 1000}});
    const p = await ctx.newPage();
    const errors: string[] = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.request.post(`${BASE}/api/users/login`, {data: {email, password}});
    await p.goto(`${BASE}/admin/collections/pages/${page.id}`, {waitUntil: 'networkidle'});
    await p.getByText('Contenu', {exact: true}).first().click();
    const toggle = p.locator('.blocks-field__rows .collapsible__toggle').first();
    if (await toggle.count()) await toggle.click();
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
    const frame = p.frameLocator('.section-preview__frame');
    await frame.getByText(TITLE).waitFor({timeout: 20000});
    check(true, 'the dialog opens and the preview shows the section');

    const heights = await p.evaluate(() => ({panels: document.querySelector('.section-manager__panels')?.clientHeight ?? 0, preview: document.querySelector('.section-preview')?.clientHeight ?? 0, total: window.innerHeight}));
    check(heights.panels + heights.preview < heights.total && heights.preview > heights.panels, `settings above (${heights.panels}), a taller preview below (${heights.preview}), inside the screen (${heights.total})`);

    const background = () => frame.locator('section').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    const before = await background();
    await p.getByText('Highlight clair', {exact: true}).click();
    await p.waitForTimeout(3000);
    check((await background()) !== before, 'a new shade shows in the preview without saving');

    await p.getByRole('radio', {name: /Mobile/}).click();
    await p.waitForTimeout(500);
    check((await p.locator('.section-preview__frame').evaluate((el) => (el as HTMLElement).style.width)) === '390px', 'the width switch sets the frame to 390');

    // a cell's drawer opens above the dialog; what is typed there reaches the preview
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    await p.getByText('Encart texte', {exact: true}).first().click();
    await p.waitForTimeout(300);
    await p.getByText('Encart texte', {exact: true}).first().click();
    const title = p.locator('.drawer input[name$="title"]').first();
    await title.waitFor({timeout: 10000});
    await title.fill(EDITED);
    await frame.getByText(EDITED).waitFor({timeout: 10000});
    check(true, 'a title typed in the column drawer shows in the preview');
    await p.keyboard.press('Escape');
    await p.waitForTimeout(500);
    check(await p.locator('.section-manager__body').isVisible(), 'closing the drawer keeps the dialog open');

    const stored = JSON.stringify((await payload.findByID({collection: 'pages', id: page.id, depth: 0})).sections);
    check(stored.includes(TITLE) && !stored.includes(EDITED), 'nothing was saved by the preview');

    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    await p.waitForTimeout(500);
    check(!(await p.locator('.section-manager__body').isVisible()), 'the dialog closes');
    // a section without content: its background, its paddings and a dashed zone for the columns, nothing else
    await p.locator('.blocks-field__rows .collapsible__toggle').nth(1).click();
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).nth(1).click();
    const blank = p.frameLocator('.section-preview__frame');
    await blank.getByText('Colonnes', {exact: true}).waitFor({timeout: 20000});
    await p.getByRole('radio', {name: /Ordinateur|Desktop/}).click();
    await p.waitForTimeout(1000);
    const fit = await p.evaluate(() => {
      const iframe = document.querySelector('.section-preview__frame') as HTMLIFrameElement;
      const sectionEl = iframe.contentDocument?.querySelector('section');
      return {frame: iframe.clientHeight, section: Math.ceil(sectionEl?.getBoundingClientRect().height ?? 0), composerBox: document.querySelectorAll('.background-composer [aria-hidden="true"]').length};
    });
    check(fit.section > 0 && fit.frame === fit.section, `the frame is exactly as tall as the section (${fit.frame} / ${fit.section})`);
    check(fit.composerBox === 0, 'no background preview box in the settings');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-blank.png`});
    await p.getByText(/^(Nuit|Night)$/).first().click();
    await p.waitForTimeout(2500);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-blank-night.png`});
    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    check(errors.length === 0, `no page error${errors.length ? `: ${errors[0]}` : ''}`);
  } finally {
    await browser.close();
    await payload.delete({collection: 'payload-locked-documents', where: {'user.value': {equals: user.id}}});
    await payload.delete({collection: 'payload-preferences', where: {'user.value': {equals: user.id}}});
    await payload.delete({collection: 'pages', id: page.id});
    await payload.delete({collection: 'users', id: user.id});
  }
  log(failures ? `${failures} check(s) failed` : 'All checks passed');
  process.exit(failures ? 1 : 0);
}

main();

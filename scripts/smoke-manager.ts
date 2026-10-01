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
const SECOND = 'Deuxième rangée';

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
  const section = {blockType: 'section', mode: 'light', tint: 'light', texture: 'grid', rows: [{columns: [{span: '6', contents: [{blockType: 'textBox', title: TITLE, titleTag: 'h2'}]}, {span: '6', contents: []}]}, {columns: [{span: '6', contents: [{blockType: 'textBox', title: SECOND, titleTag: 'h2'}]}, {span: '6', contents: []}]}]};
  let page: {id: number} | undefined;
  const {chromium} = await import('@playwright/test');
  const browser = await chromium.launch();
  try {
    page = (await payload.create({collection: 'pages', data: {title: 'ZZ smoke Gérer', slug: `zz-smoke-manager-${stamp}`, hero: {variant: 'page-glow', title: 'Smoke'}, sections: [section, {blockType: 'section', mode: 'light', tint: 'light', texture: 'dots', rows: []}]} as never})) as {id: number};
    const pageId = page.id;
    // 1 · unsaved values are populated by the read operation (an image given as an ID comes back as a document)
    const media = (await payload.find({collection: 'media', limit: 1, depth: 0})).docs[0];
    if (media) {
      const data = {sections: [{...section, rows: [{columns: [{span: '12', contents: [{blockType: 'media', image: media.id}]}]}]}]};
      const doc = (await payload.findByID({collection: 'pages', id: pageId, data: data as never, depth: 2})) as unknown as {sections: {rows: {columns: {contents: {image: unknown}[]}[]}[]}[]};
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
    await p.goto(`${BASE}/admin/collections/pages/${pageId}`, {waitUntil: 'networkidle'});
    await p.getByText('Contenu', {exact: true}).first().click();
    const toggle = p.locator('.blocks-field__rows .collapsible__toggle').first();
    if (await toggle.count()) await toggle.click();
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().waitFor();
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-form.png`});
    // Payload renders a field once it is on screen: wait for it
    check(await p.locator('input[name="sections.0.anchor"]').waitFor({timeout: 5000}).then(() => true, () => false), 'the anchor is in the page form, at the section level');
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
    const frame = p.frameLocator('.section-preview__frame');
    await frame.getByText(TITLE).waitFor({timeout: 20000});
    check(true, 'the dialog opens and the preview shows the section');

    const heights = await p.evaluate(() => ({panels: document.querySelector('.section-manager__panels')?.clientHeight ?? 0, preview: document.querySelector('.section-preview')?.clientHeight ?? 0, total: window.innerHeight}));
    check(heights.panels + heights.preview < heights.total && heights.preview > heights.panels, `settings above (${heights.panels}), a taller preview below (${heights.preview}), inside the screen (${heights.total})`);

    const top = await p.evaluate(() => {
      const el = document.querySelector('.section-manager__panel--open .section-manager__content') as HTMLElement;
      return {scroll: el.scrollHeight, height: el.clientHeight, groups: [...document.querySelectorAll('.section-manager__group')].filter((g) => (g as HTMLElement).offsetWidth > 0).length, anchor: el.querySelectorAll('input[name$=".anchor"]').length};
    });
    check(Math.abs(heights.panels / heights.total - 0.35) < 0.01, 'the settings take 35 % of the screen');
    check(top.scroll <= top.height, `the settings fit without vertical scroll (${top.scroll} / ${top.height}), in ${top.groups} columns`);
    check(top.anchor === 0, 'no anchor field in the dialog');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-settings.png`});

    const background = () => frame.locator('section').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    const before = await background();
    await p.getByText('Highlight clair', {exact: true}).click();
    await p.waitForTimeout(3000);
    check((await background()) !== before, 'a new shade shows in the preview without saving');

    // the handle between the settings and the preview
    const panelsHeight = () => p.evaluate(() => (document.querySelector('.section-manager__panels') as HTMLElement).offsetHeight);
    const handle = (await p.locator('.section-manager__handle').boundingBox())!;
    const startHeight = await panelsHeight();
    await p.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
    await p.mouse.down();
    await p.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2 + 150, {steps: 5});
    await p.mouse.up();
    const dragged = await panelsHeight();
    check(Math.abs(dragged - startHeight - 150) <= 2, `dragging the handle 150 down makes the settings taller (${startHeight} → ${dragged})`);
    await p.locator('.section-manager__handle').dblclick();
    await p.waitForTimeout(200);
    check(Math.abs((await panelsHeight()) - startHeight) <= 2, 'a double click on the handle restores the original height');

    // first section of the page: « always » shows the edge line in the preview all the same
    await p.getByText(/^(Toujours|Always)$/).first().click();
    await frame.locator('section[data-edge-top]').waitFor({timeout: 10000});
    check(true, 'edge line « always » shows on a first section too');

    await p.getByRole('radio', {name: /Mobile/}).click();
    await p.waitForTimeout(500);
    check((await p.locator('.section-preview__frame').evaluate((el) => (el as HTMLElement).style.width)) === '420px', 'the width switch sets the frame to 420');

    // a cell's drawer opens above the dialog; what is typed there reaches the preview
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    // the rows: a line of squares, three buttons on hover, no mobile order button, no full-size cells
    await p.waitForTimeout(600); // the panel has finished sliding open
    const squares = p.locator('.rows-builder__square');
    check((await squares.count()) === 2, 'the two rows show as two squares');
    await p.mouse.move(5, 5);
    const shape = await squares.first().evaluate((el) => ({width: (el as HTMLElement).offsetWidth, opacity: getComputedStyle(el.querySelector('.rows-builder__actions')!).opacity, buttons: el.querySelectorAll('.rows-builder__actions button').length}));
    check(shape.width === 240 && shape.opacity === '1' && shape.buttons === 3, `a square is 240 wide and its three buttons are always visible (${shape.width})`);
    // a column dragged sideways inside its square changes place in the row (filled | empty → empty | filled)
    const minis = squares.nth(0).locator('.rows-builder__mini');
    const m0 = (await minis.nth(0).boundingBox())!;
    const m1 = (await minis.nth(1).boundingBox())!;
    await p.mouse.move(m0.x + m0.width / 2, m0.y + m0.height / 2);
    await p.mouse.down();
    await p.mouse.move(m1.x + m1.width / 2 + 10, m0.y + m0.height / 2, {steps: 10});
    await p.mouse.up();
    await p.waitForTimeout(600);
    check((await minis.nth(0).getAttribute('data-empty')) === 'true' && (await minis.nth(1).getAttribute('data-empty')) === null && (await squares.count()) === 2, `dragging a column sideways in its square swaps the columns, the rows stay in place (${await minis.nth(0).getAttribute('data-empty')} / ${await minis.nth(1).getAttribute('data-empty')} / ${await squares.count()})`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-columns.png`});
    check((await p.locator('.rows-builder [aria-label*="mobile" i]').count()) === 0, 'no mobile order button');
    // drag the first square to the right: the rows swap, in the preview too
    const titles = () => frame.locator('h2').allInnerTexts();
    const a = (await squares.nth(0).boundingBox())!;
    const b = (await squares.nth(1).boundingBox())!;
    await p.mouse.move(a.x + a.width / 2, a.y + a.height - 6);
    await p.mouse.down();
    await p.mouse.move(b.x + b.width / 2 + 20, a.y + a.height - 6, {steps: 12});
    await p.mouse.up();
    await p.waitForTimeout(3000);
    check((await titles())[0] === SECOND, `dragging a square sideways reorders the rows in the preview (${(await titles()).join(' / ')})`);
    // duplicate, then delete (after confirmation)
    await squares.nth(0).hover();
    await squares.nth(0).getByRole('button', {name: /Dupliquer|Duplicate/}).click();
    await p.waitForTimeout(500);
    check((await squares.count()) === 3, 'duplicate adds a square');
    await squares.nth(1).hover();
    await squares.nth(1).getByRole('button', {name: /Supprimer|Delete/}).click();
    await p.locator('.confirmation-modal').getByRole('button', {name: /^(Supprimer|Delete)$/}).click();
    await p.waitForTimeout(500);
    check((await squares.count()) === 2, 'delete removes a square, after confirmation');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-layout.png`});
    // a click selects the square, a click on one of its columns opens the column's drawer
    await squares.nth(1).locator('.rows-builder__mini:not([data-empty])').first().click();
    await p.waitForTimeout(300);
    await squares.nth(1).locator('.rows-builder__mini:not([data-empty])').first().click();
    const title = p.locator('.drawer input[name$="title"]').first();
    await title.waitFor({timeout: 10000});
    await title.fill(EDITED);
    await frame.getByText(EDITED).waitFor({timeout: 10000});
    check(true, 'a title typed in the column drawer shows in the preview');
    await p.keyboard.press('Escape');
    await p.waitForTimeout(500);
    check(await p.locator('.section-manager__body').isVisible(), 'closing the drawer keeps the dialog open');

    const stored = JSON.stringify((await payload.findByID({collection: 'pages', id: pageId, depth: 0})).sections);
    check(stored.includes(TITLE) && !stored.includes(EDITED), 'nothing was saved by the preview');

    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    await p.waitForTimeout(500);
    check(!(await p.locator('.section-manager__body').isVisible()), 'the dialog closes');
    // a section without content: its background, its paddings and a dashed zone for the columns, nothing else
    await p.locator('.blocks-field__rows .collapsible__toggle').nth(1).click();
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).nth(1).click();
    const blank = p.frameLocator('.section-preview__frame');
    await blank.getByText('Colonnes', {exact: true}).waitFor({timeout: 20000});
    await p.getByRole('radio', {name: /Pleine largeur|Full width/}).click();
    await p.waitForTimeout(1000);
    const full = await p.evaluate(() => {
      const stage = document.querySelector('.section-preview__stage') as HTMLElement;
      const sizer = document.querySelector('.section-preview__sizer') as HTMLElement;
      const a = stage.getBoundingClientRect();
      const b = sizer.getBoundingClientRect();
      return {stage: stage.clientWidth, frame: (document.querySelector('.section-preview__frame') as HTMLElement).clientWidth, above: Math.round(b.top - a.top), below: Math.round(a.bottom - b.bottom)};
    });
    check(full.frame === full.stage, `full width: the frame is as wide as the panel (${full.frame})`);
    check(Math.abs(full.above - full.below) <= 2 && full.above > 0, `the section is centred vertically in the panel (${full.above} above, ${full.below} below)`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-full.png`});
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
    // the edge line, automatic: it depends on the section above as it is in the form (« highlight » shade
    // since the check above, grid texture); this one has dots: no line while the shades differ, a line once they match
    const edge = () => blank.locator('section[data-edge-top]').count();
    check((await edge()) === 0, 'automatic edge line: none while the section above has another shade');
    await p.getByText('Highlight clair', {exact: true}).click();
    await p.waitForTimeout(2500);
    check((await edge()) === 1, 'automatic edge line: shown once the shade matches the section above (textures differ)');
    await p.getByText(/^(Jamais|Never)$/).first().click();
    await p.waitForTimeout(2500);
    check((await edge()) === 0, 'edge line « never »: gone from the preview');
    await p.getByText(/^(Toujours|Always)$/).first().click();
    await p.waitForTimeout(2500);
    check((await edge()) === 1, 'edge line « always »: back in the preview');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-edge.png`});

    // the page's silo, in the dialog's header
    const swatches = p.locator('.section-manager__fields [role="radio"]');
    check((await swatches.count()) === 6, 'the six silos are in the header');
    const tintOf = () => blank.locator('section').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    const tintBefore = await tintOf();
    await swatches.nth(2).click();
    await p.waitForTimeout(2500);
    check((await tintOf()) !== tintBefore, 'another silo chosen in the header shows in the preview');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-silo.png`});

    // the accordions slide: a panel is part-way open shortly after the click
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    await p.waitForTimeout(120);
    const mid = await p.evaluate(() => (document.querySelectorAll('.section-manager__panel')[1] as HTMLElement).offsetWidth);
    await p.waitForTimeout(500);
    const end = await p.evaluate(() => (document.querySelectorAll('.section-manager__panel')[1] as HTMLElement).offsetWidth);
    check(mid > 60 && mid < end, `the panel slides open (${mid} then ${end})`);
    await p.getByRole('button', {name: /Fond et espaces|Background/}).click();
    await p.waitForTimeout(500);

    await p.getByText(/^(Nuit|Night)$/).first().click();
    await p.waitForTimeout(2500);
    const night = await p.evaluate(() => {
      const el = document.querySelector('.section-manager__panel--open .section-manager__content') as HTMLElement;
      return {text: el.innerText, swatches: el.querySelectorAll('.swatch-radio').length, scroll: el.scrollHeight, height: el.clientHeight, groups: [...el.querySelectorAll('.section-manager__group')].filter((g) => (g as HTMLElement).offsetWidth > 0).length};
    });
    check(night.swatches === 0 && /Nuit halo|Night halo|halo/i.test(night.text), 'night shades are offered by name, without swatches');
    check(night.groups === 3 && night.scroll <= night.height, `night: background, spacing and gaps, no vertical scroll (${night.scroll} / ${night.height})`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-blank-night.png`});
    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    check(errors.length === 0, `no page error${errors.length ? `: ${errors[0]}` : ''}`);
  } finally {
    await browser.close();
    await payload.delete({collection: 'payload-locked-documents', where: {'user.value': {equals: user.id}}});
    await payload.delete({collection: 'payload-preferences', where: {'user.value': {equals: user.id}}});
    if (page) await payload.delete({collection: 'pages', id: page.id});
    await payload.delete({collection: 'users', id: user.id});
  }
  log(failures ? `${failures} check(s) failed` : 'All checks passed');
  process.exit(failures ? 1 : 0);
}

main();

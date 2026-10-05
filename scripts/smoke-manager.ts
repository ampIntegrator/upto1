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

import {textBoxBlock} from '@/fields/blocks/textBoxBlock';

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
  const section = {blockType: 'section', mode: 'light', tint: 'light', texture: 'grid', rows: [{columns: [{span: '7', contents: [{blockType: 'textBox', title: TITLE, titleTag: 'h2'}]}, {span: '5', contents: []}]}, {name: 'Rangée nommée', columns: [{span: '7', contents: [{blockType: 'textBox', title: SECOND, titleTag: 'h2'}]}, {span: '5', contents: []}]}]};
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

    // the placeholder values a block starts with are valid stored values (a text box and its rich text)
    const sampled = await payload.update({collection: 'pages', id: pageId, data: {sections: [section, {blockType: 'section', mode: 'light', tint: 'light', texture: 'dots', rows: [{columns: [{span: '6', contents: [{blockType: 'textBox', ...textBoxBlock.sample}]}, {span: '6', contents: []}]}]}]} as never}).then(() => true, () => false);
    check(sampled, 'a block saved with its placeholder values is accepted');
    await payload.update({collection: 'pages', id: pageId, data: {sections: [section, {blockType: 'section', mode: 'light', tint: 'light', texture: 'dots', rows: []}]} as never});

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
    // the top part is as tall as the layout panel's content: the thumbnails, the squares, nothing below
    const fitted = await p.evaluate(() => {
      const el = document.querySelector('#section-manager-panel-layout') as HTMLElement;
      const style = getComputedStyle(el);
      const squares = el.querySelector('.rows-builder__rows') as HTMLElement;
      return {content: Math.ceil((el.firstElementChild as HTMLElement).offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)), below: Math.round(el.getBoundingClientRect().bottom - squares.getBoundingClientRect().bottom - parseFloat(style.paddingBottom)), pad: Math.round((document.querySelector('.section-manager__panels') as HTMLElement).getBoundingClientRect().bottom - squares.getBoundingClientRect().bottom)};
    });
    check(heights.panels === 280 && fitted.content <= 280 && fitted.pad >= 15, `the top part is 280 px high and the layout panel fits in it: thumbnails, squares, ${fitted.pad} px under them (content ${fitted.content})`);
    const centred = await p.evaluate(() => {
      const group = document.querySelector('#section-manager-panel-settings .section-manager__group') as HTMLElement;
      const inner = group.firstElementChild as HTMLElement;
      const a = group.getBoundingClientRect();
      const b = inner.getBoundingClientRect();
      return {above: Math.round(b.top - a.top), below: Math.round(a.bottom - b.bottom)};
    });
    const help = await p.evaluate(() => {
      const builder = document.querySelector('#section-manager-panel-layout .rows-builder') as HTMLElement;
      return {texts: builder.querySelectorAll(':scope > p').length, bubbles: builder.querySelectorAll('.info-bubble').length, hidden: document.querySelectorAll('.info-bubble__text').length === 0};
    });
    check(help.texts === 0 && help.bubbles === 1 && help.hidden, `the layout panel has no line of help: its instructions wait in an « i » bubble (${help.texts} text, ${help.bubbles} bubble)`);
    const groupHelps = await p.evaluate(() => {
      const panel = document.querySelector('#section-manager-panel-settings') as HTMLElement;
      const shown = [...panel.querySelectorAll('.section-manager__group')].filter((g) => (g as HTMLElement).offsetWidth > 0);
      return {groups: shown.length, bubbles: shown.filter((g) => g.querySelector('.render-fields > :first-child .info-bubble, p .info-bubble')).length, lines: [...panel.querySelectorAll('.field-description')].filter((el) => getComputedStyle(el).opacity !== '0').length};
    });
    check(groupHelps.groups > 0 && groupHelps.bubbles === groupHelps.groups && groupHelps.lines === 0, `every group of settings has an « i » beside its title, and no line of help under a field (${groupHelps.bubbles} / ${groupHelps.groups})`);
    check(Math.abs(centred.above - centred.below) <= 1, `the settings are centred in the panel's height (${centred.above} above, ${centred.below} below)`);
    check(top.scroll <= top.height, `the settings fit without vertical scroll (${top.scroll} / ${top.height}), in ${top.groups} columns`);
    check(top.anchor === 0, 'no anchor field in the dialog');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-settings.png`});
    const groupHelp = p.locator('#section-manager-panel-settings .info-bubble__button').nth(2);
    await groupHelp.hover();
    await p.waitForTimeout(300);
    const bubbleOf = (button: typeof groupHelp) => button.evaluate((el) => {
      const bubble = document.getElementById(el.getAttribute('aria-describedby') ?? '-');
      if (!bubble) return {visible: false, inside: false};
      const box = bubble.getBoundingClientRect();
      return {visible: getComputedStyle(bubble).visibility === 'visible', inside: box.left >= 0 && box.top >= 0 && box.right <= window.innerWidth && box.bottom <= window.innerHeight};
    });
    const groupBubble = await bubbleOf(groupHelp);
    check(groupBubble.visible && groupBubble.inside, 'the « i » of a group of settings shows its help on hover, whole');
    await p.mouse.move(0, 0);
    await groupHelp.focus();
    await p.keyboard.press('Tab');
    await p.keyboard.press('Shift+Tab');
    await p.waitForTimeout(200);
    const focusedBubble = await bubbleOf(groupHelp);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(300);
    check(focusedBubble.visible && !(await bubbleOf(groupHelp)).visible && (await p.locator('.section-manager__panels').count()) === 1, 'at the keyboard the « i » shows its help, and Escape closes the bubble, not the dialog');
    await groupHelp.hover();
    await p.waitForTimeout(300);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-settings-help.png`});
    await p.mouse.move(0, 0);
    await p.mouse.move(0, 0);

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
    // only the handle changes the height: it can also make the top part shorter
    const up = (await p.locator('.section-manager__handle').boundingBox())!;
    await p.mouse.move(up.x + up.width / 2, up.y + up.height / 2);
    await p.mouse.down();
    await p.mouse.move(up.x + up.width / 2, up.y + up.height / 2 - 50, {steps: 5});
    await p.mouse.up();
    await p.waitForTimeout(200);
    check(Math.abs((await panelsHeight()) - (startHeight - 50)) <= 2, `dragging the handle 50 up makes the settings shorter (${startHeight} → ${await panelsHeight()})`);
    await p.locator('.section-manager__handle').dblclick();
    await p.waitForTimeout(200);

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
    const shape = await squares.first().evaluate((el) => ({width: (el as HTMLElement).offsetWidth, height: (el as HTMLElement).offsetHeight, opacity: getComputedStyle(el.querySelector('.rows-builder__actions')!).opacity, buttons: el.querySelectorAll('.rows-builder__actions button').length}));
    const miniHeight = await squares.first().locator('.rows-builder__mini').first().evaluate((el) => (el as HTMLElement).offsetHeight);
    check(miniHeight === 72, `a column in a square is 72 px high (${miniHeight})`);
    check(shape.width === 260 && shape.height === 126 && shape.opacity === '1' && shape.buttons === 3, `a square is 260 by 126 and its three buttons are always visible (${shape.width} × ${shape.height})`);
    // the square's number is its name: a click, a name of 22 characters at most
    const nameOf = () => squares.nth(0).locator('.rows-builder__square-name').innerText();
    check((await nameOf()) === '1', 'a square is named by its number at first');
    check((await squares.nth(1).locator('.rows-builder__square-name').innerText()) === 'Rangée nommée', 'a name stored with the row shows on its square');
    await squares.nth(0).locator('.rows-builder__square-name').click();
    const nameInput = squares.nth(0).locator('.rows-builder__square-input');
    await nameInput.fill('Un nom vraiment beaucoup trop long');
    const typing = await squares.nth(0).evaluate((el) => ({width: (el as HTMLElement).offsetWidth, height: (el as HTMLElement).offsetHeight, input: (el.querySelector('.rows-builder__square-input') as HTMLElement).offsetHeight}));
    check(typing.width === 260 && typing.height === 126 && typing.input === 28, `the square keeps its size while its name is typed (${typing.width} × ${typing.height}, input ${typing.input})`);
    check((await nameInput.inputValue()).length === 22, 'the name stops at 22 characters');
    await nameInput.fill('Bandeau du haut');
    await nameInput.press('Enter');
    check((await nameOf()) === 'Bandeau du haut', 'the name typed replaces the number');
    const line = await p.locator('.rows-builder__rows').evaluate((el) => ({x: getComputedStyle(el).overflowX, wrap: getComputedStyle(el).flexWrap}));
    check(line.x === 'auto' && line.wrap === 'nowrap', 'the line of squares scrolls sideways rather than wrapping');

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
    // the layouts are dragged onto the line of rows: no click on them any more
    const dragLayout = async (layout: string, x: number, y: number, during?: () => Promise<void>) => {
      const from = (await p.locator(`#section-manager-panel-layout .rows-builder__tile[data-layout="${layout}"]`).first().boundingBox())!;
      await p.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
      await p.mouse.down();
      await p.mouse.move(from.x + from.width / 2 + 8, from.y + from.height / 2 + 12, {steps: 3});
      await p.mouse.move(x, y, {steps: 10});
      await p.mouse.move(x + 1, y + 1, {steps: 2});
      if (during) await during();
      await p.mouse.up();
      await p.waitForTimeout(600);
    };
    const removeSquare = async (n: number) => {
      await squares.nth(n).getByRole('button', {name: /Supprimer|Delete/}).click();
      await p.locator('.confirmation-modal').getByRole('button', {name: /^(Supprimer|Delete)$/}).click();
      await p.waitForTimeout(500);
    };
    await p.locator('#section-manager-panel-layout .rows-builder__tile[data-layout="12"]').first().click();
    await p.locator('#section-manager-panel-layout .rows-builder__tile[data-layout="12"]').first().dblclick();
    await p.waitForTimeout(400);
    check((await squares.count()) === 2 && !(await p.locator('.confirmation-modal').isVisible()), 'a click or a double click on a layout does nothing');
    const first = (await squares.nth(0).boundingBox())!;
    let marked: string | null = null;
    await dragLayout('12', first.x + 12, first.y + first.height / 2, async () => {
      marked = await squares.nth(0).getAttribute('data-drop');
    });
    check(marked === 'before' && (await squares.count()) === 3 && (await squares.nth(0).locator('.rows-builder__mini').count()) === 1, 'a layout dropped before a square adds a row there');
    await removeSquare(0);
    const target = (await squares.nth(0).boundingBox())!;
    await dragLayout('4-4-4', target.x + target.width / 2, target.y + target.height / 2, async () => {
      marked = await squares.nth(0).getAttribute('data-drop');
    });
    const asked = p.locator('.confirmation-modal');
    check(marked === 'replace' && (await asked.isVisible()), 'a layout dropped on a square asks before replacing its layout');
    await asked.getByRole('button', {name: /^(Annuler|Cancel)$/}).click();
    await p.waitForTimeout(300);
    await p.locator('#section-manager-panel-layout .rows-builder__tile[data-layout="6-6"]').first().focus();
    await p.keyboard.press('Enter');
    await p.waitForTimeout(600);
    check((await squares.count()) === 3 && (await squares.nth(2).locator('.rows-builder__mini').count()) === 2, 'Enter on a layout adds its row at the end');
    await removeSquare(2);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-layout.png`});
    await p.locator('#section-manager-panel-layout .info-bubble__button').hover();
    await p.waitForTimeout(300);
    check((await p.locator('#section-manager-panel-layout .info-bubble__button').evaluate((el) => (document.getElementById(el.getAttribute('aria-describedby') ?? '-')?.textContent ?? '').length > 40)), 'the « i » of the layout panel shows the instructions on hover');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-layout-help.png`});
    await p.mouse.move(0, 0);
    // a click on a column of a square selects it; a double click shows its content in the « Contenu » panel
    await squares.nth(1).locator('.rows-builder__mini:not([data-empty])').first().click();
    await p.waitForTimeout(300);
    check((await p.locator('.section-manager__panel--open #section-manager-panel-layout').count()) === 1 && (await squares.nth(1).locator('.rows-builder__mini[data-current]').count()) === 1, 'a click on a column of a square selects it, without leaving the layout panel');
    await squares.nth(1).locator('.rows-builder__mini:not([data-empty])').first().dblclick();
    const content = p.locator('.column-content');
    const head = () => content.locator('.column-content__head').innerText();
    const title = content.locator('input[name$=".title"]').first();
    await title.waitFor({timeout: 10000});
    check((await p.locator('.section-manager__panel--open #section-manager-panel-content').count()) === 1 && /2 · col\w+ 2/.test(await head()), `a double click on a column of a square opens the content panel on it (${await head()})`);
    await title.fill(EDITED);
    await frame.getByText(EDITED).waitFor({timeout: 10000});
    check(true, 'a title typed in the content panel shows in the preview');

    // in the preview, at desktop width: a text is typed in place
    await p.getByRole('radio', {name: /Ordinateur|Desktop/}).click();
    await p.waitForTimeout(800);
    const heading = frame.getByText(SECOND, {exact: true});
    await heading.click();
    await p.waitForTimeout(400);
    check((await heading.getAttribute('contenteditable')) === 'plaintext-only', 'a click on a title in the preview makes it editable in place');
    // the caret is where the click was: move it to the end, then type
    await heading.evaluate((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    });
    await p.keyboard.type(' bis');
    await p.waitForTimeout(400);
    const typedState = {input: await content.locator('input[name$=".title"]').first().getAttribute('name'), value: await content.locator('input[name$=".title"]').first().inputValue(), shown: await frame.locator('[data-preview-editing]').innerText().catch(() => 'none'), head: await head()};
    check(typedState.value === `${SECOND} bis` && /rows\.0\.columns\.0\./.test(typedState.input ?? ''), `what is typed in the preview is in the form, and the content panel follows the column (${JSON.stringify(typedState)})`);
    await p.keyboard.press('Enter');
    await frame.getByText(`${SECOND} bis`, {exact: true}).waitFor({timeout: 10000});
    check((await frame.locator('[contenteditable]').count()) === 0, 'Enter ends the typing, the preview keeps the text');
    // hovering a column shows a pencil: it opens the content panel on that column; so does a double click
    await p.getByRole('button', {name: /Fond et espaces|Background/}).click();
    await frame.getByText(EDITED).hover();
    await frame.getByRole('button', {name: /Modifier le contenu/}).click();
    await p.waitForTimeout(600);
    check((await p.locator('.section-manager__panel--open #section-manager-panel-content').count()) === 1 && /2 · col\w+ 2/.test(await head()), `the pencil of a column opens the content panel on it (${await head()})`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-content.png`});
    // the selected column is not outlined in the preview (only the hovered one is, lightly)
    await p.mouse.move(5, 5);
    await p.waitForTimeout(300);
    check((await frame.locator('body > i[aria-hidden="true"]').count()) === 0, 'no outline on the selected column in the preview');
    // an empty column shows its width, and no pencil
    await frame.getByText('5 / 12').first().hover();
    await p.waitForTimeout(300);
    check((await frame.getByRole('button', {name: /Modifier le contenu/}).count()) === 0, 'no pencil on a column without content');
    await frame.getByText('5 / 12').first().dblclick();
    await p.waitForTimeout(700);
    // an empty column has no content to edit: the components open instead, and the content panel lists none
    check((await p.locator('.section-manager__panel--open #section-manager-panel-blocks').count()) === 1, 'a double click on an empty column opens the components, not the content panel');
    await p.locator('#section-manager-panel-blocks .block-library__block[data-block="plan"]').click();
    await p.waitForTimeout(500);
    check((await squares.nth(0).locator('.rows-builder__mini').nth(1).getAttribute('data-empty')) === 'true', 'a component that does not fit the selected column is not placed by a click');
    await p.locator('.section-manager__tab[aria-controls="section-manager-panel-content"]').click();
    await p.waitForTimeout(600);
    check((await content.locator('.block-library__block').count()) === 0 && (await content.locator('.column-content__cell').count()) === 0, 'the content panel of an empty column offers no component list');

    const stored = JSON.stringify((await payload.findByID({collection: 'pages', id: pageId, depth: 0})).sections);
    check(stored.includes(TITLE) && !stored.includes(EDITED), 'nothing was saved by the preview');

    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    await p.waitForTimeout(500);
    check(!(await p.locator('.section-manager__body').isVisible()), '« close » closes the dialog, nothing saved');
    // « save and close »: the page is saved, then the dialog closes
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
    // « save »: the page is saved, the dialog stays open
    await p.getByRole('button', {name: /^(Enregistrer|Save)$/}).click();
    await p.waitForTimeout(2500);
    const kept = JSON.stringify((await payload.findByID({collection: 'pages', id: pageId, depth: 0})).sections);
    check(kept.includes(EDITED) && (await p.locator('.section-manager__body').isVisible()), '« save » saves the page and keeps the dialog open');
    await p.getByRole('button', {name: /^(Enregistrer et fermer|Save and close)$/}).click();
    await p.locator('.section-manager__body').waitFor({state: 'hidden', timeout: 15000});
    const saved = JSON.stringify((await payload.findByID({collection: 'pages', id: pageId, depth: 0})).sections);
    check(saved.includes(EDITED) && saved.includes('Bandeau du haut') && saved.includes(`${SECOND} bis`), '« save and close » saves the page (titles, the one typed in the preview, row name) and closes the dialog');
    // the components panel: thumbnails dragged onto the preview's columns
    await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
    await p.locator('.section-preview__frame').waitFor();
    const live = p.frameLocator('.section-preview__frame');
    await live.getByText(EDITED).waitFor({timeout: 20000});
    await p.getByRole('button', {name: /Composants|Components/}).click();
    await p.waitForTimeout(600);
    const thumbs = p.locator('#section-manager-panel-blocks .block-library__block');
    const thumbBoxes = await thumbs.evaluateAll((els) => els.map((el) => el.getBoundingClientRect()).map((r) => ({top: r.top, width: r.width, height: r.height})));
    check(thumbBoxes.length > 10 && thumbBoxes.every((b) => b.height === 220) && new Set(thumbBoxes.map((b) => b.top)).size > 1 && new Set(thumbBoxes.map((b) => Math.round(b.width))).size > 3, `the components show as thumbnails 220 px high, each as wide as its picture, in rows that wrap (${thumbBoxes.length})`);
    const blocksPanel = p.locator('#section-manager-panel-blocks');
    check(await blocksPanel.evaluate((el) => el.scrollWidth <= el.clientWidth && el.scrollHeight > el.clientHeight), 'the component list scrolls down, not sideways');
    const guide = await blocksPanel.locator('.block-library > li').first().evaluate((el) => ({guide: Boolean(el.querySelector('.block-library__guide')), height: (el.firstElementChild as HTMLElement).offsetHeight, text: el.textContent ?? ''}));
    check(guide.guide && guide.height === 220 && /Glisse|Drag/.test(guide.text) && (await blocksPanel.locator(':scope > p').count()) === 0, 'the instructions are the first tile of the list, no line of help above it');
    const firstBlocks = await thumbs.evaluateAll((els) => els.slice(0, 3).map((el) => el.getAttribute('data-block') ?? ''));
    check(firstBlocks.every((slug) => /card/i.test(slug)), `the list starts with the cards (${firstBlocks.join(', ')})`);
    const ends = await thumbs.evaluateAll((els) => {
      const room = (els[0].closest('.block-library') as HTMLElement).clientWidth;
      const left = (els[0].closest('.block-library') as HTMLElement).getBoundingClientRect().left;
      const rows = new Map<number, number>();
      for (const el of els) {
        const r = el.getBoundingClientRect();
        rows.set(r.top, Math.max(rows.get(r.top) ?? 0, r.right - left));
      }
      return [...rows.values()].map((right) => Math.round(room - right));
    });
    log(`--  room left at the right of each row of thumbnails: ${ends.join(', ')} px`);
    await thumbs.first().hover();
    await p.waitForTimeout(300);
    const thumbVeil = await thumbs.first().locator('.block-library__caption').evaluate((el) => ({opacity: getComputedStyle(el).opacity, white: getComputedStyle(el).backgroundColor.replace(/\s/g, '').startsWith('rgba(255,255,255') && getComputedStyle(el).color.replace(/\s/g, '') === 'rgb(0,0,0)', covers: el.getBoundingClientRect().width === el.parentElement!.getBoundingClientRect().width && el.getBoundingClientRect().height === el.parentElement!.getBoundingClientRect().height}));
    check(thumbVeil.opacity === '1' && thumbVeil.covers && thumbVeil.white, 'on hover a white veil covers the whole thumbnail, with the name and the widths in black');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-library.png`});
    await p.mouse.move(0, 0);
    /** centre of a column of the preview, on screen */
    const columnPoint = async (key: string) => {
      const iframe = p.locator('.section-preview__frame');
      const outer = (await iframe.boundingBox())!;
      const k = outer.width / (await iframe.evaluate((el) => (el as HTMLElement).offsetWidth));
      const inner = await live.locator(`[data-preview-column="${key}"]`).evaluate((el) => {
        const r = el.getBoundingClientRect();
        return {x: r.left + r.width / 2, y: r.top + r.height / 2};
      });
      return {x: outer.x + inner.x * k, y: outer.y + inner.y * k};
    };
    /** drags a thumbnail to a column; `during` runs while the block is in the air */
    const dragBlock = async (slug: string, key: string, during?: () => Promise<void>) => {
      const thumb = p.locator(`#section-manager-panel-blocks .block-library__block[data-block="${slug}"]`);
      await thumb.scrollIntoViewIfNeeded();
      const from = (await thumb.boundingBox())!;
      const to = await columnPoint(key);
      await p.mouse.move(from.x + from.width / 2, from.y + 20);
      await p.mouse.down();
      await p.mouse.move(from.x + from.width / 2 + 10, from.y + 30, {steps: 3});
      await p.mouse.move(to.x, to.y, {steps: 12});
      await p.mouse.move(to.x + 2, to.y + 2, {steps: 2});
      if (during) await during();
      await p.mouse.up();
      await p.waitForTimeout(500);
    };
    const miniEmpty = (row: number, col: number) => squares.nth(row).locator('.rows-builder__mini').nth(col).getAttribute('data-empty');
    // a tier (4 columns at most) over a column of 5: refused, the zone is not a drop target
    let zoneAllowed: string | null = 'unset';
    await dragBlock('plan', '0-1', async () => {
      zoneAllowed = await p.locator('.section-preview__zone[data-zone="0-1"]').getAttribute('data-allowed');
    });
    check(zoneAllowed === null && (await miniEmpty(0, 1)) === 'true', 'a component too narrow or too wide for a column cannot be dropped on it');
    // a card on the same column: placed
    await dragBlock('cardIcon', '0-1', async () => {
      zoneAllowed = await p.locator('.section-preview__zone[data-zone="0-1"]').getAttribute('data-allowed');
    });
    check(zoneAllowed === 'true' && (await miniEmpty(0, 1)) === null, 'a component dropped on an empty column of the preview is placed in it');
    await live.locator('[data-preview-column="0-1"]').getByText('Lorem ipsum dolor', {exact: true}).waitFor({timeout: 10000});
    check(/Lorem ipsum dolor sit amet/.test(await live.locator('[data-preview-column="0-1"] p').first().innerText()), 'a component placed from the library starts with placeholder texts, shown in the preview');
    // another one on the filled column: asked first
    await dragBlock('cardTitle', '0-1');
    const confirm = p.locator('.confirmation-modal');
    check(await confirm.isVisible(), 'dropping on a filled column asks before replacing');
    await confirm.getByRole('button', {name: /^(Annuler|Cancel)$/}).click();
    await p.waitForTimeout(300);
    // the card's icon, clicked in the preview: its field shows beside it
    await live.locator('[data-preview-column="0-1"] [data-part="icon"]').click();
    const popover = p.locator('.field-popover');
    await popover.waitFor({timeout: 5000});
    check((await popover.getByRole('button').count()) >= 2, 'a click on an icon in the preview shows its field beside it');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-popover.png`});
    await p.keyboard.press('Escape');
    await p.waitForTimeout(200);
    check((await popover.count()) === 0 && (await p.locator('.section-manager__body').isVisible()), 'Escape closes the field, not the dialog');
    // a clickable card: a click on its link shows the link's fields (label, external address or content of the site)
    await dragBlock('cardTitleLink', '1-0');
    const link = live.locator('[data-preview-column="1-0"] [data-part="action"]');
    await link.waitFor({timeout: 10000});
    // its link covers the whole card: a click on the title still edits the title, only the bar opens the link
    const linkTitle = live.locator('[data-preview-column="1-0"] [data-part="title"]');
    await linkTitle.click();
    await p.waitForTimeout(400);
    check((await linkTitle.getAttribute('contenteditable')) === 'plaintext-only' && (await popover.count()) === 0, 'on a clickable card, a click on the title edits the title, not the link');
    // a second click in the text being typed moves the caret, the typing goes on
    await linkTitle.click({position: {x: 4, y: 8}});
    await p.keyboard.type('X');
    await p.waitForTimeout(300);
    check(/X/.test(await linkTitle.innerText()) && (await linkTitle.getAttribute('contenteditable')) === 'plaintext-only', 'a click in the title being typed moves the caret, the typing goes on');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(600);
    await link.click();
    await popover.waitFor({timeout: 5000});
    check((await popover.locator('input[name$=".cta.label"]').count()) === 1 && (await popover.locator('input[name$=".cta.href"]').count()) === 1 && (await popover.locator('.react-select').count()) >= 1, 'a click on a link in the preview shows its label, its kind (address or site content) and its address');
    await p.waitForTimeout(300);
    const inScreen = await popover.evaluate((el) => Math.round(window.innerHeight - el.getBoundingClientRect().bottom));
    check(inScreen >= 0, `the field's panel stays inside the screen (${inScreen} px to spare)`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-link.png`});
    await popover.getByRole('button', {name: /^(Fermer|Close)$/}).click();
    // an Image block replaces it (asked first), with an image of the media library; a click on it shows the image field
    await dragBlock('media', '1-0');
    await confirm.getByRole('button', {name: /^(Remplacer|Replace)$/}).click();
    await p.waitForTimeout(500);
    const placedImage = live.locator('[data-preview-column="1-0"] img');
    const hasMedia = Boolean(media);
    if (hasMedia) {
      await placedImage.waitFor({timeout: 10000});
      check(true, 'an Image block placed from the library shows an image of the media library at once');
      await live.locator('[data-preview-column="1-0"] [data-part="image"]').click();
    } else await live.getByText(/Image · à compléter/).click();
    await popover.waitFor({timeout: 5000});
    check(/upload|Image/i.test(await popover.innerText()), 'a click on the image of an Image block shows the image field');
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-components.png`});
    await popover.getByRole('button', {name: /^(Fermer|Close)$/}).click();
    // the Image block in the content panel: its fields flow into columns, nothing to scroll down;
    // a select's menu stays inside the top part
    await p.locator('.section-manager__tab[aria-controls="section-manager-panel-content"]').click();
    await p.waitForTimeout(700);
    const flow = await p.evaluate(() => {
      const el = document.querySelector('#section-manager-panel-content') as HTMLElement;
      const grid = el.querySelector('.column-content__flow') as HTMLElement;
      const boxes = [...grid.querySelectorAll('.column-content__cell')].filter((c) => (c as HTMLElement).offsetWidth > 0).map((c) => c.getBoundingClientRect());
      return {scroll: el.scrollHeight - el.clientHeight, cells: boxes.length, lines: new Set(boxes.map((b) => Math.round(b.top))).size, unused: Math.round(grid.getBoundingClientRect().right - Math.max(...boxes.map((b) => b.right)))};
    });
    check(flow.scroll <= 0 && flow.cells === 4 && flow.lines === 1 && flow.unused === 0, `the Image block's four fields take one column each, on one line, over the panel's full width, without vertical scroll (${JSON.stringify(flow)})`);
    await p.locator('.column-content .react-select').first().click();
    await p.waitForTimeout(500);
    const menu = await p.evaluate(() => {
      const m = document.querySelector('.column-content .rs__menu') as HTMLElement | null;
      const panels = document.querySelector('.section-manager__panels') as HTMLElement;
      return m ? Math.round(panels.getBoundingClientRect().bottom - m.getBoundingClientRect().bottom) : null;
    });
    check(menu !== null && menu >= 0, `a select's menu opens inside the top part (${menu} px to spare)`);
    await p.locator('.column-content .rs__option').first().click();
    await p.waitForTimeout(300);
    await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    await p.waitForTimeout(500);

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
    const veil = await blank.getByText('Colonnes', {exact: true}).evaluate((el) => getComputedStyle(el.parentElement as HTMLElement).backgroundColor);
    check(/rgba\(|color\(srgb .* \/ 0\.0/.test(veil) && !/rgba\(0, 0, 0, 0\)/.test(veil), `the columns zone is translucent on a light section (${veil})`);
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
    // a brand-new section: the top part has a usable height before a background is chosen, then
    // follows the layout panel once the rows exist (the whole square shows, nothing is cut)
    await p.waitForTimeout(500);
    await p.getByRole('button', {name: /Ajouter Section|Add Section/}).click();
    await p.locator('.drawer').getByText('Section', {exact: true}).first().click();
    await p.waitForTimeout(1500);
    const manage = p.getByRole('button', {name: /^(Gérer|Manage)$/});
    if ((await manage.count()) < 3) await p.locator('.blocks-field__rows .collapsible__toggle').nth(2).click();
    await manage.nth(2).click();
    await p.waitForTimeout(2000);
    // the same height before a background is chosen, after, in every panel and once a row exists
    const topHeight = () => p.evaluate(() => (document.querySelector('.section-manager__panels') as HTMLElement).offsetHeight);
    const opening = await topHeight();
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    await p.waitForTimeout(600);
    check((await p.locator('#section-manager-panel-layout .rows-builder__tile[aria-disabled]').count()) > 10, 'before a background is chosen, the layout panel shows its thumbnails, disabled');
    await p.getByRole('button', {name: /Fond et espaces|Background/}).click();
    await p.waitForTimeout(600);
    await p.getByText(/^(Nuit|Night)$/).first().click();
    await p.waitForTimeout(1500);
    const afterBackground = await topHeight();
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    await p.waitForTimeout(800);
    check((await p.locator('#section-manager-panel-layout .rows-builder__empty').count()) === 1, 'without a row, the line says where to drop a layout');
    const emptyLine = (await p.locator('#section-manager-panel-layout .rows-builder__drop').boundingBox())!;
    await dragLayout('8-2-2', emptyLine.x + 100, emptyLine.y + emptyLine.height / 2);
    await p.waitForTimeout(900);
    const afterRow = await topHeight();
    await p.getByRole('button', {name: /Composants|Components/}).click();
    await p.waitForTimeout(600);
    const inComponents = await topHeight();
    check(opening === startHeight && afterBackground === opening && afterRow === opening && inComponents === opening, `the top part keeps one height: new section ${opening}, background chosen ${afterBackground}, first row added ${afterRow}, another panel ${inComponents} (first section ${startHeight})`);
    await p.getByRole('button', {name: /Découpage|Layout/}).click();
    await p.waitForTimeout(600);
    const grown = await p.evaluate(() => {
      const panels = document.querySelector('.section-manager__panels') as HTMLElement;
      const square = document.querySelector('.rows-builder__square') as HTMLElement | null;
      return {square: square ? Math.round(square.getBoundingClientRect().bottom) : -1, bottom: Math.round(panels.getBoundingClientRect().bottom)};
    });
    check(grown.square > 0 && grown.bottom - grown.square >= 15, `the whole square shows, 15 px or more above the preview (${grown.bottom - grown.square})`);
    if (SHOTS) await p.screenshot({path: `${SHOTS}/manager-new-section.png`});
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

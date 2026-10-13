/**
 * Smoke test of the in-place editing of the manager's live preview (pnpm smoke:inplace): for each
 * marked part of each block listed below, a click in the preview must type the text in place
 * (`text`) or open the field's popover (`link`, `image`, `icon`). A throwaway page and user, deleted
 * at the end. Never touches a real page. The dev server must be running (pnpm dev).
 *   SMOKE_BASE: server address (default http://localhost:3000)
 * A part `name#n` is the n-th element of that name (a rich text has one per text).
 * Add a block here when its parts are marked (a `data-part` in the component, `parts` in the block).
 */
import config from '@payload-config';
import {randomBytes} from 'node:crypto';
import {getPayload} from 'payload';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const stamp = Date.now();

type Kind = 'text' | 'link' | 'image' | 'icon';
type Case = {block: Record<string, unknown>; span: string; parts: Record<string, Kind>};

const link = (label: string) => ({label, href: '/'});
const price = {value: '99', currency: '€', period: '/ mois'};
const features = [{label: 'Un point'}, {label: 'Un autre'}];

const lexical = (...blocks: unknown[]) => ({root: {type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: blocks}});
const text = (t: string, format = 0) => ({type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1});
const paragraph = (...children: unknown[]) => ({type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children});
const listItem = (value: number, t: string) => ({type: 'listitem', format: '', indent: 0, version: 1, direction: 'ltr', value, children: [text(t)]});
const bulletList = (...items: unknown[]) => ({type: 'list', listType: 'bullet', start: 1, tag: 'ul', format: '', indent: 0, version: 1, direction: 'ltr', children: items});
const RICH = lexical(paragraph(text('Un début, '), text('puis du gras', 1), text(' et la fin.')), bulletList(listItem(1, 'Premier point'), listItem(2, 'Second point')));

const CASES: Case[] = [
  {block: {blockType: 'sectionHeading', eyebrow: 'Sur-titre', title: 'Un titre\n<span>accentué</span>', tag: 'h2', lead: 'Une phrase d’accroche.'}, span: '12', parts: {eyebrow: 'text', title: 'text', lead: 'text'}},
  {block: {blockType: 'testimonial', quote: 'Une citation d’essai.', name: 'Jeanne Dupont', role: 'Courtière', result: '+ 28 %'}, span: '4', parts: {quote: 'text', name: 'text', role: 'text', result: 'text'}},
  {block: {blockType: 'compareCard', chipLabel: 'Avant', chipTone: 'accent', meta: '3 semaines', quote: 'Une citation.', items: [{label: 'Un point'}]}, span: '6', parts: {meta: 'text', quote: 'text', 'items.0.label': 'text'}},
  {block: {blockType: 'plan', name: 'Pro', nameTag: 'p', tagline: 'Pour démarrer', price, features, cta: link('Choisir'), mention: 'Sans engagement', featuresLabel: 'Inclus'}, span: '4', parts: {name: 'text', tagline: 'text', featuresLabel: 'text', cta: 'link', mention: 'text', 'features.1.label': 'text'}},
  {block: {blockType: 'priceSingle', featuresLabel: 'Inclus', features, totalLabel: 'Total', totalValue: '120 €', priceLabel: 'Votre prix', price, cta: link('Commander'), mention: 'Sans engagement'}, span: '8', parts: {featuresLabel: 'text', totalLabel: 'text', totalValue: 'text', priceLabel: 'text', cta: 'link', mention: 'text', 'features.0.label': 'text'}},
  {block: {blockType: 'faq', mode: 'multiple', columns: '1', firstOpen: true, tag: 'h3', items: [{question: 'Première question ?', answer: 'Première réponse.\n\nUn second paragraphe.'}, {question: 'Deuxième question ?', answer: 'Deuxième réponse.'}]}, span: '8', parts: {'items.0.question': 'text', 'items.1.question': 'text', 'items.0.answer': 'text'}},
  {block: {blockType: 'processSteps', tag: 'h3', steps: [{title: 'Étape un', duration: '2 jours', text: 'Un texte.', checks: [{label: 'Un contrôle'}]}, {title: 'Étape deux', text: 'Un autre texte.', checks: [{label: 'Un second contrôle'}]}]}, span: '8', parts: {'steps.0.title': 'text', 'steps.0.duration': 'text', 'steps.1.text': 'text', 'steps.1.checks.0.label': 'text'}},
  {block: {blockType: 'textBox', title: 'Un titre', titleTag: 'h2', content: RICH}, span: '8', parts: {title: 'text', 'content#0': 'text', 'content#1': 'text', 'content#4': 'text'}},
  {block: {blockType: 'tabs', items: [{label: 'Premier', content: RICH}, {label: 'Second', content: lexical(paragraph(text('Le texte du second onglet.')))}]}, span: '8', parts: {'items.0.content#0': 'text', 'items.0.content#3': 'text'}},
];

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };
  const email = `zz-inplace-${stamp}@example.test`;
  const password = randomBytes(12).toString('hex');
  const user = await payload.create({collection: 'users', data: {email, password, name: 'ZZ smoke'} as never});
  const pages: number[] = [];
  const {chromium} = await import('@playwright/test');
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({viewport: {width: 1600, height: 1000}});
    const p = await ctx.newPage();
    const errors: string[] = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.request.post(`${BASE}/api/users/login`, {data: {email, password}});
    for (const c of CASES) {
      const slug = String(c.block.blockType);
      const section = {blockType: 'section', mode: 'light', tint: 'light', texture: 'grid', rows: [{columns: [{span: c.span, contents: [c.block]}, ...(c.span === '12' ? [] : [{span: String(12 - Number(c.span)), contents: []}])]}]};
      const page = (await payload.create({collection: 'pages', data: {title: `ZZ smoke en place ${slug}`, slug: `zz-smoke-inplace-${slug.toLowerCase()}-${stamp}`, hero: {variant: 'page-glow', title: 'Smoke'}, sections: [section]} as never}).catch((e: Error) => {
        check(false, `${slug}: the throwaway page could not be created (${e.message.slice(0, 160)})`);
        return null;
      })) as {id: number} | null;
      if (!page) continue;
      pages.push(page.id);
      await p.goto(`${BASE}/admin/collections/pages/${page.id}`, {waitUntil: 'networkidle'});
      await p.getByText('Contenu', {exact: true}).first().click();
      const toggle = p.locator('.blocks-field__rows .collapsible__toggle').first();
      if (await toggle.count()) await toggle.click();
      await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
      const frame = p.frameLocator('.section-preview__frame');
      await frame.locator('[data-preview-column]').first().waitFor({timeout: 20000});
      await p.getByRole('radio', {name: /Ordinateur|Desktop/}).click();
      await p.waitForTimeout(800);
      for (const [key, kind] of Object.entries(c.parts)) {
        // `name#2`: the third element of that name (the texts of a rich text)
        const [part, nth] = key.split('#');
        const el = frame.locator(`[data-preview-column] [data-part="${part}"]`).nth(Number(nth ?? 0));
        if (!(await el.count())) {
          check(false, `${slug}.${part}: no element marked data-part="${part}" in the preview`);
          continue;
        }
        await el.scrollIntoViewIfNeeded();
        await el.click();
        await p.waitForTimeout(400);
        if (kind === 'text') {
          const editable = (await el.getAttribute('contenteditable')) === 'plaintext-only';
          check(editable, `${slug}.${part}: a click types the text in place`);
          if (editable) {
            await el.evaluate((node) => {
              const range = document.createRange();
              range.selectNodeContents(node);
              range.collapse(false);
              const selection = window.getSelection();
              selection?.removeAllRanges();
              selection?.addRange(range);
            });
            await p.keyboard.type('!');
            await p.waitForTimeout(300);
            await p.keyboard.press('Enter');
            // the server draws the typed text back, in the same row
            await p.waitForTimeout(1800);
            const shown = (await el.innerText().catch(() => '')).trim();
            check(shown.endsWith('!'), `${slug}.${part}: what is typed shows after the refresh, in the same place (${JSON.stringify(shown.slice(-24))})`);
          }
        } else {
          const popover = (await p.locator('.field-popover').count()) > 0;
          check(popover, `${slug}.${part}: a click opens the ${kind} field`);
          if (popover) {
            await p.keyboard.press('Escape');
            await p.waitForTimeout(200);
          }
        }
      }
      await p.getByRole('button', {name: /^(Fermer|Close)$/}).first().click();
    }
    check(errors.length === 0, `no page error${errors.length ? `: ${errors[0]}` : ''}`);
  } finally {
    await browser.close();
    await payload.delete({collection: 'payload-locked-documents', where: {'user.value': {equals: user.id}}});
    await payload.delete({collection: 'payload-preferences', where: {'user.value': {equals: user.id}}});
    for (const id of pages) await payload.delete({collection: 'pages', id});
    await payload.delete({collection: 'users', id: user.id});
  }
  log(failures ? `${failures} check(s) failed` : 'All checks passed');
  process.exit(failures ? 1 : 0);
}

main();

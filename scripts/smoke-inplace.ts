/**
 * Smoke test of the in-place editing of the manager's live preview (pnpm smoke:inplace): for each
 * marked part of each block listed below, a click in the preview must type the text in place
 * (`text`) or open the field's popover (`link`, `image`, `icon`). A throwaway page and user, deleted
 * at the end. Never touches a real page. The dev server must be running (pnpm dev).
 *   SMOKE_BASE: server address (default http://localhost:3000)
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

const CASES: Case[] = [
  {block: {blockType: 'sectionHeading', eyebrow: 'Sur-titre', title: 'Un titre\n<span>accentué</span>', tag: 'h2', lead: 'Une phrase d’accroche.'}, span: '12', parts: {eyebrow: 'text', title: 'text', lead: 'text'}},
  {block: {blockType: 'testimonial', quote: 'Une citation d’essai.', name: 'Jeanne Dupont', role: 'Courtière', result: '+ 28 %'}, span: '4', parts: {quote: 'text', name: 'text', role: 'text', result: 'text'}},
  {block: {blockType: 'compareCard', chipLabel: 'Avant', chipTone: 'accent', meta: '3 semaines', quote: 'Une citation.', items: [{label: 'Un point'}]}, span: '6', parts: {meta: 'text', quote: 'text'}},
  {block: {blockType: 'plan', name: 'Pro', nameTag: 'p', tagline: 'Pour démarrer', price, features, cta: link('Choisir'), mention: 'Sans engagement', featuresLabel: 'Inclus'}, span: '4', parts: {name: 'text', tagline: 'text', featuresLabel: 'text', cta: 'link', mention: 'text'}},
  {block: {blockType: 'priceSingle', featuresLabel: 'Inclus', features, totalLabel: 'Total', totalValue: '120 €', priceLabel: 'Votre prix', price, cta: link('Commander'), mention: 'Sans engagement'}, span: '8', parts: {featuresLabel: 'text', totalLabel: 'text', totalValue: 'text', priceLabel: 'text', cta: 'link', mention: 'text'}},
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
      for (const [part, kind] of Object.entries(c.parts)) {
        const el = frame.locator(`[data-preview-column] [data-part="${part}"]`).first();
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
            await p.keyboard.press('End');
            await p.keyboard.type('!');
            await p.waitForTimeout(300);
            await p.keyboard.press('Enter');
            await p.waitForTimeout(300);
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

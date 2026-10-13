/**
 * Smoke test of the page top's « Gérer » dialog and its live preview (pnpm smoke:hero): for each
 * kind of hero, a throwaway page and a throwaway admin user, both deleted at the end. Never touches
 * a real page. The dev server must be running (pnpm dev).
 *   SMOKE_BASE: server address (default http://localhost:3000)
 *   SMOKE_SHOTS: a folder for screenshots of the dialog (optional)
 */
import config from '@payload-config';
import {randomBytes} from 'node:crypto';
import {getPayload} from 'payload';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const SHOTS = process.env.SMOKE_SHOTS;
const stamp = Date.now();

const link = (label: string) => ({label, href: '#'});
const CASES: {variant: string; hero: Record<string, unknown>; text: string[]; popovers: string[]; tall: boolean}[] = [
  {variant: 'page-glow', hero: {eyebrow: 'Sur-titre', title: 'Un titre de page', lead: 'Une accroche.', primary: link('Principal'), secondary: link('Secondaire')}, text: ['title', 'lead', 'eyebrow'], popovers: ['primary', 'secondary'], tall: false},
  {variant: 'media-image', hero: {eyebrow: 'Sur-titre', title: 'Un titre plein écran', lead: 'Une accroche.', primary: link('Principal'), scrollHint: 'Défiler'}, text: ['title', 'lead', 'scrollHint'], popovers: ['eyebrow', 'primary'], tall: true},
  {variant: 'split', hero: {eyebrow: 'Sur-titre', title: 'Un titre en deux colonnes', lead: 'Une accroche.', primary: link('Principal'), reassurance: [{text: 'Sans engagement'}, {text: 'Rapide'}]}, text: ['title', 'lead', 'reassurance.1.text'], popovers: ['eyebrow', 'primary'], tall: true},
];

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };
  const email = `zz-hero-${stamp}@example.test`;
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
    for (const [n, c] of CASES.entries()) {
      const name = c.variant;
      const page = (await payload.create({collection: 'pages', data: {title: `ZZ smoke hero ${name}`, slug: `zz-smoke-hero-${n}-${stamp}`, hero: {variant: c.variant, ...c.hero}} as never}).catch((e: Error) => {
        check(false, `${name}: the throwaway page could not be created (${e.message.slice(0, 200)})`);
        return null;
      })) as {id: number} | null;
      if (!page) continue;
      pages.push(page.id);
      await p.goto(`${BASE}/admin/collections/pages/${page.id}`, {waitUntil: 'networkidle'});
      await p.getByRole('button', {name: /^(Gérer|Manage)$/}).first().click();
      const frame = p.frameLocator('.section-preview__frame');
      const ready = await frame.locator('[data-preview-column]').first().waitFor({timeout: 30000}).then(() => true, () => false);
      check(ready, `${name}: the dialog opens and the preview shows the hero`);
      if (!ready) continue;
      await p.getByRole('radio', {name: /Ordinateur|Desktop/}).click();
      await p.waitForTimeout(800);
      const sizes = await p.evaluate(() => {
        const f = document.querySelector('.section-preview__frame') as HTMLElement;
        return {frame: f.offsetHeight};
      });
      check(sizes.frame === 800, `${name}: the frame is 800 px high (${sizes.frame})`);
      if (c.tall) {
        const hero = await frame.locator('[data-preview-column]').first().boundingBox();
        check(Boolean(hero) && Math.abs((hero?.height ?? 0) - 800) <= 2, `${name}: the full-screen hero fills the frame (${Math.round(hero?.height ?? 0)})`);
      }
      if (SHOTS) {
        log(`    frame text: ${JSON.stringify((await frame.locator('body').innerText()).slice(0, 160))}`);
        await p.screenshot({path: `${SHOTS}/hero-${name}.png`});
      }
      for (const part of c.text) {
        const el = frame.locator(`[data-preview-column] [data-part="${part}"]`).first();
        if (!(await el.count())) {
          check(false, `${name}.${part}: no element marked data-part="${part}"`);
          continue;
        }
        await el.scrollIntoViewIfNeeded();
        await el.click({timeout: 8000});
        await p.waitForTimeout(400);
        const editable = (await el.getAttribute('contenteditable')) === 'plaintext-only';
        check(editable, `${name}.${part}: a click types the text in place`);
        if (!editable) continue;
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
        // what is typed is in the form
        // (a list row's field is only drawn in the form once it is on screen: its text is checked in the preview)
        if (!/\.\d+\./.test(part)) {
          const value = await p.locator(`[name="hero.${part}"]`).first().inputValue().catch(() => null);
          check(typeof value === 'string' && value.endsWith('!'), `${name}.${part}: what is typed is in the hero's form (${JSON.stringify(value?.slice(-12))})`);
        }
        await p.keyboard.press('Enter');
        await p.waitForTimeout(1800);
        check((await el.innerText().catch(() => '')).trim().replace(/\s+/g, ' ').toLowerCase().includes('!'), `${name}.${part}: the preview draws it back`);
      }
      for (const part of c.popovers) {
        const el = frame.locator(`[data-preview-column] [data-part="${part}"]`).first();
        if (!(await el.count())) {
          check(false, `${name}.${part}: no element marked data-part="${part}"`);
          continue;
        }
        await el.scrollIntoViewIfNeeded();
        await el.click();
        await p.waitForTimeout(500);
        check((await p.locator('.field-popover').count()) > 0, `${name}.${part}: a click opens its field in a popover`);
        await p.keyboard.press('Escape');
        await p.waitForTimeout(200);
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

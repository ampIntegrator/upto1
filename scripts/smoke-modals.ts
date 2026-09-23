/**
 * Smoke test of the modals (pnpm smoke:modals, dev server running): creates a throwaway form, three
 * throwaway modals (a sentence with two buttons; a long text with a required answer; a form inserted
 * between two paragraphs) and a throwaway page in the green silo whose text box links to them
 * (internal links in the text, a button to #modale-<slug>) and to an existing post. Checks the
 * admin rules, the anchors written in the page and the modals rendered closed in it, each
 * /modale/<slug> preview page, then, in a headless browser: opening over the page (address = page
 * + anchor), the page's silo, Escape, Back, the required answer, the button, a form sent from the
 * modal, a load with the anchor. Deletes the submissions, the page, the modals and the form. Never touches
 * real content (the post is only read).
 *   SMOKE_BASE: server address (default http://localhost:3000)
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import {blogConfig, entryPath} from '@/lib/listings';
import {modalHash, modalPath} from '@/lib/modal-paths';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const stamp = Date.now();
const slug = `zz-smoke-modals-${stamp}`;

type Node = Record<string, unknown>;
const text = (t: string, format = 0): Node => ({type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1});
const paragraph = (...children: Node[]): Node => ({type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, textStyle: '', children});
const link = (relationTo: string, id: number, label: string): Node => ({
  type: 'link',
  version: 3,
  format: '',
  indent: 0,
  direction: 'ltr',
  fields: {linkType: 'internal', doc: {relationTo, value: id}, newTab: false},
  children: [text(label)],
});
const formBlock = (id: string, form: number): Node => ({type: 'block', version: 2, format: '', fields: {id, blockName: '', blockType: 'modalForm', form, showHeading: false}});
const doc = (...children: Node[]) => ({root: {type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children}});

const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const section = (rows: ReturnType<typeof column>[][]) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', rows: rows.map((columns) => ({columns}))});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };

  const created: {forms: number[]; modals: number[]; pages: number[]} = {forms: [], modals: [], pages: []};
  try {
    const form = await payload.create({
      collection: 'forms',
      data: {
        title: `Rappel smoke ${stamp}`,
        submitButtonLabel: 'Envoyer smoke',
        confirmationType: 'message',
        confirmationMessage: doc(paragraph(text('Merci modale smoke.'))),
        fields: [
          {blockType: 'text', name: 'nom', label: 'Nom modale smoke', required: true},
          {blockType: 'email', name: 'email', label: 'E-mail modale smoke', required: true},
        ],
      } as never,
    });
    created.forms.push(form.id);

    // a required answer without any button is refused
    try {
      const m = await payload.create({collection: 'modals', data: {title: 'zz smoke sans bouton', slug: `${slug}-nobutton`, dismiss: 'required'} as never});
      created.modals.push(m.id);
      check(false, 'required answer without a button: accepted, expected a validation error');
    } catch {
      check(true, 'a required answer without a button is refused');
    }
    // a link button needs its address
    try {
      const m = await payload.create({collection: 'modals', data: {title: 'zz smoke lien vide', slug: `${slug}-nohref`, buttons: [{label: 'Aller', action: 'link', variant: 'primary'}]} as never});
      created.modals.push(m.id);
      check(false, 'link button without an address: accepted, expected a validation error');
    } catch {
      check(true, 'a link button without an address is refused');
    }

    const note = await payload.create({
      collection: 'modals',
      data: {
        title: 'Offre smoke',
        slug: `${slug}-note`,
        eyebrow: 'Surtitre smoke',
        size: 'sm',
        body: doc(paragraph(text('Une phrase smoke, '), text('en gras', 1), text('.'))),
        buttons: [
          {label: 'Annuler smoke', action: 'close', variant: 'ghost'},
          {label: 'Vers accueil smoke', action: 'link', href: '/', variant: 'destructive'},
        ],
      } as never,
    });
    const terms = await payload.create({
      collection: 'modals',
      data: {
        title: 'Conditions smoke',
        slug: `${slug}-terms`,
        size: 'lg',
        tone: 'night',
        dismiss: 'required',
        body: doc(...Array.from({length: 30}, (_, i) => paragraph(text(`Article ${i + 1} smoke. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`)))),
        buttons: [{label: 'J’accepte smoke', action: 'close', variant: 'primary'}],
      } as never,
    });
    // with a form in the body: one « close » button at most, secondary or ghost
    const formBody = doc(paragraph(text('Introduction smoke.')), formBlock('smokeformblock', form.id), paragraph(text('Mention légale smoke.')));
    try {
      const m = await payload.create({collection: 'modals', data: {title: 'zz smoke form primaire', slug: `${slug}-formprimary`, body: formBody, buttons: [{label: 'Aller', action: 'link', kind: 'url', href: '/', variant: 'primary'}]} as never});
      created.modals.push(m.id);
      check(false, 'form modal with a primary link button: accepted, expected a validation error');
    } catch {
      check(true, 'a form modal refuses a primary or link button');
    }
    const withForm = await payload.create({
      collection: 'modals',
      data: {
        title: 'Demande smoke',
        slug: `${slug}-form`,
        body: formBody,
        buttons: [{label: 'Annuler smoke', action: 'close', variant: 'ghost'}],
      } as never,
    });
    created.modals.push(note.id, terms.id, withForm.id);
    log(`modals created: ${note.id}, ${terms.id}, ${withForm.id}`);

    // an existing post, only read: its internal link must get its address under the blog
    const post = (await payload.find({collection: 'posts', limit: 1, depth: 0})).docs[0];
    const postHref = post ? entryPath(blogConfig(await payload.findGlobal({slug: 'blog', depth: 0})), post.slug) : null;

    const content = doc(
      paragraph(link('modals', note.id, 'Lien note smoke'), text(' · '), link('modals', terms.id, 'Lien conditions smoke'), text(' · '), link('modals', withForm.id, 'Lien formulaire smoke')),
      ...(post ? [paragraph(link('posts', post.id, 'Lien article smoke'))] : []),
    );
    const page = await payload.create({
      collection: 'pages',
      data: {
        title: 'Smoke modales',
        slug,
        silo: 'green',
        sections: [section([[column(6, {blockType: 'textBox', title: 'Encart modales smoke', titleTag: 'h2', content, buttons: [{label: 'Bouton modale smoke', kind: 'internal', doc: {relationTo: 'modals', value: note.id}, shape: 'simple', variant: 'primary', size: 'md'}, {label: 'Bouton ancre smoke', href: modalHash(terms.slug), shape: 'simple', variant: 'ghost', size: 'md'}]}), column(6)]])],
        hero: {variant: 'page-glow', title: 'Smoke modales', primary: {label: 'Hero article smoke', kind: 'internal', doc: post ? {relationTo: 'posts', value: post.id} : null}},
      } as never,
    });
    created.pages.push(page.id);
    log(`page created: ${page.id} (${slug})`);

    // the page: every internal link carries its address
    const html = await (await fetch(`${BASE}/${slug}`)).text();
    for (const m of [note, terms, withForm]) check(html.includes(`href="${modalHash(m.slug)}"`), `the page links to ${modalHash(m.slug)}`);
    for (const m of ['Offre smoke', 'Conditions smoke', 'Demande smoke', 'Nom modale smoke']) check(html.includes(m), `the page renders the closed modal « ${m} »`);
    check((html.match(new RegExp(`href="${modalHash(note.slug)}"`, 'g')) ?? []).length >= 2, 'a button whose target is a chosen modal gets its anchor');
    if (postHref) check(html.includes(`Hero article smoke`) && html.includes(`href="${postHref}"`), 'a hero button whose target is a chosen post gets its address');
    if (postHref) check(html.includes(`href="${postHref}"`), `an internal link to a post in a text box goes to ${postHref}`);
    check(!/Unhandled Runtime Error|Build Error/.test(html), 'page without runtime error');

    // each modal as a page of its own
    const standalone = async (s: string) => {
      const res = await fetch(`${BASE}${modalPath(s)}`);
      return {status: res.status, html: await res.text()};
    };
    const a = await standalone(note.slug);
    check(a.status === 200, `${modalPath(note.slug)} → ${a.status}`);
    for (const m of ['Offre smoke', 'Surtitre smoke', 'Une phrase smoke', 'Annuler smoke', 'Vers accueil smoke', 'noindex']) check(a.html.includes(m), `note modal page renders « ${m} »`);
    const b = await standalone(withForm.slug);
    for (const m of ['Introduction smoke.', 'Nom modale smoke', 'E-mail modale smoke', 'Envoyer smoke', 'Mention légale smoke.', 'company_website']) check(b.html.includes(m), `form modal page renders « ${m} »`);
    check(b.html.indexOf('Introduction smoke.') < b.html.indexOf('Nom modale smoke') && b.html.indexOf('Nom modale smoke') < b.html.indexOf('Mention légale smoke.'), 'the form sits where it was inserted, between the two paragraphs');
    const missing = await standalone(`${slug}-absente`);
    check(missing.status === 404, `an unknown modal → ${missing.status}`);

    // in a browser: opening over the page, silo, Escape, required answer, button, form
    const {chromium} = await import('@playwright/test');
    const browser = await chromium.launch();
    try {
      const p = await browser.newPage({viewport: {width: 1440, height: 900}});
      const errors: string[] = [];
      p.on('pageerror', (e) => errors.push(e.message));
      const pageUrl = `${BASE}/${slug}`;
      await p.goto(pageUrl, {waitUntil: 'networkidle'});
      const dialog = p.locator('dialog[open]');

      await p.getByRole('link', {name: 'Lien note smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      check(p.url() === pageUrl + modalHash(note.slug), `the address becomes the page + ${modalHash(note.slug)} (${p.url()})`);
      check(await p.getByRole('heading', {name: 'Encart modales smoke'}).isVisible(), 'the page stays behind the modal');
      check(await dialog.getByText('Une phrase smoke').isVisible(), 'the modal shows its body');
      // the page's silo (green) on the modal: its title in the silo's accent
      const accent = await dialog.getByRole('heading', {name: 'Offre smoke'}).evaluate((el) => getComputedStyle(el).color);
      check(accent === 'rgb(64, 145, 108)', `the modal takes the page's silo (title colour ${accent})`);
      const destructive = await dialog.getByRole('link', {name: 'Vers accueil smoke'}).getAttribute('data-variant');
      check(destructive === 'destructive', `the destructive button keeps its style (${destructive})`);
      await p.keyboard.press('Escape');
      await dialog.waitFor({state: 'detached', timeout: 5000}).catch(() => undefined);
      check((await dialog.count()) === 0 && p.url() === pageUrl, `Escape closes it and returns to the page address (${p.url()})`);
      await p.getByRole('link', {name: 'Lien note smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      await p.goBack();
      await p.waitForTimeout(500);
      check((await dialog.count()) === 0 && p.url() === pageUrl, 'the browser\'s Back closes it');

      await p.getByRole('link', {name: 'Bouton modale smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      check(p.url() === pageUrl + modalHash(note.slug), 'a button whose target is a modal opens it over the page too');
      await dialog.getByRole('button', {name: 'Annuler smoke'}).click();
      await p.waitForURL(pageUrl, {timeout: 5000}).catch(() => undefined);
      check((await dialog.count()) === 0 && p.url() === pageUrl, 'a « close » footer button closes it');

      // a footer button to a page: the page opens and the modal is gone (the slot's catch-all)
      await p.getByRole('link', {name: 'Lien note smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      await dialog.getByRole('link', {name: 'Vers accueil smoke'}).click();
      await p.waitForURL(`${BASE}/`, {timeout: 10000}).catch(() => undefined);
      await p.waitForTimeout(400);
      check(p.url() === `${BASE}/` && (await dialog.count()) === 0, `a footer button to a page goes there and the modal is gone (${p.url()}, ${await dialog.count()} dialog)`);
      await p.goto(pageUrl, {waitUntil: 'networkidle'});

      await p.getByRole('link', {name: 'Lien conditions smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      check((await dialog.getByRole('button', {name: 'Fermer'}).count()) === 0, 'required answer: no close cross');
      await p.keyboard.press('Escape');
      await p.waitForTimeout(400);
      check((await dialog.count()) === 1, 'required answer: Escape does not close it');
      await dialog.getByRole('button', {name: 'J’accepte smoke'}).click();
      await p.waitForURL(pageUrl, {timeout: 5000}).catch(() => undefined);
      check((await dialog.count()) === 0, 'required answer: its button closes it');

      await p.getByRole('link', {name: 'Lien formulaire smoke'}).click();
      await dialog.waitFor({timeout: 10000});
      // the form's send button sits in the modal's footer, not at the end of the scrolling body
      await dialog.locator('form').waitFor();
      await p.waitForTimeout(300);
      check((await dialog.locator('form').getByRole('button', {name: 'Envoyer smoke'}).count()) === 0, 'the send button is not in the body');
      check((await dialog.locator('[class*="footer"]').getByRole('button', {name: 'Envoyer smoke'}).count()) === 1, 'the send button is in the modal footer');
      await dialog.getByLabel('Nom modale smoke').fill('Priya smoke');
      await dialog.getByLabel('E-mail modale smoke').fill('priya@exemple.fr');
      await p.waitForTimeout(3200); // the anti-spam delay of the forms
      await dialog.getByRole('button', {name: 'Envoyer smoke'}).click();
      await dialog.getByText('Merci modale smoke.').waitFor({timeout: 10000}).catch(() => undefined);
      check(await dialog.getByText('Merci modale smoke.').isVisible(), 'the form sent from the modal shows its confirmation in it');
      const closeBtn = dialog.locator('[class*="footer"]').getByRole('button', {name: 'Fermer'});
      check((await closeBtn.count()) === 1 && (await dialog.locator('[class*="footer"]').getByRole('button', {name: 'Annuler smoke'}).count()) === 0, 'once sent, the footer offers « Fermer » in place of the modal\'s buttons');
      await closeBtn.click();
      await p.waitForTimeout(500);
      check((await dialog.count()) === 0 && p.url() === pageUrl, '« Fermer » closes it and keeps the page');
      const stored = (await payload.find({collection: 'form-submissions', where: {form: {equals: form.id}}, limit: 1})).docs[0];
      const data = Object.fromEntries((stored?.submissionData ?? []).map((d) => [d.field, d.value]));
      check(data.nom === 'Priya smoke' && data.email === 'priya@exemple.fr', `the submission is stored ${JSON.stringify(data)}`);

      // a load of the page with the anchor: the modal opens at once, closing keeps the page
      await p.goto(pageUrl + modalHash(note.slug), {waitUntil: 'networkidle'});
      await dialog.waitFor({timeout: 10000}).catch(() => undefined);
      check((await dialog.count()) === 1, 'a load of the page with the anchor opens the modal');
      await p.keyboard.press('Escape');
      await p.waitForTimeout(500);
      check((await dialog.count()) === 0 && p.url() === pageUrl, `closing after such a load keeps the page (${p.url()})`);
      // the modal's own page (admin preview)
      await p.goto(`${BASE}${modalPath(note.slug)}`, {waitUntil: 'networkidle'});
      check((await dialog.count()) === 1, 'a full load of /modale/<slug> shows the modal');
      await dialog.getByRole('button', {name: 'Annuler smoke'}).click();
      await p.waitForURL(`${BASE}/`, {timeout: 10000}).catch(() => undefined);
      check(p.url() === `${BASE}/`, `closing the standalone modal goes to the home page (${p.url()})`);
      check(errors.length === 0, `no page error ${JSON.stringify(errors.slice(0, 3))}`);
    } finally {
      await browser.close();
    }
  } finally {
    if (created.forms.length) await payload.delete({collection: 'form-submissions', where: {form: {in: created.forms}}});
    for (const id of created.pages) await payload.delete({collection: 'pages', id});
    for (const id of created.modals) await payload.delete({collection: 'modals', id});
    for (const id of created.forms) await payload.delete({collection: 'forms', id});
    log('submissions, page, modals and form deleted');
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Smoke test of the forms (pnpm smoke:forms, dev server running): creates two throwaway forms (every
 * field type and three steps; a one-step form) and a throwaway page holding the « Formulaire » block
 * at 12, 6 and 4 columns; checks the width rule, the site rendering, the submission (stored values,
 * refusals, spam kept out) and that the REST API refuses submissions; then deletes the submissions,
 * the page and the forms. Never touches real content.
 *   SMOKE_BASE: server address (default http://localhost:3000)
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import {submitForm} from '@/app/(frontend)/actions/submitForm';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const stamp = Date.now();
const slug = `zz-smoke-forms-${stamp}`;

const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const section = (rows: ReturnType<typeof column>[][]) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', rows: rows.map((columns) => ({columns}))});
const hero = {variant: 'page-glow', title: 'Smoke formulaires'};
const doc = (text: string) => ({root: {type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, textStyle: '', children: [{type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1}]}]}});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };

  const steps = await payload.create({
    collection: 'forms',
    data: {
      title: 'Formulaire <span>smoke</span>',
      eyebrow: 'Surtitre smoke',
      eyebrowStyle: 'badge',
      intro: 'Chapô smoke du formulaire.',
      headingTag: 'h2',
      submitButtonLabel: 'Envoyer smoke',
      confirmationType: 'message',
      confirmationMessage: doc('Merci smoke.'),
      fields: [
        {blockType: 'stepBreak', title: 'Contact smoke'},
        {blockType: 'text', name: 'prenom', label: 'Prénom smoke', required: true, width: 'half'},
        {blockType: 'email', name: 'email', label: 'E-mail smoke', required: true, width: 'half'},
        {blockType: 'tel', name: 'telephone', label: 'Téléphone smoke', width: 'half'},
        {blockType: 'select', name: 'metier', label: 'Métier smoke', width: 'half', options: [{label: 'Courtier', value: 'courtier'}, {label: 'Architecte', value: 'architecte'}]},
        {blockType: 'select', name: 'modules', label: 'Modules smoke', multiple: true, search: 'always', options: [{label: 'Chiffrage', value: 'chiffrage'}, {label: 'Métré', value: 'metre'}, {label: 'Devis', value: 'devis'}]},
        {blockType: 'stepBreak', title: 'Projet smoke'},
        {blockType: 'radio', name: 'taille', label: 'Taille smoke', required: true, options: [{label: 'Petite', value: 'petite'}, {label: 'Grande', value: 'grande'}]},
        {blockType: 'number', name: 'chantiers', label: 'Chantiers smoke', width: 'half'},
        {blockType: 'date', name: 'date', label: 'Date smoke', width: 'half'},
        {blockType: 'checkbox', name: 'rappel', label: 'Rappel smoke'},
        {blockType: 'textarea', name: 'projet', label: 'Projet texte smoke'},
        {blockType: 'message', message: doc('Message libre smoke.')},
        {blockType: 'stepBreak', title: 'Envoi smoke'},
        {blockType: 'consent', name: 'consentement', label: 'Consentement smoke', privacyLabel: 'Confidentialité smoke', privacyTarget: {kind: 'url', href: '/confidentialite'}},
      ],
    } as never,
  });
  const simple = await payload.create({
    collection: 'forms',
    data: {
      title: `Simple smoke ${stamp}`,
      submitButtonLabel: 'Valider smoke',
      confirmationType: 'message',
      confirmationMessage: doc('Merci simple smoke.'),
      fields: [
        {blockType: 'text', name: 'nom', label: 'Nom simple smoke', required: true},
        {blockType: 'email', name: 'email', label: 'E-mail simple smoke', required: true},
      ],
    } as never,
  });
  log(`forms created: ${steps.id}, ${simple.id}`);

  // a duplicate field name is refused
  try {
    await payload.create({collection: 'forms', data: {title: 'zz smoke doublon', fields: [{blockType: 'text', name: 'a', label: 'A'}, {blockType: 'email', name: 'a', label: 'B'}]} as never});
    check(false, 'duplicate field names: accepted, expected a validation error');
  } catch (e) {
    check(/unique|deux champs/.test(String((e as {data?: unknown}).data ? JSON.stringify((e as {data: unknown}).data) : e)), 'duplicate field names are refused');
  }

  // width rule: a form needs 4 columns
  try {
    const p = await payload.create({collection: 'pages', data: {title: 'Smoke', slug: `${slug}-narrow`, hero, sections: [section([[column(3, {blockType: 'form', form: simple.id}), column(9)]])]} as never});
    await payload.delete({collection: 'pages', id: p.id});
    check(false, 'form on 3 columns: accepted, expected a validation error');
  } catch {
    check(true, 'form on 3 columns is refused');
  }

  const page = await payload.create({
    collection: 'pages',
    data: {
      title: 'Smoke formulaires',
      slug,
      hero,
      sections: [
        section([
          [column(12, {blockType: 'form', form: steps.id, framed: true, showHeading: true})],
          [column(6, {blockType: 'form', form: simple.id, framed: false, showHeading: false}), column(6)],
          [column(4, {blockType: 'form', form: simple.id}), column(8)],
        ]),
      ],
    } as never,
  });
  log(`page created: ${page.id} (${slug})`);
  try {
    const listed = await payload.findByID({collection: 'forms', id: steps.id, depth: 0});
    check(listed.listTitle === 'Formulaire smoke', `list title without the span: « ${listed.listTitle} »`);
    const html = await (await fetch(`${BASE}/${slug}`)).text();
    for (const m of ['Modules smoke', 'Formulaire ', 'Chapô smoke du formulaire.', 'Contact smoke', 'Projet smoke', 'Envoi smoke', 'Prénom smoke', 'E-mail smoke', 'Téléphone smoke', 'Envoyer smoke', 'data-steps="3"', 'data-steps="1"', 'Nom simple smoke', 'Valider smoke', 'data-width="half"', 'company_website']) check(html.includes(m), `site renders « ${m} »`);
    check((html.match(/data-steps="1"/g) ?? []).length === 2, 'the simple form is rendered twice (6 and 4 columns)');
    check(!/Unhandled Runtime Error|Build Error/.test(html), 'site page without runtime error');

    // submissions
    const count = async (form: number) => (await payload.count({collection: 'form-submissions', where: {form: {equals: form}}})).totalDocs;
    const shown = Date.now() - 5000;
    const valid = {prenom: 'Priya', email: 'priya@exemple.fr', telephone: '06 12 34 56 78', metier: 'architecte', modules: ['chiffrage', 'devis'], taille: 'grande', chantiers: 12, date: '2026-10-01', rappel: true, projet: 'Projet smoke', consentement: true, intrus: 'ignoré'};
    const ok = await submitForm({formId: steps.id, values: valid, honeypot: '', startedAt: shown});
    check(ok.ok, 'a valid submission is accepted');
    const stored = (await payload.find({collection: 'form-submissions', where: {form: {equals: steps.id}}, limit: 1})).docs[0];
    const data = Object.fromEntries((stored?.submissionData ?? []).map((d) => [d.field, d.value]));
    check(data.prenom === 'Priya' && data.email === 'priya@exemple.fr' && data.metier === 'Architecte' && data.modules === 'Chiffrage, Devis' && data.taille === 'Grande' && data.chantiers === '12' && data.rappel === 'Oui' && data.consentement === 'Oui', `stored values ${JSON.stringify(data)}`);
    check(!('intrus' in data), 'an undeclared name is not stored');

    const missing = await submitForm({formId: steps.id, values: {...valid, prenom: '', taille: ''}, honeypot: '', startedAt: shown});
    check(!missing.ok && !!missing.errors?.prenom && !!missing.errors?.taille, 'missing required fields are refused');
    const noConsent = await submitForm({formId: steps.id, values: {...valid, consentement: false}, honeypot: '', startedAt: shown});
    check(!noConsent.ok && !!noConsent.errors?.consentement, 'an unticked consent is refused');
    const badEmail = await submitForm({formId: simple.id, values: {nom: 'X', email: 'pas-un-email'}, honeypot: '', startedAt: shown});
    check(!badEmail.ok && !!badEmail.errors?.email, 'a wrong email is refused');
    const bot = await submitForm({formId: simple.id, values: {nom: 'Bot', email: 'bot@exemple.fr'}, honeypot: 'https://spam', startedAt: shown});
    const fast = await submitForm({formId: simple.id, values: {nom: 'Pressé', email: 'vite@exemple.fr'}, honeypot: '', startedAt: Date.now()});
    check(bot.ok && fast.ok && (await count(simple.id)) === 0, 'honeypot and too fast: answered ok, nothing stored');
    check((await count(steps.id)) === 1, 'one submission stored in all');

    const rest = await fetch(`${BASE}/api/form-submissions`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({form: simple.id, submissionData: [{field: 'nom', value: 'REST'}]})});
    check(rest.status === 403 || rest.status === 401, `REST creation refused → ${rest.status}`);
  } finally {
    await payload.delete({collection: 'form-submissions', where: {form: {in: [steps.id, simple.id]}}});
    await payload.delete({collection: 'pages', id: page.id});
    for (const f of [steps, simple]) await payload.delete({collection: 'forms', id: f.id});
    log('submissions, page and forms deleted');
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

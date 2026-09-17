/**
 * Smoke test of the column blocks (pnpm smoke:sections): creates a throwaway page
 * holding every new block, checks that the site renders it and that the width rules
 * are enforced, then deletes the page. Never touches a real page. The dev server must
 * be running (pnpm dev).
 *   SMOKE_BASE: server address (default http://localhost:3000)
 */
import config from '@payload-config';
import {getPayload} from 'payload';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const slug = `zz-smoke-${Date.now()}`;

const steps = (n: number) => Array.from({length: n}, (_, i) => ({title: `Étape ${i + 1}`, text: 'Texte de l’étape.', duration: '5 min', checks: [{label: 'Point vérifié'}]}));
const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const section = (rows: ReturnType<typeof column>[][]) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', rows: rows.map((columns) => ({columns}))});
/** The page top the Pages collection requires. */
const hero = {variant: 'page-glow', title: 'Smoke'};

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };

  // 1 · width rules refused by the server
  const expectError = async (label: string, rows: ReturnType<typeof column>[][], pattern: RegExp) => {
    try {
      await payload.create({collection: 'pages', data: {title: 'Smoke (invalid)', slug: `${slug}-invalid`, hero, sections: [section(rows)]} as never});
      check(false, `${label}: accepted, expected a validation error`);
    } catch (e) {
      const details = ((e as {data?: {errors?: {path?: string; message?: string}[]}}).data?.errors ?? []).map((d) => `${d.path}: ${d.message}`).join(' | ');
      check(pattern.test(details), `${label}: refused with « ${details.slice(0, 160)} »`);
    }
  };
  await expectError('FAQ on 12 columns', [[column(12, {blockType: 'faq', items: [{question: 'Q ?', answer: 'R.'}]})]], /ne dépasse pas 9|must not exceed 9/);
  await expectError('3 steps on 6 columns', [[column(6, {blockType: 'processSteps', steps: steps(3)}), column(6)]], /accepte 2|holds 2/);
  await expectError('collection with 4 per view on 9 columns', [[column(9, {blockType: 'collection', layout: 'swipe', perView: '4', source: 'manual', items: [{blockType: 'testimonial', quote: 'A', name: 'A'}, {blockType: 'testimonial', quote: 'B', name: 'B'}]}), column(3)]], /accepte 3|holds 3/);
  await expectError('collection with mixed items', [[column(12, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'manual', items: [{blockType: 'testimonial', quote: 'A', name: 'A'}, {blockType: 'cardTitle', title: 'B'}]})]], /même type|same type/);
  await expectError('side-by-side collection with more latest case studies than visible', [[column(12, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'cases', casesLimit: 5})]], /pas plus d’éléments|no more items/);
  await expectError('side-by-side collection with more items than visible', [[column(12, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'manual', items: [1, 2, 3, 4].map((i) => ({blockType: 'testimonial', quote: `${i}`, name: `${i}`}))})]], /pas plus d’éléments|no more items/);
  await expectError('text box with display-1 on 3 columns', [[column(3, {blockType: 'textBox', title: 'T', titleTag: 'h2', titleSize: 'display-1'}), column(9)]], /demande 6 colonnes|needs 6 columns/);
  await expectError('5 tabs on 6 columns', [[column(6, {blockType: 'tabs', items: [1, 2, 3, 4, 5].map((i) => ({label: `Onglet ${i}`}))}), column(6)]], /accepte 4|holds 4/);
  await expectError('3 buttons on 6 columns', [[column(6, {blockType: 'buttonGroup', mode: 'spaced', buttons: [1, 2, 3].map((i) => ({label: `B${i}`, href: '#'}))}), column(6)]], /accepte 2|holds 2/);
  await expectError('stats band of 3 on 6 columns', [[column(6, {blockType: 'statsBand', items: [1, 2, 3].map((i) => ({value: `${i}`, label: `L${i}`}))}), column(6)]], /accepte 2|holds 2/);
  await expectError('tier on 6 columns', [[column(6, {blockType: 'plan', name: 'Pro', price: {value: '79'}, cta: {label: 'Go', href: '#'}, features: [{label: 'A'}]}), column(6)]], /ne dépasse pas 4|must not exceed 4/);

  // 2 · a valid throwaway page with every block
  // throwaway case studies for the case card and the « latest case studies » collection
  const caseCategory = await payload.create({collection: 'case-categories', data: {title: 'Catégorie sections smoke', slug: `zz-smoke-sections-cat-${Date.now()}`}});
  const caseA = await payload.create({collection: 'case-studies', data: {title: 'Réalisation sections smoke A', slug: `zz-smoke-sections-case-a-${Date.now()}`, category: caseCategory.id, publishedAt: new Date().toISOString(), sheet: {client: 'Client sections smoke', location: 'Lille', cardResult: 'Résultat sections smoke'}} as never});
  const caseB = await payload.create({collection: 'case-studies', data: {title: 'Réalisation sections smoke B', slug: `zz-smoke-sections-case-b-${Date.now()}`, category: caseCategory.id, publishedAt: new Date().toISOString(), sheet: {client: 'Autre client sections', results: [{value: '+9 %', label: 'Gain'}]}} as never});
  const page = await payload.create({
    collection: 'pages',
    data: {
      title: 'Smoke sections',
      slug,
      hero,
      sections: [
        section([
          [
            column(6, {blockType: 'priceSingle', features: [{label: 'Chiffrage en 20 min', end: '97 €'}], totalLabel: 'Valeur totale', totalValue: '529 €', price: {value: '79', period: 'par mois'}, cta: {label: 'Commencer', href: '#'}, mention: 'Sans CB', guarantee: {title: 'Garantie', text: 'Remboursé.'}}),
            column(6, {blockType: 'faq', mode: 'single', columns: '1', firstOpen: true, tag: 'h2', items: [{question: 'Question smoke ?', answer: 'Réponse smoke.'}]}),
          ],
          [
            column(4, {blockType: 'plan', name: 'Palier smoke', nameTag: 'h3', tagline: 'Accroche', price: {value: '49'}, featured: true, badge: 'Populaire', features: [{label: 'Un avantage'}], cta: {label: 'Choisir', href: '#'}}),
            column(4, {blockType: 'testimonial', quote: 'Citation smoke.', name: 'Témoin Smoke', role: 'Courtier · Lyon', result: '+ 28 %'}),
            column(4, {blockType: 'compareCard', chipLabel: 'APRÈS SMOKE', chipTone: 'high', quote: 'Voici le détail.', items: [{label: 'Le mandat est signé'}], tone: 'check', featured: true}),
          ],
          [column(8, {blockType: 'processSteps', tag: 'h4', steps: steps(2)}), column(4, {blockType: 'cardTitle', title: 'Carte smoke', tag: 'span'})],
          [column(4, {blockType: 'textBox', badges: [{label: 'Badge smoke', tone: 'high'}], title: 'Encart smoke', titleTag: 'h3', titleSize: 'heading-2', content: {root: {type: 'root', children: [{type: 'paragraph', children: [{type: 'text', text: 'Paragraphe smoke ', format: 0}, {type: 'text', text: 'gras', format: 1}]}, {type: 'list', listType: 'bullet', children: [{type: 'listitem', children: [{type: 'text', text: 'Puce smoke', format: 0}]}]}]}}, buttons: [{label: 'Bouton smoke', href: '#', shape: 'split', variant: 'high', size: 'lg'}], framed: true, center: true, vAlign: 'center'}), column(8, {blockType: 'textBox', titleSize: 'display-1', content: {root: {type: 'root', children: [{type: 'paragraph', children: [{type: 'text', text: 'Sans titre smoke', format: 0}]}]}}})],
          [column(6, {blockType: 'keyPoints', eyebrow: 'À retenir colonne smoke', content: {root: {type: 'root', children: [{type: 'list', listType: 'bullet', children: [{type: 'listitem', children: [{type: 'text', text: 'Point colonne smoke', format: 0}]}]}]}}}), column(6, {blockType: 'quoteCard', quote: 'Citation colonne smoke.', name: 'Témoin colonne smoke'})],
          [column(8, {blockType: 'statsBand', items: [{value: '−42 %', label: 'Chiffre colonne smoke'}, {value: '×3', label: 'Autre'}, {value: '48 h', label: 'Délai'}]}), column(4)],
          [column(12, {blockType: 'ctaBand', variant: 'arrow', title: 'Bandeau colonne smoke', button: {label: 'Aller', href: '#', shape: 'split', variant: 'high', size: 'md'}})],
          [column(12, {blockType: 'sectionHeading', eyebrow: 'Surtitre smoke', title: 'En-tête <span>smoke</span>', tag: 'h2', lead: 'Chapô en-tête smoke', align: 'center'})],
          [column(12, {blockType: 'buttonGroup', mode: 'attached', width: 'full', buttons: [{label: 'Groupe smoke 1', href: '#', shape: 'split', variant: 'primary'}, {label: 'Groupe smoke 2', href: '#', shape: 'simple', variant: 'ghost', iconKey: 'phone'}, {label: 'Groupe smoke 3', href: '#', shape: 'simple', variant: 'high'}, {label: 'Groupe smoke 4', href: '#', shape: 'split', variant: 'secondary'}]})],
          [column(6, {blockType: 'buttonGroup', mode: 'spaced', align: 'center', buttons: [{label: 'Espacé smoke 1', href: '#'}, {label: 'Espacé smoke 2', href: '#', shape: 'split', variant: 'high'}]}), column(6)],
          [column(8, {blockType: 'tabs', items: [1, 2, 3, 4, 5, 6].map((i) => ({label: `Onglet smoke ${i}`, content: {root: {type: 'root', children: [{type: 'paragraph', children: [{type: 'text', text: `Panneau smoke ${i}`, format: 0}]}]}}}))}), column(4)],
          [column(12, {blockType: 'collection', layout: 'carousel', perView: '3', step: 'page', indicator: 'dots', arrows: true, source: 'manual', items: Array.from({length: 14}, (_, k) => k + 1).map((i) => ({blockType: 'testimonial', quote: `Citation collection ${i}.`, name: `Témoin collection ${i}`}))})],
          [column(9, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'posts', postsLimit: 3, postsCta: 'Lire l’article'}), column(3)],
          [column(3, {blockType: 'caseCard', caseStudy: caseA.id}), column(9, {blockType: 'collection', layout: 'carousel', perView: '3', source: 'cases', casesLimit: 6, casesCategory: caseCategory.id, casesCta: 'Lire l’étude smoke'})],
          [column(8, {blockType: 'collection', layout: 'swipe', perView: '2', source: 'manual', items: [{blockType: 'caseCard', caseStudy: caseA.id}, {blockType: 'caseCard', caseStudy: caseB.id}]}), column(4)],
        ]),
      ],
    } as never,
  });
  log(`page created: ${page.id} (${slug})`);
  try {
    const html = await (await fetch(`${BASE}/${slug}`)).text();
    for (const marker of ['Valeur totale', 'Question smoke', 'Palier smoke', 'Témoin Smoke', 'APRÈS SMOKE', 'Étape 2', 'data-steps="2"', 'Témoin collection 14', 'data-layout="carousel"', 'Lire l’article', '<h2 class="Collapsible', '<h3 class="astryx-heading', '<h4 class="astryx-heading', '<span class="astryx-heading card', 'Encart smoke', '<strong>gras</strong>', 'Puce smoke', 'Bouton smoke', 'data-framed="true"', 'Sans titre smoke', 'Onglet smoke 6', 'Panneau smoke 6', 'role="tabpanel"', 'Groupe smoke 4', 'Espacé smoke 2', 'data-mode="attached"', 'data-mode="spaced"', 'À retenir colonne smoke', 'Point colonne smoke', 'Témoin colonne smoke', 'Chiffre colonne smoke', 'Bandeau colonne smoke', 'Surtitre smoke', 'Chapô en-tête smoke', 'Réalisation sections smoke A', 'Réalisation sections smoke B', 'Résultat sections smoke', 'Client sections smoke', 'Lire l’étude smoke', 'Voir l’étude', `/realisations/${caseA.slug}`]) check(html.includes(marker), `site renders « ${marker} »`);
    check(!/Unhandled Runtime Error|Build Error/.test(html), 'site page without runtime error');
  } finally {
    await payload.delete({collection: 'pages', id: page.id});
    for (const c of [caseA, caseB]) await payload.delete({collection: 'case-studies', id: c.id});
    await payload.delete({collection: 'case-categories', id: caseCategory.id});
    log(`page, case studies and case category deleted: ${page.id}`);
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

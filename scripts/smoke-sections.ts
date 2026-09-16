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
  await expectError('side-by-side collection with more items than visible', [[column(12, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'manual', items: [1, 2, 3, 4].map((i) => ({blockType: 'testimonial', quote: `${i}`, name: `${i}`}))})]], /pas plus d’éléments|no more items/);
  await expectError('tier on 6 columns', [[column(6, {blockType: 'plan', name: 'Pro', price: {value: '79'}, cta: {label: 'Go', href: '#'}, features: [{label: 'A'}]}), column(6)]], /ne dépasse pas 4|must not exceed 4/);

  // 2 · a valid throwaway page with every block
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
            column(4, {blockType: 'plan', name: 'Palier smoke', tagline: 'Accroche', price: {value: '49'}, featured: true, badge: 'Populaire', features: [{label: 'Un avantage'}], cta: {label: 'Choisir', href: '#'}}),
            column(4, {blockType: 'testimonial', quote: 'Citation smoke.', name: 'Témoin Smoke', role: 'Courtier · Lyon', result: '+ 28 %'}),
            column(4, {blockType: 'compareCard', chipLabel: 'APRÈS SMOKE', chipTone: 'high', quote: 'Voici le détail.', items: [{label: 'Le mandat est signé'}], tone: 'check', featured: true}),
          ],
          [column(8, {blockType: 'processSteps', steps: steps(2)}), column(4)],
          [column(12, {blockType: 'collection', layout: 'carousel', perView: '3', step: 'page', indicator: 'dots', arrows: true, source: 'manual', items: [1, 2, 3, 4].map((i) => ({blockType: 'testimonial', quote: `Citation collection ${i}.`, name: `Témoin collection ${i}`}))})],
          [column(9, {blockType: 'collection', layout: 'swipe', perView: '3', source: 'posts', postsLimit: 3, postsCta: 'Lire l’article'}), column(3)],
        ]),
      ],
    } as never,
  });
  log(`page created: ${page.id} (${slug})`);
  try {
    const html = await (await fetch(`${BASE}/${slug}`)).text();
    for (const marker of ['Valeur totale', 'Question smoke', 'Palier smoke', 'Témoin Smoke', 'APRÈS SMOKE', 'Étape 2', 'data-steps="2"', 'Témoin collection 4', 'data-layout="carousel"', 'Lire l’article', '<h2 class="Collapsible']) check(html.includes(marker), `site renders « ${marker} »`);
    check(!/Unhandled Runtime Error|Build Error/.test(html), 'site page without runtime error');
  } finally {
    await payload.delete({collection: 'pages', id: page.id});
    log(`page deleted: ${page.id}`);
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

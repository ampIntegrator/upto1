/**
 * Demo pages of the column blocks (pnpm seed:demo): three lorem ipsum pages that use
 * every new block at several widths, with Unsplash images imported into the media
 * library. Re-runnable: the demo pages (slugs demo-*) are deleted and recreated, the
 * images are imported once (by file name). Real pages are never touched.
 */
import config from '@payload-config';
import {mkdtemp, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {getPayload} from 'payload';

const UNSPLASH: {name: string; id: string; alt: string}[] = [
  {name: 'demo-chantier.jpg', id: '1504307651254-35680f356dfd', alt: 'Chantier de construction'},
  {name: 'demo-bureau.jpg', id: '1497366216548-37526070297c', alt: 'Bureau lumineux'},
  {name: 'demo-immeuble.jpg', id: '1486406146926-c627a92ad1ab', alt: 'Façade d’immeuble'},
  {name: 'demo-analyse.jpg', id: '1460925895917-afdab827c52f', alt: 'Analyse de données'},
  {name: 'demo-architecture.jpg', id: '1503387762-592deb58ef4e', alt: 'Architecture contemporaine'},
];

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const LOREM_2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const LOREM_LONG = `${LOREM}\n\n${LOREM_2} Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const row = (...columns: ReturnType<typeof column>[]) => ({columns});
type Row = ReturnType<typeof row>;
const light = (rows: Row[], extra: Record<string, unknown> = {}) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', ...extra, rows});
const dark = (rows: Row[], extra: Record<string, unknown> = {}) => ({blockType: 'section', mode: 'dark', darkStyle: 'night-halo', ...extra, rows});
const mediaBg = (image: number, rows: Row[]) => ({blockType: 'section', mode: 'media', mediaType: 'image', image, overlay: 0.5, rows});

const doc = (...paragraphs: string[]) => ({root: {type: 'root', children: paragraphs.map((p) => ({type: 'paragraph', children: [{type: 'text', text: p, format: 0}]}))}});
const text = (t = LOREM_LONG) => ({blockType: 'textBox', title: 'Lorem ipsum dolor', titleTag: 'h2', titleSize: 'heading-1', content: doc(...t.split('\n\n')), buttons: [{label: 'En savoir plus', href: '#', shape: 'split', variant: 'primary', size: 'md'}]});
const textBox = (opts: Record<string, unknown>) => ({blockType: 'textBox', badges: [{label: 'Nouveau', tone: 'high'}, {label: 'Chiffrage', tone: 'line'}], title: 'Le chiffrage juste, en 20 minutes', titleTag: 'h2', titleSize: 'display-3', content: {root: {type: 'root', children: [{type: 'paragraph', children: [{type: 'text', text: `${LOREM} `, format: 0}, {type: 'text', text: 'Consectetur adipiscing elit', format: 1}, {type: 'text', text: '. ', format: 0}, {type: 'link', fields: {url: '#', linkType: 'custom'}, children: [{type: 'text', text: 'Dolore magna aliqua', format: 0}]}, {type: 'text', text: '.', format: 0}]}, {type: 'list', listType: 'bullet', children: ['Chiffrage en 20 min', 'Rapport expert BTP', 'Note de calcul'].map((l) => ({type: 'listitem', children: [{type: 'text', text: l, format: 0}]}))}, {type: 'list', listType: 'number', children: ['Vous décrivez', 'Vous recevez', 'Vous signez'].map((l) => ({type: 'listitem', children: [{type: 'text', text: l, format: 0}]}))}]}}, buttons: [{label: 'Commencer', href: '#', shape: 'split', variant: 'primary', size: 'md'}, {label: 'En savoir plus', href: '#', shape: 'simple', variant: 'ghost', size: 'md'}], ...opts});
const media = (image: number, minHeight = '320') => ({blockType: 'media', image, minHeight, minHeightMobile: '240', overlay: 0});
const mediaQuote = (image: number) => ({blockType: 'mediaQuote', image, text: 'Lorem ipsum dolor sit amet.', tag: 'h2', size: 'display-2', minHeight: '400', minHeightMobile: '240', overlay: 0.45});
const cardTitle = (title: string) => ({blockType: 'cardTitle', title, text: LOREM});
const cardImage = (image: number, title: string) => ({blockType: 'cardImage', image, title, text: LOREM});
const features = (n: number, end = false) => Array.from({length: n}, (_, i) => ({label: `Lorem ipsum ${i + 1} dolor sit amet`, end: end ? `${47 + i * 10} €` : undefined}));
const guarantee = {title: 'Garantie 30 jours', text: 'Lorem ipsum dolor sit amet ? Consectetur. Sans questions.'};
const priceSingle = () => ({blockType: 'priceSingle', featuresLabel: 'Ce que vous obtenez', features: features(6, true), totalLabel: 'Valeur totale', totalValue: '529 € / mois', priceLabel: 'Votre prix', price: {value: '79', currency: '€', period: 'par mois · soit 2,60 € / jour'}, cta: {label: 'Commencer gratuitement', href: '#'}, mention: '1er lorem offert · Sans CB · Sans engagement', guarantee});
const plan = (name: string, value: string, opts: {featured?: boolean; inherits?: string} = {}) => ({blockType: 'plan', name, tagline: `Lorem ipsum ${name.toLowerCase()}`, price: {value, currency: '€', period: '/ mois'}, featured: Boolean(opts.featured), badge: opts.featured ? 'Populaire' : undefined, inherits: opts.inherits, featuresLabel: 'Ce que vous obtenez', features: features(4), cta: {label: 'Commencer', href: '#'}, mention: 'Sans CB · Sans engagement', guarantee});
const faq = (n: number, columns: '1' | '2' = '1') => ({blockType: 'faq', mode: 'single', columns, firstOpen: true, items: Array.from({length: n}, (_, i) => ({question: `Lorem ipsum dolor sit amet ${i + 1} ?`, answer: LOREM_LONG}))});
const testimonial = (name: string, result?: string) => ({blockType: 'testimonial', quote: `${LOREM} ${LOREM_2}`, name, role: 'Courtier · Lyon', result});
const compare = (label: string, tone: 'danger' | 'high', check: 'check' | 'cross', featured = false) => ({blockType: 'compareCard', chipLabel: label, chipTone: tone, meta: featured ? '20 min chrono' : '3 semaines', quote: `« ${LOREM} »`, items: Array.from({length: 4}, (_, i) => ({label: `Lorem ipsum ${i + 1} dolor sit amet`})), tone: check, featured});
const collection = (items: Record<string, unknown>[], opts: Record<string, unknown> = {}) => ({blockType: 'collection', layout: 'carousel', perView: '3', step: 'page', indicator: 'segments', arrows: true, source: 'manual', items, ...opts});
const btn = (label: string, variant: string, extra: Record<string, unknown> = {}) => ({label, href: '#', shape: 'simple', variant, size: 'md', ...extra});
const buttonGroup = (buttons: Record<string, unknown>[], opts: Record<string, unknown> = {}) => ({blockType: 'buttonGroup', mode: 'spaced', width: 'natural', align: 'start', buttons, ...opts});
const TAB_LABELS = ['Le standard se perd en route', 'Le reporting est introuvable', 'Les pannes deviennent des incidents', 'La refacturation tourne mal', 'Les délais d’intervention glissent', 'Les devis restent sans réponse', 'Les sites ne se comparent pas', 'Le budget dérive sans alerte'];
const tabs = (n: number) => ({blockType: 'tabs', items: TAB_LABELS.slice(0, n).map((label, i) => ({label, content: {root: {type: 'root', children: [{type: 'paragraph', children: [{type: 'text', text: `${LOREM} `, format: 0}, {type: 'text', text: `Situation ${i + 1}`, format: 1}, {type: 'text', text: `. ${LOREM_2}`, format: 0}]}, {type: 'list', listType: 'bullet', children: ['Chiffrage en 20 min', 'Rapport expert BTP', 'Note de calcul'].map((l) => ({type: 'listitem', children: [{type: 'text', text: l, format: 0}]}))}]}}}))});
const steps = (n: number) => ({blockType: 'processSteps', steps: Array.from({length: n}, (_, i) => ({title: `Lorem ${i + 1}`, text: LOREM, duration: `${5 * (i + 1)} min`, checks: [{label: 'Lorem ipsum dolor'}, {label: 'Sit amet consectetur'}], asterisk: i === n - 1}))});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);

  // 1 · images: imported once, found by file name afterwards
  const dir = await mkdtemp(path.join(tmpdir(), 'demo-'));
  const img: number[] = [];
  for (const u of UNSPLASH) {
    const found = await payload.find({collection: 'media', where: {filename: {equals: u.name}}, limit: 1});
    if (found.docs.length) {
      img.push(found.docs[0].id);
      continue;
    }
    const res = await fetch(`https://images.unsplash.com/photo-${u.id}?auto=format&fit=crop&w=1600&q=80`);
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) throw new Error(`Unsplash ${u.id}: ${res.status}`);
    const file = path.join(dir, u.name);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    const doc = await payload.create({collection: 'media', data: {alt: u.alt}, filePath: file});
    img.push(doc.id);
    log(`image importée : ${u.name}`);
  }
  const [chantier, bureau, immeuble, analyse, archi] = img;

  // 2 · the three pages
  const pages = [
    {
      slug: 'demo-tarifs',
      title: 'Démo · tarifs',
      sections: [
        light([row(column(9, text()), column(3)), row(column(3, plan('Solo', '49')), column(3, plan('Pro', '79', {featured: true, inherits: 'Solo'})), column(3, plan('Agence', '149', {inherits: 'Pro'})), column(3, plan('Réseau', '299', {inherits: 'Agence'})))], {anchor: 'quatre-paliers'}),
        light([row(column(4, plan('Solo', '49')), column(4, plan('Pro', '79', {featured: true, inherits: 'Solo'})), column(4, plan('Agence', '149', {inherits: 'Pro'})))], {tint: 'highlight', texture: 'dots'}),
        light([row(column(6, priceSingle()), column(6, media(bureau, '480'))), row(column(9, priceSingle()), column(3, testimonial('Sophie M.', '+ 28 %'))), row(column(2), column(8, priceSingle()), column(2))]),
        dark([row(column(4, plan('Solo', '49')), column(4, plan('Pro', '79', {featured: true, inherits: 'Solo'})), column(4, plan('Agence', '149', {inherits: 'Pro'}))), row(column(6, priceSingle()), column(6, faq(4)))]),
      ],
    },
    {
      slug: 'demo-contenus',
      title: 'Démo · FAQ, témoignages, comparatif',
      sections: [
        light([row(column(8, faq(5)), column(4, media(immeuble, '400'))), row(column(6, faq(4, '2')), column(6, compare('APRÈS', 'high', 'check', true))), row(column(9, faq(6, '2')), column(3, cardTitle('Lorem ipsum')))]),
        light([row(column(4, testimonial('Sophie M.', '+ 28 %')), column(4, testimonial('Karim B.')), column(4, testimonial('Léa D.', '+ 12 000 € / trimestre'))), row(column(3, testimonial('Marc P.')), column(3, testimonial('Inès R.', '× 2')), column(3, testimonial('Paul V.')), column(3, testimonial('Nora K.', '+ 34 %')))], {tint: 'highlight', texture: 'grid'}),
        light([row(column(6, compare('AVANT', 'danger', 'cross')), column(6, compare('APRÈS', 'high', 'check', true))), row(column(4, compare('COURTIER', 'high', 'check')), column(4, compare('AGENT', 'high', 'check', true)), column(4, compare('PROMOTEUR', 'high', 'check'))), row(column(3, compare('A', 'high', 'check')), column(3, compare('B', 'danger', 'cross')), column(3, compare('C', 'high', 'check', true)), column(3, compare('D', 'high', 'check')))]),
        dark([row(column(4, testimonial('Sophie M.', '+ 28 %')), column(4, testimonial('Karim B.')), column(4, testimonial('Léa D.'))), row(column(6, compare('AVANT', 'danger', 'cross')), column(6, compare('APRÈS', 'high', 'check', true)))]),
        light([
          row(column(12, collection(['Sophie M.', 'Karim B.', 'Léa D.', 'Marc P.', 'Inès R.', 'Paul V.', 'Nora K.'].map((n, i) => testimonial(n, i % 2 ? undefined : '+ 28 %'))))),
          row(column(12, collection(Array.from({length: 8}, (_, i) => cardImage([chantier, bureau, immeuble, analyse][i % 4], `Carte ${i + 1}`)), {perView: '4', indicator: 'dots', step: 'item'}))),
          row(column(8, collection(['COURTIER', 'AGENT', 'PROMOTEUR'].map((l, i) => compare(l, 'high', 'check', i === 1)), {layout: 'swipe'})), column(4, text())),
          row(column(12, collection([], {source: 'posts', postsLimit: 6, postsCta: 'Lire l’article', indicator: 'numbers'}))),
        ], {anchor: 'collections'}),
        light([
          row(column(6, tabs(4)), column(6, media(bureau, '400'))),
          row(column(8, tabs(6)), column(4, testimonial('Sophie M.', '+ 28 %'))),
          row(column(12, tabs(8))),
          row(column(2), column(8, faq(4)), column(2)),
        ], {anchor: 'onglets', tint: 'highlight'}),
        light([
          row(column(12, buttonGroup([btn('Particuliers', 'secondary', {iconKey: 'home'}), btn('Professionnels', 'secondary', {iconKey: 'calculator'}), btn('Collectivités', 'secondary', {iconKey: 'building'}), btn('Nous appeler', 'secondary', {iconKey: 'phone'})], {mode: 'attached', align: 'center'}))),
          row(column(12, buttonGroup([btn('Commencer', 'primary', {shape: 'split'}), btn('Tarifs', 'high'), btn('Nous appeler', 'ghost', {iconKey: 'phone'}), btn('Documentation', 'secondary', {shape: 'split'})], {width: 'full'}))),
          row(column(8, buttonGroup([btn('Demander une démo', 'primary', {shape: 'split', size: 'lg'}), btn('Voir les tarifs', 'high', {shape: 'split', size: 'lg'})], {mode: 'attached'})), column(4, textBox({titleSize: 'heading-2', titleTag: 'h3', badges: [], buttons: [], title: 'Deux boutons collés'}))),
          row(column(6, buttonGroup([btn('Commencer', 'primary', {shape: 'split'}), btn('En savoir plus', 'ghost')], {align: 'center'})), column(6, buttonGroup([btn('Commencer', 'primary', {shape: 'split'}), btn('En savoir plus', 'ghost')], {width: 'full'}))),
        ], {anchor: 'boutons'}),
        light([row(column(12, mediaQuote(analyse)))]),
      ],
    },
    {
      slug: 'demo-etapes',
      title: 'Démo · étapes et images',
      sections: [
        light([row(column(12, steps(4))), row(column(8, steps(3)), column(4, cardImage(chantier, 'Lorem ipsum'))), row(column(6, steps(2)), column(6, steps(2))), row(column(4, steps(1)), column(4, steps(1)), column(4, steps(1))), row(column(7, steps(2)), column(5, steps(1)))]),
        mediaBg(archi, [row(column(6, steps(2)), column(6, media(analyse, '320')))]),
        light([row(column(9, steps(3)), column(3, testimonial('Sophie M.', '+ 28 %'))), row(column(4, media(chantier)), column(4, media(bureau)), column(4, media(immeuble))), row(column(6, mediaQuote(archi)), column(6, text()))], {texture: 'losange'}),
        light([
          row(column(6, textBox({framed: true})), column(6, textBox({center: true, titleSize: 'heading-1', titleTag: 'h3'}))),
          row(column(3, textBox({framed: true, titleSize: 'heading-2', titleTag: 'h4', badges: [], buttons: [{label: 'Voir', href: '#', shape: 'simple', variant: 'secondary', size: 'md'}]})), column(4, media(analyse, '480')), column(5, textBox({vAlign: 'center', titleSize: 'heading-1'}))),
          row(column(9, textBox({framed: true, center: true, titleSize: 'display-2', buttons: [{label: 'Démarrer', href: '#', shape: 'split', variant: 'high', size: 'lg'}]})), column(3)),
        ], {anchor: 'encarts'}),
        dark([row(column(6, textBox({framed: true})), column(6, textBox({center: true, vAlign: 'end', titleSize: 'display-3'})))]),
      ],
    },
  ];
  for (const p of pages) {
    const existing = await payload.find({collection: 'pages', where: {slug: {equals: p.slug}}, limit: 5});
    for (const doc of existing.docs) await payload.delete({collection: 'pages', id: doc.id});
    await payload.create({collection: 'pages', data: {title: p.title, slug: p.slug, hero: {variant: 'page-glow', eyebrow: 'Démo', title: p.title, lead: LOREM, breadcrumbMode: 'hide'}, sections: p.sections} as never});
    log(`page « ${p.slug} » ${existing.docs.length ? 'recréée' : 'créée'} : http://localhost:3000/${p.slug}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

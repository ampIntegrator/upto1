/**
 * Demo pages of the column blocks (pnpm seed:demo): three lorem ipsum pages that use
 * every new block at several widths, with Unsplash images imported into the media
 * library. Re-runnable: the demo pages (slugs demo-*) are deleted and recreated, the
 * images are imported once (by file name). Real pages are never touched.
 * Blog: a demo author (« Marie Lefebvre ») and a demo post using every prose element and figure
 * (slug demo-industrialiser-le-cycle-commercial), recreated too. The blog page itself is chosen in
 * Blog › Réglages du blog: this script never changes the settings.
 * Case studies: the « Vasseur Construction » case study of mockup 23 (slug demo-vasseur-construction)
 * in a « Rénovation » category (created once), recreated too; the case studies page is chosen in
 * Réalisations › Réglages des réalisations.
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
  // 3 · blog: a demo author and a demo post (every prose element and figure)
  const tx = (text: string, format = 0) => ({type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1});
  const el = (type: string, children: object[], extra: object = {}) => ({type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra});
  const para = (...children: object[]) => el('paragraph', children, {textFormat: 0, textStyle: ''});
  const head = (tag: string, text: string) => el('heading', [tx(text)], {tag});
  const item = (value: number, ...children: object[]) => el('listitem', children, {value});
  const list = (type: 'bullet' | 'number', items: object[][]) => el('list', items.map((c, i) => item(i + 1, ...c)), {listType: type, start: 1, tag: type === 'bullet' ? 'ul' : 'ol'});
  const fig = (fields: Record<string, unknown>) => ({type: 'block', version: 2, format: '', fields: {id: `demo${Math.random().toString(16).slice(2, 10)}`, blockName: '', ...fields}});
  const cell = (text: string, headerState = 0) => el('tablecell', [para(tx(text))], {headerState, colSpan: 1, rowSpan: 1, backgroundColor: null});
  const rowOf = (cells: string[], header = false) => el('tablerow', cells.map((c) => cell(c, header ? 1 : 0)));

  const authorFound = await payload.find({collection: 'authors', where: {name: {equals: 'Marie Lefebvre'}}, limit: 1});
  const author = authorFound.docs[0] ?? (await payload.create({collection: 'authors', data: {name: 'Marie Lefebvre', role: 'Responsable produit · Vidomia', photo: bureau} as never}));
  const category = (await payload.find({collection: 'categories', where: {slug: {equals: 'chiffrage'}}, limit: 1})).docs[0] ?? (await payload.find({collection: 'categories', limit: 1})).docs[0];
  const postSlug = 'demo-industrialiser-le-cycle-commercial';
  const oldPosts = await payload.find({collection: 'posts', where: {slug: {equals: postSlug}}, limit: 5});
  for (const doc of oldPosts.docs) await payload.delete({collection: 'posts', id: doc.id});
  const content = {
    root: el('root', [
      head('h2', 'Le cycle commercial, ce maillon qui fuit'),
      para(tx('Entre l’estimation envoyée et le paiement encaissé, le temps se perd en '), tx('ressaisies', 1), tx(', en relances et en allers-retours. Chaque étape '), tx('isolée', 2), tx(' fonctionne ; c’est la chaîne qui casse.')),
      head('h3', 'Là où le temps se perd'),
      list('bullet', [[tx('Le devis part en retard, faute de métré')], [tx('La relance dépend de la mémoire du commercial')], [tx('La facture ressaisit ce que le devis savait déjà')]]),
      el('quote', [tx('« On ne pilote bien que ce qu’on rend visible. »'), {type: 'linebreak', version: 1}, tx('— Marie Lefebvre, responsable produit')]),
      fig({blockType: 'statsBand', items: [{value: '−68 %', label: 'Temps de chiffrage'}, {value: '×2,4', label: 'Devis envoyés'}, {value: '+31 %', label: 'Taux de signature'}, {value: '48 h', label: 'Délai d’envoi'}]}),
      head('h2', 'Trois leviers d’industrialisation'),
      list('number', [[tx('Standardiser le devis', 1), tx(' : un modèle unique, des postes pré-chiffrés.')], [tx('Automatiser la relance', 1), tx(' : J+3, J+7, J+15, sans y penser.')], [tx('Relier devis et facture', 1), tx(' : la donnée saisie une fois circule jusqu’au paiement.')]]),
      el('table', [rowOf(['Levier', 'Effort', 'Gain de temps', 'Délai de retour'], true), rowOf(['Devis standardisé', 'Faible', '−35 %', '2 sem.']), rowOf(['Relance automatisée', 'Faible', '−48 %', '1 sem.']), rowOf(['Devis → facture reliés', 'Moyen', '−21 %', '6 sem.'])]),
      fig({blockType: 'keyPoints', eyebrow: 'À retenir', content: {root: el('root', [list('bullet', [[tx('Le gain le plus rapide vient de la '), tx('relance automatisée', 1), tx('.')], [tx('Une donnée saisie deux fois finira par diverger.')], [tx('Mesurez le '), tx('délai devis → facture', 1), tx(' avant tout autre indicateur.')]])])}}),
      fig({blockType: 'ctaBand', variant: 'icon', iconKey: 'calculator', title: 'Estimez votre gain de temps', text: 'Quelques chiffres suffisent pour projeter l’impact sur votre cycle commercial.', button: {label: 'Lancer le calcul', href: '#', shape: 'split', variant: 'high', size: 'md'}}),
      head('h2', 'Sur le terrain'),
      para(tx('Six mois après la bascule, le métreur n’est plus un goulot mais un chef d’orchestre : il valide, ajuste, arbitre.')),
      {type: 'upload', version: 3, format: '', relationTo: 'media', value: chantier, fields: {caption: 'Métré automatique sur plans, chantier de Nantes.'}},
      fig({blockType: 'quoteCard', quote: '« En six semaines, on a transformé notre point faible en avantage commercial. »', name: 'Julien Vasseur', role: 'Gérant · Vasseur Construction', photo: immeuble}),
      fig({blockType: 'gallery', images: [{image: archi}, {image: analyse}, {image: bureau}], wideFirst: true, caption: 'Du plan au devis, en une journée.'}),
      head('h4', 'Pour aller plus loin'),
      fig({blockType: 'ctaBand', variant: 'arrow', title: 'Lire le guide du chiffrage en visite', button: {label: 'En savoir plus', href: '#', shape: 'split', variant: 'high', size: 'md'}}),
    ]),
  };
  await payload.create({
    collection: 'posts',
    data: {title: 'Du devis à la facturation : <span>industrialiser</span> le cycle commercial', slug: postSlug, excerpt: 'Entre l’estimation envoyée et le paiement encaissé, le temps se perd. Méthode en trois leviers, chiffres à l’appui.', cover: analyse, coverCaption: 'Un cycle commercial piloté de bout en bout.', author: author.id, category: category?.id, publishedAt: new Date().toISOString(), content} as never,
  });
  const blogSettings = await payload.findGlobal({slug: 'blog', depth: 1});
  const blogPage = blogSettings.page && typeof blogSettings.page === 'object' ? blogSettings.page.slug : null;
  log(blogPage ? `article de démo : http://localhost:3000/${blogPage}/${postSlug}` : 'article de démo créé ; choisissez la page du blog dans Blog › Réglages du blog pour le voir');

  // 4 · case studies: the « Vasseur Construction » case study of mockup 23, in a « Rénovation » category
  const renovation = (await payload.find({collection: 'case-categories', where: {slug: {equals: 'renovation'}}, limit: 1})).docs[0] ?? (await payload.create({collection: 'case-categories', data: {title: 'Rénovation', slug: 'renovation'}}));
  const caseSlug = 'demo-vasseur-construction';
  const oldCases = await payload.find({collection: 'case-studies', where: {slug: {equals: caseSlug}}, limit: 5});
  for (const doc of oldCases.docs) await payload.delete({collection: 'case-studies', id: doc.id});
  const story = {
    root: el('root', [
      para(tx('Vasseur Construction signe une centaine de chantiers par an, de la rénovation énergétique au gros œuvre. Mais derrière chaque affaire signée, un même goulot d’étranglement : le chiffrage. Récit d’un déploiement qui a déverrouillé tout le cycle commercial.')),
      head('h2', 'Le contexte : un seul métreur, cent chantiers'),
      para(tx('Comme beaucoup d’entreprises de sa taille, Vasseur reposait sur l’expérience d’un unique métreur pour estimer l’ensemble de ses chantiers. Quand les demandes s’accumulaient, les devis partaient en retard, et les '), tx('meilleures affaires filaient chez le concurrent le plus réactif', 1), tx('.')),
      list('bullet', [[tx('Un seul métreur expérimenté pour toute l’agence')], [tx('Trois jours de délai moyen entre la visite et le devis')], [tx('Près d’une affaire sur quatre perdue, faute de réactivité')]]),
      el('quote', [tx('« On perdait des chantiers non pas sur le prix, mais sur le délai. Le premier qui chiffre, c’est souvent celui qui signe. »'), {type: 'linebreak', version: 1}, tx('— Julien Vasseur, gérant, Vasseur Construction')]),
      head('h2', 'L’approche : industrialiser sans dénaturer'),
      para(tx('L’enjeu n’était pas de remplacer le savoir-faire du métreur, mais de le '), tx('démultiplier', 2), tx('. Plutôt que d’imposer une nouvelle bibliothèque de prix, Orbita a repris celle de Vasseur, pour que l’équipe retrouve ses repères dès le premier devis.')),
      head('h2', 'Le déploiement, étape par étape'),
      para(tx('Inutile de tout changer d’un coup. Le déploiement s’est fait en six semaines, levier après levier, sans interrompre l’activité :')),
      list('number', [[tx('Reprise de la bibliothèque de prix', 1), tx(' existante, telle quelle.')], [tx('Paramétrage des ouvrages types', 1), tx(' les plus fréquents.')], [tx('Métré automatique', 1), tx(' connecté aux plans PDF et DWG.')], [tx('Formation de l’équipe', 1), tx(' en deux demi-journées.')], [tx('Bascule progressive', 1), tx(', chantier par chantier.')]]),
      fig({blockType: 'statsBand', items: [{value: '−68 %', label: 'Temps de chiffrage'}, {value: '×2,4', label: 'Devis envoyés / mois'}, {value: '+31 %', label: 'Taux de signature'}, {value: '48 h', label: 'Délai moyen d’envoi'}]}),
      head('h2', 'Sur le terrain'),
      para(tx('Six mois après la bascule, le métreur n’est plus un goulot mais un chef d’orchestre : il valide, ajuste, arbitre, pendant que les estimations courantes sortent en quelques heures.')),
      fig({blockType: 'gallery', images: [{image: chantier}, {image: archi}, {image: immeuble}], wideFirst: true, caption: 'Chantiers chiffrés avec Orbita (Nantes, 2025).'}),
      fig({blockType: 'keyPoints', eyebrow: 'À retenir', content: {root: el('root', [list('bullet', [[tx('Le gain le plus net vient du '), tx('métré automatique', 1), tx(', pas du calcul de prix.')], [tx('Une bibliothèque de prix reprise '), tx('telle quelle', 1), tx(' = adoption immédiate.')], [tx('Mesurez le '), tx('délai visite → devis', 1), tx(' avant tout autre indicateur.')]])])}}),
      head('h2', 'Les résultats, six mois après'),
      para(tx('Le délai moyen d’envoi d’un devis est passé de trois jours à moins de quarante-huit heures. Le volume de devis émis a plus que doublé, sans embauche. Et le taux de transformation a grimpé de près d’un tiers.')),
      fig({blockType: 'quoteCard', quote: '« En six semaines, on a transformé notre point faible en avantage commercial. Aujourd’hui, on répond plus vite que tout le monde, et ça se voit sur le carnet de commandes. »', name: 'Julien Vasseur', role: 'Gérant · Vasseur Construction', photo: immeuble}),
      head('h2', 'Conclusion'),
      para(tx('Industrialiser le chiffrage ne consiste pas à retirer l’humain de l’équation, mais à le placer là où il crée le plus de valeur.')),
    ]),
  };
  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'Comment Vasseur Construction a <span>divisé par trois</span> son temps de chiffrage',
      slug: caseSlug,
      excerpt: 'Estimer un chantier de rénovation prenait jusqu’à trois jours. En six semaines, l’équipe a ramené ce délai à quelques heures, sans embaucher, sans rogner sur la précision.',
      cover: archi,
      category: renovation.id,
      publishedAt: new Date().toISOString(),
      content: story,
      sheet: {
        client: 'Vasseur Construction', clientUrl: 'https://example.com', location: 'Nantes (44)', deployment: '6 semaines · mars 2025', modules: 'Chiffrage instantané, métré automatique, devis client',
        results: [{value: '−68 %', label: 'Temps de chiffrage'}, {value: '×2,4', label: 'Devis envoyés'}],
        cardResult: '−68 % délai',
      },
    } as never,
  });
  const portfolio = await payload.findGlobal({slug: 'portfolio', depth: 1});
  const casesPage = portfolio.page && typeof portfolio.page === 'object' ? portfolio.page.slug : null;
  log(casesPage ? `réalisation de démo : http://localhost:3000/${casesPage}/${caseSlug}` : 'réalisation de démo créée ; choisissez la page des réalisations dans Réalisations › Réglages des réalisations pour la voir');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

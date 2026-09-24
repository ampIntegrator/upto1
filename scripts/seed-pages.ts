/**
 * Five content pages in lorem ipsum (pnpm seed:pages), to judge the rendering of real pages rather
 * than catalogues: Solutions, its two sub-pages Chiffrage and Suivi de chantier (nested addresses),
 * À propos and Contact. Each has its own page top (page glow, full-screen image, split, page image,
 * page night) and 4 to 7 sections mixing backgrounds (light, highlight, textures, night, image),
 * row layouts and column components: section headings, text boxes, media, cards, steps, tabs,
 * testimonials, compare cards, price, FAQ, carousels fed by the blog and the case studies, forms,
 * button groups. No post figure (key points, stats band, quote card, gallery, call-to-action band):
 * they belong to posts and case studies only (24 Sept. 2026).
 * Titles with a serif accent (`<span>`): section headings, page tops and forms only; text boxes and
 * quotes on images take plain titles.
 * Safe to re-run: missing pages are created, existing ones are left alone unless `--replace` is given
 * (then only these five slugs are rebuilt, children first). Images come from the media library
 * (seed:content), forms from seed:demo.
 */
import config from '@payload-config';
import {getPayload} from 'payload';

const REPLACE = process.argv.includes('--replace');

const L1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const L2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const L3 = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

// Lexical
const tx = (text: string, format = 0) => ({type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1});
const el = (type: string, children: object[], extra: object = {}) => ({type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra});
const para = (...children: object[]) => el('paragraph', children, {textFormat: 0, textStyle: ''});
const list = (type: 'bullet' | 'number', items: string[]) => el('list', items.map((t, i) => el('listitem', [tx(t)], {value: i + 1})), {listType: type, start: 1, tag: type === 'bullet' ? 'ul' : 'ol'});
const rich = (...nodes: object[]) => ({root: el('root', nodes)});

// grid
const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const row = (...columns: ReturnType<typeof column>[]) => ({columns});
type Row = ReturnType<typeof row>;
const light = (rows: Row[], extra: Record<string, unknown> = {}) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', ...extra, rows});
const dark = (rows: Row[], style: 'night' | 'night-halo' = 'night-halo', extra: Record<string, unknown> = {}) => ({blockType: 'section', mode: 'dark', darkStyle: style, ...extra, rows});
const media = (image: number, rows: Row[], overlay = 0.55) => ({blockType: 'section', mode: 'media', mediaType: 'image', image, overlay, rows});

// blocks
const heading = (title: string, o: Record<string, unknown> = {}) => ({blockType: 'sectionHeading', eyebrow: 'Lorem ipsum', title, tag: 'h2', lead: L1, align: 'center', ...o});
const btn = (label: string, href = '#', o: Record<string, unknown> = {}) => ({label, href, shape: 'split', variant: 'primary', size: 'md', ...o});
const textBox = (title: string, o: Record<string, unknown> = {}) => ({
  blockType: 'textBox', title, titleTag: 'h2', titleSize: 'heading-1',
  content: rich(para(tx(`${L1} `), tx('Consectetur adipiscing', 1), tx(` ${L2}`)), list('bullet', ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor'])),
  buttons: [btn('En savoir plus')], ...o,
});
const image = (id: number, minHeight = '400') => ({blockType: 'media', image: id, minHeight, minHeightMobile: '240', overlay: 0});
const mediaQuote = (id: number, text: string) => ({blockType: 'mediaQuote', image: id, text, tag: 'h2', size: 'display-3', minHeight: '480', minHeightMobile: '320', overlay: 0.45});
const cardIconLink = (iconKey: string, title: string, href: string) => ({blockType: 'cardIconLink', iconKey, title, tag: 'h3', text: L1, cta: {label: 'Découvrir', href}});
const cardIcon = (iconKey: string, title: string) => ({blockType: 'cardIcon', iconKey, title, tag: 'h3', text: L2});
const cardImage = (id: number, title: string) => ({blockType: 'cardImage', image: id, title, tag: 'h3', text: L1});
const cardNumber = (value: string, suffix: string, title: string) => ({blockType: 'cardNumber', value, suffix, title, tag: 'h3', text: L3});
const steps = (n: number) => ({blockType: 'processSteps', steps: Array.from({length: n}, (_, i) => ({title: ['Vous décrivez', 'Nous chiffrons', 'Vous validez', 'Nous suivons'][i] ?? `Étape ${i + 1}`, text: L1, duration: `${(i + 1) * 5} min`, checks: [{label: 'Lorem ipsum dolor'}, {label: 'Sit amet consectetur'}], asterisk: i === n - 1}))});
const tabs = (labels: string[]) => ({blockType: 'tabs', items: labels.map((label) => ({label, content: rich(para(tx(`${L1} `), tx(label, 1), tx(`. ${L2}`)), list('bullet', ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit']))}))});
const testimonial = (name: string, result?: string) => ({blockType: 'testimonial', quote: `${L1} ${L2}`, name, role: 'Gérant · Lyon', result});
const compare = (chipLabel: string, chipTone: 'danger' | 'high', tone: 'cross' | 'check', featured = false) => ({blockType: 'compareCard', chipLabel, chipTone, meta: featured ? '20 min chrono' : '3 semaines', quote: `« ${L1} »`, items: Array.from({length: 4}, (_, i) => ({label: `Lorem ipsum ${i + 1} dolor sit amet`})), tone, featured});
/** « À retenir » as a framed text box (the key points figure stays in posts). */
const takeaways = () => textBox('À retenir', {framed: true, titleSize: 'heading-2', titleTag: 'h3', buttons: [], content: rich(list('bullet', ['Lorem ipsum dolor sit amet, consectetur.', 'Sed do eiusmod tempor incididunt ut labore.', 'Ut enim ad minim veniam, quis nostrud.', 'Duis aute irure dolor in reprehenderit.']))});
/** Four key figures as number cards, one per 3-column cell. */
const figures = () => [cardNumber('−68', ' %', 'Lorem ipsum'), cardNumber('×2,4', '', 'Dolor sit amet'), cardNumber('+31', ' %', 'Consectetur'), cardNumber('48', ' h', 'Adipiscing elit')].map((c) => column(3, c));
const faq = (n: number, columns: '1' | '2' = '1') => ({blockType: 'faq', mode: 'single', columns, firstOpen: true, tag: 'h3', items: Array.from({length: n}, (_, i) => ({question: `Lorem ipsum dolor sit amet ${i + 1} ?`, answer: `${L1}\n\n${L2}`}))});
const priceSingle = () => ({
  blockType: 'priceSingle', featuresLabel: 'Ce que vous obtenez',
  features: Array.from({length: 5}, (_, i) => ({label: `Lorem ipsum ${i + 1} dolor sit amet`, end: `${47 + i * 10} €`})),
  totalLabel: 'Valeur totale', totalValue: '329 € / mois', priceLabel: 'Votre prix', price: {value: '79', currency: '€', period: 'par mois'},
  cta: {label: 'Commencer', href: '/contact'}, mention: 'Sans engagement · Sans carte bancaire', guarantee: {title: 'Garantie 30 jours', text: 'Lorem ipsum dolor sit amet.'},
});
const buttons = () => ({blockType: 'buttonGroup', mode: 'spaced', width: 'natural', align: 'center', buttons: [btn('Demander une démo', '/contact'), btn('Voir les tarifs', '/tarifs', {variant: 'high'}), btn('Nous appeler', 'tel:+33100000000', {shape: 'simple', variant: 'ghost', iconKey: 'phone'})]});
const latestPosts = () => ({blockType: 'collection', layout: 'carousel', perView: '3', step: 'page', indicator: 'dots', arrows: true, source: 'posts', postsLimit: 9, postsCta: 'Lire l’article', moreLink: 'blog'});
const latestCases = () => ({blockType: 'collection', layout: 'carousel', perView: '4', step: 'item', indicator: 'segments', arrows: true, source: 'cases', casesLimit: 8, casesCta: 'Voir l’étude', moreLink: 'cases'});
const testimonials = () => ({blockType: 'collection', layout: 'carousel', perView: '3', step: 'page', indicator: 'segments', arrows: true, source: 'manual', items: ['Sophie M.', 'Karim B.', 'Léa D.', 'Marc P.', 'Inès R.', 'Paul V.'].map((n, i) => testimonial(n, i % 2 ? undefined : '+ 28 %'))});
const form = (id: number, o: Record<string, unknown> = {}) => ({blockType: 'form', form: id, framed: true, showHeading: true, ...o});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);

  const img = async (filename: string) => {
    const doc = (await payload.find({collection: 'media', where: {filename: {equals: filename}}, limit: 1, depth: 0})).docs[0];
    if (!doc) throw new Error(`image ${filename} missing: run pnpm seed:content first`);
    return doc.id;
  };
  const formId = async (listTitle: string) => {
    const doc = (await payload.find({collection: 'forms', where: {listTitle: {equals: listTitle}}, limit: 1, depth: 0})).docs[0];
    if (!doc) throw new Error(`form « ${listTitle} » missing: run pnpm seed:demo first`);
    return doc.id;
  };
  const [grue, ingenieur, plans, equipe, tours, reunion, dossiers, artisan, chantier, residence, villa, interieur, facade, p1, p2, p3] = await Promise.all(
    ['seed-grue.jpg', 'seed-ingenieur.jpg', 'seed-plans.jpg', 'seed-equipe.jpg', 'seed-tours.jpg', 'seed-reunion.jpg', 'seed-dossiers.jpg', 'seed-artisan.jpg', 'demo-chantier.jpg', 'seed-residence.jpg', 'seed-villa.jpg', 'seed-interieur.jpg', 'seed-facade-blanche.jpg', 'seed-portrait-1.jpg', 'seed-portrait-2.jpg', 'seed-portrait-3.jpg'].map(img),
  );
  const [demoForm, stepsForm] = await Promise.all([formId('Demander une démo'), formId('Parlons de votre projet')]);

  type PageDef = {slug: string; title: string; parent?: string; hero: Record<string, unknown>; sections: Record<string, unknown>[]};
  const pages: PageDef[] = [
    {
      slug: 'solutions',
      title: 'Solutions',
      hero: {variant: 'page-glow', eyebrow: 'Nos solutions', title: 'Tout le chantier, <span>une seule plateforme</span>', lead: L1, primary: {label: 'Demander une démo', href: '/contact'}, secondary: {label: 'Voir les tarifs', href: '/tarifs'}},
      sections: [
        light([
          row(column(2), column(8, heading('Trois métiers, <span>un seul outil</span>')), column(2)),
          row(column(4, cardIconLink('calculator', 'Chiffrage', '/solutions/chiffrage')), column(4, cardIconLink('construction-crane', 'Suivi de chantier', '/solutions/suivi-de-chantier')), column(4, cardIconLink('headset', 'Accompagnement', '/contact'))),
        ]),
        light([row(column(6, textBox('Lorem ipsum dolor sit amet', {titleSize: 'display-3', badges: [{label: 'Nouveau', tone: 'high'}]})), column(6, image(reunion, '480'))), row(...figures())], {tint: 'highlight', texture: 'dots'}),
        dark([
          row(column(12, heading('Avant, <span>après</span>', {eyebrow: 'Ce qui change'}))),
          row(column(6, compare('AVANT', 'danger', 'cross')), column(6, compare('AVEC VIDOMIA', 'high', 'check', true))),
        ]),
        light([row(column(12, heading('Ils nous font <span>confiance</span>', {align: 'start', lead: undefined}))), row(column(12, testimonials()))]),
        media(tours, [row(column(2), column(8, heading('Passez à <span>la vitesse supérieure</span>', {eyebrow: 'Prêt ?'})), column(2)), row(column(12, buttons()))]),
      ],
    },
    {
      slug: 'chiffrage',
      title: 'Chiffrage',
      parent: 'solutions',
      hero: {variant: 'media-image', eyebrow: 'Chiffrage', title: 'Le chiffrage juste, <span>en 20 minutes</span>', lead: L1, image: plans, overlay: 0.45, scrollHint: 'Découvrir', primary: {label: 'Essayer', href: '/contact'}, secondary: {label: 'Voir une démo', href: '#', iconKey: 'play'}},
      sections: [
        light([row(column(7, textBox('Lorem ipsum dolor sit amet', {titleSize: 'display-3'})), column(5, takeaways()))]),
        light([row(column(12, heading('Comment <span>ça marche</span>'))), row(column(12, steps(4)))], {texture: 'grid'}),
        light([row(column(8, tabs(['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit', 'Sed do eiusmod'])), column(4, testimonial('Julien V.', '−68 % délai')))]),
        dark([row(column(12, heading('Les chiffres <span>qui comptent</span>', {eyebrow: 'Résultats'}))), row(column(3, cardNumber('20', ' min', 'Lorem ipsum')), column(3, cardNumber('98', ' %', 'Dolor sit')), column(3, cardNumber('×3', '', 'Amet consectetur')), column(3, cardNumber('0', ' €', 'Sans engagement')))], 'night'),
        light([row(column(6, priceSingle()), column(6, faq(4)))], {tint: 'highlight'}),
        light([row(column(12, buttons()))], {spacingTop: '40', spacingBottom: '80'}),
      ],
    },
    {
      slug: 'suivi-de-chantier',
      title: 'Suivi de chantier',
      parent: 'solutions',
      hero: {variant: 'split', eyebrow: 'Suivi de chantier', title: 'Chaque chantier, <span>sous contrôle</span>', lead: L1, media: grue, badges: [{label: 'Temps réel', tone: 'accent'}, {label: '−22 % de dépassements', tone: 'night'}], reassurance: [{text: 'Sans installation'}, {text: 'Données en France'}, {text: 'Support 7 j / 7'}], primary: {label: 'Demander une démo', href: '/contact'}},
      sections: [
        light([row(column(6, mediaQuote(chantier, 'Lorem ipsum, dolor sit amet.')), column(6, textBox('Lorem ipsum dolor sit amet', {framed: true, vAlign: 'center'})))]),
        light([row(column(8, heading('Lorem ipsum <span>dolor</span>', {align: 'start'})), column(4)), row(column(4, cardImage(residence, 'Lorem ipsum dolor')), column(4, cardImage(villa, 'Sit amet consectetur')), column(4, cardImage(interieur, 'Adipiscing elit')))], {texture: 'losange'}),
        dark([row(column(12, heading('Sur <span>le terrain</span>', {eyebrow: 'En images'}))), row(column(4, image(artisan, '320')), column(4, image(ingenieur, '320')), column(4, image(facade, '320')))], 'night-halo'),
        light([row(column(4, testimonial('Sophie Martin', '−22 % dépassements')), column(4, testimonial('Karim B.')), column(4, takeaways()))]),
        light([row(column(12, heading('Le blog, <span>côté chantier</span>', {eyebrow: 'Le blog'}))), row(column(12, latestPosts()))], {tint: 'highlight'}),
        light([row(column(7, form(stepsForm)), column(5, image(ingenieur, '560')))]),
      ],
    },
    {
      slug: 'a-propos',
      title: 'À propos',
      hero: {variant: 'page-image', eyebrow: 'À propos', title: 'Des bâtisseurs <span>qui codent</span>', lead: L1, image: equipe, overlay: 0.5},
      sections: [
        light([row(column(12, heading('Notre <span>histoire</span>'))), row(column(6, textBox('Lorem ipsum dolor', {framed: true, titleSize: 'heading-2', titleTag: 'h3'})), column(6, textBox('Sit amet consectetur', {framed: true, titleSize: 'heading-2', titleTag: 'h3'})))]),
        media(tours, [row(column(12, heading('Vidomia <span>en chiffres</span>', {eyebrow: 'Depuis 2019'}))), row(...figures())], 0.6),
        light([row(column(12, heading('L’équipe', {align: 'start', lead: undefined}))), row(column(3, cardImage(p1, 'Thomas Garnier')), column(3, cardImage(p2, 'Marie Lefebvre')), column(3, cardImage(p3, 'Claire Dubois')), column(3, cardIcon('user-crown', 'Et vous ?')))]),
        light([row(column(8, steps(3)), column(4, image(dossiers, '400')))], {tint: 'highlight', texture: 'grid'}),
        dark([row(column(12, heading('Nos <span>réalisations</span>', {eyebrow: 'Études de cas'}))), row(column(12, latestCases()))], 'night'),
        light([row(column(2), column(8, faq(5)), column(2))]),
      ],
    },
    {
      slug: 'contact',
      title: 'Contact',
      hero: {variant: 'page-night', eyebrow: 'Contact', title: 'Parlons de <span>votre chantier</span>', lead: L1},
      sections: [
        light([row(column(8, form(demoForm)), column(4, textBox('Nous joindre', {titleSize: 'heading-2', titleTag: 'h2', buttons: [btn('Nous appeler', 'tel:+33100000000', {shape: 'simple', variant: 'ghost', iconKey: 'phone'})]})))]),
        light([row(column(4, cardIcon('phone', '01 00 00 00 00')), column(4, cardIcon('mail', 'contact@exemple.fr')), column(4, cardIcon('map-pin', '12 rue du Chantier, Lyon')))], {tint: 'highlight'}),
        light([row(column(12, image(tours, '480')))], {spacingTop: '0'}),
        dark([row(column(12, heading('Questions <span>fréquentes</span>'))), row(column(2), column(8, faq(5)), column(2))], 'night-halo'),
      ],
    },
  ];

  // --replace: remove these pages first, children before parents
  if (REPLACE) {
    for (const p of [...pages].reverse()) {
      const found = (await payload.find({collection: 'pages', where: {slug: {equals: p.slug}}, limit: 1, depth: 0})).docs[0];
      if (found) {
        await payload.delete({collection: 'pages', id: found.id});
        log(`page supprimée : ${p.slug}`);
      }
    }
  }
  const ids: Record<string, number> = {};
  for (const p of pages) {
    const found = (await payload.find({collection: 'pages', where: {slug: {equals: p.slug}}, limit: 1, depth: 0})).docs[0];
    if (found) {
      ids[p.slug] = found.id;
      log(`page existante, laissée telle quelle : ${found.path} (--replace pour la reconstruire)`);
      continue;
    }
    const doc = await payload.create({
      collection: 'pages',
      data: {title: p.title, slug: p.slug, parent: p.parent ? ids[p.parent] : undefined, hero: {breadcrumbMode: 'inherit', ...p.hero}, sections: p.sections} as never,
    });
    ids[p.slug] = doc.id;
    log(`page créée : http://localhost:3000${doc.path}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(JSON.stringify((e as {data?: unknown}).data ?? '', null, 1).slice(0, 3000));
  console.error(e);
  process.exit(1);
});

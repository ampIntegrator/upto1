/**
 * The home page's content in lorem ipsum (pnpm seed:home): four sections showing the column
 * components the other seeded pages use little or not at all: clickable image cards, tiers,
 * an image with a quote beside tabs, clickable number cards. Backgrounds alternate (highlight,
 * night, body, image): never two same shades one under the other (Nicolas, 24 Sept. 2026).
 * The page is found by slug and updated in place (its page top is kept): a page open in the
 * admin must never be deleted. Images come from the media library (seed:content).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

const L1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const L2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// Lexical
const tx = (text: string, format = 0) => ({type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1});
const el = (type: string, children: object[], extra: object = {}) => ({type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra});
const para = (...children: object[]) => el('paragraph', children, {textFormat: 0, textStyle: ''});
const list = (items: string[]) => el('list', items.map((t, i) => el('listitem', [tx(t)], {value: i + 1})), {listType: 'bullet', start: 1, tag: 'ul'});
const rich = (...nodes: object[]) => ({root: el('root', nodes)});

// grid
const column = (span: number, block?: Record<string, unknown>) => ({span: String(span), contents: block ? [block] : []});
const row = (...columns: ReturnType<typeof column>[]) => ({columns});
type Row = ReturnType<typeof row>;
const light = (rows: Row[], extra: Record<string, unknown> = {}) => ({blockType: 'section', mode: 'light', tint: 'body', texture: 'none', ...extra, rows});
const dark = (rows: Row[], style: 'night' | 'night-halo' = 'night-halo') => ({blockType: 'section', mode: 'dark', darkStyle: style, rows});
const media = (image: number, rows: Row[], overlay = 0.55) => ({blockType: 'section', mode: 'media', mediaType: 'image', image, overlay, rows});

// blocks
const heading = (title: string, o: Record<string, unknown> = {}) => ({blockType: 'sectionHeading', eyebrow: 'Lorem ipsum', title, tag: 'h2', lead: L1, align: 'center', ...o});
const cardImageLink = (image: number, title: string, href: string) => ({blockType: 'cardImageLink', image, title, tag: 'h3', text: L2, cta: {label: 'Découvrir', href}});
const cardNumberLink = (value: string, suffix: string, title: string) => ({blockType: 'cardNumberLink', value, suffix, title, tag: 'h3', text: L2, cta: {label: 'En savoir plus', href: '/solutions'}});
const features = (n: number) => Array.from({length: n}, (_, i) => ({label: `Lorem ipsum ${i + 1} dolor sit amet`}));
const plan = (name: string, value: string, o: {featured?: boolean; inherits?: string} = {}) => ({
  blockType: 'plan', name, nameTag: 'h3', tagline: `Lorem ipsum ${name.toLowerCase()}`, price: {value, currency: '€', period: '/ mois'},
  featured: Boolean(o.featured), badge: o.featured ? 'Populaire' : undefined, inherits: o.inherits, featuresLabel: 'Ce que vous obtenez', features: features(4),
  cta: {label: 'Commencer', href: '/tarifs'}, mention: 'Sans CB · Sans engagement', guarantee: {title: 'Garantie 30 jours', text: 'Lorem ipsum dolor sit amet. Sans questions.'},
});
const mediaQuote = (image: number) => ({blockType: 'mediaQuote', image, text: 'Lorem ipsum, dolor sit amet.', tag: 'h2', size: 'display-3', minHeight: '480', minHeightMobile: '320', overlay: 0.45});
const tabs = (labels: string[]) => ({blockType: 'tabs', items: labels.map((label) => ({label, content: rich(para(tx(`${L1} `), tx(label, 1), tx(`. ${L2}`)), list(['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit']))}))});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  const img = async (filename: string) => {
    const doc = (await payload.find({collection: 'media', where: {filename: {equals: filename}}, limit: 1, depth: 0})).docs[0];
    if (!doc) throw new Error(`image ${filename} missing: run pnpm seed:content first`);
    return doc.id;
  };
  const [maison, cuisine, escalier, sejour, tours] = await Promise.all(['seed-maison-moderne.jpg', 'seed-cuisine.jpg', 'seed-escalier.jpg', 'seed-sejour-bois.jpg', 'seed-tours.jpg'].map(img));

  const sections = [
    // 1 · highlight with dots: three clickable image cards
    light([
      row(column(2), column(8, heading('Trois façons de <span>chiffrer</span>')), column(2)),
      row(column(4, cardImageLink(maison, 'Lorem ipsum dolor', '/solutions/chiffrage')), column(4, cardImageLink(cuisine, 'Sit amet consectetur', '/solutions/suivi-de-chantier')), column(4, cardImageLink(escalier, 'Adipiscing elit', '/solutions'))),
    ], {tint: 'highlight', texture: 'dots'}),
    // 2 · night halo: three tiers
    dark([
      row(column(12, heading('Un prix <span>par équipe</span>', {eyebrow: 'Tarifs'}))),
      row(column(4, plan('Solo', '49')), column(4, plan('Pro', '79', {featured: true, inherits: 'Solo'})), column(4, plan('Agence', '149', {inherits: 'Pro'}))),
    ]),
    // 3 · body with grid: an image with a quote beside tabs
    light([row(column(6, mediaQuote(sejour)), column(6, tabs(['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit', 'Sed do eiusmod'])))], {texture: 'grid'}),
    // 4 · image: four clickable number cards
    media(tours, [
      row(column(12, heading('Les chiffres <span>qui parlent</span>', {eyebrow: 'Résultats', lead: undefined}))),
      row(column(3, cardNumberLink('−68', ' %', 'Lorem ipsum')), column(3, cardNumberLink('×2,4', '', 'Dolor sit amet')), column(3, cardNumberLink('+31', ' %', 'Consectetur')), column(3, cardNumberLink('48', ' h', 'Adipiscing elit'))),
    ]),
  ];

  const home = (await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, limit: 1, depth: 0})).docs[0];
  if (!home) throw new Error('page « accueil » missing: run pnpm seed first');
  // the seeded home page predates the silo field's options (« inherit »): aligned on the site's silo
  const site = (await payload.findGlobal({slug: 'settings', depth: 0})) as {silo?: string};
  await payload.update({collection: 'pages', id: home.id, data: {sections, silo: site.silo ?? 'green'} as never});
  log(`page « accueil » mise à jour : http://localhost:3000/`);
  process.exit(0);
}

main().catch((e) => {
  console.error(JSON.stringify((e as {data?: unknown}).data ?? '', null, 1).slice(0, 3000));
  console.error(e);
  process.exit(1);
});

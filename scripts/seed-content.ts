/**
 * Listing content (pnpm seed:content): fills the blog and the case studies to eight entries each,
 * with lorem ipsum, to check the listing pages, the cards, the carousels and the related entries.
 * Every entry gets an Unsplash cover (imported once into the media library, found by file name
 * afterwards) and a content of ten or so elements (headings, paragraphs, lists, quote, image,
 * table and the figures). Re-runnable: entries are found by slug and updated, missing ones are
 * created. Posts that already exist keep their title, excerpt, category and date; only an empty
 * cover, author or content is filled. The settings are never changed.
 */
import config from '@payload-config';
import {mkdtemp, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {getPayload} from 'payload';

const UNSPLASH: {name: string; id: string; alt: string}[] = [
  {name: 'seed-grue.jpg', id: '1541888946425-d81bb19240f5', alt: 'Grue sur un chantier'},
  {name: 'seed-ingenieur.jpg', id: '1581094794329-c8112a89af12', alt: 'Ingénieur sur un chantier'},
  {name: 'seed-facade-blanche.jpg', id: '1487958449943-2429e8be8625', alt: 'Façade blanche'},
  {name: 'seed-maison-moderne.jpg', id: '1512917774080-9991f1c4c750', alt: 'Maison contemporaine'},
  {name: 'seed-maison-exterieur.jpg', id: '1600585154340-be6161a56a0c', alt: 'Maison et jardin'},
  {name: 'seed-interieur.jpg', id: '1600607687939-ce8a6c25118c', alt: 'Séjour rénové'},
  {name: 'seed-cuisine.jpg', id: '1600566753190-17f0baa2a6c3', alt: 'Cuisine rénovée'},
  {name: 'seed-residence.jpg', id: '1545324418-cc1a3fa10c00', alt: 'Résidence neuve'},
  {name: 'seed-tours.jpg', id: '1496307653780-42ee777d4833', alt: 'Tours de verre'},
  {name: 'seed-reunion.jpg', id: '1517245386807-bb43f82c33c4', alt: 'Réunion d’équipe'},
  {name: 'seed-equipe.jpg', id: '1521737604893-d14cc237f11d', alt: 'Équipe au travail'},
  {name: 'seed-dossiers.jpg', id: '1454165804606-c3d57bc86b40', alt: 'Dossiers et graphiques'},
  {name: 'seed-plans.jpg', id: '1581092160562-40aa08e78837', alt: 'Étude de plans'},
  {name: 'seed-artisan.jpg', id: '1621905251189-08b45d6a269e', alt: 'Artisan au travail'},
  {name: 'seed-villa.jpg', id: '1580587771525-78b9dba3b914', alt: 'Villa neuve'},
  {name: 'seed-pavillon.jpg', id: '1570129477492-45c003edd2be', alt: 'Pavillon'},
  {name: 'seed-architecture.jpg', id: '1486718448742-163732cd1544', alt: 'Architecture en courbes'},
  {name: 'seed-portrait-1.jpg', id: '1500648767791-00dcc994a43e', alt: 'Portrait'},
  {name: 'seed-portrait-2.jpg', id: '1494790108377-be9c29b29330', alt: 'Portrait'},
  {name: 'seed-portrait-3.jpg', id: '1438761681033-6461ffad8d80', alt: 'Portrait'},
];

const L1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const L2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
const L3 = 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci a odio.';

// Lexical nodes
const tx = (text: string, format = 0) => ({type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1});
const el = (type: string, children: object[], extra: object = {}) => ({type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra});
const para = (...children: object[]) => el('paragraph', children, {textFormat: 0, textStyle: ''});
const head = (tag: string, text: string) => el('heading', [tx(text)], {tag});
const list = (type: 'bullet' | 'number', items: object[][]) => el('list', items.map((c, i) => el('listitem', c, {value: i + 1})), {listType: type, start: 1, tag: type === 'bullet' ? 'ul' : 'ol'});
const quote = (text: string, who: string) => el('quote', [tx(`« ${text} »`), {type: 'linebreak', version: 1}, tx(`— ${who}`)]);
const upload = (image: number, caption: string) => ({type: 'upload', version: 3, format: '', relationTo: 'media', value: image, fields: {caption}});
const fig = (fields: Record<string, unknown>) => ({type: 'block', version: 2, format: '', fields: {id: `seed${Math.random().toString(16).slice(2, 10)}`, blockName: '', ...fields}});
const cell = (text: string, headerState = 0) => el('tablecell', [para(tx(text))], {headerState, colSpan: 1, rowSpan: 1, backgroundColor: null});
const tableRow = (cells: string[], header = false) => el('tablerow', cells.map((c) => cell(c, header ? 1 : 0)));

const loremPara = (i: number) => para(tx([L1, L2, L3][i % 3] + ' '), tx('Consectetur adipiscing', 1), tx(` ${[L2, L3, L1][i % 3]}`));
const bullets = () => list('bullet', [[tx('Lorem ipsum dolor sit amet')], [tx('Consectetur adipiscing', 1), tx(' elit sed do eiusmod')], [tx('Tempor incididunt ut labore et dolore')]]);
const numbers = () => list('number', [[tx('Lorem ipsum', 1), tx(' : dolor sit amet, consectetur.')], [tx('Sed do eiusmod', 1), tx(' : tempor incididunt ut labore.')], [tx('Ut enim ad minim', 1), tx(' : veniam, quis nostrud.')], [tx('Duis aute irure', 1), tx(' : dolor in reprehenderit.')]]);
const table = () => el('table', [tableRow(['Lorem', 'Ipsum', 'Dolor', 'Amet'], true), tableRow(['Consectetur', 'Faible', '−35 %', '2 sem.']), tableRow(['Adipiscing', 'Moyen', '−48 %', '4 sem.']), tableRow(['Eiusmod', 'Élevé', '−21 %', '6 sem.'])]);
const stats = (n: number) => fig({blockType: 'statsBand', items: [{value: '−68 %', label: 'Lorem ipsum'}, {value: '×2,4', label: 'Dolor sit amet'}, {value: '+31 %', label: 'Consectetur'}, {value: '48 h', label: 'Adipiscing elit'}].slice(0, n)});
const keyPoints = () => fig({blockType: 'keyPoints', eyebrow: 'À retenir', content: {root: el('root', [list('bullet', [[tx('Lorem ipsum '), tx('dolor sit amet', 1), tx(', consectetur.')], [tx('Sed do eiusmod tempor incididunt ut labore.')], [tx('Ut enim ad minim '), tx('veniam', 1), tx(' quis nostrud.')]])])}});
const quoteCard = (photo: number, name: string, role: string) => fig({blockType: 'quoteCard', quote: `« ${L1} »`, name, role, photo});
const gallery = (images: number[]) => fig({blockType: 'gallery', images: images.map((image) => ({image})), wideFirst: true, caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing.'});
const cta = (arrow: boolean) => arrow
  ? fig({blockType: 'ctaBand', variant: 'arrow', title: 'Lorem ipsum dolor sit amet', button: {label: 'En savoir plus', href: '#', shape: 'split', variant: 'high', size: 'md'}})
  : fig({blockType: 'ctaBand', variant: 'icon', iconKey: 'calculator', title: 'Lorem ipsum dolor sit amet', text: L1, button: {label: 'Lancer le calcul', href: '#', shape: 'split', variant: 'high', size: 'md'}});

/** A content of ten or so elements; `n` varies the order and the figures from one entry to the next. */
const content = (n: number, img: number[], people: {photo: number; name: string; role: string}) => {
  const pick = (k: number) => img[(n * 3 + k) % img.length];
  const figures = [
    () => stats(4 - (n % 3)),
    () => gallery([pick(1), pick(2), pick(3)].slice(0, 2 + (n % 2))),
    () => keyPoints(),
    () => quoteCard(people.photo, people.name, people.role),
    () => table(),
    () => upload(pick(4), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
  ];
  const f = (k: number) => figures[(n + k) % figures.length]();
  return {
    root: el('root', [
      loremPara(n),
      head('h2', 'Lorem ipsum dolor sit amet'),
      loremPara(n + 1),
      n % 2 ? numbers() : bullets(),
      f(0),
      head('h2', 'Consectetur adipiscing elit'),
      loremPara(n + 2),
      quote(L1, `${people.name}, ${people.role.toLowerCase()}`),
      f(1),
      head('h3', 'Sed do eiusmod tempor'),
      loremPara(n),
      f(2),
      head('h2', 'Ut enim ad minim veniam'),
      loremPara(n + 1),
      f(3),
      cta(n % 2 === 0),
    ]),
  };
};

const POSTS = [
  {slug: 'renover-sans-mauvaise-surprise', title: 'Rénover <span>sans mauvaise surprise</span> : les dix points à vérifier', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', category: 'chantier', date: '2026-08-05'},
  {slug: 'bibliotheque-de-prix-a-jour', title: 'Tenir sa bibliothèque de prix <span>à jour</span>', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.', category: 'chiffrage', date: '2026-07-29'},
  {slug: 'recruter-un-metreur', title: 'Recruter un métreur : <span>ce qui a changé</span>', excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', category: 'metier', date: '2026-07-22'},
];

const CASE_CATEGORIES = [
  {slug: 'renovation', title: 'Rénovation'},
  {slug: 'construction-neuve', title: 'Construction neuve'},
  {slug: 'promotion', title: 'Promotion'},
  {slug: 'maitrise-d-oeuvre', title: 'Maîtrise d’œuvre'},
];

const CASES = [
  {slug: 'atelier-moreau', card: '×2 devis', client: 'Atelier Moreau', title: 'Atelier Moreau <span>double</span> son volume de devis', category: 'renovation', location: 'Lyon (69)', deployment: '4 semaines · janv. 2026', results: [['×2', 'Devis envoyés'], ['−52 %', 'Temps de chiffrage']], date: '2026-09-10'},
  {slug: 'bati-ouest', card: '+4 pts de marge', client: 'Bâti Ouest', title: 'Bâti Ouest <span>fiabilise</span> ses marges sur le neuf', category: 'construction-neuve', location: 'Rennes (35)', deployment: '8 semaines · nov. 2025', results: [['+4 pts', 'Marge nette'], ['−30 %', 'Écarts de budget']], date: '2026-09-03'},
  {slug: 'les-jardins-de-loire', card: '40 lots en 1 mois', client: 'Les Jardins de Loire', title: 'Les Jardins de Loire : <span>quarante lots</span> chiffrés en un mois', category: 'promotion', location: 'Tours (37)', deployment: '5 semaines · oct. 2025', results: [['40', 'Lots chiffrés'], ['1 mois', 'Au lieu de trois']], date: '2026-08-27'},
  {slug: 'cabinet-arcade', card: '−45 % délai', client: 'Cabinet Arcade', title: 'Cabinet Arcade <span>unifie</span> ses estimations', category: 'maitrise-d-oeuvre', location: 'Bordeaux (33)', deployment: '6 semaines · sept. 2025', results: [['−45 %', 'Temps d’estimation'], ['+18 %', 'Missions signées']], date: '2026-08-20'},
  {slug: 'renov-habitat', card: 'Réponse en 24 h', client: 'Rénov’Habitat', title: 'Rénov’Habitat <span>répond en 24 h</span> à chaque demande', category: 'renovation', location: 'Lille (59)', deployment: '3 semaines · févr. 2026', results: [['24 h', 'Délai de réponse'], ['+27 %', 'Taux de signature']], date: '2026-08-13'},
  {slug: 'maisons-dauphine', card: '−60 % par devis', client: 'Maisons Dauphine', title: 'Maisons Dauphine <span>standardise</span> ses modèles', category: 'construction-neuve', location: 'Grenoble (38)', deployment: '7 semaines · déc. 2025', results: [['12', 'Modèles paramétrés'], ['−60 %', 'Temps par devis']], date: '2026-08-06'},
  {slug: 'horizon-promotion', card: '−22 % dépassements', client: 'Horizon Promotion', title: 'Horizon Promotion <span>pilote</span> ses programmes en direct', category: 'promotion', location: 'Marseille (13)', deployment: '10 semaines · sept. 2025', results: [['3', 'Programmes suivis'], ['−22 %', 'Dépassements']], date: '2026-07-30'},
];

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);

  // 1 · images: imported once, found by file name afterwards
  const dir = await mkdtemp(path.join(tmpdir(), 'seed-'));
  const media: Record<string, number> = {};
  for (const u of UNSPLASH) {
    const found = await payload.find({collection: 'media', where: {filename: {equals: u.name}}, limit: 1});
    if (found.docs.length) {
      media[u.name] = found.docs[0].id;
      continue;
    }
    const res = await fetch(`https://images.unsplash.com/photo-${u.id}?auto=format&fit=crop&w=1600&q=80`);
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) throw new Error(`Unsplash ${u.id}: ${res.status}`);
    const file = path.join(dir, u.name);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    media[u.name] = (await payload.create({collection: 'media', data: {alt: u.alt}, filePath: file})).id;
    log(`image importée : ${u.name}`);
  }
  const covers = UNSPLASH.filter((u) => !u.name.startsWith('seed-portrait')).map((u) => media[u.name]);
  const [p1, p2, p3] = ['seed-portrait-1.jpg', 'seed-portrait-2.jpg', 'seed-portrait-3.jpg'].map((n) => media[n]);

  // 2 · authors
  const authorOf = async (name: string, role: string, photo: number) =>
    (await payload.find({collection: 'authors', where: {name: {equals: name}}, limit: 1})).docs[0] ?? (await payload.create({collection: 'authors', data: {name, role, photo} as never}));
  const authors = [
    await authorOf('Marie Lefebvre', 'Responsable produit · Vidomia', p2),
    await authorOf('Thomas Garnier', 'Conducteur de travaux', p1),
    await authorOf('Claire Dubois', 'Économiste de la construction', p3),
  ];
  const people = [
    {photo: p1, name: 'Julien Vasseur', role: 'Gérant'},
    {photo: p2, name: 'Sophie Martin', role: 'Directrice technique'},
    {photo: p3, name: 'Léa Durand', role: 'Responsable des études'},
  ];

  // 3 · posts: the existing ones are completed, the missing ones created
  const categories = (await payload.find({collection: 'categories', limit: 50})).docs;
  const categoryId = (slug: string) => categories.find((c) => c.slug === slug)?.id ?? categories[0].id;
  let n = 0;
  const existing = (await payload.find({collection: 'posts', limit: 100, sort: '-publishedAt', depth: 0})).docs;
  for (const post of existing) {
    const empty = !(post.content as {root?: {children?: unknown[]}} | null)?.root?.children?.length;
    const data: Record<string, unknown> = {};
    if (!post.cover) data.cover = covers[n % covers.length];
    if (!post.author) data.author = authors[n % authors.length].id;
    if (empty) data.content = content(n, covers, people[n % people.length]);
    if (Object.keys(data).length) {
      await payload.update({collection: 'posts', id: post.id, data: data as never});
      log(`article complété : ${post.slug}`);
    }
    n++;
  }
  for (const p of POSTS) {
    const data = {
      title: p.title, slug: p.slug, excerpt: p.excerpt, category: categoryId(p.category), publishedAt: new Date(p.date).toISOString(),
      cover: covers[n % covers.length], coverCaption: 'Lorem ipsum dolor sit amet.', author: authors[n % authors.length].id,
      content: content(n, covers, people[n % people.length]),
    };
    const found = (await payload.find({collection: 'posts', where: {slug: {equals: p.slug}}, limit: 1})).docs[0];
    if (found) await payload.update({collection: 'posts', id: found.id, data: data as never});
    else await payload.create({collection: 'posts', data: data as never});
    log(`article ${found ? 'mis à jour' : 'créé'} : ${p.slug}`);
    n++;
  }

  // 4 · case studies
  const caseCategory: Record<string, number> = {};
  for (const c of CASE_CATEGORIES) {
    const found = (await payload.find({collection: 'case-categories', where: {slug: {equals: c.slug}}, limit: 1})).docs[0];
    caseCategory[c.slug] = (found ?? (await payload.create({collection: 'case-categories', data: c}))).id;
  }
  for (const c of CASES) {
    const data = {
      title: c.title, slug: c.slug, category: caseCategory[c.category], publishedAt: new Date(c.date).toISOString(),
      excerpt: `${L1} ${L2.split('.')[0]}.`, cover: covers[(n * 2) % covers.length],
      content: content(n, covers, people[n % people.length]),
      sheet: {
        client: c.client, clientUrl: 'https://example.com', location: c.location, deployment: c.deployment,
        modules: 'Chiffrage instantané, métré automatique, devis client',
        results: c.results.map(([value, label]) => ({value, label})),
        cardResult: c.card,
      },
    };
    const found = (await payload.find({collection: 'case-studies', where: {slug: {equals: c.slug}}, limit: 1})).docs[0];
    if (found) await payload.update({collection: 'case-studies', id: found.id, data: data as never});
    else await payload.create({collection: 'case-studies', data: data as never});
    log(`réalisation ${found ? 'mise à jour' : 'créée'} : ${c.slug}`);
    n++;
  }

  const [posts, cases] = await Promise.all([payload.count({collection: 'posts'}), payload.count({collection: 'case-studies'})]);
  log(`${posts.totalDocs} articles, ${cases.totalDocs} réalisations`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

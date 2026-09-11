/**
 * Peuplement de la base (pnpm seed) : premier utilisateur, réglages, en-tête, pied de page,
 * quatre catégories et quatre articles, page d'accueil. Reprend les contenus de démonstration
 * du catalogue. Idempotent : ne recrée pas ce qui existe déjà (slug, e-mail).
 *   Identifiants créés : admin@vidomia.fr / vidomia-2026 (à changer dans l'admin).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

const ADMIN = {email: 'admin@vidomia.fr', password: 'vidomia-2026'};

const CATEGORIES = [
  {title: 'Chiffrage', slug: 'chiffrage'},
  {title: 'Chantier', slug: 'chantier'},
  {title: 'Métier', slug: 'metier'},
  {title: 'Produit', slug: 'produit'},
];

const POSTS = [
  {title: 'Chiffrer un mur porteur : IPN ou HEB ?', slug: 'chiffrer-mur-porteur-ipn-heb', category: 'chiffrage', publishedAt: '2026-09-02', excerpt: 'Ce que change le choix du profilé sur le prix, le délai et la note de calcul.'},
  {title: 'Du devis à la facturation : industrialiser le cycle commercial', slug: 'du-devis-a-la-facturation', category: 'metier', publishedAt: '2026-08-26', excerpt: 'Une seule chaîne de données, du chiffrage à la facture, pour ne plus y revenir.'},
  {title: 'Suivi de chantier : les cinq indicateurs qui comptent', slug: 'suivi-de-chantier-cinq-indicateurs', category: 'chantier', publishedAt: '2026-08-19', excerpt: 'Avancement, coûts engagés, réserves, retards, marge : lire un chantier en un coup d\'œil.'},
  {title: 'Chiffrage Pro : ce qui arrive à la rentrée', slug: 'chiffrage-pro-rentree', category: 'produit', publishedAt: '2026-08-12', excerpt: 'Export CCTP, comptes multi-utilisateurs et marque blanche : le programme des prochaines semaines.'},
];

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);

  // 1 · utilisateur
  const users = await payload.count({collection: 'users'});
  if (users.totalDocs === 0) {
    await payload.create({collection: 'users', data: ADMIN});
    log(`Utilisateur créé : ${ADMIN.email}`);
  }

  // 2 · catégories et articles
  const categoryIds: Record<string, number> = {};
  for (const c of CATEGORIES) {
    const found = await payload.find({collection: 'categories', where: {slug: {equals: c.slug}}, limit: 1});
    const doc = found.docs[0] ?? (await payload.create({collection: 'categories', data: c}));
    categoryIds[c.slug] = doc.id;
  }
  const postIds: Record<string, number> = {};
  for (const p of POSTS) {
    const found = await payload.find({collection: 'posts', where: {slug: {equals: p.slug}}, limit: 1});
    const doc = found.docs[0] ?? (await payload.create({collection: 'posts', data: {title: p.title, slug: p.slug, category: categoryIds[p.category], publishedAt: new Date(p.publishedAt).toISOString(), excerpt: p.excerpt}}));
    postIds[p.slug] = doc.id;
  }
  log(`${CATEGORIES.length} catégories, ${POSTS.length} articles`);

  // 3 · réglages
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      silo: 'blue',
      brandName: 'Vidomia',
      baseline: "La plateforme de chiffrage BTP qui transforme un métré en devis pro, validé par un ingénieur, en moins de 48 heures.",
      phone: '01 84 80 09 12',
      phoneHref: 'tel:+33184800912',
      email: 'contact@vidomia.fr',
      hours: 'Lun–Ven · 9h–18h',
      address: '14 rue de la Mécanique, 75011 Paris',
      socials: [
        {label: 'LinkedIn', href: 'https://www.linkedin.com/', iconKey: 'linkedin'},
        {label: 'X', href: 'https://x.com/', iconKey: 'x-twitter'},
        {label: 'YouTube', href: 'https://www.youtube.com/', iconKey: 'youtube'},
      ],
      languages: ['fr', 'en', 'de', 'es'],
    },
  });

  // 4 · en-tête
  await payload.updateGlobal({
    slug: 'header',
    data: {
      nav: [
        {
          blockType: 'mega',
          label: 'Solutions',
          groups: [
            {title: 'Par besoin', items: [
              {title: 'Chiffrage instantané', description: 'Estimez vos travaux en 20 minutes, sans artisan.', iconKey: 'shield', href: '/chiffrage'},
              {title: 'Suivi de chantier', description: "Pilotez l'avancement et les coûts en temps réel.", iconKey: 'calculator', href: '/suivi'},
              {title: 'Devis client', description: 'Générez un livrable pro, validé par un expert.', iconKey: 'ruler', href: '/devis'},
            ]},
            {title: 'Par métier', items: [
              {title: 'Architectes', description: "Du métré à l'estimatif détaillé en un flux.", iconKey: 'helmet', href: '/architectes'},
              {title: "Maîtres d'œuvre", description: 'Centralisez tous vos chiffrages sur un poste.', iconKey: 'hammer', href: '/maitres-d-oeuvre'},
              {title: 'Promoteurs', description: "Fiabilisez vos budgets dès l'esquisse.", iconKey: 'user', href: '/promoteurs'},
            ]},
          ],
          featured: postIds['du-devis-a-la-facturation'],
          featuredLinkLabel: "Lire l'article",
        },
        {
          blockType: 'menu',
          label: 'Ressources',
          items: [
            {title: 'Guides & livres blancs', description: 'Méthodes et retours de terrain.', iconKey: 'book', href: '/guides'},
            {title: 'Webinaires', description: 'Sessions en direct et replays.', iconKey: 'monitor', href: '/webinaires'},
            {title: 'Blog', description: 'Actualité du chiffrage et du chantier.', iconKey: 'file', href: '/blog'},
          ],
        },
        {blockType: 'link', label: 'Tarifs', href: '/tarifs'},
        {blockType: 'link', label: 'À propos', href: '/a-propos'},
      ],
      login: {label: 'Connexion', href: '/connexion'},
      cta: {label: 'Demander une démo', href: '/demo'},
    },
  });

  // 5 · pied de page
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      newsletterEnabled: true,
      newsletter: {
        eyebrow: 'La lettre Vidomia',
        title: 'Le chiffrage juste, <span>une fois par mois.</span>',
        text: 'Prix de référence, méthodes et retours terrain. Pas de spam, désinscription en un clic.',
        fieldLabel: 'Votre adresse e-mail',
        buttonLabel: "S'abonner",
        mention: 'Vos données restent chez nous — RGPD',
      },
      articlesEnabled: true,
      articles: {eyebrow: 'En bref', allLabel: 'Tous les articles', allHref: '/blog'},
      columns: [
        {title: 'Solutions', links: [{label: 'Chiffrage instantané', href: '/chiffrage'}, {label: 'Suivi de chantier', href: '/suivi'}, {label: 'Devis client', href: '/devis'}, {label: 'Tarifs', href: '/tarifs'}]},
        {title: 'Métiers', links: [{label: 'Architectes', href: '/architectes'}, {label: "Maîtres d'œuvre", href: '/maitres-d-oeuvre'}, {label: 'Promoteurs', href: '/promoteurs'}]},
        {title: 'Ressources', links: [{label: 'Blog', href: '/blog'}, {label: 'Guides', href: '/guides'}, {label: 'Webinaires', href: '/webinaires'}, {label: "Centre d'aide", href: '/aide'}]},
        {title: 'Entreprise', links: [{label: 'À propos', href: '/a-propos'}, {label: 'Recrutement', href: '/recrutement'}, {label: 'Contact', href: '/contact'}]},
      ],
      copyright: '© 2026 Vidomia',
      legalLine: 'SIRET 902 145 884 00021 · Conçu à Paris',
      legalLinks: [{label: 'Mentions légales', href: '/mentions-legales'}, {label: 'Confidentialité', href: '/confidentialite'}, {label: 'CGV', href: '/cgv'}],
    },
  });

  // 6 · page d'accueil
  const home = await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, limit: 1});
  if (!home.docs.length) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Accueil',
        slug: 'accueil',
        silo: 'inherit',
        hero: {
          variant: 'page-glow',
          eyebrow: 'Plateforme',
          title: 'Le chiffrage,\n<span>de A à Z.</span>',
          lead: 'Du métré au devis signé, une seule plateforme pour estimer juste.',
          primary: {label: 'Demander une démo', href: '/demo'},
          secondary: {label: 'Voir la vidéo', href: '/video', iconKey: 'play'},
          overlay: 0.3,
          breadcrumb: false,
        },
      },
    });
    log('Page « accueil » créée');
  }

  log('Peuplement terminé.');
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

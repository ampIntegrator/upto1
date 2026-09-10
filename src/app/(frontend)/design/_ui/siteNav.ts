/* Données de démonstration de l'en-tête (faux liens et textes, maquette 01-header). */
import type {SiteFooterData, SiteHeaderData} from '@/components/site-nav';

export const SITE_HEADER: SiteHeaderData = {
  brand: {name: 'Vidomia', href: '/'},
  strip: {
    phone: {label: '01 84 80 09 12', href: 'tel:+33184800912'},
    email: {label: 'contact@vidomia.fr', href: 'mailto:contact@vidomia.fr'},
    hours: 'Lun–Ven · 9h–18h',
    address: '14 rue de la Mécanique, 75011 Paris',
    socials: [
      {label: 'LinkedIn', href: '#', iconKey: 'linkedin'},
      {label: 'X', href: '#', iconKey: 'x-twitter'},
      {label: 'YouTube', href: '#', iconKey: 'youtube'},
    ],
  },
  nav: [
    {
      kind: 'mega',
      label: 'Solutions',
      groups: [
        {title: 'Par besoin', items: [
          {title: 'Chiffrage instantané', description: 'Estimez vos travaux en 20 minutes, sans artisan.', iconKey: 'shield', href: '#chiffrage'},
          {title: 'Suivi de chantier', description: "Pilotez l'avancement et les coûts en temps réel.", iconKey: 'calculator', href: '#suivi'},
          {title: 'Devis client', description: 'Générez un livrable pro, validé par un expert.', iconKey: 'ruler', href: '#devis'},
        ]},
        {title: 'Par métier', items: [
          {title: 'Architectes', description: 'Du métré à l\'estimatif détaillé en un flux.', iconKey: 'helmet', href: '#architectes'},
          {title: "Maîtres d'œuvre", description: 'Centralisez tous vos chiffrages sur un poste.', iconKey: 'hammer', href: '#moe'},
          {title: 'Promoteurs', description: 'Fiabilisez vos budgets dès l\'esquisse.', iconKey: 'user', href: '#promoteurs'},
        ]},
      ],
      featured: {
        title: 'Chiffrer juste, gagner plus.',
        description: 'Comment 1 200 pros ont réduit leurs délais de devis de 40 % en six mois.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=70&auto=format&fit=crop',
        linkLabel: "Lire l'étude",
        linkHref: '#etude',
      },
    },
    {
      kind: 'menu',
      label: 'Ressources',
      items: [
        {title: 'Guides & livres blancs', description: 'Méthodes et retours de terrain.', iconKey: 'gauge', href: '#guides'},
        {title: 'Webinaires', description: 'Sessions en direct et replays.', iconKey: 'chart', href: '#webinaires'},
        {title: 'Blog', description: 'Actualité du chiffrage et du chantier.', iconKey: 'file', href: '#blog'},
      ],
    },
    {kind: 'link', label: 'Tarifs', href: '#tarifs'},
    {kind: 'link', label: 'À propos', href: '#a-propos'},
  ],
  actions: {
    login: {label: 'Connexion', href: '#connexion'},
    cta: {label: 'Demander une démo', href: '#demo'},
  },
  languages: ['FR', 'EN', 'DE', 'ES'],
};

/* Données de démonstration du pied de page (maquette 21-footer). */
export const SITE_FOOTER: SiteFooterData = {
  brand: {name: 'Vidomia', href: '/', description: 'La plateforme de chiffrage BTP qui transforme un métré en devis pro, validé par un ingénieur, en moins de 48 h.'},
  newsletter: {
    eyebrow: 'La lettre Vidomia',
    title: {before: 'Le chiffrage juste,', accent: 'une fois par mois.'},
    text: 'Prix de référence, méthodes et retours terrain. Pas de spam, désinscription en un clic.',
    fieldLabel: 'Votre adresse e-mail',
    buttonLabel: "S'abonner",
    mention: 'Vos données restent chez nous — RGPD',
  },
  articles: {
    eyebrow: 'Derniers articles',
    allLabel: 'Tout le blog',
    allHref: '#blog',
    items: [
      {category: 'Chiffrage', title: 'Du devis à la facturation : industrialiser le cycle commercial', date: '02 / 06 / 2026', href: '#a1'},
      {category: 'Méthode', title: "Métré automatique : fiabiliser ses quantités dès l'esquisse", date: '27 / 05 / 2026', href: '#a2'},
      {category: 'Terrain', title: 'Suivi de chantier : garder le budget sous contrôle en temps réel', date: '19 / 05 / 2026', href: '#a3'},
      {category: 'Produit', title: 'Signature électronique : faire valider un devis en deux clics', date: '12 / 05 / 2026', href: '#a4'},
    ],
  },
  columns: [
    {title: 'Produit', links: [{label: 'Chiffrage instantané', href: '#'}, {label: 'Suivi de chantier', href: '#'}, {label: 'Devis client', href: '#'}, {label: 'Métré automatique', href: '#'}, {label: 'Tarifs', href: '#'}]},
    {title: 'Ressources', links: [{label: 'Guides & livres blancs', href: '#'}, {label: 'Webinaires', href: '#'}, {label: 'Blog', href: '#'}, {label: 'Prix de référence', href: '#'}, {label: 'API & docs', href: '#'}]},
    {title: 'Entreprise', links: [{label: 'À propos', href: '#'}, {label: 'Clients', href: '#'}, {label: 'Carrières', href: '#'}, {label: 'Presse', href: '#'}, {label: 'Contact', href: '#'}]},
  ],
  legal: {
    copyright: `© ${new Date().getFullYear()} Vidomia — Tous droits réservés.`,
    line: 'SIRET 902 145 884 00021 · Conçu à Paris',
    links: [{label: 'Mentions légales', href: '#'}, {label: 'Confidentialité', href: '#'}, {label: 'CGU', href: '#'}, {label: 'Cookies', href: '#'}],
  },
};

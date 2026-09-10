/* Données de démonstration de l'en-tête (faux liens et textes, maquette 01-header). */
import type {SiteHeaderData} from '@/components/site-nav';

export const SITE_HEADER: SiteHeaderData = {
  brand: {name: 'Vidomia', href: '/'},
  strip: {
    phone: {label: '01 84 80 09 12', href: 'tel:+33184800912'},
    email: {label: 'contact@vidomia.fr', href: 'mailto:contact@vidomia.fr'},
    hours: 'Lun–Ven · 9h–18h',
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
        eyebrow: 'À la une',
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

import {CATALOG} from './catalog.generated';

/** Structure du catalogue : fondations + catégories de composants Astryx. */

export type NavEntry = {slug: string; label: string; href: string; /** s'ouvre dans un nouvel onglet, hors catalogue */ external?: boolean};

export const FOUNDATIONS: NavEntry[] = [
  {slug: 'couleurs', label: 'Couleurs', href: '/design/fondations/couleurs'},
  {slug: 'typographie', label: 'Typographie', href: '/design/fondations/typographie'},
  {slug: 'espacements', label: 'Espacements', href: '/design/fondations/espacements'},
  {slug: 'formes', label: 'Formes & ombres', href: '/design/fondations/formes'},
  {slug: 'mouvement', label: 'Mouvement', href: '/design/fondations/mouvement'},
  {slug: 'icones', label: 'Icônes', href: '/design/fondations/icones'},
  {slug: 'mise-en-page', label: 'Mise en page ↗', href: '/mise-en-page', external: true},
];

export const CATEGORIES: NavEntry[] = CATALOG.map((c) => ({slug: c.slug, label: c.label, href: c.href}));

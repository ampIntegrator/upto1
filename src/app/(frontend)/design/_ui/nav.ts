/** Structure du catalogue : fondations + catégories de composants Astryx. */

export type NavEntry = {slug: string; label: string; href: string; /** s'ouvre dans un nouvel onglet, hors catalogue */ external?: boolean};

export const FOUNDATIONS: NavEntry[] = [
  {slug: 'couleurs', label: 'Couleurs', href: '/design/fondations/couleurs'},
  {slug: 'typographie', label: 'Typographie', href: '/design/fondations/typographie'},
  {slug: 'espacements', label: 'Espacements', href: '/design/fondations/espacements'},
  {slug: 'grille', label: 'Grille & emprises', href: '/design/fondations/grille'},
  {slug: 'formes', label: 'Formes & ombres', href: '/design/fondations/formes'},
  {slug: 'mouvement', label: 'Mouvement', href: '/design/fondations/mouvement'},
  {slug: 'icones', label: 'Icônes', href: '/design/fondations/icones'},
  {slug: 'mise-en-page', label: 'Page · plein écran image (16) ↗', href: '/mise-en-page', external: true},
  {slug: 'mise-en-page-texte', label: 'Page · plein écran texte et image (02) ↗', href: '/mise-en-page/texte', external: true},
  {slug: 'mise-en-page-image', label: 'Page · haut de page image (25 A) ↗', href: '/mise-en-page/image', external: true},
  {slug: 'mise-en-page-clair', label: 'Page · haut de page clair (25 B) ↗', href: '/mise-en-page/clair', external: true},
  {slug: 'mise-en-page-nuit', label: 'Page · haut de page nuit (25 C) ↗', href: '/mise-en-page/nuit', external: true},
];


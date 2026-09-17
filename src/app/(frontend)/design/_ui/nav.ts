/** Catalog structure: foundations + Astryx component categories. */

export type NavEntry = {slug: string; label: string; href: string; /** opens in a new tab, outside the catalog */ external?: boolean};

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
  {slug: 'mise-en-page-article', label: 'Page · article de blog (18) ↗', href: '/mise-en-page/article', external: true},
  {slug: 'mise-en-page-blog', label: 'Page · blog, liste des articles (19) ↗', href: '/mise-en-page/blog', external: true},
  {slug: 'mise-en-page-realisation', label: 'Page · réalisation (23) ↗', href: '/mise-en-page/realisation', external: true},
  {slug: 'mise-en-page-realisations', label: 'Page · réalisations, liste (24) ↗', href: '/mise-en-page/realisations', external: true},
];


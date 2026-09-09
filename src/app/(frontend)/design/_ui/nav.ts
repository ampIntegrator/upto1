/** Structure du catalogue : fondations + catégories de composants Astryx. */

export type NavEntry = {slug: string; label: string; href: string};

export const FOUNDATIONS: NavEntry[] = [
  {slug: 'couleurs', label: 'Couleurs', href: '/design/fondations/couleurs'},
  {slug: 'typographie', label: 'Typographie', href: '/design/fondations/typographie'},
  {slug: 'espacements', label: 'Espacements', href: '/design/fondations/espacements'},
  {slug: 'formes', label: 'Formes & ombres', href: '/design/fondations/formes'},
  {slug: 'mouvement', label: 'Mouvement', href: '/design/fondations/mouvement'},
  {slug: 'icones', label: 'Icônes', href: '/design/fondations/icones'},
];

export const CATEGORIES: NavEntry[] = [
  {slug: 'actions', label: 'Actions', href: '/design/composants/actions'},
  {slug: 'conteneurs', label: 'Conteneurs', href: '/design/composants/conteneurs'},
  {slug: 'contenu', label: 'Contenu', href: '/design/composants/contenu'},
  {slug: 'retours', label: 'Retours & statuts', href: '/design/composants/retours'},
  {slug: 'formulaires', label: 'Formulaires', href: '/design/composants/formulaires'},
  {slug: 'mise-en-page', label: 'Mise en page', href: '/design/composants/mise-en-page'},
  {slug: 'navigation', label: 'Navigation', href: '/design/composants/navigation'},
  {slug: 'surcouches', label: 'Surcouches', href: '/design/composants/surcouches'},
  {slug: 'tables-listes', label: 'Tables & listes', href: '/design/composants/tables-listes'},
  {slug: 'utilitaires', label: 'Utilitaires', href: '/design/composants/utilitaires'},
  {slug: 'chat', label: 'Chat', href: '/design/composants/chat'},
];

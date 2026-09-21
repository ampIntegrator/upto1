import {texts} from './languages';

/** Admin texts of the page tree (parent page, full address) and of the redirects. */
export const pageTreeText = texts({
  parent: {fr: 'Page parente', en: 'Parent page'},
  parentDescription: {
    fr: ({max}: {max: number}) => `Vide : la page est à la racine du site. Sa place donne son adresse (/parent/page) et son fil d’Ariane ; ${max} niveaux au plus.`,
    en: ({max}: {max: number}) => `Empty: the page sits at the site's root. Its place sets its address (/parent/page) and breadcrumb; ${max} levels at most.`,
  },
  path: {fr: 'Adresse complète', en: 'Full address'},
  pathDescription: {fr: 'Calculée à l’enregistrement. Si elle change, l’ancienne adresse redirige vers la nouvelle (Site › Redirections).', en: 'Computed on save. When it changes, the old address redirects to the new one (Site › Redirects).'},
  breadcrumbs: {fr: 'Fil d’Ariane', en: 'Breadcrumb'},
  homeNoParent: {fr: 'La page d’accueil reste à la racine : elle ne peut pas avoir de page parente.', en: 'The home page stays at the root: it cannot have a parent page.'},
  homeNotParent: {fr: 'La page d’accueil ne peut pas être une page parente.', en: 'The home page cannot be a parent page.'},
  cycle: {fr: 'Une page ne peut pas être rangée sous elle-même ni sous une de ses sous-pages.', en: 'A page cannot be placed under itself or one of its sub-pages.'},
  tooDeep: {
    fr: ({max, depth}: {max: number; depth: number}) => `Ici, la page ou l’une de ses sous-pages serait au niveau ${depth} : ${max} niveaux au plus. Choisissez une page parente plus haute.`,
    en: ({max, depth}: {max: number; depth: number}) => `Here, the page or one of its sub-pages would sit at level ${depth}: ${max} levels at most. Choose a higher parent page.`,
  },
  redirects: {singular: {fr: 'Redirection', en: 'Redirect'}, plural: {fr: 'Redirections', en: 'Redirects'}},
  redirectsDescription: {
    fr: 'Une ancienne adresse → une page, un article, une réalisation ou une adresse libre (redirection permanente). Créées automatiquement quand une page change d’adresse ; ajoutez les vôtres pour d’anciens liens.',
    en: 'An old address → a page, a post, a case study or a custom address (permanent redirect). Created automatically when a page changes address; add your own for old links.',
  },
});

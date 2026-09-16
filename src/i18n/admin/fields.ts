import {texts} from './languages';

/** Admin texts of the shared fields (title, link, slug, silo, icon) and their pickers. */
export const fieldsText = texts({
  tag: {
    label: {fr: 'Balise du titre', en: 'Title tag'},
    description: {fr: 'Structure et référencement seulement : l’aspect ne change pas.', en: 'Structure and SEO only: the look does not change.'},
  },
  title: {
    label: {fr: 'Titre', en: 'Title'},
    description: {
      fr: 'Un retour à la ligne = une nouvelle ligne du titre. Entourez la partie à mettre en serif de la balise <span>…</span>.',
      en: 'A line break = a new title line. Wrap the part to set in serif with a <span>…</span> tag.',
    },
  },
  link: {
    label: {fr: 'Libellé', en: 'Label'},
    href: {fr: 'Adresse (URL ou ancre)', en: 'Address (URL or anchor)'},
    icon: {fr: 'Icône (optionnelle)', en: 'Icon (optional)'},
  },
  slug: {
    label: {fr: 'Slug (adresse)', en: 'Slug (address)'},
    description: {
      fr: "Minuscules, chiffres et tirets. « accueil » = page d'accueil.",
      en: 'Lowercase letters, digits and hyphens. “accueil” = home page.',
    },
    invalid: {fr: 'Minuscules, chiffres et tirets uniquement.', en: 'Lowercase letters, digits and hyphens only.'},
  },
  silo: {
    label: {fr: "Silo d'accent", en: 'Accent silo'},
    siteSilo: {fr: ' (silo du site)', en: ' (site silo)'},
    names: {
      blue: {fr: 'Bleu', en: 'Blue'},
      green: {fr: 'Vert', en: 'Green'},
      orange: {fr: 'Orange', en: 'Orange'},
      violet: {fr: 'Violet', en: 'Purple'},
      magenta: {fr: 'Magenta', en: 'Magenta'},
      ambre: {fr: 'Ambre', en: 'Amber'},
    },
  },
  icon: {
    label: {fr: 'Icône', en: 'Icon'},
    unknown: {fr: ({key}: {key: string}) => `Icône inconnue : ${key}`, en: ({key}: {key: string}) => `Unknown icon: ${key}`},
    none: {fr: 'aucune', en: 'none'},
    choose: {fr: 'Choisir', en: 'Choose'},
    remove: {fr: 'Retirer', en: 'Remove'},
    drawerTitle: {fr: 'Choisir une icône', en: 'Choose an icon'},
    search: {
      fr: ({count}: {count: number}) => `Rechercher parmi ${count} icônes…`,
      en: ({count}: {count: number}) => `Search ${count} icons…`,
    },
    empty: {fr: 'Aucune icône ne correspond.', en: 'No matching icon.'},
  },
  rowLabels: {
    social: {
      fr: ({n}: {n: string}) => `Réseau ${n}`,
      en: ({n}: {n: string}) => `Network ${n}`,
    },
  },
});

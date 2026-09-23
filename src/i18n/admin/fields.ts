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
    kind: {fr: 'Lien vers', en: 'Link to'},
    kindUrl: {fr: 'Adresse', en: 'Address'},
    kindInternal: {fr: 'Contenu du site', en: 'Site content'},
    doc: {fr: 'Contenu (page, article, réalisation, modale)', en: 'Content (page, post, case study, modal)'},
    hrefRequired: {fr: 'Indiquez l’adresse.', en: 'Give the address.'},
    docRequired: {fr: 'Choisissez le contenu.', en: 'Choose the content.'},
  },
  slug: {
    label: {fr: 'Slug (adresse)', en: 'Slug (address)'},
    description: {
      fr: "Minuscules, chiffres et tirets. « accueil » = page d'accueil.",
      en: 'Lowercase letters, digits and hyphens. “accueil” = home page.',
    },
    invalid: {fr: 'Minuscules, chiffres et tirets uniquement.', en: 'Lowercase letters, digits and hyphens only.'},
    reserved: {
      fr: ({slug}: {slug: string}) => `« ${slug} » est réservé par le site.`,
      en: ({slug}: {slug: string}) => `“${slug}” is reserved by the site.`,
    },
    takenByPage: {
      fr: ({slug}: {slug: string}) => `« ${slug} » est déjà l’adresse d’une page.`,
      en: ({slug}: {slug: string}) => `“${slug}” is already a page’s address.`,
    },
    takenByListing: {
      fr: ({slug, listing}: {slug: string; listing: string}) => `« ${slug} » est déjà l’adresse de la liste « ${listing} ».`,
      en: ({slug, listing}: {slug: string; listing: string}) => `“${slug}” is already the address of the “${listing}” list.`,
    },
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
    change: {fr: 'Changer', en: 'Change'},
    set: {fr: 'Icônes du site', en: 'Site icons'},
    unknown: {fr: ({key}: {key: string}) => `Icône inconnue : ${key}`, en: ({key}: {key: string}) => `Unknown icon: ${key}`},
    none: {fr: 'Aucune icône', en: 'No icon'},
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

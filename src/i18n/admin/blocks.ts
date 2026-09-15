import {texts} from './languages';

/** Admin texts of the page top (hero) group. */
export const heroText = texts({
  label: {fr: 'Haut de page', en: 'Page top'},
  fields: {
    variant: {fr: 'Modèle', en: 'Layout'},
    eyebrow: {fr: 'Surtitre (chip ou tirets)', en: 'Eyebrow (chip or dashes)'},
    lead: {fr: 'Chapô', en: 'Lead'},
    primary: {fr: 'Bouton principal', en: 'Primary button'},
    secondary: {fr: 'Bouton secondaire', en: 'Secondary button'},
    image: {fr: 'Image de fond', en: 'Background image'},
    video: {fr: 'Vidéo de fond (mp4)', en: 'Background video (mp4)'},
    poster: {fr: "Image d'attente de la vidéo", en: 'Video poster image'},
    overlay: {fr: 'Calque noir sur le média (0 à 1)', en: 'Black overlay on the media (0 to 1)'},
    scrollHint: {fr: 'Invitation à défiler (vide = aucune)', en: 'Scroll hint (empty = none)'},
    reassurance: {fr: 'Ligne de réassurance', en: 'Reassurance line'},
    text: {fr: 'Texte', en: 'Text'},
    media: {fr: 'Image de droite', en: 'Right-hand image'},
    badges: {fr: "Étiquettes sur l'image", en: 'Labels on the image'},
    tone: {fr: 'Ton', en: 'Tone'},
    breadcrumbMode: {fr: "Fil d'Ariane", en: 'Breadcrumb'},
  },
  variants: {
    mediaImage: {fr: 'Plein écran · image', en: 'Full screen · image'},
    mediaVideo: {fr: 'Plein écran · vidéo', en: 'Full screen · video'},
    split: {fr: 'Plein écran · texte et image', en: 'Full screen · text and image'},
    pageImage: {fr: 'Haut de page · image', en: 'Page top · image'},
    pageGlow: {fr: 'Haut de page · clair', en: 'Page top · light'},
    pageNight: {fr: 'Haut de page · nuit', en: 'Page top · night'},
  },
  tones: {
    accent: {fr: 'Silo', en: 'Silo'},
    night: {fr: 'Nuit', en: 'Night'},
  },
  breadcrumbModes: {
    inherit: {fr: 'Selon le réglage du site', en: 'Site setting'},
    show: {fr: 'Afficher', en: 'Show'},
    hide: {fr: 'Masquer', en: 'Hide'},
  },
});

/** Admin texts of the eight « Carte » blocks. */
export const cardBlockText = texts({
  groups: {
    cards: {fr: 'Cartes', en: 'Cards'},
    clickableCards: {fr: 'Cartes cliquables', en: 'Clickable cards'},
  },
  /** Block name prefix, before « · <media> ». */
  names: {
    card: {fr: 'Carte', en: 'Card'},
    clickableCard: {fr: 'Carte cliquable', en: 'Clickable card'},
  },
  /** Plural suffix appended to the block name. */
  pluralSuffix: {fr: ' (pl.)', en: ' (pl.)'},
  media: {
    image: {fr: 'image', en: 'image'},
    icon: {fr: 'icône', en: 'icon'},
    number: {fr: 'nombre', en: 'number'},
    title: {fr: 'titre seul', en: 'title only'},
  },
  fields: {
    image: {fr: 'Image', en: 'Image'},
    icon: {fr: 'Icône', en: 'Icon'},
    prefix: {fr: 'Préfixe', en: 'Prefix'},
    value: {fr: 'Nombre', en: 'Number'},
    suffix: {fr: 'Suffixe', en: 'Suffix'},
    title: {fr: 'Titre', en: 'Title'},
    text: {fr: 'Texte', en: 'Text'},
    cta: {fr: "Bouton d'action", en: 'Action button'},
  },
});

/** Texts shared by the Image and Image-with-quote blocks. */
const mediaShared = texts({
  group: {fr: 'Média', en: 'Media'},
  image: {fr: 'Image', en: 'Image'},
  imageDescription: {
    fr: 'Le texte alternatif se règle dans la médiathèque. Vide : image décorative.',
    en: 'Alt text is set in the media library. Empty: decorative image.',
  },
  minHeight: {fr: 'Hauteur minimale desktop', en: 'Desktop minimum height'},
  minHeightDescription: {
    fr: "Seulement si la rangée n'a pas d'autre contenu ; sinon l'image prend la hauteur de la rangée.",
    en: 'Only if the row has no other content; otherwise the image takes the row height.',
  },
  minHeightMobile: {fr: 'Hauteur minimale mobile', en: 'Mobile minimum height'},
  minHeightMobileDescription: {fr: 'Sous 768 px, colonnes empilées.', en: 'Below 768 px, stacked columns.'},
  overlay: {fr: 'Calque noir (0 à 1)', en: 'Black overlay (0 to 1)'},
});

export const mediaBlockText = texts({
  name: {fr: 'Image', en: 'Image'},
  plural: {fr: 'Images', en: 'Images'},
  ...mediaShared,
});

export const mediaQuoteBlockText = texts({
  name: {fr: 'Image avec citation', en: 'Image with quote'},
  plural: {fr: 'Images avec citation', en: 'Images with quote'},
  ...mediaShared,
  text: {fr: 'Phrase', en: 'Sentence'},
  tag: {fr: 'Balise', en: 'Tag'},
  tagDescription: {
    fr: 'Pour la structure et le référencement ; ne change pas la taille.',
    en: 'For structure and SEO; does not change the size.',
  },
  size: {fr: 'Taille', en: 'Size'},
  overlayDescription: {
    fr: 'À ajuster selon l’image, pour que la phrase reste lisible.',
    en: 'Adjust to the image so the sentence stays readable.',
  },
  sizes: {
    display1: {fr: 'Très grande (display-1)', en: 'Extra large (display-1)'},
    display2: {fr: 'Grande (display-2)', en: 'Large (display-2)'},
    display3: {fr: 'Moyenne (display-3)', en: 'Medium (display-3)'},
    heading1: {fr: 'Normale (titre 1, 26 px)', en: 'Normal (heading 1, 26 px)'},
    heading2: {fr: 'Petite (titre 2, 22 px)', en: 'Small (heading 2, 22 px)'},
  },
});

export const emptyBlockText = texts({
  name: {fr: 'Case vide', en: 'Empty cell'},
  plural: {fr: 'Cases vides', en: 'Empty cells'},
  group: {fr: 'Structure', en: 'Layout'},
});

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
});

/** Texts shared by the pricing blocks (single price and tier). */
const pricingShared = texts({
  featuresLabel: {fr: 'Titre de la liste', en: 'List title'},
  features: {fr: 'Ce que comprend l’offre', en: 'What the offer includes'},
  feature: {fr: 'Élément', en: 'Item'},
  featureLabel: {fr: 'Libellé', en: 'Label'},
  featureEnd: {fr: 'Valeur barrée en fin de ligne', en: 'Struck-through value at the end of the line'},
  price: {fr: 'Prix', en: 'Price'},
  priceValue: {fr: 'Montant (tel qu’affiché : « 79 », « 1 490 »)', en: 'Amount as displayed (« 79 », « 1,490 »)'},
  priceCurrency: {fr: 'Devise', en: 'Currency'},
  pricePeriod: {fr: 'Période (« / mois », « par mois · soit 2,60 € / jour »)', en: 'Period (« / month », « per month · 2.60 € / day »)'},
  cta: {fr: 'Bouton', en: 'Button'},
  mention: {fr: 'Mention sous le bouton', en: 'Note below the button'},
  guarantee: {fr: 'Garantie', en: 'Guarantee'},
  guaranteeTitle: {fr: 'Titre', en: 'Title'},
  guaranteeText: {fr: 'Texte', en: 'Text'},
});

export const priceSingleBlockText = texts({
  name: {fr: 'Prix unique', en: 'Single price'},
  plural: {fr: 'Prix uniques', en: 'Single prices'},
  ...pricingShared,
  totalLabel: {fr: 'Libellé de la valeur totale', en: 'Total value label'},
  totalValue: {fr: 'Valeur totale (barrée)', en: 'Total value (struck through)'},
  priceLabel: {fr: 'Titre au-dessus du prix', en: 'Title above the price'},
});

export const planBlockText = texts({
  name: {fr: 'Palier de prix', en: 'Price tier'},
  plural: {fr: 'Paliers de prix', en: 'Price tiers'},
  ...pricingShared,
  planName: {fr: 'Nom du palier', en: 'Tier name'},
  tagline: {fr: 'Accroche', en: 'Tagline'},
  featured: {fr: 'Palier mis en avant (cadre silo, chip)', en: 'Featured tier (silo frame, chip)'},
  badge: {fr: 'Texte du chip', en: 'Chip text'},
  inherits: {fr: 'Nom du palier précédent (« Tout Solo, plus »)', en: 'Previous tier name (« Everything in Solo, plus »)'},
  inheritsDescription: {fr: 'Vide : la liste porte le titre ci-dessus.', en: 'Empty: the list uses the title above.'},
});

export const faqBlockText = texts({
  name: {fr: 'FAQ (dépliants)', en: 'FAQ (collapsibles)'},
  plural: {fr: 'FAQ', en: 'FAQs'},
  mode: {fr: 'Ouverture', en: 'Opening'},
  modeSingle: {fr: 'Une seule question ouverte à la fois', en: 'One question open at a time'},
  modeMultiple: {fr: 'Plusieurs questions ouvertes', en: 'Several questions open'},
  columns: {fr: 'Colonnes', en: 'Columns'},
  columnsOne: {fr: 'Empilé', en: 'Stacked'},
  columnsTwo: {fr: 'Deux colonnes (une seule sous ~900 px)', en: 'Two columns (one below ~900 px)'},
  firstOpen: {fr: 'Première question ouverte au chargement', en: 'First question open on load'},
  items: {fr: 'Questions', en: 'Questions'},
  item: {fr: 'Question', en: 'Question'},
  question: {fr: 'Question', en: 'Question'},
  answer: {fr: 'Réponse', en: 'Answer'},
  answerDescription: {fr: 'Une ligne vide sépare deux paragraphes.', en: 'A blank line separates two paragraphs.'},
});

export const testimonialBlockText = texts({
  name: {fr: 'Témoignage', en: 'Testimonial'},
  plural: {fr: 'Témoignages', en: 'Testimonials'},
  quote: {fr: 'Citation', en: 'Quote'},
  personName: {fr: 'Nom', en: 'Name'},
  role: {fr: 'Rôle et lieu (« Courtière · Lyon »)', en: 'Role and place (« Broker · Lyon »)'},
  result: {fr: 'Résultat chiffré (chip)', en: 'Numeric result (chip)'},
});

export const compareCardBlockText = texts({
  name: {fr: 'Carte comparative', en: 'Compare card'},
  plural: {fr: 'Cartes comparatives', en: 'Compare cards'},
  chip: {fr: 'Chip', en: 'Chip'},
  chipLabel: {fr: 'Texte (« AVANT », « APRÈS »)', en: 'Text (« BEFORE », « AFTER »)'},
  chipTone: {fr: 'Couleur', en: 'Colour'},
  tones: {
    accent: {fr: 'Silo', en: 'Silo'},
    high: {fr: 'Highlight', en: 'Highlight'},
    danger: {fr: 'Rouge', en: 'Red'},
    cat: {fr: 'Or', en: 'Gold'},
    line: {fr: 'Filet', en: 'Outline'},
  },
  meta: {fr: 'Repère à droite du chip', en: 'Marker to the right of the chip'},
  quote: {fr: 'Citation', en: 'Quote'},
  items: {fr: 'Liste', en: 'List'},
  item: {fr: 'Ligne', en: 'Line'},
  itemLabel: {fr: 'Texte', en: 'Text'},
  tone: {fr: 'Pastilles', en: 'Bullets'},
  toneCheck: {fr: 'Coches silo', en: 'Silo checks'},
  toneCross: {fr: 'Croix rouges', en: 'Red crosses'},
  featured: {fr: 'Carte mise en avant (cadre silo, repère or)', en: 'Featured card (silo frame, gold marker)'},
});

export const processStepsBlockText = texts({
  name: {fr: 'Étapes', en: 'Steps'},
  plural: {fr: 'Panneaux d’étapes', en: 'Steps panels'},
  steps: {fr: 'Étapes', en: 'Steps'},
  step: {fr: 'Étape', en: 'Step'},
  stepsDescription: {
    fr: 'Capacité selon la largeur de la colonne : 1 étape sur 4 ou 5 colonnes, 2 sur 6 ou 7, 3 sur 8 ou 9, 4 sur 12.',
    en: 'Capacity by column width: 1 step on 4 or 5 columns, 2 on 6 or 7, 3 on 8 or 9, 4 on 12.',
  },
  title: {fr: 'Titre', en: 'Title'},
  text: {fr: 'Texte', en: 'Text'},
  duration: {fr: 'Durée (chip : « 5 min », « 48 h »)', en: 'Duration (chip: « 5 min », « 48 h »)'},
  checks: {fr: 'Liste à pastilles', en: 'Check list'},
  check: {fr: 'Ligne', en: 'Line'},
  checkLabel: {fr: 'Texte', en: 'Text'},
  asterisk: {fr: 'Astérisque après le titre (renvoi à la note)', en: 'Asterisk after the title (refers to the note)'},
  tooMany: {
    fr: ({count, capacity, span}: {count: number; capacity: number; span: number}) => `${count} étape${count > 1 ? 's' : ''} pour une colonne de ${span} qui en accepte ${capacity}. Élargissez la colonne ou retirez des étapes.`,
    en: ({count, capacity, span}: {count: number; capacity: number; span: number}) => `${count} step${count > 1 ? 's' : ''} in a column of ${span} that holds ${capacity}. Widen the column or remove steps.`,
  },
});

export const collectionBlockText = texts({
  name: {fr: 'Collection (contenus identiques)', en: 'Collection (identical items)'},
  plural: {fr: 'Collections', en: 'Collections'},
  layout: {fr: 'Mise en page', en: 'Layout'},
  layoutSwipe: {fr: 'Côte à côte, glisser sur mobile', en: 'Side by side, swipe on mobile'},
  layoutCarousel: {fr: 'Carrousel (flèches, indicateur)', en: 'Carousel (arrows, indicator)'},
  perView: {fr: 'Éléments visibles', en: 'Items per view'},
  perViewDescription: {fr: '3 au plus sur 8 ou 9 colonnes, 4 sur 12. Deux lignes = deux rangées.', en: '3 at most on 8 or 9 columns, 4 on 12. Two lines = two rows.'},
  step: {fr: 'Défilement', en: 'Scrolling'},
  stepPage: {fr: 'Une page (les éléments visibles)', en: 'One page (the visible items)'},
  stepItem: {fr: 'Un élément à la fois', en: 'One item at a time'},
  arrows: {fr: 'Flèches (masquées sous 640 px)', en: 'Arrows (hidden below 640 px)'},
  indicator: {fr: 'Indicateur', en: 'Indicator'},
  indicatorSegments: {fr: 'Segments', en: 'Segments'},
  indicatorDots: {fr: 'Points', en: 'Dots'},
  indicatorNumbers: {fr: 'Numéros (2 / 5)', en: 'Numbers (2 / 5)'},
  indicatorNone: {fr: 'Aucun', en: 'None'},
  source: {fr: 'Source des éléments', en: 'Items source'},
  sourceManual: {fr: 'Saisis ici', en: 'Entered here'},
  sourcePosts: {fr: 'Derniers articles du blog', en: 'Latest blog posts'},
  items: {fr: 'Éléments (tous du même type)', en: 'Items (all of the same type)'},
  item: {fr: 'Élément', en: 'Item'},
  itemsDescription: {fr: 'Deux éléments au moins, tous du même type : témoignages, cartes, cartes comparatives ou paliers.', en: 'At least two items, all of the same type: testimonials, cards, compare cards or tiers.'},
  postsLimit: {fr: 'Nombre d’articles', en: 'Number of posts'},
  postsCategory: {fr: 'Catégorie (vide : toutes)', en: 'Category (empty: all)'},
  postsCta: {fr: 'Libellé du lien des cartes', en: 'Card link label'},
  tooMany: {
    fr: ({perView, capacity, span}: {perView: number; capacity: number; span: number}) => `${perView} éléments visibles pour une colonne de ${span} qui en accepte ${capacity}.`,
    en: ({perView, capacity, span}: {perView: number; capacity: number; span: number}) => `${perView} items per view in a column of ${span} that holds ${capacity}.`,
  },
  mixed: {fr: 'Tous les éléments doivent être du même type.', en: 'All items must be of the same type.'},
  tooFew: {fr: 'Deux éléments au moins.', en: 'At least two items.'},
});

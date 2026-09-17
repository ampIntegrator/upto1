import {texts} from './languages';

/** Admin texts of the Site settings global. */
export const settingsText = texts({
  label: {fr: 'Réglages du site', en: 'Site settings'},
  group: {fr: 'Site', en: 'Site'},
  tabs: {
    identity: {fr: 'Identité', en: 'Identity'},
    contact: {fr: 'Coordonnées', en: 'Contact details'},
    networks: {fr: 'Réseaux', en: 'Networks'},
    navigation: {fr: 'Navigation', en: 'Navigation'},
    layout: {fr: 'Mise en page', en: 'Layout'},
  },
  identity: {
    silo: {fr: "Silo d'accent du site", en: 'Site accent silo'},
    siloDescription: {fr: 'Couleur de référence de tout le site. Une page peut la surcharger.', en: 'Reference color for the whole site. A page can override it.'},
    brandName: {fr: 'Nom de la marque', en: 'Brand name'},
    logo: {fr: 'Logo (SVG de préférence)', en: 'Logo (SVG preferred)'},
    baseline: {fr: 'Description courte (pied de page)', en: 'Short description (footer)'},
  },
  contact: {
    phone: {fr: 'Téléphone affiché', en: 'Displayed phone'},
    phoneHref: {fr: 'Téléphone (lien tel:)', en: 'Phone (tel: link)'},
    email: {fr: 'E-mail', en: 'Email'},
    hours: {fr: 'Horaires', en: 'Opening hours'},
    address: {fr: 'Adresse postale', en: 'Postal address'},
  },
  networks: {
    socials: {fr: 'Réseaux sociaux', en: 'Social networks'},
    socialSingular: {fr: 'Réseau', en: 'Network'},
    socialPlural: {fr: 'Réseaux', en: 'Networks'},
    name: {fr: 'Nom', en: 'Name'},
    href: {fr: 'Adresse', en: 'URL'},
    icon: {fr: 'Icône', en: 'Icon'},
  },
  breadcrumb: {
    label: {fr: "Fil d'Ariane", en: 'Breadcrumb'},
    enabled: {fr: 'Afficher le fil d\'Ariane sous les hauts de page', en: 'Show the breadcrumb below page headers'},
    homeStyle: {fr: 'Premier maillon (accueil)', en: 'First item (home)'},
    homeIcon: {fr: 'Icône maison', en: 'Home icon'},
    homeText: {fr: 'Texte', en: 'Text'},
    homeLabel: {fr: 'Libellé de l\'accueil (affiché en texte, sinon lu par les lecteurs d\'écran)', en: 'Home label (shown as text, otherwise read by screen readers)'},
  },
  sectionGrid: {
    label: {fr: 'Grille des sections', en: 'Section grid'},
    description: {fr: "Écarts par défaut des sections construites dans l'onglet Contenu des pages. Chaque section peut les surcharger.", en: 'Default gaps for sections built in the Content tab of pages. Each section can override them.'},
    gapX: {fr: 'Écart entre colonnes', en: 'Column gap'},
    gapY: {fr: 'Écart entre rangées', en: 'Row gap'},
    gapYMobile: {fr: 'Écart vertical mobile', en: 'Mobile vertical gap'},
    gapYMobileDescription: {fr: 'Sous 768 px, entre tous les blocs empilés.', en: 'Below 768 px, between all stacked blocks.'},
  },
});

/** Admin texts of the Header global. */
export const headerText = texts({
  label: {fr: 'En-tête', en: 'Header'},
  description: {fr: 'Coordonnées et réseaux du bandeau viennent des Réglages du site.', en: 'Contact details and networks in the top bar come from Site settings.'},
  nav: {fr: 'Navigation principale', en: 'Main navigation'},
  login: {fr: 'Bouton « Connexion »', en: '“Log in” button'},
  cta: {fr: 'Bouton principal', en: 'Main button'},
  fields: {
    title: {fr: 'Titre', en: 'Title'},
    label: {fr: 'Libellé', en: 'Label'},
    href: {fr: 'Adresse', en: 'URL'},
    description: {fr: 'Description (une ligne)', en: 'Description (one line)'},
    icon: {fr: 'Icône', en: 'Icon'},
  },
  linkBlock: {
    singular: {fr: 'Lien simple', en: 'Simple link'},
    plural: {fr: 'Liens simples', en: 'Simple links'},
  },
  menuBlock: {
    singular: {fr: 'Menu déroulant', en: 'Dropdown menu'},
    plural: {fr: 'Menus déroulants', en: 'Dropdown menus'},
    items: {fr: 'Entrées (4 au plus)', en: 'Items (4 max)'},
    itemSingular: {fr: 'Entrée', en: 'Item'},
    itemPlural: {fr: 'Entrées', en: 'Items'},
  },
  megaBlock: {
    singular: {fr: 'Méga-menu', en: 'Mega menu'},
    plural: {fr: 'Méga-menus', en: 'Mega menus'},
    groups: {fr: 'Piles de liens (2 au plus)', en: 'Link stacks (2 max)'},
    groupSingular: {fr: 'Pile', en: 'Stack'},
    groupPlural: {fr: 'Piles', en: 'Stacks'},
    groupTitle: {fr: 'Titre de la pile', en: 'Stack title'},
    items: {fr: 'Liens (4 au plus)', en: 'Links (4 max)'},
    itemSingular: {fr: 'Lien', en: 'Link'},
    itemPlural: {fr: 'Liens', en: 'Links'},
    featured: {fr: 'Article mis en avant (zone de droite)', en: 'Featured post (right area)'},
    featuredDescription: {fr: 'Image, titre, extrait et lien viennent de l\'article.', en: 'Image, title, excerpt and link come from the post.'},
    featuredLinkLabel: {fr: 'Libellé du lien de l\'article', en: 'Post link label'},
  },
});

/** Admin texts of the Footer global. */
export const footerText = texts({
  label: {fr: 'Pied de page', en: 'Footer'},
  description: {fr: 'Marque, coordonnées et réseaux viennent des Réglages du site ; les articles en bref sont les trois derniers publiés.', en: 'Brand, contact details and networks come from Site settings; the news items are the three latest published posts.'},
  link: {
    label: {fr: 'Libellé', en: 'Label'},
    href: {fr: 'Adresse', en: 'URL'},
    singular: {fr: 'Lien', en: 'Link'},
    plural: {fr: 'Liens', en: 'Links'},
  },
  tabs: {
    newsletter: {fr: 'Newsletter', en: 'Newsletter'},
    articles: {fr: 'Articles en bref', en: 'News in brief'},
    columns: {fr: 'Colonnes de liens', en: 'Link columns'},
    legal: {fr: 'Mentions', en: 'Legal'},
  },
  newsletter: {
    enabled: {fr: 'Afficher la newsletter', en: 'Show the newsletter'},
    label: {fr: 'Newsletter', en: 'Newsletter'},
    eyebrow: {fr: 'Surtitre', en: 'Eyebrow'},
    text: {fr: 'Texte', en: 'Text'},
    fieldLabel: {fr: 'Libellé du champ', en: 'Field label'},
    buttonLabel: {fr: 'Libellé du bouton', en: 'Button label'},
    mention: {fr: 'Mention (RGPD)', en: 'Notice (GDPR)'},
  },
  articles: {
    enabled: {fr: 'Afficher les trois derniers articles', en: 'Show the three latest posts'},
    label: {fr: 'Articles', en: 'Posts'},
    allLabel: {fr: 'Libellé « tous les articles »', en: '“All posts” label'},
  },
  columns: {
    label: {fr: 'Colonnes (4 au plus)', en: 'Columns (4 max)'},
    singular: {fr: 'Colonne', en: 'Column'},
    plural: {fr: 'Colonnes', en: 'Columns'},
    title: {fr: 'Titre', en: 'Title'},
    links: {fr: 'Liens (4 au plus)', en: 'Links (4 max)'},
  },
  legal: {
    copyright: {fr: 'Copyright', en: 'Copyright'},
    legalLine: {fr: 'Ligne légale (SIRET…)', en: 'Legal line (company ID…)'},
    legalLinks: {fr: 'Liens légaux', en: 'Legal links'},
  },
});

/** Admin texts of the Languages global. */
export const languagesText = texts({
  label: {fr: 'Langues', en: 'Languages'},
  languages: {
    label: {fr: 'Langues proposées dans le sélecteur du site', en: 'Languages offered in the site switcher'},
    description: {fr: 'Les contenus sont traduisibles champ par champ (sélecteur « Langue du contenu » en haut de chaque page d\'admin). Une langue non traduite affiche le français.', en: 'Content is translatable field by field (“Content language” selector at the top of each admin page). An untranslated language shows French.'},
  },
});

/** Admin texts shared by the listing settings globals (blog, case studies): src/fields/listingSettings.ts. */
const listingCommonText = {
  page: {fr: 'Page choisie', en: 'Chosen page'},
  title: {fr: 'Titre (h1)', en: 'Title (h1)'},
  titleDescription: {fr: 'Un mot entre <span>…</span> passe en serif accentué.', en: 'A word between <span>…</span> is set in accent serif.'},
  eyebrow: {fr: 'Surtitre', en: 'Eyebrow'},
  lead: {fr: 'Chapô (facultatif)', en: 'Lead (optional)'},
  tone: {fr: 'Ton du haut de page', en: 'Page top tone'},
  toneLight: {fr: 'Clair', en: 'Light'},
  toneNight: {fr: 'Nuit', en: 'Night'},
  labelsGroup: {fr: 'Libellés', en: 'Labels'},
  all: {fr: 'Filtre « tous »', en: '« All » filter'},
  readMore: {fr: 'Lien des cartes', en: 'Card link'},
  categoryPrefix: {fr: 'Surtitre des archives de catégorie', en: 'Category archive eyebrow'},
  empty: {fr: 'Liste vide', en: 'Empty list'},
};

/** Admin texts of the Blog settings global (Blog group, next to posts, categories and authors). */
export const blogText = texts({
  ...listingCommonText,
  label: {fr: 'Réglages du blog', en: 'Blog settings'},
  tabs: {
    page: {fr: 'Page du blog', en: 'Blog page'},
    labels: {fr: 'Libellés', en: 'Labels'},
  },
  description: {fr: 'La page choisie affiche la liste des articles à la place de son contenu, avec le titre et le chapô ci-dessous. Les articles et les archives de catégorie prennent son adresse : /<page>/<article>, /<page>/categorie/<catégorie>.', en: 'The chosen page shows the list of posts instead of its content, with the title and lead below. Posts and category archives take its address: /<page>/<post>, /<page>/categorie/<category>.'},
  perPage: {fr: 'Articles par page', en: 'Posts per page'},
  relatedEyebrow: {fr: 'Surtitre des articles liés', en: 'Related posts eyebrow'},
  relatedTitle: {fr: 'Titre des articles liés', en: 'Related posts title'},
  more: {fr: 'Bouton vers le blog', en: 'Button to the blog'},
  dateLabel: {fr: 'Libellé de la date', en: 'Date label'},
  toc: {fr: 'Titre du sommaire', en: 'Table of contents title'},
  notice: {fr: 'Cette page est la page du blog (Blog › Réglages du blog) : son haut de page et ses sections ne sont pas affichés, le site montre la liste des articles.', en: 'This page is the blog page (Blog › Blog settings): its page top and sections are not displayed, the site shows the list of posts.'},
});

/** Admin texts of the Case studies settings global (Réalisations group). */
export const portfolioText = texts({
  ...listingCommonText,
  label: {fr: 'Réglages des réalisations', en: 'Case studies settings'},
  tabs: {
    page: {fr: 'Page des réalisations', en: 'Case studies page'},
    labels: {fr: 'Fiche et libellés', en: 'Fact sheet and labels'},
  },
  description: {fr: 'La page choisie affiche la liste des réalisations à la place de son contenu, avec le titre et le chapô ci-dessous. Les réalisations et les archives de catégorie prennent son adresse : /<page>/<réalisation>, /<page>/categorie/<catégorie>.', en: 'The chosen page shows the list of case studies instead of its content, with the title and lead below. Case studies and category archives take their address from it: /<page>/<case study>, /<page>/categorie/<category>.'},
  perPage: {fr: 'Réalisations par page', en: 'Case studies per page'},
  relatedEyebrow: {fr: 'Surtitre des réalisations liées', en: 'Related case studies eyebrow'},
  relatedTitle: {fr: 'Titre des réalisations liées', en: 'Related case studies title'},
  more: {fr: 'Bouton vers les réalisations', en: 'Button to the case studies'},
  badge: {fr: 'Chip du haut de page', en: 'Page top chip'},
  sheet: {fr: 'Libellés de la fiche projet', en: 'Fact sheet labels'},
  sheetDescription: {fr: 'Chaque réalisation peut remplacer un libellé dans son onglet Fiche projet.', en: 'Each case study can replace a label in its Fact sheet tab.'},
  client: {fr: 'Client', en: 'Client'},
  category: {fr: 'Catégorie', en: 'Category'},
  location: {fr: 'Localisation', en: 'Location'},
  deployment: {fr: 'Déploiement', en: 'Deployment'},
  modules: {fr: 'Modules', en: 'Modules'},
  clientLink: {fr: 'Lien du site client (lecteurs d’écran)', en: 'Client site link (screen readers)'},
  cta: {fr: 'Bouton de la fiche', en: 'Fact sheet button'},
  ctaDescription: {fr: 'Bouton sous les chiffres de la fiche. Chaque réalisation peut le remplacer.', en: 'Button under the fact sheet figures. Each case study can replace it.'},
  ctaLabel: {fr: 'Texte', en: 'Label'},
  ctaHref: {fr: 'Lien', en: 'Link'},
  notice: {fr: 'Cette page est la page des réalisations (Réalisations › Réglages des réalisations) : son haut de page et ses sections ne sont pas affichés, le site montre la liste des réalisations.', en: 'This page is the case studies page (Case studies › Case studies settings): its page top and sections are not displayed, the site shows the list of case studies.'},
});

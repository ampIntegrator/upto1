import {texts} from './languages';

/** Admin texts of the collections (Categories, Case studies, Media, Pages, Posts, Sections, Users). */
export const collectionsText = texts({
  groups: {
    blog: {fr: 'Blog', en: 'Blog'},
    cases: {fr: 'Réalisations', en: 'Case studies'},
    site: {fr: 'Site', en: 'Site'},
  },
  categories: {
    singular: {fr: 'Catégorie', en: 'Category'},
    plural: {fr: 'Catégories', en: 'Categories'},
    fields: {
      title: {fr: 'Nom', en: 'Name'},
    },
  },
  caseCategories: {
    singular: {fr: 'Catégorie', en: 'Category'},
    plural: {fr: 'Catégories', en: 'Categories'},
  },
  caseStudies: {
    singular: {fr: 'Réalisation', en: 'Case study'},
    plural: {fr: 'Réalisations', en: 'Case studies'},
    tabs: {
      caseStudy: {fr: 'Réalisation', en: 'Case study'},
      sheet: {fr: 'Fiche projet', en: 'Fact sheet'},
      sheetDescription: {fr: 'La colonne de gauche de la réalisation : lignes de texte, deux chiffres, bouton. Un libellé laissé vide reprend celui des réglages des réalisations.', en: 'The left column of the case study: text rows, two figures, a button. An empty label uses the one of the case studies settings.'},
      sections: {fr: 'Sections après la réalisation', en: 'Sections after the case study'},
      sectionsDescription: {fr: 'Facultatif : une FAQ, un appel à l’action ou tout contenu du constructeur, affiché sous la réalisation et avant les réalisations liées.', en: 'Optional: a FAQ, a call to action or any builder content, shown under the case study and before the related case studies.'},
    },
    fields: {
      title: {fr: 'Titre', en: 'Title'},
      titleDescription: {fr: 'Un mot entre <span>…</span> passe en serif accentué dans le haut de page.', en: 'A word between <span>…</span> is set in accent serif in the page top.'},
      excerpt: {fr: 'Chapô (aussi la description SEO par défaut)', en: 'Lead (also the default SEO description)'},
      cover: {fr: 'Image à la une (pleine largeur, 1920 px de large de préférence)', en: 'Featured image (full width, 1920 px wide preferred)'},
      content: {fr: 'Récit', en: 'Story'},
      contentDescription: {fr: 'Comme un article : titres h2 à h4, listes, citation, images légendées, tableaux, et blocs insérés (bandeau de chiffres, galerie, À retenir, carte citation, bandeau d’appel).', en: 'Like a post: headings h2 to h4, lists, quote, captioned images, tables, and inserted blocks (stats band, gallery, key points, quote card, call-to-action band).'},
      category: {fr: 'Catégorie', en: 'Category'},
      publishedAt: {fr: 'Date de publication', en: 'Publication date'},
      client: {fr: 'Client', en: 'Client'},
      clientUrl: {fr: 'Site du client (lien)', en: 'Client website (link)'},
      location: {fr: 'Localisation', en: 'Location'},
      deployment: {fr: 'Déploiement', en: 'Deployment'},
      deploymentPlaceholder: {fr: '6 semaines · mars 2025', en: '6 weeks · March 2025'},
      modules: {fr: 'Modules', en: 'Modules'},
      labelOverride: {fr: 'Libellé (facultatif)', en: 'Label (optional)'},
      results: {fr: 'Chiffres de la fiche', en: 'Fact sheet figures'},
      resultsDescription: {fr: 'Deux au plus, sous les lignes de la fiche.', en: 'Two at most, under the fact sheet rows.'},
      resultSingular: {fr: 'Chiffre', en: 'Figure'},
      resultPlural: {fr: 'Chiffres', en: 'Figures'},
      resultValue: {fr: 'Valeur (« −68 % »)', en: 'Value (« −68 % »)'},
      resultLabel: {fr: 'Libellé (« Temps de chiffrage »)', en: 'Label (« Quoting time »)'},
      cardResult: {fr: 'Résultat de la carte', en: 'Card result'},
      cardResultDescription: {fr: 'Court, à droite de la catégorie sur les cartes (« −68 % délai »). Vide : la valeur du premier chiffre.', en: 'Short, right of the category on cards (« −68 % lead time »). Empty: the first figure’s value.'},
      cta: {fr: 'Bouton de la fiche', en: 'Fact sheet button'},
      ctaDescription: {fr: 'Vide : le bouton des réglages des réalisations.', en: 'Empty: the button of the case studies settings.'},
      ctaLabel: {fr: 'Texte', en: 'Label'},
      ctaHref: {fr: 'Lien', en: 'Link'},
    },
  },
  media: {
    singular: {fr: 'Média', en: 'Media'},
    plural: {fr: 'Médias', en: 'Media'},
    fields: {
      alt: {fr: 'Texte alternatif', en: 'Alt text'},
    },
  },
  pages: {
    singular: {fr: 'Page', en: 'Page'},
    plural: {fr: 'Pages', en: 'Pages'},
    tabs: {
      pageTop: {fr: 'Haut de page', en: 'Page top'},
      content: {fr: 'Contenu', en: 'Content'},
      contentDescription: {
        fr: 'Une page est une pile de sections ; chaque section, des rangées de colonnes remplies de contenus (Fondations « Grille & emprises » du catalogue).',
        en: 'A page is a stack of sections; each section, rows of columns filled with content (catalogue Foundations, “Grid & spans”).',
      },
    },
    fields: {
      title: {fr: 'Titre de la page', en: 'Page title'},
      siloDescription: {
        fr: 'Présélectionné sur le silo du site ; changez-le pour cette page seulement.',
        en: 'Preset to the site silo; change it for this page only.',
      },
    },
  },
  authors: {
    singular: {fr: 'Auteur', en: 'Author'},
    plural: {fr: 'Auteurs', en: 'Authors'},
    fields: {
      name: {fr: 'Nom', en: 'Name'},
      role: {fr: 'Rôle (« Responsable produit · Vidomia »)', en: 'Role (« Product lead · Vidomia »)'},
      photo: {fr: 'Photo (carrée de préférence)', en: 'Photo (square preferred)'},
    },
  },
  posts: {
    singular: {fr: 'Article', en: 'Post'},
    plural: {fr: 'Articles', en: 'Posts'},
    tabs: {
      post: {fr: 'Article', en: 'Post'},
      sections: {fr: 'Sections après l’article', en: 'Sections after the post'},
      sectionsDescription: {fr: 'Facultatif : une FAQ, un appel à l’action ou tout contenu du constructeur, affiché sous l’article et avant les articles liés.', en: 'Optional: a FAQ, a call to action or any builder content, shown under the post and before the related posts.'},
    },
    fields: {
      title: {fr: 'Titre', en: 'Title'},
      cover: {fr: 'Image de couverture', en: 'Cover image'},
      excerpt: {fr: 'Chapô (aussi l’extrait des cartes et la description SEO par défaut)', en: 'Lead (also the cards’ excerpt and the default SEO description)'},
      content: {fr: 'Contenu', en: 'Content'},
      contentDescription: {fr: 'Titres h2 à h4 (le sommaire s’y accroche), listes, citation (une dernière ligne « — Nom » devient l’attribution), images légendées, tableaux, et blocs insérés : À retenir, bandeau d’appel, bandeau de chiffres, carte citation, galerie.', en: 'Headings h2 to h4 (the table of contents uses them), lists, quote (a last line « — Name » becomes the attribution), captioned images, tables, and inserted blocks: key points, call-to-action band, stats band, quote card, gallery.'},
      coverCaption: {fr: 'Légende de l’image', en: 'Image caption'},
      author: {fr: 'Auteur', en: 'Author'},
      category: {fr: 'Catégorie', en: 'Category'},
      publishedAt: {fr: 'Date de publication', en: 'Publication date'},
    },
  },
  sections: {
    singular: {fr: 'Section partagée', en: 'Shared section'},
    plural: {fr: 'Sections partagées', en: 'Shared sections'},
    fields: {
      title: {fr: 'Nom (admin seulement)', en: 'Name (admin only)'},
    },
  },
  users: {
    singular: {fr: 'Utilisateur', en: 'User'},
    plural: {fr: 'Utilisateurs', en: 'Users'},
    fields: {
      name: {fr: 'Nom', en: 'Name'},
      sessionDays: {fr: 'Rester connecté', en: 'Stay signed in'},
      sessionDaysDescription: {
        fr: 'Durée pendant laquelle la session reste ouverte, comptée depuis votre dernière activité dans l’admin.',
        en: 'How long the session stays open, counted from your last activity in the admin.',
      },
      sessionNone: {fr: 'Non (2 heures sans activité)', en: 'No (2 hours without activity)'},
      sessionDaysOption: {
        fr: ({days}: {days: number}) => `${days} jours`,
        en: ({days}: {days: number}) => `${days} days`,
      },
    },
  },
});

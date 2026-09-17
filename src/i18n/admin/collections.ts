import {texts} from './languages';

/** Admin texts of the collections (Categories, Media, Pages, Posts, Sections, Users). */
export const collectionsText = texts({
  groups: {
    blog: {fr: 'Blog', en: 'Blog'},
    site: {fr: 'Site', en: 'Site'},
  },
  categories: {
    singular: {fr: 'Catégorie', en: 'Category'},
    plural: {fr: 'Catégories', en: 'Categories'},
    fields: {
      title: {fr: 'Nom', en: 'Name'},
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

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
  posts: {
    singular: {fr: 'Article', en: 'Post'},
    plural: {fr: 'Articles', en: 'Posts'},
    tabs: {
      post: {fr: 'Article', en: 'Post'},
    },
    fields: {
      title: {fr: 'Titre', en: 'Title'},
      cover: {fr: 'Image de couverture', en: 'Cover image'},
      excerpt: {fr: 'Extrait', en: 'Excerpt'},
      content: {fr: 'Contenu', en: 'Content'},
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

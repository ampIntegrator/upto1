import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {shareSections} from '@/fields/sections/shareSections';
import {sectionsField} from '@/fields/sections/sectionFields';
import {siloField} from '@/fields/siloField';
import {slugField} from '@/fields/shared';

/** Pages du site : titre, slug, silo (barre latérale), haut de page, puis les sections de contenu empilées. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: 'Page', plural: 'Pages'},
  admin: {
    useAsTitle: 'title',
    group: 'Site',
    defaultColumns: ['title', 'slug', 'silo', 'updatedAt'],
    // bouton « Aperçu » : ouvre la page du site dans un nouvel onglet
    preview: (doc, {req}) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : '';
      const path = slug === 'accueil' || !slug ? '/' : `/${slug}`;
      return `${req.protocol}//${req.host}${path}`;
    },
  },
  access: {read: () => true},
  hooks: {beforeChange: [shareSections]},
  // les onglets en premier : le plugin SEO ajoute son onglet à la suite (sinon il englobe tout
  // dans un onglet « Page » et la barre latérale disparaît) ; slug et silo restent en barre latérale
  fields: [
    {
      type: 'tabs',
      tabs: [
        {label: 'Haut de page', fields: [{name: 'title', type: 'text', label: 'Titre de la page', required: true, localized: true}, heroField]},
        {
          label: 'Contenu',
          description: 'Une page est une pile de sections ; chaque section, des rangées de colonnes remplies de contenus (Fondations « Grille & emprises » du catalogue).',
          fields: [sectionsField],
        },
      ],
    },
    slugField,
    siloField({name: 'silo', fromSettings: true, admin: {position: 'sidebar', description: 'Présélectionné sur le silo du site ; changez-le pour cette page seulement.'}}),
  ],
};

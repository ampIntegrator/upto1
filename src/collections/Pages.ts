import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {siloField} from '@/fields/siloField';
import {slugField} from '@/fields/shared';

/** Pages du site : titre, slug, silo (barre latérale), haut de page. Les sections de contenu viendront ensuite. */
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
  fields: [
    {name: 'title', type: 'text', label: 'Titre', required: true, localized: true},
    slugField,
    siloField({name: 'silo', allowInherit: true, admin: {position: 'sidebar'}}),
    {
      type: 'tabs',
      tabs: [
        {label: 'Haut de page', fields: [heroField]},
        {
          label: 'Contenu',
          description: 'Les sections de contenu (rangées, colonnes, contenus) arrivent ensuite : voir la page Fondations « Grille & emprises » du catalogue.',
          fields: [{name: 'contentPlaceholder', type: 'ui', admin: {components: {Field: '@/fields/ContentPlaceholder#ContentPlaceholder'}}}],
        },
      ],
    },
  ],
};

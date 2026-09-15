import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {shareSections} from '@/fields/sections/shareSections';
import {sectionsField} from '@/fields/sections/sectionFields';
import {siloField} from '@/fields/siloField';
import {slugField} from '@/fields/shared';

/** Site pages: title, slug, silo (sidebar), page top, then the stacked content sections. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: 'Page', plural: 'Pages'},
  admin: {
    useAsTitle: 'title',
    group: 'Site',
    defaultColumns: ['title', 'slug', 'silo', 'updatedAt'],
    // « Aperçu » button: opens the site page in a new tab
    preview: (doc, {req}) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : '';
      const path = slug === 'accueil' || !slug ? '/' : `/${slug}`;
      return `${req.protocol}//${req.host}${path}`;
    },
  },
  access: {read: () => true},
  hooks: {beforeChange: [shareSections]},
  // tabs first: the SEO plugin appends its tab after them (otherwise it wraps everything
  // in a « Page » tab and the sidebar disappears); slug and silo stay in the sidebar
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

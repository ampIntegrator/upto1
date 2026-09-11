import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {siloField} from '@/fields/siloField';
import {slugField} from '@/fields/shared';

/** Pages du site : titre, slug, silo (barre latérale), haut de page. Les sections de contenu viendront ensuite. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: 'Page', plural: 'Pages'},
  admin: {useAsTitle: 'title', group: 'Site', defaultColumns: ['title', 'slug', 'silo', 'updatedAt']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: 'Titre', required: true, localized: true},
    slugField,
    siloField({name: 'silo', allowInherit: true, admin: {position: 'sidebar'}}),
    heroField,
  ],
};

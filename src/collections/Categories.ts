import type {CollectionConfig} from 'payload';

import {slugField} from '@/fields/shared';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {singular: 'Catégorie', plural: 'Catégories'},
  admin: {useAsTitle: 'title', group: 'Blog', defaultColumns: ['title', 'slug']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: 'Nom', required: true, localized: true},
    slugField,
  ],
};

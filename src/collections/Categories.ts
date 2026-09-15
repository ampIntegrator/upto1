import type {CollectionConfig} from 'payload';

import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {singular: ct.categories.singular, plural: ct.categories.plural},
  admin: {useAsTitle: 'title', group: ct.groups.blog, defaultColumns: ['title', 'slug']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: ct.categories.fields.title, required: true, localized: true},
    slugField,
  ],
};

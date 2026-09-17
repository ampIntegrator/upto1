import type {CollectionConfig} from 'payload';

import {collectionsText as ct} from '@/i18n/admin/collections';

/** Post authors (mockup 18): name, role and a square photo, shown in the post header. */
export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {singular: ct.authors.singular, plural: ct.authors.plural},
  admin: {useAsTitle: 'name', group: ct.groups.blog, defaultColumns: ['name', 'role']},
  access: {read: () => true},
  fields: [
    {name: 'name', type: 'text', label: ct.authors.fields.name, required: true},
    {name: 'role', type: 'text', label: ct.authors.fields.role, localized: true},
    {name: 'photo', type: 'upload', relationTo: 'media', label: ct.authors.fields.photo},
  ],
};

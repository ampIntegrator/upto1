import type {CollectionConfig} from 'payload';

import {slugField} from '@/fields/shared';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {singular: 'Article', plural: 'Articles'},
  admin: {useAsTitle: 'title', group: 'Blog', defaultColumns: ['title', 'category', 'publishedAt']},
  access: {read: () => true},
  defaultSort: '-publishedAt',
  fields: [
    {name: 'title', type: 'text', label: 'Titre', required: true, localized: true},
    slugField,
    {name: 'category', type: 'relationship', relationTo: 'categories', label: 'Catégorie', required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: 'Date de publication', required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
    {name: 'cover', type: 'upload', relationTo: 'media', label: 'Image de couverture'},
    {name: 'excerpt', type: 'textarea', label: 'Extrait', localized: true, admin: {rows: 3}},
    {name: 'content', type: 'richText', label: 'Contenu', localized: true},
  ],
};

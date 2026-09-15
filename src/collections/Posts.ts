import type {CollectionConfig} from 'payload';

import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {singular: ct.posts.singular, plural: ct.posts.plural},
  admin: {useAsTitle: 'title', group: ct.groups.blog, defaultColumns: ['title', 'category', 'publishedAt']},
  access: {read: () => true},
  defaultSort: '-publishedAt',
  // tabs first: the SEO plugin appends its tab after them; slug, category and date in the sidebar
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: ct.posts.tabs.post,
          fields: [
            {name: 'title', type: 'text', label: ct.posts.fields.title, required: true, localized: true},
            {name: 'cover', type: 'upload', relationTo: 'media', label: ct.posts.fields.cover},
            {name: 'excerpt', type: 'textarea', label: ct.posts.fields.excerpt, localized: true, admin: {rows: 3}},
            {name: 'content', type: 'richText', label: ct.posts.fields.content, localized: true},
          ],
        },
      ],
    },
    slugField,
    {name: 'category', type: 'relationship', relationTo: 'categories', label: ct.posts.fields.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: ct.posts.fields.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

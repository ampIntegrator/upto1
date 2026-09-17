import type {CollectionConfig} from 'payload';

import {postEditor} from '@/fields/blocks/prose';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {sections} from '@/sections.config';

/**
 * Blog posts (mockup 18): title, cover and its caption, lead, prose (post editor with inserted
 * figures), author, category, date; optional builder sections shown under the post. Rendered at
 * /<blog page>/<slug> (Blog settings).
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {singular: ct.posts.singular, plural: ct.posts.plural},
  admin: {
    // « Vue » menu next to the Live Preview eye (side by side, top / bottom, dialog)
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu']}},
    useAsTitle: 'title', group: ct.groups.blog, defaultColumns: ['title', 'category', 'author', 'publishedAt']},
  access: {read: () => true},
  defaultSort: '-publishedAt',
  hooks: {beforeChange: sections.beforeChange},
  // tabs first: the SEO plugin appends its tab after them; slug, author, category and date in the sidebar
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: ct.posts.tabs.post,
          fields: [
            {name: 'title', type: 'text', label: ct.posts.fields.title, required: true, localized: true},
            {name: 'cover', type: 'upload', relationTo: 'media', label: ct.posts.fields.cover},
            {name: 'coverCaption', type: 'text', label: ct.posts.fields.coverCaption, localized: true},
            {name: 'excerpt', type: 'textarea', label: ct.posts.fields.excerpt, localized: true, admin: {rows: 3}},
            {name: 'content', type: 'richText', label: ct.posts.fields.content, localized: true, editor: postEditor, admin: {description: ct.posts.fields.contentDescription}},
          ],
        },
        {
          label: ct.posts.tabs.sections,
          description: ct.posts.tabs.sectionsDescription,
          fields: [sections.field],
        },
      ],
    },
    slugField,
    {name: 'author', type: 'relationship', relationTo: 'authors', label: ct.posts.fields.author, admin: {position: 'sidebar'}},
    {name: 'category', type: 'relationship', relationTo: 'categories', label: ct.posts.fields.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: ct.posts.fields.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

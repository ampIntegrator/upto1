import type {CollectionConfig, Field} from 'payload';

import {postEditor} from '@/fields/blocks/prose';
import {entryBelowTab} from '@/fields/entryBelow';
import {entryUrl} from '@/fields/entryUrl';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

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
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu'], PreviewButton: '@/fields/ViewOnSiteButton#ViewOnSiteButton'}},
    useAsTitle: 'title', group: ct.groups.blog, defaultColumns: ['title', 'slug', 'category', 'author', 'publishedAt'],
    // button that opens the post on the site in a new tab, under the blog's address
    preview: (doc, {req}) => entryUrl(req, 'blog', doc.slug),
  },
  access: {read: () => true},
  defaultSort: '-publishedAt',
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
            {
              type: 'row',
              fields: [
                {name: 'coverCaption', type: 'text', label: ct.posts.fields.coverCaption, localized: true, admin: {width: '70%'}},
                // colour of the caption laid over the image (CoverCaption): white on a dark photo, black on a light one
                {name: 'coverCaptionTone', type: 'radio', label: ct.posts.fields.coverCaptionTone, defaultValue: 'light', options: [{label: ct.posts.fields.captionLight, value: 'light'}, {label: ct.posts.fields.captionDark, value: 'dark'}], admin: {width: '30%', layout: 'horizontal'}},
              ],
            },
            {name: 'excerpt', type: 'textarea', label: ct.posts.fields.excerpt, localized: true, admin: {rows: 3}},
            {name: 'content', type: 'richText', label: ct.posts.fields.content, localized: true, editor: postEditor, admin: {description: ct.posts.fields.contentDescription}},
          ],
        },
        entryBelowTab({collection: 'posts', label: ct.posts.tabs.below, description: ct.posts.tabs.belowDescription}),
      ],
    },
    // the « Slug » column of the list shows the post's address with a « Voir la page » button (new tab)
    {...slugField, admin: {...slugField.admin, components: {...slugField.admin?.components, Cell: {path: '@/fields/ViewEntryCell#ViewEntryCell', serverProps: {listing: 'blog'}}}}} as Field,
    {name: 'author', type: 'relationship', relationTo: 'authors', label: ct.posts.fields.author, admin: {position: 'sidebar'}},
    {name: 'category', type: 'relationship', relationTo: 'categories', label: ct.posts.fields.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: ct.posts.fields.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {siloField} from '@/fields/siloField';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {sections} from '@/sections.config';

/** Site pages: title, slug, silo (sidebar), page top, then the stacked content sections. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: ct.pages.singular, plural: ct.pages.plural},
  admin: {
    useAsTitle: 'title',
    group: ct.groups.site,
    defaultColumns: ['title', 'slug', 'silo', 'updatedAt'],
    // « Aperçu » button: opens the site page in a new tab
    preview: (doc, {req}) => {
      const slug = typeof doc.slug === 'string' ? doc.slug : '';
      const path = slug === 'accueil' || !slug ? '/' : `/${slug}`;
      return `${req.protocol}//${req.host}${path}`;
    },
  },
  access: {read: () => true},
  hooks: {beforeChange: sections.beforeChange},
  // tabs first: the SEO plugin appends its tab after them (otherwise it wraps everything
  // in a « Page » tab and the sidebar disappears); slug and silo stay in the sidebar
  fields: [
    {
      type: 'tabs',
      tabs: [
        {label: ct.pages.tabs.pageTop, fields: [{name: 'blogNoticeTop', type: 'ui', admin: {components: {Field: '@/fields/BlogPageNotice#BlogPageNotice'}}}, {name: 'title', type: 'text', label: ct.pages.fields.title, required: true, localized: true}, heroField]},
        {
          label: ct.pages.tabs.content,
          description: ct.pages.tabs.contentDescription,
          fields: [{name: 'blogNoticeContent', type: 'ui', admin: {components: {Field: '@/fields/BlogPageNotice#BlogPageNotice'}}}, sections.field],
        },
      ],
    },
    slugField,
    siloField({name: 'silo', fromSettings: true, admin: {position: 'sidebar', description: ct.pages.fields.siloDescription}}),
  ],
};

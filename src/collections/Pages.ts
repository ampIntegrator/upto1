import type {CollectionConfig} from 'payload';

import {heroField} from '@/fields/hero';
import {computePagePath, pageTreeFields, redirectOldPath} from '@/fields/pageTree';
import {siloField} from '@/fields/siloField';
import {pageSlugValidate} from '@/fields/listingSlug';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {pagePath} from '@/lib/page-paths';
import {sections} from '@/sections.config';

/**
 * Site pages: title, slug, silo, parent page and full address (sidebar), page top, then the stacked
 * content sections. Nested: a page lives at its ancestors' path (src/fields/pageTree.ts).
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {singular: ct.pages.singular, plural: ct.pages.plural},
  admin: {
    // « Vue » menu next to the Live Preview eye (side by side, top / bottom, dialog)
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu'], PreviewButton: '@/fields/ViewOnSiteButton#ViewOnSiteButton'}},
    useAsTitle: 'title',
    group: ct.groups.site,
    defaultColumns: ['title', 'path', 'parent', 'updatedAt'],
    // « Voir la page » button (ViewOnSiteButton): opens the site page in a new tab
    preview: (doc, {req}) => `${req.protocol}//${req.host}${pagePath(doc as {slug?: string; path?: string})}`,
  },
  access: {read: () => true},
  hooks: {beforeChange: [...sections.beforeChange, computePagePath], afterChange: [redirectOldPath]},
  // tabs first: the SEO plugin appends its tab after them (otherwise it wraps everything
  // in a « Page » tab and the sidebar disappears); slug and silo stay in the sidebar
  fields: [
    {
      type: 'tabs',
      tabs: [
        {label: ct.pages.tabs.pageTop, fields: [{name: 'title', type: 'text', label: ct.pages.fields.title, required: true, localized: true}, heroField]},
        {
          label: ct.pages.tabs.content,
          description: ct.pages.tabs.contentDescription,
          fields: [sections.field],
        },
      ],
    },
    // a page cannot take the address of a listing (blog, case studies)
    {...slugField, validate: pageSlugValidate as never},
    siloField({name: 'silo', fromSettings: true, admin: {position: 'sidebar', description: ct.pages.fields.siloDescription}}),
    ...pageTreeFields(),
  ],
};

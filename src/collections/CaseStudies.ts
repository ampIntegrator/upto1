import type {CollectionConfig, Field} from 'payload';

import {postEditor} from '@/fields/blocks/prose';
import {entryBelowTab} from '@/fields/entryBelow';
import {entryUrl} from '@/fields/entryUrl';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

const f = ct.caseStudies.fields;

/**
 * Case studies (« réalisations », mockups 23 and 24): title, lead, full-width cover, story (the
 * post editor with its figures), fact sheet (text rows and two figures; the row labels and the
 * button come from the case studies settings), category and date; optional builder sections under the story. Rendered at
 * /<case studies page>/<slug> (Case studies settings), as realisation cards elsewhere.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {singular: ct.caseStudies.singular, plural: ct.caseStudies.plural},
  admin: {
    // « Vue » menu next to the Live Preview eye (side by side, top / bottom, dialog)
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu'], PreviewButton: '@/fields/ViewOnSiteButton#ViewOnSiteButton'}},
    useAsTitle: 'title', group: ct.groups.cases, defaultColumns: ['title', 'slug', 'category', 'publishedAt'],
    // button that opens the case study on the site in a new tab, under the case studies' address
    preview: (doc, {req}) => entryUrl(req, 'portfolio', doc.slug),
  },
  access: {read: () => true},
  defaultSort: '-publishedAt',
  // tabs first: the SEO plugin appends its tab after them; slug, category and date in the sidebar
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: ct.caseStudies.tabs.caseStudy,
          fields: [
            {name: 'title', type: 'text', label: f.title, required: true, localized: true, admin: {description: f.titleDescription}},
            {name: 'excerpt', type: 'textarea', label: f.excerpt, localized: true, admin: {rows: 3}},
            {name: 'cover', type: 'upload', relationTo: 'media', label: f.cover},
            {
              type: 'row',
              fields: [
                {name: 'coverCaption', type: 'text', label: f.coverCaption, localized: true, admin: {width: '70%'}},
                // colour of the caption laid over the image (CoverCaption): white on a dark photo, black on a light one
                {name: 'coverCaptionTone', type: 'radio', label: f.coverCaptionTone, defaultValue: 'light', options: [{label: f.captionLight, value: 'light'}, {label: f.captionDark, value: 'dark'}], admin: {width: '30%', layout: 'horizontal'}},
              ],
            },
            // flat layer between the cover and the title (CaseHero `overlay`, `overlayColor`): tones down a light
            // or white cover, in black or in the silo colour (the site settings one for a case study)
            {
              type: 'row',
              fields: [
                {name: 'coverOverlay', type: 'number', label: f.coverOverlay, min: 0, max: 1, defaultValue: 0, admin: {width: '50%', step: 0.05, description: f.coverOverlayDescription}},
                {name: 'coverOverlayColor', type: 'radio', label: f.coverOverlayColor, defaultValue: 'black', options: [{label: f.overlayBlack, value: 'black'}, {label: f.overlaySilo, value: 'silo'}], admin: {width: '50%', layout: 'horizontal'}},
              ],
            },
            {name: 'content', type: 'richText', label: f.content, localized: true, editor: postEditor, admin: {description: f.contentDescription}},
          ],
        },
        {
          label: ct.caseStudies.tabs.sheet,
          description: ct.caseStudies.tabs.sheetDescription,
          fields: [
            {
              name: 'sheet', type: 'group', label: false,
              fields: [
                {type: 'row', fields: [
                  {name: 'client', type: 'text', label: f.client, required: true, admin: {width: '50%'}},
                  {name: 'clientUrl', type: 'text', label: f.clientUrl, admin: {width: '50%', placeholder: 'https://'}},
                ]},
                {type: 'row', fields: [
                  {name: 'location', type: 'text', label: f.location, localized: true, admin: {width: '50%'}},
                  {name: 'deployment', type: 'text', label: f.deployment, localized: true, admin: {width: '50%', placeholder: f.deploymentPlaceholder}},
                ]},
                {name: 'modules', type: 'text', label: f.modules, localized: true},
                {
                  name: 'results', type: 'array', label: f.results, maxRows: 2,
                  labels: {singular: f.resultSingular, plural: f.resultPlural},
                  admin: {description: f.resultsDescription, initCollapsed: false},
                  fields: [
                    {type: 'row', fields: [
                      {name: 'value', type: 'text', label: f.resultValue, required: true, localized: true, admin: {width: '34%'}},
                      {name: 'label', type: 'text', label: f.resultLabel, required: true, localized: true, admin: {width: '66%'}},
                    ]},
                  ],
                },
              ],
            },
          ],
        },
        entryBelowTab({collection: 'case-studies', label: ct.caseStudies.tabs.below, description: ct.caseStudies.tabs.belowDescription}),
      ],
    },
    // the « Slug » column of the list shows the case study's address with a « Voir la page » button (new tab)
    {...slugField, admin: {...slugField.admin, components: {...slugField.admin?.components, Cell: {path: '@/fields/ViewEntryCell#ViewEntryCell', serverProps: {listing: 'portfolio'}}}}} as Field,
    {name: 'category', type: 'relationship', relationTo: 'case-categories', label: f.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: f.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

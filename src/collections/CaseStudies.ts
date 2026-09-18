import type {CollectionConfig} from 'payload';

import {postEditor} from '@/fields/blocks/prose';
import {entryBelowTab} from '@/fields/entryBelow';
import {entryUrl} from '@/fields/entryUrl';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

const f = ct.caseStudies.fields;

const whenCustom = (_d: unknown, s: Record<string, unknown>) => Boolean(s?.customDefaults);

/**
 * Case studies (« réalisations », mockups 23 and 24): title, lead, full-width cover, story (the
 * post editor with its figures), fact sheet (text rows with overridable labels, two figures, a
 * button), category and date; optional builder sections under the story. Rendered at
 * /<case studies page>/<slug> (Case studies settings), as realisation cards elsewhere.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {singular: ct.caseStudies.singular, plural: ct.caseStudies.plural},
  admin: {
    // « Vue » menu next to the Live Preview eye (side by side, top / bottom, dialog)
    components: {edit: {beforeDocumentControls: ['@/fields/PreviewLayoutMenu#PreviewLayoutMenu'], PreviewButton: '@/fields/ViewOnSiteButton#ViewOnSiteButton'}},
    useAsTitle: 'title', group: ct.groups.cases, defaultColumns: ['title', 'category', 'publishedAt'],
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
                {name: 'cardResult', type: 'text', label: f.cardResult, localized: true, admin: {description: f.cardResultDescription}},
                // row labels and button come from the case studies settings; replaced here only when ticked
                {name: 'customDefaults', type: 'checkbox', label: f.customDefaults, defaultValue: false, admin: {description: f.customDefaultsDescription}},
                {type: 'row', admin: {condition: whenCustom}, fields: [
                  {name: 'locationLabel', type: 'text', label: f.locationLabel, localized: true, admin: {width: '33%', description: f.labelEmpty}},
                  {name: 'deploymentLabel', type: 'text', label: f.deploymentLabel, localized: true, admin: {width: '33%', description: f.labelEmpty}},
                  {name: 'modulesLabel', type: 'text', label: f.modulesLabel, localized: true, admin: {width: '34%', description: f.labelEmpty}},
                ]},
                {
                  name: 'cta', type: 'group', label: f.cta,
                  admin: {description: f.ctaDescription, condition: whenCustom},
                  fields: [
                    {type: 'row', fields: [
                      {name: 'label', type: 'text', label: f.ctaLabel, localized: true, admin: {width: '50%'}},
                      {name: 'href', type: 'text', label: f.ctaHref, admin: {width: '50%'}},
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
    slugField,
    {name: 'category', type: 'relationship', relationTo: 'case-categories', label: f.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: f.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

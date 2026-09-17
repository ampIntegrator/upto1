import type {CollectionConfig, Field} from 'payload';

import {postEditor} from '@/fields/blocks/prose';
import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {sections} from '@/sections.config';

const f = ct.caseStudies.fields;

/** a text row of the fact sheet and, next to it, its optional label replacing the global one */
const sheetRow = (name: string, label: typeof f.location, placeholder?: typeof f.deploymentPlaceholder): Field => ({
  type: 'row',
  fields: [
    {name, type: 'text', label, localized: true, admin: {width: '66%', ...(placeholder ? {placeholder} : null)}},
    {name: `${name}Label`, type: 'text', label: f.labelOverride, localized: true, admin: {width: '34%'}},
  ],
});

/**
 * Case studies (« réalisations », mockups 23 and 24): title, lead, full-width cover, story (the
 * post editor with its figures), fact sheet (text rows with overridable labels, two figures, a
 * button), category and date; optional builder sections under the story. Rendered at
 * /<case studies page>/<slug> (Case studies settings), as realisation cards elsewhere.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {singular: ct.caseStudies.singular, plural: ct.caseStudies.plural},
  admin: {useAsTitle: 'title', group: ct.groups.cases, defaultColumns: ['title', 'category', 'publishedAt']},
  access: {read: () => true},
  defaultSort: '-publishedAt',
  hooks: {beforeChange: sections.beforeChange},
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
                sheetRow('location', f.location),
                sheetRow('deployment', f.deployment, f.deploymentPlaceholder),
                sheetRow('modules', f.modules),
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
                {
                  name: 'cta', type: 'group', label: f.cta,
                  admin: {description: f.ctaDescription},
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
        {
          label: ct.caseStudies.tabs.sections,
          description: ct.caseStudies.tabs.sectionsDescription,
          fields: [sections.field],
        },
      ],
    },
    slugField,
    {name: 'category', type: 'relationship', relationTo: 'case-categories', label: f.category, required: true, admin: {position: 'sidebar'}},
    {name: 'publishedAt', type: 'date', label: f.publishedAt, required: true, defaultValue: () => new Date().toISOString(), admin: {position: 'sidebar', date: {pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy'}}},
  ],
};

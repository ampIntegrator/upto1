import type {CollectionConfig} from 'payload';

import {slugField} from '@/fields/shared';
import {collectionsText as ct} from '@/i18n/admin/collections';

/** Categories of the case studies (Rénovation, Gros œuvre…), distinct from the blog's: filter chips and archives of the case studies page. */
export const CaseCategories: CollectionConfig = {
  slug: 'case-categories',
  labels: {singular: ct.caseCategories.singular, plural: ct.caseCategories.plural},
  admin: {useAsTitle: 'title', group: ct.groups.cases, defaultColumns: ['title', 'slug']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: ct.categories.fields.title, required: true, localized: true},
    slugField,
  ],
};

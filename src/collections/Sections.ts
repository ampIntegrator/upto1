import type {CollectionConfig} from 'payload';

import {sectionFields} from '@/fields/sections/sectionFields';
import {collectionsText as ct} from '@/i18n/admin/collections';

/**
 * Shared sections: a section edited in one place for every page that
 * inserts it (« Section partagée » block). Created here, or from a page via the
 * « Enregistrer dans les sections partagées » checkbox.
 */
export const Sections: CollectionConfig = {
  slug: 'sections',
  labels: {singular: ct.sections.singular, plural: ct.sections.plural},
  admin: {useAsTitle: 'title', group: ct.groups.site, defaultColumns: ['title', 'updatedAt']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: ct.sections.fields.title, required: true},
    ...sectionFields({shareable: false}),
  ],
};

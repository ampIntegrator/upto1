import type {CollectionConfig} from 'payload';

import {sectionFields} from '@/fields/sections/sectionFields';

/**
 * Shared sections: a section edited in one place for every page that
 * inserts it (« Section partagée » block). Created here, or from a page via the
 * « Enregistrer dans les sections partagées » checkbox.
 */
export const Sections: CollectionConfig = {
  slug: 'sections',
  labels: {singular: 'Section partagée', plural: 'Sections partagées'},
  admin: {useAsTitle: 'title', group: 'Site', defaultColumns: ['title', 'updatedAt']},
  access: {read: () => true},
  fields: [
    {name: 'title', type: 'text', label: 'Nom (admin seulement)', required: true},
    ...sectionFields({shareable: false}),
  ],
};

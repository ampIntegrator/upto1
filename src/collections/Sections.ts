import type {CollectionConfig} from 'payload';

import {sectionFields} from '@/fields/sections/sectionFields';

/**
 * Sections partagées : une section modifiée à un seul endroit pour toutes les pages qui
 * l'insèrent (bloc « Section partagée »). Créées ici, ou depuis une page par la case
 * « Enregistrer dans les sections partagées ».
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

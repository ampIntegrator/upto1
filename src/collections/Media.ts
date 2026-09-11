import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {singular: 'Média', plural: 'Médias'},
  admin: {group: 'Site'},
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
      localized: true,
    },
  ],
  upload: {mimeTypes: ['image/*', 'video/mp4', 'video/webm']},
}

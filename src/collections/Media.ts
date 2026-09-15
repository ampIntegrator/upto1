import type { CollectionConfig } from 'payload'

import {collectionsText as ct} from '@/i18n/admin/collections';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {singular: ct.media.singular, plural: ct.media.plural},
  admin: {group: ct.groups.site},
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: ct.media.fields.alt,
      required: true,
      localized: true,
    },
  ],
  upload: {mimeTypes: ['image/*', 'video/mp4', 'video/webm']},
}

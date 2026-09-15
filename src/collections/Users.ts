import type { CollectionConfig } from 'payload'

import {collectionsText as ct} from '@/i18n/admin/collections';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {singular: ct.users.singular, plural: ct.users.plural},
  admin: {
    useAsTitle: 'name',
    group: ct.groups.site,
  },
  auth: true,
  fields: [
    // email is added by default
    {name: 'name', type: 'text', label: ct.users.fields.name, required: true},
  ],
}

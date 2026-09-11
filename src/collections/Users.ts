import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {singular: 'Utilisateur', plural: 'Utilisateurs'},
  admin: {
    useAsTitle: 'name',
    group: 'Site',
  },
  auth: true,
  fields: [
    // l'e-mail est ajouté par défaut
    {name: 'name', type: 'text', label: 'Nom', required: true},
  ],
}

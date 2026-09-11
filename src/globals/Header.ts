import type {Block, GlobalConfig} from 'payload';

import {iconField} from '@/fields/iconField';
import {linkGroup} from '@/fields/shared';

/** Entrée de menu (menu déroulant et méga-menu) : titre, description, icône, adresse. */
const leafFields = [
  {type: 'row' as const, fields: [
    {name: 'title', type: 'text' as const, label: 'Titre', required: true, localized: true, admin: {width: '50%'}},
    {name: 'href', type: 'text' as const, label: 'Adresse', required: true, admin: {width: '50%'}},
  ]},
  {name: 'description', type: 'text' as const, label: 'Description (une ligne)', localized: true},
  iconField({name: 'iconKey', label: 'Icône'}),
];

const LinkBlock: Block = {
  slug: 'link', labels: {singular: 'Lien simple', plural: 'Liens simples'},
  fields: [{type: 'row', fields: [
    {name: 'label', type: 'text', label: 'Libellé', required: true, localized: true, admin: {width: '50%'}},
    {name: 'href', type: 'text', label: 'Adresse', required: true, admin: {width: '50%'}},
  ]}],
};

const MenuBlock: Block = {
  slug: 'menu', labels: {singular: 'Menu déroulant', plural: 'Menus déroulants'},
  fields: [
    {name: 'label', type: 'text', label: 'Libellé', required: true, localized: true},
    {name: 'items', type: 'array', label: 'Entrées (4 au plus)', maxRows: 4, minRows: 1, required: true, labels: {singular: 'Entrée', plural: 'Entrées'}, fields: leafFields},
  ],
};

const MegaBlock: Block = {
  slug: 'mega', labels: {singular: 'Méga-menu', plural: 'Méga-menus'},
  fields: [
    {name: 'label', type: 'text', label: 'Libellé', required: true, localized: true},
    {
      name: 'groups', type: 'array', label: 'Piles de liens (2 au plus)', maxRows: 2, minRows: 1, required: true, labels: {singular: 'Pile', plural: 'Piles'},
      fields: [
        {name: 'title', type: 'text', label: 'Titre de la pile', required: true, localized: true},
        {name: 'items', type: 'array', label: 'Liens (4 au plus)', maxRows: 4, minRows: 1, required: true, labels: {singular: 'Lien', plural: 'Liens'}, fields: leafFields},
      ],
    },
    {
      name: 'featured', type: 'relationship', relationTo: 'posts', label: 'Article mis en avant (zone de droite)',
      admin: {description: 'Image, titre, extrait et lien viennent de l\'article.'},
    },
    {name: 'featuredLinkLabel', type: 'text', label: 'Libellé du lien de l\'article', localized: true, defaultValue: "Lire l'article"},
  ],
};

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'En-tête',
  admin: {group: 'Site', description: 'Coordonnées et réseaux du bandeau viennent des Réglages du site.'},
  access: {read: () => true},
  fields: [
    {name: 'nav', type: 'blocks', label: 'Navigation principale', blocks: [LinkBlock, MenuBlock, MegaBlock], maxRows: 6},
    {type: 'row', fields: [
      linkGroup('login', 'Bouton « Connexion »'),
      linkGroup('cta', 'Bouton principal'),
    ]},
  ],
};

import type {Block, GlobalConfig} from 'payload';

import {iconField} from '@/fields/iconField';
import {linkGroup} from '@/fields/shared';
import {headerText, settingsText} from '@/i18n/admin/globals';

/** Menu entry (dropdown and mega menu): title, description, icon, address. */
const leafFields = [
  {type: 'row' as const, fields: [
    {name: 'title', type: 'text' as const, label: headerText.fields.title, required: true, localized: true, admin: {width: '50%'}},
    {name: 'href', type: 'text' as const, label: headerText.fields.href, required: true, admin: {width: '50%'}},
  ]},
  {name: 'description', type: 'text' as const, label: headerText.fields.description, localized: true},
  iconField({name: 'iconKey', label: headerText.fields.icon}),
];

const LinkBlock: Block = {
  slug: 'link', labels: {singular: headerText.linkBlock.singular, plural: headerText.linkBlock.plural},
  fields: [{type: 'row', fields: [
    {name: 'label', type: 'text', label: headerText.fields.label, required: true, localized: true, admin: {width: '50%'}},
    {name: 'href', type: 'text', label: headerText.fields.href, required: true, admin: {width: '50%'}},
  ]}],
};

const MenuBlock: Block = {
  slug: 'menu', labels: {singular: headerText.menuBlock.singular, plural: headerText.menuBlock.plural},
  fields: [
    {name: 'label', type: 'text', label: headerText.fields.label, required: true, localized: true},
    {name: 'items', type: 'array', label: headerText.menuBlock.items, maxRows: 4, minRows: 1, required: true, labels: {singular: headerText.menuBlock.itemSingular, plural: headerText.menuBlock.itemPlural}, fields: leafFields},
  ],
};

const MegaBlock: Block = {
  slug: 'mega', labels: {singular: headerText.megaBlock.singular, plural: headerText.megaBlock.plural},
  fields: [
    {name: 'label', type: 'text', label: headerText.fields.label, required: true, localized: true},
    {
      name: 'groups', type: 'array', label: headerText.megaBlock.groups, maxRows: 2, minRows: 1, required: true, labels: {singular: headerText.megaBlock.groupSingular, plural: headerText.megaBlock.groupPlural},
      fields: [
        {name: 'title', type: 'text', label: headerText.megaBlock.groupTitle, required: true, localized: true},
        {name: 'items', type: 'array', label: headerText.megaBlock.items, maxRows: 4, minRows: 1, required: true, labels: {singular: headerText.megaBlock.itemSingular, plural: headerText.megaBlock.itemPlural}, fields: leafFields},
      ],
    },
    {
      name: 'featured', type: 'relationship', relationTo: 'posts', label: headerText.megaBlock.featured,
      admin: {description: headerText.megaBlock.featuredDescription},
    },
    {name: 'featuredLinkLabel', type: 'text', label: headerText.megaBlock.featuredLinkLabel, localized: true, defaultValue: "Lire l'article"},
  ],
};

export const Header: GlobalConfig = {
  slug: 'header',
  label: headerText.label,
  admin: {group: settingsText.group, description: headerText.description},
  access: {read: () => true},
  fields: [
    {name: 'nav', type: 'blocks', label: headerText.nav, blocks: [LinkBlock, MenuBlock, MegaBlock], maxRows: 6},
    {type: 'row', fields: [
      linkGroup('login', headerText.login),
      linkGroup('cta', headerText.cta),
    ]},
  ],
};

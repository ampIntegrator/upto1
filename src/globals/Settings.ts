import type {GlobalConfig} from 'payload';

import {iconField} from '@/fields/iconField';
import {DEFAULT_GAPS, GAP_OPTIONS} from '@/fields/sections/gaps';
import {siloField} from '@/fields/siloField';
import {settingsText} from '@/i18n/admin/globals';

/** Site settings: default silo, brand and logo, contact details, networks, layout, languages. */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: settingsText.label,
  admin: {group: settingsText.group},
  access: {read: () => true},
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: settingsText.tabs.identity,
          fields: [
            siloField({name: 'silo', label: settingsText.identity.silo, admin: {description: settingsText.identity.siloDescription}}),
            {name: 'brandName', type: 'text', label: settingsText.identity.brandName, required: true, defaultValue: 'Vidomia'},
            {name: 'logo', type: 'upload', relationTo: 'media', label: settingsText.identity.logo},
            {name: 'baseline', type: 'text', label: settingsText.identity.baseline, localized: true},
          ],
        },
        {
          label: settingsText.tabs.contact,
          fields: [
            {type: 'row', fields: [
              {name: 'phone', type: 'text', label: settingsText.contact.phone, admin: {width: '50%'}},
              {name: 'phoneHref', type: 'text', label: settingsText.contact.phoneHref, admin: {width: '50%'}},
            ]},
            {name: 'email', type: 'email', label: settingsText.contact.email},
            {name: 'hours', type: 'text', label: settingsText.contact.hours, localized: true},
            {name: 'address', type: 'textarea', label: settingsText.contact.address, admin: {rows: 2}},
          ],
        },
        {
          label: settingsText.tabs.networks,
          fields: [
            {
              name: 'socials', type: 'array', label: settingsText.networks.socials, maxRows: 6, labels: {singular: settingsText.networks.socialSingular, plural: settingsText.networks.socialPlural},
              admin: {components: {RowLabel: '@/fields/RowLabels#SocialRowLabel'}},
              fields: [
                {type: 'row', fields: [
                  {name: 'label', type: 'text', label: settingsText.networks.name, required: true, admin: {width: '40%'}},
                  {name: 'href', type: 'text', label: settingsText.networks.href, required: true, admin: {width: '60%'}},
                ]},
                iconField({name: 'iconKey', label: settingsText.networks.icon, required: true}),
              ],
            },
          ],
        },
        {
          label: settingsText.tabs.navigation,
          fields: [
            {
              name: 'breadcrumb', type: 'group', label: settingsText.breadcrumb.label,
              fields: [
                {name: 'enabled', type: 'checkbox', label: settingsText.breadcrumb.enabled, defaultValue: true},
                {
                  name: 'homeStyle', type: 'radio', label: settingsText.breadcrumb.homeStyle, defaultValue: 'icon',
                  options: [{label: settingsText.breadcrumb.homeIcon, value: 'icon'}, {label: settingsText.breadcrumb.homeText, value: 'text'}],
                  admin: {layout: 'horizontal', condition: (_d, s) => s?.enabled !== false},
                },
                {name: 'homeLabel', type: 'text', label: settingsText.breadcrumb.homeLabel, localized: true, defaultValue: 'Accueil', admin: {condition: (_d, s) => s?.enabled !== false}},
              ],
            },
          ],
        },
        {
          label: settingsText.tabs.blog,
          fields: [
            {
              name: 'blog', type: 'group', label: settingsText.blog.label,
              admin: {description: settingsText.blog.description},
              fields: [
                {name: 'page', type: 'relationship', relationTo: 'pages', label: settingsText.blog.page},
                {type: 'row', fields: [
                  {name: 'eyebrow', type: 'text', label: settingsText.blog.eyebrow, localized: true, defaultValue: 'Le blog', admin: {width: '34%'}},
                  {name: 'title', type: 'text', label: settingsText.blog.title, localized: true, defaultValue: 'Actualités', admin: {width: '66%', description: settingsText.blog.titleDescription}},
                ]},
                {name: 'lead', type: 'textarea', label: settingsText.blog.lead, localized: true, admin: {rows: 2}},
                {type: 'row', fields: [
                  {
                    name: 'tone', type: 'radio', label: settingsText.blog.tone, defaultValue: 'light',
                    options: [{label: settingsText.blog.toneLight, value: 'light'}, {label: settingsText.blog.toneNight, value: 'night'}],
                    admin: {layout: 'horizontal', width: '50%'},
                  },
                  {name: 'perPage', type: 'number', label: settingsText.blog.perPage, defaultValue: 12, min: 4, max: 48, admin: {width: '50%'}},
                ]},
                {
                  name: 'labels', type: 'group', label: settingsText.blog.labels,
                  fields: [
                    {type: 'row', fields: [
                      {name: 'all', type: 'text', label: settingsText.blog.all, localized: true, defaultValue: 'Tous', admin: {width: '33%'}},
                      {name: 'readMore', type: 'text', label: settingsText.blog.readMore, localized: true, defaultValue: 'Lire l’article', admin: {width: '33%'}},
                      {name: 'dateLabel', type: 'text', label: settingsText.blog.dateLabel, localized: true, defaultValue: 'Publié le', admin: {width: '34%'}},
                    ]},
                    {type: 'row', fields: [
                      {name: 'toc', type: 'text', label: settingsText.blog.toc, localized: true, defaultValue: 'Sommaire', admin: {width: '33%'}},
                      {name: 'categoryPrefix', type: 'text', label: settingsText.blog.categoryPrefix, localized: true, defaultValue: 'Catégorie', admin: {width: '33%'}},
                      {name: 'more', type: 'text', label: settingsText.blog.more, localized: true, defaultValue: 'Voir le blog', admin: {width: '34%'}},
                    ]},
                    {type: 'row', fields: [
                      {name: 'relatedEyebrow', type: 'text', label: settingsText.blog.relatedEyebrow, localized: true, defaultValue: 'Le blog', admin: {width: '33%'}},
                      {name: 'relatedTitle', type: 'text', label: settingsText.blog.relatedTitle, localized: true, defaultValue: 'Pour continuer <span>sur le sujet.</span>', admin: {width: '67%'}},
                    ]},
                  ],
                },
              ],
            },
          ],
        },
        {
          label: settingsText.tabs.layout,
          fields: [
            {
              name: 'sectionGrid', type: 'group', label: settingsText.sectionGrid.label,
              admin: {description: settingsText.sectionGrid.description},
              fields: [
                {
                  type: 'row',
                  fields: [
                    {name: 'gapX', type: 'select', label: settingsText.sectionGrid.gapX, required: true, defaultValue: String(DEFAULT_GAPS.gapX), options: GAP_OPTIONS, admin: {width: '33%'}},
                    {name: 'gapY', type: 'select', label: settingsText.sectionGrid.gapY, required: true, defaultValue: String(DEFAULT_GAPS.gapY), options: GAP_OPTIONS, admin: {width: '33%'}},
                    {name: 'gapYMobile', type: 'select', label: settingsText.sectionGrid.gapYMobile, required: true, defaultValue: String(DEFAULT_GAPS.gapYMobile), options: GAP_OPTIONS, admin: {width: '33%', description: settingsText.sectionGrid.gapYMobileDescription}},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

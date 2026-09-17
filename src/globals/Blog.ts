import type {GlobalConfig} from 'payload';

import {collectionsText as ct} from '@/i18n/admin/collections';
import {blogText} from '@/i18n/admin/globals';

/**
 * Blog settings, in the Blog group next to posts, categories and authors (like WordPress's « posts
 * page »): the chosen page becomes the blog, posts live under its address, category archives
 * under /<blog>/categorie/<category>. Read through blogConfig (src/lib/blog.ts).
 */
export const Blog: GlobalConfig = {
  slug: 'blog',
  label: blogText.label,
  admin: {group: ct.groups.blog, description: blogText.description},
  access: {read: () => true},
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: blogText.tabs.page,
          fields: [
            {name: 'page', type: 'relationship', relationTo: 'pages', label: blogText.page},
            {type: 'row', fields: [
              {name: 'eyebrow', type: 'text', label: blogText.eyebrow, localized: true, defaultValue: 'Le blog', admin: {width: '34%'}},
              {name: 'title', type: 'text', label: blogText.title, localized: true, defaultValue: 'Actualités', admin: {width: '66%', description: blogText.titleDescription}},
            ]},
            {name: 'lead', type: 'textarea', label: blogText.lead, localized: true, admin: {rows: 2}},
            {type: 'row', fields: [
              {
                name: 'tone', type: 'radio', label: blogText.tone, defaultValue: 'light',
                options: [{label: blogText.toneLight, value: 'light'}, {label: blogText.toneNight, value: 'night'}],
                admin: {layout: 'horizontal', width: '50%'},
              },
              {name: 'perPage', type: 'number', label: blogText.perPage, defaultValue: 12, min: 4, max: 48, admin: {width: '50%'}},
            ]},
          ],
        },
        {
          label: blogText.tabs.labels,
          fields: [
            {
              name: 'labels', type: 'group', label: blogText.labelsGroup,
              admin: {hideGutter: true},
              fields: [
                {type: 'row', fields: [
                  {name: 'all', type: 'text', label: blogText.all, localized: true, defaultValue: 'Tous', admin: {width: '33%'}},
                  {name: 'readMore', type: 'text', label: blogText.readMore, localized: true, defaultValue: 'Lire l’article', admin: {width: '33%'}},
                  {name: 'dateLabel', type: 'text', label: blogText.dateLabel, localized: true, defaultValue: 'Publié le', admin: {width: '34%'}},
                ]},
                {type: 'row', fields: [
                  {name: 'toc', type: 'text', label: blogText.toc, localized: true, defaultValue: 'Sommaire', admin: {width: '33%'}},
                  {name: 'categoryPrefix', type: 'text', label: blogText.categoryPrefix, localized: true, defaultValue: 'Catégorie', admin: {width: '33%'}},
                  {name: 'more', type: 'text', label: blogText.more, localized: true, defaultValue: 'Voir le blog', admin: {width: '34%'}},
                ]},
                {type: 'row', fields: [
                  {name: 'relatedEyebrow', type: 'text', label: blogText.relatedEyebrow, localized: true, defaultValue: 'Le blog', admin: {width: '33%'}},
                  {name: 'relatedTitle', type: 'text', label: blogText.relatedTitle, localized: true, defaultValue: 'Pour continuer <span>sur le sujet.</span>', admin: {width: '67%'}},
                ]},
              ],
            },
          ],
        },
      ],
    },
  ],
};

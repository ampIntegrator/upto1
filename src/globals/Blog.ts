import type {GlobalConfig} from 'payload';

import {listingSettingsFields} from '@/fields/listingSettings';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {blogText as t} from '@/i18n/admin/globals';

/**
 * Blog settings, in the Blog group next to posts, categories and authors (like WordPress's « posts
 * page »): the chosen page becomes the blog, posts live under its address, category archives
 * under /<blog>/categorie/<category>. Read through blogConfig (src/lib/listings.ts).
 */
export const Blog: GlobalConfig = {
  slug: 'blog',
  label: t.label,
  admin: {group: ct.groups.blog, description: t.description},
  access: {read: () => true},
  fields: listingSettingsFields({
    self: 'blog',
    t,
    slug: 'blog',
    eyebrow: 'Le blog',
    title: 'Actualités',
    labelRows: [
      [{name: 'all', label: t.all, defaultValue: 'Tous', width: 33}, {name: 'readMore', label: t.readMore, defaultValue: 'Lire l’article', width: 33}, {name: 'dateLabel', label: t.dateLabel, defaultValue: 'Publié le', width: 34}],
      [{name: 'toc', label: t.toc, defaultValue: 'Sommaire', width: 33}, {name: 'categoryPrefix', label: t.categoryPrefix, defaultValue: 'Catégorie', width: 33}, {name: 'more', label: t.more, defaultValue: 'Voir le blog', width: 34}],
      [{name: 'relatedEyebrow', label: t.relatedEyebrow, defaultValue: 'Le blog', width: 33}, {name: 'relatedTitle', label: t.relatedTitle, defaultValue: 'Pour continuer <span>sur le sujet.</span>', width: 67}],
      [{name: 'empty', label: t.empty, defaultValue: 'Aucun article pour le moment.', width: 100}],
    ],
  }),
};

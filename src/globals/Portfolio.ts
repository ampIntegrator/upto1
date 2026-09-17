import type {GlobalConfig} from 'payload';

import {listingSettingsFields} from '@/fields/listingSettings';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {portfolioText as t} from '@/i18n/admin/globals';

/**
 * Case studies settings, in the Réalisations group next to the case studies and their
 * categories: the chosen page becomes the case studies page (same logic as the blog), plus the
 * labels of the fact sheet and its default button, both overridable on each case study.
 * Read through casesConfig (src/lib/listings.ts).
 */
export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  label: t.label,
  admin: {group: ct.groups.cases, description: t.description},
  access: {read: () => true},
  fields: listingSettingsFields({
    t,
    eyebrow: 'Nos réalisations',
    title: 'Des chantiers <span>chiffrés juste.</span>',
    labelRows: [
      [{name: 'all', label: t.all, defaultValue: 'Toutes', width: 33}, {name: 'readMore', label: t.readMore, defaultValue: 'Voir l’étude', width: 33}, {name: 'badge', label: t.badge, defaultValue: 'Étude de cas', width: 34}],
      [{name: 'categoryPrefix', label: t.categoryPrefix, defaultValue: 'Catégorie', width: 33}, {name: 'more', label: t.more, defaultValue: 'Voir toutes les réalisations', width: 67}],
      [{name: 'relatedEyebrow', label: t.relatedEyebrow, defaultValue: 'Nos réalisations', width: 33}, {name: 'relatedTitle', label: t.relatedTitle, defaultValue: 'D’autres chantiers <span>chiffrés juste.</span>', width: 67}],
      [{name: 'empty', label: t.empty, defaultValue: 'Aucune réalisation pour le moment.', width: 100}],
    ],
    extraLabelFields: () => [
      {
        name: 'sheet', type: 'group', label: t.sheet,
        admin: {description: t.sheetDescription},
        fields: [
          {type: 'row', fields: [
            {name: 'client', type: 'text', label: t.client, localized: true, defaultValue: 'Client', admin: {width: '33%'}},
            {name: 'category', type: 'text', label: t.category, localized: true, defaultValue: 'Catégorie', admin: {width: '33%'}},
            {name: 'location', type: 'text', label: t.location, localized: true, defaultValue: 'Localisation', admin: {width: '34%'}},
          ]},
          {type: 'row', fields: [
            {name: 'deployment', type: 'text', label: t.deployment, localized: true, defaultValue: 'Déploiement', admin: {width: '33%'}},
            {name: 'modules', type: 'text', label: t.modules, localized: true, defaultValue: 'Modules Orbita', admin: {width: '33%'}},
            {name: 'clientLink', type: 'text', label: t.clientLink, localized: true, defaultValue: 'Site du client', admin: {width: '34%'}},
          ]},
        ],
      },
      {
        name: 'cta', type: 'group', label: t.cta,
        admin: {description: t.ctaDescription},
        fields: [
          {type: 'row', fields: [
            {name: 'label', type: 'text', label: t.ctaLabel, localized: true, defaultValue: 'Réserver une démo', admin: {width: '50%'}},
            {name: 'href', type: 'text', label: t.ctaHref, admin: {width: '50%'}},
          ]},
        ],
      },
    ],
  }),
};

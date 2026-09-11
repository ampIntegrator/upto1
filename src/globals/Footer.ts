import type {GlobalConfig} from 'payload';

import {titleField} from '@/fields/shared';

const link = [
  {type: 'row' as const, fields: [
    {name: 'label', type: 'text' as const, label: 'Libellé', required: true, localized: true, admin: {width: '50%'}},
    {name: 'href', type: 'text' as const, label: 'Adresse', required: true, admin: {width: '50%'}},
  ]},
];

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Pied de page',
  admin: {group: 'Site', description: 'Marque, coordonnées et réseaux viennent des Réglages du site ; les articles en bref sont les trois derniers publiés.'},
  access: {read: () => true},
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Newsletter',
          fields: [
            {name: 'newsletterEnabled', type: 'checkbox', label: 'Afficher la newsletter', defaultValue: true},
            {name: 'newsletter', type: 'group', label: 'Newsletter', admin: {condition: (_d, s) => s?.newsletterEnabled !== false}, fields: [
              {name: 'eyebrow', type: 'text', label: 'Surtitre', localized: true},
              titleField({name: 'title'}),
              {name: 'text', type: 'textarea', label: 'Texte', localized: true, admin: {rows: 2}},
              {type: 'row', fields: [
                {name: 'fieldLabel', type: 'text', label: 'Libellé du champ', localized: true, defaultValue: 'Votre adresse e-mail'},
                {name: 'buttonLabel', type: 'text', label: 'Libellé du bouton', localized: true, defaultValue: "S'abonner"},
              ]},
              {name: 'mention', type: 'text', label: 'Mention (RGPD)', localized: true},
            ]},
          ],
        },
        {
          label: 'Articles en bref',
          fields: [
            {name: 'articlesEnabled', type: 'checkbox', label: 'Afficher les trois derniers articles', defaultValue: true},
            {name: 'articles', type: 'group', label: 'Articles', admin: {condition: (_d, s) => s?.articlesEnabled !== false}, fields: [
              {name: 'eyebrow', type: 'text', label: 'Surtitre', localized: true, defaultValue: 'En bref'},
              {type: 'row', fields: [
                {name: 'allLabel', type: 'text', label: 'Libellé « tous les articles »', localized: true, defaultValue: 'Tous les articles'},
                {name: 'allHref', type: 'text', label: 'Adresse', defaultValue: '/blog'},
              ]},
            ]},
          ],
        },
        {
          label: 'Colonnes de liens',
          fields: [
            {
              name: 'columns', type: 'array', label: 'Colonnes (4 au plus)', maxRows: 4, labels: {singular: 'Colonne', plural: 'Colonnes'},
              fields: [
                {name: 'title', type: 'text', label: 'Titre', required: true, localized: true},
                {name: 'links', type: 'array', label: 'Liens (4 au plus)', maxRows: 4, labels: {singular: 'Lien', plural: 'Liens'}, fields: link},
              ],
            },
          ],
        },
        {
          label: 'Mentions',
          fields: [
            {name: 'copyright', type: 'text', label: 'Copyright', localized: true, defaultValue: '© Vidomia'},
            {name: 'legalLine', type: 'text', label: 'Ligne légale (SIRET…)'},
            {name: 'legalLinks', type: 'array', label: 'Liens légaux', maxRows: 4, labels: {singular: 'Lien', plural: 'Liens'}, fields: link},
          ],
        },
      ],
    },
  ],
};

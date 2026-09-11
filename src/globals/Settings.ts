import type {GlobalConfig} from 'payload';

import {iconField} from '@/fields/iconField';
import {siloField} from '@/fields/siloField';

/** Réglages du site : silo par défaut, marque et logo, coordonnées, réseaux, langues. */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Réglages du site',
  admin: {group: 'Site'},
  access: {read: () => true},
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identité',
          fields: [
            siloField({name: 'silo', label: "Silo d'accent du site", admin: {description: 'Couleur de référence de tout le site. Une page peut la surcharger.'}}),
            {name: 'brandName', type: 'text', label: 'Nom de la marque', required: true, defaultValue: 'Vidomia'},
            {name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo (SVG de préférence)'},
            {name: 'baseline', type: 'text', label: 'Description courte (pied de page)', localized: true},
          ],
        },
        {
          label: 'Coordonnées',
          fields: [
            {type: 'row', fields: [
              {name: 'phone', type: 'text', label: 'Téléphone affiché', admin: {width: '50%'}},
              {name: 'phoneHref', type: 'text', label: 'Téléphone (lien tel:)', admin: {width: '50%'}},
            ]},
            {name: 'email', type: 'email', label: 'E-mail'},
            {name: 'hours', type: 'text', label: 'Horaires', localized: true},
            {name: 'address', type: 'textarea', label: 'Adresse postale', admin: {rows: 2}},
          ],
        },
        {
          label: 'Réseaux',
          fields: [
            {
              name: 'socials', type: 'array', label: 'Réseaux sociaux', maxRows: 6, labels: {singular: 'Réseau', plural: 'Réseaux'},
              admin: {components: {RowLabel: '@/fields/RowLabels#SocialRowLabel'}},
              fields: [
                {type: 'row', fields: [
                  {name: 'label', type: 'text', label: 'Nom', required: true, admin: {width: '40%'}},
                  {name: 'href', type: 'text', label: 'Adresse', required: true, admin: {width: '60%'}},
                ]},
                iconField({name: 'iconKey', label: 'Icône', required: true}),
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'breadcrumb', type: 'group', label: "Fil d'Ariane",
              fields: [
                {name: 'enabled', type: 'checkbox', label: 'Afficher le fil d\'Ariane sous les hauts de page', defaultValue: true},
                {
                  name: 'homeStyle', type: 'radio', label: 'Premier maillon (accueil)', defaultValue: 'icon',
                  options: [{label: 'Icône maison', value: 'icon'}, {label: 'Texte', value: 'text'}],
                  admin: {layout: 'horizontal', condition: (_d, s) => s?.enabled !== false},
                },
                {name: 'homeLabel', type: 'text', label: 'Libellé de l\'accueil (affiché en texte, sinon lu par les lecteurs d\'écran)', localized: true, defaultValue: 'Accueil', admin: {condition: (_d, s) => s?.enabled !== false}},
              ],
            },
          ],
        },
        {
          label: 'Langues',
          fields: [
            {
              name: 'languages', type: 'select', hasMany: true, label: 'Langues proposées dans le sélecteur', defaultValue: ['fr'],
              options: [{label: 'Français', value: 'fr'}, {label: 'English', value: 'en'}, {label: 'Deutsch', value: 'de'}, {label: 'Español', value: 'es'}],
              admin: {description: 'Les contenus sont traduisibles champ par champ (onglet de langue en haut de chaque page d\'admin). Une langue non traduite affiche le français.'},
            },
          ],
        },
      ],
    },
  ],
};

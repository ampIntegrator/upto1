import type {Block, Field} from 'payload';

import {iconField} from '../iconField';
import {linkGroup} from '../shared';

/**
 * Les blocs « Carte » d'une colonne : le composant Card, préréglage « bloc », décliné en
 * huit blocs pour que le sélecteur de Payload montre chaque variante en image
 * (public/apercus/<slug>.png, générées par `pnpm previews:build`) :
 *   média image, icône, nombre ou titre seul × carte simple ou carte cliquable.
 * Les huit blocs partagent les mêmes champs (titre, texte) ; la variante cliquable ajoute
 * le bouton d'action. Emprise : 3 colonnes (registre des emprises, type « card »).
 */
export type CardMediaKind = 'image' | 'icon' | 'number' | 'title';

const MEDIA: {kind: CardMediaKind; slug: string; label: string; fields: Field[]}[] = [
  {kind: 'image', slug: 'Image', label: 'image', fields: [{name: 'image', type: 'upload', relationTo: 'media', label: 'Image', required: true}]},
  {kind: 'icon', slug: 'Icon', label: 'icône', fields: [iconField({name: 'iconKey', label: 'Icône', required: true})]},
  {
    kind: 'number',
    slug: 'Number',
    label: 'nombre',
    fields: [
      {
        type: 'row',
        fields: [
          {name: 'prefix', type: 'text', label: 'Préfixe', localized: true, admin: {width: '25%'}},
          {name: 'value', type: 'text', label: 'Nombre', required: true, admin: {width: '50%'}},
          {name: 'suffix', type: 'text', label: 'Suffixe', localized: true, admin: {width: '25%'}},
        ],
      },
    ],
  },
  {kind: 'title', slug: 'Title', label: 'titre seul', fields: []},
];

const COMMON: Field[] = [
  {name: 'title', type: 'text', label: 'Titre', required: true, localized: true},
  {name: 'text', type: 'textarea', label: 'Texte', localized: true, admin: {rows: 3}},
];

export const CARD_BLOCKS: Block[] = [];
/** slug du bloc → variante (média, cliquable) et libellé court pour l'admin */
export const CARD_VARIANTS: Record<string, {media: CardMediaKind; clickable: boolean; label: string}> = {};

for (const clickable of [false, true]) {
  for (const m of MEDIA) {
    const slug = `card${m.slug}${clickable ? 'Link' : ''}`;
    const label = `Carte${clickable ? ' cliquable' : ''} · ${m.label}`;
    CARD_VARIANTS[slug] = {media: m.kind, clickable, label};
    CARD_BLOCKS.push({
      slug,
      labels: {singular: label, plural: `${label} (pl.)`},
      imageURL: `/apercus/${slug}.png`,
      imageAltText: label,
      admin: {group: clickable ? 'Cartes cliquables' : 'Cartes'},
      fields: [...m.fields, ...COMMON, ...(clickable ? [linkGroup('cta', "Bouton d'action", {required: true})] : [])],
    });
  }
}

export const CARD_SLUGS = Object.keys(CARD_VARIANTS);

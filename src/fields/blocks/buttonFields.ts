import type {Field} from 'payload';

import {textBoxBlockText as t} from '../../i18n/admin/blocks';
import {iconField} from '../iconField';

/**
 * The settings of a site button, shared by the text box and the button group blocks:
 * label, address, shape (simple or split), style, size, and a Nucleo icon on simple
 * buttons only. Field names are stored in the database: do not rename them.
 *
 * A function, not a shared array: Payload mutates field configs while sanitising them (inside a
 * localized rich text it strips `localized` from nested fields), so each block needs its own
 * objects, otherwise the post editor's CTA band would change the text box's schema.
 */
type Sibling = Record<string, unknown>;

export const buttonRowFields = (): Field[] => [
  {
    type: 'row',
    fields: [
      {name: 'label', type: 'text', label: {fr: 'Libellé', en: 'Label'}, localized: true, required: true, admin: {width: '50%'}},
      {name: 'href', type: 'text', label: {fr: 'Adresse', en: 'Address'}, required: true, admin: {width: '50%'}},
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'shape',
        type: 'select',
        label: t.buttonShape,
        defaultValue: 'simple',
        options: [
          {label: t.shapeSimple, value: 'simple'},
          {label: t.shapeSplit, value: 'split'},
        ],
        admin: {width: '25%'},
      },
      {
        name: 'variant',
        type: 'select',
        label: t.buttonVariant,
        defaultValue: 'primary',
        options: [
          {label: t.variants.primary, value: 'primary'},
          {label: t.variants.high, value: 'high'},
          {label: t.variants.secondary, value: 'secondary'},
          {label: t.variants.ghost, value: 'ghost'},
        ],
        admin: {width: '25%'},
      },
      {
        name: 'size',
        type: 'select',
        label: t.buttonSize,
        defaultValue: 'md',
        options: [
          {label: t.sizeMd, value: 'md'},
          {label: t.sizeLg, value: 'lg'},
        ],
        admin: {width: '25%'},
      },
      // the split button carries its arrow: the icon is offered on simple buttons only
      iconField({name: 'iconKey', label: t.buttonIcon, admin: {width: '25%', condition: (_d: unknown, s: Sibling) => (s?.shape ?? 'simple') === 'simple'}}),
    ],
  },
];

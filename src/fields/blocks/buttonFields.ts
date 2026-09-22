import type {Field} from 'payload';

import {textBoxBlockText as t} from '../../i18n/admin/blocks';
import {collectionsText as ct} from '../../i18n/admin/collections';
import {tr} from '../../i18n/admin/languages';
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

/**
 * A footer button of a modal (« Modales »): label, action (close the modal, or go to an address:
 * a page, another modal's anchor #modale-<slug>…) and style, destructive included. Simple buttons only:
 * no split shape, no size, no icon. A factory too, for the same reason as `buttonRowFields`.
 */
export const modalButtonFields = (): Field[] => {
  const f = ct.modals.fields;
  return [
    {
      type: 'row',
      fields: [
        {name: 'label', type: 'text', label: f.label, localized: true, required: true, admin: {width: '50%'}},
        {
          name: 'variant',
          type: 'select',
          label: f.variant,
          defaultValue: 'primary',
          required: true,
          options: [
            {label: f.variantPrimary, value: 'primary'},
            {label: f.variantSecondary, value: 'secondary'},
            {label: f.variantGhost, value: 'ghost'},
            {label: f.variantDestructive, value: 'destructive'},
          ],
          admin: {width: '50%'},
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'action',
          type: 'select',
          label: f.action,
          defaultValue: 'close',
          required: true,
          options: [
            {label: f.actionClose, value: 'close'},
            {label: f.actionLink, value: 'link'},
          ],
          admin: {width: '50%'},
        },
        {
          name: 'href',
          type: 'text',
          label: f.href,
          admin: {width: '50%', condition: (_d: unknown, s: Sibling) => s?.action === 'link'},
          // required only when the button goes somewhere
          validate: (value: unknown, {siblingData, req}: {siblingData?: Sibling; req?: {i18n?: {language?: string}}}) =>
            siblingData?.action !== 'link' || (typeof value === 'string' && value.trim() !== '') || tr(f.hrefRequired, req?.i18n?.language),
        },
      ],
    },
  ];
};

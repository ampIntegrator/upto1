import type {Block} from 'payload';

import {collectionsText as ct} from '@/i18n/admin/collections';
import {MODAL_FORM_SLUG} from '@/lib/modal-paths';

/**
 * « Formulaire » block inserted in a modal's body (Lexical BlocksFeature): a form of the
 * Formulaires collection, placed anywhere in the text (after an intro, before a legal note,
 * alone). Rendered without its card; its heading is hidden by default (the modal's title serves).
 * A factory: Payload mutates block configs, each editor needs its own copy.
 */
export const modalFormBlock = (): Block => ({
  slug: MODAL_FORM_SLUG,
  labels: {singular: ct.modals.formBlock.singular, plural: ct.modals.formBlock.plural},
  fields: [
    {name: 'form', type: 'relationship', relationTo: 'forms', label: ct.modals.formBlock.form, required: true},
    {name: 'showHeading', type: 'checkbox', label: ct.modals.formBlock.showHeading, defaultValue: false, admin: {description: ct.modals.formBlock.showHeadingDescription}},
  ],
});

import type {SelectField} from 'payload';

import {type ContentTitleTag, CONTENT_TITLE_TAGS} from '@/components/title-tags';
import {fieldsText} from '@/i18n/admin/fields';

/**
 * Shared « tag » select: the HTML element of a title (h2 to h6, p or span), for structure
 * and SEO only; the look never changes (Title component). Placed next to every title
 * field of a block, with the default that keeps today's rendering.
 */
export function tagField({name = 'tag', defaultValue, width}: {name?: string; defaultValue: ContentTitleTag; width?: string}): SelectField {
  return {
    name,
    type: 'select',
    label: fieldsText.tag.label,
    defaultValue,
    options: CONTENT_TITLE_TAGS.map((v) => ({label: v, value: v})),
    admin: {width, description: fieldsText.tag.description},
  };
}

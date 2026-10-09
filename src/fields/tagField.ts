import type {SelectField} from 'payload';

import {type ContentTitleTag, CONTENT_TITLE_TAGS} from '@/components/title-tags';
import {fieldsText} from '@/i18n/admin/fields';

/**
 * Shared « tag » select: the HTML element of a title (h2 to h6, p or span), for structure
 * and SEO only; the look never changes (Title component). Placed next to every title
 * field of a block, with the default that keeps today's rendering. In the section manager's content
 * panel it goes under its title, in the same cell (`below`; Nicolas, 5 Oct. 2026): pass
 * `below: false` for a tag that has no title field just before it.
 */
export function tagField({name = 'tag', defaultValue, width, below = true}: {name?: string; defaultValue: ContentTitleTag; width?: string; below?: boolean}): SelectField {
  return {
    name,
    type: 'select',
    label: fieldsText.tag.label,
    defaultValue,
    options: CONTENT_TITLE_TAGS.map((v) => ({label: v, value: v})),
    admin: {width, description: fieldsText.tag.description, custom: below ? {below: true} : undefined},
  };
}

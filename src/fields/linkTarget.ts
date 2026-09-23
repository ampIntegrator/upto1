import type {Field, RelationshipField, SelectField, TextField} from 'payload';

import {fieldsText} from '@/i18n/admin/fields';
import {tr} from '@/i18n/admin/languages';

/**
 * The target of a button or a link, chosen like a link of the rich text editor: « Adresse » (a URL
 * or an anchor, typed) or « Contenu du site » (a page, a post, a case study or a modal picked in a
 * list). The site writes the address of a chosen content on `href` when it loads the data
 * (`stampInternalLinks`, src/lib/links.ts): every consumer keeps reading `href`. Stored: `kind`,
 * `href` (the typed address) and `doc` (the chosen content). Existing data (an `href` alone) is
 * the « Adresse » case.
 *
 * A factory (Payload mutates field configs). `when`: an extra condition (a button whose action
 * is not a link hides the three fields); `required`: the address, or the content, must be given.
 */
type Sibling = Record<string, unknown>;
type Req = {i18n?: {language?: string}};

export const LINK_TARGET_COLLECTIONS = ['pages', 'posts', 'case-studies', 'modals'] as const;

export function linkTargetFields(o: {required?: boolean; when?: (siblingData: Sibling) => boolean; kindWidth?: string} = {}): [SelectField, TextField, RelationshipField] {
  const t = fieldsText.link;
  const when = o.when ?? (() => true);
  const isInternal = (s: Sibling) => s?.kind === 'internal';
  const kind: SelectField = {
    name: 'kind',
    type: 'select',
    label: t.kind,
    defaultValue: 'url',
    required: true,
    options: [
      {label: t.kindUrl, value: 'url'},
      {label: t.kindInternal, value: 'internal'},
    ],
    admin: {width: o.kindWidth, condition: (_d: unknown, s: Sibling) => when(s)},
  };
  const href: TextField = {
    name: 'href',
    type: 'text',
    label: t.href,
    admin: {condition: (_d: unknown, s: Sibling) => when(s) && !isInternal(s)},
    validate: (value: unknown, {siblingData, req}: {siblingData?: Sibling; req?: Req}) =>
      !o.required || !when(siblingData ?? {}) || isInternal(siblingData ?? {}) || (typeof value === 'string' && value.trim() !== '') || tr(t.hrefRequired, req?.i18n?.language),
  };
  const doc: RelationshipField = {
    name: 'doc',
    type: 'relationship',
    relationTo: [...LINK_TARGET_COLLECTIONS],
    label: t.doc,
    admin: {condition: (_d: unknown, s: Sibling) => when(s) && isInternal(s)},
    validate: (value: unknown, {siblingData, req}: {siblingData?: Sibling; req?: Req}) =>
      !o.required || !when(siblingData ?? {}) || !isInternal(siblingData ?? {}) || Boolean(value) || tr(t.docRequired, req?.i18n?.language),
  };
  return [kind, href, doc];
}

/** the same three fields, as plain fields (for spreading in a fields list) */
export const linkTarget = (o?: Parameters<typeof linkTargetFields>[0]): Field[] => linkTargetFields(o);

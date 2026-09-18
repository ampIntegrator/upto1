import type {Field, PayloadRequest, Tab} from 'payload';

import {entryBelowText as t} from '@/i18n/admin/collections';
import {type Text, tr} from '@/i18n/admin/languages';

/**
 * The « under the entry » tab of a blog post or a case study (mockup 18): a FAQ, hidden unless
 * ticked, then the related entries, automatic (same category, then the newest), chosen or
 * hidden. Their title, tag and count are shared, in the listing's settings (« Sous les
 * articles » / « Sous les réalisations »). Rendered by PostPage and CasePage (EntryFaq,
 * RelatedPosts). A factory: every call returns fresh field objects.
 */
type Sibling = Record<string, unknown>;

export function entryBelowTab(o: {collection: 'posts' | 'case-studies'; label: Text; description: Text}): Tab {
  const fields: Field[] = [
    {
      name: 'faq', type: 'group', label: t.faq,
      fields: [
        {name: 'show', type: 'checkbox', label: t.faqShow, defaultValue: false},
        {
          name: 'items', type: 'array', label: t.faqItems,
          labels: {singular: t.faqItem, plural: t.faqItems},
          admin: {condition: (_d, s: Sibling) => Boolean(s?.show), initCollapsed: false},
          validate: (value: unknown, {siblingData, req}: {siblingData: Sibling; req: PayloadRequest}) =>
            !siblingData?.show || (Array.isArray(value) && value.length > 0) || tr(t.faqEmpty, req.i18n?.language),
          fields: [
            {name: 'question', type: 'text', label: t.question, localized: true, required: true},
            {name: 'answer', type: 'textarea', label: t.answer, localized: true, required: true, admin: {rows: 3, description: t.answerDescription}},
          ],
        },
      ],
    },
    {
      name: 'related', type: 'group', label: o.collection === 'posts' ? t.relatedPosts : t.relatedCases,
      fields: [
        {
          name: 'mode', type: 'radio', label: false, defaultValue: 'auto',
          options: o.collection === 'posts'
            ? [{label: t.relatedAuto, value: 'auto'}, {label: t.relatedManual, value: 'manual'}, {label: t.relatedHidden, value: 'hidden'}]
            : [{label: t.relatedAutoCases, value: 'auto'}, {label: t.relatedManualCases, value: 'manual'}, {label: t.relatedHiddenCases, value: 'hidden'}],
          admin: {layout: 'horizontal'},
        },
        {
          name: 'items', type: 'relationship', relationTo: o.collection, hasMany: true, maxRows: 4, label: t.relatedItems,
          // never the entry itself
          filterOptions: ({id}) => (id ? {id: {not_equals: id}} : true),
          admin: {condition: (_d, s: Sibling) => s?.mode === 'manual', description: t.relatedItemsDescription},
        },
      ],
    },
  ];
  return {label: o.label, description: o.description, fields};
}

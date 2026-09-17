import type {Field, Tab} from 'payload';

import type {Text} from '@/i18n/admin/languages';
import {listingSlugField} from './listingSlug';

/**
 * The fields of a listing settings global (Blog › Réglages du blog, Réalisations › Réglages des
 * réalisations): a « page » tab (address, eyebrow, h1 title, lead, tone, entries per page)
 * and a « labels » tab (a `labels` group of localized texts, plus the listing's own fields).
 * Read on the site by `listingConfig` (src/lib/listings.ts).
 * A factory: every call returns fresh field objects (Payload mutates configs while sanitising).
 */
export type ListingSettingsText = {
  tabs: {page: Text; labels: Text};
  slug: Text;
  eyebrow: Text;
  title: Text;
  titleDescription: Text;
  lead: Text;
  tone: Text;
  toneLight: Text;
  toneNight: Text;
  perPage: Text;
  labelsGroup: Text;
};

/** a localized label with its default, `width` in % of the row */
export type ListingLabel = {name: string; label: Text; defaultValue: string; width: number};

export function listingSettingsFields(o: {self: 'blog' | 'portfolio'; t: ListingSettingsText; slug: string; eyebrow: string; title: string; labelRows: ListingLabel[][]; extraLabelFields?: () => Field[]}): Field[] {
  const {t} = o;
  const pageTab: Tab = {
    label: t.tabs.page,
    fields: [
      listingSlugField({self: o.self, label: t.slug, defaultValue: o.slug}),
      {type: 'row', fields: [
        {name: 'eyebrow', type: 'text', label: t.eyebrow, localized: true, defaultValue: o.eyebrow, admin: {width: '34%'}},
        {name: 'title', type: 'text', label: t.title, localized: true, defaultValue: o.title, admin: {width: '66%', description: t.titleDescription}},
      ]},
      {name: 'lead', type: 'textarea', label: t.lead, localized: true, admin: {rows: 2}},
      {type: 'row', fields: [
        {
          name: 'tone', type: 'radio', label: t.tone, defaultValue: 'light',
          options: [{label: t.toneLight, value: 'light'}, {label: t.toneNight, value: 'night'}],
          admin: {layout: 'horizontal', width: '50%'},
        },
        {name: 'perPage', type: 'number', label: t.perPage, defaultValue: 12, min: 4, max: 48, admin: {width: '50%'}},
      ]},
    ],
  };
  const labelsTab: Tab = {
    label: t.tabs.labels,
    fields: [
      {
        name: 'labels', type: 'group', label: t.labelsGroup,
        admin: {hideGutter: true},
        fields: o.labelRows.map((row) => ({
          type: 'row' as const,
          fields: row.map((l): Field => ({name: l.name, type: 'text', label: l.label, localized: true, defaultValue: l.defaultValue, admin: {width: `${l.width}%`}})),
        })),
      },
      ...(o.extraLabelFields?.() ?? []),
    ],
  };
  return [{type: 'tabs', tabs: [pageTab, labelsTab]}];
}

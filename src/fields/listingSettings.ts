import type {Field, Tab} from 'payload';

import type {Text} from '@/i18n/admin/languages';
import {listingSlugField} from './listingSlug';
import {tagField} from './tagField';

/**
 * The fields of a listing settings global (Blog › Réglages du blog, Réalisations › Réglages des
 * réalisations): a « page » tab (address, eyebrow, h1 title, lead, tone, entries per page)
 * a « labels » tab (a `labels` group of localized texts, plus the listing's own fields) and an
 * « under the entries » tab (the FAQ's and the related entries' headings, number of related entries).
 * Read on the site by `listingConfig` (src/lib/listings.ts).
 * A factory: every call returns fresh field objects (Payload mutates configs while sanitising).
 */
export type ListingSettingsText = {
  tabs: {page: Text; labels: Text; below: Text};
  belowDescription: Text;
  faqEyebrow: Text;
  faqTitle: Text;
  relatedEyebrow: Text;
  relatedTitle: Text;
  headingDescription: Text;
  relatedCount: Text;
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

export function listingSettingsFields(o: {self: 'blog' | 'portfolio'; t: ListingSettingsText; slug: string; eyebrow: string; title: string; related: {eyebrow: string; title: string}; labelRows: ListingLabel[][]; extraLabelFields?: () => Field[]}): Field[] {
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
  const belowTab: Tab = {
    label: t.tabs.below,
    description: t.belowDescription,
    fields: [
      // the same heading for the FAQ and the related entries: eyebrow, title (empty = no heading), tag
      {type: 'row', fields: [
        {name: 'faqEyebrow', type: 'text', label: t.faqEyebrow, localized: true, admin: {width: '25%'}},
        {name: 'faqTitle', type: 'text', label: t.faqTitle, localized: true, admin: {width: '50%', description: t.headingDescription}},
        tagField({name: 'faqTag', defaultValue: 'h2', width: '25%'}),
      ]},
      {type: 'row', fields: [
        {name: 'relatedEyebrow', type: 'text', label: t.relatedEyebrow, localized: true, defaultValue: o.related.eyebrow, admin: {width: '25%'}},
        {name: 'relatedTitle', type: 'text', label: t.relatedTitle, localized: true, defaultValue: o.related.title, admin: {width: '50%', description: t.headingDescription}},
        tagField({name: 'relatedTag', defaultValue: 'h2', width: '25%'}),
      ]},
      {
        name: 'relatedCount', type: 'radio', label: t.relatedCount, defaultValue: '3',
        options: [{label: '3', value: '3'}, {label: '4', value: '4'}],
        admin: {layout: 'horizontal'},
      },
    ],
  };
  return [{type: 'tabs', tabs: [pageTab, labelsTab, belowTab]}];
}

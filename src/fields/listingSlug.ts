import type {Field, PayloadRequest} from 'payload';

import {fieldsText} from '@/i18n/admin/fields';
import {collectionsText as ct} from '@/i18n/admin/collections';
import {type Text, tr} from '@/i18n/admin/languages';
import {MODAL_SEGMENT} from '@/lib/modal-paths';

/**
 * The address of a listing (blog, case studies), typed in its settings global: « actualites » puts
 * the list at /actualites, the entries at /actualites/<entry>. A listing is not a page: the address
 * must be free, so it is checked against the pages, the other listing and the site's own routes;
 * and a page cannot take a listing's address (`pageSlugValidate`).
 */
export const LISTING_GLOBALS: {slug: 'blog' | 'portfolio'; name: Text}[] = [
  {slug: 'blog', name: ct.groups.blog},
  {slug: 'portfolio', name: ct.groups.cases},
];

/** first segments used by the site itself */
const RESERVED = ['admin', 'api', 'apercu', 'apercus', 'design', 'mise-en-page', 'accueil', 'categorie', 'media', 'fonts', 'next', MODAL_SEGMENT];

const FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type ValidateArgs = {req: PayloadRequest};

/** The slug of a listing global: format, reserved segments, pages, the other listing. */
export const listingSlugValidate = (self: 'blog' | 'portfolio') => async (value: unknown, {req}: ValidateArgs) => {
  const language = req?.i18n?.language;
  if (typeof value !== 'string' || !FORMAT.test(value)) return tr(fieldsText.slug.invalid, language);
  if (RESERVED.includes(value)) return tr(fieldsText.slug.reserved, language, {slug: value});
  if (!req?.payload) return true;
  const pages = await req.payload.find({collection: 'pages', where: {slug: {equals: value}}, limit: 1, depth: 0, req});
  if (pages.totalDocs) return tr(fieldsText.slug.takenByPage, language, {slug: value});
  for (const other of LISTING_GLOBALS.filter((g) => g.slug !== self)) {
    const doc = (await req.payload.findGlobal({slug: other.slug, depth: 0, req})) as {slug?: string | null};
    if (doc?.slug === value) return tr(fieldsText.slug.takenByListing, language, {slug: value, listing: tr(other.name, language)});
  }
  return true;
};

/** The address field of a listing settings global (a factory, like every shared config). */
export const listingSlugField = (o: {self: 'blog' | 'portfolio'; label: Text; defaultValue: string}): Field => ({
  name: 'slug',
  type: 'text',
  label: o.label,
  required: true,
  defaultValue: o.defaultValue,
  // live description: the addresses the typed slug gives, and a button opening the list
  admin: {components: {Description: {path: '@/fields/ListingAddress#ListingAddress', clientProps: {listing: o.self}}}},
  validate: listingSlugValidate(o.self) as never,
});

/** A page's slug: the usual format, not the address of a listing, not « modale » at the top level. */
export const pageSlugValidate = async (value: unknown, {req, siblingData}: ValidateArgs & {siblingData?: {parent?: unknown}}) => {
  const language = req?.i18n?.language;
  if (typeof value !== 'string' || !FORMAT.test(value)) return tr(fieldsText.slug.invalid, language);
  // a top-level page cannot take the modals' address (/modale/<slug> is a site route)
  if (value === MODAL_SEGMENT && !siblingData?.parent) return tr(fieldsText.slug.reserved, language, {slug: value});
  if (!req?.payload) return true;
  for (const listing of LISTING_GLOBALS) {
    const doc = (await req.payload.findGlobal({slug: listing.slug, depth: 0, req})) as {slug?: string | null};
    if (doc?.slug === value) return tr(fieldsText.slug.takenByListing, language, {slug: value, listing: tr(listing.name, language)});
  }
  return true;
};

/**
 * Loaders shared by the listings' entries (posts, case studies) and their categories: one page of
 * entries, the categories, one category, one entry, the related entries. Server only (Payload
 * local API).
 */
import config from '@payload-config';
import {getPayload, type Where} from 'payload';

import type {Locale} from '@/locales';
import type {CaseCategory, CaseStudy, Category, Post} from '@/payload-types';

type Entries = {posts: Post; 'case-studies': CaseStudy};
type Categories = {categories: Category; 'case-categories': CaseCategory};
export type EntryCollection = keyof Entries;
export type CategoryCollection = keyof Categories;

/** One page (from 0) of entries, all or one category, newest first. */
export async function loadEntryPage<C extends EntryCollection>(collection: C, locale: Locale, perPage: number, page: number, category?: number) {
  const payload = await getPayload({config});
  const where: Where | undefined = category ? {category: {equals: category}} : undefined;
  const res = await payload.find({collection, locale, depth: 1, limit: perPage, page: page + 1, sort: '-publishedAt', where});
  return {docs: res.docs as Entries[C][], pages: Math.max(1, res.totalPages), page: Math.min(page, Math.max(0, res.totalPages - 1))};
}

export async function loadCategoryList<C extends CategoryCollection>(collection: C, locale: Locale): Promise<Categories[C][]> {
  const payload = await getPayload({config});
  const res = await payload.find({collection, locale, depth: 0, limit: 100, sort: 'title'});
  return res.docs as Categories[C][];
}

export async function loadCategoryBySlug<C extends CategoryCollection>(collection: C, locale: Locale, slug: string): Promise<Categories[C] | null> {
  const payload = await getPayload({config});
  const res = await payload.find({collection, locale, depth: 0, limit: 1, where: {slug: {equals: slug}}});
  return (res.docs[0] as Categories[C] | undefined) ?? null;
}

export async function loadEntryBySlug<C extends EntryCollection>(collection: C, locale: Locale, slug: string): Promise<Entries[C] | null> {
  const payload = await getPayload({config});
  const res = await payload.find({collection, locale, depth: 2, limit: 1, where: {slug: {equals: slug}}});
  return (res.docs[0] as Entries[C] | undefined) ?? null;
}

/**
 * The related entries under an entry (its « under the entry » tab): none when hidden; the chosen
 * ones in their order when chosen, completed if short; otherwise entries of the same category
 * (newest first), then the newest others if the category is short.
 */
export async function loadRelatedEntries<C extends EntryCollection>(collection: C, locale: Locale, entry: Entries[C], count = 3): Promise<Entries[C][]> {
  const related = entry.related;
  if (related?.mode === 'hidden') return [];
  const payload = await getPayload({config});
  const chosenIds = related?.mode === 'manual' ? (related.items ?? []).map((i) => (typeof i === 'object' ? i.id : i)).filter((id) => id !== entry.id).slice(0, count) : [];
  const chosen = chosenIds.length ? ((await payload.find({collection, locale, depth: 1, limit: chosenIds.length, where: {id: {in: chosenIds}}})).docs as Entries[C][]) : [];
  chosen.sort((a, b) => chosenIds.indexOf(a.id) - chosenIds.indexOf(b.id));
  if (chosen.length >= count) return chosen;
  const exclude = [entry.id, ...chosen.map((d) => d.id)];
  const category = typeof entry.category === 'object' && entry.category ? entry.category.id : entry.category;
  const same = await payload.find({collection, locale, depth: 1, limit: count - chosen.length, sort: '-publishedAt', where: {and: [{id: {not_in: exclude}}, {category: {equals: category}}]}});
  const found = [...chosen, ...(same.docs as Entries[C][])];
  if (found.length >= count) return found;
  const others = await payload.find({collection, locale, depth: 1, limit: count - found.length, sort: '-publishedAt', where: {id: {not_in: [...exclude, ...same.docs.map((d) => d.id)]}}});
  return [...found, ...(others.docs as Entries[C][])];
}

/** The FAQ under an entry, when ticked and filled. */
export const entryFaq = (entry: Post | CaseStudy): {question: string; answer: string}[] =>
  entry.faq?.show ? (entry.faq.items ?? []).filter((i) => i.question && i.answer).map((i) => ({question: i.question, answer: i.answer})) : [];

/** The latest entries (collection blocks fed by a listing), optionally of one category. */
export async function loadLatestEntries<C extends EntryCollection>(collection: C, locale: Locale, q: {limit: number; category?: number}): Promise<Entries[C][]> {
  const payload = await getPayload({config});
  const res = await payload.find({collection, locale, depth: 1, limit: q.limit, sort: '-publishedAt', where: q.category ? {category: {equals: q.category}} : undefined});
  return res.docs as Entries[C][];
}

/** Entries chosen by id (post cards, case cards), with their cover and category. */
export async function loadEntriesByIds<C extends EntryCollection>(collection: C, locale: Locale, ids: number[]): Promise<Entries[C][]> {
  if (!ids.length) return [];
  const payload = await getPayload({config});
  const res = await payload.find({collection, locale, depth: 1, limit: ids.length, where: {id: {in: ids}}});
  return res.docs as Entries[C][];
}

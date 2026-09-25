/**
 * Entries of a listing as site cards: a blog post as an article card, a case study as a
 * realisation card. Pure conversion (no React,
 * no Payload runtime), shared by the listing pages, the related entries and the section builder.
 */
import type {CardProps} from '@/components/Card';
import {type BlogConfig, type CasesConfig, entryPath, plainTitle} from '@/lib/listings';
import type {CaseStudy, Media, Post} from '@/payload-types';

export type MediaRef = Media | number | null | undefined;

export const mediaImage = (m: MediaRef): {src: string; alt?: string; width?: number; height?: number} | undefined =>
  m && typeof m === 'object' && m.url ? {src: m.url, alt: m.alt || undefined, width: m.width ?? undefined, height: m.height ?? undefined} : undefined;

export const formatDate = (iso: string, locale: string) => new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(iso));

/** A post as an article card: cover, category, date, title without its serif accent, link. */
export function postCard(p: Post, blog: BlogConfig, locale: string, ctaLabel?: string): CardProps {
  const cover = mediaImage(p.cover);
  const category = typeof p.category === 'object' && p.category ? p.category : null;
  return {
    preset: 'article',
    media: cover ? {type: 'image', src: cover.src, alt: cover.alt} : {type: 'none'},
    chip: category ? {label: category.title} : undefined,
    date: formatDate(p.publishedAt, locale),
    title: plainTitle(p.title),
    cta: {label: ctaLabel || blog.labels.readMore, href: entryPath(blog, p.slug)},
  };
}

/** A case study as a realisation card: cover, category, title, client · location, link. */
export function caseCard(c: CaseStudy, cases: CasesConfig, ctaLabel?: string): CardProps {
  const cover = mediaImage(c.cover);
  const category = typeof c.category === 'object' && c.category ? c.category : null;
  return {
    preset: 'realisation',
    media: cover ? {type: 'image', src: cover.src, alt: cover.alt} : {type: 'none'},
    chip: category ? {label: category.title, tone: 'high'} : undefined,
    title: plainTitle(c.title),
    client: c.sheet?.client ? {name: c.sheet.client, location: c.sheet.location || undefined} : undefined,
    cta: {label: ctaLabel || cases.labels.readMore, href: entryPath(cases, c.slug)},
  };
}

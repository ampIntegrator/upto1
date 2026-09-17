/**
 * Blog data: posts as article cards, the paginated list of the blog page and category
 * archives, related posts, a post as PostHeader props. Server only (Payload local API).
 */
import config from '@payload-config';
import {getPayload, type Where} from 'payload';

import type {CardProps} from '@/components/Card';
import type {PostHeaderProps} from '@/components/PostHeader';
import {type BlogConfig, categoryPath, postPath} from '@/lib/blog';
import type {Locale} from '@/locales';
import type {Author, Category, Media, Post} from '@/payload-types';

const media = (m: Media | number | null | undefined): {src: string; alt?: string; width?: number; height?: number} | undefined =>
  m && typeof m === 'object' && m.url ? {src: m.url, alt: m.alt || undefined, width: m.width ?? undefined, height: m.height ?? undefined} : undefined;

export const formatDate = (iso: string, locale: string) => new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(iso));

export function postCard(p: Post, blog: BlogConfig, locale: string): CardProps {
  const cover = media(p.cover);
  const category = typeof p.category === 'object' && p.category ? p.category : null;
  return {
    preset: 'article',
    media: cover ? {type: 'image', src: cover.src, alt: cover.alt} : {type: 'none'},
    chip: category ? {label: category.title} : undefined,
    date: formatDate(p.publishedAt, locale),
    // the serif accent (<span>) is for the post's h1 only
    title: p.title.replace(/<\/?span>/g, ''),
    cta: {label: blog.labels.readMore, href: postPath(blog, p.slug)},
  };
}

/** One page of posts (all, or one category), newest first. */
export async function loadPostPage(locale: Locale, blog: BlogConfig, page: number, category?: number) {
  const payload = await getPayload({config});
  const where: Where | undefined = category ? {category: {equals: category}} : undefined;
  const res = await payload.find({collection: 'posts', locale, depth: 1, limit: blog.perPage, page: page + 1, sort: '-publishedAt', where});
  return {posts: res.docs, pages: Math.max(1, res.totalPages), page: Math.min(page, Math.max(0, res.totalPages - 1))};
}

export async function loadCategories(locale: Locale): Promise<Category[]> {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'categories', locale, depth: 0, limit: 100, sort: 'title'});
  return res.docs;
}

export async function loadCategory(locale: Locale, slug: string): Promise<Category | null> {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'categories', locale, depth: 0, limit: 1, where: {slug: {equals: slug}}});
  return res.docs[0] ?? null;
}

export async function loadPost(locale: Locale, slug: string): Promise<Post | null> {
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'posts', locale, depth: 2, limit: 1, where: {slug: {equals: slug}}});
  return res.docs[0] ?? null;
}

/** Three posts of the same category (newest first), then the newest others if the category is short. */
export async function loadRelated(locale: Locale, post: Post, count = 3): Promise<Post[]> {
  const payload = await getPayload({config});
  const category = typeof post.category === 'object' && post.category ? post.category.id : post.category;
  const same = await payload.find({collection: 'posts', locale, depth: 1, limit: count, sort: '-publishedAt', where: {and: [{id: {not_equals: post.id}}, {category: {equals: category}}]}});
  if (same.docs.length >= count) return same.docs;
  const others = await payload.find({collection: 'posts', locale, depth: 1, limit: count - same.docs.length, sort: '-publishedAt', where: {and: [{id: {not_equals: post.id}}, {id: {not_in: same.docs.map((d) => d.id)}}]}});
  return [...same.docs, ...others.docs];
}

export function postHeader(post: Post, blog: BlogConfig, locale: string): PostHeaderProps {
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const author = post.author && typeof post.author === 'object' ? (post.author as Author) : null;
  const photo = media(author?.photo);
  return {
    category: category ? {label: category.title, href: categoryPath(blog, category.slug)} : undefined,
    title: post.title,
    lead: post.excerpt || undefined,
    author: author ? {name: author.name, role: author.role || undefined, photo: photo ? {src: photo.src, alt: photo.alt} : undefined} : undefined,
    date: {label: formatDate(post.publishedAt, locale), iso: post.publishedAt},
    dateLabel: blog.labels.dateLabel,
    cover: media(post.cover),
    coverCaption: post.coverCaption || undefined,
  };
}

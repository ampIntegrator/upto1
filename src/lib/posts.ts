/**
 * Blog data: posts through the shared entry loaders, a post as PostHeader props. Server only.
 */
import type {PostHeaderProps} from '@/components/PostHeader';
import {formatDate, mediaImage as media} from '@/lib/cards';
import {loadCategoryBySlug, loadCategoryList, loadEntryBySlug, loadEntryPage, loadRelatedEntries} from '@/lib/entries';
import {type BlogConfig, categoryPath} from '@/lib/listings';
import type {Locale} from '@/locales';
import type {Author, Post} from '@/payload-types';

export const loadPostPage = async (locale: Locale, blog: BlogConfig, page: number, category?: number) => {
  const res = await loadEntryPage('posts', locale, blog.perPage, page, category);
  return {posts: res.docs, pages: res.pages, page: res.page};
};
export const loadCategories = (locale: Locale) => loadCategoryList('categories', locale);
export const loadCategory = (locale: Locale, slug: string) => loadCategoryBySlug('categories', locale, slug);
export const loadPost = (locale: Locale, slug: string) => loadEntryBySlug('posts', locale, slug);
export const loadRelated = (locale: Locale, post: Post, count = 3) => loadRelatedEntries('posts', locale, post, count);

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
    coverCaptionTone: post.coverCaptionTone === 'dark' ? 'dark' : 'light',
  };
}

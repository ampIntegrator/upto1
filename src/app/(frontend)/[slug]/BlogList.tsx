/**
 * BlogList — the blog page (Blog settings) and the category archives: the page top (title,
 * lead, light or night), the category chips, the article cards and the pagination. Rendered
 * in place of the chosen page's own content.
 */
import React from 'react';

import {Hero} from '@/components/Hero';
import {PostArchive} from '@/components/PostArchive';
import {SitePage} from '@/components/SitePage';
import {type BlogConfig, blogPath, categoryPath, pagePath} from '@/lib/blog';
import {loadCategories, loadPostPage, postCard} from '@/lib/posts';
import {getSite, pageSilo, toFooter, toHeader} from '@/lib/site';
import type {Locale} from '@/locales';
import type {Category} from '@/payload-types';

export async function BlogList({locale, blog, site, page, category}: {locale: Locale; blog: BlogConfig; site: Awaited<ReturnType<typeof getSite>>; page: number; category?: Category}) {
  const [list, categories] = await Promise.all([loadPostPage(locale, blog, page, category?.id), loadCategories(locale)]);
  const base = category ? categoryPath(blog, category.slug) : blogPath(blog);
  const night = blog.tone === 'night';
  const s = site.settings;
  return (
    <SitePage silo={pageSilo(null, s)} header={toHeader(s, site.header, site.languages, site.blog)} footer={toFooter(s, site.footer, site.posts, locale, site.blog)} tone={night ? 'dark' : 'light'} currentHref={blogPath(blog)}>
      <Hero
        variant="page"
        background={night ? 'night-halo' : 'glow'}
        eyebrow={category ? blog.labels.categoryPrefix : blog.eyebrow}
        title={category ? category.title : blog.title}
        lead={category ? undefined : blog.lead}
        breadcrumb={
          s.breadcrumb?.enabled !== false
            ? {items: category ? [{label: blog.title.replace(/<\/?span>/g, ''), href: blogPath(blog)}] : [], current: category ? category.title : blog.title.replace(/<\/?span>/g, ''), homeLabel: s.breadcrumb?.homeLabel ?? 'Accueil', homeStyle: (s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'}
            : undefined
        }
      />
      <PostArchive
        categories={categories.length > 1 ? [{label: blog.labels.all, href: blogPath(blog), active: !category}, ...categories.map((c) => ({label: c.title, href: categoryPath(blog, c.slug), active: c.id === category?.id}))] : []}
        items={list.posts.map((p) => postCard(p, blog, locale))}
        page={list.page}
        pages={list.pages}
        hrefFor={(p) => pagePath(base, p)}
        gaps={{x: Number(s.sectionGrid?.gapX ?? 30), y: Number(s.sectionGrid?.gapY ?? 40), yMobile: Number(s.sectionGrid?.gapYMobile ?? 40)}}
      />
    </SitePage>
  );
}

export const pageFromQuery = (value: string | string[] | undefined): number => Math.max(0, Math.floor(Number(Array.isArray(value) ? value[0] : (value ?? 1))) - 1 || 0);

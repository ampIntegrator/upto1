import {notFound} from 'next/navigation';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {PageSections} from '@/components/PageSections';
import {PostHeader} from '@/components/PostHeader';
import {PostLayout} from '@/components/PostLayout';
import {PostToc} from '@/components/PostToc';
import {renderProseBlock} from '@/components/ProseBlock';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText, type RichTextDocument, richTextHeadings} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SitePage} from '@/components/SitePage';
import {blogConfig, blogPath, categoryPath, postPath} from '@/lib/blog';
import {loadPost, loadRelated, postCard, postHeader} from '@/lib/posts';
import {toSections} from '@/lib/sections';
import {getLocale, getSite, pageSilo, sectionsContext, toFooter, toHeader} from '@/lib/site';

export const dynamic = 'force-dynamic';

/** A post, at /<blog page>/<post> (Site settings › Blog). Any other first segment: 404. */
async function load(slug: string, postSlug: string) {
  const locale = await getLocale();
  const site = await getSite(locale);
  const blog = blogConfig(site.settings);
  if (!blog.base || blog.base !== slug) return null;
  const post = await loadPost(locale, postSlug);
  return post ? {locale, site, blog, post} : null;
}

export async function generateMetadata({params}: {params: Promise<{slug: string; post: string}>}) {
  const {slug, post: postSlug} = await params;
  const data = await load(slug, postSlug);
  if (!data) return {title: 'Vidomia'};
  const {post} = data;
  return {title: post.meta?.title || `${post.title.replace(/<\/?span>/g, '')} · Vidomia`, description: post.meta?.description || post.excerpt || undefined};
}

export default async function Page({params}: {params: Promise<{slug: string; post: string}>}) {
  const {slug, post: postSlug} = await params;
  const data = await load(slug, postSlug);
  if (!data) notFound();
  const {locale, site, blog, post} = data;
  const s = site.settings;
  const content = post.content as unknown as RichTextDocument | null;
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const [related, sections] = await Promise.all([loadRelated(locale, post), toSections(post.sections, s, sectionsContext(locale, s))]);
  const plainTitle = post.title.replace(/<\/?span>/g, '');
  return (
    <SitePage silo={pageSilo(null, s)} header={toHeader(s, site.header, site.languages)} footer={toFooter(s, site.footer, site.posts, locale)} tone="light" currentHref={blogPath(blog)}>
      <Section background="paper" spacing="none" underHeader>
        {s.breadcrumb?.enabled !== false ? (
          <BreadcrumbBand
            items={[{label: blog.title.replace(/<\/?span>/g, ''), href: blogPath(blog)}, ...(category ? [{label: category.title, href: categoryPath(blog, category.slug)}] : [])]}
            current={plainTitle}
            homeLabel={s.breadcrumb?.homeLabel ?? 'Accueil'}
            homeStyle={(s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'}
          />
        ) : null}
      </Section>
      <PostHeader {...postHeader(post, blog, locale)} />
      <PostLayout sidebar={<PostToc items={richTextHeadings(content)} label={blog.labels.toc} />}>
        <RichText
          content={content}
          size="prose"
          renderBlock={renderProseBlock}
          resolveLink={({relationTo, value}) => (relationTo === 'posts' && value && typeof value === 'object' && 'slug' in value ? postPath(blog, String((value as {slug: string}).slug)) : undefined)}
        />
      </PostLayout>
      {sections.length ? <PageSections sections={sections} /> : null}
      <RelatedPosts eyebrow={blog.labels.relatedEyebrow} title={blog.labels.relatedTitle} items={related.map((p) => postCard(p, blog, locale))} more={{label: blog.labels.more, href: blogPath(blog)}} />
    </SitePage>
  );
}

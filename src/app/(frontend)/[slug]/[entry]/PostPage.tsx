/**
 * PostPage — a blog post (mockup 18): breadcrumb, header with author and cover, table of contents
 * and prose with its figures, then the optional FAQ and the related posts (the post's « under the
 * post » tab, title and count in the blog settings).
 */
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {EntryFaq} from '@/components/EntryFaq';
import {PageModals} from '@/components/PageModals';
import {PostHeader} from '@/components/PostHeader';
import {PostLayout} from '@/components/PostLayout';
import {PostToc} from '@/components/PostToc';
import {renderProseBlock} from '@/components/ProseBlock';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText, type RichTextDocument, richTextHeadings} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SitePage} from '@/components/SitePage';
import {postCard} from '@/lib/cards';
import {entryFaq} from '@/lib/entries';
import {stampInternalLinks} from '@/lib/links';
import {categoryPath, listingPath, plainTitle} from '@/lib/listings';
import {loadRelated, postHeader} from '@/lib/posts';
import {getSite, pageSilo, resolveEntryLink, toFooter, toHeader} from '@/lib/site';
import type {Locale} from '@/locales';
import type {Post} from '@/payload-types';

export async function PostPage({locale, site, post}: {locale: Locale; site: Awaited<ReturnType<typeof getSite>>; post: Post}) {
  const {blog, settings: s} = site;
  // buttons of the prose figures targeting a content of the site: their address
  stampInternalLinks(post.content, site);
  const content = post.content as unknown as RichTextDocument | null;
  const category = typeof post.category === 'object' && post.category ? post.category : null;
  const related = await loadRelated(locale, post, blog.relatedCount);
  const faq = entryFaq(post);
  return (
    <SitePage silo={pageSilo(null, s)} header={toHeader(s, site.header, site.languages, blog)} footer={toFooter(s, site.footer, site.posts, locale, blog)} tone="light" currentHref={listingPath(blog)}>
      <Section background="paper" spacing="none" underHeader>
        {s.breadcrumb?.enabled !== false ? (
          <BreadcrumbBand
            items={[{label: plainTitle(blog.title), href: listingPath(blog)}, ...(category ? [{label: category.title, href: categoryPath(blog, category.slug)}] : [])]}
            current={plainTitle(post.title)}
            homeLabel={s.breadcrumb?.homeLabel ?? 'Accueil'}
            homeStyle={(s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'}
          />
        ) : null}
      </Section>
      <PostHeader {...postHeader(post, blog, locale)} />
      <PostLayout sidebar={<PostToc items={richTextHeadings(content)} label={blog.labels.toc} />}>
        <RichText content={content} size="prose" renderBlock={renderProseBlock} resolveLink={(link) => resolveEntryLink(site, link)} />
      </PostLayout>
      <EntryFaq {...blog.faq} items={faq} />
      <RelatedPosts {...blog.related} items={related.map((p) => postCard(p, blog, locale))} more={{label: blog.labels.more, href: listingPath(blog)}} />
      <PageModals sources={[post.content, post.faq]} locale={locale} />
    </SitePage>
  );
}

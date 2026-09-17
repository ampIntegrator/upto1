'use client';

/* Demo post and blog page (mockups 18 and 19) with static data: the whole template before Payload. */
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Hero} from '@/components/Hero';
import {PostArchive} from '@/components/PostArchive';
import {PostHeader} from '@/components/PostHeader';
import {PostLayout} from '@/components/PostLayout';
import {PostToc} from '@/components/PostToc';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText, richTextHeadings} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SiteFooter} from '@/components/SiteFooter';
import {SiteHeader} from '@/components/SiteHeader';
import {ARTICLE_CARDS, AUTHOR, COVER, POST_DOC, renderDemoBlock} from '../design/_showcases/post.shared';
import {SITE_FOOTER, SITE_HEADER} from '../design/_ui/siteNav';

export function PostDemo() {
  return (
    <>
      <SiteHeader {...SITE_HEADER} />
      <Section background="paper" spacing="none" underHeader>
        <BreadcrumbBand items={[{label: 'Blog', href: '/mise-en-page/blog'}, {label: 'Chiffrage', href: '#'}]} current="Du devis à la facturation" />
      </Section>
      <PostHeader
        category={{label: 'Chiffrage', href: '#'}}
        title={'Du devis à la facturation :\n<span>industrialiser</span> le cycle commercial'}
        lead="Entre l’estimation envoyée et le paiement encaissé, le temps se perd en ressaisies, en relances et en allers-retours. Méthode en trois leviers, chiffres à l’appui."
        author={AUTHOR}
        date={{label: '2 juin 2026', iso: '2026-06-02'}}
        cover={{src: COVER, alt: ''}}
        coverCaption="Un cycle commercial piloté de bout en bout."
      />
      <PostLayout sidebar={<PostToc items={richTextHeadings(POST_DOC)} />}>
        <RichText content={POST_DOC} size="prose" renderBlock={renderDemoBlock} />
      </PostLayout>
      <RelatedPosts items={ARTICLE_CARDS.slice(1, 4)} more={{label: 'Voir le blog', href: '/mise-en-page/blog'}} />
      <SiteFooter {...SITE_FOOTER} strip={SITE_HEADER.strip} />
    </>
  );
}

export function BlogDemo({page = 0}: {page?: number}) {
  const perPage = 4;
  const pages = Math.ceil(ARTICLE_CARDS.length / perPage);
  const current = Math.min(page, pages - 1);
  return (
    <>
      <SiteHeader {...SITE_HEADER} />
      <Hero variant="page" compact background="glow" eyebrow="Le blog" title={'Actualités et <span>méthodes.</span>'} lead="Chiffrage, chantier, métier : ce que nous apprenons avec nos clients, sans jargon." />
      <PostArchive
        categories={[{label: 'Tous', href: '/mise-en-page/blog', active: true}, ...['Chiffrage', 'Chantier', 'Métier', 'Produit'].map((c) => ({label: c, href: '#'}))]}
        items={ARTICLE_CARDS.slice(current * perPage, current * perPage + perPage)}
        page={current}
        pages={pages}
        hrefFor={(p) => (p === 0 ? '/mise-en-page/blog' : `/mise-en-page/blog?page=${p + 1}`)}
      />
      <SiteFooter {...SITE_FOOTER} strip={SITE_HEADER.strip} />
    </>
  );
}

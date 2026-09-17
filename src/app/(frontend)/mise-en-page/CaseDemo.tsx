'use client';

/* Demo case study and case studies page (mockups 23 and 24) with static data: the whole template before Payload. */
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {CaseHero} from '@/components/CaseHero';
import {CaseSheet} from '@/components/CaseSheet';
import {Hero} from '@/components/Hero';
import {PostArchive} from '@/components/PostArchive';
import {PostLayout} from '@/components/PostLayout';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SiteFooter} from '@/components/SiteFooter';
import {SiteHeader} from '@/components/SiteHeader';
import {CASE_CARDS, CASE_CATEGORIES, CASE_DOC, CASE_HERO, CASE_SHEET} from '../design/_showcases/cases.shared';
import {renderDemoBlock} from '../design/_showcases/post.shared';
import {SITE_FOOTER, SITE_HEADER} from '../design/_ui/siteNav';

export function CaseDemo() {
  return (
    <>
      <SiteHeader {...SITE_HEADER} />
      <Section background="paper" spacing="none" underHeader>
        <BreadcrumbBand items={[{label: 'Réalisations', href: '/mise-en-page/realisations'}, {label: 'Rénovation', href: '#'}]} current="Vasseur Construction" />
      </Section>
      <CaseHero {...CASE_HERO} />
      <PostLayout sidebar={<CaseSheet {...CASE_SHEET} />}>
        <RichText content={CASE_DOC} size="prose" renderBlock={renderDemoBlock} />
      </PostLayout>
      <RelatedPosts eyebrow="Nos réalisations" title="D’autres chantiers <span>chiffrés juste.</span>" items={CASE_CARDS.slice(1, 4)} more={{label: 'Voir toutes les réalisations', href: '/mise-en-page/realisations'}} />
      <SiteFooter {...SITE_FOOTER} strip={SITE_HEADER.strip} />
    </>
  );
}

export function CasesDemo({page = 0}: {page?: number}) {
  const perPage = 4;
  const pages = Math.ceil(CASE_CARDS.length / perPage);
  const current = Math.min(page, pages - 1);
  return (
    <>
      <SiteHeader {...SITE_HEADER} />
      <Hero variant="page" background="night-halo" eyebrow="Nos réalisations" title={'Des chantiers <span>chiffrés juste.</span>'} lead="Rénovation, gros œuvre, couverture : comment nos clients chiffrent plus vite et signent plus." />
      <PostArchive
        navLabel="Catégories de réalisations"
        categories={[{label: 'Toutes', href: '/mise-en-page/realisations', active: true}, ...CASE_CATEGORIES.map((c) => ({label: c, href: '#'}))]}
        items={CASE_CARDS.slice(current * perPage, current * perPage + perPage)}
        page={current}
        pages={pages}
        hrefFor={(p) => (p === 0 ? '/mise-en-page/realisations' : `/mise-en-page/realisations?page=${p + 1}`)}
        empty="Aucune réalisation pour le moment."
      />
      <SiteFooter {...SITE_FOOTER} strip={SITE_HEADER.strip} />
    </>
  );
}

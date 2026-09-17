/**
 * CasePage — a case study (mockup 23): breadcrumb, full-bleed hero, fact sheet and story with its
 * figures, optional builder sections, related case studies.
 */
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {CaseHero} from '@/components/CaseHero';
import {CaseSheet} from '@/components/CaseSheet';
import {PageSections} from '@/components/PageSections';
import {PostLayout} from '@/components/PostLayout';
import {renderProseBlock} from '@/components/ProseBlock';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText, type RichTextDocument} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SitePage} from '@/components/SitePage';
import {caseCard} from '@/lib/cards';
import {caseHero, caseSheet, loadRelatedCases} from '@/lib/cases';
import {categoryPath, listingPath, plainTitle} from '@/lib/listings';
import {toSections} from '@/lib/sections';
import {getSite, pageSilo, resolveEntryLink, sectionsContext, toFooter, toHeader} from '@/lib/site';
import type {Locale} from '@/locales';
import type {CaseStudy} from '@/payload-types';

export async function CasePage({locale, site, caseStudy}: {locale: Locale; site: Awaited<ReturnType<typeof getSite>>; caseStudy: CaseStudy}) {
  const {cases, settings: s} = site;
  const content = caseStudy.content as unknown as RichTextDocument | null;
  const category = typeof caseStudy.category === 'object' && caseStudy.category ? caseStudy.category : null;
  const [related, sections] = await Promise.all([loadRelatedCases(locale, caseStudy), toSections(caseStudy.sections, s, sectionsContext(locale, site))]);
  return (
    <SitePage silo={pageSilo(null, s)} header={toHeader(s, site.header, site.languages, site.blog)} footer={toFooter(s, site.footer, site.posts, locale, site.blog)} tone="light" currentHref={listingPath(cases)}>
      <Section background="paper" spacing="none" underHeader>
        {s.breadcrumb?.enabled !== false ? (
          <BreadcrumbBand
            items={[{label: plainTitle(cases.title), href: listingPath(cases)}, ...(category ? [{label: category.title, href: categoryPath(cases, category.slug)}] : [])]}
            current={caseStudy.sheet?.client || plainTitle(caseStudy.title)}
            homeLabel={s.breadcrumb?.homeLabel ?? 'Accueil'}
            homeStyle={(s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'}
          />
        ) : null}
      </Section>
      <CaseHero {...caseHero(caseStudy, cases)} />
      <PostLayout sidebar={<CaseSheet {...caseSheet(caseStudy, cases)} />}>
        <RichText content={content} size="prose" renderBlock={renderProseBlock} resolveLink={(link) => resolveEntryLink(site, link)} />
      </PostLayout>
      {sections.length ? <PageSections sections={sections} /> : null}
      <RelatedPosts eyebrow={cases.labels.relatedEyebrow} title={cases.labels.relatedTitle} items={related.map((c) => caseCard(c, cases))} more={{label: cases.labels.more, href: listingPath(cases)}} />
    </SitePage>
  );
}

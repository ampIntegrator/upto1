/**
 * CasePage — a case study (mockup 23): breadcrumb, full-bleed hero, fact sheet and story with its
 * figures, then the optional FAQ and the related case studies (the case study's « under the case
 * study » tab, title and count in the case studies settings).
 */
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {CaseHero} from '@/components/CaseHero';
import {CaseSheet} from '@/components/CaseSheet';
import {EntryFaq} from '@/components/EntryFaq';
import {PageModals} from '@/components/PageModals';
import {PostLayout} from '@/components/PostLayout';
import {renderProseBlock} from '@/components/ProseBlock';
import {RelatedPosts} from '@/components/RelatedPosts';
import {RichText, type RichTextDocument} from '@/components/RichText';
import {Section} from '@/components/Section';
import {SitePage} from '@/components/SitePage';
import {caseCard} from '@/lib/cards';
import {caseHero, caseSheet, loadRelatedCases} from '@/lib/cases';
import {entryFaq} from '@/lib/entries';
import {stampInternalLinks} from '@/lib/links';
import {categoryPath, listingPath, plainTitle} from '@/lib/listings';
import {getSite, pageSilo, resolveEntryLink, toFooter, toHeader} from '@/lib/site';
import type {Locale} from '@/locales';
import type {CaseStudy} from '@/payload-types';

export async function CasePage({locale, site, caseStudy}: {locale: Locale; site: Awaited<ReturnType<typeof getSite>>; caseStudy: CaseStudy}) {
  const {cases, settings: s} = site;
  // buttons of the prose figures and the case's CTA targeting a content of the site: their address
  stampInternalLinks([caseStudy.content, caseStudy.sheet], site);
  const content = caseStudy.content as unknown as RichTextDocument | null;
  const category = typeof caseStudy.category === 'object' && caseStudy.category ? caseStudy.category : null;
  const related = await loadRelatedCases(locale, caseStudy, cases.relatedCount);
  const faq = entryFaq(caseStudy);
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
      <EntryFaq {...cases.faq} items={faq} />
      <RelatedPosts {...cases.related} items={related.map((c) => caseCard(c, cases))} more={{label: cases.labels.more, href: listingPath(cases)}} />
      <PageModals sources={[caseStudy.content, caseStudy.faq, caseStudy.sheet, ...site.modalSources]} locale={locale} />
    </SitePage>
  );
}

/**
 * Case studies data: loaders through the shared entry loaders, a case study as CaseHero and
 * CaseSheet props (labels from the settings, overridden by the case study). Server only.
 */
import type {CaseHeroProps} from '@/components/CaseHero';
import type {CaseSheetProps} from '@/components/CaseSheet';
import {mediaImage} from '@/lib/cards';
import {loadCategoryBySlug, loadCategoryList, loadEntryBySlug, loadEntryPage, loadRelatedEntries} from '@/lib/entries';
import type {CasesConfig} from '@/lib/listings';
import type {Locale} from '@/locales';
import type {CaseStudy} from '@/payload-types';

export const loadCasePage = (locale: Locale, cases: CasesConfig, page: number, category?: number) => loadEntryPage('case-studies', locale, cases.perPage, page, category);
export const loadCaseCategories = (locale: Locale) => loadCategoryList('case-categories', locale);
export const loadCaseCategory = (locale: Locale, slug: string) => loadCategoryBySlug('case-categories', locale, slug);
export const loadCase = (locale: Locale, slug: string) => loadEntryBySlug('case-studies', locale, slug);
export const loadRelatedCases = (locale: Locale, c: CaseStudy, count = 3) => loadRelatedEntries('case-studies', locale, c, count);

const categoryOf = (c: CaseStudy) => (typeof c.category === 'object' && c.category ? c.category : null);

export function caseHero(c: CaseStudy, cases: CasesConfig): CaseHeroProps {
  const cover = mediaImage(c.cover);
  const category = categoryOf(c);
  return {
    cover: cover ? {src: cover.src, alt: cover.alt} : undefined,
    coverCaption: c.coverCaption || undefined,
    coverCaptionTone: c.coverCaptionTone === 'dark' ? 'dark' : 'light',
    chips: [{label: cases.labels.badge, tone: 'cat'}, ...(category ? [{label: category.title, tone: 'high' as const}] : [])],
    title: c.title,
    lead: c.excerpt || undefined,
  };
}

export function caseSheet(c: CaseStudy, cases: CasesConfig): CaseSheetProps {
  const s = c.sheet;
  const l = cases.labels;
  const category = categoryOf(c);
  // the case study's own labels and button count only when « change the default values » is ticked
  const own = s?.customDefaults ? s : null;
  const ctaLabel = own?.cta?.label;
  const ctaHref = own?.cta?.href;
  return {
    rows: [
      {label: l.client, value: s?.client ?? '', href: s?.clientUrl || undefined, hrefLabel: s?.client ? `${l.clientLink} · ${s.client}` : undefined},
      {label: l.category, value: category?.title ?? ''},
      {label: own?.locationLabel || l.location, value: s?.location ?? ''},
      {label: own?.deploymentLabel || l.deployment, value: s?.deployment ?? ''},
      {label: own?.modulesLabel || l.modules, value: s?.modules ?? ''},
    ],
    results: (s?.results ?? []).slice(0, 2).map((r) => ({value: r.value, label: r.label})),
    cta: ctaLabel && ctaHref ? {label: ctaLabel, href: ctaHref} : cases.cta,
  };
}

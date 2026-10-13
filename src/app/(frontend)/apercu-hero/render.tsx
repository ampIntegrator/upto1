/**
 * The page top kept for a preview frame, rendered as on the site: the hero's values (as the admin
 * sent them, as the one block of a one-column section: the frame's in-place editing is the one of
 * the sections) are populated by Payload's read operation on the given data, then converted by
 * toHero and drawn by the Hero component, in the page's silo. No header: the hero does not
 * reserve its height.
 */
import config from '@payload-config';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {VStack} from '@astryxdesign/core/Stack';
import {getPayload} from 'payload';
import React from 'react';

import {Hero, type HeroProps} from '@/components/Hero';
import {type Text as AdminText, tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';
import {stampInternalLinks} from '@/lib/links';
import {getSite, pageSilo, toHero} from '@/lib/site';
import {LOCALES, type Locale} from '@/locales';
import type {Page} from '@/payload-types';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import {PLACEHOLDER_IMAGE} from '../apercu-section/render';
import type {StoredPreview} from '../apercu-section/store';

type Loaded = {hero: HeroProps; silo: ReturnType<typeof pageSilo>} | 'empty' | 'error';

/** the hero values: the one block of the first column of the first row (see HeroManager) */
const heroOf = (section: Record<string, unknown>): Record<string, unknown> | undefined => {
  const rows = section.rows as {columns?: {contents?: Record<string, unknown>[]}[]}[] | undefined;
  return rows?.[0]?.columns?.[0]?.contents?.[0];
};

async function load(input: StoredPreview): Promise<Loaded> {
  const payload = await getPayload({config});
  try {
    const values = heroOf(input.section);
    if (!values) return 'empty';
    const {blockType: _blockType, ...hero} = values;
    const locale: Locale = (LOCALES as readonly string[]).includes(input.locale ?? '') ? (input.locale as Locale) : 'fr';
    // the read operation needs an existing page to address; its stored hero is not used
    const known = input.collection === 'pages' && input.id ? input.id : undefined;
    const id = known ?? (await payload.find({collection: 'pages', limit: 1, depth: 0, select: {}})).docs[0]?.id;
    if (!id) return 'empty';
    // (`flattenLocales: false`: the form's values are already in one language)
    const [page, site] = await Promise.all([payload.findByID({collection: 'pages', id, data: {hero: hero as Page['hero']}, depth: 2, locale, flattenLocales: false}), getSite(locale)]);
    stampInternalLinks(page.hero, site);
    const props = toHero(page, site.settings);
    // what is not chosen yet shows a placeholder picture; the breadcrumb of another page is not shown
    const withImage = props.variant === 'split' ? {...props, media: props.media ?? {src: PLACEHOLDER_IMAGE, badges: []}} : props.background === 'image' && !props.image?.src ? {...props, image: {src: PLACEHOLDER_IMAGE}} : props.background === 'video' && !props.video?.src ? {...props, background: 'image' as const, image: {src: PLACEHOLDER_IMAGE}} : props;
    return {hero: {...withImage, underHeader: false, breadcrumb: known ? withImage.breadcrumb : undefined}, silo: pageSilo({silo: input.document?.silo} as Page, site.settings)};
  } catch (e) {
    payload.logger.error({err: e, msg: 'Hero preview failed'});
    return 'error';
  }
}

export async function PreviewHero({input}: {input: StoredPreview}) {
  const loaded = await load(input);
  if (loaded === 'empty') return <EmptyState title={tr(T.preview.emptyTitle, input.language)} description={tr(T.preview.emptyDescription, input.language)} />;
  if (loaded === 'error') return <EmptyState title={tr(T.preview.errorTitle, input.language)} description={tr(T.preview.errorDescription, input.language)} />;
  return (
    <OrbitaThemeProvider fixedSilo={loaded.silo}>
      {/* the frame's in-place editing looks for a « column »: the whole page top is the one */}
      <VStack data-preview-column="0-0">
        <Hero {...loaded.hero} />
      </VStack>
    </OrbitaThemeProvider>
  );
}

export type {AdminText};

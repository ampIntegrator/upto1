/**
 * The section kept for a preview frame, rendered as on the site:
 *   1. relations (media, chosen posts and case studies, forms) are populated by Payload's read
 *      operation on the given data (`findByID` with `data`: the stored page is not read back);
 *   2. the usual conversion (toSections) and rendering (PageSections), in the page's silo; a
 *      section without content shows a dashed zone where its columns will be.
 */
import config from '@payload-config';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {getPayload} from 'payload';
import React from 'react';

import {PageSections} from '@/components/PageSections';
import {type SectionData, toSections} from '@/lib/sections';
import {getSite, pageSilo, sectionsContext} from '@/lib/site';
import {LOCALES, type Locale} from '@/locales';
import type {Page} from '@/payload-types';
import type {SiloName} from '@/theme/index';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import type {StoredPreview} from './store';

/** where the columns will be: a dashed zone, in a section that has no content yet */
const slot = (
  <VStack align="center" justify="center" padding={4} minHeight="calc(var(--spacing-12) * 3)" style={{border: 'var(--border-width) dashed var(--color-border-emphasized)', borderRadius: 'var(--radius-element)'}}>
    <Text color="secondary" justify="center">
      Colonnes
    </Text>
  </VStack>
);

type Loaded = {sections: SectionData[]; silo: SiloName} | 'empty' | 'error';

async function load(input: StoredPreview): Promise<Loaded> {
  const payload = await getPayload({config});
  try {
    const locale: Locale = (LOCALES as readonly string[]).includes(input.locale ?? '') ? (input.locale as Locale) : 'fr';
    // the read operation needs an existing page to address; its stored content is not used
    const id = input.collection === 'pages' && input.id ? input.id : (await payload.find({collection: 'pages', limit: 1, depth: 0, select: {}})).docs[0]?.id;
    if (!id) return 'empty';
    const section = {...input.section, blockType: 'section'} as NonNullable<Page['sections']>[number];
    const [page, site] = await Promise.all([payload.findByID({collection: 'pages', id, data: {sections: [section]}, depth: 2, locale}), getSite(locale)]);
    const sections = await toSections(page.sections, site.settings, sectionsContext(locale, site));
    return sections.length ? {sections, silo: pageSilo({silo: input.document?.silo} as Page, site.settings)} : 'empty';
  } catch (e) {
    payload.logger.error({err: e, msg: 'Section preview failed'});
    return 'error';
  }
}

export async function PreviewSection({input}: {input: StoredPreview}) {
  const loaded = await load(input);
  if (loaded === 'empty') return <EmptyState title="Rien à afficher pour l’instant" description="Choisis un fond pour la section." />;
  if (loaded === 'error') return <EmptyState title="L’aperçu n’a pas pu s’afficher" description="Continue la saisie : l’aperçu réessaie à la prochaine modification." />;
  return (
    <OrbitaThemeProvider fixedSilo={loaded.silo}>
      <PageSections sections={loaded.sections} slot={slot} />
    </OrbitaThemeProvider>
  );
}

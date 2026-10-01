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

/** where the columns will be: a dashed zone with a light translucent background, in a section that has no content yet */
const slot = (
  <VStack align="center" justify="center" padding={4} minHeight="calc(var(--spacing-12) * 3)" style={{border: 'var(--border-width) dashed var(--color-border-emphasized)', borderRadius: 'var(--radius-element)', background: 'var(--color-background-muted)'}}>
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
    type Block = NonNullable<Page['sections']>[number];
    const section = {...input.section, blockType: 'section'} as Block;
    // the section above goes through the conversion too (the edge line depends on it), but is not shown
    const above = input.above ? [{blockType: 'section', ...input.above} as Block] : [];
    const [page, site] = await Promise.all([payload.findByID({collection: 'pages', id, data: {sections: [...above, section]}, depth: 2, locale}), getSite(locale)]);
    const sections = (await toSections(page.sections, site.settings, sectionsContext(locale, site))).slice(-1);
    // « always » on the first section of a page: the page draws no line there (the page top has its own
    // edge at that junction); the preview shows it, so the setting can be seen whatever the section's place
    if (!input.above && sections[0] && section.blockType === 'section' && section.mode === 'light' && (section as {edgeTop?: string | null}).edgeTop === 'always') sections[0] = {...sections[0], edgeTop: true};
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

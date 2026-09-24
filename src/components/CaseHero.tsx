/**
 * CaseHero — the top of a case study (mockup 23 .case-hero): the cover full-bleed on night, a
 * night veil darkening towards the bottom, and the text aligned to the bottom in the site
 * container: chips (« Étude de cas », category), the h1 with its serif accent (highlight, on
 * dark), the lead. Night section: chips, title and text take their on-dark colours.
 * Placed under the page's breadcrumb band.
 */
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import Image from 'next/image';
import React from 'react';

import {Chip, type ChipTone} from './Chip';
import {Container} from './Container';
import {Section} from './Section';
import {renderTitle, type TitleText} from './TitleText';
import {CoverCaption, type CoverCaptionTone} from './CoverCaption';
import styles from './CaseHero.module.css';

export type CaseHeroProps = {
  cover?: {src: string; alt?: string};
  /** caption over the cover, bottom right (CoverCaption), white or black text */
  coverCaption?: string;
  coverCaptionTone?: CoverCaptionTone;
  chips?: {label: string; tone?: ChipTone}[];
  /** entered title: <span>…</span> = serif accent, line breaks kept (TitleText) */
  title: TitleText;
  lead?: string;
};

export function CaseHero({cover, coverCaption, coverCaptionTone, chips = [], title, lead}: CaseHeroProps) {
  return (
    <Section background="night" spacing="none">
      <VStack className={styles.hero}>
        {cover?.src ? <Image src={cover.src} alt={cover.alt ?? ''} fill priority sizes="100vw" className={styles.image} /> : null}
        <i className={styles.veil} aria-hidden="true" />
        {cover?.src && coverCaption ? (
          <CoverCaption as="span" tone={coverCaptionTone}>
            {coverCaption}
          </CoverCaption>
        ) : null}
        <VStack className={styles.inner}>
          <Container>
            <VStack gap={5} className={styles.text}>
              {chips.length ? (
                <HStack gap={2} wrap="wrap">
                  {chips.map((c) => (
                    <Chip key={c.label} label={c.label} tone={c.tone ?? 'high'} />
                  ))}
                </HStack>
              ) : null}
              <Heading level={1} type="display-2" className={styles.title}>
                {renderTitle(title)}
              </Heading>
              {lead ? <Text className={styles.lead}>{lead}</Text> : null}
            </VStack>
          </Container>
        </VStack>
      </VStack>
    </Section>
  );
}

'use client';

/**
 * CompareCard — the compare card (mockup 05-compareCards): chip and marker on the
 * right, quote, CheckList with dividers (checks or crosses). `featured`: 2 px silo
 * frame and tinted shadow, marker in editorial gold. Two cards (before / after) or three
 * (trades) in a page Grid; night via the Section. A standalone component rather
 * than a Card preset: its anatomy (quote + list, no title or media) has
 * nothing in common with editorial cards, and its props stay readable.
 */
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CheckList, type CheckListItem, type CheckTone} from './CheckList';
import {Chip, type ChipTone} from './Chip';
import styles from './CompareCard.module.css';

export type CompareCardProps = {
  chip: {label: string; tone?: ChipTone};
  /** marker to the right of the chip (« 3 semaines d'attente », « Closing +34 % ») */
  meta?: string;
  quote: string;
  items: CheckListItem[];
  /** dot tone: silo check (default) or danger cross */
  tone?: CheckTone;
  featured?: boolean;
};

export function CompareCard({chip, meta, quote, items, tone = 'check', featured}: CompareCardProps) {
  return (
    <VStack as="article" className={styles.card} data-featured={featured || undefined}>
      <HStack justify="between" vAlign="center" gap={2} className={styles.head}>
        <Chip label={chip.label} tone={chip.tone ?? 'accent'} />
        {meta ? <Text type="tag" className={styles.meta}>{meta}</Text> : null}
      </HStack>
      <VStack className={styles.quote}>
        <Blockquote>{quote}</Blockquote>
      </VStack>
      <CheckList items={items} tone={tone} density="divided" />
    </VStack>
  );
}

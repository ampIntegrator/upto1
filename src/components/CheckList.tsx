'use client';

/**
 * CheckList — round-bullet list (mockups 03 process, 05 compareCards, 08 priceList):
 * 18 px dot, white check on silo (`tone="check"`) or white cross on danger
 * (`tone="cross"`). Three densities:
 *   compact  : no divider, top-aligned, 14 px (steps)
 *   divided  : rows with divider above, 15 px, centered dot (compare cards)
 *   dense    : tight rows with divider below, 14 px (pricing); `trailingDivider={false}`
 *              removes the divider of the last item (pricing tier card)
 * Each item accepts an end-of-line value `end` (« 97 € », Geist Mono 12 px struck through),
 * which is enough for pricing without a second component. HTML list (ul / li) via Astryx stacks.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {CheckIcon, CloseIcon} from '@/theme/icons/nucleo';
import styles from './CheckList.module.css';

export type CheckTone = 'check' | 'cross';
export type CheckListDensity = 'compact' | 'divided' | 'dense';
export type CheckListItem = string | {label: string; tone?: CheckTone; /** end-of-line value, struck through (pricing) */ end?: string};

export type CheckListProps = {
  items: CheckListItem[];
  tone?: CheckTone;
  density?: CheckListDensity;
  /** dense: divider below the last item (default: yes) */
  trailingDivider?: boolean;
  className?: string;
};

export function CheckList({items, tone = 'check', density = 'compact', trailingDivider = true, className}: CheckListProps) {
  const compact = density === 'compact';
  return (
    <VStack as="ul" gap={compact ? 3 : 0} className={[styles.list, className].filter(Boolean).join(' ')} data-density={density} data-trailing={trailingDivider || undefined}>
      {items.map((it, i) => {
        const item = typeof it === 'string' ? {label: it} : it;
        const t = item.tone ?? tone;
        return (
          <HStack as="li" key={i} gap={3} vAlign={compact ? 'start' : 'center'} justify="between" className={styles.item}>
            <HStack gap={3} vAlign={compact ? 'start' : 'center'} className={styles.main}>
              <i className={styles.dot} data-tone={t} aria-hidden="true">
                {t === 'cross' ? <CloseIcon width={12} height={12} /> : <CheckIcon width={12} height={12} />}
              </i>
              {item.label}
            </HStack>
            {item.end ? <s className={styles.end}>{item.end}</s> : null}
          </HStack>
        );
      })}
    </VStack>
  );
}

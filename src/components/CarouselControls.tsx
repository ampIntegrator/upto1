'use client';

/**
 * CarouselControls — the controls under a carousel (mockup 07): page indicator on
 * the left, square arrows on the right. Three indicator styles: `segments` (bars, the
 * current one lengthens in silo colour), `dots`, `numbers` (« 2 / 5 »). Below 640 px the
 * arrows disappear (you swipe), the indicator stays. Shared by TestimonialCarousel and
 * Collection. Light or night via the Section.
 */
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@/theme/icons/nucleo';
import styles from './CarouselControls.module.css';

export type CarouselIndicator = 'segments' | 'dots' | 'numbers' | 'none';

export type CarouselControlsProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  indicator?: CarouselIndicator;
  arrows?: boolean;
  /** accessible labels */
  labels?: {pages?: string; page?: (n: number) => string; prev?: string; next?: string};
};

export function CarouselControls({page, pages, onChange, indicator = 'segments', arrows = true, labels}: CarouselControlsProps) {
  if (pages <= 1) return null;
  const l = {pages: 'Pages', page: (n: number) => `Page ${n}`, prev: 'Précédent', next: 'Suivant', ...labels};
  const go = (p: number) => onChange(Math.max(0, Math.min(p, pages - 1)));
  return (
    <HStack justify="between" vAlign="center" gap={3} className={styles.ui} data-arrows={arrows || undefined}>
      {indicator === 'numbers' ? (
        <Text type="tag" className={styles.numbers} aria-live="polite">
          {page + 1} / {pages}
        </Text>
      ) : indicator === 'none' ? (
        <span />
      ) : (
        <HStack gap={1.5} role="tablist" aria-label={l.pages}>
          {Array.from({length: pages}, (_, p) => (
            <button key={p} type="button" role="tab" aria-selected={p === page} aria-label={l.page(p + 1)} className={indicator === 'dots' ? styles.dot : styles.seg} onClick={() => go(p)} />
          ))}
        </HStack>
      )}
      {arrows ? (
        <HStack gap={1.5} className={styles.arrows}>
          <IconButton label={l.prev} icon={<ArrowLeftIcon />} variant="ghost" isDisabled={page <= 0} onClick={() => go(page - 1)} className={styles.arrow} />
          <IconButton label={l.next} icon={<ArrowRightIcon />} variant="ghost" isDisabled={page >= pages - 1} onClick={() => go(page + 1)} className={styles.arrow} />
        </HStack>
      ) : (
        <span />
      )}
    </HStack>
  );
}

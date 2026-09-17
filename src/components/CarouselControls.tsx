'use client';

/**
 * CarouselControls — the controls under a carousel (mockup 07): page indicator on
 * the left, square arrows on the right. Three indicator styles: `segments` (bars, the
 * current one lengthens in silo colour), `dots`, `numbers` (« 2 / 5 »). Below 640 px the
 * arrows disappear (you swipe), the indicator stays. Shared by TestimonialCarousel and
 * Collection. Light or night via the Section.
 *
 * Link mode (`hrefFor`, the blog archive): the indicator and the arrows are links to pages
 * (crawlable, no JavaScript needed); beyond ten pages the segments give way to numbers.
 */
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import NextLink from 'next/link';
import React from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@/theme/icons/nucleo';
import styles from './CarouselControls.module.css';

export type CarouselIndicator = 'segments' | 'dots' | 'numbers' | 'none';

export type CarouselControlsProps = {
  /** current page, from 0 */
  page: number;
  pages: number;
  onChange?: (page: number) => void;
  /** link mode: the URL of a page (from 0); the controls become links */
  hrefFor?: (page: number) => string;
  indicator?: CarouselIndicator;
  arrows?: boolean;
  /** accessible labels */
  labels?: {pages?: string; page?: (n: number) => string; prev?: string; next?: string};
};

export function CarouselControls({page, pages, onChange, hrefFor, indicator = 'segments', arrows = true, labels}: CarouselControlsProps) {
  if (pages <= 1) return null;
  if (hrefFor) return <LinkControls page={page} pages={pages} hrefFor={hrefFor} indicator={indicator} arrows={arrows} labels={labels} />;
  const l = {pages: 'Pages', page: (n: number) => `Page ${n}`, prev: 'Précédent', next: 'Suivant', ...labels};
  const go = (p: number) => onChange?.(Math.max(0, Math.min(p, pages - 1)));
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

/** The same controls as links (archive pagination): segments up to ten pages, numbers beyond. */
function LinkControls({page, pages, hrefFor, indicator, arrows, labels}: Required<Pick<CarouselControlsProps, 'page' | 'pages' | 'hrefFor'>> & Pick<CarouselControlsProps, 'indicator' | 'arrows' | 'labels'>) {
  const l = {pages: 'Pages', page: (n: number) => `Page ${n}`, prev: 'Page précédente', next: 'Page suivante', ...labels};
  const shown = pages > 10 || indicator === 'numbers' ? 'numbers' : indicator === 'dots' ? 'dots' : 'segments';
  const arrow = (target: number, label: string, glyph: React.ReactNode) =>
    target < 0 || target >= pages ? (
      <span className={styles.arrow} aria-disabled="true" role="link" aria-label={label}>
        {glyph}
      </span>
    ) : (
      <NextLink href={hrefFor(target)} className={styles.arrow} aria-label={label} rel={target < page ? 'prev' : 'next'}>
        {glyph}
      </NextLink>
    );
  return (
    <HStack as="nav" justify="between" vAlign="center" gap={3} className={styles.ui} aria-label={l.pages}>
      {shown === 'numbers' ? (
        <Text type="tag" className={styles.numbers}>
          {page + 1} / {pages}
        </Text>
      ) : (
        <HStack gap={1.5}>
          {Array.from({length: pages}, (_, p) => (
            <NextLink key={p} href={hrefFor(p)} aria-label={l.page(p + 1)} aria-current={p === page ? 'page' : undefined} className={`${shown === 'dots' ? styles.dot : styles.seg} ${styles.linkDot}`} />
          ))}
        </HStack>
      )}
      {arrows !== false ? (
        <HStack gap={1.5}>
          {arrow(page - 1, l.prev, <ArrowLeftIcon />)}
          {arrow(page + 1, l.next, <ArrowRightIcon />)}
        </HStack>
      ) : (
        <span />
      )}
    </HStack>
  );
}

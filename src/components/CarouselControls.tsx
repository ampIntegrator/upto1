'use client';

/**
 * CarouselControls — the controls under a carousel (mockup 07): page indicator on
 * the left, square arrows on the right. Three indicator styles: `segments` (bars, the
 * current one lengthens in silo colour), `dots`, `numbers` (« 2 / 5 »). Beyond ten pages the
 * segments and dots give way to numbers, whatever was chosen. Below 640 px the arrows
 * disappear (you swipe), the indicator stays. Shared by TestimonialCarousel and Collection.
 * Light or night via the Section.
 *
 * `more`: a simple silo button (« Voir tous les articles ») left of the arrows, shown even when
 * everything fits on one page; below 640 px it takes the arrows' place, and goes to its own
 * line when the row is too narrow.
 *
 * Link mode (`hrefs`, the blog archive): the indicator and the arrows are links to pages
 * (crawlable, no JavaScript needed); numbers beyond ten pages too.
 */
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import NextLink from 'next/link';
import React from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@/theme/icons/nucleo';
import {Button} from './Button';
import styles from './CarouselControls.module.css';

export type CarouselIndicator = 'segments' | 'dots' | 'numbers' | 'none';

/** beyond this many pages, segments and dots become « 3 / 12 » */
const MAX_MARKS = 10;

/** the indicator actually shown */
const shownIndicator = (indicator: CarouselIndicator, pages: number): CarouselIndicator => (indicator !== 'none' && pages > MAX_MARKS ? 'numbers' : indicator);

export type CarouselMore = {label: string; href: string};

export type CarouselControlsProps = {
  /** current page, from 0 */
  page: number;
  pages: number;
  onChange?: (page: number) => void;
  /** link mode: the URL of each page (index 0 = first page); the controls become links. An array,
   *  not a function, so a server component can pass it to this client component */
  hrefs?: string[];
  indicator?: CarouselIndicator;
  arrows?: boolean;
  /** accessible labels */
  labels?: {pages?: string; page?: (n: number) => string; prev?: string; next?: string};
  /** « see all » button left of the arrows (not in link mode) */
  more?: CarouselMore;
};

export function CarouselControls({page, pages, onChange, hrefs, indicator = 'segments', arrows = true, labels, more}: CarouselControlsProps) {
  if (hrefs) return pages <= 1 ? null : <LinkControls page={page} pages={pages} hrefs={hrefs} indicator={indicator} arrows={arrows} labels={labels} />;
  if (pages <= 1 && !more) return null;
  const l = {pages: 'Pages', page: (n: number) => `Page ${n}`, prev: 'Précédent', next: 'Suivant', ...labels};
  const go = (p: number) => onChange?.(Math.max(0, Math.min(p, pages - 1)));
  const shown = pages <= 1 ? 'none' : shownIndicator(indicator, pages);
  const withArrows = arrows && pages > 1;
  return (
    <HStack justify="between" vAlign="center" gap={3} wrap="wrap" className={styles.ui} data-arrows={withArrows || undefined}>
      {shown === 'numbers' ? (
        <Text type="tag" className={styles.numbers} aria-live="polite">
          {page + 1} / {pages}
        </Text>
      ) : shown === 'none' ? (
        <span />
      ) : (
        <HStack gap={1.5} role="tablist" aria-label={l.pages}>
          {Array.from({length: pages}, (_, p) => (
            <button key={p} type="button" role="tab" aria-selected={p === page} aria-label={l.page(p + 1)} className={shown === 'dots' ? styles.dot : styles.seg} onClick={() => go(p)} />
          ))}
        </HStack>
      )}
      {withArrows || more ? (
        <HStack gap={3} vAlign="center" className={styles.end}>
          {more ? <Button label={more.label} href={more.href} variant="primary" /> : null}
          {withArrows ? (
            <HStack gap={1.5} className={styles.arrows}>
              <IconButton label={l.prev} icon={<ArrowLeftIcon />} variant="ghost" isDisabled={page <= 0} onClick={() => go(page - 1)} className={styles.arrow} />
              <IconButton label={l.next} icon={<ArrowRightIcon />} variant="ghost" isDisabled={page >= pages - 1} onClick={() => go(page + 1)} className={styles.arrow} />
            </HStack>
          ) : null}
        </HStack>
      ) : (
        <span />
      )}
    </HStack>
  );
}

/** The same controls as links (archive pagination): segments up to ten pages, numbers beyond. */
function LinkControls({page, pages, hrefs, indicator, arrows, labels}: Required<Pick<CarouselControlsProps, 'page' | 'pages' | 'hrefs'>> & Pick<CarouselControlsProps, 'indicator' | 'arrows' | 'labels'>) {
  const hrefFor = (p: number) => hrefs[p] ?? hrefs[0] ?? '#';
  const l = {pages: 'Pages', page: (n: number) => `Page ${n}`, prev: 'Page précédente', next: 'Page suivante', ...labels};
  const shown = shownIndicator(!indicator || indicator === 'none' ? 'segments' : indicator, pages);
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

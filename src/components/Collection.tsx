'use client';

/**
 * Collection — a row of identical items (testimonials, cards, tiers…) in a page column of
 * 8 to 12, `perView` side by side (3 at most on 8 or 9 columns, 4 on 12: content-specs.ts,
 * collectionCapacity). Two layouts, both on the Astryx Carousel (native scrolling, snap, drag):
 *
 *   layout="swipe"     no controls: the items scroll, the next one peeks out on the right
 *                      edge (the swipe cue), dots below 640 px only;
 *   layout="carousel"  arrows and an indicator (segments, dots or numbers) below; arrows
 *                      hidden below 640 px, where you swipe. `step`: a page (the visible items)
 *                      or one item at a time.
 *
 * `more`: a « see all » button (the blog, the case studies, any link) in the controls, left of
 * the arrows; in the swipe layout it is shown at every width, alone on the right.
 *
 * Items per view follow the column width (container queries): `perView` from 800 px
 * (a column of 8 is about 880 px wide), 2 between 520 and 800 px, 1 with a peek below. Equal-height items. No auto-advance,
 * no loop (Astryx rules).
 */
import {Carousel, type CarouselHandle} from '@astryxdesign/core/Carousel';
import {VStack} from '@astryxdesign/core/Stack';
import React, {useEffect, useRef, useState} from 'react';

import {type CarouselIndicator, type CarouselMore, CarouselControls} from './CarouselControls';
import styles from './Collection.module.css';
import {useCarouselPages} from './useCarouselPages';

export type CollectionLayout = 'swipe' | 'carousel';

export type CollectionProps = {
  layout?: CollectionLayout;
  perView?: 2 | 3 | 4;
  step?: 'page' | 'item';
  arrows?: boolean;
  indicator?: CarouselIndicator;
  /** accessible label of the region */
  label?: string;
  /** « see all » button in the controls */
  more?: CarouselMore;
  children: React.ReactNode[];
};

/** items really side by side now: the column's width decides (same thresholds as the CSS) */
function perViewNow(el: HTMLElement | null, perView: number): number {
  const w = el?.getBoundingClientRect().width ?? 1440;
  if (w < 520) return 1;
  if (w < 800) return Math.min(2, perView);
  return perView;
}

export function Collection({layout = 'swipe', perView = 3, step = 'page', arrows = true, indicator = 'segments', label = 'Collection', more, children}: CollectionProps) {
  const handle = useRef<CarouselHandle>(null);
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<number>(perView);
  const items = React.Children.toArray(children);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const update = () => setVisible(perViewNow(el, perView));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [perView]);

  const {page, pages, go} = useCarouselPages(root, handle, items.length, visible, step);
  const swipe = layout === 'swipe';
  return (
    <VStack gap={6} className={styles.root} data-layout={layout} data-per-view={perView}>
      <Carousel ref={root} handleRef={handle} hasSnap hasButtons={false} hasEdgeFade={swipe} gap={0} aria-label={label}>
        {items.map((item, i) => (
          <VStack key={i} className={styles.slide} data-slide>
            {item}
          </VStack>
        ))}
      </Carousel>
      {swipe ? (
        <VStack className={styles.swipeControls} data-more={more ? '' : undefined}>
          <CarouselControls page={page} pages={pages} onChange={go} indicator="dots" arrows={false} more={more} />
        </VStack>
      ) : (
        <CarouselControls page={page} pages={pages} onChange={go} indicator={indicator} arrows={arrows} more={more} />
      )}
    </VStack>
  );
}

'use client';

/**
 * TestimonialCarousel — the testimonials carousel (mockup 07): Astryx Carousel
 * (native scrolling, snap, drag) without its buttons or edge fade; below it,
 * the mockup's controls (CarouselControls): page segments on the left, square arrows
 * on the right, hidden below 640 px where you swipe. 1, 2 or 3 cards per view depending
 * on width (640, 1280); the segments count pages, not cards. Light or night via the
 * Section (night-halo for mockup 07b).
 */
import {Carousel, type CarouselHandle} from '@astryxdesign/core/Carousel';
import {VStack} from '@astryxdesign/core/Stack';
import React, {useEffect, useRef, useState} from 'react';

import {CarouselControls} from './CarouselControls';
import {TestimonialCard, type Testimonial} from './TestimonialCard';
import styles from './TestimonialCarousel.module.css';
import {useCarouselPages} from './useCarouselPages';

export type {Testimonial};

export type TestimonialCarouselProps = {
  items: Testimonial[];
  /** accessible label of the region */
  label?: string;
};

function perViewNow(): number {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(min-width: 1280px)').matches) return 3;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

export function TestimonialCarousel({items, label = 'Témoignages'}: TestimonialCarouselProps) {
  const handle = useRef<CarouselHandle>(null);
  const root = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);

  // cards per view: follows the breakpoints
  useEffect(() => {
    const queries = [window.matchMedia('(min-width: 1280px)'), window.matchMedia('(min-width: 640px)')];
    const update = () => setPerView(perViewNow());
    update();
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  const {page, pages, go} = useCarouselPages(root, handle, items.length, perView);

  return (
    <VStack gap={6} className={styles.root}>
      <Carousel ref={root} handleRef={handle} hasSnap hasButtons={false} hasEdgeFade={false} gap={0} aria-label={label}>
        {items.map((t, i) => (
          <VStack key={i} className={styles.slide} data-slide>
            <TestimonialCard {...t} />
          </VStack>
        ))}
      </Carousel>
      <CarouselControls page={page} pages={pages} onChange={go} labels={{pages: "Pages d'avis", prev: 'Avis précédents', next: 'Avis suivants'}} />
    </VStack>
  );
}

'use client';

/**
 * TestimonialCarousel — le carrousel de témoignages (maquette 07) : Carousel Astryx
 * (défilement natif, snap, poignée) sans ses boutons ni son fondu de bord ; en dessous,
 * les contrôles de la maquette : segments de page à gauche, flèches carrées à droite
 * (masqués sous 640 px, où l'on balaie). 1, 2 ou 3 cartes par vue selon la largeur
 * (640, 1280) ; les segments comptent les pages, pas les cartes. Clair ou nuit via la
 * Section (night-halo pour la maquette 07b).
 */
import {Carousel, type CarouselHandle} from '@astryxdesign/core/Carousel';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {ArrowLeftIcon, ArrowRightIcon} from '@/theme/icons/nucleo';
import {TestimonialCard, type Testimonial} from './TestimonialCard';

export type {Testimonial};
import styles from './TestimonialCarousel.module.css';

export type TestimonialCarouselProps = {
  items: Testimonial[];
  /** libellé accessible de la région */
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
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(items.length / perView));

  // cartes par vue : suit les points de rupture
  useEffect(() => {
    const queries = [window.matchMedia('(min-width: 1280px)'), window.matchMedia('(min-width: 640px)')];
    const update = () => setPerView(perViewNow());
    update();
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  // page active : lue sur le défilement de la piste (la première carte de chaque page)
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const track = [...el.querySelectorAll<HTMLElement>('*')].find((n) => /auto|scroll/.test(getComputedStyle(n).overflowX));
    if (!track) return;
    let raf = 0;
    const sync = () => {
      const slides = [...track.querySelectorAll<HTMLElement>('[data-slide]')];
      if (!slides.length) return;
      const x0 = slides[0].offsetLeft;
      let best = 0;
      let dist = Infinity;
      for (let p = 0; p < pages; p++) {
        const i = Math.min(p * perView, slides.length - 1);
        const d = Math.abs(slides[i].offsetLeft - x0 - track.scrollLeft);
        if (d < dist) { dist = d; best = p; }
      }
      setPage(best);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); };
    track.addEventListener('scroll', onScroll, {passive: true});
    sync();
    return () => { track.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [pages, perView, items.length]);

  const go = useCallback((p: number) => {
    const target = Math.max(0, Math.min(p, pages - 1));
    handle.current?.scrollTo(target * perView);
  }, [pages, perView]);

  return (
    <VStack gap={4} className={styles.root}>
      <Carousel ref={root} handleRef={handle} hasSnap hasButtons={false} hasEdgeFade={false} gap={0} aria-label={label}>
        {items.map((t, i) => (
          <VStack key={i} className={styles.slide} data-slide>
            <TestimonialCard {...t} />
          </VStack>
        ))}
      </Carousel>
      {pages > 1 ? (
        <HStack justify="between" vAlign="center" gap={3} className={styles.ui}>
          <HStack gap={1.5} role="tablist" aria-label="Pages d'avis">
            {Array.from({length: pages}, (_, p) => (
              <button key={p} type="button" role="tab" aria-selected={p === page} aria-label={`Page ${p + 1}`} className={styles.seg} onClick={() => go(p)} />
            ))}
          </HStack>
          <HStack gap={1.5}>
            <IconButton label="Avis précédents" icon={<ArrowLeftIcon />} variant="ghost" isDisabled={page <= 0} onClick={() => go(page - 1)} className={styles.arrow} />
            <IconButton label="Avis suivants" icon={<ArrowRightIcon />} variant="ghost" isDisabled={page >= pages - 1} onClick={() => go(page + 1)} className={styles.arrow} />
          </HStack>
        </HStack>
      ) : null}
    </VStack>
  );
}

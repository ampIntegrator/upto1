'use client';

/**
 * useCarouselPages — the page of an Astryx Carousel read from its track's scroll
 * position, and a `go(page)` that scrolls to a page's first slide. A page holds
 * `perView` slides (`step: 'item'`: a page is a single slide, the arrows advance one
 * slide at a time). Slides carry `data-slide`. Shared by TestimonialCarousel and Collection.
 */
import type {CarouselHandle} from '@astryxdesign/core/Carousel';
import {type RefObject, useCallback, useEffect, useState} from 'react';

export function useCarouselPages(root: RefObject<HTMLDivElement | null>, handle: RefObject<CarouselHandle | null>, count: number, perView: number, step: 'item' | 'page' = 'page') {
  const per = step === 'item' ? 1 : perView;
  // the last page starts so that the view is full: with 5 slides and 3 per view, pages start at 0 and 2
  const pages = Math.max(1, step === 'item' ? Math.max(1, count - perView + 1) : Math.ceil(count / perView));
  const startOf = useCallback((p: number) => Math.min(p * per, Math.max(0, count - perView)), [count, per, perView]);
  const [page, setPage] = useState(0);

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
        const i = Math.min(startOf(p), slides.length - 1);
        const d = Math.abs(slides[i].offsetLeft - x0 - track.scrollLeft);
        if (d < dist) {
          dist = d;
          best = p;
        }
      }
      setPage(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    track.addEventListener('scroll', onScroll, {passive: true});
    sync();
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pages, startOf, root, count]);

  const go = useCallback(
    (p: number) => {
      const target = Math.max(0, Math.min(p, pages - 1));
      handle.current?.scrollTo(startOf(target));
    },
    [handle, pages, startOf],
  );

  return {page, pages, go};
}

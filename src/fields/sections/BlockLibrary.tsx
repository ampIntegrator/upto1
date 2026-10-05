'use client';

/**
 * BlockLibrary — the content blocks as rows of thumbnails that wrap and scroll down: each one is the
 * image the host gave the block, whole and edge to edge, at one height for all and the width its own
 * proportions give it. The first tile is not a block: it holds the instructions (always shown). The
 * blocks follow in the host's order, rearranged just enough to fill each row towards the right
 * (`packRows`). On hover and on keyboard focus a white veil covers the picture and shows the block's
 * name and the column widths it accepts (they are its accessible name). A thumbnail
 * is dragged onto a column of the preview (`onDrag` tells the dialog which block is in the air) or
 * clicked (`onPick`). `fits`: blocks that do not fit are shown dimmed and cannot be picked.
 */
import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {packRows} from './packRows';
import {token} from './tokens';

/** drag data type of a block thumbnail */
export const BLOCK_DRAG_TYPE = 'application/x-section-block';

export type LibraryBlock = {slug: string; label: string; image?: string; min: number; max: number};

type Props = {
  blocks: LibraryBlock[];
  fits?: (block: LibraryBlock) => boolean;
  onPick?: (slug: string) => void;
  onDrag?: (slug: string | null) => void;
  /** the first tile of instructions (not in a list where a click is the only gesture) */
  guide?: boolean;
};


export function BlockLibrary({blocks, fits, onPick, onDrag, guide = true}: Props) {
  const {t} = useAdminText();
  const list = useRef<HTMLUListElement>(null);
  // the list's width, and the thumbnails' measures (tokens.scss), read with it
  const [room, setRoom] = useState(0);
  const [sizes, setSizes] = useState({height: 0, min: 0, gap: 0, guide: 0});
  // slug → width / height of its picture, known once it is loaded
  const [ratios, setRatios] = useState<Record<string, number>>({});
  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      setRoom(el.clientWidth);
      setSizes((s) => {
        const next = {height: token('thumb-height'), min: token('thumb-min-width'), gap: token('thumb-gap'), guide: token('guide-width')};
        return next.height === s.height && next.min === s.min && next.gap === s.gap && next.guide === s.guide ? s : next;
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // rearranged once the list's width and every picture's proportions are known (the host's order until then)
  const ordered = useMemo(() => {
    if (!room || !sizes.height || blocks.some((b) => b.image && ratios[b.slug] === undefined)) return blocks;
    // (a picture that failed to load has a ratio of 0: its tile is as narrow as a tile gets)
    const widths = blocks.map((b) => Math.max(sizes.min, Math.ceil(sizes.height * (ratios[b.slug] ?? 0))));
    return packRows(widths, room, sizes.gap, guide ? sizes.guide : 0).map((i) => blocks[i]);
  }, [blocks, guide, ratios, room, sizes]);
  const sized = (slug: string, img: HTMLImageElement | null, failed = false) => {
    if (!img || ratios[slug] !== undefined || (!failed && !img.naturalHeight)) return;
    const ratio = failed ? 0 : img.naturalWidth / img.naturalHeight;
    setRatios((r) => (r[slug] !== undefined ? r : {...r, [slug]: ratio}));
  };
  return (
    <ul ref={list} className="block-library">
      {/* the instructions, always shown, in the place of a first thumbnail */}
      {guide ? (
        <li className="block-library__item">
          <p className="block-library__guide">{t(T.manager.libraryGuide)}</p>
        </li>
      ) : null}
      {ordered.map((b) => {
        const ok = fits ? fits(b) : true;
        const widths = b.max < 12 ? t(T.manager.libraryRange, {min: b.min, max: b.max}) : t(T.manager.libraryMin, {min: b.min});
        return (
          <li key={b.slug} className="block-library__item">
            {/* a div, not a button: Firefox does not drag buttons */}
            <div
              role="button"
              tabIndex={ok ? 0 : -1}
              aria-disabled={!ok || undefined}
              className="block-library__block"
              data-block={b.slug}
              draggable={Boolean(onDrag) && ok}
              aria-label={`${b.label} · ${widths}`}
              onClick={() => (ok ? onPick?.(b.slug) : undefined)}
              onKeyDown={(e) => {
                if (!ok || (e.key !== 'Enter' && e.key !== ' ')) return;
                e.preventDefault();
                onPick?.(b.slug);
              }}
              onDragStart={(e) => {
                e.dataTransfer.setData(BLOCK_DRAG_TYPE, b.slug);
                e.dataTransfer.effectAllowed = 'copy';
                onDrag?.(b.slug);
              }}
              onDragEnd={() => onDrag?.(null)}>
              {/* the picture sets the thumbnail's width (its own proportions at the row's height) */}
              {/* eslint-disable-next-line @next/next/no-img-element -- a neutral core: no next/image */}
              {b.image ? <img ref={(img) => sized(b.slug, img)} className="block-library__image" src={b.image} alt="" draggable={false} onLoad={(e) => sized(b.slug, e.currentTarget)} onError={(e) => sized(b.slug, e.currentTarget, true)} /> : null}
              {/* the name and the widths, on a veil over the picture on hover and focus (the aria-label speaks them) */}
              <span className="block-library__caption" aria-hidden="true">
                <span className="block-library__label">{b.label}</span>
                <span className="block-library__widths">{widths}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

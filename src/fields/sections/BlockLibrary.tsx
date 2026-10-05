'use client';

/**
 * BlockLibrary — the content blocks as rows of thumbnails that wrap and scroll down: each one is the
 * image the host gave the block, whole and edge to edge, at one height for all and the width its own
 * proportions give it. On hover and on keyboard focus a dark veil covers the picture and shows the
 * block's name and the column widths it accepts (they are its accessible name). A thumbnail
 * is dragged onto a column of the preview (`onDrag` tells the dialog which block is in the air) or
 * clicked (`onPick`). `fits`: blocks that do not fit are shown dimmed and cannot be picked.
 */
import React from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

/** drag data type of a block thumbnail */
export const BLOCK_DRAG_TYPE = 'application/x-section-block';

export type LibraryBlock = {slug: string; label: string; image?: string; min: number; max: number};

type Props = {
  blocks: LibraryBlock[];
  fits?: (block: LibraryBlock) => boolean;
  onPick?: (slug: string) => void;
  onDrag?: (slug: string | null) => void;
};

export function BlockLibrary({blocks, fits, onPick, onDrag}: Props) {
  const {t} = useAdminText();
  return (
    <ul className="block-library">
      {blocks.map((b) => {
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
              {b.image ? <img className="block-library__image" src={b.image} alt="" draggable={false} /> : null}
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

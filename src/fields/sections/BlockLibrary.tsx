'use client';

/**
 * BlockLibrary — the content blocks as a line of thumbnails that scrolls sideways (the image the
 * host gave each block, its name, the column widths it accepts). A thumbnail is dragged onto a
 * column of the preview (`onDrag` tells the dialog which block is in the air) or clicked
 * (`onPick`). `fits`: blocks that do not fit are shown dimmed and cannot be picked.
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
            <button
              type="button"
              className="block-library__block"
              data-block={b.slug}
              disabled={!ok}
              draggable={Boolean(onDrag) && ok}
              title={`${b.label} · ${widths}`}
              onClick={() => onPick?.(b.slug)}
              onDragStart={(e) => {
                e.dataTransfer.setData(BLOCK_DRAG_TYPE, b.slug);
                e.dataTransfer.effectAllowed = 'copy';
                onDrag?.(b.slug);
              }}
              onDragEnd={() => onDrag?.(null)}>
              {/* a plain <img>: an admin thumbnail from /public, no optimisation needed */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {b.image ? <img className="block-library__image" src={b.image} alt="" draggable={false} /> : <span className="block-library__image" />}
              <span className="block-library__label">{b.label}</span>
              <span className="block-library__widths">{widths}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

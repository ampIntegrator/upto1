'use client';

/**
 * BlockLibrary — the content blocks as a line of thumbnails that scrolls sideways: each one is the
 * image the host gave the block, shown whole (contain) in a box of fixed height, standard or wide
 * (`wide`: the host declared a landscape image). The block's name and the column widths it accepts
 * show over the picture on hover and on keyboard focus, and are its accessible name. A thumbnail
 * is dragged onto a column of the preview (`onDrag` tells the dialog which block is in the air) or
 * clicked (`onPick`). `fits`: blocks that do not fit are shown dimmed and cannot be picked.
 */
import React from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

/** drag data type of a block thumbnail */
export const BLOCK_DRAG_TYPE = 'application/x-section-block';

export type LibraryBlock = {slug: string; label: string; image?: string; wide?: boolean; min: number; max: number};

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
          <li key={b.slug} className={b.wide ? 'block-library__item block-library__item--wide' : 'block-library__item'}>
            {/* a div, not a button: Firefox does not drag buttons */}
            <div
              role="button"
              tabIndex={ok ? 0 : -1}
              aria-disabled={!ok || undefined}
              className="block-library__block"
              data-block={b.slug}
              draggable={Boolean(onDrag) && ok}
              aria-label={`${b.label} · ${widths}`}
              style={b.image ? {backgroundImage: `url("${b.image}")`} : undefined}
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
              {/* the name and the widths, over the picture on hover and focus (the aria-label speaks them) */}
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

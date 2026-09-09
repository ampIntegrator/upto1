'use client';

/**
 * IconSquare — carré teinté avec une icône Nucleo au centre (cartes, zone de
 * dépôt, mega-menu). `size` est le côté du carré, `iconSize` celui de l'icône.
 */
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';

export function IconSquare({iconKey, size = 40, iconSize, style}: {iconKey: NucleoIconKey; size?: 32 | 40 | 64; iconSize?: number; style?: React.CSSProperties}) {
  const Glyph = NUCLEO_ICONS[iconKey];
  const glyph = iconSize ?? (size === 64 ? 28 : size === 40 ? 20 : 16);
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        background: 'light-dark(var(--color-accent-muted), var(--color-highlight))',
        color: 'light-dark(var(--color-text-accent), var(--color-night))',
        ...style,
      }}>
      <Glyph width={glyph} height={glyph} />
    </span>
  );
}

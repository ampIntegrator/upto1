'use client';

/** IconSquare — carré teinté avec une icône Nucleo au centre (cartes, zone de dépôt, mega-menu). */
import {Icon} from '@astryxdesign/core/Icon';
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';

export function IconSquare({iconKey, size = 40, style}: {iconKey: NucleoIconKey; size?: 40 | 64; style?: React.CSSProperties}) {
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
      <Icon icon={NUCLEO_ICONS[iconKey]} size={size === 64 ? 'lg' : 'md'} />
    </span>
  );
}

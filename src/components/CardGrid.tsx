'use client';

/**
 * CardGrid — the card grid, the generic content that places cards side by side
 * in a page column (2, 3 or 4 inner columns). It is what provides the
 * side-by-side layout: the page splits only once (see content-specs.ts). The grid follows
 * its column width, not the screen: below a 720 px column it drops to 2, below
 * 480 px to 1. Minimum span: 3 page columns per inner column.
 */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Card, type CardProps} from './Card';
import styles from './CardGrid.module.css';

export type CardGridProps = {
  items: CardProps[];
  columns?: 2 | 3 | 4;
};

export function CardGrid({items, columns = 3}: CardGridProps) {
  return (
    <VStack className={styles.host}>
      <VStack as="ul" className={styles.grid} data-columns={columns} style={{'--columns': columns} as React.CSSProperties}>
        {items.map((it, i) => (
          <VStack as="li" key={i} className={styles.cell}>
            <Card {...it} />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

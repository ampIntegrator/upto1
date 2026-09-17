/**
 * StatsBand — the results band (mockup 23 .case-stats, capture _c23-stats): a night panel with
 * a highlight glow, two to four cells separated by light rules, each a number in Schibsted 800
 * highlight and a label in mono capitals. Sized to its column (container queries): four cells
 * become two rows of two below 560 px, one column below 360 px.
 */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import styles from './StatsBand.module.css';

export type StatsBandItem = {value: string; label: string};
export type StatsBandProps = {items: StatsBandItem[]};

export function StatsBand({items}: StatsBandProps) {
  const cells = items.slice(0, 4);
  if (!cells.length) return null;
  return (
    <VStack className={styles.host}>
      <dl className={styles.root} style={{'--cells': cells.length} as React.CSSProperties} data-cells={cells.length}>
        {cells.map((it, i) => (
          // label first in the markup (dt before dd), shown below the number (column-reverse)
          <VStack key={i} className={styles.cell}>
            <dt className={styles.label}>{it.label}</dt>
            <dd className={styles.dd}>{it.value}</dd>
          </VStack>
        ))}
      </dl>
    </VStack>
  );
}

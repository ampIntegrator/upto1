/**
 * Stat — a key figure: large Schibsted 800 number in silo color, prefix and
 * suffix in highlight-deep at 62 % of the number (highlight in night), optional
 * sub-label in spaced capitals (mockups 04-statsBar and 12-cardBlocks).
 *
 *   size  : 'bar' (40 px, figures bar) | 'card' (clamp 40–52 px, number card)
 *   align : 'start' | 'center'
 *
 * Used alone in a figures bar, and by the number card.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './Stat.module.css';

export type StatProps = {
  value: string;
  prefix?: string;
  suffix?: string;
  /** sub-label (« Courtiers actifs ») */
  label?: string;
  size?: 'bar' | 'card';
  align?: 'start' | 'center';
};

export function Stat({value, prefix, suffix, label, size = 'bar', align = 'start'}: StatProps) {
  return (
    <VStack className={styles.stat} data-size={size} data-align={align} gap={0}>
      <Text type="number" className={styles.value}>
        {prefix ? <span className={styles.sign}>{prefix} </span> : null}
        {value}
        {suffix ? <span className={styles.sign}> {suffix}</span> : null}
      </Text>
      {label ? <Text type="tag" className={styles.label}>{label}</Text> : null}
    </VStack>
  );
}

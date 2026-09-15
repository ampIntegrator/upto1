'use client';

/**
 * (internal building block of PriceList, not in the catalog)
 * Price — the price (mockups 08 and 09): Schibsted 800 amount in silo color, currency in
 * silo semibold aligned on the baseline, period in 14 px gray. Two sizes:
 * `plan` (56 px, tier card) and `single` (84 px, single price). A content item, like Stat,
 * reserved for pricing; Stat remains the key figure.
 */
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './Price.module.css';

export type PriceProps = {
  /** amount as displayed (« 79 », « 1 490 ») */
  value: string;
  currency?: string;
  /** « / mois », « par mois · soit 2,60 € / jour » */
  period?: string;
  size?: 'plan' | 'single';
  align?: 'start' | 'center';
};

export function Price({value, currency = '€', period, size = 'plan', align = 'start'}: PriceProps) {
  return (
    <HStack gap={1.5} hAlign={align} wrap="wrap" className={styles.price} data-size={size}>
      <Text className={styles.value}>{value}</Text>
      <Text className={styles.currency}>{currency}</Text>
      {period ? <Text className={styles.period}>{period}</Text> : null}
    </HStack>
  );
}

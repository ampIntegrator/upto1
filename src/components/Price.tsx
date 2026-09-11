'use client';

/**
 * Price — le prix (maquettes 08 et 09) : montant Schibsted 800 en couleur silo, devise en
 * semibold silo alignée sur la ligne de base, période en 14 px gris. Deux tailles :
 * `plan` (56 px, carte de palier) et `single` (84 px, prix unique). Un contenu, comme Stat,
 * réservé aux tarifs ; Stat reste le chiffre clé.
 */
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './Price.module.css';

export type PriceProps = {
  /** montant tel qu'affiché (« 79 », « 1 490 ») */
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

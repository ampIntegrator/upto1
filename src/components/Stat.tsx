/**
 * Stat — un chiffre clé : grand nombre Schibsted 800 couleur silo, préfixe et
 * suffixe en highlight-deep à 62 % du nombre (highlight en nuit), sous-libellé
 * facultatif en capitales espacées (maquettes 04-statsBar et 12-cardBlocks).
 *
 *   size  : 'bar' (40 px, barre de chiffres) | 'card' (clamp 40–52 px, carte nombre)
 *   align : 'start' | 'center'
 *
 * Utilisé seul dans une barre de chiffres, et par la carte nombre.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './Stat.module.css';

export type StatProps = {
  value: string;
  prefix?: string;
  suffix?: string;
  /** sous-libellé (« Courtiers actifs ») */
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

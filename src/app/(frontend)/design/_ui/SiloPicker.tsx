'use client';

/* Sélecteur de silo de la barre latérale : un groupe de boutons radio, une pastille
   carrée par silo (4 puis 3), qui devient ronde une fois choisie. Pas de menu. */
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {SILO_LABELS, SILO_NAMES, SILOS, type SiloName} from '@/theme';
import styles from './SiloPicker.module.css';

export function SiloPicker({value, onChange}: {value: SiloName; onChange: (s: SiloName) => void}) {
  return (
    <VStack gap={1.5} role="radiogroup" aria-label="Silo d'accent">
      <Text type="label">Silo d'accent · {SILO_LABELS[value]}</Text>
      <Grid columns={4} gap={2} width={128}>
        {SILO_NAMES.map((s) => (
          <label key={s} className={styles.swatch} style={{'--swatch': SILOS[s].primary} as React.CSSProperties} title={SILO_LABELS[s]}>
            <input type="radio" name="silo" value={s} checked={value === s} onChange={() => onChange(s)} className={styles.input} aria-label={SILO_LABELS[s]} />
            <i className={styles.dot} aria-hidden="true" />
          </label>
        ))}
      </Grid>
    </VStack>
  );
}

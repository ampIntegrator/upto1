'use client';

/** OrbitaChip — les chips de la maquette (.c-chip*), sur le Badge Astryx et ses variantes ajoutées par le thème. */
import {Badge} from '@astryxdesign/core/Badge';
import React from 'react';

export type OrbitaChipTone = 'line' | 'high' | 'accent' | 'cat' | 'danger';

const VARIANT: Record<OrbitaChipTone, 'chip' | 'chip-high' | 'chip-accent' | 'chip-cat' | 'chip-danger'> = {
  line: 'chip',
  high: 'chip-high',
  accent: 'chip-accent',
  cat: 'chip-cat',
  danger: 'chip-danger',
};

export function OrbitaChip({label, tone = 'line'}: {label: string; tone?: OrbitaChipTone}) {
  return <Badge label={label} variant={VARIANT[tone]} />;
}

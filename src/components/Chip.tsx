'use client';

/** Chip — les chips de la maquette (.c-chip*), sur le Badge Astryx et ses variantes ajoutées par le thème. */
import {Badge} from '@astryxdesign/core/Badge';
import React from 'react';

export type ChipTone = 'line' | 'high' | 'accent' | 'cat' | 'danger';

const VARIANT: Record<ChipTone, 'chip' | 'chip-high' | 'chip-accent' | 'chip-cat' | 'chip-danger'> = {
  line: 'chip',
  high: 'chip-high',
  accent: 'chip-accent',
  cat: 'chip-cat',
  danger: 'chip-danger',
};

export function Chip({label, tone = 'line'}: {label: string; tone?: ChipTone}) {
  return <Badge label={label} variant={VARIANT[tone]} />;
}

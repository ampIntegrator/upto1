'use client';

/** Chip — the mockup chips (.c-chip*), built on the Astryx Badge and the variants added by the theme. */
import {Badge} from '@astryxdesign/core/Badge';
import {Icon} from '@astryxdesign/core/Icon';
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';

export type ChipTone = 'line' | 'high' | 'accent' | 'cat' | 'danger' | 'live' | 'live-dark';

const VARIANT: Record<ChipTone, 'chip' | 'chip-high' | 'chip-accent' | 'chip-cat' | 'chip-danger' | 'chip-live' | 'chip-live-dark'> = {
  line: 'chip',
  high: 'chip-high',
  accent: 'chip-accent',
  cat: 'chip-cat',
  danger: 'chip-danger',
  live: 'chip-live',
  'live-dark': 'chip-live-dark',
};

export function Chip({label, tone = 'line', iconKey}: {label: string; tone?: ChipTone; /** Nucleo icon left of the label (e.g. clock) */ iconKey?: NucleoIconKey}) {
  return <Badge label={label} variant={VARIANT[tone]} icon={iconKey ? <Icon icon={NUCLEO_ICONS[iconKey]} /> : undefined} />;
}

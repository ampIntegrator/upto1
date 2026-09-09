/* Showcase habillé Orbita — DateRangeInput Astryx : libellés et intitulés français courts, effacement, thème Orbita (icônes silo, panneau à la largeur du champ). */
'use client';

import type {ISODateString} from '@astryxdesign/core/Calendar';
import {DateRangeInput, type DateRange} from '@astryxdesign/core/DateRangeInput';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

const iso = (d: Date) => d.toISOString().slice(0, 10) as ISODateString;
const daysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return iso(d); };
const presets = [
  {label: '7 derniers jours', getRange: () => ({start: daysAgo(7), end: iso(new Date())})},
  {label: '30 derniers jours', getRange: () => ({start: daysAgo(30), end: iso(new Date())})},
];

export default function DateRangeInputShowcase() {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Plage de dates avec raccourcis. Panneau à la largeur du champ, icône en couleur silo.</Text>
      <Grid columns={{minWidth: 240, max: 2}} gap={6} style={{maxWidth: 400 * 2 + 24}}>
        <DateRangeInput label="Période" value={range} onChange={setRange} presets={presets} />
      </Grid>
    </VStack>
  );
}

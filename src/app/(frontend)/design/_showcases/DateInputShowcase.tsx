/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaDateField */
'use client';

import type {ISODateString} from '@astryxdesign/core/Calendar';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {OrbitaDateField} from '@/components/OrbitaDateField';

export default function DateInputShowcase() {
  const [date, setDate] = useState<ISODateString | undefined>(undefined);
  const [fixed, setFixed] = useState<ISODateString | undefined>('2026-09-15' as ISODateString);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Champ de date Orbita : label flottant, icône calendrier en couleur silo, calendrier sur toute la largeur du champ, 6 px dessous, croix d'effacement nue.</Text>
      <Grid columns={{minWidth: 240, max: 2}} gap={6} maxWidth={824}>
        <OrbitaDateField label="Date de début" value={date} onChange={setDate} />
        <OrbitaDateField label="Date de livraison" value={fixed} onChange={setFixed} />
      </Grid>
    </VStack>
  );
}

/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/TimePicker (DateTimePicker) */
'use client';

import type {ISODateTimeString} from '@astryxdesign/core/DateTimeInput';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {DateTimePicker} from '@/components/TimePicker';

export default function DateTimeInputShowcase() {
  const [value, setValue] = useState<ISODateTimeString | undefined>(undefined);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Date et heure en un champ à deux segments, « Date » et « Heure ». Le segment date ouvre le calendrier Astryx, étendu sur toute la largeur ; le segment heure ouvre le panneau heures et minutes. Sans date choisie, l'heure se pose sur aujourd'hui.</Text>
      <Grid columns={{minWidth: 280, max: 2}} gap={6} maxWidth={824}>
        <DateTimePicker label="Rendez-vous" value={value} onChange={setValue} />
      </Grid>
    </VStack>
  );
}

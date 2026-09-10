/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaTimePicker */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import type {ISOTimeString} from '@astryxdesign/core/TimeInput';
import React, {useState} from 'react';

import {OrbitaTimePicker} from '@/components/OrbitaTimePicker';

export default function TimeInputShowcase() {
  const [time, setTime] = useState<ISOTimeString | undefined>(undefined);
  const [quart, setQuart] = useState<ISOTimeString | undefined>('14:30' as ISOTimeString);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Champ d'heure du site : un clic ouvre un panneau à la largeur du champ, comme le calendrier. Heures à gauche, minutes à droite, valeur en cercle couleur silo, raccourci « Maintenant ». Choisir les minutes referme. La saisie au clavier reste possible.</Text>
      <Grid columns={{minWidth: 240, max: 2}} gap={6} maxWidth={824}>
        <OrbitaTimePicker label="Heure du rendez-vous" value={time} onChange={setTime} />
        <OrbitaTimePicker label="Créneau (quart d'heure)" value={quart} onChange={setQuart} minuteStep={15} />
      </Grid>
    </VStack>
  );
}

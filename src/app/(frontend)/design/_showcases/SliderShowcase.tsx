/* Showcase habillé Orbita — Slider Astryx, apparence par le thème (maquette 17-forms .c-range) */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Slider} from '@astryxdesign/core/Slider';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export default function SliderShowcase() {
  const [budget, setBudget] = useState(250);
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Curseur Orbita : piste de 6 px en dégradé highlight → accent atténué, progression accent, poignée ronde de 16 px. Valeur affichée en tête, comme le calculateur de la maquette.</Text>
      <Card padding={6}>
        <VStack gap={2} style={{maxWidth: 480}}>
          <HStack hAlign="between" vAlign="center">
            <Text type="label" color="secondary">Budget travaux estimé</Text>
            <Text type="label"><strong>{budget}</strong> k€</Text>
          </HStack>
          <Slider label="Budget travaux estimé" isLabelHidden value={budget} onChange={(v: number) => setBudget(v)} min={50} max={500} step={10} />
        </VStack>
      </Card>
    </VStack>
  );
}

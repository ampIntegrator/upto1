/* Design-system-specific component: src/components/CtaBand (call-to-action band, mockup 18). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CtaBand} from '@/components/CtaBand';

export default function CtaBandShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le bandeau d’appel à l’action : panneau nuit, icône encadrée en highlight, titre et ligne d’appui en blanc, bouton split highlight. Variante « flèche » sur une seule ligne. Le bouton passe en pleine largeur sous 560 px.</Text>
      <VStack gap={6} style={{maxWidth: 760}}>
        <CtaBand iconKey="calculator" title="Estimez votre gain de temps" text="Quelques chiffres suffisent pour projeter l’impact sur votre cycle commercial." button={{label: 'Lancer le calcul', href: '#', variant: 'high', arrow: true}} />
        <CtaBand variant="arrow" title="Lire le guide du chiffrage en visite" button={{label: 'En savoir plus', href: '#', variant: 'high', arrow: true}} />
      </VStack>
    </VStack>
  );
}

/* Design-system-specific component: src/components/StatsBand (results band, mockup 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {StatsBand} from '@/components/StatsBand';
import {STATS} from './post.shared';

export default function StatsBandShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le bandeau de résultats : panneau nuit avec halo highlight, deux à quatre cellules séparées d’un filet, chiffre en Schibsted 800 highlight et libellé en capitales mono. Quatre cellules passent sur deux lignes sous 560 px de largeur.</Text>
      <VStack gap={6} style={{maxWidth: 760}}>
        <StatsBand items={STATS} />
        <StatsBand items={STATS.slice(0, 2)} />
      </VStack>
    </VStack>
  );
}

/* Design-system-specific component: src/components/QuoteCard (quote with author, mockup 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {QuoteCard} from '@/components/QuoteCard';
import {IMG} from './post.shared';

export default function QuoteCardShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">La carte citation : carte papier ombrée à barre or, citation en serif italique, puis l’auteur avec son avatar carré (Avatar du thème), son nom et son rôle.</Text>
      <VStack style={{maxWidth: 760}}>
        <QuoteCard quote="« En six semaines, on a transformé notre point faible en avantage commercial. Aujourd’hui, on répond plus vite que tout le monde. »" name="Julien Vasseur" role="Gérant · Vasseur Construction" photo={{src: IMG('1500648767791-00dcc994a43e', 96)}} />
      </VStack>
    </VStack>
  );
}

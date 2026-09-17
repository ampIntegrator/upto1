/* Design-system-specific component: src/components/CaseSheet (fact sheet of a case study, mockup 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CaseSheet} from '@/components/CaseSheet';
import {CASE_SHEET} from './cases.shared';

export default function CaseSheetShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">La fiche projet, dans la barre latérale d’une réalisation : lignes libellé et texte (le client peut renvoyer vers son site), deux mini-résultats, bouton d’appel. Libellés gérés dans les réglages des réalisations, modifiables sur chaque réalisation. Collée sous l’en-tête sur grand écran, au-dessus du récit sous 1024 px.</Text>
      <VStack style={{maxWidth: 300}}>
        <CaseSheet {...CASE_SHEET} />
      </VStack>
    </VStack>
  );
}

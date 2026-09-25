/* Design-system-specific component: src/components/CaseHero (top of a case study, mockup 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CaseHero} from '@/components/CaseHero';
import {CASE_HERO} from './cases.shared';

export default function CaseHeroShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le haut d’une réalisation : image à la une en pleine largeur sur fond nuit, voile qui s’assombrit vers le bas, texte centré verticalement dans le conteneur du site. Chips « Étude de cas » et catégorie, h1 avec accent serif highlight, chapô. Page complète : Page · réalisation (23).</Text>
      <CaseHero {...CASE_HERO} />
      <Text type="body" color="secondary">Avec un voile noir d’opacité 0,4 (prop overlay, de 0 à 1) : pour une image à la une claire ou très blanche.</Text>
      <CaseHero {...CASE_HERO} overlay={0.4} />
      <Text type="body" color="secondary">Le même voile dans la couleur du silo (overlayColor="silo"), opacité 0,5.</Text>
      <CaseHero {...CASE_HERO} overlay={0.5} overlayColor="silo" />
    </VStack>
  );
}

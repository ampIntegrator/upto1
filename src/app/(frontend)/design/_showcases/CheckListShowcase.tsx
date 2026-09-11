/* Composant propre au design system : src/components/CheckList (liste à pastilles, maquettes 03 et 05). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CheckList} from '@/components/CheckList';
import {Section} from '@/components/Section';
import {Container} from '@/components/Container';

const CHECKS = ['Aucune compétence BTP requise', 'Sauvegarde automatique entre étapes', 'Téléversement de photos & plans existants'];
const AVANT = ['Vous appelez · l\'artisan dit « Je vous rappelle »', 'Vous relancez · 4 fois', 'Le client signe ailleurs', 'Le mandat est perdu'];
const APRES = ['Vous chiffrez en visite, devant le client', 'Détail par poste, validé expert BTP', 'Rapport PDF à votre nom, sous 48 h', 'Le mandat est signé'];

export default function CheckListShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Liste à pastilles rondes de 18 px : coche blanche sur silo, ou croix blanche sur danger pour la colonne « avant ». Compacte et alignée en haut dans les étapes ; en rangées à filets dans les cartes comparatives ; en rangées serrées, avec une valeur barrée en fin de ligne, dans les tarifs. Le ton se règle pour la liste entière ou item par item.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Compacte (étapes, maquette 03)</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={4}><CheckList items={CHECKS} /></GridSpan>
          <GridSpan columns={4}><CheckList items={[{label: 'Estimation poste par poste · ± 8 %'}, {label: 'Préconisation IPN / HEB si mur porteur'}, {label: 'Option non retenue', tone: 'cross'}]} /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Rangées à filets (cartes comparatives, maquette 05)</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={6}><CheckList items={AVANT} tone="cross" density="divided" /></GridSpan>
          <GridSpan columns={6}><CheckList items={APRES} density="divided" /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Rangées serrées avec valeurs (tarifs, maquette 08)</Heading>
        <Grid columns={12} gap={6} className="page-grid">
          <GridSpan columns={6}><CheckList density="dense" items={[{label: 'Chiffrage travaux en 20 min', end: '97 €'}, {label: 'Rapport certifié expert BTP', end: '147 €'}, {label: 'Note de calcul détaillée', end: '47 €'}]} /></GridSpan>
          <GridSpan columns={6}><CheckList density="dense" trailingDivider={false} items={['Comptes multi-utilisateurs', 'Marque blanche complète', 'API & intégrations']} /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night" spacing="sm">
          <Container>
              <Grid columns={12} gap={6} className="page-grid">
                <GridSpan columns={6}><CheckList items={AVANT} tone="cross" density="divided" /></GridSpan>
                <GridSpan columns={6}><CheckList items={CHECKS} /></GridSpan>
              </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}

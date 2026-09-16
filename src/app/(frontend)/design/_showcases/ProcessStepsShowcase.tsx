/* Design-system-specific component: src/components/ProcessSteps (steps panel, mockup 03). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {ProcessSteps} from '@/components/ProcessSteps';
import {PROCESS_STEPS} from './blocks.shared';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {SectionNote} from '@/components/SectionNote';


export default function ProcessStepsShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le panneau d'étapes : cadre papier ombré, une colonne par étape (1 à 4, selon ce que Payload envoie), séparées par le dégradé signature. Une étape = numéro serif droit, chip de durée, titre, texte, filet, liste à pastilles. Le panneau suit la largeur de sa colonne de page, pas celle de l'écran : quand chaque étape aurait moins de 260 px environ, les étapes s'empilent et le séparateur passe à l'horizontale. Capacité par largeur de colonne : 1 étape sur 4 ou 5, 2 sur 6 ou 7, 3 sur 8 ou 9, 4 sur 12. En-tête de section et pied « note + bouton » sont posés autour par le bloc.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Bloc complet, 3 étapes (maquette 03)</Heading>
        <Section background="light" spacing="md">
          <Container gap={10}>
            <SectionHeading eyebrow="Comment ça marche" title="3 étapes. <span>48 h max.</span>" />
            <ProcessSteps steps={PROCESS_STEPS} />
            <SectionNote strong="Première estimation offerte." text="La première estimation est gratuite et sans engagement, y compris le rapport PDF validé par expert. Aucune carte bancaire n'est requise à l'inscription. Vous décidez ensuite si vous souhaitez activer l'abonnement Chiffrage Pro à 79 € / mois pour des estimations illimitées." cta={{label: 'Démarrer gratuitement', href: '#'}} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>4 étapes, fond points</Heading>
        <Section background="dots" spacing="sm">
          <Container>
            <ProcessSteps steps={[...PROCESS_STEPS.map((s) => ({...s, asterisk: false})), {title: 'Vous signez', duration: '1 visite', text: 'Le rapport en main, le client décide sur place. Le mandat est signé avant que la concurrence ait rappelé.', checks: ['Signature électronique intégrée', 'Suivi du dossier en ligne']}]} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Dans les colonnes de page : 1 étape sur 4, 2 étapes sur 8</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={4}><ProcessSteps steps={PROCESS_STEPS.slice(0, 1)} /></GridSpan>
          <GridSpan columns={8}><ProcessSteps steps={PROCESS_STEPS.slice(1, 3)} /></GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>2 étapes, sans listes</Heading>
        <Section background="light" spacing="sm">
          <Container>
            <ProcessSteps steps={PROCESS_STEPS.slice(0, 2).map((s) => ({title: s.title, text: s.text, duration: s.duration}))} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}

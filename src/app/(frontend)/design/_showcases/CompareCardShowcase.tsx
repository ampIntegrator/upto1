/* Composant propre au design system : src/components/CompareCard (carte comparative, maquette 05). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CompareCard} from '@/components/CompareCard';
import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {SectionNote} from '@/components/SectionNote';
import {AVANT, APRES, METIERS} from './blocks.shared';


export default function CompareCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte comparative : chip et repère, citation, liste à filets avec coches ou croix. La carte mise en avant prend un cadre silo de 2 px et une ombre teintée, son repère passe en or. Deux cartes « avant / après » sur 6 colonnes, ou trois cartes métiers sur 4 ; nuit via la Section.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Avant / après (maquette 05)</Heading>
        <Section background="light" spacing="md">
          <Container gap={10}>
            <SectionHeading eyebrow="Le déclic" title="Sortez <span>de l'attente.</span>" text="Le même chantier, deux trajectoires. D'un côté l'attente du devis artisan ; de l'autre, un chiffrage chiffré, validé, livré, pendant que le client est encore en face de vous." />
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              <GridSpan columns={6}><CompareCard {...AVANT} /></GridSpan>
              <GridSpan columns={6}><CompareCard {...APRES} /></GridSpan>
            </Grid>
            <SectionNote strong="Scénario réel." text="Aucun module n'est facturé en supplément : chiffrage, suivi, devis et validation sont compris dans l'abonnement Chiffrage Pro à 79 € / mois, sans engagement." cta={{label: "Basculer dans l'après", href: '#'}} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Trois métiers</Heading>
        <Section background="grid" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              {METIERS.map((m) => <GridSpan key={m.chip.label} columns={4}><CompareCard {...m} /></GridSpan>)}
            </Grid>
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="stretch">
              <GridSpan columns={6}><CompareCard {...AVANT} /></GridSpan>
              <GridSpan columns={6}><CompareCard {...APRES} /></GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}

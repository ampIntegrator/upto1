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

const AVANT = {chip: {label: 'AVANT', tone: 'danger' as const}, meta: "3 semaines d'attente", quote: "« Je ne sais pas, j'attends le devis de l'artisan… »", tone: 'cross' as const, items: ["Vous appelez · l'artisan dit « Je vous rappelle »", 'Vous relancez · 4 fois', 'Le client signe ailleurs', 'Le mandat est perdu']};
const APRES = {chip: {label: 'APRÈS', tone: 'high' as const}, meta: '20 min chrono', quote: '« Voici le détail : 67 400 € ± 8 %. Et le PDF. »', featured: true, items: ['Vous chiffrez en visite, devant le client', 'Détail par poste, validé expert BTP', 'Rapport PDF à votre nom, sous 48 h', 'Le mandat est signé']};
const METIERS = [
  {chip: {label: 'COURTIERS'}, meta: 'Closing +34 %', quote: '« Je chiffre devant le client, je signe le mandat. »', items: ['Estimation en rendez-vous', 'Argumentaire chiffré, poste par poste', 'Mandat sécurisé avant le concurrent']},
  {chip: {label: 'ARCHITECTES'}, meta: 'Du métré au prix', quote: '« Mon estimatif est prêt avant la prochaine réunion. »', featured: true, items: ['Métré importé, prix calculés', 'Détail compatible CCTP', 'Note de calcul exportable']},
  {chip: {label: 'PROMOTEURS'}, meta: 'Budget fiable', quote: "« Je fiabilise mon budget dès l'esquisse. »", items: ["Chiffrage dès l'avant-projet", 'Fourchettes ± 8 % documentées', 'Suivi des coûts en temps réel']},
];

export default function CompareCardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte comparative : chip et repère, citation, liste à filets avec coches ou croix. La carte mise en avant prend un cadre silo de 2 px et une ombre teintée, son repère passe en or. Deux cartes « avant / après » sur 6 colonnes, ou trois cartes métiers sur 4 ; nuit via la Section.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Avant / après (maquette 05)</Heading>
        <Section background="light" spacing="md">
          <Container gap={6}>
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

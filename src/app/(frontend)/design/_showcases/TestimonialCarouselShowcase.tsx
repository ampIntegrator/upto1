/* Composant propre au design system : src/components/TestimonialCarousel (carrousel de témoignages, maquettes 07 et 07b). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {SectionHeading} from '@/components/SectionHeading';
import {type Testimonial, TestimonialCarousel} from '@/components/TestimonialCarousel';

export const TESTIMONIALS: Testimonial[] = [
  {quote: "Avant, j'attendais 3 semaines le devis. Maintenant je chiffre en visite. Le client est bluffé.", name: 'Sophie M.', role: 'Courtière · Lyon', result: '+ 12 000 € / trimestre'},
  {quote: "Un vendeur hésitait entre 3 agences. J'ai sorti un chiffrage détaillé. « Vous êtes le seul à avoir pensé à ça. » Mandat signé.", name: 'Marc D.', role: 'Agent immobilier · Paris', result: '4 mandats / mois'},
  {quote: "J'ai viré l'artisan de mon process. Plus d'attente, plus de relances. Mes clients me recommandent deux fois plus.", name: 'Julie R.', role: 'Chasseuse · Bordeaux', result: '× 2 recommandations'},
  {quote: 'Mon premier chiffrage était prêt avant la fin du rendez-vous. Le client a signé sur place, sans réfléchir.', name: 'Thomas L.', role: 'Courtier · Nantes', result: 'Closing en 1 visite'},
  {quote: 'Je ne sous-traite plus aucune estimation. Marge récupérée, délais divisés par trois sur chaque dossier.', name: 'Inès B.', role: 'Agence · Toulouse', result: 'Délais ÷ 3'},
  {quote: 'Le rapport validé par un expert rassure mes clients. Mon taux de transformation a tout simplement bondi.', name: 'Karim Z.', role: 'Mandataire · Lille', result: '+ 28 % de closing'},
];

export default function TestimonialCarouselShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le carrousel de témoignages : Carousel Astryx (défilement natif, snap, clavier) sans ses boutons ni son fondu, et les contrôles de la maquette en dessous : segments de page à gauche, flèches carrées à droite. Une carte par vue, deux dès 640 px, trois dès 1280 px ; sous 640 px on balaie, sans contrôles. Nuit : Section « nuit à halos » (maquette 07b).
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Clair (maquette 07)</Heading>
        <Section background="light" spacing="md">
          <Container gap={8}>
            <SectionHeading eyebrow="Ils ont arrêté d'attendre" title="Ils <span>closent.</span>" ghost="CLOSENT" />
            <TestimonialCarousel items={TESTIMONIALS} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit à halos (maquette 07b)</Heading>
        <Section background="night-halo" spacing="md">
          <Container gap={8}>
            <SectionHeading eyebrow="Ils ont arrêté d'attendre" title="Ils <span>closent.</span>" ghost="CLOSENT" />
            <TestimonialCarousel items={TESTIMONIALS} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}

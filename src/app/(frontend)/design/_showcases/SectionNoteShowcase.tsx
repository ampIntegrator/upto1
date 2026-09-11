/* Composant propre au design system : src/components/SectionNote (note + appel à l'action en pied de bloc, maquettes 03 et 05). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {SectionNote} from '@/components/SectionNote';

export default function SectionNoteShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le pied de bloc : astérisque silo, accroche en gras, texte de 14 px sur 760 px maximum, bouton split à droite. Sous 768 px, le bouton passe sous le texte. Les blocs étapes et comparatif le posent sous leur grille.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Clair</Heading>
        <Section background="light" spacing="sm">
          <Container>
            <SectionNote strong="Première estimation offerte." text="La première estimation est gratuite et sans engagement, y compris le rapport PDF validé par expert. Aucune carte bancaire n'est requise à l'inscription. Vous décidez ensuite si vous souhaitez activer l'abonnement Chiffrage Pro à 79 € / mois pour des estimations illimitées." cta={{label: 'Démarrer gratuitement', href: '#'}} />
          </Container>
        </Section>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit, sans astérisque</Heading>
        <Section background="night" spacing="sm">
          <Container>
            <SectionNote asterisk={false} strong="Un compte, tous les métiers." text="L'interface s'adapte à votre profil à l'inscription. Vous pouvez basculer de vue à tout moment depuis votre tableau de bord, sans frais supplémentaire." cta={{label: 'Trouver mon profil', href: '#'}} />
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}

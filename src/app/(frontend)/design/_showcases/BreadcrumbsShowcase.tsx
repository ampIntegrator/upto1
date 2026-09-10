/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION (fil d'Ariane, maquette 25) */
'use client';

import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {ChevronRightIcon} from '@/theme/icons/nucleo';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

function Trail() {
  return (
    <Breadcrumbs label="Fil d'Ariane" separator={<ChevronRightIcon width={12} height={12} />}>
      <BreadcrumbItem href="#">Accueil</BreadcrumbItem>
      <BreadcrumbItem href="#">Solutions</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Chiffrage instantané</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export default function BreadcrumbsShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le fil d'Ariane : capitales espacées, gris, silo au survol, chevrons Nucleo en couleur silo, page courante en encre secondaire. Sous un haut de page, il vit dans une bande papier bordée.</Text>
      <Trail />
      <Section background="paper" spacing="none" dividers>
        <Container>
          <VStack paddingBlock={3.5 as 3}><Trail /></VStack>
        </Container>
      </Section>
      <Theme theme={theme} mode="dark">
        <VStack padding={4} style={{background: 'var(--color-background-body)'}}><Trail /></VStack>
      </Theme>
    </VStack>
  );
}

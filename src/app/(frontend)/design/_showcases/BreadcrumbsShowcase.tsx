/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION (fil d'Ariane, maquette 25) */
'use client';

import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {ChevronRightIcon, HomeIcon} from '@/theme/icons/nucleo';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

function Trail() {
  return (
    <Breadcrumbs label="Fil d'Ariane" separator={<ChevronRightIcon width={12} height={12} />}>
      <BreadcrumbItem href="#" startIcon={<HomeIcon width={14} height={14} />}><VisuallyHidden>Accueil</VisuallyHidden></BreadcrumbItem>
      <BreadcrumbItem href="#">Solutions</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Chiffrage instantané</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export default function BreadcrumbsShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le fil d'Ariane : 12 px (exception à la règle des 14), capitales espacées, gris, silo au survol, chevrons Nucleo en couleur silo, page courante en encre secondaire. L'accueil est l'icône maison, le mot reste pour les lecteurs d'écran. Sous un haut de page, il vit dans une bande papier bordée de 50 px, sur une seule ligne, qui défile latéralement si le fil est trop long.</Text>
      <Trail />
      <BreadcrumbBand items={[{label: 'Solutions', href: '#'}, {label: 'Chiffrage', href: '#'}, {label: 'Métrés', href: '#'}, {label: 'Estimatif détaillé', href: '#'}]} current="Un fil volontairement trop long pour tenir sur la ligne, qui défile latéralement" />
      <Theme theme={theme} mode="dark">
        <VStack padding={4} style={{background: 'var(--color-background-body)'}}><Trail /></VStack>
      </Theme>
    </VStack>
  );
}

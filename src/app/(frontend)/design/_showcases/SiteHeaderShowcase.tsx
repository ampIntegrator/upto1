/* Composant propre au design system : src/components/SiteHeader (en-tête du site, assemblage TopNav + bandeau + repli + tonalité). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {SiteHeader} from '@/components/SiteHeader';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {SITE_HEADER} from '../_ui/siteNav';

export default function SiteHeaderShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        L'en-tête complet : bandeau utilitaire (coordonnées, horaires, réseaux), barre avec logo, navigation (méga-menu, sous-menu, liens), recherche, langue, connexion et appel à l'action. Fixé en haut de page, il replie le bandeau et se condense au défilement. Posé sur un hero média ou nuit, il est sombre et translucide jusqu'au premier défilement. Sous 1280 px, burger et tiroir. Toutes les données viennent d'un seul objet, celui que le back-office remplira. Voir la page « Mise en page » pour le comportement au défilement.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Clair</Heading>
        <Text type="supporting">Survolez Solutions (méga-menu) et Ressources (sous-menu).</Text>
        <VStack style={{border: 'var(--border-width) solid var(--color-border)', minHeight: 420}}>
          <SiteHeader {...SITE_HEADER} fixed={false} currentHref="#tarifs" />
        </VStack>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Sombre, posé sur un hero</Heading>
        <Text type="supporting">Tonalité dark : fond translucide sombre, textes blancs, connexion en fantôme.</Text>
        <Theme theme={theme} mode="dark">
          <VStack style={{background: 'var(--color-night) url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=60) center / cover', minHeight: 320}}>
            <SiteHeader {...SITE_HEADER} fixed={false} tone="dark" />
          </VStack>
        </Theme>
      </VStack>
    </VStack>
  );
}

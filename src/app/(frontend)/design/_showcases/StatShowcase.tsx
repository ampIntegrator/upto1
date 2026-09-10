/* Composant propre au design system : src/components/Stat (chiffre clé) + barre de chiffres (assemblage). */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Stat} from '@/components/Stat';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {STATS_BARS, StatsBar} from '../_ui/StatsBar';

export default function StatShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le chiffre clé : grand nombre couleur silo, préfixe et suffixe en highlight à 62 % du nombre, sous-libellé en capitales espacées. Seul, en taille barre (40 px) ou carte (40 à 52 px). La barre de chiffres est un assemblage : Section avec filets, Container, libellé centré, puis une grille de deux à six cases sur fond highlight-light.
      </Text>

      <VStack gap={3}>
        <Heading level={3}>Chiffre seul</Heading>
        <Grid columns={{minWidth: 160, max: 4}} gap={6}>
          <Stat value="850" suffix="+" label="Courtiers actifs" />
          <Stat value="34" prefix="+" suffix="%" label="Closing rate" />
          <Stat value="21 600" suffix="€" label="Gagnés par mois" align="center" />
          <Stat value="30/09" size="card" label="Date limite" />
        </Grid>
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>Barres de chiffres</Heading>
        <Text type="supporting">Libellé centré, puis quatre, trois ou deux cases à largeur égale, chacune centrée sur fond highlight-light.</Text>
        <VStack gap={6}>
          {STATS_BARS.map((b) => <StatsBar key={b.label} {...b} />)}
        </VStack>
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Theme theme={theme} mode="dark">
          <VStack gap={6} padding={6} style={{background: 'var(--color-background-body)'}}>
            <StatsBar {...STATS_BARS[0]} background="night" />
            <StatsBar {...STATS_BARS[2]} background="night" />
          </VStack>
        </Theme>
      </VStack>
    </VStack>
  );
}

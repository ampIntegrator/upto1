'use client';

/* Barre de chiffres (maquette 04-statsBar) : assemblage Section (filets, padding xs)
   > Container > libellé + Divider vertical + grille de Stat. Deux à quatre chiffres. */
import {Divider} from '@astryxdesign/core/Divider';
import {Grid} from '@astryxdesign/core/Grid';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section, type SectionBackground} from '@/components/Section';
import {Stat, type StatProps} from '@/components/Stat';

export type StatsBarProps = {
  label: string;
  stats: Array<Pick<StatProps, 'value' | 'prefix' | 'suffix' | 'label'>>;
  /** aligné à gauche (3–4 chiffres) ou centré (2 chiffres) */
  align?: 'start' | 'center';
  background?: SectionBackground;
};

export function StatsBar({label, stats, align = 'start', background = 'paper'}: StatsBarProps) {
  const n = Math.min(4, Math.max(2, stats.length));
  return (
    <Section background={background} spacing="xs" dividers edge={false}>
      <Container>
        <HStack gap={10} vAlign="center" hAlign={align === 'center' ? 'center' : 'start'} wrap="wrap">
          <HStack gap={6} vAlign="center">
            <Text type="tag" weight="semibold" color="secondary" style={{letterSpacing: '0.16em', whiteSpace: 'nowrap'}}>{label}</Text>
            <HStack height={42}><Divider orientation="vertical" /></HStack>
          </HStack>
          <Grid columns={align === 'center' ? n : {minWidth: 150, max: n}} columnGap={10} rowGap={8} style={align === 'center' ? undefined : {flex: '1 1 420px'}}>
            {stats.map((s, i) => <Stat key={i} {...s} size="bar" />)}
          </Grid>
        </HStack>
      </Container>
    </Section>
  );
}

/** Les trois barres de la maquette. */
export const STATS_BARS: StatsBarProps[] = [
  {label: 'Ils chiffrent avec nous', stats: [
    {value: '850', suffix: '+', label: 'Courtiers actifs'},
    {value: '4,9', suffix: '/ 5', label: 'Satisfaction'},
    {value: '50', suffix: 'K+', label: 'Chantiers analysés'},
    {value: '34', prefix: '+', suffix: '%', label: 'Closing rate'},
  ]},
  {label: 'En quelques chiffres', stats: [
    {value: '20', suffix: 'min', label: 'Pour un chiffrage'},
    {value: '48', suffix: 'h', label: 'Validation expert'},
    {value: '8', prefix: '±', suffix: '%', label: 'Précision estimée'},
  ]},
  {label: "L'impact business", align: 'center', stats: [
    {value: '2', prefix: '×', suffix: 'ROI', label: 'Dès le 1er trimestre'},
    {value: '21 600', suffix: '€', label: 'Gagnés par mois'},
  ]},
];

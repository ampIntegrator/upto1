'use client';

/* Barre de chiffres (maquette 04, revue le 10 sept.) : Section paper à filets >
   Container > libellé centré sur une ligne, puis une grille de 2, 3, 4 ou 6 cases à
   largeur égale (avec gap) ; chaque case est centrée sur fond highlight-light. */
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section, type SectionBackground} from '@/components/Section';
import {Stat, type StatProps} from '@/components/Stat';

export type StatsBarProps = {
  label: string;
  stats: Array<Pick<StatProps, 'value' | 'prefix' | 'suffix' | 'label'>>;
  background?: SectionBackground;
};

export function StatsBar({label, stats, background = 'paper'}: StatsBarProps) {
  // 2, 3, 4 ou 6 chiffres (réglage Payload à venir)
  const n = Math.min(6, Math.max(2, stats.length));
  return (
    <Section background={background} spacing="xs" dividers edge={false}>
      <Container gap={6}>
        <VStack align="center">
          <Text type="tag" weight="semibold" color="secondary" style={{fontFamily: 'var(--font-family-body)', fontSize: '12.5px', letterSpacing: '0.16em', textAlign: 'center'}} /* maquette .stat-label : Geist semibold 12,5 */>{label}</Text>
        </VStack>
        <Grid columns={{minWidth: n > 4 ? 150 : 220, max: n}} gap={6}>
          {stats.map((s) => (
            <VStack key={s.label ?? s.value} align="center" padding={6} style={{background: 'var(--color-highlight-light)'}}>
              <Stat {...s} size="bar" align="center" />
            </VStack>
          ))}
        </Grid>
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
  {label: "L'impact business", stats: [
    {value: '2', prefix: '×', suffix: 'ROI', label: 'Dès le 1er trimestre'},
    {value: '21 600', suffix: '€', label: 'Gagnés par mois'},
  ]},
];

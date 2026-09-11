'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Button} from '@/components/Button';
import {Card} from '@/components/Card';
import {ORBITA_THEMES, SILO_LABELS, SILO_NAMES, SILOS, type SiloName} from '@/theme';

/** Valeurs de la maquette Orbita (orbita.css), avant l'harmonisation du 9 sept. 2026. */
const BEFORE: Record<SiloName, {highlight: string; highlightDeep: string}> = {
  blue:    {highlight: '#10E0C8', highlightDeep: '#0A9E8E'},
  green:   {highlight: '#90D150', highlightDeep: '#5AA81F'},
  orange:  {highlight: '#F5C403', highlightDeep: '#C99700'},
  violet:  {highlight: '#C77DFF', highlightDeep: '#9D4EDD'},
  magenta: {highlight: '#FF7AC4', highlightDeep: '#C42E86'},
  ambre:   {highlight: '#F5CE5B', highlightDeep: '#B5810F'},
};

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.';

function overrides(h: string, hd: string): React.CSSProperties {
  return {
    '--color-highlight': `light-dark(${h}, ${h})`,
    '--color-highlight-deep': `light-dark(${hd}, ${h})`,
    '--color-highlight-muted': `light-dark(color-mix(in srgb, ${h} 14%, transparent), color-mix(in srgb, ${h} 22%, transparent))`,
  } as React.CSSProperties;
}

function Cell({silo, mode, label, h, hd, after}: {silo: SiloName; mode: 'light' | 'dark'; label: string; h: string; hd: string; /** surcharge locale des tokens (valeurs « avant ») ; sinon thème compilé */
  after?: boolean}) {
  return (
    <Theme theme={ORBITA_THEMES[silo]} mode={mode}>
      <VStack gap={3} padding={4} style={{background: 'var(--color-background-body)', ...(after ? overrides(h, hd) : {})}}>
        <HStack gap={2} align="center">
          <Text type="tag">{label}</Text>
          <Text type="supporting" style={{fontVariantNumeric: 'tabular-nums'}}>{h} · {hd}</Text>
        </HStack>
        <Card media={{type: 'number', value: '40', prefix: '−', suffix: '%'}} title="Objectif 2030" text={LOREM} />
        <HStack gap={2}>
          <Button variant="high" label="Bouton high" />
          <Button variant="ghost" label="Ghost" />
        </HStack>
      </VStack>
    </Theme>
  );
}

export function HighlightCompare() {
  return (
    <VStack gap={10}>
      {SILO_NAMES.map((silo) => {
        const cur = BEFORE[silo];
        const prop = {highlight: SILOS[silo].highlight, highlightDeep: SILOS[silo].highlightDeep};
        const same = cur.highlight === prop.highlight && cur.highlightDeep === prop.highlightDeep;
        return (
          <VStack key={silo} gap={3}>
            <HStack gap={3} align="end">
              <Heading level={3}>{SILO_LABELS[silo]}</Heading>
              <Text type="supporting">silo {SILOS[silo].primary}{same ? ' · inchangé' : ''}</Text>
            </HStack>
            <Grid columns={{minWidth: 260, max: 4}} gap={3}>
              <Cell silo={silo} mode="light" label="Avant · clair" h={cur.highlight} hd={cur.highlightDeep} after />
              <Cell silo={silo} mode="light" label="Après · clair" h={prop.highlight} hd={prop.highlightDeep} />
              <Cell silo={silo} mode="dark" label="Avant · nuit" h={cur.highlight} hd={cur.highlightDeep} after />
              <Cell silo={silo} mode="dark" label="Après · nuit" h={prop.highlight} hd={prop.highlightDeep} />
            </Grid>
          </VStack>
        );
      })}
    </VStack>
  );
}

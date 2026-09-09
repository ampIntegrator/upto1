'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {OrbitaButton} from '@/components/OrbitaButton';
import {OrbitaCard} from '@/components/OrbitaCard';
import {ORBITA_THEMES, SILO_LABELS, SILO_NAMES, SILOS, type SiloName} from '@/theme';

/** Proposition : highlight / highlight-deep par silo, en complémentaire franche
 *  (référence : bleu indigo → turquoise, écart de teinte ~70°). */
const PROPOSAL: Record<SiloName, {highlight: string; highlightDeep: string}> = {
  blue:    {highlight: SILOS.blue.highlight, highlightDeep: SILOS.blue.highlightDeep},
  green:   {highlight: '#F5B841', highlightDeep: '#B8800A'}, // vert → or
  orange:  {highlight: '#38BDF8', highlightDeep: '#0F7FC0'}, // orange → bleu ciel
  violet:  {highlight: '#A3E635', highlightDeep: '#5C9A0A'}, // violet → lime
  brique:  {highlight: '#2ED3C3', highlightDeep: '#0E9C8F'}, // brique → turquoise
  magenta: {highlight: '#4ADE9B', highlightDeep: '#158F5E'}, // magenta → menthe
  ambre:   {highlight: '#4DA3F0', highlightDeep: '#1F6FCC'}, // ambre → bleu
};

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.';

function overrides(h: string, hd: string): React.CSSProperties {
  return {
    '--color-highlight': `light-dark(${h}, ${h})`,
    '--color-highlight-deep': `light-dark(${hd}, ${h})`,
    '--color-highlight-muted': `light-dark(color-mix(in srgb, ${h} 14%, transparent), color-mix(in srgb, ${h} 22%, transparent))`,
  } as React.CSSProperties;
}

function Cell({silo, mode, label, h, hd, after}: {silo: SiloName; mode: 'light' | 'dark'; label: string; h: string; hd: string; after?: boolean}) {
  return (
    <Theme theme={ORBITA_THEMES[silo]} mode={mode}>
      <VStack gap={3} padding={4} style={{background: 'var(--color-background-body)', ...(after ? overrides(h, hd) : {})}}>
        <HStack gap={2} align="center">
          <Text type="tag">{label}</Text>
          <Text type="supporting" style={{fontVariantNumeric: 'tabular-nums'}}>{h} · {hd}</Text>
        </HStack>
        <OrbitaCard media={{type: 'number', value: '40', prefix: '−', suffix: '%'}} title="Objectif 2030" text={LOREM} />
        <HStack gap={2}>
          <OrbitaButton variant="high" label="Bouton high" />
          <OrbitaButton variant="ghost" label="Ghost" />
        </HStack>
      </VStack>
    </Theme>
  );
}

export function HighlightCompare() {
  return (
    <VStack gap={10}>
      {SILO_NAMES.map((silo) => {
        const cur = SILOS[silo];
        const prop = PROPOSAL[silo];
        const same = cur.highlight === prop.highlight && cur.highlightDeep === prop.highlightDeep;
        return (
          <VStack key={silo} gap={3}>
            <HStack gap={3} align="end">
              <Heading level={3}>{SILO_LABELS[silo]}</Heading>
              <Text type="supporting">silo {cur.primary}{same ? ' · proposition : inchangé' : ''}</Text>
            </HStack>
            <Grid columns={{minWidth: 260, max: 4}} gap={3}>
              <Cell silo={silo} mode="light" label="Avant · clair" h={cur.highlight} hd={cur.highlightDeep} />
              <Cell silo={silo} mode="light" label="Après · clair" h={prop.highlight} hd={prop.highlightDeep} after />
              <Cell silo={silo} mode="dark" label="Avant · nuit" h={cur.highlight} hd={cur.highlightDeep} />
              <Cell silo={silo} mode="dark" label="Après · nuit" h={prop.highlight} hd={prop.highlightDeep} after />
            </Grid>
          </VStack>
        );
      })}
    </VStack>
  );
}

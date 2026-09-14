'use client';

import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Card, type CardProps} from '@/components/Card';
import {CARD_VARIANTS} from '@/fields/sections/cardBlocks';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
const TEXT = 'Une phrase de présentation courte, deux lignes au plus, pour situer le contenu de la carte.';

/** Données de démo d'une variante de carte. */
function demoCard(slug: string): CardProps {
  const v = CARD_VARIANTS[slug];
  const media: CardProps['media'] =
    v.media === 'image' ? {type: 'image', src: IMG, alt: ''}
    : v.media === 'icon' ? {type: 'icon', iconKey: 'calculator'}
    : v.media === 'number' ? {type: 'number', value: '34', prefix: '+', suffix: '%'}
    : {type: 'none'};
  return {
    preset: 'bloc',
    media,
    accentTitle: v.media === 'title',
    title: 'Titre de la carte',
    text: TEXT,
    cta: v.clickable ? {label: 'Découvrir', href: '#'} : undefined,
  };
}

/** Le bloc, seul, dans une boîte de largeur fixe sur le fond de page ; data-apercu cible la capture. */
export function Apercu({slug}: {slug: string}) {
  return (
    <OrbitaThemeProvider fixedSilo="blue" initialMode="light">
      <VStack data-apercu style={{width: 'var(--apercu-width, 360px)', padding: 'var(--spacing-6)', background: 'var(--color-background-body)'}}>
        <Card {...demoCard(slug)} />
      </VStack>
    </OrbitaThemeProvider>
  );
}

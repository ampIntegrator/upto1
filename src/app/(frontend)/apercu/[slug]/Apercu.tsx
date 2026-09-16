'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Card, type CardProps} from '@/components/Card';
import {Media} from '@/components/Media';
import {MediaQuote} from '@/components/MediaQuote';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
const TEXT = 'Une phrase de présentation courte, deux lignes au plus, pour situer le contenu de la carte.';

/** Demo data for a card variant. */
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

/** The block alone, in a fixed-width box on the page background; data-apercu targets the capture. */
export function Apercu({slug}: {slug: string}) {
  return (
    <OrbitaThemeProvider fixedSilo="blue" initialMode="light">
      <VStack data-apercu style={{width: 'var(--apercu-width, 360px)', padding: 'var(--spacing-6)', background: 'var(--color-background-body)'}}>
        {slug === MEDIA_QUOTE_SLUG ? (
          <MediaQuote image={{src: IMG, alt: ''}} text="Le chiffrage juste." size="display-3" overlay={0.45} minHeight={240} sizes="360px" />
        ) : slug === MEDIA_SLUG ? (
          <Media image={{src: IMG, alt: ''}} minHeight={240} sizes="360px" />
        ) : slug === EMPTY_SLUG ? (
          // empty cell: a dashed placeholder, the height of a card
          <VStack hAlign="center" vAlign="center" style={{minHeight: 'calc(var(--spacing-12) * 6)', border: 'var(--border-width) dashed var(--color-border-emphasized)'}}>
            <Text type="label" color="secondary">Case vide</Text>
          </VStack>
        ) : (
          <Card {...demoCard(slug)} />
        )}
      </VStack>
    </OrbitaThemeProvider>
  );
}

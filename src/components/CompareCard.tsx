'use client';

/**
 * CompareCard — la carte comparative (maquette 05-compareCards) : chip et repère à
 * droite, citation, CheckList à filets (coches ou croix). `featured` : cadre silo de
 * 2 px et ombre teintée, repère en or éditorial. Deux cartes (avant / après) ou trois
 * (métiers) dans une Grid de page ; nuit via la Section. Composant à part entière plutôt
 * qu'un preset de Card : son anatomie (citation + liste, pas de titre ni de média) n'a
 * rien en commun avec les cartes éditoriales, et ses props restent lisibles.
 */
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CheckList, type CheckListItem, type CheckTone} from './CheckList';
import {Chip, type ChipTone} from './Chip';
import styles from './CompareCard.module.css';

export type CompareCardProps = {
  chip: {label: string; tone?: ChipTone};
  /** repère à droite du chip (« 3 semaines d'attente », « Closing +34 % ») */
  meta?: string;
  quote: string;
  items: CheckListItem[];
  /** ton des pastilles : coche silo (défaut) ou croix danger */
  tone?: CheckTone;
  featured?: boolean;
};

export function CompareCard({chip, meta, quote, items, tone = 'check', featured}: CompareCardProps) {
  return (
    <VStack as="article" className={styles.card} data-featured={featured || undefined}>
      <HStack justify="between" vAlign="center" gap={2} className={styles.head}>
        <Chip label={chip.label} tone={chip.tone ?? 'accent'} />
        {meta ? <Text type="tag" className={styles.meta}>{meta}</Text> : null}
      </HStack>
      <VStack className={styles.quote}>
        <Blockquote>{quote}</Blockquote>
      </VStack>
      <CheckList items={items} tone={tone} density="divided" />
    </VStack>
  );
}

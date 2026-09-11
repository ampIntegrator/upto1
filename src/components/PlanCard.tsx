'use client';

/**
 * (brique interne de PriceList, pas au catalogue)
 * PlanCard — la carte de palier (maquettes 08 et 09 « Trois volumes ») : tête sur fond
 * atténué (nom, accroche, Price), corps (eyebrow « Tout Solo, plus » + CheckList dense),
 * pied sur fond atténué (bouton pleine largeur, mention, Callout garantie). `featured` :
 * cadre silo, ombre teintée, chip « Populaire » à cheval sur le bord haut, bouton split.
 * Hauteur égale dans une Grid de page ; nuit via la Section.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Button} from './Button';
import {Callout, type CalloutProps} from './Callout';
import {CheckList, type CheckListItem} from './CheckList';
import {Chip} from './Chip';
import {Price} from './Price';
import styles from './PlanCard.module.css';

export type PlanCardProps = {
  name: string;
  tagline?: string;
  price: {value: string; currency?: string; period?: string};
  cta: {label: string; href: string};
  featured?: boolean;
  /** étiquette de la carte mise en avant (« Populaire ») */
  badge?: string;
  /** nom du palier précédent : « Tout Solo, plus » ; sinon « Ce que vous obtenez » */
  inherits?: string;
  /** titre de la liste quand rien n'est hérité */
  featuresLabel?: string;
  features: CheckListItem[];
  /** sous le bouton (« Sans CB · Sans engagement ») */
  mention?: string;
  guarantee?: Pick<CalloutProps, 'title' | 'text'>;
};

export function PlanCard({name, tagline, price, cta, featured, badge = 'Populaire', inherits, featuresLabel = 'Ce que vous obtenez', features, mention, guarantee}: PlanCardProps) {
  return (
    <VStack as="article" className={styles.card} data-featured={featured || undefined}>
      {featured && badge ? <HStack className={styles.badge}><Chip label={badge} tone="cat" /></HStack> : null}
      <VStack gap={1} className={styles.head}>
        <Text className={styles.name}>{name}</Text>
        {tagline ? <Text className={styles.tagline}>{tagline}</Text> : null}
        <HStack paddingBlockStart={3}>
          <Price value={price.value} currency={price.currency} period={price.period ?? '/ mois'} size="plan" />
        </HStack>
      </VStack>
      <VStack gap={3} className={styles.body}>
        <Text type="eyebrow">{inherits ? `Tout ${inherits}, plus` : featuresLabel}</Text>
        <CheckList items={features} density="dense" trailingDivider={false} />
      </VStack>
      <VStack gap={3} className={styles.foot}>
        <Button variant="primary" size="lg" block arrow={featured} label={cta.label} href={cta.href} className={featured ? undefined : styles.solid} />
        {mention ? <Text className={styles.mention}>{mention}</Text> : null}
        {guarantee ? <Callout size="sm" title={guarantee.title} text={guarantee.text} /> : null}
      </VStack>
    </VStack>
  );
}

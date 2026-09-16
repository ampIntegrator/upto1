'use client';

/**
 * PlanCard — the tier card (mockups 08 and 09 « Trois volumes »), one per page column
 * (3 or 4 columns, three or four tiers side by side in a row): head on a muted
 * background (name, tagline, Price), body (eyebrow « Tout Solo, plus » + dense CheckList),
 * foot on a muted background (full-width button, note, guarantee Callout). `featured`:
 * silo border, tinted shadow, « Populaire » chip straddling the top edge, split button.
 * Equal height in a page Grid (the column stretches to the row); night via the Section.
 * PriceList's « columns » variant still places several tiers itself (catalogue).
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Button} from './Button';
import {Callout, type CalloutProps} from './Callout';
import {CheckList, type CheckListItem} from './CheckList';
import {Chip} from './Chip';
import {Price} from './Price';
import {Title, type TitleTag} from './TitleTag';
import styles from './PlanCard.module.css';

export type PlanCardProps = {
  name: string;
  /** HTML element of the name (p by default; a heading for SEO); the look does not change */
  nameTag?: TitleTag;
  tagline?: string;
  price: {value: string; currency?: string; period?: string};
  cta: {label: string; href: string};
  featured?: boolean;
  /** label of the featured card (« Populaire ») */
  badge?: string;
  /** name of the previous tier: « Tout Solo, plus »; otherwise « Ce que vous obtenez » */
  inherits?: string;
  /** list title when nothing is inherited */
  featuresLabel?: string;
  features: CheckListItem[];
  /** below the button (« Sans CB · Sans engagement ») */
  mention?: string;
  guarantee?: Pick<CalloutProps, 'title' | 'text' | 'titleTag'>;
};

export function PlanCard({name, nameTag = 'p', tagline, price, cta, featured, badge = 'Populaire', inherits, featuresLabel = 'Ce que vous obtenez', features, mention, guarantee}: PlanCardProps) {
  return (
    <VStack as="article" className={styles.card} data-featured={featured || undefined}>
      {featured && badge ? <HStack className={styles.badge}><Chip label={badge} tone="cat" /></HStack> : null}
      <VStack gap={1} className={styles.head}>
        <Title tag={nameTag} className={styles.name}>{name}</Title>
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
        {guarantee ? <Callout size="sm" title={guarantee.title} titleTag={guarantee.titleTag} text={guarantee.text} /> : null}
      </VStack>
    </VStack>
  );
}

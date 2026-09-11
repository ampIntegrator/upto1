'use client';

/**
 * PriceCard — la carte de prix unique (maquettes 08 et 09 « Un prix ») : à gauche le détail
 * de l'offre (eyebrow, CheckList dense avec valeurs barrées, ligne « Valeur totale »), à
 * droite sur fond atténué le prix (Price 84 px), le bouton split pleine largeur, la mention
 * et le Callout garantie. 900 px maximum, deux colonnes 1,4 / 1 ; sous 1024 px, une colonne
 * avec le prix en premier. Nuit via la Section.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Button} from './Button';
import {Callout, type CalloutProps} from './Callout';
import {CheckList, type CheckListItem} from './CheckList';
import {Price} from './Price';
import styles from './PriceCard.module.css';

export type PriceCardProps = {
  featuresLabel?: string;
  features: CheckListItem[];
  /** ligne de total sous la liste : libellé + valeur barrée */
  total?: {label: string; value: string};
  priceLabel?: string;
  price: {value: string; currency?: string; period?: string};
  cta: {label: string; href: string};
  mention?: string;
  guarantee?: Pick<CalloutProps, 'title' | 'text'>;
};

export function PriceCard({featuresLabel = 'Ce que vous obtenez', features, total, priceLabel = 'Votre prix', price, cta, mention, guarantee}: PriceCardProps) {
  return (
    <VStack as="article" className={styles.card}>
      <VStack gap={5} className={styles.detail}>
        <Text type="eyebrow">{featuresLabel}</Text>
        <VStack>
          <CheckList items={features} density="dense" />
          {total ? (
            <HStack justify="between" vAlign="center" gap={3} className={styles.total}>
              <Text className={styles.totalLabel}>{total.label}</Text>
              <s className={styles.totalValue}>{total.value}</s>
            </HStack>
          ) : null}
        </VStack>
      </VStack>
      <VStack gap={3} className={styles.side}>
        <Text type="eyebrow" className={styles.priceLabel}>{priceLabel}</Text>
        <Price value={price.value} currency={price.currency} size="single" />
        {price.period ? <Text className={styles.period}>{price.period}</Text> : null}
        <VStack gap={3} paddingBlockStart={4}>
          <Button variant="primary" size="lg" block arrow label={cta.label} href={cta.href} />
          {mention ? <Text className={styles.mention}>{mention}</Text> : null}
          {guarantee ? <Callout title={guarantee.title} text={guarantee.text} /> : null}
        </VStack>
      </VStack>
    </VStack>
  );
}

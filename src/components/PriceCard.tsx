'use client';

/**
 * (internal building block of PriceList, not in the catalog)
 * PriceCard — the single price card (mockups 08 and 09 « Un prix »): on the left the offer
 * details (eyebrow, dense CheckList with struck-through values, « Valeur totale » line), on the
 * right on a muted background the price (Price 84 px), the full-width split button, the note
 * and the guarantee Callout. It fills its column (no cap: the column decides), two columns
 * 1.4 / 1; when its page column is under 720 px, a single column with the price first
 * (container query). Night via the Section.
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
  /** total line below the list: label + struck-through value */
  total?: {label: string; value: string};
  priceLabel?: string;
  price: {value: string; currency?: string; period?: string};
  cta: {label: string; href: string; newTab?: boolean};
  mention?: string;
  guarantee?: Pick<CalloutProps, 'title' | 'text' | 'titleTag'>;
};

export function PriceCard({featuresLabel = 'Ce que vous obtenez', features, total, priceLabel = 'Votre prix', price, cta, mention, guarantee}: PriceCardProps) {
  return (
    <VStack className={styles.host}>
    <VStack as="article" className={styles.card}>
      <VStack gap={5} className={styles.detail}>
        <Text type="eyebrow" data-part="featuresLabel">{featuresLabel}</Text>
        <VStack>
          <CheckList items={features} density="dense" part="features" />
          {total ? (
            <HStack justify="between" vAlign="center" gap={3} className={styles.total}>
              <Text className={styles.totalLabel} data-part="totalLabel">{total.label}</Text>
              <s className={styles.totalValue} data-part="totalValue">{total.value}</s>
            </HStack>
          ) : null}
        </VStack>
      </VStack>
      <VStack gap={3} className={styles.side}>
        <Text type="eyebrow" className={styles.priceLabel} data-part="priceLabel">{priceLabel}</Text>
        <Price value={price.value} currency={price.currency} size="single" part="price" />
        {price.period ? <Text className={styles.period} data-part="price" data-part-kind="field">{price.period}</Text> : null}
        <VStack gap={3} paddingBlockStart={4}>
          <VStack data-part="cta" data-part-kind="link"><Button variant="primary" size="lg" block arrow label={cta.label} href={cta.href} newTab={cta.newTab} /></VStack>
          {mention ? <Text className={styles.mention} data-part="mention">{mention}</Text> : null}
          {guarantee ? <Callout part="guarantee" title={guarantee.title} titleTag={guarantee.titleTag} text={guarantee.text} /> : null}
        </VStack>
      </VStack>
    </VStack>
    </VStack>
  );
}

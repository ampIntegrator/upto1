/**
 * CaseSheet — a case study's fact sheet (mockup 23 .case-info), in the post layout's sidebar:
 * rows of label and text (client with an optional link to its site, category, location,
 * deployment, modules…), then the two mini results and the split call to action. Paper card,
 * sticky 30 px under the collapsed header on wide screens; below 1024 px it sits above the
 * story, not collapsible.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {GlobeIcon} from '@/theme/icons/nucleo';
import {Button} from './Button';
import {Stat} from './Stat';
import styles from './CaseSheet.module.css';

export type CaseSheetRow = {label: string; value: string; /** external link shown as a globe icon after the value */ href?: string; hrefLabel?: string};

export type CaseSheetProps = {
  rows: CaseSheetRow[];
  /** mini results: two at most (mockup 23) */
  results?: {value: string; label: string}[];
  cta?: {label: string; href: string};
};

export function CaseSheet({rows, results = [], cta}: CaseSheetProps) {
  const shown = rows.filter((r) => r.value);
  return (
    <VStack gap={0} className={styles.card}>
      {shown.length ? (
        <VStack as="dl" gap={0} className={styles.list}>
          {shown.map((r) => (
            <VStack key={r.label} gap={1} className={styles.row}>
              <VStack as="dt" gap={0}>
                <Text type="eyebrow-mono" className={styles.label}>
                  {r.label}
                </Text>
              </VStack>
              <HStack as="dd" gap={3} hAlign="between" vAlign="center" className={styles.value}>
                <Text className={styles.valueText}>{r.value}</Text>
                {r.href ? (
                  <a href={r.href} className={styles.link} aria-label={r.hrefLabel ?? r.value} target="_blank" rel="noopener noreferrer">
                    <GlobeIcon width={16} height={16} />
                  </a>
                ) : null}
              </HStack>
            </VStack>
          ))}
        </VStack>
      ) : null}
      {results.length ? (
        <VStack className={styles.results}>
          {results.slice(0, 2).map((r) => (
            <Stat key={`${r.value}-${r.label}`} value={r.value} label={r.label} size="sheet" />
          ))}
        </VStack>
      ) : null}
      {cta ? (
        <VStack className={styles.cta}>
          <Button label={cta.label} href={cta.href} variant="primary" arrow block />
        </VStack>
      ) : null}
    </VStack>
  );
}

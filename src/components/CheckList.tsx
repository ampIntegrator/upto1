'use client';

/**
 * CheckList — liste à puces rondes (maquettes 03 process, 05 compareCards, 08 priceList) :
 * pastille de 18 px, coche blanche sur silo (`tone="check"`) ou croix blanche sur danger
 * (`tone="cross"`). Trois densités :
 *   compact  : sans filet, alignée en haut, 14 px (étapes)
 *   divided  : rangées à filet au-dessus, 15 px, pastille centrée (cartes comparatives)
 *   dense    : rangées serrées à filet dessous, 14 px (tarifs) ; `trailingDivider={false}`
 *              retire le filet du dernier item (carte de palier)
 * Chaque item accepte une valeur de fin de ligne `end` (« 97 € », Geist Mono 12 px barré),
 * ce qui suffit aux tarifs sans second composant. Liste HTML (ul / li) via les piles Astryx.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {CheckIcon, CloseIcon} from '@/theme/icons/nucleo';
import styles from './CheckList.module.css';

export type CheckTone = 'check' | 'cross';
export type CheckListDensity = 'compact' | 'divided' | 'dense';
export type CheckListItem = string | {label: string; tone?: CheckTone; /** valeur en fin de ligne, barrée (tarifs) */ end?: string};

export type CheckListProps = {
  items: CheckListItem[];
  tone?: CheckTone;
  density?: CheckListDensity;
  /** dense : filet sous le dernier item (défaut : oui) */
  trailingDivider?: boolean;
  className?: string;
};

export function CheckList({items, tone = 'check', density = 'compact', trailingDivider = true, className}: CheckListProps) {
  const compact = density === 'compact';
  return (
    <VStack as="ul" gap={compact ? 3 : 0} className={[styles.list, className].filter(Boolean).join(' ')} data-density={density} data-trailing={trailingDivider || undefined}>
      {items.map((it, i) => {
        const item = typeof it === 'string' ? {label: it} : it;
        const t = item.tone ?? tone;
        return (
          <HStack as="li" key={i} gap={3} vAlign={compact ? 'start' : 'center'} justify="between" className={styles.item}>
            <HStack gap={3} vAlign={compact ? 'start' : 'center'} className={styles.main}>
              <i className={styles.dot} data-tone={t} aria-hidden="true">
                {t === 'cross' ? <CloseIcon width={12} height={12} /> : <CheckIcon width={12} height={12} />}
              </i>
              {item.label}
            </HStack>
            {item.end ? <s className={styles.end}>{item.end}</s> : null}
          </HStack>
        );
      })}
    </VStack>
  );
}

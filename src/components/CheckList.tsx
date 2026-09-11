'use client';

/**
 * CheckList — liste à puces rondes (maquettes 03 process, 05 compareCards) : pastille
 * de 18 px, coche blanche sur silo (`tone="check"`) ou croix blanche sur danger
 * (`tone="cross"`, colonne « avant »). Deux densités : compacte, alignée en haut
 * (étapes) ; `divided`, rangées à filets alignées au centre (cartes comparatives).
 * Liste HTML (ul / li) via les piles Astryx ; le ton se règle pour la liste ou par item.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {CheckIcon, CloseIcon} from '@/theme/icons/nucleo';
import styles from './CheckList.module.css';

export type CheckTone = 'check' | 'cross';
export type CheckListItem = string | {label: string; tone?: CheckTone};

export type CheckListProps = {
  items: CheckListItem[];
  tone?: CheckTone;
  /** rangées séparées par un filet, texte 15 px, pastille centrée (maquette 05) */
  divided?: boolean;
  className?: string;
};

export function CheckList({items, tone = 'check', divided = false, className}: CheckListProps) {
  return (
    <VStack as="ul" gap={divided ? 0 : 1.5} className={[styles.list, className].filter(Boolean).join(' ')} data-divided={divided || undefined}>
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label;
        const t = typeof it === 'string' ? tone : (it.tone ?? tone);
        return (
          <HStack as="li" key={i} gap={divided ? 2 : 1.5} vAlign={divided ? 'center' : 'start'} className={styles.item}>
            <i className={styles.dot} data-tone={t} aria-hidden="true">
              {t === 'cross' ? <CloseIcon width={12} height={12} /> : <CheckIcon width={12} height={12} />}
            </i>
            {label}
          </HStack>
        );
      })}
    </VStack>
  );
}

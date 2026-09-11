'use client';

/**
 * Callout — encadré de mise en avant (maquettes 08 et 09 « Garantie 30 jours », 18 et 23
 * callout d'article) : cadre highlight-deep, fond highlight à 12 %, titre 14 px gras,
 * texte 12 px ; eyebrow optionnel en Geist Mono (articles). Nuit : cadre et titre en
 * highlight. Pas le Banner Astryx, qui est un composant de statut avec icône.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './Callout.module.css';

export type CalloutProps = {
  eyebrow?: string;
  title?: string;
  text: string;
  /** rembourrage : `sm` (14 px, cartes de palier) ou `md` (16 px, défaut) */
  size?: 'sm' | 'md';
};

export function Callout({eyebrow, title, text, size = 'md'}: CalloutProps) {
  return (
    <VStack as="aside" gap={1} className={styles.root} data-size={size}>
      {eyebrow ? <Text type="eyebrow-mono" className={styles.eyebrow}>{eyebrow}</Text> : null}
      {title ? <Text className={styles.title}>{title}</Text> : null}
      <Text className={styles.text}>{text}</Text>
    </VStack>
  );
}

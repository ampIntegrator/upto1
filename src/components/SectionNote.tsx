'use client';

/**
 * SectionNote — le pied de bloc « note + appel à l'action » (maquettes 03, 05) :
 * astérisque silo, phrase d'accroche en gras, texte 14 px sur 760 px maximum, et le
 * bouton split à droite ; empilé sous 768 px. Une seule fois pour tous les blocs.
 */
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import styles from './SectionNote.module.css';

export type SectionNoteProps = {
  /** accroche en gras, avant le texte */
  strong?: string;
  text: string;
  /** astérisque silo devant l'accroche (renvoi depuis un titre) */
  asterisk?: boolean;
  cta?: {label: string; href: string; iconKey?: NucleoIconKey};
};

export function SectionNote({strong, text, asterisk = true, cta}: SectionNoteProps) {
  return (
    <HStack gap={8} vAlign="center" justify="between" className={styles.root}>
      <Text type="body" color="secondary" className={styles.note}>
        {asterisk ? <i className={styles.asterisk} aria-hidden="true">*</i> : null}
        {strong ? <strong className={styles.strong}>{strong}</strong> : null}
        {strong ? ' ' : null}
        {text}
      </Text>
      {cta ? <Button variant="primary" size="lg" arrow label={cta.label} href={cta.href} iconKey={cta.iconKey} className={styles.cta} /> : null}
    </HStack>
  );
}

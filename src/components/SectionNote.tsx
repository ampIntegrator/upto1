'use client';

/**
 * SectionNote — the « note + appel à l'action » block footer (mockups 03, 05):
 * silo asterisk, bold tagline, 14 px text at 760 px max, and the
 * split button on the right; stacked below 768 px. Defined once for all blocks.
 */
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import styles from './SectionNote.module.css';

export type SectionNoteProps = {
  /** bold tagline, before the text */
  strong?: string;
  text: string;
  /** silo asterisk before the tagline (reference from a title) */
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

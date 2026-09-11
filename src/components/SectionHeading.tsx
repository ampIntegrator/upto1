'use client';

/**
 * SectionHeading — l'en-tête de section (maquette 15-sectionHeading) : eyebrow à
 * tirets or, titre display avec accent serif (format TitleText : retours à la ligne
 * et <span>), chapô, appel à l'action. Centré sur 820 px par défaut ; `align="start"`
 * pour une tête alignée à gauche. Nuit : hérite du <Theme mode="dark"> de la Section.
 * Le futur bloc Payload « En-tête de section » remplit ces champs, et les blocs étapes,
 * comparatif et témoignages l'embarquent en tête. (Le mot contouré derrière le titre de
 * la maquette 07 a été retiré : point de maquette amendé le 11 sept. 2026.)
 */
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import {renderTitle, type TitleText} from './TitleText';
import styles from './SectionHeading.module.css';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: TitleText;
  /** niveau HTML (h2 par défaut ; h1 pour une page sans haut de page) */
  level?: 1 | 2 | 3;
  /** taille du titre : display-2 (64 px max, défaut) ou display-3 */
  size?: 'display-2' | 'display-3';
  text?: string;
  cta?: {label: string; href: string; iconKey?: NucleoIconKey};
  align?: 'center' | 'start';
};

export function SectionHeading({eyebrow, title, level = 2, size = 'display-2', text, cta, align = 'center'}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <VStack gap={6} align={center ? 'center' : 'start'} className={styles.root} data-align={align}>
      {eyebrow ? <Text type="eyebrow-lines">{eyebrow}</Text> : null}
      <Heading level={level} type={size} className={styles.title}>
        {renderTitle(title)}
      </Heading>
      {text ? <Text type="large" color="secondary" className={styles.text}>{text}</Text> : null}
      {cta ? (
        <HStack paddingBlockStart={4}>
          <Button variant="primary" size="lg" arrow label={cta.label} href={cta.href} iconKey={cta.iconKey} />
        </HStack>
      ) : null}
    </VStack>
  );
}

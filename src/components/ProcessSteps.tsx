'use client';

/**
 * ProcessSteps — le panneau d'étapes (maquette 03-process) : 2 à 4 étapes côte à côte
 * dans un cadre papier ombré, séparées par le dégradé signature (vertical ; horizontal
 * quand les étapes s'empilent, sous 1024 px). Une étape = numéro serif droit, chip de
 * durée avec horloge, titre, texte, filet, CheckList. Le nombre de colonnes suit le
 * nombre d'étapes reçues (Payload : 2, 3 ou 4 lignes de tableau). L'en-tête de section
 * et le pied « note + bouton » sont posés autour par le bloc (SectionHeading, SectionNote).
 */
import {Divider} from '@astryxdesign/core/Divider';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CheckList} from './CheckList';
import {Chip} from './Chip';
import styles from './ProcessSteps.module.css';

export type ProcessStep = {
  title: string;
  text: string;
  /** durée affichée dans le chip (« 5 min », « 48 h ») */
  duration?: string;
  checks?: string[];
  /** astérisque silo après le titre (renvoi vers la note du pied) */
  asterisk?: boolean;
};

export function ProcessSteps({steps}: {steps: ProcessStep[]}) {
  const columns = Math.min(Math.max(steps.length, 2), 4);
  return (
    <VStack as="ol" className={styles.panel} style={{'--steps': columns} as React.CSSProperties}>
      {steps.map((s, i) => (
        <VStack as="li" key={i} className={styles.step}>
          <HStack justify="between" vAlign="center" className={styles.head}>
            <Text type="serif-upright" className={styles.num}>{String(i + 1).padStart(2, '0')}</Text>
            {s.duration ? <Chip label={s.duration} tone="high" iconKey="clock" /> : null}
          </HStack>
          <Heading level={3} className={styles.title}>
            {s.title}
            {s.asterisk ? <i className={styles.asterisk} aria-hidden="true">*</i> : null}
          </Heading>
          <Text type="body" color="secondary" className={styles.text}>{s.text}</Text>
          {s.checks?.length ? (
            <>
              <VStack className={styles.rule}><Divider /></VStack>
              <CheckList items={s.checks} />
            </>
          ) : null}
        </VStack>
      ))}
    </VStack>
  );
}

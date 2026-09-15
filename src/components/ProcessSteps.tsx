'use client';

/**
 * ProcessSteps — the steps panel (mockup 03-process): 2 to 4 steps side by side
 * in a shadowed paper frame, separated by the signature gradient (vertical; horizontal
 * when the steps stack, below 1024 px). A step = upright serif number, duration chip
 * with clock, title, text, rule, CheckList. The number of columns follows the
 * number of steps received (Payload: 2, 3 or 4 array rows). The section header
 * and the « note + bouton » footer are placed around it by the block (SectionHeading, SectionNote).
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
  /** duration shown in the chip (« 5 min », « 48 h ») */
  duration?: string;
  checks?: string[];
  /** silo asterisk after the title (reference to the footer note) */
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

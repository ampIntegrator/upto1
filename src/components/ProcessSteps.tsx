'use client';

/**
 * ProcessSteps — the steps panel (mockup 03-process): 1 to 4 steps side by side
 * in a shadowed paper frame, separated by the signature gradient (vertical; horizontal
 * when the steps stack). A step = upright serif number, duration chip with clock,
 * title, text, rule, CheckList. The number of columns follows the number of steps
 * received (Payload: 1 to 4 array rows), and the panel follows the width of its page
 * column, not the screen (container queries): steps stack when each would get less
 * than about 260 px. Capacity by column width: see content-specs.ts (stepsCapacity).
 * The section header and the « note + bouton » footer are placed around it by the block.
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
  const columns = Math.min(Math.max(steps.length, 1), 4);
  return (
    <VStack className={styles.host}>
    <VStack as="ol" className={styles.panel} data-steps={columns} style={{'--steps': columns} as React.CSSProperties}>
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
    </VStack>
  );
}

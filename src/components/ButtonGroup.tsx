'use client';

/**
 * ButtonGroup — one to four site buttons (simple or split, any variant) as a column
 * content, in two modes:
 *
 *   mode="attached"  the buttons form one connected control (Astryx ButtonGroup);
 *                    split buttons may be attached too;
 *   mode="spaced"    one inner column per button, the gap being the section's column gap
 *                    (--section-gap-x, set by PageSections; 24 px elsewhere).
 *
 * width="natural": each button keeps its width, aligned left, centre or right (in the
 * column for « attached », inside its inner column for « spaced »); width="full": the
 * buttons share the whole width (arrow against the edge). Below 640 px of column width
 * the buttons stack. Widths (decided 17 Sept. 2026): a column of 6 to 12; 2 buttons on 6
 * or 7 columns, 3 on 8 or 9, 4 on 12 (content-specs.ts, buttonsCapacity).
 */
import {ButtonGroup as AstryxButtonGroup} from '@astryxdesign/core/ButtonGroup';
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Button} from './Button';
import type {TextBoxButton} from './TextBox';
import styles from './ButtonGroup.module.css';

export type ButtonGroupProps = {
  buttons: TextBoxButton[];
  mode?: 'attached' | 'spaced';
  width?: 'natural' | 'full';
  align?: 'start' | 'center' | 'end';
  /** accessible name of the group (attached mode) */
  label?: string;
};

export function ButtonGroup({buttons, mode = 'spaced', width = 'natural', align = 'start', label = 'Actions'}: ButtonGroupProps) {
  const items = buttons.slice(0, 4);
  if (!items.length) return null;
  const full = width === 'full';
  const render = (b: TextBoxButton, i: number) => (
    <Button key={i} label={b.label} href={b.href} newTab={b.newTab} variant={b.variant ?? 'primary'} size={b.size ?? 'md'} arrow={b.arrow} iconKey={b.arrow ? undefined : b.iconKey} block={full} />
  );
  return (
    <VStack className={styles.root} data-mode={mode} data-width={width} data-align={align} style={{'--buttons': items.length} as React.CSSProperties}>
      {mode === 'attached' ? (
        <VStack className={styles.attached}>
          <AstryxButtonGroup label={label}>{items.map(render)}</AstryxButtonGroup>
        </VStack>
      ) : (
        <VStack className={styles.spaced}>
          {items.map((b, i) => (
            <VStack key={i} className={styles.cell}>
              {render(b, i)}
            </VStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

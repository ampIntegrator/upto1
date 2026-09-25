/**
 * CtaBand — the call-to-action band (mockup 18 .prose-cta, captures _blog-cta2/3/4): a night
 * panel, on the left a 48 px framed highlight icon (or a highlight arrow for the one-line
 * variant), the title in 18 px semibold white and an optional supporting line, on the right a
 * simple site button, never split (Nicolas, 25 Sept. 2026: the band already carries an arrow),
 * highlight by default, with an optional icon. Stacks below 560 px of width.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ArrowRightIcon, NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import type {TextBoxButton} from './TextBox';
import styles from './CtaBand.module.css';

export type CtaBandProps = {
  /** « icon »: framed icon, title and text; « arrow »: an arrow and one line */
  variant?: 'icon' | 'arrow';
  iconKey?: NucleoIconKey;
  title: string;
  text?: string;
  button?: TextBoxButton;
};

export function CtaBand({variant = 'icon', iconKey = 'calculator', title, text, button}: CtaBandProps) {
  const Glyph = NUCLEO_ICONS[iconKey] ?? NUCLEO_ICONS.calculator;
  return (
    <HStack as="aside" gap={5} vAlign="center" wrap="wrap" className={styles.root} data-variant={variant}>
      {variant === 'arrow' ? (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRightIcon width={24} height={24} />
        </span>
      ) : (
        <span className={styles.icon} aria-hidden="true">
          <Glyph width={24} height={24} />
        </span>
      )}
      <VStack gap={1} className={styles.text}>
        <Text className={styles.title}>{title}</Text>
        {text && variant === 'icon' ? <Text className={styles.sub}>{text}</Text> : null}
      </VStack>
      {button ? <Button label={button.label} href={button.href} newTab={button.newTab} variant={button.variant ?? 'high'} size={button.size ?? 'md'} iconKey={button.iconKey} className={styles.button} /> : null}
    </HStack>
  );
}

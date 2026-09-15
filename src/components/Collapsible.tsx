'use client';

/**
 * Collapsible — the accordion item from mockup 11-faq: bordered box,
 * question in Geist 600, plus/minus icon drawn in CSS. When open, the box
 * fills with the silo color (white text and icon). Night: translucent background,
 * plus in highlight, open = same silo fill.
 *
 * Wraps the Astryx Collapsible (accessibility, group coordination,
 * controlled or uncontrolled state). The Astryx chevron is hidden, the answer animates
 * its height (grid 0fr → 1fr) as in the mockup.
 *
 * CollapsibleGroup — several linked items: `type="single"` (strict
 * accordion, only one open) or `"multiple"` (independent), stacked or in two
 * columns. Two groups on the same page are independent.
 */
import {Collapsible as AstryxCollapsible, CollapsibleGroup as AstryxCollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import styles from './Collapsible.module.css';

export type CollapsibleProps = {
  /** the question (trigger content) */
  question: React.ReactNode;
  /** identifier within the group (required inside a CollapsibleGroup) */
  value?: string;
  /** the answer */
  children: React.ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDisabled?: boolean;
};

export function Collapsible({question, value, children, defaultIsOpen = false, isOpen, onOpenChange, isDisabled}: CollapsibleProps) {
  return (
    <VStack className={styles.item}>
      <AstryxCollapsible
        trigger={<span className={styles.question}>{question}<i className={styles.icon} aria-hidden="true" /></span>}
        value={value}
        defaultIsOpen={defaultIsOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDisabled={isDisabled}
      >
        <VStack className={styles.answer}>{children}</VStack>
      </AstryxCollapsible>
    </VStack>
  );
}

export type CollapsibleGroupProps = {
  /** strict accordion (only one open) or free */
  type?: 'single' | 'multiple';
  /** item(s) initially open: an item's `value`, or an array in multiple mode */
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  /** layout: stacked or two columns (a single one below ~900 px) */
  columns?: 1 | 2;
  children: React.ReactNode;
};

export function CollapsibleGroup({type = 'single', defaultValue, value, onChange, columns = 1, children}: CollapsibleGroupProps) {
  return (
    <AstryxCollapsibleGroup type={type} defaultValue={defaultValue} value={value} onChange={onChange}>
      {columns === 2 ? (
        <Grid columns={{minWidth: 420, max: 2}} rowGap={4} columnGap={6} align="start">
          {children}
        </Grid>
      ) : (
        <VStack gap={4}>{children}</VStack>
      )}
    </AstryxCollapsibleGroup>
  );
}

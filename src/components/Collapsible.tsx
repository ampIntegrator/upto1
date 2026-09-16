'use client';

/**
 * Collapsible — the accordion item from mockup 11-faq: bordered box,
 * question in Geist 600, plus/minus icon drawn in CSS. When open, the box
 * fills with the silo color (white text and icon). Night: translucent background,
 * plus in highlight, open = same silo fill.
 *
 * Own accordion mechanics (WAI-ARIA APG accordion pattern): the question is a
 * heading (`tag`: h2, h3, h4, p or span) wrapping the trigger button, which carries
 * aria-expanded and aria-controls; the answer is a region labelled by the button.
 * The Astryx Collapsible was not used because its trigger cannot be wrapped in a
 * heading. The answer animates its height (grid 0fr → 1fr) as in the mockup.
 *
 * CollapsibleGroup — several linked items: `type="single"` (strict
 * accordion, only one open) or `"multiple"` (independent), stacked or in two
 * columns. Two groups on the same page are independent.
 */
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import React, {createContext, useCallback, useContext, useId, useMemo, useState} from 'react';

import styles from './Collapsible.module.css';

export type CollapsibleTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type CollapsibleProps = {
  /** the question (trigger content) */
  question: React.ReactNode;
  /** HTML element of the question, around the button: heading for a FAQ (SEO), p or span otherwise */
  tag?: CollapsibleTag;
  /** identifier within the group (required inside a CollapsibleGroup) */
  value?: string;
  /** the answer */
  children: React.ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDisabled?: boolean;
};

type GroupContext = {isOpen: (value: string) => boolean; toggle: (value: string) => void} | null;
const Group = createContext<GroupContext>(null);

export function Collapsible({question, tag: Tag = 'h3', value, children, defaultIsOpen = false, isOpen, onOpenChange, isDisabled}: CollapsibleProps) {
  const group = useContext(Group);
  const [own, setOwn] = useState(defaultIsOpen);
  const id = useId();
  const open = group && value !== undefined ? group.isOpen(value) : (isOpen ?? own);
  const toggle = () => {
    if (isDisabled) return;
    if (group && value !== undefined) group.toggle(value);
    else if (isOpen === undefined) setOwn(!open);
    onOpenChange?.(!open);
  };
  return (
    <VStack className={styles.item} data-open={open || undefined} data-disabled={isDisabled || undefined}>
      <Tag className={styles.heading}>
        <button type="button" className={styles.trigger} aria-expanded={open} aria-controls={`${id}-answer`} id={`${id}-trigger`} disabled={isDisabled} onClick={toggle}>
          <span className={styles.question}>
            {question}
            <i className={styles.icon} aria-hidden="true" />
          </span>
        </button>
      </Tag>
      <VStack as="section" id={`${id}-answer`} role="region" aria-labelledby={`${id}-trigger`} className={styles.content} aria-hidden={!open}>
        <VStack className={styles.answer}>{children}</VStack>
      </VStack>
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

const toList = (v: string | string[] | undefined): string[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

export function CollapsibleGroup({type = 'single', defaultValue, value, onChange, columns = 1, children}: CollapsibleGroupProps) {
  const [own, setOwn] = useState<string[]>(() => toList(defaultValue));
  const current = value === undefined ? own : toList(value);
  const toggle = useCallback(
    (v: string) => {
      const isOpen = current.includes(v);
      const next = type === 'single' ? (isOpen ? [] : [v]) : isOpen ? current.filter((x) => x !== v) : [...current, v];
      if (value === undefined) setOwn(next);
      onChange?.(type === 'single' ? (next[0] ?? '') : next);
    },
    [current, onChange, type, value],
  );
  const ctx = useMemo<GroupContext>(() => ({isOpen: (v) => current.includes(v), toggle}), [current, toggle]);
  return (
    <Group.Provider value={ctx}>
      {columns === 2 ? (
        <Grid columns={{minWidth: 420, max: 2}} rowGap={4} columnGap={6} align="start">
          {children}
        </Grid>
      ) : (
        <VStack gap={4}>{children}</VStack>
      )}
    </Group.Provider>
  );
}

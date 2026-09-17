'use client';

/**
 * Tabs — the tabs block (mockup 06-tabs) as a column content: the Astryx TabList
 * (layout fill, role tablist, dressed by the theme) above the content panel
 * (.orbita-tab-stack / .orbita-tab-panel, styles.css). Each tab holds rich text
 * (RichText) or any node. All panels share one grid cell, so the block keeps the height
 * of the tallest one; it fills its row when the page grid stretches it.
 *
 * Widths (decided 17 Sept. 2026): a column of 6 to 12; 4 tabs at most on 6 or 7 columns,
 * 6 on 8 or 9, 8 on 12 (content-specs.ts, tabsCapacity); labels up to 50 characters.
 * Each tab keeps a minimum width, so long labels wrap on two lines and, beyond, the bar
 * scrolls horizontally (on mobile too, one line: Astryx recommendation). Keyboard and ARIA
 * come from Astryx.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import React, {useId, useState} from 'react';

import {RichText, type RichTextDocument} from './RichText';
import styles from './Tabs.module.css';

export type TabsItem = {label: string; content: RichTextDocument | React.ReactNode};

export type TabsProps = {
  items: TabsItem[];
  /** tab open on load (0 by default) */
  defaultIndex?: number;
  /** accessible name of the tab list */
  label?: string;
};

const isDocument = (c: TabsItem['content']): c is RichTextDocument => Boolean(c && typeof c === 'object' && 'root' in (c as object));

export function Tabs({items, defaultIndex = 0, label = 'Onglets'}: TabsProps) {
  const id = useId();
  const [value, setValue] = useState(String(Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0))));
  if (!items.length) return null;
  return (
    <VStack className={styles.root}>
      <TabList value={value} onChange={setValue} layout="fill" role="tablist" overflow="scroll" aria-label={label}>
        {items.map((item, i) => (
          <Tab key={i} value={String(i)} label={item.label} panelId={`${id}-panel-${i}`} />
        ))}
      </TabList>
      <VStack className="orbita-tab-stack">
        {items.map((item, i) => {
          const active = String(i) === value;
          return (
            <VStack key={i} id={`${id}-panel-${i}`} role="tabpanel" className="orbita-tab-panel" data-active={active || undefined} aria-hidden={!active} inert={!active}>
              {isDocument(item.content) ? <RichText content={item.content} /> : <VStack gap={4}>{item.content}</VStack>}
            </VStack>
          );
        })}
      </VStack>
    </VStack>
  );
}

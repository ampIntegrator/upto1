'use client';

/**
 * SectionPreviewFrame — the page inside the « Gérer » dialog's iframe (protocol:
 * src/fields/sections/preview.ts).
 *
 * Rendering: says it listens (PREVIEW_READY); for each section the admin sends, hands it to the
 * server (sendSectionPreview), then refreshes the route, which renders it; the previous rendering
 * stays on screen until the next one is ready. Reports the height of what it shows (PREVIEW_SIZE)
 * and where each column is drawn (PREVIEW_LAYOUT).
 *
 * Editing, in the columns (`data-preview-column`, set by PageSections):
 *   - hover: the column is outlined and, once it holds a block, a pencil shows in its corner; the
 *     pencil, or a double click, asks the admin for the column's content panel (PREVIEW_OPEN);
 *   - click: selects the column (PREVIEW_SELECT). On a part a component marked with `data-field`:
 *     a text is typed in place (PREVIEW_EDIT on each keystroke; Enter or leaving keeps it, Escape
 *     gives up), an image or an icon asks the admin to show its field beside it (PREVIEW_PICK).
 *     A text is typed in place only when what is displayed is the stored value, character for
 *     character; otherwise the content panel opens;
 *   - links do not navigate.
 * While a text is being typed the route is not refreshed (the caret would be lost): it is on leaving.
 */
import {IconButton} from '@astryxdesign/core/IconButton';
import {VStack} from '@astryxdesign/core/Stack';
import {useRouter} from 'next/navigation';
import React, {useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react';

import {
  isPreviewData,
  PREVIEW_EDIT,
  PREVIEW_LAYOUT,
  PREVIEW_OPEN,
  PREVIEW_PICK,
  PREVIEW_READY,
  PREVIEW_SELECT,
  PREVIEW_SIZE,
  type PreviewColumn,
  type PreviewColumnBox,
  type PreviewDataMessage,
  previewSelection,
} from '@/fields/sections/preview';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {EditIcon} from '@/theme/icons/nucleo';
import {sendSectionPreview} from './actions';

/** Cursors and the outline of the text being typed: preview only, theme tokens. */
const STYLES = `
[data-preview-column] [data-field] { cursor: text; }
[data-preview-column] [data-field-kind='image'], [data-preview-column] [data-field-kind='icon'] { cursor: pointer; }
[data-preview-editing] { outline: var(--focus-outline-width) var(--focus-outline-style) var(--focus-outline-color); outline-offset: var(--focus-outline-offset); }
`;

const toParent = (message: Record<string, unknown>) => window.parent.postMessage(message, window.location.origin);

/** `data-preview-column="2-1"` → row 2, column 1 */
const columnOf = (el: Element | null): PreviewColumn | null => {
  const m = /^(\d+)-(\d+)$/.exec(el?.getAttribute('data-preview-column') ?? '');
  return m ? {row: Number(m[1]), col: Number(m[2])} : null;
};

/** the stored value of a block's field (`cta.label`), in the section the admin sent */
function storedValue(section: Record<string, unknown> | undefined, at: PreviewColumn, field: string): unknown {
  type Rows = {columns?: {contents?: Record<string, unknown>[]}[]}[];
  const block: unknown = (section?.rows as Rows | undefined)?.[at.row]?.columns?.[at.col]?.contents?.[0];
  return field.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), block);
}

/** the columns of the section that hold a block, as `row-col` keys */
function filledColumns(section: Record<string, unknown>): string[] {
  type Rows = {columns?: {contents?: {blockType?: string}[]}[]}[];
  const rows = (Array.isArray(section.rows) ? section.rows : []) as Rows;
  return rows.flatMap((r, i) => (r.columns ?? []).flatMap((c, j) => (c.contents?.[0]?.blockType && c.contents[0].blockType !== EMPTY_SLUG ? [`${i}-${j}`] : [])));
}

const noSubscription = () => () => {};
const same = (a: PreviewColumn | null, b: PreviewColumn | null) => a?.row === b?.row && a?.col === b?.col;

export function SectionPreviewFrame({frame, children}: {frame: string; children: React.ReactNode}) {
  const router = useRouter();
  const last = useRef(0);
  const latest = useRef<Omit<PreviewDataMessage, 'type'> | null>(null);
  // the element whose text is being typed, and whether a refresh waits for it to end
  const editing = useRef<HTMLElement | null>(null);
  const waiting = useRef(false);
  const [boxes, setBoxes] = useState<PreviewColumnBox[]>([]);
  const [hover, setHover] = useState<PreviewColumn | null>(null);
  const [selected, setSelected] = useState<PreviewColumn | null>(null);
  // the columns that hold a block (`row-col`): only those have a content to edit, hence a pencil
  const [filled, setFilled] = useState<string[]>([]);
  // in the admin's iframe (false for a visitor opening the address, and during server rendering)
  const inFrame = useSyncExternalStore(noSubscription, () => window.parent !== window, () => false);

  // the admin's messages: a section to render, the selected column
  useEffect(() => {
    if (!frame) return;
    const onMessage = async (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== window.parent) return;
      const selection = previewSelection(e.data);
      if (selection !== undefined) return setSelected(selection);
      if (!isPreviewData(e.data)) return;
      const {type: _type, ...input} = e.data;
      latest.current = input;
      setFilled(filledColumns(input.section));
      const n = ++last.current;
      const status = await sendSectionPreview(frame, input).catch(() => 'invalid' as const);
      // a newer section is on its way: only its refresh matters
      if (n !== last.current || status === 'invalid') return;
      if (editing.current) waiting.current = true;
      else router.refresh();
    };
    window.addEventListener('message', onMessage);
    if (window.parent !== window) toParent({type: PREVIEW_READY});
    return () => window.removeEventListener('message', onMessage);
  }, [frame, router]);

  // where the columns are, for this frame's outlines and for the admin's drop zones
  const measure = useCallback(() => {
    const next: PreviewColumnBox[] = [];
    document.querySelectorAll('[data-preview-column]').forEach((el) => {
      const at = columnOf(el);
      const r = el.getBoundingClientRect();
      // a column hidden at this width (an empty one on mobile) has no box
      if (at && r.width > 0 && r.height > 0) next.push({...at, x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height});
    });
    setBoxes(next);
    if (window.parent !== window) toParent({type: PREVIEW_LAYOUT, columns: next});
  }, []);

  // the page is as tall as its content (the site's pages fill the screen), and says how tall
  useEffect(() => {
    if (window.parent === window) return;
    const {documentElement: html, body} = document;
    html.style.minHeight = '0';
    body.style.minHeight = '0';
    const report = () => {
      toParent({type: PREVIEW_SIZE, height: Math.ceil(body.getBoundingClientRect().height)});
      measure();
    };
    report();
    const observer = new ResizeObserver(report);
    observer.observe(body);
    window.addEventListener('resize', report);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', report);
    };
  }, [measure]);
  // a new rendering: the columns may have moved without the page changing size
  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [children, measure]);

  // typing a text in place
  const startEditing = useCallback(
    (el: HTMLElement, at: PreviewColumn, field: string, x: number, y: number) => {
      const original = el.textContent ?? '';
      const send = (value: string) => toParent({type: PREVIEW_EDIT, ...at, field, value});
      editing.current = el;
      el.setAttribute('contenteditable', 'plaintext-only');
      el.setAttribute('data-preview-editing', 'true');
      el.focus();
      // the caret where the click was
      const range = document.caretRangeFromPoint?.(x, y);
      const selection = window.getSelection();
      if (range && selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      const onInput = () => send(el.textContent ?? '');
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          el.blur();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          el.textContent = original;
          send(original);
          el.blur();
        }
      };
      const onBlur = () => {
        el.removeEventListener('input', onInput);
        el.removeEventListener('keydown', onKeyDown);
        el.removeEventListener('blur', onBlur);
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-preview-editing');
        editing.current = null;
        // what the server makes of the text, now that the caret is gone
        if (waiting.current) {
          waiting.current = false;
          router.refresh();
        }
      };
      el.addEventListener('input', onInput);
      el.addEventListener('keydown', onKeyDown);
      el.addEventListener('blur', onBlur);
    },
    [router],
  );

  // clicks, double clicks and hovering in the columns
  useEffect(() => {
    if (window.parent === window) return;
    const tool = (target: Element) => Boolean(target.closest('[data-preview-tool]'));
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (tool(target)) return;
      // the preview is not the site: a link goes nowhere
      if (target.closest('a[href]')) e.preventDefault();
      const columnEl = target.closest('[data-preview-column]');
      const at = columnOf(columnEl);
      if (!at || editing.current?.contains(target)) return;
      const part = target.closest<HTMLElement>('[data-field]');
      const field = part && columnEl?.contains(part) ? part.getAttribute('data-field') : null;
      if (!part || !field) return toParent({type: PREVIEW_SELECT, ...at});
      const kind = part.getAttribute('data-field-kind') ?? 'text';
      if (kind === 'image' || kind === 'icon') {
        const r = part.getBoundingClientRect();
        return toParent({type: PREVIEW_PICK, ...at, field, box: {x: r.left, y: r.top, width: r.width, height: r.height}});
      }
      // typed in place only when what is shown is the stored text itself
      const stored = storedValue(latest.current?.section, at, field);
      if (kind === 'text' && typeof stored === 'string' && stored === part.textContent) {
        toParent({type: PREVIEW_SELECT, ...at});
        return startEditing(part, at, field, e.clientX, e.clientY);
      }
      toParent({type: PREVIEW_OPEN, ...at, field});
    };
    const onDoubleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const at = columnOf(target.closest('[data-preview-column]'));
      // in a text being typed, a double click selects a word, as usual
      if (!at || tool(target) || editing.current?.contains(target)) return;
      toParent({type: PREVIEW_OPEN, ...at});
    };
    const onMove = (e: MouseEvent) => {
      const target = e.target as Element;
      if (tool(target)) return;
      const at = columnOf(target.closest('[data-preview-column]'));
      setHover((current) => (same(current, at) ? current : at));
    };
    const onLeave = () => setHover(null);
    document.addEventListener('click', onClick, true);
    document.addEventListener('dblclick', onDoubleClick);
    document.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('dblclick', onDoubleClick);
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [startEditing]);

  const boxOf = (at: PreviewColumn | null) => (at ? boxes.find((b) => same(b, at)) : undefined);
  const hoverBox = boxOf(hover);
  const selectedBox = boxOf(selected);
  /** an outline drawn over a column, without taking its clicks */
  const outline = (box: PreviewColumnBox, kind: 'hover' | 'selected') => (
    <i
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: box.x,
        top: box.y,
        width: box.width,
        height: box.height,
        pointerEvents: 'none',
        outline: kind === 'selected' ? 'var(--focus-outline-width) solid var(--color-accent)' : 'var(--border-width) dashed var(--color-accent)',
      }}
    />
  );

  return (
    <>
      {children}
      {inFrame ? (
        <>
          <style>{STYLES}</style>
          {selectedBox ? outline(selectedBox, 'selected') : null}
          {hoverBox && !same(hover, selected) ? outline(hoverBox, 'hover') : null}
          {hoverBox && hover && filled.includes(`${hover.row}-${hover.col}`) ? (
            <VStack data-preview-tool="true" style={{position: 'absolute', left: hoverBox.x + hoverBox.width, top: hoverBox.y, transform: 'translate(-100%, 0)', padding: 'var(--spacing-1)'}}>
              <IconButton label="Modifier le contenu de la colonne" tooltip="Modifier le contenu" icon={<EditIcon />} variant="primary" size="sm" elevation="low" onClick={() => toParent({type: PREVIEW_OPEN, ...hover})} />
            </VStack>
          ) : null}
        </>
      ) : null}
    </>
  );
}

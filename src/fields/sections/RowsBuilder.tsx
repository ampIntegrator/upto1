'use client';

/**
 * RowsBuilder — the "builder" view of a section's Rows field, replacing
 * Payload's nested accordions. Shown in the « Découpage » panel of the « Gérer » dialog, above the
 * live preview, which is where the rows and their columns are seen at full size.
 *
 *   - one line of help (never wrapped), then a single strip of layout thumbnails (a rectangle
 *     split in the column proportions): a click replaces the selected row's layout, after confirmation,
 *     a double click adds a row below the selection;
 *   - below, the rows as a line of squares (it scrolls sideways when they do not all fit), from
 *     left to right = from top to bottom in the preview; a square carries the row's number, or
 *     the name typed in its place (a click on it, 22 characters at most), and shows the row's split; it is dragged left or right to reorder the rows
 *     (mouse, touch or keyboard, sortable.tsx, dnd-kit); three buttons, always visible: move,
 *     duplicate, delete; inside a square, a column is dragged left or right to change place in
 *     its row;
 *   - a click on a square selects the row; a click on one of its columns selects the column, a
 *     double click shows the column's content in the dialog's « Contenu » panel (ColumnContent,
 *     through managerContext), or the components if the column is empty.
 *
 * Since 1 Oct. 2026 (Nicolas): no full-size column cells here and no « mobile order » dialog; the
 * stored `mobileOrder` values stay and still apply on the site.
 *
 * All manipulation goes through Payload's form state (useForm, useFormFields),
 * exactly like its own array field.
 */
import {Button, ConfirmationModal, useField, useForm, useFormFields, useModal, useTranslation} from '@payloadcms/ui';
import type {ArrayFieldClient, ArrayFieldClientProps, BlocksFieldClient, ClientBlock} from 'payload';
import {getTranslation} from '@payloadcms/translations';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {EMPTY_SLUG} from './emptyBlock';
import {useManager} from './managerContext';
import {type ColumnSpan, presetLabel, type PresetRow, ROW_NAME_MAX, ROW_PRESETS, spansKey, toSpan} from './grid';
import {type SortableHandle, SortableItem, SortableList} from './sortable';
import {rowWidthError} from './validation';

import './RowsBuilder.scss';

/** filled: the column has a real component (an empty cell does not count) */
/** narrow: minimum width required by the content when the column is too narrow, otherwise null */
/** wide: maximum width allowed by the content when the column is too wide, otherwise null */
type CellSnapshot = {span: ColumnSpan; contents: string[]; types?: string[]; names?: string[]; filled: boolean; narrow: number | null; wide: number | null; mobileOrder: number | null};
type RowSnapshot = {ids?: string[]; name?: string; columns: CellSnapshot[]};

const TILE_H = 40;
const text14: React.CSSProperties = {fontSize: 14, lineHeight: 1.4};
const dim: React.CSSProperties = {color: 'var(--theme-elevation-600)'};

/** Layout thumbnail: one rectangle per column, light on dark, in the width proportions, each showing its width (or a label). */
function Tile({spans, active, labels}: {spans: readonly number[]; active: boolean; labels?: readonly string[]}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'grid',
        gridTemplateColumns: spans.map((s) => `${s}fr`).join(' '),
        gap: 4,
        width: '100%',
        height: TILE_H,
        padding: 4,
        boxSizing: 'border-box',
        borderRadius: 4,
        background: active ? 'var(--theme-elevation-1000)' : 'var(--theme-elevation-150)',
        outline: active ? '2px solid var(--theme-elevation-1000)' : 'none',
      }}>
      {spans.map((s, i) => (
        <span
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
            overflow: 'visible',
            whiteSpace: 'nowrap',
            ...text14,
            lineHeight: 1,
            fontWeight: 600,
            background: active ? 'var(--theme-elevation-0)' : 'var(--theme-elevation-700)',
            color: active ? 'var(--theme-elevation-1000)' : 'var(--theme-elevation-0)',
            borderRadius: 2,
          }}>
          {labels?.[i] ?? s}
        </span>
      ))}
    </span>
  );
}

/**
 * Thumbnails: a click replaces the selected row's layout, a double click adds a row.
 * Preset rows (host option) always add a row, with their blocks placed: a click or a double click.
 * current: spans key of the selected row; currentTypes: first block type of each of its columns.
 */
function PresetTiles({current, currentTypes, presetRows, onReplace, onAdd, onAddPreset, disabled}: {disabled?: boolean; current: string; currentTypes: readonly string[]; presetRows: readonly PresetRow[]; onReplace: (spans: readonly number[]) => void; onAdd: (spans: readonly number[]) => void; onAddPreset: (preset: PresetRow) => void}) {
  const {t} = useAdminText();
  const {i18n} = useTranslation();
  /** the selected row matches a preset row: same widths and the preset's blocks in place */
  const matchesPreset = (p: PresetRow) => spansKey(p.spans) === current && p.blocks.every((slug, j) => !slug || currentTypes[j] === slug);
  const presetActive = presetRows.some(matchesPreset);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const click = (spans: readonly number[]) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      onReplace(spans);
    }, 220);
  };
  const dblClick = (spans: readonly number[]) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    onAdd(spans);
  };
  /** a preset row: click and double click both add one row (the timer swallows the double click's two clicks) */
  const presetClick = (preset: PresetRow) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = null;
      onAddPreset(preset);
    }, 220);
  };
  const presetDblClick = (preset: PresetRow) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    onAddPreset(preset);
  };
  return (
    <div role="radiogroup" aria-label={t(T.builder.layout)} style={{display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: 8}}>
      {ROW_PRESETS.map((spans) => {
        // active as soon as the widths match, in any order (unless a preset row describes the row better)
        const active = spansKey(spans) === current && !presetActive;
        const label = presetLabel(spans);
        return (
          <button
            key={spans.join('-')}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={t(T.builder.tileTitle, {label})}
            onClick={() => click(spans)}
            onDoubleClick={() => dblClick(spans)}
            disabled={disabled}
            style={{display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1}}>
            <Tile spans={spans} active={active} />
          </button>
        );
      })}
      {presetRows.map((p) => {
        const label = getTranslation(p.label, i18n);
        const active = matchesPreset(p);
        return (
          <button
            key={`preset-${p.id}`}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={t(T.builder.presetTileTitle, {label})}
            onClick={() => presetClick(p)}
            onDoubleClick={() => presetDblClick(p)}
            disabled={disabled}
            style={{display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1}}>
            <Tile spans={p.spans} active={active} labels={p.spans.map((s, j) => (j === 0 ? label : String(s)))} />
          </button>
        );
      })}
    </div>
  );
}

/**
 * A column of a row square: its width, filled or empty. Dragged left or right, it changes place in
 * its row (mouse or touch; at the keyboard, Alt + left / right arrow); a click selects it, a
 * double click (or Enter) shows its content in the dialog's « Contenu » panel.
 */
function MiniCell({cell, index, current, onSelect, onOpen, onShift, drag}: {cell: CellSnapshot; index: number; current: boolean; onSelect: () => void; onOpen: () => void; onShift: (by: -1 | 1) => void; drag?: SortableHandle}) {
  const {t} = useAdminText();
  const empty = !cell.filled;
  const issue = cell.narrow ? t(T.builder.narrow, {min: cell.narrow}) : cell.wide ? t(T.builder.wide, {max: cell.wide}) : null;
  const hint = empty ? t(T.builder.cellEmptyTitle) : t(T.builder.cellEditTitle, {contents: cell.contents.join(', ')});
  // pointer listeners only (the keyboard has its own shortcut), kept from the square around: it would drag the row
  const {onMouseDown, onTouchStart} = (drag?.listeners ?? {}) as {onMouseDown?: (e: React.MouseEvent) => void; onTouchStart?: (e: React.TouchEvent) => void};
  return (
    <button
      ref={drag?.setNodeRef}
      type="button"
      className="rows-builder__mini"
      data-empty={empty ? 'true' : undefined}
      data-issue={issue ? 'true' : undefined}
      data-dragging={drag?.isDragging ? 'true' : undefined}
      data-current={current ? 'true' : undefined}
      aria-label={t(T.builder.cellAria, {n: index + 1, span: cell.span, contents: empty ? null : cell.contents.join(', ')})}
      title={[issue, hint, drag ? t(T.builder.moveColumnTitle) : null].filter(Boolean).join(' · ')}
      style={{transform: drag?.transform, transition: drag?.transition}}
      onMouseDown={(e) => {
        onMouseDown?.(e);
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        if (drag && e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault();
          onShift(e.key === 'ArrowLeft' ? -1 : 1);
        }
        // Enter: the keyboard's double click (the button's own click, on Space, selects)
        if (e.key === 'Enter') {
          e.preventDefault();
          onOpen();
        }
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}>
      {cell.span}
    </button>
  );
}

/**
 * The name of a row square: its number until it is named. A click turns it into a text input
 * (ROW_NAME_MAX characters at most); Enter or leaving the input keeps the name, Escape gives up.
 */
function RowName({index, name, readOnly, onChange}: {index: number; name: string; readOnly?: boolean; onChange: (name: string) => void}) {
  const {t} = useAdminText();
  const [draft, setDraft] = useState<string | null>(null);
  // the square around drags the row and selects it: none of that from here
  const quiet = {onMouseDown: (e: React.SyntheticEvent) => e.stopPropagation(), onTouchStart: (e: React.SyntheticEvent) => e.stopPropagation(), onClick: (e: React.SyntheticEvent) => e.stopPropagation()};
  if (draft !== null) {
    const keep = () => {
      onChange(draft.trim().slice(0, ROW_NAME_MAX));
      setDraft(null);
    };
    return (
      <input
        {...quiet}
        className="rows-builder__square-input"
        type="text"
        autoFocus
        value={draft}
        maxLength={ROW_NAME_MAX}
        placeholder={t(T.builder.rowNamePlaceholder)}
        aria-label={t(T.builder.rowNameEdit, {n: index + 1})}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={keep}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === 'Enter') {
            e.preventDefault();
            keep();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            setDraft(null);
          }
        }}
      />
    );
  }
  if (readOnly) return <span className="rows-builder__square-name">{name || index + 1}</span>;
  return (
    <button
      {...quiet}
      type="button"
      className="rows-builder__square-name"
      aria-label={t(T.builder.rowNameEdit, {n: index + 1})}
      title={t(T.builder.rowNameTitle, {max: ROW_NAME_MAX})}
      onClick={(e) => {
        e.stopPropagation();
        setDraft(name);
      }}
      onKeyDown={(e) => e.stopPropagation()}>
      {name || index + 1}
    </button>
  );
}

/**
 * The layout panel while the rows are not available yet (the host shows them once a first setting
 * is chosen): the same line of text, thumbnails and empty line of squares, disabled, so the panel
 * (and the dialog's top part, which takes its height) is the same before and after.
 */
export function RowsBuilderGhost({presetRows = []}: {presetRows?: PresetRow[]}) {
  const {t} = useAdminText();
  const nothing = () => undefined;
  return (
    <div className="field-type rows-builder">
      <p className="rows-builder__help" title={t(T.builder.helpUnavailable)}>
        {t(T.builder.helpUnavailable)}
      </p>
      <div style={{marginBottom: 12}}>
        <PresetTiles disabled current="" currentTypes={[]} presetRows={presetRows} onReplace={nothing} onAdd={nothing} onAddPreset={nothing} />
      </div>
      <div className="rows-builder__rows" />
    </div>
  );
}

/** minSpans, maxSpans: block slug → minimum and maximum column width; presetRows: thumbnails with blocks placed (clientProps). */
export type RowsBuilderProps = ArrayFieldClientProps & {minSpans?: Record<string, number>; maxSpans?: Record<string, number>; presetRows?: PresetRow[]};

export function RowsBuilder(props: RowsBuilderProps) {
  const {field, path, readOnly, schemaPath: schemaPathFromProps, minSpans = {}, maxSpans = {}, presetRows = []} = props;
  const schemaPath = schemaPathFromProps ?? field.name;
  const {t, language} = useAdminText();
  const {i18n} = useTranslation();
  const columnsField = field.fields.find((f): f is ArrayFieldClient => f.type === 'array' && 'name' in f && f.name === 'columns');
  const columnsSchemaPath = `${schemaPath}.columns`;
  // the content blocks, as Payload gives them to the client: their labels name the cells
  const contentsField = columnsField?.fields.find((f): f is BlocksFieldClient => f.type === 'blocks' && 'name' in f && f.name === 'contents');
  const blockLabels = useMemo(() => {
    const out: Record<string, string> = {};
    for (const b of [...(contentsField?.blocks ?? []), ...(contentsField?.blockReferences ?? [])]) {
      if (typeof b === 'string') continue;
      const block = b as ClientBlock;
      out[block.slug] = getTranslation(block.labels?.singular ?? block.slug, i18n);
    }
    return out;
  }, [contentsField, i18n]);
  const labelOf = useCallback((blockType: string) => blockLabels[blockType] ?? blockType, [blockLabels]);

  const {addFieldRow, dispatchFields, getDataByPath, moveFieldRow, removeFieldRow, setModified} = useForm();
  const {rows = [], errorPaths, showError} = useField<unknown[]>({path});
  const {openModal} = useModal();
  const manager = useManager();
  // selected row: thumbnails act on it; with no selection, they add a row
  const [selected, setSelected] = useState<number | null>(null);
  // destructive action awaiting confirmation: replace the layout or delete a row
  const [pending, setPending] = useState<{kind: 'replace'; row: number; spans: readonly number[]} | {kind: 'remove'; row: number} | null>(null);
  const confirmSlug = `rows-confirm-${path}`;

  // snapshot of the rows: widths and contents, to draw the strips without expanding
  const snapshotJson = useFormFields(([fields]) => {
    const prefix = `${path}.`;
    const out: RowSnapshot[] = [];
    for (const key of Object.keys(fields)) {
      if (!key.startsWith(prefix)) continue;
      const parts = key.slice(prefix.length).split('.');
      const i = Number(parts[0]);
      if (!Number.isInteger(i)) continue;
      out[i] ??= {columns: []};
      if (parts[1] === 'name' && parts.length === 2) out[i].name = String(fields[key]?.value ?? '');
      if (parts[1] !== 'columns') continue;
      if (parts.length === 2) {
        out[i].ids = (fields[key]?.rows ?? []).map((row) => row.id);
        continue;
      }
      const j = Number(parts[2]);
      if (!Number.isInteger(j)) continue;
      out[i].columns[j] ??= {span: 12, contents: [], types: [], filled: false, narrow: null, wide: null, mobileOrder: null};
      if (parts[3] === 'span' && parts.length === 4) out[i].columns[j].span = toSpan(fields[key]?.value);
      if (parts[3] === 'mobileOrder' && parts.length === 4) {
        const v = fields[key]?.value;
        out[i].columns[j].mobileOrder = typeof v === 'number' && Number.isFinite(v) ? v : null;
      }
      if (parts[3] === 'contents' && parts[5] === 'blockType' && parts.length === 6) {
        const k = Number(parts[4]);
        const blockType = String(fields[key]?.value ?? '');
        out[i].columns[j].contents[k] = labelOf(blockType);
        (out[i].columns[j].types ??= [])[k] = blockType;
        if (blockType && blockType !== EMPTY_SLUG) out[i].columns[j].filled = true;
      }
      // display name chosen in the drawer (native blockName)
      if (parts[3] === 'contents' && parts[5] === 'blockName' && parts.length === 6) {
        (out[i].columns[j].names ??= [])[Number(parts[4])] = String(fields[key]?.value ?? '');
      }
    }
    return JSON.stringify(out.map((r) => ({ids: r?.ids ?? [], name: r?.name ?? '', columns: (r?.columns ?? []).map((c) => {
      const span = c?.span ?? 12;
      // width required by the column's component (span registry)
      const need = (c?.types ?? []).reduce((m, t) => Math.max(m, minSpans[t] ?? 0), 0);
      // narrowest maximum among the column's contents (12 when none declares one)
      const cap = (c?.types ?? []).reduce((m, t) => Math.min(m, maxSpans[t] ?? 12), 12);
      return {span, types: (c?.types ?? []).filter(Boolean), contents: (c?.contents ?? []).map((label, k) => c?.names?.[k]?.trim() || label).filter(Boolean), filled: Boolean(c?.filled), narrow: need > span ? need : null, wide: need <= span && span > cap ? cap : null, mobileOrder: c?.mobileOrder ?? null};
    })})));
  });
  const snapshot = useMemo<RowSnapshot[]>(() => JSON.parse(snapshotJson) as RowSnapshot[], [snapshotJson]);

  const setSpans = useCallback(
    (rowIndex: number, spans: readonly number[]) => {
      const columnsPath = `${path}.${rowIndex}.columns`;
      const existing = getDataByPath<unknown[]>(columnsPath);
      const count = Array.isArray(existing) ? existing.length : 0;
      if (count === spans.length) {
        spans.forEach((s, j) => dispatchFields({type: 'UPDATE', path: `${columnsPath}.${j}.span`, value: String(s), valid: true}));
      } else {
        for (let j = count - 1; j >= 0; j--) removeFieldRow({path: columnsPath, rowIndex: j});
        spans.forEach((s, j) => addFieldRow({path: columnsPath, rowIndex: j, schemaPath: columnsSchemaPath, subFieldState: {span: {value: String(s), initialValue: String(s), valid: true}}}));
      }
      setModified(true);
    },
    [addFieldRow, columnsSchemaPath, dispatchFields, getDataByPath, path, removeFieldRow, setModified],
  );

  /**
   * double click: adds a row below the selected row (otherwise at the bottom), which becomes selected.
   * blocks[j]: slug of a block placed in column j (preset rows); Payload's form state completes its fields.
   */
  const addRow = useCallback(
    (spans: readonly number[], blocks: readonly (string | null)[] = []) => {
      const index = selected !== null && selected < rows.length ? selected + 1 : rows.length;
      addFieldRow({path, rowIndex: index, schemaPath});
      spans.forEach((s, j) => addFieldRow({path: `${path}.${index}.columns`, rowIndex: j, schemaPath: columnsSchemaPath, subFieldState: {span: {value: String(s), initialValue: String(s), valid: true}}}));
      blocks.forEach((blockType, j) => {
        if (blockType) addFieldRow({path: `${path}.${index}.columns.${j}.contents`, rowIndex: 0, blockType, schemaPath: `${columnsSchemaPath}.contents`});
      });
      setModified(true);
      setSelected(index);
    },
    [addFieldRow, columnsSchemaPath, path, rows.length, schemaPath, selected, setModified],
  );

  /** click: replaces the selected row's layout; with no selection, adds a row */
  const replaceRow = useCallback(
    (spans: readonly number[]) => {
      if (selected !== null && selected < rows.length) {
        const current = (snapshot[selected]?.columns ?? []).map((c) => c.span);
        if (current.join('|') === spans.join('|')) return; // already this layout: nothing to do
        setPending({kind: 'replace', row: selected, spans});
        openModal(confirmSlug);
      } else addRow(spans);
    },
    [addRow, confirmSlug, openModal, rows.length, selected, snapshot],
  );

  const move = (from: number, to: number) => {
    moveFieldRow({path, moveFromIndex: from, moveToIndex: to});
    setSelected(to);
  };
  const moveColumn = (row: number, from: number, to: number) => {
    if (to < 0 || to >= (snapshot[row]?.columns.length ?? 0)) return;
    moveFieldRow({path: `${path}.${row}.columns`, moveFromIndex: from, moveToIndex: to});
    setModified(true);
  };
  const renameRow = (i: number, name: string) => {
    if (name === (snapshot[i]?.name ?? '')) return;
    dispatchFields({type: 'UPDATE', path: `${path}.${i}.name`, value: name || null, valid: true});
    setModified(true);
  };
  const duplicate = (i: number) => {
    dispatchFields({type: 'DUPLICATE_ROW', path, rowIndex: i});
    setModified(true);
    setSelected(i + 1);
  };
  const remove = (i: number) => {
    removeFieldRow({path, rowIndex: i});
    setSelected(null);
  };
  const askRemove = (i: number) => {
    setPending({kind: 'remove', row: i});
    openModal(confirmSlug);
  };

  /** confirmation text: what will be lost */
  const confirmText = (() => {
    if (!pending) return {heading: '', body: '', label: ''};
    const columns = snapshot[pending.row]?.columns ?? [];
    const filled = columns.filter((c) => c.contents.length > 0).length;
    if (pending.kind === 'remove') {
      // agreement rules (French feminine/masculine, singular/plural) live in the dictionary
      return {heading: t(T.confirm.removeHeading, {n: pending.row + 1}), body: t(T.confirm.removeBody, {columns: columns.length, filled}), label: t(T.confirm.remove)};
    }
    const from = presetLabel(columns.map((c) => c.span));
    const to = presetLabel(pending.spans);
    const body = columns.length === pending.spans.length ? t(T.confirm.replaceWidthsBody, {from, to}) : t(T.confirm.replaceColumnsBody, {from, to, filled});
    return {heading: t(T.confirm.replaceHeading, {n: pending.row + 1}), body, label: t(T.confirm.replace)};
  })();
  const onConfirm = () => {
    if (pending?.kind === 'replace') setSpans(pending.row, pending.spans);
    if (pending?.kind === 'remove') remove(pending.row);
    setPending(null);
  };

  /** a click on a column of a square: its row and the column are selected */
  const selectCell = (row: number, col: number) => {
    setSelected(row);
    manager?.selectColumn({row, col});
  };
  /** a double click: its content shows in the dialog's panel (the components, if the column is empty) */
  const openCell = (row: number, col: number) => {
    setSelected(row);
    manager?.openContent({row, col});
  };

  const selectedSpans = selected !== null ? spansKey((snapshot[selected]?.columns ?? []).map((c) => c.span)) : '';
  const selectedTypes = selected !== null ? (snapshot[selected]?.columns ?? []).map((c) => c.types?.[0] ?? '') : [];

  return (
    <div className="field-type rows-builder" style={{marginBottom: 'var(--base)'}}>
      {/* one line of text, never wrapped (its full text on hover): the panel keeps one height, which the dialog's top part takes */}
      {(() => {
        const failed = Boolean(showError && errorPaths?.length);
        const line = failed ? t(T.builder.rowHasError) : selected === null ? t(T.builder.helpNoSelection) : t(T.builder.helpSelected, {n: selected + 1});
        return (
          <p className="rows-builder__help" data-error={failed ? 'true' : undefined} title={line}>
            {line}
          </p>
        );
      })()}
      {!readOnly ? (
        <div style={{marginBottom: 12}}>
          <PresetTiles current={selectedSpans} currentTypes={selectedTypes} presetRows={presetRows} onReplace={replaceRow} onAdd={(spans) => addRow(spans)} onAddPreset={(p) => addRow(p.spans, p.blocks)} />
        </div>
      ) : null}

      {/* the rows, from left to right = from top to bottom in the preview */}
      <SortableList ids={rows.map((r) => r.id)} axis="x" onMove={move} className="rows-builder__rows">
        {rows.map((row, i) => {
          const snap = snapshot[i] ?? {columns: []};
          const spans = snap.columns.map((c) => c.span);
          const rowError = row.isLoading ? null : rowWidthError(spans, language);
          const isSelected = selected === i;
          const colIds = snap.ids?.length === snap.columns.length ? (snap.ids as string[]) : snap.columns.map((_, j) => `${row.id}-${j}`);
          return (
            <SortableItem key={row.id} id={row.id} disabled={readOnly}>
              {({attributes, listeners, setNodeRef, transform, transition, isDragging}) => (
                <div
                  ref={setNodeRef}
                  {...(readOnly ? null : listeners)}
                  className="rows-builder__square"
                  role="button"
                  tabIndex={0}
                  aria-label={t(T.builder.rowAria, {n: i + 1, selected: isSelected})}
                  aria-pressed={isSelected}
                  data-error={rowError ? 'true' : undefined}
                  data-dragging={isDragging ? 'true' : undefined}
                  title={rowError ?? undefined}
                  onClick={() => setSelected(isSelected ? null : i)}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(isSelected ? null : i);
                    }
                  }}
                  style={{transform, transition}}>
                  <div className="rows-builder__square-head">
                    <RowName index={i} name={snap.name ?? ''} readOnly={readOnly} onChange={(name) => renameRow(i, name)} />
                    {!readOnly ? (
                      <div className="rows-builder__actions" onClick={(e) => e.stopPropagation()}>
                        <button type="button" {...attributes} {...listeners} className="rows-builder__handle" aria-label={t(T.builder.moveRowAria, {n: i + 1})} title={t(T.builder.moveRowTitle)}>
                          ⋮⋮
                        </button>
                        <Button size="small" buttonStyle="pill" onClick={() => duplicate(i)} aria-label={t(T.builder.duplicateAria, {n: i + 1})} tooltip={t(T.builder.duplicate)}>
                          ⧉
                        </Button>
                        <Button size="small" buttonStyle="pill" onClick={() => askRemove(i)} aria-label={t(T.builder.removeAria, {n: i + 1})} tooltip={t(T.builder.remove)}>
                          ✕
                        </Button>
                      </div>
                    ) : null}
                  </div>
                  {row.isLoading ? (
                    <p style={{...text14, ...dim, margin: 0}}>{t(T.builder.loading)}</p>
                  ) : snap.columns.length ? (
                    <div className="rows-builder__square-body" style={{'--rows-builder-cells': spans.map((s) => `${s}fr`).join(' ')} as React.CSSProperties}>
                      <SortableList ids={colIds} axis="x" onMove={(from, to) => moveColumn(i, from, to)} className="rows-builder__minis">
                        {snap.columns.map((cell, j) => (
                          <SortableItem key={colIds[j]} id={colIds[j]} disabled={readOnly}>
                            {(handle) => <MiniCell cell={cell} index={j} current={manager?.column?.row === i && manager.column.col === j} onSelect={() => selectCell(i, j)} onOpen={() => openCell(i, j)} onShift={(by) => moveColumn(i, j, j + by)} drag={readOnly ? undefined : handle} />}
                          </SortableItem>
                        ))}
                      </SortableList>
                    </div>
                  ) : (
                    <p style={{...text14, ...dim, margin: 0}}>{t(T.builder.emptyRow)}</p>
                  )}
                </div>
              )}
            </SortableItem>
          );
        })}
      </SortableList>

      <ConfirmationModal
        modalSlug={confirmSlug}
        heading={confirmText.heading}
        body={confirmText.body}
        confirmLabel={confirmText.label}
        cancelLabel={t(T.confirm.cancel)}
        onConfirm={onConfirm}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}

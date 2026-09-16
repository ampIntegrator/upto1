'use client';

/**
 * RowsBuilder — the "builder" view of a section's Rows field, replacing
 * Payload's nested accordions.
 *
 *   - a single strip of layout thumbnails (a rectangle split in the column
 *     proportions): a click replaces the selected row's layout, after confirmation,
 *     a double click adds a row below the selection;
 *   - the rows stacked below, reordered by drag and drop (handle); on the side, in
 *     two lines of two: move and duplicate, mobile order and delete; in each cell,
 *     a ⋮⋮ handle drags the column left or right within its row (mouse,
 *     touch or keyboard); rows and columns sorted by the same module (sortable.tsx, dnd-kit);
 *   - a row's phone button opens the mobile order dialog for the whole section:
 *     all its columns, across rows, reordered by drag and drop (handle); the columns of the
 *     clicked row are highlighted (hidden field mobileOrder, see mobileOrder.ts);
 *   - a cell summarises its component (one per column), or « Vide »; a first click selects
 *     the row, a click on a cell of the selected row opens a Payload
 *     drawer with the column's component and, if there is one, a « Vider la colonne » button
 *     (width is no longer set there: it comes from the layouts). The form is shared: what is
 *     entered in the drawer is already in the page, the page is saved as usual.
 *
 * All manipulation goes through Payload's form state (useForm, useFormFields),
 * exactly like its own array field; drawer fields are rendered by
 * Payload (RenderFields), with the paths and permissions it expects.
 */
import {Button, ConfirmationModal, Drawer, Modal, RenderFields, useDrawerSlug, useField, useForm, useFormFields, useModal, useTranslation} from '@payloadcms/ui';
import type {ArrayFieldClient, ArrayFieldClientProps, BlocksFieldClient, ClientBlock, ClientField, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import {getTranslation} from '@payloadcms/translations';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {EMPTY_SLUG} from './emptyBlock';
import {hasMobileOrder, mobileSequence} from './mobileOrder';
import {type ColumnSpan, presetLabel, ROW_PRESETS, spansKey, toSpan} from './grid';
import {type SortableHandle, SortableItem, SortableList} from './sortable';
import {rowWidthError} from './validation';

import './RowsBuilder.scss';

/** filled: the column has a real component (an empty cell does not count) */
/** narrow: minimum width required by the component when the column is too narrow, otherwise null */
type CellSnapshot = {span: ColumnSpan; contents: string[]; types?: string[]; names?: string[]; filled: boolean; narrow: number | null; mobileOrder: number | null};
type RowSnapshot = {ids?: string[]; columns: CellSnapshot[]};

const TILE_H = 40;
const text14: React.CSSProperties = {fontSize: 14, lineHeight: 1.4};
const dim: React.CSSProperties = {color: 'var(--theme-elevation-600)'};

/** Phone icon (stroke, text colour). */
function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

/** Layout thumbnail: one rectangle per column, light on dark, in the width proportions. */
function Tile({spans, active}: {spans: readonly number[]; active: boolean}) {
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
      {spans.map((_, i) => (
        <span key={i} style={{background: active ? 'var(--theme-elevation-0)' : 'var(--theme-elevation-700)', borderRadius: 2}} />
      ))}
    </span>
  );
}

/** Thumbnails: a click replaces the selected row's layout, a double click adds a row. */
function PresetTiles({current, onReplace, onAdd}: {current: string; onReplace: (spans: readonly number[]) => void; onAdd: (spans: readonly number[]) => void}) {
  const {t} = useAdminText();
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
  return (
    <div role="radiogroup" aria-label={t(T.builder.layout)} style={{display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 8}}>
      {ROW_PRESETS.map((spans) => {
        // active as soon as the widths match, in any order
        const active = spansKey(spans) === current;
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
            style={{display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer'}}>
            <Tile spans={spans} active={active} />
          </button>
        );
      })}
    </div>
  );
}

/** What a sortable cell receives (sortable.tsx module). */
type DragProps = SortableHandle;

/** A row cell: handle to drag it left or right, width in a corner, component summary, click to open the drawer. */
/** rowSelected: the cell's row is selected; otherwise a click only selects it */
function Cell({cell, index, rowSelected, onOpen, drag}: {cell: CellSnapshot; index: number; rowSelected: boolean; onOpen: () => void; drag?: DragProps}) {
  const {t} = useAdminText();
  const empty = !cell.filled;
  const onHandleKeyDown = drag?.listeners.onKeyDown;
  return (
    <div
      ref={drag?.setNodeRef}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }
      }}
      aria-label={t(T.builder.cellAria, {n: index + 1, span: cell.span, contents: empty ? null : cell.contents.join(', ')})}
      title={rowSelected ? (empty ? t(T.builder.cellEmptyTitle) : t(T.builder.cellEditTitle, {contents: cell.contents.join(', ')})) : t(T.builder.cellSelectTitle)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minWidth: 0,
        minHeight: 72,
        padding: '26px 8px 8px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: 4,
        border: cell.narrow ? '2px solid var(--theme-error-500)' : `1px ${empty ? 'dashed' : 'solid'} var(--theme-elevation-${empty ? '300' : '400'})`,
        background: empty ? 'var(--theme-elevation-50)' : 'var(--theme-elevation-0)',
        color: 'var(--theme-elevation-1000)',
        transform: drag?.transform,
        transition: drag?.transition,
        zIndex: drag?.isDragging ? 2 : undefined,
        boxShadow: drag?.isDragging ? '0 6px 20px rgba(0, 0, 0, 0.35)' : undefined,
        ...text14,
      }}>
      {drag ? (
        <button
          type="button"
          {...drag.attributes}
          {...drag.listeners}
          className="rows-builder__handle rows-builder__handle--cell"
          aria-label={t(T.builder.moveColumnAria, {n: index + 1})}
          title={t(T.builder.moveColumnTitle)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            onHandleKeyDown?.(e);
            e.stopPropagation();
          }}>
          ⋮⋮
        </button>
      ) : null}
      <span style={{position: 'absolute', top: 4, right: 8, ...dim}}>{cell.span}/12</span>
      {empty ? (
        <span style={{...dim, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{cell.contents.length ? cell.contents.join(', ') : t(T.builder.empty)}</span>
      ) : (
        cell.contents.map((label, k) => (
          <span key={k} style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            {label}
          </span>
        ))
      )}
      {cell.narrow ? <span style={{color: 'var(--theme-error-500)'}}>{t(T.builder.narrow, {min: cell.narrow})}</span> : null}
    </div>
  );
}

/** minSpans: block slug → minimum column width, passed by the field config (clientProps). */
export type RowsBuilderProps = ArrayFieldClientProps & {minSpans?: Record<string, number>};

export function RowsBuilder(props: RowsBuilderProps) {
  const {field, path, permissions, readOnly, schemaPath: schemaPathFromProps, minSpans = {}} = props;
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
  const {openModal, closeModal} = useModal();
  const drawerSlug = useDrawerSlug(`rows-builder-${path}`);
  const [open, setOpen] = useState<{row: number; col: number} | null>(null);
  // selected row: thumbnails act on it; with no selection, they add a row
  const [selected, setSelected] = useState<number | null>(null);
  // row from which the "mobile order" dialog was opened (highlighted in the list)
  const [mobileRow, setMobileRow] = useState<number | null>(null);
  const mobileSlug = `rows-mobile-${path}`;
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
      if (parts[1] !== 'columns') continue;
      if (parts.length === 2) {
        out[i].ids = (fields[key]?.rows ?? []).map((row) => row.id);
        continue;
      }
      const j = Number(parts[2]);
      if (!Number.isInteger(j)) continue;
      out[i].columns[j] ??= {span: 12, contents: [], types: [], filled: false, narrow: null, mobileOrder: null};
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
    return JSON.stringify(out.map((r) => ({ids: r?.ids ?? [], columns: (r?.columns ?? []).map((c) => {
      const span = c?.span ?? 12;
      // width required by the column's component (span registry)
      const need = (c?.types ?? []).reduce((m, t) => Math.max(m, minSpans[t] ?? 0), 0);
      return {span, contents: (c?.contents ?? []).map((label, k) => c?.names?.[k]?.trim() || label).filter(Boolean), filled: Boolean(c?.filled), narrow: need > span ? need : null, mobileOrder: c?.mobileOrder ?? null};
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

  /** double click: adds a row below the selected row (otherwise at the bottom), which becomes selected */
  const addRow = useCallback(
    (spans: readonly number[]) => {
      const index = selected !== null && selected < rows.length ? selected + 1 : rows.length;
      addFieldRow({path, rowIndex: index, schemaPath});
      spans.forEach((s, j) => addFieldRow({path: `${path}.${index}.columns`, rowIndex: j, schemaPath: columnsSchemaPath, subFieldState: {span: {value: String(s), initialValue: String(s), valid: true}}}));
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
    moveFieldRow({path: `${path}.${row}.columns`, moveFromIndex: from, moveToIndex: to});
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

  /** the section's columns flattened, row by row, for the mobile order */
  const flatColumns = useMemo(
    () => snapshot.flatMap((r, row) => r.columns.map((c, col) => ({row, col, span: c.span, contents: c.contents, mobileOrder: c.mobileOrder, empty: !c.filled}))),
    [snapshot],
  );
  /** writes the section's mobile order: position for listed columns, empty for the others */
  const writeMobileOrder = (sequence: number[] | null) => {
    flatColumns.forEach((c, k) => {
      const pos = sequence ? sequence.indexOf(k) : -1;
      dispatchFields({type: 'UPDATE', path: `${path}.${c.row}.columns.${c.col}.mobileOrder`, value: pos >= 0 ? pos : null, valid: true});
    });
    setModified(true);
  };
  const moveMobile = (from: number, to: number) => {
    const sequence = mobileSequence(flatColumns);
    if (to < 0 || to >= sequence.length) return;
    const [moved] = sequence.splice(from, 1);
    sequence.splice(to, 0, moved);
    writeMobileOrder(sequence);
  };
  const openMobile = (row: number) => {
    setMobileRow(row);
    openModal(mobileSlug);
  };

  /** empties the column: removes its component (and its name); final once the page is saved */
  const clearColumn = (row: number, col: number) => {
    const contentsPath = `${path}.${row}.columns.${col}.contents`;
    const existing = getDataByPath<unknown[]>(contentsPath);
    for (let k = (Array.isArray(existing) ? existing.length : 0) - 1; k >= 0; k--) removeFieldRow({path: contentsPath, rowIndex: k});
    setModified(true);
  };

  const openCell = (row: number, col: number) => {
    setSelected(row);
    setOpen({row, col});
    openModal(drawerSlug);
  };

  // drawer permissions: those of a column's subfields (same rule as Payload's array)
  const rowFieldsPerm: SanitizedFieldsPermissions | undefined = permissions === true ? true : permissions?.fields;
  const columnsPerm: SanitizedFieldPermissions | undefined = rowFieldsPerm === true ? true : rowFieldsPerm?.columns;
  const cellPerms = (columnsPerm === true ? true : columnsPerm?.fields) as SanitizedFieldsPermissions;

  const openCellSnapshot = open ? snapshot[open.row]?.columns[open.col] : undefined;
  const rawDescription = field.admin?.description;
  // static description from the config: a string or a Text object (function descriptions are not rendered here)
  const description = typeof rawDescription === 'string' || (rawDescription && typeof rawDescription === 'object') ? getTranslation(rawDescription as Record<string, string> | string, i18n) : undefined;
  const selectedSpans = selected !== null ? spansKey((snapshot[selected]?.columns ?? []).map((c) => c.span)) : '';

  return (
    <div className="field-type rows-builder" style={{marginBottom: 'var(--base)'}}>
      {description ? <p style={{...text14, ...dim, margin: '0 0 12px'}}>{description}</p> : null}
      {!readOnly ? (
        <div style={{marginBottom: 12}}>
          <PresetTiles current={selectedSpans} onReplace={replaceRow} onAdd={addRow} />
          <p style={{...text14, ...dim, margin: '8px 0 0'}}>
            {selected === null ? t(T.builder.helpNoSelection) : t(T.builder.helpSelected, {n: selected + 1})}
          </p>
        </div>
      ) : null}
      {showError && errorPaths?.length ? <p style={{...text14, color: 'var(--theme-error-500)', margin: '0 0 12px'}}>{t(T.builder.rowHasError)}</p> : null}

      <SortableList ids={rows.map((r) => r.id)} axis="y" onMove={move} className="rows-builder__rows">
        {rows.map((row, i) => {
          const snap = snapshot[i] ?? {columns: []};
          const spans = snap.columns.map((c) => c.span);
          const rowError = row.isLoading ? null : rowWidthError(spans, language);
          const isSelected = selected === i;
          const colIds = snap.ids?.length === snap.columns.length ? (snap.ids as string[]) : snap.columns.map((_, j) => `${row.id}-${j}`);
          return (
            <SortableItem key={row.id} id={row.id} disabled={readOnly}>
              {({attributes, listeners, setNodeRef, transform, transition, isDragging}) => (
                <div ref={setNodeRef} style={{display: 'flex', gap: 8, alignItems: 'center', transform, transition, zIndex: isDragging ? 1 : undefined, position: 'relative'}}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={t(T.builder.rowAria, {n: i + 1, selected: isSelected})}
                    aria-pressed={isSelected}
                    onClick={() => setSelected(isSelected ? null : i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelected(isSelected ? null : i);
                      }
                    }}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: 10,
                      borderRadius: 4,
                      border: `2px solid ${isSelected ? 'var(--theme-elevation-1000)' : 'var(--theme-elevation-200)'}`,
                      background: 'var(--theme-elevation-50)',
                      cursor: 'pointer',
                    }}>
                    {rowError ? <p style={{...text14, color: 'var(--theme-error-500)', margin: '0 0 8px'}}>{rowError}</p> : null}
                    {row.isLoading ? (
                      <p style={{...text14, ...dim, margin: 0}}>{t(T.builder.loading)}</p>
                    ) : snap.columns.length ? (
                      <div style={{'--rows-builder-cells': spans.map((s) => `${s}fr`).join(' ')} as React.CSSProperties}>
                        <SortableList ids={colIds} axis="x" onMove={(from, to) => moveColumn(i, from, to)} className="rows-builder__cells">
                          {snap.columns.map((cell, j) => (
                            <SortableItem key={colIds[j]} id={colIds[j]} disabled={readOnly}>
                              {(handle) => <Cell cell={cell} index={j} rowSelected={isSelected} onOpen={() => (isSelected ? openCell(i, j) : setSelected(i))} drag={readOnly ? undefined : handle} />}
                            </SortableItem>
                          ))}
                        </SortableList>
                      </div>
                    ) : (
                      <p style={{...text14, ...dim, margin: 0}}>{t(T.builder.emptyRow)}</p>
                    )}
                  </div>
                  {!readOnly ? (
                    <div className="rows-builder__actions">
                      <button type="button" {...attributes} {...listeners} className="rows-builder__handle" aria-label={t(T.builder.moveRowAria, {n: i + 1})} title={t(T.builder.moveRowTitle)}>
                        ⋮⋮
                      </button>
                      <Button size="small" buttonStyle="pill" onClick={() => duplicate(i)} aria-label={t(T.builder.duplicateAria, {n: i + 1})} tooltip={t(T.builder.duplicate)}>
                        ⧉
                      </Button>
                      <Button size="small" buttonStyle="pill" onClick={() => openMobile(i)} aria-label={t(T.builder.mobileOrderAria, {n: i + 1})} tooltip={t(T.builder.mobileOrder)}>
                        <PhoneGlyph />
                      </Button>
                      <Button size="small" buttonStyle="pill" onClick={() => askRemove(i)} aria-label={t(T.builder.removeAria, {n: i + 1})} tooltip={t(T.builder.remove)}>
                        ✕
                      </Button>
                    </div>
                  ) : null}
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

      <Modal slug={mobileSlug} className="confirmation-modal rows-mobile">
        {mobileRow !== null
          ? (() => {
              const sequence = mobileSequence(flatColumns);
              const empties = flatColumns.filter((c) => c.empty);
              const where = (c: {row: number; col: number; span: number}) => t(T.mobileOrder.where, {row: c.row + 1, col: c.col + 1, span: c.span});
              return (
                <div className="confirmation-modal__wrapper rows-mobile__wrapper">
                  <div className="confirmation-modal__content">
                    <h2 style={{margin: 0}}>{t(T.mobileOrder.heading)}</h2>
                    <p style={{...text14, ...dim}}>{t(T.mobileOrder.intro, {n: mobileRow + 1})}</p>
                  </div>
                  <SortableList ids={sequence.map((k) => `${flatColumns[k].row}-${flatColumns[k].col}`)} axis="y" onMove={moveMobile} className="rows-mobile__list" role="list">
                    {sequence.map((k, pos) => {
                      const c = flatColumns[k];
                      const id = `${c.row}-${c.col}`;
                      return (
                        <SortableItem key={id} id={id}>
                          {(h) => (
                            <div
                              ref={h.setNodeRef}
                              role="listitem"
                              className="rows-mobile__item"
                              data-current={c.row === mobileRow ? 'true' : undefined}
                              style={{position: 'relative', transform: h.transform, transition: h.transition, zIndex: h.isDragging ? 2 : undefined, background: h.isDragging ? 'var(--theme-bg)' : undefined}}>
                              <button type="button" {...h.attributes} {...h.listeners} className="rows-builder__handle rows-builder__handle--mobile" aria-label={t(T.mobileOrder.moveAria, {where: where(c)})} title={t(T.mobileOrder.moveTitle)}>
                                ⋮⋮
                              </button>
                              <span style={{...text14, ...dim}}>{pos + 1}</span>
                              <span style={{...text14, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                {c.contents.join(', ')}
                                <span style={dim}> · {where(c)}</span>
                              </span>
                            </div>
                          )}
                        </SortableItem>
                      );
                    })}
                  </SortableList>
                  {!sequence.length ? <p style={{...text14, ...dim, margin: 0}}>{t(T.mobileOrder.nothing)}</p> : null}
                  {empties.length ? (
                    <ul className="rows-mobile__list">
                      {empties.map((c) => (
                        <li key={`${c.row}-${c.col}`} className="rows-mobile__item" style={dim}>
                          <span style={{...text14, flex: 1}}>
                            {where(c)} · {t(T.mobileOrder.hidden, {emptyCell: c.contents.length > 0})}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="confirmation-modal__controls">
                    <Button size="small" buttonStyle="secondary" disabled={!hasMobileOrder(flatColumns)} onClick={() => writeMobileOrder(null)}>
                      {t(T.mobileOrder.reset)}
                    </Button>
                    <Button size="small" buttonStyle="primary" onClick={() => closeModal(mobileSlug)}>
                      {t(T.mobileOrder.close)}
                    </Button>
                  </div>
                </div>
              );
            })()
          : null}
      </Modal>

      {columnsField ? (
        <Drawer slug={drawerSlug} title={open && openCellSnapshot ? t(T.drawer.title, {row: open.row + 1, col: open.col + 1, span: openCellSnapshot.span}) : t(T.drawer.fallbackTitle)}>
          {open ? (
            <div style={{paddingBottom: 'var(--base)'}}>
              {openCellSnapshot && openCellSnapshot.contents.length > 0 && !readOnly ? (
                <div style={{marginBottom: 'var(--base)'}}>
                  <Button buttonStyle="secondary" onClick={() => clearColumn(open.row, open.col)}>
                    {t(T.drawer.clear)}
                  </Button>
                </div>
              ) : null}
              <RenderFields
                fields={columnsField.fields as ClientField[]}
                parentIndexPath=""
                parentPath={`${path}.${open.row}.columns.${open.col}`}
                parentSchemaPath={columnsSchemaPath}
                permissions={cellPerms}
                readOnly={readOnly}
              />
              <Button buttonStyle="primary" onClick={() => closeModal(drawerSlug)}>
                {t(T.drawer.close)}
              </Button>
            </div>
          ) : null}
        </Drawer>
      ) : null}
    </div>
  );
}

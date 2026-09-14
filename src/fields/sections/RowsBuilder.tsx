'use client';

/**
 * RowsBuilder — la vue « constructeur » du champ Rangées d'une section, à la place des
 * accordéons imbriqués de Payload.
 *
 *   - un seul bandeau de dispositions en vignettes (un rectangle découpé aux proportions des
 *     colonnes) : un clic remplace la disposition de la rangée sélectionnée, un double clic ajoute
 *     une rangée sous la sélection ;
 *   - les rangées empilées dessous, une case par colonne à sa largeur ; sur le côté, monter,
 *     descendre, dupliquer, supprimer ;
 *   - une case résume ses contenus, ou « Vide » ; un clic ouvre un tiroir Payload avec les
 *     champs de cette colonne (largeur, contenus). Le formulaire est partagé : ce qui est
 *     saisi dans le tiroir est déjà dans la page, on enregistre la page comme d'habitude.
 *
 * Toute la manipulation passe par l'état de formulaire de Payload (useForm, useFormFields),
 * exactement comme son propre champ tableau ; le rendu des champs du tiroir est celui de
 * Payload (RenderFields), avec les chemins et permissions qu'il attend.
 */
import {Button, Drawer, RenderFields, useDrawerSlug, useField, useForm, useFormFields, useModal} from '@payloadcms/ui';
import type {ArrayFieldClient, ArrayFieldClientProps, ClientField, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {validateRow, type ColumnSpan} from '@/components/content-specs';
import {contentLabel} from './contentRef';
import {presetLabel, ROW_PRESETS, toSpan} from './presets';

type CellSnapshot = {span: ColumnSpan; contents: string[]};
type RowSnapshot = {columns: CellSnapshot[]};

const TILE_H = 40;
const text14: React.CSSProperties = {fontSize: 14, lineHeight: 1.4};
const dim: React.CSSProperties = {color: 'var(--theme-elevation-600)'};

/** Vignette d'une disposition : un rectangle par colonne, clair sur fond sombre, aux proportions des largeurs. */
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

/** Vignettes : un clic remplace la disposition de la rangée sélectionnée, un double clic ajoute une rangée. */
function PresetTiles({current, onReplace, onAdd}: {current: string; onReplace: (spans: readonly number[]) => void; onAdd: (spans: readonly number[]) => void}) {
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
    <div role="radiogroup" aria-label="Disposition" style={{display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 8}}>
      {ROW_PRESETS.map((spans) => {
        const active = spans.join('|') === current;
        const label = presetLabel(spans);
        return (
          <button
            key={spans.join('-')}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={`${label} · clic : remplacer la rangée sélectionnée · double clic : ajouter une rangée`}
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

/** Une case de la rangée : largeur, résumé des contenus, clic pour ouvrir le tiroir. */
function Cell({cell, index, onOpen}: {cell: CellSnapshot; index: number; onOpen: () => void}) {
  const empty = cell.contents.length === 0;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      aria-label={`Colonne ${index + 1}, ${cell.span} sur 12, ${empty ? 'vide' : cell.contents.join(', ')}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 6,
        minHeight: 80,
        padding: 10,
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: 4,
        border: `1px ${empty ? 'dashed' : 'solid'} var(--theme-elevation-${empty ? '300' : '400'})`,
        background: empty ? 'transparent' : 'var(--theme-elevation-0)',
        color: 'var(--theme-elevation-1000)',
        ...text14,
      }}>
      <span style={{display: 'flex', justifyContent: 'space-between', gap: 8, ...dim}}>
        <span>Colonne {index + 1}</span>
        <span>{cell.span} / 12</span>
      </span>
      {empty ? (
        <span style={dim}>Vide, cliquer pour remplir</span>
      ) : (
        <span style={{display: 'flex', flexDirection: 'column', gap: 2}}>
          {cell.contents.map((label, k) => (
            <span key={k}>{label}</span>
          ))}
        </span>
      )}
    </button>
  );
}

export function RowsBuilder(props: ArrayFieldClientProps) {
  const {field, path, permissions, readOnly, schemaPath: schemaPathFromProps} = props;
  const schemaPath = schemaPathFromProps ?? field.name;
  const columnsField = field.fields.find((f): f is ArrayFieldClient => f.type === 'array' && 'name' in f && f.name === 'columns');
  const columnsSchemaPath = `${schemaPath}.columns`;

  const {addFieldRow, dispatchFields, getDataByPath, moveFieldRow, removeFieldRow, setModified} = useForm();
  const {rows = [], errorPaths, showError} = useField<unknown[]>({path});
  const {openModal, closeModal} = useModal();
  const drawerSlug = useDrawerSlug(`rows-builder-${path}`);
  const [open, setOpen] = useState<{row: number; col: number} | null>(null);
  // rangée sélectionnée : les vignettes agissent sur elle ; sans sélection, elles ajoutent une rangée
  const [selected, setSelected] = useState<number | null>(null);

  // instantané des rangées : largeurs et contenus, pour dessiner les bandes sans déplier
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
      const j = Number(parts[2]);
      if (!Number.isInteger(j)) continue;
      out[i].columns[j] ??= {span: 12, contents: []};
      if (parts[3] === 'span' && parts.length === 4) out[i].columns[j].span = toSpan(fields[key]?.value);
      if (parts[3] === 'contents' && parts[5] === 'blockType' && parts.length === 6) {
        const k = Number(parts[4]);
        out[i].columns[j].contents[k] = contentLabel({blockType: String(fields[key]?.value ?? '')});
      }
    }
    return JSON.stringify(out.map((r) => ({columns: (r?.columns ?? []).map((c) => ({span: c?.span ?? 12, contents: (c?.contents ?? []).filter(Boolean)}))})));
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

  /** double clic : ajoute une rangée sous la rangée sélectionnée (sinon en bas), qui devient sélectionnée */
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

  /** clic : remplace la disposition de la rangée sélectionnée ; sans sélection, ajoute une rangée */
  const replaceRow = useCallback(
    (spans: readonly number[]) => {
      if (selected !== null && selected < rows.length) setSpans(selected, spans);
      else addRow(spans);
    },
    [addRow, rows.length, selected, setSpans],
  );

  const move = (from: number, to: number) => {
    moveFieldRow({path, moveFromIndex: from, moveToIndex: to});
    setSelected(to);
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

  const openCell = (row: number, col: number) => {
    setSelected(row);
    setOpen({row, col});
    openModal(drawerSlug);
  };

  // permissions du tiroir : celles des sous-champs d'une colonne (même règle que le tableau Payload)
  const rowFieldsPerm: SanitizedFieldsPermissions | undefined = permissions === true ? true : permissions?.fields;
  const columnsPerm: SanitizedFieldPermissions | undefined = rowFieldsPerm === true ? true : rowFieldsPerm?.columns;
  const cellPerms = (columnsPerm === true ? true : columnsPerm?.fields) as SanitizedFieldsPermissions;

  const openCellSnapshot = open ? snapshot[open.row]?.columns[open.col] : undefined;
  const label = typeof field.label === 'string' ? field.label : 'Rangées';
  const description = typeof field.admin?.description === 'string' ? field.admin.description : undefined;
  const selectedSpans = selected !== null ? (snapshot[selected]?.columns ?? []).map((c) => c.span).join('|') : '';

  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8}}>
        <span style={{...text14, fontWeight: 600}}>
          {label} <span style={dim}>({rows.length})</span>
        </span>
        {selected !== null && !readOnly ? (
          <Button size="small" buttonStyle="pill" onClick={() => setSelected(null)}>
            Désélectionner la rangée {selected + 1}
          </Button>
        ) : null}
      </div>
      {description ? <p style={{...text14, ...dim, margin: '0 0 12px'}}>{description}</p> : null}
      {!readOnly ? (
        <div style={{marginBottom: 12}}>
          <PresetTiles current={selectedSpans} onReplace={replaceRow} onAdd={addRow} />
          <p style={{...text14, ...dim, margin: '8px 0 0'}}>
            {selected === null ? 'Double clic sur une disposition : ajoute une rangée. Clic sur une rangée : la sélectionne ; un clic sur une disposition la remplace alors.' : `Rangée ${selected + 1} sélectionnée. Clic : remplace sa disposition (même nombre de colonnes, seules les largeurs changent ; sinon recréée vide). Double clic : ajoute une rangée dessous.`}
          </p>
        </div>
      ) : null}
      {showError && errorPaths?.length ? <p style={{...text14, color: 'var(--theme-error-500)', margin: '0 0 12px'}}>Une rangée contient une erreur : ouvrez ses colonnes.</p> : null}

      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {rows.map((row, i) => {
          const snap = snapshot[i] ?? {columns: []};
          const spans = snap.columns.map((c) => c.span);
          const rowError = row.isLoading ? null : validateRow(spans);
          const isSelected = selected === i;
          return (
            <div key={row.id} style={{display: 'flex', gap: 8, alignItems: 'flex-start'}}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`Rangée ${i + 1}${isSelected ? ', sélectionnée' : ''}`}
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
                  <p style={{...text14, ...dim, margin: 0}}>Chargement…</p>
                ) : snap.columns.length ? (
                  <div style={{display: 'grid', gridTemplateColumns: spans.map((s) => `${s}fr`).join(' '), gap: 8}}>
                    {snap.columns.map((cell, j) => (
                      <Cell
                        key={j}
                        cell={cell}
                        index={j}
                        onOpen={() => openCell(i, j)}
                      />
                    ))}
                  </div>
                ) : (
                  <p style={{...text14, ...dim, margin: 0}}>Sélectionnez cette rangée puis une disposition.</p>
                )}
              </div>
              {!readOnly ? (
                <div className="rows-builder__actions" style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  <Button size="small" buttonStyle="pill" disabled={i === 0} onClick={() => move(i, i - 1)} aria-label={`Monter la rangée ${i + 1}`} tooltip="Monter">
                    ↑
                  </Button>
                  <Button size="small" buttonStyle="pill" disabled={i === rows.length - 1} onClick={() => move(i, i + 1)} aria-label={`Descendre la rangée ${i + 1}`} tooltip="Descendre">
                    ↓
                  </Button>
                  <Button size="small" buttonStyle="pill" onClick={() => duplicate(i)} aria-label={`Dupliquer la rangée ${i + 1}`} tooltip="Dupliquer">
                    ⧉
                  </Button>
                  <Button size="small" buttonStyle="pill" onClick={() => remove(i)} aria-label={`Supprimer la rangée ${i + 1}`} tooltip="Supprimer">
                    ✕
                  </Button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {columnsField ? (
        <Drawer slug={drawerSlug} title={open && openCellSnapshot ? `Rangée ${open.row + 1} · colonne ${open.col + 1} · ${openCellSnapshot.span} / 12` : 'Colonne'}>
          {open ? (
            <div style={{paddingBottom: 'var(--base)'}}>
              <RenderFields
                fields={columnsField.fields as ClientField[]}
                parentIndexPath=""
                parentPath={`${path}.${open.row}.columns.${open.col}`}
                parentSchemaPath={columnsSchemaPath}
                permissions={cellPerms}
                readOnly={readOnly}
              />
              <Button buttonStyle="primary" onClick={() => closeModal(drawerSlug)}>
                Fermer
              </Button>
            </div>
          ) : null}
        </Drawer>
      ) : null}
    </div>
  );
}

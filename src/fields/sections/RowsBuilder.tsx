'use client';

/**
 * RowsBuilder — la vue « constructeur » du champ Rangées d'une section, à la place des
 * accordéons imbriqués de Payload.
 *
 *   - une bande par rangée : en tête, ses actions (monter, descendre, supprimer) ; puis les
 *     dispositions en vignettes (un rectangle découpé aux proportions des colonnes) ; puis la
 *     rangée elle-même, une case par colonne, à sa largeur ;
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
import React, {useCallback, useMemo, useState} from 'react';

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

function PresetTiles({current, onApply}: {current: string; onApply: (spans: readonly number[]) => void}) {
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
            title={label}
            onClick={() => onApply(spans)}
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
      onClick={onOpen}
      aria-label={`Colonne ${index + 1}, ${cell.span} sur 12, ${empty ? 'vide' : cell.contents.join(', ')}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 6,
        minHeight: 96,
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

  const applyPreset = useCallback(
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

  const addRow = useCallback(() => {
    const index = rows.length;
    addFieldRow({path, rowIndex: index, schemaPath});
    addFieldRow({path: `${path}.${index}.columns`, rowIndex: 0, schemaPath: columnsSchemaPath, subFieldState: {span: {value: '12', initialValue: '12', valid: true}}});
    setModified(true);
  }, [addFieldRow, columnsSchemaPath, path, rows.length, schemaPath, setModified]);

  const openCell = (row: number, col: number) => {
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

  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8}}>
        <span style={{...text14, fontWeight: 600}}>
          {label} <span style={dim}>({rows.length})</span>
        </span>
        {!readOnly ? (
          <Button size="small" buttonStyle="secondary" onClick={addRow}>
            Ajouter une rangée
          </Button>
        ) : null}
      </div>
      {description ? <p style={{...text14, ...dim, margin: '0 0 12px'}}>{description}</p> : null}
      {showError && errorPaths?.length ? <p style={{...text14, color: 'var(--theme-error-500)', margin: '0 0 12px'}}>Une rangée contient une erreur : ouvrez ses colonnes.</p> : null}

      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {rows.map((row, i) => {
          const snap = snapshot[i] ?? {columns: []};
          const spans = snap.columns.map((c) => c.span);
          const rowError = row.isLoading ? null : validateRow(spans);
          return (
            <div key={row.id} style={{border: '1px solid var(--theme-elevation-200)', borderRadius: 4, padding: 12, background: 'var(--theme-elevation-50)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10}}>
                <span style={text14}>
                  <strong>Rangée {i + 1}</strong> {spans.length ? <span style={dim}>· {presetLabel(spans)}</span> : null}
                  {rowError ? <span style={{color: 'var(--theme-error-500)'}}> · {rowError}</span> : null}
                </span>
                {!readOnly ? (
                  <span style={{display: 'flex', gap: 6}}>
                    <Button size="small" buttonStyle="pill" disabled={i === 0} onClick={() => moveFieldRow({path, moveFromIndex: i, moveToIndex: i - 1})} aria-label="Monter la rangée">
                      Monter
                    </Button>
                    <Button size="small" buttonStyle="pill" disabled={i === rows.length - 1} onClick={() => moveFieldRow({path, moveFromIndex: i, moveToIndex: i + 1})} aria-label="Descendre la rangée">
                      Descendre
                    </Button>
                    <Button size="small" buttonStyle="pill" onClick={() => removeFieldRow({path, rowIndex: i})} aria-label="Supprimer la rangée">
                      Supprimer
                    </Button>
                  </span>
                ) : null}
              </div>
              {row.isLoading ? (
                <p style={{...text14, ...dim, margin: 0}}>Chargement…</p>
              ) : (
                <>
                  {!readOnly ? (
                    <div style={{marginBottom: 10}}>
                      <PresetTiles current={spans.join('|')} onApply={(s) => applyPreset(i, s)} />
                    </div>
                  ) : null}
                  {snap.columns.length ? (
                    <div style={{display: 'grid', gridTemplateColumns: spans.map((s) => `${s}fr`).join(' '), gap: 8}}>
                      {snap.columns.map((cell, j) => (
                        <Cell key={j} cell={cell} index={j} onOpen={() => openCell(i, j)} />
                      ))}
                    </div>
                  ) : (
                    <p style={{...text14, ...dim, margin: 0}}>Choisissez une disposition.</p>
                  )}
                </>
              )}
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

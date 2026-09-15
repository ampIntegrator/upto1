'use client';

/**
 * RowsBuilder — la vue « constructeur » du champ Rangées d'une section, à la place des
 * accordéons imbriqués de Payload.
 *
 *   - un seul bandeau de dispositions en vignettes (un rectangle découpé aux proportions des
 *     colonnes) : un clic remplace la disposition de la rangée sélectionnée, après confirmation,
 *     un double clic ajoute une rangée sous la sélection ;
 *   - les rangées empilées dessous, réordonnées par glisser-déposer (poignée) ; sur le côté, en
 *     deux lignes de deux : déplacer et dupliquer, ordre mobile et supprimer ; dans chaque case,
 *     une poignée ⋮⋮ fait glisser la colonne à gauche ou à droite dans sa rangée (souris,
 *     tactile ou clavier) ; rangées et colonnes triées par le même module (sortable.tsx, dnd-kit) ;
 *   - le bouton téléphone d'une rangée ouvre la fenêtre d'ordre mobile de toute la section :
 *     toutes ses colonnes, rangées confondues, réordonnées par glisser-déposer (poignée) ; les colonnes de la
 *     rangée cliquée sont mises en évidence (champ caché mobileOrder, voir mobileOrder.ts) ;
 *   - une case résume son composant (un seul par colonne), ou « Vide » ; un premier clic sélectionne
 *     la rangée, un clic sur une case de la rangée sélectionnée ouvre un tiroir
 *     Payload avec le composant de la colonne et, s'il y en a un, un bouton « Vider la colonne »
 *     (la largeur ne s'y règle plus : elle vient des dispositions). Le formulaire est partagé : ce qui est
 *     saisi dans le tiroir est déjà dans la page, on enregistre la page comme d'habitude.
 *
 * Toute la manipulation passe par l'état de formulaire de Payload (useForm, useFormFields),
 * exactement comme son propre champ tableau ; le rendu des champs du tiroir est celui de
 * Payload (RenderFields), avec les chemins et permissions qu'il attend.
 */
import {Button, ConfirmationModal, Drawer, Modal, RenderFields, useDrawerSlug, useField, useForm, useFormFields, useModal} from '@payloadcms/ui';
import type {ArrayFieldClient, ArrayFieldClientProps, ClientField, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {minSpan, validateRow, type ColumnSpan} from '@/components/content-specs';
import {contentLabel, toContentRef} from './contentRef';
import {EMPTY_SLUG} from './emptyBlock';
import {hasMobileOrder, mobileSequence} from './mobileOrder';
import {presetLabel, ROW_PRESETS, spansKey, toSpan} from './presets';
import {type SortableHandle, SortableItem, SortableList} from './sortable';

/** filled : la colonne a un vrai composant (une case vide ne compte pas) */
/** narrow : largeur minimale exigée par le composant quand la colonne est trop étroite, sinon null */
type CellSnapshot = {span: ColumnSpan; contents: string[]; types?: string[]; names?: string[]; filled: boolean; narrow: number | null; mobileOrder: number | null};
type RowSnapshot = {ids?: string[]; columns: CellSnapshot[]};

const TILE_H = 40;
const text14: React.CSSProperties = {fontSize: 14, lineHeight: 1.4};
const dim: React.CSSProperties = {color: 'var(--theme-elevation-600)'};

/** Pictogramme téléphone (trait, couleur du texte). */
function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

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
        // active dès que les largeurs sont les mêmes, dans n'importe quel ordre
        const active = spansKey(spans) === current;
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

/** Ce que reçoit une case triable (module sortable.tsx). */
type DragProps = SortableHandle;

/** Une case de la rangée : poignée pour la glisser à gauche ou à droite, largeur dans un coin, résumé du composant, clic pour ouvrir le tiroir. */
/** rowSelected : la rangée de la case est sélectionnée ; sinon un clic ne fait que la sélectionner */
function Cell({cell, index, rowSelected, onOpen, drag}: {cell: CellSnapshot; index: number; rowSelected: boolean; onOpen: () => void; drag?: DragProps}) {
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
      aria-label={`Colonne ${index + 1}, ${cell.span} sur 12, ${empty ? 'vide' : cell.contents.join(', ')}`}
      title={rowSelected ? (empty ? 'Vide, cliquer pour remplir' : `${cell.contents.join(', ')} · cliquer pour modifier`) : 'Cliquer pour sélectionner la rangée, puis cliquer la colonne pour la modifier'}
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
          aria-label={`Déplacer la colonne ${index + 1}`}
          title="Glisser pour déplacer la colonne"
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
        <span style={{...dim, maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{cell.contents.length ? cell.contents.join(', ') : 'Vide'}</span>
      ) : (
        cell.contents.map((label, k) => (
          <span key={k} style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            {label}
          </span>
        ))
      )}
      {cell.narrow ? <span style={{color: 'var(--theme-error-500)'}}>Trop étroit : {cell.narrow} colonnes min.</span> : null}
    </div>
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
  // rangée d'où la fenêtre « ordre mobile » a été ouverte (mise en évidence dans la liste)
  const [mobileRow, setMobileRow] = useState<number | null>(null);
  const mobileSlug = `rows-mobile-${path}`;
  // action destructive en attente de confirmation : remplacer la disposition ou supprimer une rangée
  const [pending, setPending] = useState<{kind: 'replace'; row: number; spans: readonly number[]} | {kind: 'remove'; row: number} | null>(null);
  const confirmSlug = `rows-confirm-${path}`;

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
        out[i].columns[j].contents[k] = contentLabel({blockType});
        (out[i].columns[j].types ??= [])[k] = blockType;
        if (blockType && blockType !== EMPTY_SLUG) out[i].columns[j].filled = true;
      }
      // nom affiché choisi dans le tiroir (blockName natif)
      if (parts[3] === 'contents' && parts[5] === 'blockName' && parts.length === 6) {
        (out[i].columns[j].names ??= [])[Number(parts[4])] = String(fields[key]?.value ?? '');
      }
    }
    return JSON.stringify(out.map((r) => ({ids: r?.ids ?? [], columns: (r?.columns ?? []).map((c) => {
      const span = c?.span ?? 12;
      // largeur exigée par le composant de la colonne (registre des emprises)
      const need = (c?.types ?? []).reduce((m, t) => {
        const ref = t ? toContentRef({blockType: t}) : null;
        return ref ? Math.max(m, minSpan(ref)) : m;
      }, 0);
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
      if (selected !== null && selected < rows.length) {
        const current = (snapshot[selected]?.columns ?? []).map((c) => c.span);
        if (current.join('|') === spans.join('|')) return; // déjà cette disposition : rien à faire
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

  /** texte de la confirmation : ce qui va être perdu */
  const confirmText = (() => {
    if (!pending) return {heading: '', body: '', label: ''};
    const columns = snapshot[pending.row]?.columns ?? [];
    const filled = columns.filter((c) => c.contents.length > 0).length;
    const composants = `${filled} composant${filled > 1 ? 's' : ''}`;
    if (pending.kind === 'remove') {
      const sujet = columns.length === 1 ? 'Sa colonne' : `Ses ${columns.length} colonnes`;
      // accord : féminin pour les seules colonnes, masculin dès qu'il y a des composants
      const verbe = filled ? 'seront supprimés' : columns.length === 1 ? 'sera supprimée' : 'seront supprimées';
      return {
        heading: `Supprimer la rangée ${pending.row + 1} ?`,
        body: `${sujet}${filled ? ` et ${composants}` : ''} ${verbe}. Définitif à l’enregistrement de la page.`,
        label: 'Supprimer',
      };
    }
    const from = presetLabel(columns.map((c) => c.span));
    const to = presetLabel(pending.spans);
    const body =
      columns.length === pending.spans.length
        ? `Les largeurs passent de ${from} à ${to}. Les composants restent dans leurs colonnes.`
        : `La rangée passe de ${from} à ${to} : ses colonnes sont recréées vides${filled ? `, ${composants} ${filled > 1 ? 'seront supprimés' : 'sera supprimé'}` : ''}. Définitif à l’enregistrement de la page.`;
    return {heading: `Remplacer la disposition de la rangée ${pending.row + 1} ?`, body, label: 'Remplacer'};
  })();
  const onConfirm = () => {
    if (pending?.kind === 'replace') setSpans(pending.row, pending.spans);
    if (pending?.kind === 'remove') remove(pending.row);
    setPending(null);
  };

  /** colonnes de la section à plat, rangée par rangée, pour l'ordre mobile */
  const flatColumns = useMemo(
    () => snapshot.flatMap((r, row) => r.columns.map((c, col) => ({row, col, span: c.span, contents: c.contents, mobileOrder: c.mobileOrder, empty: !c.filled}))),
    [snapshot],
  );
  /** écrit l'ordre mobile de la section : position pour les colonnes listées, vide pour les autres */
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

  /** vide la colonne : retire son composant (et son nom) ; définitif à l'enregistrement de la page */
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

  // permissions du tiroir : celles des sous-champs d'une colonne (même règle que le tableau Payload)
  const rowFieldsPerm: SanitizedFieldsPermissions | undefined = permissions === true ? true : permissions?.fields;
  const columnsPerm: SanitizedFieldPermissions | undefined = rowFieldsPerm === true ? true : rowFieldsPerm?.columns;
  const cellPerms = (columnsPerm === true ? true : columnsPerm?.fields) as SanitizedFieldsPermissions;

  const openCellSnapshot = open ? snapshot[open.row]?.columns[open.col] : undefined;
  const description = typeof field.admin?.description === 'string' ? field.admin.description : undefined;
  const selectedSpans = selected !== null ? spansKey((snapshot[selected]?.columns ?? []).map((c) => c.span)) : '';

  return (
    <div className="field-type rows-builder" style={{marginBottom: 'var(--base)'}}>
      {description ? <p style={{...text14, ...dim, margin: '0 0 12px'}}>{description}</p> : null}
      {!readOnly ? (
        <div style={{marginBottom: 12}}>
          <PresetTiles current={selectedSpans} onReplace={replaceRow} onAdd={addRow} />
          <p style={{...text14, ...dim, margin: '8px 0 0'}}>
            {selected === null ? 'Double clic sur une disposition : ajoute une rangée. Clic sur une rangée : la sélectionne ; ensuite, un clic sur une de ses colonnes l’ouvre, un clic sur une disposition la remplace.' : `Rangée ${selected + 1} sélectionnée. Clic sur une de ses colonnes : l’ouvre. Clic sur une disposition : la remplace (après confirmation). Double clic : ajoute une rangée dessous.`}
          </p>
        </div>
      ) : null}
      {showError && errorPaths?.length ? <p style={{...text14, color: 'var(--theme-error-500)', margin: '0 0 12px'}}>Une rangée contient une erreur : ouvrez ses colonnes.</p> : null}

      <SortableList ids={rows.map((r) => r.id)} axis="y" onMove={move} className="rows-builder__rows">
        {rows.map((row, i) => {
          const snap = snapshot[i] ?? {columns: []};
          const spans = snap.columns.map((c) => c.span);
          const rowError = row.isLoading ? null : validateRow(spans);
          const isSelected = selected === i;
          const colIds = snap.ids?.length === snap.columns.length ? (snap.ids as string[]) : snap.columns.map((_, j) => `${row.id}-${j}`);
          return (
            <SortableItem key={row.id} id={row.id} disabled={readOnly}>
              {({attributes, listeners, setNodeRef, transform, transition, isDragging}) => (
                <div ref={setNodeRef} style={{display: 'flex', gap: 8, alignItems: 'center', transform, transition, zIndex: isDragging ? 1 : undefined, position: 'relative'}}>
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
                      <p style={{...text14, ...dim, margin: 0}}>Sélectionnez cette rangée puis une disposition.</p>
                    )}
                  </div>
                  {!readOnly ? (
                    <div className="rows-builder__actions">
                      <button type="button" {...attributes} {...listeners} className="rows-builder__handle" aria-label={`Déplacer la rangée ${i + 1}`} title="Glisser pour déplacer">
                        ⋮⋮
                      </button>
                      <Button size="small" buttonStyle="pill" onClick={() => duplicate(i)} aria-label={`Dupliquer la rangée ${i + 1}`} tooltip="Dupliquer">
                        ⧉
                      </Button>
                      <Button size="small" buttonStyle="pill" onClick={() => openMobile(i)} aria-label={`Ordre mobile de la section (depuis la rangée ${i + 1})`} tooltip="Ordre mobile de la section">
                        <PhoneGlyph />
                      </Button>
                      <Button size="small" buttonStyle="pill" onClick={() => askRemove(i)} aria-label={`Supprimer la rangée ${i + 1}`} tooltip="Supprimer">
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
        cancelLabel="Annuler"
        onConfirm={onConfirm}
        onCancel={() => setPending(null)}
      />

      <Modal slug={mobileSlug} className="confirmation-modal rows-mobile">
        {mobileRow !== null
          ? (() => {
              const sequence = mobileSequence(flatColumns);
              const empties = flatColumns.filter((c) => c.empty);
              const where = (c: {row: number; col: number; span: number}) => `rangée ${c.row + 1} · colonne ${c.col + 1} · ${c.span}/12`;
              return (
                <div className="confirmation-modal__wrapper rows-mobile__wrapper">
                  <div className="confirmation-modal__content">
                    <h2 style={{margin: 0}}>Ordre mobile de la section</h2>
                    <p style={{...text14, ...dim}}>Sous 768 px, toutes les colonnes de la section s’empilent dans cet ordre, rangées confondues : glissez une ligne par sa poignée pour la déplacer. Les colonnes vides sont masquées. En évidence : la rangée {mobileRow + 1}.</p>
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
                              <button type="button" {...h.attributes} {...h.listeners} className="rows-builder__handle rows-builder__handle--mobile" aria-label={`Déplacer sur mobile : ${where(c)}`} title="Glisser pour changer l’ordre mobile">
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
                  {!sequence.length ? <p style={{...text14, ...dim, margin: 0}}>Aucune colonne remplie : rien ne s’affiche sur mobile.</p> : null}
                  {empties.length ? (
                    <ul className="rows-mobile__list">
                      {empties.map((c) => (
                        <li key={`${c.row}-${c.col}`} className="rows-mobile__item" style={dim}>
                          <span style={{...text14, flex: 1}}>
                            {where(c)} · {c.contents.length ? 'case vide' : 'vide'}, masquée sur mobile
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="confirmation-modal__controls">
                    <Button size="small" buttonStyle="secondary" disabled={!hasMobileOrder(flatColumns)} onClick={() => writeMobileOrder(null)}>
                      Reprendre l’ordre desktop
                    </Button>
                    <Button size="small" buttonStyle="primary" onClick={() => closeModal(mobileSlug)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              );
            })()
          : null}
      </Modal>

      {columnsField ? (
        <Drawer slug={drawerSlug} title={open && openCellSnapshot ? `Rangée ${open.row + 1} · colonne ${open.col + 1} · ${openCellSnapshot.span} / 12` : 'Colonne'}>
          {open ? (
            <div style={{paddingBottom: 'var(--base)'}}>
              {openCellSnapshot && openCellSnapshot.contents.length > 0 && !readOnly ? (
                <div style={{marginBottom: 'var(--base)'}}>
                  <Button buttonStyle="secondary" onClick={() => clearColumn(open.row, open.col)}>
                    Vider la colonne
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
                Fermer
              </Button>
            </div>
          ) : null}
        </Drawer>
      ) : null}
    </div>
  );
}

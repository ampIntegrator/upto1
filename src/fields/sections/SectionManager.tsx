'use client';

/**
 * SectionManager — the section's fields, edited in a full-screen dialog (« Gérer », Nicolas,
 * 1 Oct. 2026) instead of in the page's form:
 *   - in the page, the section shows only a « Gérer » button (and how many fields need fixing);
 *   - the dialog: a header (title, the document's fields the host listed, « save », « save and
 *     close » and « close »), settings on top (35 %), in four horizontal accordions (one open, the others
 *     folded to a vertical strip): background and spacing, layout, components (the block
 *     library, dragged onto the preview's columns), content (the selected column's block), the live preview below (65 %); a handle between the two
 *     shares the height differently (until the dialog is closed).
 *
 * It is the custom component of an unnamed collapsible wrapping the section's two framed blocks
 * (settings, rows), so the data does not change. Its children are rendered by Payload
 * (RenderFields) with the paths Payload's own collapsible would give them; their values live in
 * the form state, so closing the dialog loses nothing and the page is saved as usual.
 */
import {getTranslation} from '@payloadcms/translations';
import {Button, ConfirmationModal, Modal, RenderFields, useConfig, useDocumentInfo, useForm, useFormFields, useFormModified, useLocale, useModal, useTranslation} from '@payloadcms/ui';
import type {ArrayFieldClient, BlocksFieldClient, ClientBlock, ClientField, CollapsibleFieldClient, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {BLOCK_DRAG_TYPE, BlockLibrary, type LibraryBlock} from './BlockLibrary';
import {ColumnContent} from './ColumnContent';
import {EMPTY_SLUG} from './emptyBlock';
import {byGroup, only} from './fieldGroups';
import type {PresetRow} from './grid';
import {ManagerContext} from './managerContext';
import {DEFAULT_BREAKPOINTS, PREVIEW_EDIT, PREVIEW_OPEN, PREVIEW_PICK, PREVIEW_SELECT, type PreviewBox, type PreviewColumn, type PreviewColumnBox, type PreviewEvent, type SectionPreviewOptions} from './preview';
import {RowsBuilderGhost} from './RowsBuilder';
import {SectionPreview} from './SectionPreview';

import {PAYLOAD_DOM} from './payloadDom';

import './tokens.scss';
import './SectionManager.scss';

type Props = {
  field: CollapsibleFieldClient;
  path: string;
  indexPath: string;
  parentPath: string;
  parentSchemaPath: string;
  permissions?: SanitizedFieldPermissions | SanitizedFieldsPermissions;
  readOnly?: boolean;
  preview?: SectionPreviewOptions;
  /** names of the settings' group headings: each group is a column of the first panel */
  groups?: string[];
  /** top-level fields of the document shown in the dialog's header */
  headerFields?: string[];
  /** block slug → narrowest and widest column it accepts; blocks no longer offered */
  minSpans?: Record<string, number>;
  maxSpans?: Record<string, number>;
  hiddenBlocks?: string[];
  /** blocks whose picker image is wide (a wide thumbnail in the library) */
  /** block slug → values a block starts with when placed from the library (field path → value) */
  samples?: Record<string, Record<string, unknown>>;
  /** the host's extra layout thumbnails (shown, disabled, while the rows are not available yet) */
  presetRows?: PresetRow[];
};

type PanelKey = 'settings' | 'layout' | 'blocks' | 'content';

/**
 * Height of the top part: 280 px when the dialog opens (`--sm-top-height`, tokens.scss), the same in every panel and whatever
 * is chosen, the preview taking the rest of the screen. The layout panel is built to fit in it (its
 * squares take the height the layouts leave). Only the handle changes it, for the time the dialog
 * is open (nothing is remembered). SPLIT, a share in %, is what the handle falls back on.
 */
const SPLIT = 35;
/** a select menu opens upwards when less than this (px) is left under its field; one option's height */
const MENU_ROOM = 160;
const MENU_ITEM = 44;
const SPLIT_MIN = 20;
const SPLIT_MAX = 80;
const SPLIT_STEP = 2;
/** kept to a tenth of a percent: the handle follows the pointer smoothly */
const clampSplit = (n: number) => Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, Math.round(n * 10) / 10));

/** fields of the framed block at `index` (an unnamed collapsible), or none */
const innerFields = (field: CollapsibleFieldClient, index: number): ClientField[] => {
  const f = field.fields[index] as CollapsibleFieldClient | undefined;
  return f && 'fields' in f ? f.fields : [];
};

export function SectionManager({field, path, indexPath, parentPath, parentSchemaPath, permissions, readOnly, preview, groups, headerFields, minSpans, maxSpans, hiddenBlocks, samples, presetRows}: Props) {
  const {t} = useAdminText();
  const {openModal, closeModal, isModalOpen} = useModal();
  const slug = `section-manager-${path}`;
  const prefix = parentPath ? `${parentPath}.` : '';
  // invalid fields of the section (after a save attempt): shown next to the button, the fields being hidden
  const errors = useFormFields(([fields]) => Object.entries(fields).filter(([p, f]) => p.startsWith(prefix) && f?.valid === false).length);
  const open = isModalOpen(slug);

  return (
    <div className="section-manager">
      <div className="section-manager__summary">
        <Button buttonStyle="secondary" onClick={() => openModal(slug)}>
          {t(T.manager.open)}
        </Button>
        <span className="section-manager__hint">{t(T.manager.openDescription)}</span>
        {errors > 0 ? <span className="section-manager__errors">{t(T.manager.errors, {n: errors})}</span> : null}
      </div>
      <Modal slug={slug} className="section-manager__modal" closeOnBlur={false}>
        {open ? (
          <ManagerBody
            field={field}
            indexPath={indexPath}
            parentPath={parentPath}
            parentSchemaPath={parentSchemaPath}
            permissions={permissions}
            readOnly={readOnly}
            preview={preview}
            groups={groups}
            headerFields={headerFields}
            minSpans={minSpans}
            maxSpans={maxSpans}
            hiddenBlocks={hiddenBlocks}
            samples={samples}
            presetRows={presetRows}
            onClose={() => closeModal(slug)}
          />
        ) : null}
      </Modal>
    </div>
  );
}

/** The header buttons' icons (stroke, text colour): a floppy disk, a cross. */
function BarGlyph({kind}: {kind: 'save' | 'close'}) {
  return (
    <svg className="section-manager__glyph" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'save' ? (
        <>
          <path d="M5 3h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M7 3v6h8V3M7 21v-7h10v7" />
        </>
      ) : (
        <path d="M6 6l12 12M18 6L6 18" />
      )}
    </svg>
  );
}

function ManagerBody({field, indexPath, parentPath, parentSchemaPath, permissions, readOnly, preview, groups = [], headerFields = [], minSpans, maxSpans, hiddenBlocks, samples, presetRows, onClose}: Omit<Props, 'path'> & {onClose: () => void}) {
  const {t} = useAdminText();
  const [panel, setPanel] = useState<PanelKey>('settings');
  // « save » and « save and close »: the document's own save; the dialog stays open when a field is refused
  const {submit, getFields, addFieldRow, removeFieldRow, dispatchFields, getDataByPath, setModified} = useForm();
  const modified = useFormModified();
  const [saving, setSaving] = useState(false);
  /** saves the document; true when no field was refused */
  const save = async (): Promise<boolean> => {
    setSaving(true);
    try {
      await submit();
      return !Object.values(getFields()).some((f) => f?.valid === false);
    } finally {
      setSaving(false);
    }
  };
  const saveAndClose = async () => {
    if (!modified || (await save())) onClose();
  };
  // the handle between the settings and the preview: drag it (or arrow keys) to share the height
  const body = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  // null: the opening height (the stylesheet's); a number: the share chosen with the handle
  const [split, setSplit] = useState<number | null>(null);
  // Payload's select menus open inside the panel, which is short and clips them: each menu is kept
  // inside the top part (a shorter list that scrolls, or opened upwards when there is more room above)
  useEffect(() => {
    const root = panelsRef.current;
    if (!root) return;
    const place = (menu: HTMLElement) => {
      const list = menu.querySelector<HTMLElement>(PAYLOAD_DOM.selectMenuList);
      const control = menu.parentElement?.querySelector<HTMLElement>(PAYLOAD_DOM.selectControl);
      if (!list || !control) return;
      const bounds = root.getBoundingClientRect();
      const box = control.getBoundingClientRect();
      const margin = 16;
      const below = bounds.bottom - box.bottom - margin;
      const above = box.top - bounds.top - margin;
      if (below < MENU_ROOM && above > below) {
        menu.style.top = 'auto';
        menu.style.bottom = '100%';
      }
      list.style.maxHeight = `${Math.max(Math.max(below, above), MENU_ITEM)}px`;
    };
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const menu = node.matches(PAYLOAD_DOM.selectMenu) ? node : node.querySelector<HTMLElement>(PAYLOAD_DOM.selectMenu);
          if (menu) place(menu);
        });
      }
    });
    observer.observe(root, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, []);
  /** the share shown now, in % (the opening height included) */
  const currentSplit = () => {
    const box = body.current?.getBoundingClientRect();
    const panels = panelsRef.current?.getBoundingClientRect();
    return split ?? (box && panels && box.height > 0 ? (panels.height / box.height) * 100 : SPLIT);
  };
  const dragging = useRef(false);
  const grab = useRef(0);
  // not remembered: the dialog always opens at its opening height
  const keep = (value: number | null) => setSplit(value === null ? null : clampSplit(value));
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // captured: the moves keep coming while the pointer is over the preview's frame
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    // where the handle was grabbed: it does not jump under the pointer
    grab.current = e.clientY - e.currentTarget.getBoundingClientRect().top;
    e.preventDefault();
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = body.current?.getBoundingClientRect();
    const top = panelsRef.current?.getBoundingClientRect().top;
    // the settings start under the header: their height is the pointer's distance to their top
    if (dragging.current && box && box.height > 0 && top !== undefined) setSplit(clampSplit(((e.clientY - grab.current - top) / box.height) * 100));
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (split !== null) keep(split);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') keep(currentSplit() - SPLIT_STEP);
    else if (e.key === 'ArrowDown') keep(currentSplit() + SPLIT_STEP);
    else if (e.key === 'Home') keep(SPLIT_MIN);
    else if (e.key === 'End') keep(SPLIT_MAX);
    else return;
    e.preventDefault();
  };
  // ——— the columns' contents: the block library, the content panel, the preview's events ———
  const {i18n} = useTranslation();
  const {openModal, closeModal, isModalOpen} = useModal();
  const rowsField = innerFields(field, 1).find((f): f is ArrayFieldClient => f.type === 'array' && 'name' in f && f.name === 'rows');
  const columnsField = rowsField?.fields.find((f): f is ArrayFieldClient => f.type === 'array' && 'name' in f && f.name === 'columns');
  const contentsField = columnsField?.fields.find((f): f is BlocksFieldClient => f.type === 'blocks' && 'name' in f && f.name === 'contents');
  const rowsPath = parentPath ? `${parentPath}.rows` : 'rows';
  const rowsSchemaPath = `${parentSchemaPath}.rows`;
  const blocks = useMemo(() => (contentsField?.blocks ?? []).filter((b): b is ClientBlock => typeof b !== 'string'), [contentsField]);
  // the blocks offered: not the empty cell (an empty column is one already), not the hidden ones
  const library = useMemo<LibraryBlock[]>(
    () =>
      blocks
        .filter((b) => b.slug !== EMPTY_SLUG && !(hiddenBlocks ?? []).includes(b.slug))
        .map((b) => ({slug: b.slug, label: String(getTranslation(b.labels?.singular ?? b.slug, i18n)), image: b.imageURL, min: minSpans?.[b.slug] ?? 1, max: maxSpans?.[b.slug] ?? 12})),
    [blocks, hiddenBlocks, i18n, maxSpans, minSpans],
  );
  // the rows are hidden by the host's condition (no background chosen yet)
  const rowsHidden = useFormFields(([fields]) => fields[rowsPath]?.passesCondition === false);
  const columnPath = useCallback((at: PreviewColumn) => `${rowsPath}.${at.row}.columns.${at.col}`, [rowsPath]);
  /** width and block of a column, read from the form; null when the column does not exist */
  const columnState = useCallback(
    (at: PreviewColumn): {span: number; blockType: string} | null => {
      const fields = getFields();
      const span = fields[`${columnPath(at)}.span`];
      if (!span) return null;
      const blockType = String(fields[`${columnPath(at)}.contents.0.blockType`]?.value ?? '');
      return {span: Number(span.value) || 12, blockType: blockType === EMPTY_SLUG ? '' : blockType};
    },
    [columnPath, getFields],
  );
  const fitsColumn = useCallback((slug: string, span: number) => (minSpans?.[slug] ?? 1) <= span && span <= (maxSpans?.[slug] ?? 12), [maxSpans, minSpans]);

  // the column shown in the content panel
  const [column, setColumn] = useState<PreviewColumn | null>(null);
  // the content panel is for a column that holds a block; an empty column needs a component first:
  // a box over the dialog lists the components that fit its width, one click places one
  const pickSlug = `section-manager-pick-${rowsPath}`;
  const [choosing, setChoosing] = useState<PreviewColumn | null>(null);
  const openContent = useCallback(
    (at: PreviewColumn) => {
      setColumn(at);
      if (columnState(at)?.blockType) return setPanel('content');
      if (readOnly) return;
      setChoosing(at);
      openModal(pickSlug);
    },
    [columnState, openModal, pickSlug, readOnly],
  );
  const manager = useMemo(() => ({column, selectColumn: setColumn, openContent}), [column, openContent]);

  /** empties the column: removes its block; final once the document is saved */
  const clearColumn = useCallback(
    (at: PreviewColumn) => {
      const contentsPath = `${columnPath(at)}.contents`;
      const existing = getDataByPath<unknown[]>(contentsPath);
      for (let k = (Array.isArray(existing) ? existing.length : 0) - 1; k >= 0; k--) removeFieldRow({path: contentsPath, rowIndex: k});
      setModified(true);
    },
    [columnPath, getDataByPath, removeFieldRow, setModified],
  );
  // the images of each upload collection (ids), fetched once: a block placed from the library gets one at random
  const {config} = useConfig();
  const images = useRef<Record<string, Promise<(number | string)[]>>>({});
  const randomImage = useCallback(
    async (collection: string): Promise<number | string | undefined> => {
      images.current[collection] ??= fetch(`${config.serverURL ?? ''}${config.routes.api}/${collection}?depth=0&limit=100&where[mimeType][like]=image/`, {credentials: 'include'})
        .then((r) => (r.ok ? r.json() : {docs: []}))
        .then((d: {docs?: {id: number | string}[]}) => (d.docs ?? []).map((doc) => doc.id))
        .catch(() => []);
      const ids = await images.current[collection];
      return ids.length ? ids[Math.floor(Math.random() * ids.length)] : undefined;
    },
    [config.routes.api, config.serverURL],
  );
  const putBlock = useCallback(
    async (at: PreviewColumn, slug: string) => {
      // the block's placeholder values: it shows at once in the preview, ready to be typed over;
      // each of its image fields gets an image of the library, picked at random
      const values: Record<string, unknown> = {...samples?.[slug]};
      const uploads = (blocks.find((b) => b.slug === slug)?.fields ?? []).filter((f) => f.type === 'upload' && !f.hasMany && typeof f.relationTo === 'string');
      for (const f of uploads) {
        if (f.type !== 'upload' || typeof f.relationTo !== 'string' || values[f.name] !== undefined) continue;
        const id = await randomImage(f.relationTo);
        if (id !== undefined) values[f.name] = id;
      }
      clearColumn(at);
      const subFieldState = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, {value, initialValue: value, valid: true}]));
      addFieldRow({path: `${columnPath(at)}.contents`, rowIndex: 0, blockType: slug, schemaPath: `${rowsSchemaPath}.columns.contents`, subFieldState});
      setModified(true);
      setColumn(at);
    },
    [addFieldRow, blocks, clearColumn, columnPath, randomImage, rowsSchemaPath, samples, setModified],
  );
  // a block placed on a filled column: asked first
  const [replacing, setReplacing] = useState<{at: PreviewColumn; slug: string} | null>(null);
  const confirmSlug = `section-manager-replace-${rowsPath}`;
  const placeBlock = useCallback(
    (at: PreviewColumn, slug: string) => {
      const state = columnState(at);
      if (!state || !fitsColumn(slug, state.span)) return;
      if (state.blockType && state.blockType !== slug) {
        setReplacing({at, slug});
        openModal(confirmSlug);
      } else if (!state.blockType) void putBlock(at, slug);
    },
    [columnState, confirmSlug, fitsColumn, openModal, putBlock],
  );
  const labelOf = (slug: string) => library.find((b) => b.slug === slug)?.label ?? slug;

  // the block being dragged from the library: the preview shows where it can be dropped
  const [dragged, setDragged] = useState<string | null>(null);
  const dropZones = (boxes: PreviewColumnBox[]) => {
    if (!dragged) return null;
    return boxes.map((box) => {
      const state = columnState(box);
      const ok = Boolean(state) && fitsColumn(dragged, state?.span ?? 0);
      return (
        <div
          key={`${box.row}-${box.col}`}
          className="section-preview__zone"
          data-allowed={ok ? 'true' : undefined}
          data-zone={`${box.row}-${box.col}`}
          aria-label={t(T.manager.dropZone, {row: box.row + 1, col: box.col + 1})}
          style={{left: box.x, top: box.y, width: box.width, height: box.height}}
          onDragEnter={(e) => {
            if (ok) e.currentTarget.setAttribute('data-over', 'true');
          }}
          onDragLeave={(e) => e.currentTarget.removeAttribute('data-over')}
          // no preventDefault on a column that cannot take the block: the browser shows the « not allowed » cursor
          onDragOver={(e) => {
            if (!ok) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          }}
          onDrop={(e) => {
            e.preventDefault();
            const slug = e.dataTransfer.getData(BLOCK_DRAG_TYPE) || dragged;
            setDragged(null);
            if (ok && slug) placeBlock({row: box.row, col: box.col}, slug);
          }}
        />
      );
    });
  };

  // an image, an icon or a link clicked in the preview: its own field (the link's group: label and target), shown next to it
  const [picking, setPicking] = useState<{at: PreviewColumn; field: string; x: number; y: number} | null>(null);
  const onPreviewEvent = (event: PreviewEvent, toScreen: (box: PreviewBox) => PreviewBox) => {
    const at = {row: event.row, col: event.col};
    const state = columnState(at);
    if (!state) return;
    if (event.type === PREVIEW_SELECT) return setColumn(at);
    if (event.type === PREVIEW_OPEN) return openContent(at);
    const block = blocks.find((b) => b.slug === state.blockType);
    const path = `${columnPath(at)}.contents.0.${event.field}`;
    if (event.type === PREVIEW_EDIT) {
      // only a text field the form knows; anything else is edited in the content panel
      if (readOnly || !getFields()[path]) return openContent(at);
      dispatchFields({type: 'UPDATE', path, value: event.value, valid: true});
      setModified(true);
      setColumn(at);
    }
    if (event.type === PREVIEW_PICK) {
      if (readOnly || !block?.fields.some((f) => 'name' in f && f.name === event.field)) return openContent(at);
      const box = toScreen(event.box);
      setColumn(at);
      setPicking({at, field: event.field, x: box.x, y: box.y + box.height});
    }
  };
  const pickedBlock = picking ? blocks.find((b) => b.slug === columnState(picking.at)?.blockType) : undefined;
  const pickedField = pickedBlock?.fields.find((f) => 'name' in f && f.name === picking?.field);
  const blockPermissions = (slug: string): SanitizedFieldsPermissions => {
    if (permissions === true || permissions === undefined) return true;
    type Deep = {fields?: Record<string, Deep>; blocks?: Record<string, Deep>} | true | undefined;
    const contents = ((permissions as Record<string, Deep>).rows as Exclude<Deep, true | undefined>)?.fields?.columns;
    const perms = contents === true ? true : (contents?.fields?.contents as Exclude<Deep, true | undefined>)?.blocks?.[slug];
    return ((perms === true ? true : perms?.fields) ?? true) as SanitizedFieldsPermissions;
  };

  // forceRender: Payload renders fields once they are on screen, and an empty group is hidden (SCSS)
  const render = (index: number, fields: ClientField[] = innerFields(field, index)) => (
    <RenderFields
      fields={fields}
      forceRender
      parentIndexPath={`${indexPath}-${index}`}
      parentPath={parentPath}
      parentSchemaPath={parentSchemaPath}
      permissions={permissions as SanitizedFieldsPermissions}
      readOnly={readOnly}
    />
  );
  // the settings side by side, one column per group, each centred in the panel's height: no vertical scroll in the top part
  const settings = (
    <div className="section-manager__groups section-manager__groups--centred">
      {byGroup(innerFields(field, 0), (f) => f.type === 'ui' && groups.includes(f.name)).map((fields, i) => (
        <div key={i} className="section-manager__group">
          {render(0, fields)}
        </div>
      ))}
    </div>
  );
  const panels: {key: PanelKey; label: string; content: React.ReactNode}[] = [
    {key: 'settings', label: t(T.manager.panelSettings), content: settings},
    // while the rows wait for a first setting, the same panel, disabled: one height before and after
    {key: 'layout', label: t(T.manager.panelLayout), content: rowsHidden ? <RowsBuilderGhost presetRows={presetRows} /> : render(1)},
    {
      key: 'blocks',
      label: t(T.manager.panelBlocks),
      content: <BlockLibrary blocks={library} onDrag={readOnly ? undefined : setDragged} onPick={(slug) => (column && !readOnly ? placeBlock(column, slug) : undefined)} />,
    },
    {
      key: 'content',
      label: t(T.manager.panelContent),
      content: (
        <ColumnContent
          rowsPath={rowsPath}
          rowsSchemaPath={rowsSchemaPath}
          column={column}
          blocks={blocks}
          library={library}
          permissions={column ? blockPermissions(columnState(column)?.blockType ?? '') : true}
          readOnly={readOnly}
          onClear={clearColumn}
        />
      ),
    },
  ];

  return (
    <ManagerContext.Provider value={manager}>
    <div ref={body} className="section-manager__body" style={{'--section-manager-split': split !== null ? `${split}%` : undefined} as React.CSSProperties}>
      <header className="section-manager__bar">
        <h2 className="section-manager__title">{t(T.manager.title)}</h2>
        <DocumentFields names={headerFields} />
        <div className="section-manager__close">
          {!readOnly ? (
            <Button buttonStyle="secondary" margin={false} disabled={saving || !modified} onClick={() => void save()}>
              <BarGlyph kind="save" />
              {t(T.manager.save)}
            </Button>
          ) : null}
          {!readOnly ? (
            <Button buttonStyle="primary" margin={false} disabled={saving} onClick={saveAndClose}>
              <BarGlyph kind="save" />
              {t(T.manager.saveAndClose)}
            </Button>
          ) : null}
          <Button buttonStyle="secondary" margin={false} onClick={onClose}>
            <BarGlyph kind="close" />
            {t(T.manager.close)}
          </Button>
        </div>
      </header>
      <div ref={panelsRef} className="section-manager__panels">
        {panels.map((p) => {
          const active = p.key === panel;
          const id = `section-manager-panel-${p.key}`;
          return (
            <section key={p.key} className={`section-manager__panel${active ? ' section-manager__panel--open' : ''}`}>
              <button type="button" className="section-manager__tab" aria-expanded={active} aria-controls={id} onClick={() => setPanel(p.key)}>
                <span className="section-manager__tab-label">{p.label}</span>
              </button>
              {/* folded panels stay mounted (inert, clipped): their fields keep their local state, and the panel slides open */}
              <div id={id} className="section-manager__content" inert={!active}>
                {p.content}
              </div>
            </section>
          );
        })}
      </div>
      {preview ? (
        <div
          className="section-manager__handle"
          role="separator"
          aria-orientation="horizontal"
          aria-label={t(T.manager.resize)}
          aria-valuemin={SPLIT_MIN}
          aria-valuemax={SPLIT_MAX}
          aria-valuenow={Math.round(split ?? SPLIT)}
          title={t(T.manager.resize)}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => keep(null)}
          onKeyDown={onKeyDown}
        />
      ) : null}
      {preview ? <LivePreview parentPath={parentPath} preview={preview} onEvent={onPreviewEvent} overlay={dropZones} /> : null}
      {picking && pickedBlock && pickedField ? (
        <FieldPopover x={picking.x} y={picking.y} title={String(getTranslation(('label' in pickedField && pickedField.label) || picking.field, i18n))} onClose={() => setPicking(null)}>
          <RenderFields
            fields={only(pickedBlock.fields as ClientField[], (f) => f === pickedField)}
            forceRender
            parentIndexPath=""
            parentPath={`${columnPath(picking.at)}.contents.0`}
            parentSchemaPath={`${rowsSchemaPath}.columns.contents.${pickedBlock.slug}`}
            permissions={blockPermissions(pickedBlock.slug)}
            readOnly={readOnly}
          />
        </FieldPopover>
      ) : null}
      <Modal slug={pickSlug} className="section-manager__picker">
        {/* (only while the box is open: closed with Escape, it leaves nothing behind) */}
        {choosing && isModalOpen(pickSlug) ? (
          <div className="section-manager__picker-box">
            <div className="section-manager__picker-head">
              <strong>{t(T.manager.pickTitle)}</strong>
              <span>{t(T.manager.contentTitle, {row: choosing.row + 1, col: choosing.col + 1, span: columnState(choosing)?.span ?? 12})}</span>
              <Button buttonStyle="secondary" size="small" margin={false} onClick={() => closeModal(pickSlug)}>
                {t(T.manager.close)}
              </Button>
            </div>
            {(() => {
              const span = columnState(choosing)?.span ?? 0;
              const fitting = library.filter((b) => fitsColumn(b.slug, span));
              if (!fitting.length) return <p className="section-manager__soon">{t(T.manager.pickNone)}</p>;
              return (
                <div className="section-manager__picker-list">
                  <BlockLibrary
                    guide={false}
                    blocks={fitting}
                    onPick={(slug) => {
                      void putBlock(choosing, slug);
                      closeModal(pickSlug);
                    }}
                  />
                </div>
              );
            })()}
          </div>
        ) : null}
      </Modal>
      <ConfirmationModal
        modalSlug={confirmSlug}
        heading={t(T.manager.replaceHeading)}
        body={replacing ? t(T.manager.replaceBody, {from: labelOf(columnState(replacing.at)?.blockType ?? ''), to: labelOf(replacing.slug)}) : ''}
        confirmLabel={t(T.manager.replace)}
        cancelLabel={t(T.manager.cancel)}
        onConfirm={() => {
          if (replacing) void putBlock(replacing.at, replacing.slug);
          setReplacing(null);
        }}
        onCancel={() => setReplacing(null)}
      />
    </div>
    </ManagerContext.Provider>
  );
}

/**
 * A single field of a block, shown next to what was clicked in the preview (an image, an icon, a link):
 * a small panel at the pointer, closed by its button, Escape or a click beside it.
 */
function FieldPopover({x, y, title, onClose, children}: {x: number; y: number; title: string; onClose: () => void; children: React.ReactNode}) {
  const {t} = useAdminText();
  const panel = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState({left: x, top: y});
  // kept inside the screen, again each time its content changes size (the field renders after the panel)
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const margin = 12;
    const fit = () => setPlace({left: Math.max(margin, Math.min(x, window.innerWidth - el.offsetWidth - margin)), top: Math.max(margin, Math.min(y + margin, window.innerHeight - el.offsetHeight - margin))});
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [x, y]);
  // the click was in the preview's frame: bring the keyboard back here (Escape, Tab)
  useEffect(() => {
    panel.current?.focus();
  }, []);
  useEffect(() => {
    // captured before the dialog's own Escape: only this panel closes
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  return (
    <>
      <div className="field-popover__backdrop" onClick={onClose} />
      <div ref={panel} className="field-popover" role="dialog" aria-label={title} tabIndex={-1} style={place}>
        <div className="field-popover__head">
          <strong>{title}</strong>
          <Button buttonStyle="secondary" size="small" margin={false} onClick={onClose}>
            {t(T.manager.fieldClose)}
          </Button>
        </div>
        {children}
      </div>
    </>
  );
}

/**
 * Fields of the document itself (not of the section), in the dialog's header: the same form
 * fields as in the document's own form, rendered a second time here. Nothing where the document
 * has no such field (a shared section has no colour scheme of its own).
 */
function DocumentFields({names}: {names: string[]}) {
  const {getEntityConfig} = useConfig();
  const {collectionSlug, globalSlug, docPermissions} = useDocumentInfo();
  const slug = collectionSlug ?? globalSlug;
  const entity = collectionSlug ? getEntityConfig({collectionSlug}) : globalSlug ? getEntityConfig({globalSlug}) : null;
  const fields = ((entity?.fields ?? []) as ClientField[]).filter((f) => 'name' in f && names.includes(f.name));
  // always there: it keeps the title on the left and the button on the right
  return <div className="section-manager__fields">{slug && fields.length ? <RenderFields fields={fields} forceRender parentIndexPath="" parentPath="" parentSchemaPath={slug} permissions={docPermissions?.fields ?? true} /> : null}</div>;
}

/** the section just above `path` in its array (`sections.3` → `sections.2`), or none */
const pathAbove = (path: string): string | null => {
  const m = /^(.*)\.(\d+)$/.exec(path);
  return m && Number(m[2]) > 0 ? `${m[1]}.${Number(m[2]) - 1}` : null;
};

/** Collects the section's values (and the document fields the host asked for) and feeds the preview. */
function LivePreview({parentPath, preview, onEvent, overlay}: {parentPath: string; preview: SectionPreviewOptions; onEvent: (event: PreviewEvent, toScreen: (box: PreviewBox) => PreviewBox) => void; overlay: (columns: PreviewColumnBox[]) => React.ReactNode}) {
  const {getData, getDataByPath} = useForm();
  const {id, collectionSlug, globalSlug} = useDocumentInfo();
  const locale = useLocale();
  const {i18n} = useTranslation();
  // any change of the form: a new snapshot (the preview debounces what it sends)
  const version = useFormFields(([fields]) => fields);
  const message = React.useMemo(() => {
    const data = getData() as Record<string, unknown>;
    const section = (parentPath ? getDataByPath(parentPath) : data) as Record<string, unknown> | undefined;
    const abovePath = pathAbove(parentPath);
    const above = abovePath ? (getDataByPath(abovePath) as Record<string, unknown> | undefined) : undefined;
    const document: Record<string, unknown> = {};
    for (const name of preview.documentFields ?? []) document[name] = data?.[name];
    return {section: section ?? {}, above, parts: preview.parts, document, id: id ?? undefined, collection: collectionSlug ?? globalSlug ?? undefined, locale: locale?.code, language: i18n.language};
    // `version` changes on every edit: it is what triggers the new snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, parentPath, id, collectionSlug, globalSlug, locale?.code, preview.parts, i18n.language]);
  return <SectionPreview url={preview.url} breakpoints={preview.breakpoints ?? DEFAULT_BREAKPOINTS} message={message} onEvent={onEvent} overlay={overlay} />;
}

'use client';

/**
 * SectionManager — the section's fields, edited in a full-screen dialog (« Gérer », Nicolas,
 * 1 Oct. 2026) instead of in the page's form:
 *   - in the page, the section shows only a « Gérer » button (and how many fields need fixing);
 *   - the dialog: settings on top (35 %), in three horizontal accordions (one open, the others
 *     folded to a vertical strip), the live preview below (65 %); a handle between the two
 *     shares the height differently (remembered per user).
 *
 * It is the custom component of an unnamed collapsible wrapping the section's two framed blocks
 * (settings, rows), so the data does not change. Its children are rendered by Payload
 * (RenderFields) with the paths Payload's own collapsible would give them; their values live in
 * the form state, so closing the dialog loses nothing and the page is saved as usual.
 */
import {Button, Modal, RenderFields, useConfig, useDocumentInfo, useForm, useFormFields, useLocale, useModal, usePreferences} from '@payloadcms/ui';
import type {ClientField, CollapsibleFieldClient, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import React, {useEffect, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {DEFAULT_BREAKPOINTS, type SectionPreviewOptions} from './preview';
import {SectionPreview} from './SectionPreview';

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
};

type PanelKey = 'settings' | 'layout' | 'blocks';

/** share of the dialog's height taken by the settings, in %: the default, and how far the handle goes */
const SPLIT = 35;
const SPLIT_MIN = 20;
const SPLIT_MAX = 80;
const SPLIT_STEP = 2;
/** the last split chosen, remembered per user (Payload preferences) */
const SPLIT_PREFERENCE = 'section-manager-split';
/** kept to a tenth of a percent: the handle follows the pointer smoothly */
const clampSplit = (n: number) => Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, Math.round(n * 10) / 10));

/** fields of the framed block at `index` (an unnamed collapsible), or none */
const innerFields = (field: CollapsibleFieldClient, index: number): ClientField[] => {
  const f = field.fields[index] as CollapsibleFieldClient | undefined;
  return f && 'fields' in f ? f.fields : [];
};

/**
 * The settings cut at each group heading: one list per group, as long as the whole list, the other
 * groups' fields left out (null). RenderFields skips the holes and keeps each field's position,
 * so every field has the path Payload gave it.
 */
function byGroup(fields: ClientField[], groups: string[]): ClientField[][] {
  const out: ClientField[][] = [];
  fields.forEach((f, i) => {
    const starts = f.type === 'ui' && groups.includes(f.name);
    if (starts || out.length === 0) out.push(fields.map(() => null as unknown as ClientField));
    out[out.length - 1][i] = f;
  });
  return out;
}

export function SectionManager({field, path, indexPath, parentPath, parentSchemaPath, permissions, readOnly, preview, groups, headerFields}: Props) {
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
            onClose={() => closeModal(slug)}
          />
        ) : null}
      </Modal>
    </div>
  );
}

function ManagerBody({field, indexPath, parentPath, parentSchemaPath, permissions, readOnly, preview, groups = [], headerFields = [], onClose}: Omit<Props, 'path'> & {onClose: () => void}) {
  const {t} = useAdminText();
  const [panel, setPanel] = useState<PanelKey>('settings');
  // the handle between the settings and the preview: drag it (or arrow keys) to share the height
  const body = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(SPLIT);
  const dragging = useRef(false);
  const grab = useRef(0);
  const {getPreference, setPreference} = usePreferences();
  useEffect(() => {
    let live = true;
    getPreference<number | undefined>(SPLIT_PREFERENCE)
      .then((saved) => {
        if (live && typeof saved === 'number') setSplit(clampSplit(saved));
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [getPreference]);
  const keep = (value: number) => {
    const next = clampSplit(value);
    setSplit(next);
    void setPreference(SPLIT_PREFERENCE, next);
  };
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
    keep(split);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') keep(split - SPLIT_STEP);
    else if (e.key === 'ArrowDown') keep(split + SPLIT_STEP);
    else if (e.key === 'Home') keep(SPLIT_MIN);
    else if (e.key === 'End') keep(SPLIT_MAX);
    else return;
    e.preventDefault();
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
  // the settings side by side, one column per group: no vertical scroll in the top part
  const settings = (
    <div className="section-manager__groups">
      {byGroup(innerFields(field, 0), groups).map((fields, i) => (
        <div key={i} className="section-manager__group">
          {render(0, fields)}
        </div>
      ))}
    </div>
  );
  const panels: {key: PanelKey; label: string; content: React.ReactNode}[] = [
    {key: 'settings', label: t(T.manager.panelSettings), content: settings},
    {key: 'layout', label: t(T.manager.panelLayout), content: render(1)},
    {key: 'blocks', label: t(T.manager.panelBlocks), content: <p className="section-manager__soon">{t(T.manager.blocksSoon)}</p>},
  ];

  return (
    <div ref={body} className="section-manager__body" style={{'--section-manager-split': `${split}%`} as React.CSSProperties}>
      <header className="section-manager__bar">
        <h2 className="section-manager__title">{t(T.manager.title)}</h2>
        <DocumentFields names={headerFields} />
        <div className="section-manager__close">
          <Button buttonStyle="primary" margin={false} onClick={onClose}>
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
          aria-valuenow={split}
          title={t(T.manager.resize)}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => keep(SPLIT)}
          onKeyDown={onKeyDown}
        />
      ) : null}
      {preview ? <LivePreview parentPath={parentPath} preview={preview} /> : null}
    </div>
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
function LivePreview({parentPath, preview}: {parentPath: string; preview: SectionPreviewOptions}) {
  const {getData, getDataByPath} = useForm();
  const {id, collectionSlug, globalSlug} = useDocumentInfo();
  const locale = useLocale();
  // any change of the form: a new snapshot (the preview debounces what it sends)
  const version = useFormFields(([fields]) => fields);
  const message = React.useMemo(() => {
    const data = getData() as Record<string, unknown>;
    const section = (parentPath ? getDataByPath(parentPath) : data) as Record<string, unknown> | undefined;
    const abovePath = pathAbove(parentPath);
    const above = abovePath ? (getDataByPath(abovePath) as Record<string, unknown> | undefined) : undefined;
    const document: Record<string, unknown> = {};
    for (const name of preview.documentFields ?? []) document[name] = data?.[name];
    return {section: section ?? {}, above, document, id: id ?? undefined, collection: collectionSlug ?? globalSlug ?? undefined, locale: locale?.code};
    // `version` changes on every edit: it is what triggers the new snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, parentPath, id, collectionSlug, globalSlug, locale?.code]);
  return <SectionPreview url={preview.url} breakpoints={preview.breakpoints ?? DEFAULT_BREAKPOINTS} message={message} />;
}

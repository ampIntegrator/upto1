'use client';

/**
 * HeroManager — the page top's fields (the `hero` group), edited in a full-screen dialog
 * (« Gérer ») with a live preview of the hero below: the dialog of the section manager, for the
 * page top. In the page's form the group shows as a button (and how many fields need fixing).
 *
 * It is the custom component of an unnamed collapsible wrapping the `hero` group, so the data does
 * not change; the group's fields are rendered by Payload (RenderFields) and their values live in
 * the form state: closing the dialog loses nothing. The preview is the section manager's
 * (SectionPreview, the same iframe protocol, the same store): the hero travels as the one block of
 * a one-column section, and the frame's in-place editing is the one of the sections. The frame is
 * 800 px high whatever the hero shows, so the full-screen layouts fill it.
 */
import {getTranslation} from '@payloadcms/translations';
import {Button, Modal, RenderFields, useDocumentInfo, useForm, useFormFields, useFormModified, useLocale, useModal, useTranslation} from '@payloadcms/ui';
import type {ClientField, CollapsibleFieldClient, SanitizedFieldPermissions, SanitizedFieldsPermissions} from 'payload';
import React, {useMemo, useRef, useState} from 'react';

import {FieldPopover} from '@/fields/sections/FieldPopover';
import {byGroup, fieldAt, only, onlyDeep} from '@/fields/sections/fieldGroups';
import {DEFAULT_BREAKPOINTS, PREVIEW_EDIT, PREVIEW_PICK, type PreviewBox, type PreviewEvent} from '@/fields/sections/preview';
import {SectionPreview} from '@/fields/sections/SectionPreview';
import {useSelectMenus} from '@/fields/sections/useSelectMenus';
import {heroText as H} from '@/i18n/admin/blocks';
import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import '@/fields/sections/tokens.scss';
import '@/fields/sections/SectionManager.scss';
import './HeroManager.scss';

/** the height of the preview's frame, in its own pixels */
const FRAME_HEIGHT = 800;
/** what the frame's in-place editing knows the hero as: the block type of its one block */
const BLOCK = 'hero';
const WIDTH_PREFERENCE = 'hero-preview-width';
/** the text fields that make a column of their own (the long ones), apart from the rest of the text group */
const LONG_TEXTS = ['title', 'lead'];

type Props = {
  field: CollapsibleFieldClient;
  path: string;
  indexPath: string;
  parentPath: string;
  parentSchemaPath: string;
  permissions?: SanitizedFieldPermissions | SanitizedFieldsPermissions;
  readOnly?: boolean;
  /** the preview page's address, the document fields it follows, the hero's parts → fields */
  preview: {url: string; documentFields?: string[]; parts: Record<string, string>};
};

const join = (...parts: string[]) => parts.filter(Boolean).join('.');
/** the path without the `_index-…` Payload adds for a field inside unnamed tabs and collapsibles */
const plainPath = (path: string): string => path.replace(/(^|\.)_index-[\d-]+/g, '');

export function HeroManager({field, path, parentPath: givenParentPath, parentSchemaPath, permissions, readOnly, preview}: Props) {
  const parentPath = plainPath(givenParentPath);
  const {t} = useAdminText();
  const {openModal, closeModal, isModalOpen} = useModal();
  const slug = `hero-manager-${path}`;
  const heroPath = join(parentPath, 'hero');
  // invalid fields of the hero (after a save attempt): shown next to the button
  const errors = useFormFields(([fields]) => Object.entries(fields).filter(([p, f]) => p.startsWith(`${heroPath}.`) && f?.valid === false).length);
  const open = isModalOpen(slug);
  return (
    <div className="section-manager">
      <div className="section-manager__summary">
        <p className="section-manager__summary-label">{t(H.label)}</p>
        <div className="section-manager__summary-row">
          <Button buttonStyle="secondary" margin={false} onClick={() => openModal(slug)}>
            {t(H.manager.open)}
          </Button>
          {errors > 0 ? <span className="section-manager__errors">{t(T.manager.errors, {n: errors})}</span> : null}
        </div>
      </div>
      <Modal slug={slug} className="section-manager__modal" closeOnBlur={false}>
        {open ? <HeroBody field={field} parentPath={parentPath} parentSchemaPath={parentSchemaPath} permissions={permissions} readOnly={readOnly} preview={preview} onClose={() => closeModal(slug)} /> : null}
      </Modal>
    </div>
  );
}

function HeroBody({field, parentPath, parentSchemaPath, permissions, readOnly, preview, onClose}: Omit<Props, 'path' | 'indexPath'> & {onClose: () => void}) {
  const {t} = useAdminText();
  const {i18n} = useTranslation();
  const {submit, getFields, getData, getDataByPath, dispatchFields, setModified} = useForm();
  const {id, collectionSlug} = useDocumentInfo();
  const locale = useLocale();
  const modified = useFormModified();
  const [saving, setSaving] = useState(false);
  const heroPath = join(parentPath, 'hero');
  const heroField = field.fields[0] as {fields?: ClientField[]} | undefined;
  const heroFields = useMemo(() => heroField?.fields ?? [], [heroField]);
  // the group's fields cut at each group heading, one list each: layout, text, buttons, background, breadcrumb
  const lists = useMemo(() => byGroup(heroFields, (f) => f.type === 'ui'), [heroFields]);
  const panelsRef = useRef<HTMLDivElement>(null);
  useSelectMenus(panelsRef);
  const heroPermissions = permissions === true || permissions === undefined ? true : ((permissions as Record<string, {fields?: SanitizedFieldsPermissions}>).hero?.fields ?? true);

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

  // a new snapshot when the hero's values (or the page's silo, which colours it) change
  const watched = preview.documentFields ?? [];
  const version = useFormFields(([fields]) => {
    let signature = '';
    for (const key in fields) {
      if (!key.startsWith(`${heroPath}.`) && !watched.includes(key)) continue;
      const value = fields[key]?.value;
      signature += `${key}=${typeof value === 'object' ? JSON.stringify(value) : String(value)}\u0000`;
    }
    return signature;
  });
  const message = useMemo(() => {
    const data = getData() as Record<string, unknown>;
    const hero = (getDataByPath(heroPath) ?? {}) as Record<string, unknown>;
    const document: Record<string, unknown> = {};
    for (const name of watched) document[name] = data?.[name];
    // the hero as the one block of a one-column section: the frame's editing reads it that way
    return {
      section: {rows: [{columns: [{span: 12, contents: [{blockType: BLOCK, ...hero}]}]}]},
      parts: {[BLOCK]: preview.parts},
      document,
      id: id ?? undefined,
      collection: collectionSlug ?? undefined,
      locale: locale?.code,
      language: i18n.language,
    };
    // `version` changes on every edit: it is what triggers the new snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, heroPath, id, collectionSlug, locale?.code, preview.parts, i18n.language]);

  // a part that opens its field in a popover (a button, an image, a label…)
  const [picking, setPicking] = useState<{field: string; x: number; y: number; top: number} | null>(null);
  const onEvent = (event: PreviewEvent, toScreen: (box: PreviewBox) => PreviewBox) => {
    if (event.type === PREVIEW_EDIT) {
      // only a text field the form knows
      const target = `${heroPath}.${event.field}`;
      if (readOnly || !getFields()[target]) return;
      dispatchFields({type: 'UPDATE', path: target, value: event.value, valid: true});
      setModified(true);
    }
    if (event.type === PREVIEW_PICK) {
      if (readOnly || !fieldAt(heroFields, event.field)) return;
      const box = toScreen(event.box);
      setPicking({field: event.field, x: box.x, y: box.y + box.height, top: box.y});
    }
  };
  const picked = picking ? fieldAt(heroFields, picking.field) : undefined;

  // the text group in two: the short fields (with the layout choice), the long ones
  const textShort = useMemo(() => (lists[1] ? only(lists[1], (f) => Boolean(f) && !('name' in f && LONG_TEXTS.includes(f.name))) : []), [lists]);
  const textLong = useMemo(() => (lists[1] ? only(lists[1], (f) => Boolean(f) && 'name' in f && LONG_TEXTS.includes(f.name)) : []), [lists]);
  /** one column: the lists of fields it holds, one under the other */
  const column = (...fieldLists: ClientField[][]) => (
    <div className="section-manager__group">
      {fieldLists.map((l, i) => (l.length ? <RenderFields key={i} fields={l} forceRender parentIndexPath="" parentPath={heroPath} parentSchemaPath={join(parentSchemaPath, 'hero')} permissions={heroPermissions} readOnly={readOnly} /> : null))}
    </div>
  );

  return (
    <div className="section-manager__body">
      <header className="section-manager__bar">
        <h2 className="section-manager__title">{t(H.manager.title)}</h2>
        <span />
        <div className="section-manager__close">
          {!readOnly ? (
            <Button buttonStyle="secondary" margin={false} disabled={saving || !modified} onClick={() => void save()}>
              {t(T.manager.save)}
            </Button>
          ) : null}
          {!readOnly ? (
            <Button buttonStyle="primary" margin={false} disabled={saving} onClick={saveAndClose}>
              {t(T.manager.saveAndClose)}
            </Button>
          ) : null}
          <Button buttonStyle="secondary" margin={false} onClick={onClose}>
            {t(T.manager.close)}
          </Button>
        </div>
      </header>
      {/* the settings in columns: layout, short texts and breadcrumb, title and lead, buttons, background (a column with nothing to show hides itself) */}
      <div ref={panelsRef} className="hero-manager__top">
        <div className="section-manager__groups">
          {column(lists[0] ?? [], textShort, lists[4] ?? [])}
          {column(textLong)}
          {column(lists[2] ?? [])}
          {column(lists[3] ?? [])}
        </div>
      </div>
      <SectionPreview url={preview.url} breakpoints={DEFAULT_BREAKPOINTS} message={message} onEvent={onEvent} fixedHeight={FRAME_HEIGHT} preference={WIDTH_PREFERENCE} />
      {picking && picked ? (
        <FieldPopover x={picking.x} y={picking.y} top={picking.top} title={String(getTranslation((picked.row && 'labels' in picked.field && picked.field.labels?.singular) || ('label' in picked.field && picked.field.label) || picking.field, i18n))} onClose={() => setPicking(null)}>
          <RenderFields
            fields={picked.row ? picked.scope : onlyDeep(picked.scope, picked.field)}
            forceRender
            parentIndexPath=""
            parentPath={join(heroPath, ...picking.field.split('.').slice(0, picked.row ? undefined : -1))}
            parentSchemaPath={join(parentSchemaPath, 'hero', ...picked.schema)}
            permissions={(permissions ?? true) as SanitizedFieldsPermissions}
            readOnly={readOnly}
          />
        </FieldPopover>
      ) : null}
    </div>
  );
}

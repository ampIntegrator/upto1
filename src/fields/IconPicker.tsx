'use client';

/**
 * IconPicker — admin component for the « icône » field, dressed like a Payload select: one 40 px
 * control with the chosen icon and its readable name, the actions at its end (« Changer »,
 * « Retirer »; « Choisir » when empty). The button opens a Payload drawer with the whole Nucleo
 * set six icons wide, a search by name, one click to choose. Admin UI: outside the site design
 * system, inline styles on Payload variables.
 */
import {getTranslation} from '@payloadcms/translations';
import {Drawer, FieldLabel, useDrawerSlug, useField, useModal, useTranslation} from '@payloadcms/ui';
import type {TextFieldClientProps} from 'payload';
import React, {useMemo, useState} from 'react';

import {fieldsText} from '@/i18n/admin/fields';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {NUCLEO_KEYS, NUCLEO_SETS, type NucleoIconKey} from '@/theme/icons/keys';
import {NUCLEO_ICONS} from '@/theme/icons/nucleo';

/** « arrow-right » → « Arrow right » */
const readable = (key: string): string => key.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

const control: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  height: 40,
  padding: '0 6px 0 10px',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 'var(--style-radius-s, 4px)',
  background: 'var(--theme-input-bg)',
  color: 'var(--theme-text)',
};
const action: React.CSSProperties = {
  border: 0,
  background: 'transparent',
  padding: '6px 8px',
  font: 'inherit',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--theme-text)',
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  textDecorationColor: 'var(--theme-elevation-400)',
};
const cell: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: '14px 6px 10px',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 'var(--style-radius-s, 4px)',
  background: 'var(--theme-elevation-0)',
  cursor: 'pointer',
  color: 'var(--theme-text)',
  font: 'inherit',
};

export function IconPicker(props: TextFieldClientProps) {
  const {path, field} = props;
  const {value, setValue} = useField<string>({path});
  const {i18n} = useTranslation();
  const {t} = useAdminText();
  const {toggleModal, closeModal} = useModal();
  const slug = useDrawerSlug(`icone-${path}`);
  const [query, setQuery] = useState('');
  const Current = value && (NUCLEO_KEYS as string[]).includes(value) ? NUCLEO_ICONS[value as NucleoIconKey] : null;
  const keys = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? NUCLEO_KEYS.filter((k) => k.includes(q)) : NUCLEO_KEYS;
  }, [query]);
  const label = field.label ? getTranslation(field.label, i18n) : t(fieldsText.icon.label);

  return (
    // in a row, a custom field gets no width from Payload: take the whole column (or the row's free share)
    <div className="field-type" style={{flex: '1 1 0', minWidth: 0, width: '100%'}}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div style={control}>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, flex: '0 0 auto', color: Current ? 'var(--theme-text)' : 'var(--theme-elevation-400)'}}>
          {Current ? <Current width={20} height={20} /> : <span aria-hidden="true" style={{width: 14, height: 1, background: 'currentColor'}} />}
        </span>
        <span style={{flex: '1 1 auto', minWidth: 0, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: Current ? 'var(--theme-text)' : 'var(--theme-elevation-500)'}}>
          {Current ? readable(value) : t(fieldsText.icon.none)}
        </span>
        <span style={{display: 'flex', alignItems: 'center', gap: 2, flex: '0 0 auto'}}>
          <button type="button" style={action} onClick={() => toggleModal(slug)}>{Current ? t(fieldsText.icon.change) : t(fieldsText.icon.choose)}</button>
          {Current ? <button type="button" style={{...action, color: 'var(--theme-elevation-600)'}} onClick={() => setValue('')}>{t(fieldsText.icon.remove)}</button> : null}
        </span>
      </div>
      <Drawer slug={slug} title={t(fieldsText.icon.drawerTitle)} gutter>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(fieldsText.icon.search, {count: NUCLEO_KEYS.length})}
            autoFocus
            style={{height: 40, padding: '0 12px', border: '1px solid var(--theme-elevation-150)', borderRadius: 'var(--style-radius-s, 4px)', background: 'var(--theme-input-bg)', color: 'var(--theme-text)', fontSize: 13}}
          />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 8}}>
            {keys.map((k) => {
              const Glyph = NUCLEO_ICONS[k];
              const selected = k === value;
              return (
                <button key={k} type="button" onClick={() => { setValue(k); closeModal(slug); }} title={`${k} · ${NUCLEO_SETS[k]}`}
                  style={{...cell, borderColor: selected ? 'var(--theme-success-500)' : 'var(--theme-elevation-150)', boxShadow: selected ? '0 0 0 2px var(--theme-success-500)' : undefined}}>
                  <Glyph width={24} height={24} />
                  <span style={{fontSize: 12, lineHeight: 1.25, textAlign: 'center', wordBreak: 'break-word', color: 'var(--theme-elevation-700)'}}>{readable(k)}</span>
                </button>
              );
            })}
          </div>
          {keys.length === 0 ? <p style={{color: 'var(--theme-elevation-500)'}}>{t(fieldsText.icon.empty)}</p> : null}
        </div>
      </Drawer>
    </div>
  );
}

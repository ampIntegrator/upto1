'use client';

/**
 * IconPicker — admin component for the « icône » field: preview of the chosen icon, a button that
 * opens a Payload drawer with a grid six icons wide (the whole Nucleo set, two
 * folders), search by name, one click to choose. Admin UI: outside the site design
 * system, inline styles on Payload variables.
 */
import {getTranslation} from '@payloadcms/translations';
import {Button, Drawer, FieldLabel, useDrawerSlug, useField, useModal, useTranslation} from '@payloadcms/ui';
import type {TextFieldClientProps} from 'payload';
import React, {useMemo, useState} from 'react';

import {fieldsText} from '@/i18n/admin/fields';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {NUCLEO_KEYS, NUCLEO_SETS, type NucleoIconKey} from '@/theme/icons/keys';
import {NUCLEO_ICONS} from '@/theme/icons/nucleo';

const cell: React.CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 4px', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-0)', cursor: 'pointer', borderRadius: 4, color: 'var(--theme-text)'};

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
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--theme-elevation-150)', borderRadius: 4, background: 'var(--theme-elevation-0)'}}>
          {Current ? <Current width={22} height={22} /> : <span style={{fontSize: 11, color: 'var(--theme-elevation-500)'}}>—</span>}
        </span>
        <span style={{fontFamily: 'monospace', fontSize: 13, minWidth: 120}}>{value || t(fieldsText.icon.none)}</span>
        <Button size="small" buttonStyle="secondary" onClick={() => toggleModal(slug)}>{t(fieldsText.icon.choose)}</Button>
        {value ? <Button size="small" buttonStyle="none" onClick={() => setValue('')}>{t(fieldsText.icon.remove)}</Button> : null}
      </div>
      <Drawer slug={slug} title={t(fieldsText.icon.drawerTitle)} gutter>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(fieldsText.icon.search, {count: NUCLEO_KEYS.length})}
            autoFocus
            style={{padding: '10px 12px', border: '1px solid var(--theme-elevation-150)', borderRadius: 4, background: 'var(--theme-input-bg)', color: 'var(--theme-text)', fontSize: 14}}
          />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 8}}>
            {keys.map((k) => {
              const Glyph = NUCLEO_ICONS[k];
              const selected = k === value;
              return (
                <button key={k} type="button" onClick={() => { setValue(k); closeModal(slug); }} title={`${k} · ${NUCLEO_SETS[k]}`}
                  style={{...cell, borderColor: selected ? 'var(--theme-success-500)' : cell.border as string, boxShadow: selected ? '0 0 0 2px var(--theme-success-500)' : undefined}}>
                  <Glyph width={24} height={24} />
                  <span style={{fontSize: 11, lineHeight: 1.2, textAlign: 'center', wordBreak: 'break-word'}}>{k}</span>
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

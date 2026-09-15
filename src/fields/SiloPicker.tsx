'use client';

/**
 * SiloPicker — admin component for the « silo » field: coloured swatches (same principle as
 * the catalogue picker), the chosen swatch becomes a pill. Without an explicit value
 * (older page), the silo swatch from site settings is shown as chosen.
 */
import {getTranslation} from '@payloadcms/translations';
import {FieldLabel, useField, useTranslation} from '@payloadcms/ui';
import type {SelectFieldClientProps} from 'payload';
import React, {useEffect, useState} from 'react';

import {fieldsText} from '@/i18n/admin/fields';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {SILOS, type SiloName} from '@/theme/silos/palettes';

export function SiloPicker(props: SelectFieldClientProps) {
  const {path, field} = props;
  const {value, setValue} = useField<string>({path});
  const {i18n} = useTranslation();
  const {t} = useAdminText();
  const options = (field.options ?? []).map((o) => (typeof o === 'string' ? {label: o, value: o} : o));
  const label = field.label ? getTranslation(field.label, i18n) : t(fieldsText.silo.label);
  const explicit = options.some((o) => o.value === value);
  const [siteSilo, setSiteSilo] = useState<string | null>(null);
  useEffect(() => {
    if (explicit) return;
    fetch('/api/globals/settings?depth=0', {credentials: 'include'})
      .then((r) => (r.ok ? r.json() : null))
      .then((d: {silo?: string} | null) => setSiteSilo(d?.silo ?? 'blue'))
      .catch(() => setSiteSilo('blue'));
  }, [explicit]);
  const shown = explicit ? value : siteSilo;
  const current = options.find((o) => o.value === shown);

  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div role="radiogroup" aria-label={label} className="silo-picker">
        {options.map((o) => {
          const silo = o.value as SiloName;
          const selected = shown === o.value;
          const color = SILOS[silo]?.primary;
          const translated = o.label ? getTranslation(o.label, i18n) : null;
          const text = typeof translated === 'string' ? translated : String(o.value);
          return (
            <button key={String(o.value)} type="button" role="radio" aria-checked={selected} title={text} onClick={() => setValue(o.value)}
              style={{
                width: 48, height: 28, padding: 0, border: 0, cursor: 'pointer',
                background: color,
                borderRadius: selected ? 14 : 0,
                outline: selected ? '2px solid var(--theme-text)' : 'none',
                outlineOffset: 2,
                transition: 'border-radius .2s',
              }}
            />
          );
        })}
      </div>
      <p style={{margin: '8px 0 0', fontSize: 14, color: 'var(--theme-elevation-500)'}}>
        {current ? (current.label ? getTranslation(current.label, i18n) : String(current.value)) : '…'}
        {!explicit && current ? t(fieldsText.silo.siteSilo) : ''}
      </p>
    </div>
  );
}

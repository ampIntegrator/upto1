'use client';

/**
 * SiloPicker — composant d'admin du champ « silo » : pastilles colorées (même principe que
 * le sélecteur du catalogue), la pastille choisie devient une pilule. Sans valeur explicite
 * (page ancienne), la pastille du silo des Réglages du site est montrée comme choisie.
 */
import {FieldLabel, useField} from '@payloadcms/ui';
import type {SelectFieldClientProps} from 'payload';
import React, {useEffect, useState} from 'react';

import {SILOS, type SiloName} from '@/theme/index';

export function SiloPicker(props: SelectFieldClientProps) {
  const {path, field} = props;
  const {value, setValue} = useField<string>({path});
  const options = (field.options ?? []).map((o) => (typeof o === 'string' ? {label: o, value: o} : o));
  const label = typeof field.label === 'string' ? field.label : "Silo d'accent";
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
      <div role="radiogroup" aria-label={label} style={{display: 'grid', gridTemplateColumns: 'repeat(3, 48px)', gap: 8}}>
        {options.map((o) => {
          const silo = o.value as SiloName;
          const selected = shown === o.value;
          const color = SILOS[silo]?.primary;
          const text = typeof o.label === 'string' ? o.label : String(o.value);
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
      <p style={{margin: '8px 0 0', fontSize: 13, color: 'var(--theme-elevation-500)'}}>
        {current ? (typeof current.label === 'string' ? current.label : String(current.value)) : '…'}
        {!explicit && current ? ' (silo du site)' : ''}
      </p>
    </div>
  );
}

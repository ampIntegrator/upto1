'use client';

/**
 * SiloPicker — composant d'admin du champ « silo » : pastilles colorées (même principe que
 * le sélecteur du catalogue), la pastille choisie devient une pilule. « Hériter » est une
 * pastille hachurée.
 */
import {FieldLabel, useField} from '@payloadcms/ui';
import type {SelectFieldClientProps} from 'payload';
import React from 'react';

import {SILO_LABELS, SILOS, type SiloName} from '@/theme/index';

export function SiloPicker(props: SelectFieldClientProps) {
  const {path, field} = props;
  const {value, setValue} = useField<string>({path});
  const options = (field.options ?? []).map((o) => (typeof o === 'string' ? {label: o, value: o} : o));
  const label = typeof field.label === 'string' ? field.label : "Silo d'accent";
  const current = options.find((o) => o.value === value);

  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div role="radiogroup" aria-label={label} style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
        {options.map((o) => {
          const silo = o.value as SiloName | 'inherit';
          const selected = value === o.value;
          const color = silo === 'inherit' ? undefined : SILOS[silo as SiloName]?.primary;
          const text = typeof o.label === 'string' ? o.label : String(o.value);
          return (
            <button key={String(o.value)} type="button" role="radio" aria-checked={selected} title={text} onClick={() => setValue(o.value)}
              style={{
                width: 48, height: 28, padding: 0, border: 0, cursor: 'pointer',
                background: color ?? 'repeating-linear-gradient(45deg, var(--theme-elevation-200) 0 4px, var(--theme-elevation-50) 4px 8px)',
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
        {current ? (typeof current.label === 'string' ? current.label : String(current.value)) : 'Aucun'}
        {value && value !== 'inherit' && SILO_LABELS[value as SiloName] ? '' : ''}
      </p>
    </div>
  );
}

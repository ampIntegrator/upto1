'use client';

/**
 * SwatchRadio — admin component for a radio field whose options are colours: one swatch per
 * option (the real colour of the page's silo, or the site's silo for shared sections), the
 * option's name only on hover (title) and for assistive technologies (aria-label). The chosen
 * swatch becomes a pill, like the silo picker. Used by the section background settings
 * (src/sections.config.ts), which map each option value to a swatch kind.
 */
import {getTranslation} from '@payloadcms/translations';
import {FieldError, FieldLabel, useField, useFormFields, useTranslation} from '@payloadcms/ui';
import type {RadioFieldClientProps} from 'payload';
import React, {useEffect, useState} from 'react';

import {SILOS, type SiloName} from '@/theme/silos/palettes';

export type SwatchKind = 'body' | 'light' | 'highlight' | 'night' | 'night-halo';

/** hex a mixed with hex b, pctA % of a */
function mix(a: string, b: string, pctA: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const t = pctA / 100;
  const channel = (shift: number) => Math.round(((pa >> shift) & 255) * t + ((pb >> shift) & 255) * (1 - t));
  return `#${[16, 8, 0].map((sh) => channel(sh).toString(16).padStart(2, '0')).join('')}`;
}

/** the swatch's background for a silo (the section's real rendering, simplified) */
function swatchBackground(kind: SwatchKind, silo: (typeof SILOS)[SiloName]): string {
  switch (kind) {
    case 'body':
      return silo.bg;
    // the silo's primary at 5 % on the page background (--color-background-light)
    case 'light':
      return mix(silo.primary, silo.bg, 5);
    case 'highlight':
      return mix(silo.highlight, silo.bg, 5);
    case 'night':
      return silo.night;
    case 'night-halo':
      return `radial-gradient(circle at 70% 20%, ${mix(silo.highlight, silo.night, 55)} 0, ${silo.night} 70%)`;
  }
}

export type SwatchRadioProps = RadioFieldClientProps & {swatches?: Record<string, SwatchKind>};

export function SwatchRadio(props: SwatchRadioProps) {
  const {path, field, readOnly, swatches = {}} = props;
  const {value, setValue, showError, errorMessage} = useField<string>({path});
  const {i18n} = useTranslation();
  // the page's silo (sidebar field), otherwise the site's
  const pageSilo = useFormFields(([fields]) => fields.silo?.value as string | undefined);
  const [siteSilo, setSiteSilo] = useState<SiloName>('blue');
  useEffect(() => {
    if (pageSilo && pageSilo in SILOS) return;
    fetch('/api/globals/settings?depth=0', {credentials: 'include'})
      .then((r) => (r.ok ? r.json() : null))
      .then((d: {silo?: string} | null) => setSiteSilo(d?.silo && d.silo in SILOS ? (d.silo as SiloName) : 'blue'))
      .catch(() => undefined);
  }, [pageSilo]);
  const silo = SILOS[pageSilo && pageSilo in SILOS ? (pageSilo as SiloName) : siteSilo];
  const label = field.label ? getTranslation(field.label, i18n) : '';
  const options = (field.options ?? []).map((o) => (typeof o === 'string' ? {label: o, value: o} : o));

  return (
    <div className="field-type swatch-radio" style={{marginBottom: 'var(--base)'}}>
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div role="radiogroup" aria-label={typeof label === 'string' ? label : undefined} style={{display: 'flex', gap: 16, width: '100%'}}>
        {options.map((o) => {
          const selected = value === o.value;
          const text = o.label ? String(getTranslation(o.label, i18n)) : String(o.value);
          const kind = swatches[String(o.value)] ?? 'body';
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={text}
              title={text}
              disabled={readOnly}
              onClick={() => setValue(o.value)}
              // the same tile as the background composer's: a thin ring when selected, no pill
              style={{
                // the night shades (the only use left): half the row each, 120 px high
                flex: '1 1 0',
                minWidth: 0,
                height: 120,
                padding: 0,
                cursor: readOnly ? 'default' : 'pointer',
                background: swatchBackground(kind, silo),
                border: `1px solid ${selected ? 'var(--theme-text)' : 'var(--theme-elevation-250)'}`,
                borderRadius: 3,
                boxShadow: selected ? '0 0 0 2px var(--theme-bg), 0 0 0 3px var(--theme-text)' : 'none',
              }}
            />
          );
        })}
      </div>
      {showError && errorMessage ? <FieldError message={errorMessage} path={path} showError /> : null}
    </div>
  );
}

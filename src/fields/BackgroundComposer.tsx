'use client';

/**
 * BackgroundComposer — admin component for a light section's background: one preview box
 * (500 × 160) rendering the chosen shade with the chosen texture, in the real colours of the
 * page's silo, and beside it, stacked on two lines, the shades then the textures as named tiles. Bound to the
 * `tint` field; it drives the sibling `texture` field too (hidden in the form). Nicolas,
 * 23 September 2026: « un composeur de background, pour croiser les fonds et les textures avec
 * une boîte de rendu ». Admin UI: outside the site design system, inline styles on Payload
 * variables; the textures mirror src/components/Section.module.css.
 */
import {getTranslation} from '@payloadcms/translations';
import {FieldError, FieldLabel, useField, useFormFields, useTranslation} from '@payloadcms/ui';
import type {RadioFieldClientProps} from 'payload';
import React, {useEffect, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {SILOS, type SiloName} from '@/theme/silos/palettes';

type Tint = 'body' | 'light' | 'highlight';
type Texture = 'none' | 'grid' | 'dots' | 'losange';
const TINTS: Tint[] = ['body', 'light', 'highlight'];
const TEXTURES: Texture[] = ['none', 'grid', 'dots', 'losange'];

/** hex a mixed with hex b, pctA % of a */
function mix(a: string, b: string, pctA: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const t = pctA / 100;
  const channel = (shift: number) => Math.round(((pa >> shift) & 255) * t + ((pb >> shift) & 255) * (1 - t));
  return `#${[16, 8, 0].map((sh) => channel(sh).toString(16).padStart(2, '0')).join('')}`;
}

function shadeColor(tint: Tint, silo: (typeof SILOS)[SiloName]): string {
  if (tint === 'light') return mix(silo.primary, silo.bg, 5);
  if (tint === 'highlight') return mix(silo.highlight, silo.bg, 5);
  return silo.bg;
}

/** the site's textures (Section.module.css), at the same scale; `line` ≈ --color-border on a light page */
function textureImage(texture: Texture, scale = 1): React.CSSProperties {
  const line = 'rgba(24, 32, 56, 0.16)';
  const dot = 'rgba(24, 32, 56, 0.3)';
  const s = (n: number) => `${Math.round(n * scale)}px`;
  switch (texture) {
    case 'grid':
      return {backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`, backgroundSize: `${s(48)} ${s(48)}`, backgroundPosition: `${s(24)} ${s(24)}`};
    case 'dots':
      return {backgroundImage: `radial-gradient(${dot} 1.3px, transparent 1.5px)`, backgroundSize: `${s(32)} ${s(32)}`, backgroundPosition: `${s(16)} ${s(16)}`};
    case 'losange':
      return {backgroundImage: `repeating-linear-gradient(45deg, ${line} 0 1px, transparent 1px ${s(32)}), repeating-linear-gradient(-45deg, ${line} 0 1px, transparent 1px ${s(32)})`};
    default:
      return {};
  }
}

const tile = (selected: boolean, readOnly: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  padding: 0,
  border: 0,
  background: 'transparent',
  cursor: readOnly ? 'default' : 'pointer',
  font: 'inherit',
  color: selected ? 'var(--theme-text)' : 'var(--theme-elevation-600)',
});
const tileBox = (selected: boolean): React.CSSProperties => ({
  width: 44,
  height: 28,
  borderRadius: 3,
  border: `1px solid ${selected ? 'var(--theme-text)' : 'var(--theme-elevation-250)'}`,
  boxShadow: selected ? '0 0 0 2px var(--theme-bg), 0 0 0 3px var(--theme-text)' : 'none',
});
const tileLabel: React.CSSProperties = {fontSize: 11, lineHeight: '14px', whiteSpace: 'nowrap'};
const legend: React.CSSProperties = {fontSize: 11, lineHeight: '14px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--theme-elevation-500)', margin: 0};

export function BackgroundComposer(props: RadioFieldClientProps) {
  const {path, field, readOnly} = props;
  const {value: tintValue, setValue: setTint, showError, errorMessage} = useField<string>({path});
  const texturePath = path.replace(/tint$/, 'texture');
  const {value: textureValue, setValue: setTexture} = useField<string>({path: texturePath});
  const {i18n} = useTranslation();
  const {t} = useAdminText();
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
  const tint: Tint = TINTS.includes(tintValue as Tint) ? (tintValue as Tint) : 'body';
  const texture: Texture = TEXTURES.includes(textureValue as Texture) ? (textureValue as Texture) : 'none';
  const tintLabel: Record<Tint, string> = {body: t(T.settings.tintBody), light: t(T.settings.tintLight), highlight: t(T.settings.tintHighlight)};
  const textureLabel: Record<Texture, string> = {none: t(T.settings.textureNone), grid: t(T.settings.textureGrid), dots: t(T.settings.textureDots), losange: t(T.settings.textureLosange)};
  const short = (s: string) => s.replace(/\s*\(.*\)$/, '');
  const label = field.label ? String(getTranslation(field.label, i18n)) : '';

  return (
    <div className="field-type background-composer" style={{flex: '1 1 0', minWidth: 0, width: '100%'}}>
      {label ? <FieldLabel label={field.label} path={path} required={field.required} /> : null}
      <div style={{display: 'flex', alignItems: 'flex-start', gap: 28, flexWrap: 'wrap'}}>
        {/* the composed background, as the page will show it */}
        <div
          aria-hidden="true"
          title={`${short(tintLabel[tint])} · ${textureLabel[texture]}`}
          style={{width: 500, height: 160, flex: '0 0 auto', borderRadius: 3, border: '1px solid var(--theme-elevation-250)', backgroundColor: shadeColor(tint, silo), ...textureImage(texture)}}
        />
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
          <p style={legend}>{t(T.settings.tint)}</p>
          <div role="radiogroup" aria-label={t(T.settings.tint)} style={{display: 'flex', gap: 12}}>
            {TINTS.map((k) => {
              const selected = k === tint;
              return (
                <button key={k} type="button" role="radio" aria-checked={selected} title={tintLabel[k]} disabled={readOnly} onClick={() => setTint(k)} style={tile(selected, Boolean(readOnly))}>
                  <span style={{...tileBox(selected), backgroundColor: shadeColor(k, silo)}} />
                  <span style={tileLabel}>{short(tintLabel[k])}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
          <p style={legend}>{t(T.settings.texture)}</p>
          <div role="radiogroup" aria-label={t(T.settings.texture)} style={{display: 'flex', gap: 12}}>
            {TEXTURES.map((k) => {
              const selected = k === texture;
              return (
                <button key={k} type="button" role="radio" aria-checked={selected} title={textureLabel[k]} disabled={readOnly} onClick={() => setTexture(k)} style={tile(selected, Boolean(readOnly))}>
                  <span style={{...tileBox(selected), backgroundColor: shadeColor(tint, silo), ...textureImage(k, 0.5)}} />
                  <span style={tileLabel}>{textureLabel[k]}</span>
                </button>
              );
            })}
          </div>
        </div>
        </div>
      </div>
      {showError && errorMessage ? <FieldError message={errorMessage} path={path} showError /> : null}
    </div>
  );
}

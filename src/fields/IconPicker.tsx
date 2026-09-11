'use client';

/**
 * IconPicker — composant d'admin du champ « icône » : aperçu de l'icône choisie, bouton qui
 * ouvre un tiroir Payload avec une grille de six icônes de large (tout le jeu Nucleo, deux
 * dossiers), une recherche par nom, un clic pour choisir. Interface d'admin : hors design
 * system du site, styles inline sur les variables Payload.
 */
import {Button, Drawer, FieldLabel, useDrawerSlug, useField, useModal} from '@payloadcms/ui';
import type {TextFieldClientProps} from 'payload';
import React, {useMemo, useState} from 'react';

import {NUCLEO_KEYS, NUCLEO_SETS, type NucleoIconKey} from '@/theme/icons/keys';
import {NUCLEO_ICONS} from '@/theme/icons/nucleo';

const cell: React.CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 4px', border: '1px solid var(--theme-elevation-150)', background: 'var(--theme-elevation-0)', cursor: 'pointer', borderRadius: 4, color: 'var(--theme-text)'};

export function IconPicker(props: TextFieldClientProps) {
  const {path, field} = props;
  const {value, setValue} = useField<string>({path});
  const {toggleModal, closeModal} = useModal();
  const slug = useDrawerSlug(`icone-${path}`);
  const [query, setQuery] = useState('');
  const Current = value && (NUCLEO_KEYS as string[]).includes(value) ? NUCLEO_ICONS[value as NucleoIconKey] : null;
  const keys = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? NUCLEO_KEYS.filter((k) => k.includes(q)) : NUCLEO_KEYS;
  }, [query]);
  const label = typeof field.label === 'string' ? field.label : 'Icône';

  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <FieldLabel label={label} path={path} required={field.required} />
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--theme-elevation-150)', borderRadius: 4, background: 'var(--theme-elevation-0)'}}>
          {Current ? <Current width={22} height={22} /> : <span style={{fontSize: 11, color: 'var(--theme-elevation-500)'}}>—</span>}
        </span>
        <span style={{fontFamily: 'monospace', fontSize: 13, minWidth: 120}}>{value || 'aucune'}</span>
        <Button size="small" buttonStyle="secondary" onClick={() => toggleModal(slug)}>Choisir</Button>
        {value ? <Button size="small" buttonStyle="none" onClick={() => setValue('')}>Retirer</Button> : null}
      </div>
      <Drawer slug={slug} title="Choisir une icône" gutter>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Rechercher parmi ${NUCLEO_KEYS.length} icônes…`}
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
          {keys.length === 0 ? <p style={{color: 'var(--theme-elevation-500)'}}>Aucune icône ne correspond.</p> : null}
        </div>
      </Drawer>
    </div>
  );
}

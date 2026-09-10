'use client';

/**
 * OrbitaTimePicker — choix de l'heure au clic, comme le calendrier.
 *
 * Deux usages :
 *   <OrbitaTimePicker …>          heure seule, sur TimeInput Astryx
 *   <OrbitaDateTimePicker …>      date + heure, sur DateTimeInput Astryx
 *
 * Le champ Astryx reste dessous (saisie clavier, validation, accessibilité) ;
 * le panneau s'ouvre au clic ou au focus dans le segment heure, sous le champ,
 * à sa largeur : colonne des heures (00–23) et colonne des minutes (pas
 * réglable), valeur choisie en cercle couleur silo, raccourci « Maintenant ».
 * Choisir les minutes ferme le panneau.
 */
import {DateTimeInput, type ISODateTimeString} from '@astryxdesign/core/DateTimeInput';
import {TimeInput, type ISOTimeString} from '@astryxdesign/core/TimeInput';
import React, {useCallback, useEffect, useId, useMemo, useRef, useState} from 'react';

import {FloatingField} from './FloatingField';
import styles from './OrbitaTimePicker.module.css';

const pad = (n: number) => String(n).padStart(2, '0');
const HOURS = Array.from({length: 24}, (_, h) => h);

function parseTime(v: string | undefined): {h: number | null; m: number | null} {
  const m = v?.match(/^(\d{2}):(\d{2})/);
  return m ? {h: Number(m[1]), m: Number(m[2])} : {h: null, m: null};
}

/* ------------------------------------------------------------------ panneau */

function TimePanel({
  id,
  anchor,
  hour,
  minute,
  minuteStep,
  onPick,
  onClose,
}: {
  id: string;
  /** nom d'ancre CSS du champ (position-anchor) */
  anchor: string;
  hour: number | null;
  minute: number | null;
  minuteStep: number;
  onPick: (h: number, m: number | null, done: boolean) => void;
  onClose: () => void;
}) {
  const minutes = useMemo(() => Array.from({length: Math.floor(60 / minuteStep)}, (_, i) => i * minuteStep), [minuteStep]);
  const now = new Date();
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  // À l'ouverture : la valeur (ou l'heure courante) est amenée à la vue.
  useEffect(() => {
    const target = (list: HTMLDivElement | null, sel: string) => list?.querySelector<HTMLElement>(sel)?.scrollIntoView({block: 'center'});
    target(hoursRef.current, `[data-h="${hour ?? now.getHours()}"]`);
    target(minutesRef.current, `[data-m="${minute ?? Math.round(now.getMinutes() / minuteStep) * minuteStep}"]`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickNow = () => {
    // arrondi au pas ; 23:58 avec un pas de 5 donne 24:00 → on borne à 23:55
    const m = Math.round(now.getMinutes() / minuteStep) * minuteStep;
    const h = now.getHours() + (m === 60 ? 1 : 0);
    if (h > 23) onPick(23, 60 - minuteStep, true);
    else onPick(h, m === 60 ? 0 : m, true);
  };

  return (
    <div
      className={styles.panel}
      id={id}
      role="dialog"
      aria-label="Choisir une heure"
      style={{positionAnchor: anchor} as React.CSSProperties}
      onMouseDown={(e) => e.preventDefault()}>
      <div className={styles.columns}>
        <div>
          <span className={styles.colHead}>Heures</span>
          <div className={styles.list} ref={hoursRef} role="listbox" aria-label="Heures">
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                role="option"
                data-h={h}
                aria-selected={h === hour}
                className={[styles.cell, h === now.getHours() ? styles.now : null].filter(Boolean).join(' ')}
                onClick={() => onPick(h, minute, false)}>
                {pad(h)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className={styles.colHead}>Minutes</span>
          <div className={styles.list} ref={minutesRef} role="listbox" aria-label="Minutes" data-cols="2">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                role="option"
                data-m={m}
                aria-selected={m === minute}
                className={styles.cell}
                onClick={() => onPick(hour ?? now.getHours(), m, true)}>
                {pad(m)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.foot}>
        <button type="button" className={styles.footLink} onClick={pickNow}>
          Maintenant
        </button>
        <span className={styles.value}>{hour != null ? `${pad(hour)}:${pad(minute ?? 0)}` : '—'}</span>
        <button type="button" className={styles.footLink} onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

/** Ouverture / fermeture : clic ou focus dans la zone cible, Échap, clic dehors. */
function usePanel(wrapRef: React.RefObject<HTMLDivElement | null>, isTarget: (el: Element) => boolean) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, wrapRef]);
  const onFocusCapture = useCallback((e: React.FocusEvent) => isTarget(e.target) && setOpen(true), [isTarget]);
  const onClickCapture = useCallback((e: React.MouseEvent) => isTarget(e.target as Element) && setOpen(true), [isTarget]);
  return {open, setOpen, onFocusCapture, onClickCapture};
}

/* --------------------------------------------------------------- heure seule */

/** AAAA-MM-JJ en heure locale (toISOString() donnerait la date UTC, fausse entre minuit et 2 h). */
const localISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export type OrbitaTimePickerProps = {
  label: string;
  value: ISOTimeString | undefined;
  onChange: (value: ISOTimeString | undefined) => void;
  placeholder?: string;
  /** Pas des minutes : 5, 10, 15, 30. */
  minuteStep?: number;
  hasClear?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: string;
  style?: React.CSSProperties;
};

export function OrbitaTimePicker({label, value, onChange, placeholder = ' ', minuteStep = 5, hasClear = true, isDisabled, isRequired, description, style}: OrbitaTimePickerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const isTarget = useCallback((el: Element) => !!el.closest('.astryx-time-input') && !el.closest('.astryx-input-clear-button'), []);
  const {open, setOpen, onFocusCapture, onClickCapture} = usePanel(wrapRef, isTarget);
  const {h, m} = parseTime(value);
  const anchor = `--orbita-tp-${panelId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div ref={wrapRef} className={styles.wrap} style={{...style, anchorName: anchor} as React.CSSProperties} onFocusCapture={onFocusCapture} onClickCapture={onClickCapture}>
      <FloatingField label={label} hasValue={value != null} hasLead isRequired={isRequired} isDisabled={isDisabled}>
        <TimeInput label={label} isLabelHidden placeholder={placeholder} value={value} onChange={onChange} hasClear={hasClear} isDisabled={isDisabled} isRequired={isRequired} description={description} nativePicker="touch" hourFormat="24h" width="100%" />
      </FloatingField>
      {open && !isDisabled ? (
        <TimePanel
          id={panelId}
          anchor={anchor}
          hour={h}
          minute={m}
          minuteStep={minuteStep}
          onPick={(hh, mm, done) => {
            onChange(`${pad(hh)}:${pad(mm ?? 0)}` as ISOTimeString);
            if (done) setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- date + heure */

export type OrbitaDateTimePickerProps = {
  label: string;
  value: ISODateTimeString | undefined;
  onChange: (value: ISODateTimeString | undefined) => void;
  placeholder?: string;
  timePlaceholder?: string;
  minuteStep?: number;
  hasClear?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  description?: string;
  style?: React.CSSProperties;
};

export function OrbitaDateTimePicker({label, value, onChange, placeholder = 'Date', timePlaceholder = 'Heure', minuteStep = 5, hasClear = true, isDisabled, isRequired, description, style}: OrbitaDateTimePickerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  // Seul le segment heure ouvre notre panneau ; le segment date garde le calendrier Astryx.
  const isTarget = useCallback((el: Element) => !!el.closest('.astryx-date-time-input-time-segment'), []);
  const {open, setOpen, onFocusCapture, onClickCapture} = usePanel(wrapRef, isTarget);
  const [datePart, timePart] = (value ?? '').split('T');
  const {h, m} = parseTime(timePart);
  const anchor = `--orbita-tp-${panelId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div ref={wrapRef} className={styles.wrap} style={{...style, anchorName: anchor} as React.CSSProperties} onFocusCapture={onFocusCapture} onClickCapture={onClickCapture}>
      <FloatingField label={placeholder} hasValue={!!datePart} hasLead label2={{text: timePlaceholder, hasValue: !!timePart}} isRequired={isRequired} isDisabled={isDisabled}>
        <DateTimeInput label={label} isLabelHidden placeholder=" " timePlaceholder=" " value={value} onChange={onChange} hasClear={hasClear} isDisabled={isDisabled} isRequired={isRequired} description={description} nativePicker="touch" hourFormat="24h" width="100%" />
      </FloatingField>
      {open && !isDisabled ? (
        <TimePanel
          id={panelId}
          anchor={anchor}
          hour={h}
          minute={m}
          minuteStep={minuteStep}
          onPick={(hh, mm, done) => {
            const date = datePart || localISODate(new Date()); // sans date choisie : aujourd'hui (date locale, pas UTC)
            onChange(`${date}T${pad(hh)}:${pad(mm ?? 0)}` as ISODateTimeString);
            if (done) setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}

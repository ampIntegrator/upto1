'use client';

/**
 * Select — site selector, matching the Orbita mockup (17-forms, .selectx).
 *
 *   mode="single"    → Selector       (one choice)
 *   mode="multiple"  → MultiSelector  (several choices, checkboxes in the panel, badges in the field)
 *
 * Mockup signature: 58 px field with a floating label that moves up as
 * small accent text once there is a value or the panel is open, chevron
 * that rotates, panel below the field, automatic search beyond
 * `searchFrom` options (5), selected option checked. No clear button,
 * no icon in options. In multiple mode, each choice is a badge with its
 * clear button in the field (one-click removal, like PowerSearch); the field grows
 * with the badges.
 *
 * Options have the {value, label, disabled?} shape that Payload will store.
 * The appearance comes from the Orbita theme + Select.module.css.
 */
import {MultiSelector} from '@astryxdesign/core/MultiSelector';
import {Selector} from '@astryxdesign/core/Selector';
import React, {useEffect, useRef, useState} from 'react';

import {CloseIcon} from '@/theme/icons/nucleo';
import styles from './Select.module.css';

export type OrbitaOption = {value: string; label: string; disabled?: boolean};

type Status = {type: 'error' | 'warning' | 'success'; message?: string};

type Common = {
  /** Floating label inside the field (« Votre métier »). */
  label: string;
  options: OrbitaOption[];
  description?: string;
  status?: Status;
  isRequired?: boolean;
  isDisabled?: boolean;
  /** Number of options from which the search appears. */
  searchFrom?: number;
  /** Empty search text. */
  emptyText?: string;
  style?: React.CSSProperties;
};

export type SelectProps =
  | (Common & {mode?: 'single'; value: string | null; onChange: (value: string) => void})
  | (Common & {mode: 'multiple'; value: string[]; onChange: (value: string[]) => void});

export function Select(props: SelectProps) {
  const {label, options, description, status, isRequired, isDisabled, searchFrom = 5, emptyText = 'Aucun résultat', style} = props;
  const mode = props.mode ?? 'single';
  const hasSearch = options.length > searchFrom;
  const hasValue = mode === 'multiple' ? (props.value as string[]).length > 0 : props.value != null;

  const wrapClass = [styles.wrap, hasValue ? styles.hasValue : null, isDisabled ? styles.disabled : null, mode === 'multiple' ? styles.multi : null].filter(Boolean).join(' ');

  // multiple: the trigger height follows the badge layer
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const selectedCount = (props.value as string[] | string | null)?.length ?? 0;
  useEffect(() => {
    if (mode !== 'multiple') return;
    const layer = badgesRef.current;
    const trigger = wrapRef.current?.querySelector<HTMLElement>('.astryx-multi-selector');
    if (!layer || !trigger) return;
    const apply = () => {
      const h = layer.getBoundingClientRect().height;
      setMinHeight(h > 0 ? Math.max(58, 26 + h + 8) : undefined);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(layer);
    return () => ro.disconnect();
  }, [mode, hasValue, selectedCount]);
  useEffect(() => {
    const trigger = wrapRef.current?.querySelector<HTMLElement>('.astryx-multi-selector');
    if (trigger) trigger.style.minHeight = minHeight ? `${minHeight}px` : '';
  }, [minHeight]);
  const shared = {
    label,
    isLabelHidden: true, // the accessible label remains; the visible one is the floating label below
    placeholder: label,
    description,
    status,
    isRequired,
    isDisabled,
    size: 'md' as const,
    hasSearch,
    searchPlaceholder: 'Rechercher…',
    emptySearchText: emptyText,
    placement: 'below' as const,
    width: '100%',
  };

  const removeValue = (v: string) => {
    if (mode !== 'multiple') return;
    (props.onChange as (v: string[]) => void)((props.value as string[]).filter((x) => x !== v));
  };

  return (
    <div ref={wrapRef} className={wrapClass} style={style}>
      <span className={styles.label} aria-hidden="true">
        {label}
        {isRequired ? ' *' : ''}
      </span>
      {mode === 'multiple' && (props.value as string[]).length > 0 ? (
        <div className={styles.badges} ref={badgesRef}>
          {(props.value as string[]).map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span key={v} className={styles.badge}>
                {opt?.label ?? v}
                <button
                  type="button"
                  className={styles.badgeX}
                  aria-label={`Retirer ${opt?.label ?? v}`}
                  disabled={isDisabled}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(v);
                  }}>
                  <CloseIcon />
                </button>
              </span>
            );
          })}
        </div>
      ) : null}
      {mode === 'multiple' ? (
        <MultiSelector
          {...shared}
          options={options}
          value={props.value as string[]}
          onChange={props.onChange as (v: string[]) => void}
          triggerDisplay="count"
        />
      ) : (
        <Selector
          {...shared}
          options={options}
          value={(props.value as string | null) ?? undefined}
          onChange={props.onChange as (v: string) => void}
        />
      )}
    </div>
  );
}

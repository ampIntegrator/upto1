'use client';

/**
 * Field — the site text input / text area, matching mockup 17-forms.
 *
 * On Astryx TextInput and TextArea: floating label inside the field (moves up on
 * focus or as soon as there is a value), leading icon by Nucleo key,
 * error / success states with centered icon and attached message below the field, help
 * below, disabled. Help and message are rendered by Astryx (description /
 * status.message), so linked to the field for screen readers.
 * There is no placeholder: the label serves as one.
 */
import {Icon} from '@astryxdesign/core/Icon';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';
import styles from './Field.module.css';

export type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Multi-line text area. */
  multiline?: boolean;
  /** HTML type for the single-line input. */
  type?: 'text' | 'email' | 'password';
  /** Leading Nucleo icon (phone, magnifier…), single-line input only. */
  iconKey?: NucleoIconKey;
  /** Help below the field. */
  help?: string;
  /** Status with message. */
  status?: {type: 'error' | 'success'; message?: string};
  isDisabled?: boolean;
  isRequired?: boolean;
  style?: React.CSSProperties;
};

export function Field({label, value, onChange, multiline = false, type = 'text', iconKey, help, status, isDisabled, isRequired, style}: FieldProps) {
  const hasValue = value.length > 0;
  const wrapClass = [
    styles.wrap,
    hasValue ? styles.hasValue : null,
    iconKey && !multiline ? styles.hasLead : null,
    status ? styles.hasStatus : null,
    status?.type === 'error' ? styles.error : null,
    status?.type === 'success' ? styles.success : null,
    isDisabled ? styles.disabled : null,
  ]
    .filter(Boolean)
    .join(' ');

  const shared = {
    label,
    isLabelHidden: true,
    value,
    isDisabled,
    isRequired,
    description: help,
    // border, status icon and attached message (attached variant, styled by the theme)
    status: status ? {type: status.type, message: status.message, variant: 'attached' as const} : undefined,
    width: '100%',
  };

  return (
    <div className={wrapClass} style={style}>
      <span className={styles.label} aria-hidden="true">
        {label}
        {isRequired ? ' *' : ''}
      </span>
      {multiline ? (
        <TextArea {...shared} onChange={(v) => onChange(v)} rows={4} />
      ) : (
        <TextInput
          {...shared}
          type={type}
          onChange={(v) => onChange(v)}
          startIcon={iconKey ? <Icon icon={NUCLEO_ICONS[iconKey]} /> : undefined}
        />
      )}
    </div>
  );
}

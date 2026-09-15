'use client';

/**
 * FloatingField — Orbita "floating label" wrapper for an Astryx control
 * whose native label is hidden (isLabelHidden). The visible label sits
 * inside the field and moves up, smaller, in silo color, on focus or as soon as there is
 * a value. Shared by Field, NumberField, DateField,
 * TimePicker and DateTimePicker.
 */
import React from 'react';

import styles from './Field.module.css';

export type FloatingFieldProps = {
  label: string;
  hasValue: boolean;
  /** leading icon: the label starts at 44 px */
  hasLead?: boolean;
  /** second label (time segment of date + time) */
  label2?: {text: string; hasValue: boolean};
  isRequired?: boolean;
  isDisabled?: boolean;
  status?: 'error' | 'success';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function FloatingField({label, hasValue, hasLead, label2, isRequired, isDisabled, status, className, style, children}: FloatingFieldProps) {
  const cls = [
    styles.wrap,
    hasValue ? styles.hasValue : null,
    hasLead ? styles.hasLead : null,
    label2?.hasValue ? styles.hasValue2 : null,
    status === 'error' ? styles.error : null,
    status === 'success' ? styles.success : null,
    isDisabled ? styles.disabled : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} style={style}>
      <span className={styles.label} aria-hidden="true">
        {label}
        {isRequired ? ' *' : ''}
      </span>
      {label2 ? (
        <span className={styles.label2} aria-hidden="true">
          {label2.text}
        </span>
      ) : null}
      {children}
    </div>
  );
}

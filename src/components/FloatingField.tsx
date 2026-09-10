'use client';

/**
 * FloatingField — enveloppe « label flottant » Orbita pour un contrôle Astryx
 * dont le label natif est masqué (isLabelHidden). Le label visible est posé
 * dans le champ et remonte en petit, couleur silo, au focus ou dès qu'il y a
 * une valeur. Partagé par Field, NumberField, DateField,
 * TimePicker et DateTimePicker.
 */
import React from 'react';

import styles from './Field.module.css';

export type FloatingFieldProps = {
  label: string;
  hasValue: boolean;
  /** icône de tête : le label part à 44 px */
  hasLead?: boolean;
  /** second label (segment heure de Date + heure) */
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

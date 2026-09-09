'use client';

/**
 * OrbitaField — champ texte / zone de texte du site, iso maquette 17-forms.
 *
 * Sur TextInput et TextArea d'Astryx : label flottant dans le champ (remonte au
 * focus ou dès qu'il y a une valeur), icône de tête par clé Nucleo, états
 * erreur / succès avec icône centrée et message sous le champ, aide en
 * dessous, désactivé. Le placeholder n'existe pas : c'est le label.
 */
import {Icon} from '@astryxdesign/core/Icon';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import React from 'react';

import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';
import styles from './OrbitaField.module.css';

export type OrbitaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Zone de texte multi-lignes. */
  multiline?: boolean;
  /** Type HTML pour le champ simple. */
  type?: 'text' | 'email' | 'password';
  /** Icône Nucleo de tête (téléphone, loupe…), champ simple seulement. */
  iconKey?: NucleoIconKey;
  /** Aide sous le champ. */
  help?: string;
  /** État avec message. */
  status?: {type: 'error' | 'success'; message?: string};
  isDisabled?: boolean;
  isRequired?: boolean;
  style?: React.CSSProperties;
};

const MSG_ICON = {help: 'info', error: 'warning', success: 'check'} as const;

export function OrbitaField({label, value, onChange, multiline = false, type = 'text', iconKey, help, status, isDisabled, isRequired, style}: OrbitaFieldProps) {
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

  const message = status?.message ?? help;
  const msgKind = status?.type ?? 'help';
  const MsgGlyph = NUCLEO_ICONS[MSG_ICON[msgKind]];

  const shared = {
    label,
    isLabelHidden: true,
    value,
    isDisabled,
    isRequired,
    // bordure + icône d'état Astryx ; le message est le nôtre, sous le champ
    status: status ? {type: status.type} : undefined,
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
      {message ? (
        <div className={styles.msg}>
          <Icon icon={MsgGlyph} size="xsm" />
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}

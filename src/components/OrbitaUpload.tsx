'use client';

/**
 * OrbitaUpload — zone de dépôt de fichier du site (maquette 17-forms .upload).
 * FileInput Astryx en mode dropzone, habillé : cadre pointillé, carré icône
 * accent, titre et sous-titre sur une ligne. Le titre laisse place au nom du
 * fichier une fois déposé.
 */
import {FileInput} from '@astryxdesign/core/FileInput';
import React from 'react';

import styles from './OrbitaUpload.module.css';

export type OrbitaUploadProps = {
  /** Libellé accessible et titre de la zone (« Déposez votre cahier des charges »). */
  label: string;
  /** Sous-titre (« PDF, DOCX — 10 Mo max. »). */
  hint?: string;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  accept?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  status?: {type: 'error' | 'success'; message?: string};
  style?: React.CSSProperties;
};

export function OrbitaUpload({label, hint, value, onChange, accept, isDisabled, isRequired, status, style}: OrbitaUploadProps) {
  return (
    <div className={styles.wrap} style={style}>
      <FileInput
        mode="dropzone"
        label={label}
        isLabelHidden
        placeholder={label}
        value={value}
        onChange={onChange}
        accept={accept}
        isDisabled={isDisabled}
        isRequired={isRequired}
        status={status}
      />
      {hint ? (
        <span className={styles.sub} aria-hidden="true">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

'use client';

/**
 * Upload — site file drop zone (mockup 17-forms .upload).
 * Astryx FileInput in dropzone mode, styled: dashed border, accent icon
 * square, title and subtitle on one line. The title gives way to the
 * file name once dropped.
 */
import {FileInput} from '@astryxdesign/core/FileInput';
import React from 'react';

import styles from './Upload.module.css';

export type UploadProps = {
  /** Accessible label and title of the zone (« Déposez votre cahier des charges »). */
  label: string;
  /** Subtitle (« PDF, DOCX — 10 Mo max. »). */
  hint?: string;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  accept?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  status?: {type: 'error' | 'success'; message?: string};
  style?: React.CSSProperties;
};

export function Upload({label, hint, value, onChange, accept, isDisabled, isRequired, status, style}: UploadProps) {
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
        <span className={styles.sub}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

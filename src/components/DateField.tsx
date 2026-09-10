'use client';

/** DateField — DateInput Astryx avec label flottant Orbita (icône calendrier en tête). */
import type {ISODateString} from '@astryxdesign/core/Calendar';
import {DateInput} from '@astryxdesign/core/DateInput';
import React from 'react';

import {FloatingField} from './FloatingField';

export type DateFieldProps = {
  label: string;
  value: ISODateString | undefined;
  onChange: (value: ISODateString | undefined) => void;
  hasClear?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  status?: {type: 'error' | 'success'; message?: string};
  style?: React.CSSProperties;
};

export function DateField({label, value, onChange, hasClear = true, isDisabled, isRequired, status, style}: DateFieldProps) {
  return (
    <FloatingField label={label} hasValue={value != null} hasLead isRequired={isRequired} isDisabled={isDisabled} status={status?.type} style={style}>
      <DateInput label={label} isLabelHidden placeholder=" " value={value} onChange={onChange} hasClear={hasClear} isDisabled={isDisabled} isRequired={isRequired} status={status} width="100%" />
    </FloatingField>
  );
}

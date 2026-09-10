'use client';

/** NumberField — NumberInput Astryx avec label flottant Orbita et flèches Nucleo. */
import {NumberInput} from '@astryxdesign/core/NumberInput';
import React from 'react';

import {FloatingField} from './FloatingField';

export type NumberFieldProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (n: number) => string;
  hasSteppers?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  status?: {type: 'error' | 'success'; message?: string};
  style?: React.CSSProperties;
};

export function NumberField({label, value, onChange, min, max, step, formatValue, hasSteppers = true, isDisabled, isRequired, status, style}: NumberFieldProps) {
  return (
    <FloatingField label={label} hasValue={value != null} isRequired={isRequired} isDisabled={isDisabled} status={status?.type} style={style}>
      <NumberInput
        label={label}
        isLabelHidden
        placeholder=" "
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        formatValue={formatValue}
        hasNumberSteppers={hasSteppers}
        isDisabled={isDisabled}
        isRequired={isRequired}
        status={status}
        width="100%"
      />
    </FloatingField>
  );
}

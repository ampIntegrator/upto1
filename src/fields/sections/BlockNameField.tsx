'use client';

/**
 * BlockNameField — « Nom affiché » field above the component, in a column's drawer.
 * Writes the component's native blockName (contents.0.blockName): no extra database column,
 * and the same name as the component header. 60 characters at most, spaces included; visible
 * only when the column has a component.
 */
import {getTranslation} from '@payloadcms/translations';
import {TextInput, useField, useFormFields, useTranslation} from '@payloadcms/ui';
import type {UIFieldClientProps} from 'payload';
import React from 'react';

import {sectionsText} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {BLOCK_NAME_MAX} from './blockName';

/** labels: block slug → singular label, passed by the field config (clientProps). */
export type BlockNameFieldProps = UIFieldClientProps & {labels?: Record<string, string | Record<string, string>>};

export function BlockNameField({path, readOnly, labels = {}}: BlockNameFieldProps) {
  const contentsPath = path.replace(/\.blockNameUi$/, '.contents');
  const namePath = `${contentsPath}.0.blockName`;
  const blockType = useFormFields(([fields]) => fields[`${contentsPath}.0.blockType`]?.value as string | undefined);
  const {value, setValue} = useField<string>({path: namePath});
  const {t} = useAdminText();
  const {i18n} = useTranslation();
  if (!blockType) return null;
  const name = typeof value === 'string' ? value : '';
  const label = getTranslation(labels[blockType] ?? blockType, i18n);
  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <TextInput
        path={namePath}
        label={t(sectionsText.drawer.blockName)}
        value={name}
        placeholder={label}
        readOnly={readOnly}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.slice(0, BLOCK_NAME_MAX))}
        description={t(sectionsText.drawer.blockNameDescription, {label, length: name.length, max: BLOCK_NAME_MAX})}
      />
    </div>
  );
}

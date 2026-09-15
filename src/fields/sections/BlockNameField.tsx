'use client';

/**
 * BlockNameField — « Nom affiché » field above the component, in a column's drawer.
 * Writes the component's native blockName (contents.0.blockName): no extra database column,
 * and the same name as the component header. 60 characters at most, spaces included; visible
 * only when the column has a component.
 */
import {TextInput, useField, useFormFields} from '@payloadcms/ui';
import type {UIFieldClientProps} from 'payload';
import React from 'react';

import {BLOCK_NAME_MAX} from './blockName';
import {contentLabel} from './contentRef';

export function BlockNameField({path, readOnly}: UIFieldClientProps) {
  const contentsPath = path.replace(/\.blockNameUi$/, '.contents');
  const namePath = `${contentsPath}.0.blockName`;
  const blockType = useFormFields(([fields]) => fields[`${contentsPath}.0.blockType`]?.value as string | undefined);
  const {value, setValue} = useField<string>({path: namePath});
  if (!blockType) return null;
  const name = typeof value === 'string' ? value : '';
  const label = contentLabel({blockType});
  return (
    <div className="field-type" style={{marginBottom: 'var(--base)'}}>
      <TextInput
        path={namePath}
        label="Nom affiché dans le constructeur"
        value={name}
        placeholder={label}
        readOnly={readOnly}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.slice(0, BLOCK_NAME_MAX))}
        description={`Remplace « ${label} » dans la case. ${name.length}/${BLOCK_NAME_MAX} caractères.`}
      />
    </div>
  );
}

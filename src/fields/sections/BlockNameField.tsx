'use client';

/**
 * BlockNameField — champ « Nom affiché » au-dessus du composant, dans le tiroir d'une colonne.
 * Écrit le blockName natif du composant (contents.0.blockName) : pas de colonne en plus en base,
 * et le même nom que l'en-tête du composant. 60 caractères au plus, espaces compris ; visible
 * seulement quand la colonne a un composant.
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

'use client';

/**
 * ShareField — the « save to the shared sections » box of a page's section, in the document's form.
 * The shared section takes the section's name (its header, Payload's blockName): without a name the
 * box is shown but cannot be checked, and its « i » says why. Same structure as the fields beside
 * it: a title with its « i », the field under it.
 */
import {CheckboxInput, useField, useFormFields} from '@payloadcms/ui';
import type {CheckboxFieldClientProps} from 'payload';
import React from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {InfoBubble} from './InfoBubble';
import {PAYLOAD_DOM} from './payloadDom';

export function ShareField({path, readOnly}: CheckboxFieldClientProps) {
  const {t} = useAdminText();
  const {value, setValue, showError, errorMessage} = useField<boolean>({path});
  const namePath = path.replace(/\.[^.]+$/, '.blockName');
  const named = useFormFields(([fields]) => typeof fields[namePath]?.value === 'string' && (fields[namePath]?.value as string).trim() !== '');
  const disabled = readOnly || !named;
  return (
    <div className={`${PAYLOAD_DOM.field} section-share`}>
      <p className="section-share__label">
        {t(T.settings.saveAsShared)}
        <InfoBubble label={t(T.builder.helpLabel)} text={named ? t(T.settings.saveAsSharedDescription) : t(T.validation.sharedNeedsName)} align="start" />
      </p>
      <CheckboxInput id={`field-${path.replace(/\./g, '__')}`} checked={Boolean(value)} readOnly={disabled} onToggle={() => (disabled ? undefined : setValue(!value))} />
      {/* refused on save (no name, or a name a shared section has already): the reason, under the box */}
      {showError && errorMessage ? (
        <p className="section-share__error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

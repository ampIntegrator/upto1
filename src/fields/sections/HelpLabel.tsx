'use client';

/**
 * HelpLabel — a field's label followed by an « i » that holds its description (the one bubble of
 * the section builder, `InfoBubble`), in the place of Payload's description under the field. Set
 * on every described field of the builder by `withHelpBubbles` (helpBubbles.ts). The content
 * language after the label (« — Français ») is not shown: the site has one.
 */
import {FieldLabel} from '@payloadcms/ui';
import type {FieldLabelClientProps} from 'payload';
import React from 'react';

import {type Text, tr} from '@/i18n/admin/languages';
import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {InfoBubble} from './InfoBubble';

import './HelpLabel.scss';

export function HelpLabel({field, path, label, required, help}: FieldLabelClientProps & {help?: Text | string}) {
  const {t, language} = useAdminText();
  const text = typeof help === 'string' ? help : help ? tr(help, language) : '';
  const own = field as {label?: FieldLabelClientProps['label']; required?: boolean} | undefined;
  return (
    <span className="help-label">
      <FieldLabel label={label ?? own?.label} path={path} required={required ?? own?.required} hideLocale />
      {text ? <InfoBubble label={t(T.builder.helpLabel)} text={text} align="start" /> : null}
    </span>
  );
}

/** In the place of Payload's description under the field: nothing, the « i » holds it. */
export function NoDescription() {
  return null;
}

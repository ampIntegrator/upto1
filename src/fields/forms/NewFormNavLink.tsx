'use client';

/**
 * NewFormNavLink — a « Nouveau formulaire » button at the end of the admin sidebar, right under the
 * Formulaires group (the last group of the menu): opens a new form.
 */
import {Button, useConfig} from '@payloadcms/ui';
import React from 'react';

import {formsText as t} from '@/i18n/admin/forms';
import {useAdminText} from '@/i18n/admin/useAdminText';

export function NewFormNavLink() {
  const {t: tr} = useAdminText();
  const {config} = useConfig();
  return (
    <Button el="link" url={`${config.routes.admin}/collections/forms/create`} buttonStyle="secondary" size="small" icon="plus" iconPosition="left" margin={false} className="new-form-link">
      {tr(t.newForm)}
    </Button>
  );
}

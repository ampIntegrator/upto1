'use client';

/**
 * NewFormNavLink — the creation shortcuts at the end of the admin sidebar, under the last group of
 * the menu: « Nouvelle page », « Nouvel article », « Nouvelle réalisation », « Nouveau formulaire ».
 */
import {Button, useConfig} from '@payloadcms/ui';
import React from 'react';

import {formsText as t} from '@/i18n/admin/forms';
import {useAdminText} from '@/i18n/admin/useAdminText';

export function NewFormNavLink() {
  const {t: tr} = useAdminText();
  const {config} = useConfig();
  const links = [
    {slug: 'pages', label: t.newPage},
    {slug: 'posts', label: t.newPost},
    {slug: 'case-studies', label: t.newCase},
    {slug: 'forms', label: t.newForm},
  ];
  return (
    <>
      {links.map((l) => (
        <Button key={l.slug} el="link" url={`${config.routes.admin}/collections/${l.slug}/create`} buttonStyle="secondary" size="small" icon="plus" iconPosition="left" margin={false} className="new-form-link">
          {tr(l.label)}
        </Button>
      ))}
    </>
  );
}

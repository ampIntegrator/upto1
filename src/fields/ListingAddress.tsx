'use client';

/**
 * ListingAddress — the description of a listing's address field (Blog › Réglages du blog,
 * Réalisations › Réglages des réalisations), updated as the address is typed: the list's full URL
 * with a button opening it in a new tab, then the entries' and archives' addresses. The button
 * opens the saved address: while the form has unsaved changes, it is disabled.
 */
import {Button, useFormFields, useFormModified} from '@payloadcms/ui';
import React, {useSyncExternalStore} from 'react';

import {blogText, portfolioText} from '@/i18n/admin/globals';
import {useAdminText} from '@/i18n/admin/useAdminText';

const TEXTS = {blog: blogText, portfolio: portfolioText};
const FORMAT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** the admin's origin (the site's), empty during server rendering */
const noSubscription = () => () => {};
const useOrigin = () => useSyncExternalStore(noSubscription, () => window.location.origin, () => '');

export function ListingAddress({listing = 'blog', path = 'slug'}: {listing?: 'blog' | 'portfolio'; path?: string}) {
  const {t} = useAdminText();
  const text = TEXTS[listing];
  const slug = useFormFields(([fields]) => fields[path]?.value);
  const modified = useFormModified();
  const origin = useOrigin();
  const value = typeof slug === 'string' ? slug.trim() : '';
  const valid = FORMAT.test(value);
  const muted: React.CSSProperties = {color: 'var(--theme-elevation-500)'};
  return (
    <div className="field-description" style={{display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8}}>
      <span style={muted}>{t(text.slugFormat)}</span>
      {valid ? (
        <>
          <span style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12}}>
            <span style={muted}>{t(text.slugList)} :</span>
            <code style={{fontSize: 14, color: 'var(--theme-elevation-1000)'}}>{`${origin}/${value}`}</code>
            <Button el="anchor" url={`/${value}`} newTab buttonStyle="secondary" size="small" margin={false} disabled={modified} tooltip={modified ? t(text.slugSaveFirst) : undefined}>
              {t(text.slugOpen)} ↗
            </Button>
          </span>
          <span style={muted}>
            {t(text.slugEntries)} : <code>{`/${value}/<${t(text.slugEntry)}>`}</code> · {t(text.slugArchives)} : <code>{`/${value}/categorie/<${t(text.slugCategory)}>`}</code>
          </span>
        </>
      ) : null}
    </div>
  );
}

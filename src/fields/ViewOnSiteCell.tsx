'use client';

/**
 * ViewOnSiteCell — list views: the site address of a row, followed by a « Voir la page » button
 * that opens it in a new tab, so an entry can be checked without opening its edit view.
 * `PagePathCell` sits on the pages' `path` column (the address is the row's own); posts and case
 * studies use the server-side ViewEntryCell, which renders `ViewOnSiteLink` once it knows their
 * listing's address.
 */
import {Button, ExternalLinkIcon} from '@payloadcms/ui';
import type {DefaultCellComponentProps} from 'payload';
import React from 'react';

import {previewText as t} from '@/i18n/admin/preview';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {pagePath} from '@/lib/page-paths';

/** the address as text, then the button (a row without an address shows nothing) */
export function ViewOnSiteLink({href, text}: {href: string | null; text?: string}) {
  const {t: tr} = useAdminText();
  if (!href) return null;
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', gap: 'var(--base)'}}>
      {text ? <span>{text}</span> : null}
      <Button el="anchor" url={href} newTab buttonStyle="pill" size="small" margin={false} icon={<ExternalLinkIcon />} iconPosition="right">
        {/* one line even in a narrow cell */}
        <span style={{whiteSpace: 'nowrap'}}>{tr(t.viewOnSite)}</span>
      </Button>
    </span>
  );
}

export function PagePathCell({rowData}: DefaultCellComponentProps) {
  const page = rowData as {slug?: string | null; path?: string | null} | undefined;
  if (!page?.slug && !page?.path) return null;
  const href = pagePath(page);
  return <ViewOnSiteLink href={href} text={href} />;
}

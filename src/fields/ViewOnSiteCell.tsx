'use client';

/**
 * ViewOnSiteCell — cell of the « Voir » column in the pages list: a « Voir la page » button that
 * opens the page on the site in a new tab, so a page can be checked without opening its edit view.
 * The address comes from the row's full `path` (pagePath), like the edit view's ViewOnSiteButton.
 */
import {Button, ExternalLinkIcon} from '@payloadcms/ui';
import type {DefaultCellComponentProps} from 'payload';
import React from 'react';

import {previewText as t} from '@/i18n/admin/preview';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {pagePath} from '@/lib/page-paths';

export function ViewOnSiteCell({rowData}: DefaultCellComponentProps) {
  const {t: tr} = useAdminText();
  const page = rowData as {slug?: string | null; path?: string | null} | undefined;
  if (!page?.slug && !page?.path) return null;
  return (
    <Button el="anchor" url={pagePath(page)} newTab buttonStyle="secondary" size="small" margin={false} icon={<ExternalLinkIcon />} iconPosition="right">
      {tr(t.viewOnSite)}
    </Button>
  );
}

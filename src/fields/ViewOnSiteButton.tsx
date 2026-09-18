'use client';

/**
 * ViewOnSiteButton — replaces Payload's preview icon (edit view of pages, posts and case
 * studies) with a labelled button, « Voir la page », that opens the page on the site in a new
 * tab. The URL is the collection's `admin.preview` (pages: their slug; posts and case studies:
 * under their listing's address, src/fields/entryUrl.ts); no button before the first save.
 */
import {Button, ExternalLinkIcon, useLivePreviewContext} from '@payloadcms/ui';
import React from 'react';

import {previewText as t} from '@/i18n/admin/preview';
import {useAdminText} from '@/i18n/admin/useAdminText';

export function ViewOnSiteButton() {
  const {t: tr} = useAdminText();
  const {previewURL} = useLivePreviewContext();
  if (!previewURL) return null;
  return (
    <Button el="anchor" url={previewURL} newTab buttonStyle="secondary" size="medium" margin={false} icon={<ExternalLinkIcon />} iconPosition="right">
      {tr(t.viewOnSite)}
    </Button>
  );
}

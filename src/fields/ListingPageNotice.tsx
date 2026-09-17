'use client';

/**
 * ListingPageNotice — shown at the top of a page's tabs when that page is a listing page (Blog ›
 * Réglages du blog, Réalisations › Réglages des réalisations): its page top and sections are not
 * displayed, the site shows the list of entries.
 */
import {useDocumentInfo} from '@payloadcms/ui';
import React, {useEffect, useState} from 'react';

import {blogText, portfolioText} from '@/i18n/admin/globals';
import type {Text} from '@/i18n/admin/languages';
import {useAdminText} from '@/i18n/admin/useAdminText';

/** the listing globals and their notice */
const LISTINGS: {slug: string; notice: Text}[] = [
  {slug: 'blog', notice: blogText.notice},
  {slug: 'portfolio', notice: portfolioText.notice},
];

export function ListingPageNotice() {
  const {id} = useDocumentInfo();
  const {t} = useAdminText();
  const [notice, setNotice] = useState<Text | null>(null);
  useEffect(() => {
    if (!id) return;
    let active = true;
    Promise.all(
      LISTINGS.map((l) =>
        fetch(`/api/globals/${l.slug}?depth=0`, {credentials: 'include'})
          .then((r) => (r.ok ? r.json() : null))
          .then((d: {page?: number | string | null} | null) => (d?.page != null && String(d.page) === String(id) ? l.notice : null))
          .catch(() => null),
      ),
    ).then((found) => {
      if (active) setNotice(found.find(Boolean) ?? null);
    });
    return () => {
      active = false;
    };
  }, [id]);
  if (!notice) return null;
  return (
    <div role="note" style={{marginBottom: 'var(--base)', padding: '12px 16px', fontSize: 14, lineHeight: 1.5, background: 'var(--theme-warning-100)', border: '1px solid var(--theme-warning-500)', color: 'var(--theme-elevation-1000)'}}>
      {t(notice)}
    </div>
  );
}

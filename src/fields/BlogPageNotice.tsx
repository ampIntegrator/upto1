'use client';

/**
 * BlogPageNotice — shown at the top of a page's tabs when that page is the blog page (Blog ›
 * Réglages du blog): its page top and sections are not displayed, the site shows the list of posts.
 */
import {useDocumentInfo} from '@payloadcms/ui';
import React, {useEffect, useState} from 'react';

import {blogText} from '@/i18n/admin/globals';
import {useAdminText} from '@/i18n/admin/useAdminText';

export function BlogPageNotice() {
  const {id} = useDocumentInfo();
  const {t} = useAdminText();
  const [isBlog, setIsBlog] = useState(false);
  useEffect(() => {
    if (!id) return;
    fetch('/api/globals/blog?depth=0', {credentials: 'include'})
      .then((r) => (r.ok ? r.json() : null))
      .then((d: {page?: number | string | null} | null) => setIsBlog(d?.page != null && String(d.page) === String(id)))
      .catch(() => undefined);
  }, [id]);
  if (!isBlog) return null;
  return (
    <div role="note" style={{marginBottom: 'var(--base)', padding: '12px 16px', fontSize: 14, lineHeight: 1.5, background: 'var(--theme-warning-100)', border: '1px solid var(--theme-warning-500)', color: 'var(--theme-elevation-1000)'}}>
      {t(blogText.notice)}
    </div>
  );
}

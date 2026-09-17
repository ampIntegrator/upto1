'use client';

/**
 * Listing pages in the admin (Blog › Réglages du blog, Réalisations › Réglages des réalisations):
 * - ListingPageNotice, at the top of a page's tabs when that page is a listing page: its page top
 *   and sections are not displayed, the site shows the list of entries;
 * - ListingTitleCell, the title cell of the pages list: the title, then a tag « Page du blog » or
 *   « Page des réalisations » on the chosen pages.
 */
import {DefaultCell, useDocumentInfo} from '@payloadcms/ui';
import type {DefaultCellComponentProps} from 'payload';
import React, {useEffect, useState} from 'react';

import {blogText, portfolioText} from '@/i18n/admin/globals';
import type {Text} from '@/i18n/admin/languages';
import {useAdminText} from '@/i18n/admin/useAdminText';

/** the listing globals, their notice and their tag */
const LISTINGS: {slug: string; notice: Text; role: Text}[] = [
  {slug: 'blog', notice: blogText.notice, role: blogText.role},
  {slug: 'portfolio', notice: portfolioText.notice, role: portfolioText.role},
];

type Chosen = {listing: (typeof LISTINGS)[number]; pageId: string}[];

/** The pages chosen by the listing globals: one request per global, shared by every cell of a list, refreshed after a few seconds. */
let chosen: Promise<Chosen> | null = null;
function loadChosen(): Promise<Chosen> {
  if (!chosen) {
    chosen = Promise.all(
      LISTINGS.map((listing) =>
        fetch(`/api/globals/${listing.slug}?depth=0`, {credentials: 'include'})
          .then((r) => (r.ok ? r.json() : null))
          .then((d: {page?: number | string | null} | null) => (d?.page != null ? [{listing, pageId: String(d.page)}] : []))
          .catch(() => []),
      ),
    ).then((lists) => lists.flat());
    setTimeout(() => {
      chosen = null;
    }, 5000);
  }
  return chosen;
}

function useListingsOf(id: number | string | undefined) {
  const [found, setFound] = useState<(typeof LISTINGS)[number][]>([]);
  useEffect(() => {
    if (id == null) return;
    let active = true;
    loadChosen().then((list) => {
      if (active) setFound(list.filter((c) => c.pageId === String(id)).map((c) => c.listing));
    });
    return () => {
      active = false;
    };
  }, [id]);
  return found;
}

export function ListingPageNotice() {
  const {id} = useDocumentInfo();
  const {t} = useAdminText();
  const found = useListingsOf(id);
  if (!found.length) return null;
  return (
    <div role="note" style={{marginBottom: 'var(--base)', padding: '12px 16px', fontSize: 14, lineHeight: 1.5, background: 'var(--theme-warning-100)', border: '1px solid var(--theme-warning-500)', color: 'var(--theme-elevation-1000)'}}>
      {found.map((l) => t(l.notice)).join(' ')}
    </div>
  );
}

export function ListingTitleCell(props: DefaultCellComponentProps) {
  const {t} = useAdminText();
  const found = useListingsOf(props.rowData?.id as number | string | undefined);
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: 8}}>
      <DefaultCell {...props} />
      {found.map((l) => (
        <span key={l.slug} data-listing-role={l.slug} style={{padding: '0 8px', fontSize: 14, lineHeight: 1.6, fontWeight: 500, whiteSpace: 'nowrap', background: 'var(--theme-warning-100)', border: '1px solid var(--theme-warning-500)', color: 'var(--theme-elevation-1000)'}}>
          {t(l.role)}
        </span>
      ))}
    </span>
  );
}

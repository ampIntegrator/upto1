/**
 * ViewEntryCell — server cell of the `slug` column of posts and case studies: the entry's site
 * address (under its listing's address, read from the listing's settings global) and the
 * « Voir la page » button of ViewOnSiteCell. `listing` comes from the field's `serverProps`.
 */
import type {DefaultServerCellComponentProps} from 'payload';
import React from 'react';

import {ViewOnSiteLink} from '@/fields/ViewOnSiteCell';

export async function ViewEntryCell({rowData, payload, listing}: DefaultServerCellComponentProps & {listing: 'blog' | 'portfolio'}) {
  const slug = (rowData as {slug?: unknown} | undefined)?.slug;
  if (typeof slug !== 'string' || !slug) return null;
  const settings = (await payload.findGlobal({slug: listing, depth: 0})) as {slug?: string | null};
  const base = settings.slug || (listing === 'blog' ? 'blog' : 'realisations');
  const href = `/${base}/${slug}`;
  return <ViewOnSiteLink href={href} text={href} />;
}

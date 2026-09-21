import type {PayloadRequest} from 'payload';

/**
 * The site URL of a post or a case study, for the admin's preview button (new tab): the listing's
 * address comes from its settings global (« blog », « realisations » by default). Null while the
 * entry has no slug (not saved yet): no button.
 */
export async function entryUrl(req: PayloadRequest, listing: 'blog' | 'portfolio', slug: unknown): Promise<null | string> {
  if (typeof slug !== 'string' || !slug) return null;
  const settings = await req.payload.findGlobal({slug: listing, depth: 0, req});
  const base = settings.slug || (listing === 'blog' ? 'blog' : 'realisations');
  return `${req.protocol}//${req.host}/${base}/${slug}`;
}

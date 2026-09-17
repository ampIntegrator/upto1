import type {LivePreviewConfig, PayloadRequest} from 'payload';

/**
 * Live Preview (Payload, built in): the « Aperçu en direct » tab of pages, posts, case studies and
 * the blog and case studies settings shows the site page next to the form, refreshed on each save
 * (server-side mode: the site mounts LivePreviewRefresh, which reloads the route when the admin
 * saves). No drafts: saving publishes, the preview follows.
 */

const origin = (req: PayloadRequest) => (req.protocol && req.host ? `${req.protocol}//${req.host}` : (process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'));

/** the address of a listing (Blog settings, Case studies settings) */
async function listingBase(req: PayloadRequest, slug: 'blog' | 'portfolio'): Promise<string> {
  const doc = (await req.payload.findGlobal({slug, depth: 0, req})) as {slug?: string | null};
  return doc?.slug || (slug === 'blog' ? 'blog' : 'realisations');
}

export const livePreview: LivePreviewConfig & {collections: string[]; globals: string[]} = {
  collections: ['pages', 'posts', 'case-studies'],
  globals: ['blog', 'portfolio'],
  breakpoints: [
    {name: 'mobile', label: 'Mobile', width: 390, height: 844},
    {name: 'tablet', label: 'Tablette', width: 768, height: 1024},
    {name: 'desktop', label: 'Ordinateur', width: 1440, height: 900},
  ],
  url: async ({data, collectionConfig, globalConfig, req}) => {
    const base = origin(req);
    const slug = typeof data?.slug === 'string' ? data.slug : '';
    // a listing's settings: its list, at the address being edited
    if (globalConfig?.slug === 'blog' || globalConfig?.slug === 'portfolio') return slug ? `${base}/${slug}` : null;
    if (collectionConfig?.slug === 'posts') return slug ? `${base}/${await listingBase(req, 'blog')}/${slug}` : null;
    if (collectionConfig?.slug === 'case-studies') return slug ? `${base}/${await listingBase(req, 'portfolio')}/${slug}` : null;
    // pages: the home page at /, the others at their slug
    if (!slug) return null;
    return slug === 'accueil' ? `${base}/` : `${base}/${slug}`;
  },
};

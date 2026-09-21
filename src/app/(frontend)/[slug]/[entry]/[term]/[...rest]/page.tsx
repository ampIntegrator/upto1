import React from 'react';

import {PageRoute, pageRouteMetadata} from '../../../PageRoute';

export const dynamic = 'force-dynamic';

/**
 * Four segments and more: a page deeper than level 3, when MAX_PAGE_DEPTH allows it
 * (src/lib/page-paths.ts); otherwise a redirect when something says where, else 404. No listing
 * address goes this deep.
 */
type Params = {params: Promise<{slug: string; entry: string; term: string; rest: string[]}>};

export async function generateMetadata({params}: Params) {
  const {slug, entry, term, rest} = await params;
  return pageRouteMetadata([slug, entry, term, ...rest]);
}

export default async function Page({params}: Params) {
  const {slug, entry, term, rest} = await params;
  return <PageRoute segments={[slug, entry, term, ...rest]} />;
}

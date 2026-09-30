/**
 * /modale/<slug>: the modal's own page, for the admin's preview (the eye, the Live Preview): the
 * site frame in the site's default silo with the modal open over an empty page, closing going to
 * the home page. Not indexed and not linked from the site: a modal opens over the page that links
 * to it, through its anchor (#modale-<slug>).
 */
import {notFound} from 'next/navigation';
import React from 'react';

import {PageModals} from '@/components/PageModals';
import {SitePage} from '@/components/SitePage';
import {loadModal} from '@/lib/modals';
import {getLocale, getSite, pageSilo, toFooter, toHeader} from '@/lib/site';

export const dynamic = 'force-dynamic';

type Params = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Params) {
  const {slug} = await params;
  const modal = await loadModal(decodeURIComponent(slug), await getLocale());
  return {title: modal ? `${modal.title} · Vidomia` : 'Vidomia', robots: {index: false}};
}

export default async function ModalPage({params}: Params) {
  const slug = decodeURIComponent((await params).slug);
  const locale = await getLocale();
  const [site, modal] = await Promise.all([getSite(locale), loadModal(slug, locale)]);
  if (!modal) notFound();
  return (
    <SitePage silo={pageSilo(null, site.settings)} header={toHeader(site.settings, site.header, site.languages, site.blog)} footer={toFooter(site.settings, site.footer, site.posts, locale, site.blog)}>
      <PageModals sources={site.modalSources} locale={locale} initialSlug={slug} closeHref="/" />
    </SitePage>
  );
}

/**
 * /modale/<slug> reached directly (a shared link, a refresh, the admin's Live Preview): the site
 * frame with the modal open over an empty page, in the site's default silo; closing goes to the
 * home page. Not indexed: a modal is not a page.
 */
import {notFound} from 'next/navigation';
import React from 'react';

import {SiteModal} from '@/components/SiteModal';
import {SiteModalBody} from '@/components/SiteModalBody';
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
  const {slug} = await params;
  const locale = await getLocale();
  const [site, modal] = await Promise.all([getSite(locale), loadModal(decodeURIComponent(slug), locale)]);
  if (!modal) notFound();
  const silo = pageSilo(null, site.settings);
  return (
    <SitePage silo={silo} header={toHeader(site.settings, site.header, site.languages, site.blog)} footer={toFooter(site.settings, site.footer, site.posts, locale, site.blog)}>
      <SiteModal title={modal.title} eyebrow={modal.eyebrow} size={modal.size} tone={modal.tone} purpose={modal.purpose} buttons={modal.buttons} closeHref="/" silo={silo}>
        <SiteModalBody modal={modal} />
      </SiteModal>
    </SitePage>
  );
}

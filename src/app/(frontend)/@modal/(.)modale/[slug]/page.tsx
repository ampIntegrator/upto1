/**
 * A modal opened by a client-side link to /modale/<slug>: intercepted, it renders in the layout's
 * modal slot over the current page (which stays mounted). A full load of the same address renders
 * app/(frontend)/modale/[slug] instead.
 */
import React from 'react';

import {SiteModal} from '@/components/SiteModal';
import {SiteModalBody} from '@/components/SiteModalBody';
import {loadModal} from '@/lib/modals';
import {getLocale} from '@/lib/site';

type Params = {params: Promise<{slug: string}>};

export default async function InterceptedModal({params}: Params) {
  const {slug} = await params;
  const modal = await loadModal(decodeURIComponent(slug), await getLocale());
  if (!modal) return null;
  return (
    <SiteModal key={modal.slug} title={modal.title} eyebrow={modal.eyebrow} size={modal.size} tone={modal.tone} purpose={modal.purpose} buttons={modal.buttons}>
      <SiteModalBody modal={modal} />
    </SiteModal>
  );
}

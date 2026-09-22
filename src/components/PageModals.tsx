/**
 * PageModals — the modals a page's content can open, loaded and rendered closed inside the page
 * (server: scans `sources` for modal links and anchors, loads them, hands them to SiteModals).
 * Place it inside SitePage so the modals take the page's silo. `initialSlug` / `closeHref`: the
 * modal's own page (admin preview), open at once, closing going to `closeHref`.
 */
import React from 'react';

import {collectModalSlugs} from '@/lib/links';
import {loadModals} from '@/lib/modals';
import type {Locale} from '@/locales';
import {type SiteModalItem, SiteModals} from './SiteModals';
import {SiteModalBody} from './SiteModalBody';

export async function PageModals({sources, locale, initialSlug, closeHref}: {sources: unknown[]; locale: Locale; initialSlug?: string; closeHref?: string}) {
  const slugs = collectModalSlugs(sources);
  if (initialSlug && !slugs.includes(initialSlug)) slugs.unshift(initialSlug);
  const modals = await loadModals(slugs, locale);
  if (!modals.length) return null;
  const items: SiteModalItem[] = modals.map((m) => ({
    slug: m.slug,
    title: m.title,
    eyebrow: m.eyebrow,
    size: m.size,
    tone: m.tone,
    purpose: m.purpose,
    buttons: m.buttons,
    actionsTarget: m.footerForm ? m.actionsTarget : undefined,
    formIds: Object.values(m.forms).map((form) => form.id),
    body: <SiteModalBody modal={m} />,
  }));
  return <SiteModals items={items} initialSlug={initialSlug} closeHref={closeHref} />;
}

'use client';

/**
 * SiteModals — the modals a page can open (« Modales »), rendered closed inside the page and
 * opened by the address's anchor: a link or a button to `#modale-<slug>` opens the matching one
 * over the page, which keeps its address and its scroll (the click is handled here, no framework
 * navigation). Closing (cross, Escape, a « close » footer button) removes the anchor: back in
 * history when the anchor was added by a click on this page, a replacement otherwise (the page
 * was loaded with the anchor). The browser's Back closes it too (popstate).
 * One modal at a time: a link to another modal replaces the open one.
 *
 * Each item: the modal's settings, its body rendered by the server (SiteModalBody) and, for a
 * body holding a form, the footer element that receives the form's buttons (SiteForm portal).
 * `initialSlug`: the modal open at first render (the modal's own page), whatever the anchor;
 * `closeHref` then says where closing goes.
 */
import {HStack} from '@astryxdesign/core/Stack';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

import {type ModalButton, type ModalPurpose, type ModalSize, type ModalTone, modalSlugFromHash} from '@/lib/modal-paths';
import {Button} from './Button';
import {Dialog} from './Dialog';

/** key set on the history entries this component pushes */
const PUSHED = 'siteModalPushed';

export type SiteModalItem = {
  slug: string;
  title: string;
  eyebrow?: string;
  size: ModalSize;
  tone: ModalTone;
  purpose: ModalPurpose;
  buttons: ModalButton[];
  /** DOM id of the footer element receiving the body's form buttons (a body with a form) */
  actionsTarget?: string;
  body: React.ReactNode;
};

export type SiteModalsProps = {
  items: SiteModalItem[];
  initialSlug?: string;
  closeHref?: string;
};

export function SiteModals({items, initialSlug, closeHref}: SiteModalsProps) {
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    const read = () => {
      const slug = modalSlugFromHash(window.location.hash);
      if (slug && items.some((m) => m.slug === slug)) setOpen(slug);
      else if (!initialSlug) setOpen(null);
    };
    read();
    // a click on a modal anchor: handled here (the framework's link would push the address without
    // any hashchange event, and would try to scroll to an element of that id)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const slug = href.startsWith('#') ? modalSlugFromHash(href) : null;
      if (!slug || !items.some((m) => m.slug === slug)) return;
      e.preventDefault();
      const url = window.location.pathname + window.location.search + href;
      // the entry is marked as ours, so closing knows it can go back; from an open modal to
      // another, the address is replaced, so Back closes both
      const state = {...(window.history.state ?? {}), [PUSHED]: true};
      if (modalSlugFromHash(window.location.hash)) window.history.replaceState(state, '', url);
      else window.history.pushState(state, '', url);
      read();
    };
    const onHistory = () => read();
    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHistory);
    window.addEventListener('popstate', onHistory);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHistory);
      window.removeEventListener('popstate', onHistory);
    };
  }, [items, initialSlug]);

  const close = () => {
    setOpen(null);
    if (closeHref) {
      router.push(closeHref);
      return;
    }
    if (!modalSlugFromHash(window.location.hash)) return;
    // our own entry (a click on this page): back to the page's entry; otherwise (the page was
    // loaded with the anchor) the anchor is simply removed
    if ((window.history.state as Record<string, unknown> | null)?.[PUSHED]) window.history.back();
    else window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  };

  return (
    <>
      {items.map((m) => {
        const own = m.buttons.map((b, i) =>
          b.action === 'close' ? <Button key={i} label={b.label} variant={b.variant} onClick={close} /> : <Button key={i} label={b.label} variant={b.variant} href={b.href} />,
        );
        // the form's buttons join the footer through a portal into this element (no box of its own)
        const actions =
          own.length || m.actionsTarget ? (
            <>
              {own}
              {m.actionsTarget ? <HStack id={m.actionsTarget} gap={3} style={{display: 'contents'}} /> : null}
            </>
          ) : undefined;
        return (
          <Dialog key={m.slug} isOpen={open === m.slug} onOpenChange={(o) => !o && close()} title={m.title} eyebrow={m.eyebrow} size={m.size} tone={m.tone} purpose={m.purpose} actions={actions}>
            {m.body}
          </Dialog>
        );
      })}
    </>
  );
}

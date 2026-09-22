'use client';

/**
 * SiteModal — a modal of the « Modales » collection, open over the page: the house Dialog with the
 * modal's title, eyebrow, width, tone and closing rule, the body rendered by the server
 * (SiteModalBody, as children) and the footer buttons (close, or go to an address).
 *
 * Opened by a client-side link to /modale/<slug> (intercepted route, the page stays behind):
 * closing goes back in history, so the browser's Back closes it too. Reached directly
 * (/modale/<slug> as a page): `closeHref` says where closing goes. The silo is the page's: the
 * modal renders outside the page's theme, so it reads the page's silo from <html> (SiloMark), or
 * takes `silo` when given.
 */
import {useRouter} from 'next/navigation';
import React, {useState, useSyncExternalStore} from 'react';

import type {ModalButton, ModalPurpose, ModalSize, ModalTone} from '@/lib/modal-paths';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import {SILO_NAMES, type SiloName} from '@/theme/index';
import {Button} from './Button';
import {Dialog} from './Dialog';
import {PAGE_SILO_ATTRIBUTE} from './SiloMark';

export type SiteModalProps = {
  title: string;
  eyebrow?: string;
  size: ModalSize;
  tone: ModalTone;
  purpose: ModalPurpose;
  buttons: ModalButton[];
  /** the modal as a page of its own: where closing goes (otherwise: back in history) */
  closeHref?: string;
  /** forced silo (the modal as a page); otherwise the page's, read from <html> */
  silo?: SiloName;
  children: React.ReactNode;
};

const noSubscribe = () => () => undefined;
const readPageSilo = (): SiloName | null => {
  const v = document.documentElement.getAttribute(PAGE_SILO_ATTRIBUTE);
  return SILO_NAMES.includes(v as SiloName) ? (v as SiloName) : null;
};

export function SiteModal({title, eyebrow, size, tone, purpose, buttons, closeHref, silo, children}: SiteModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  // client navigation: read at the first render, no flash of the default silo
  const pageSilo = useSyncExternalStore(noSubscribe, readPageSilo, () => null);
  const close = () => {
    setOpen(false);
    if (closeHref) router.push(closeHref);
    else router.back();
  };

  const actions = buttons.length
    ? buttons.map((b, i) =>
        b.action === 'close' ? <Button key={i} label={b.label} variant={b.variant} onClick={close} /> : <Button key={i} label={b.label} variant={b.variant} href={b.href} />,
      )
    : undefined;

  const dialog = (
    <Dialog isOpen={open} onOpenChange={(o) => !o && close()} title={title} eyebrow={eyebrow} size={size} tone={tone} purpose={purpose} actions={actions}>
      {children}
    </Dialog>
  );
  const fixed = silo ?? pageSilo;
  return fixed ? <OrbitaThemeProvider fixedSilo={fixed}>{dialog}</OrbitaThemeProvider> : dialog;
}

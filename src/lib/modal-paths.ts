/**
 * Modal addresses, client-safe (no Payload, no editor). A modal of the « Modales » collection
 * opens over the page it is linked from, through an anchor: `#modale-<slug>` (the page keeps its
 * address, the anchor opens and closes the modal, Back closes it). `/modale/<slug>` is the
 * modal's own page, used by the admin's preview only. The slug of the « Formulaire » block
 * inserted in a modal's body lives here too, so the site can read it without the editor.
 */
export const MODAL_SEGMENT = 'modale';
export const MODAL_FORM_SLUG = 'modalForm';
/** anchors that open a modal: `#modale-<slug>` (reserved prefix for section anchors) */
export const MODAL_HASH_PREFIX = 'modale-';

export const modalHash = (slug: string): string => `#${MODAL_HASH_PREFIX}${slug}`;
/** the modal's own page (admin preview) */
export const modalPath = (slug: string): string => `/${MODAL_SEGMENT}/${slug}`;

/** the slug of the modal an anchor (« #modale-x », with or without the « # ») opens, else null */
export function modalSlugFromHash(hash: string | null | undefined): string | null {
  if (!hash) return null;
  const h = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!h.startsWith(MODAL_HASH_PREFIX)) return null;
  const slug = decodeURIComponent(h.slice(MODAL_HASH_PREFIX.length));
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
}

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalTone = 'light' | 'night';
export type ModalPurpose = 'info' | 'form' | 'required';
export type ModalButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
/** a footer button: closes the modal, or goes to an address (a page, another modal's anchor…) */
export type ModalButton = {label: string; variant: ModalButtonVariant} & ({action: 'close'} | {action: 'link'; href: string});

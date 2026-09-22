/**
 * Modal addresses, client-safe (no Payload, no editor): a modal of the « Modales » collection
 * opens at /modale/<slug>, over the current page when reached by a client-side link (intercepted
 * route), as a page of its own otherwise. The slug of the « Formulaire » block inserted in a
 * modal's body lives here too, so the site can read it without importing the editor.
 */
export const MODAL_SEGMENT = 'modale';
export const MODAL_FORM_SLUG = 'modalForm';

export const modalPath = (slug: string): string => `/${MODAL_SEGMENT}/${slug}`;

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalTone = 'light' | 'night';
export type ModalPurpose = 'info' | 'form' | 'required';
export type ModalButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
/** a footer button: closes the modal, or goes to an address (a page, another modal…) */
export type ModalButton = {label: string; variant: ModalButtonVariant} & ({action: 'close'} | {action: 'link'; href: string});

/**
 * SiteModalBody — the body of a modal (« Modales »), server side: the rich text (internal links
 * already resolved by the loader) with the forms inserted in it rendered by SiteFormBlock; the
 * first form's buttons go to the modal's footer (SiteModal `actionsTarget`).
 */
import React from 'react';

import type {RichTextNode} from '@/components/rich-text';
import {MODAL_FORM_SLUG} from '@/lib/modal-paths';
import type {ModalData} from '@/lib/modals';
import {RichText} from './RichText';
import {SiteFormBlock} from './SiteFormBlock';

export function SiteModalBody({modal}: {modal: ModalData}) {
  const renderBlock = (node: RichTextNode) => {
    const f = (node.fields ?? {}) as {id?: string; blockType?: string};
    const form = f.blockType === MODAL_FORM_SLUG && f.id ? modal.forms[f.id] : undefined;
    // the first form's buttons (« Retour », « Continuer », send) go to the modal's footer
    return form ? <SiteFormBlock form={form} actionsTarget={f.id === modal.footerForm ? modal.actionsTarget : undefined} /> : null;
  };
  return <RichText content={modal.body} renderBlock={renderBlock} />;
}

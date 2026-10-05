'use client';

import {Button} from '@payloadcms/ui';
import React, {useEffect, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import './FieldPopover.scss';

/**
 * A single field of a block, shown next to what was clicked in the preview (an image, an icon, a link):
 * a small panel at the pointer, closed by its button, Escape or a click beside it.
 */
export function FieldPopover({x, y, title, onClose, children}: {x: number; y: number; title: string; onClose: () => void; children: React.ReactNode}) {
  const {t} = useAdminText();
  const panel = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState({left: x, top: y});
  // kept inside the screen, again each time its content changes size (the field renders after the panel)
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const margin = 12;
    const fit = () => setPlace({left: Math.max(margin, Math.min(x, window.innerWidth - el.offsetWidth - margin)), top: Math.max(margin, Math.min(y + margin, window.innerHeight - el.offsetHeight - margin))});
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [x, y]);
  // the click was in the preview's frame: bring the keyboard back here (Escape, Tab)
  useEffect(() => {
    panel.current?.focus();
  }, []);
  useEffect(() => {
    // captured before the dialog's own Escape: only this panel closes
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  return (
    <>
      <div className="field-popover__backdrop" onClick={onClose} />
      <div ref={panel} className="field-popover" role="dialog" aria-label={title} tabIndex={-1} style={place}>
        <div className="field-popover__head">
          <strong>{title}</strong>
          <Button buttonStyle="secondary" size="small" margin={false} onClick={onClose}>
            {t(T.manager.fieldClose)}
          </Button>
        </div>
        {children}
      </div>
    </>
  );
}

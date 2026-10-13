'use client';

import {Button} from '@payloadcms/ui';
import React, {useEffect, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import './FieldPopover.scss';

/**
 * A single field of a block, shown next to what was clicked in the preview (an image, an icon, a link):
 * a small panel under it (above it when there is no room below), closed by its button, Escape or a click beside it.
 * `y`: the bottom of what was clicked, `top`: its top.
 */
export function FieldPopover({x, y, top, title, onClose, children}: {x: number; y: number; top: number; title: string; onClose: () => void; children: React.ReactNode}) {
  const {t} = useAdminText();
  const panel = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState({left: x, top: y});
  // kept inside the screen, again each time its content changes size (the field renders after the panel)
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const margin = 12;
    const fit = () => {
      const below = y + margin;
      // under the part, or over it when the screen is too short below and tall enough above
      const placed = below + el.offsetHeight > window.innerHeight - margin && top - margin - el.offsetHeight >= margin ? top - margin - el.offsetHeight : below;
      setPlace({left: Math.max(margin, Math.min(x, window.innerWidth - el.offsetWidth - margin)), top: Math.max(margin, Math.min(placed, window.innerHeight - el.offsetHeight - margin))});
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [x, y, top]);
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

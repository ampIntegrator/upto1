'use client';

/**
 * SectionPreview — the bottom of the « Gérer » dialog: the host's preview page in an iframe, fed
 * with the section's unsaved values (window.postMessage, see preview.ts), about 400 ms after the
 * last change. A width switch (desktop, tablet, mobile): the frame keeps the chosen width and is
 * scaled down to fit the panel when it is wider.
 */
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {isPreviewReady, PREVIEW_DATA, type PreviewBreakpoint, type PreviewDataMessage} from './preview';

const DEBOUNCE_MS = 400;

type Props = {
  url: string;
  breakpoints: PreviewBreakpoint[];
  message: Omit<PreviewDataMessage, 'type'>;
};

export function SectionPreview({url, breakpoints, message}: Props) {
  const {t} = useAdminText();
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // how many times the frame said it listens (it says so again after a reload)
  const [ready, setReady] = useState(0);
  const [bp, setBp] = useState(breakpoints[0]?.name ?? '');
  const [box, setBox] = useState({width: 0, height: 0});
  const width = breakpoints.find((b) => b.name === bp)?.width ?? breakpoints[0]?.width ?? 1440;
  const origin = typeof window === 'undefined' ? '' : new URL(url, window.location.href).origin;
  // one key per frame, in its address (`frame`): the host keeps what each frame was sent apart
  const [src] = useState(() => `${url}${url.includes('?') ? '&' : '?'}frame=${crypto.randomUUID()}`);

  // the frame says it listens: from then on, every snapshot is sent
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source === frame.current?.contentWindow && e.origin === origin && isPreviewReady(e.data)) setReady((n) => n + 1);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [origin]);

  // the latest snapshot, read when the timer fires (declared before the effects that send it)
  const latest = useRef(message);
  useEffect(() => {
    latest.current = message;
  }, [message]);
  const post = useCallback(() => frame.current?.contentWindow?.postMessage({type: PREVIEW_DATA, ...latest.current} satisfies PreviewDataMessage, origin), [origin]);
  // the frame has just started listening: the current values at once
  useEffect(() => {
    if (ready) post();
  }, [ready, post]);
  // then each change, once typing pauses
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(post, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
    // `ready` left out: its own effect sends at once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, post]);

  // the panel's size, for the scale
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setBox({width: el.clientWidth, height: el.clientHeight});
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = box.width > 0 ? Math.min(1, box.width / width) : 1;
  const left = Math.max(0, (box.width - width * scale) / 2);

  return (
    <section className="section-preview" aria-label={t(T.manager.preview)}>
      <div className="section-preview__bar">
        <span className="section-preview__title">{t(T.manager.preview)}</span>
        <div className="section-preview__widths" role="radiogroup" aria-label={t(T.manager.width)}>
          {breakpoints.map((b) => (
            <button key={b.name} type="button" role="radio" aria-checked={b.name === bp} className={`section-preview__width${b.name === bp ? ' section-preview__width--active' : ''}`} onClick={() => setBp(b.name)}>
              {t(b.label)} <span className="section-preview__px">{b.width}</span>
            </button>
          ))}
        </div>
      </div>
      <div ref={stage} className="section-preview__stage">
        <iframe
          ref={frame}
          src={src}
          title={t(T.manager.preview)}
          className="section-preview__frame"
          style={{width, height: scale > 0 ? box.height / scale : box.height, left, transform: `scale(${scale})`}}
        />
      </div>
    </section>
  );
}

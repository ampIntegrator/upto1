'use client';

/**
 * SectionPreview — the bottom of the « Gérer » dialog: the host's preview page in an iframe, fed
 * with the section's unsaved values (window.postMessage, see preview.ts), about 400 ms after the
 * last change. A width switch (full width of the panel, desktop, tablet, mobile; the choice is
 * remembered per user): the frame keeps the chosen width and is scaled down to fit the panel when
 * it is wider. It is centred in the panel, both ways. The frame is as tall as the section it shows
 * (the height it reports): nothing but the section is visible, the panel scrolls when it is taller.
 */
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {usePreferences} from '@payloadcms/ui';

import {sectionsText as T} from '@/i18n/admin/sections';
import {useAdminText} from '@/i18n/admin/useAdminText';

import {isPreviewReady, PREVIEW_DATA, type PreviewBox, type PreviewBreakpoint, type PreviewColumnBox, type PreviewDataMessage, type PreviewEvent, previewEvent, previewLayout, previewSize} from './preview';

const DEBOUNCE_MS = 400;
/** « full width »: the frame is as wide as the panel, as in the browser */
const FULL = 'full';
/** the last width chosen, remembered per user (Payload preferences) */
const PREFERENCE = 'section-preview-width';

/** The width switch's icons (stroke, text colour): the whole panel, a screen, a tablet, a phone. */
function WidthGlyph({kind}: {kind: 'full' | 'desktop' | 'tablet' | 'mobile'}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'full' ? (
        <path d="M2 12h20M6 8l-4 4 4 4M18 8l4 4-4 4" />
      ) : kind === 'desktop' ? (
        <>
          <rect x="2" y="4" width="20" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </>
      ) : kind === 'tablet' ? (
        <>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M11 18h2" />
        </>
      ) : (
        <>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </>
      )}
    </svg>
  );
}

type Props = {
  url: string;
  breakpoints: PreviewBreakpoint[];
  message: Omit<PreviewDataMessage, 'type'>;
  /** what the editor does in the frame; `toScreen` turns a box of the frame into screen pixels */
  onEvent?: (event: PreviewEvent, toScreen: (box: PreviewBox) => PreviewBox) => void;
  /** drawn over the frame, in the frame's own pixels (drop zones while a block is dragged); null: nothing */
  overlay?: (columns: PreviewColumnBox[]) => React.ReactNode;
};

export function SectionPreview({url, breakpoints, message, onEvent, overlay}: Props) {
  const {t} = useAdminText();
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // how many times the frame said it listens (it says so again after a reload)
  const [ready, setReady] = useState(0);
  const [bp, setBp] = useState(breakpoints[0]?.name ?? '');
  const [box, setBox] = useState({width: 0, height: 0});
  // height of the rendered section, reported by the frame (0: nothing rendered yet)
  const [content, setContent] = useState(0);
  // where the frame draws each column
  const [columns, setColumns] = useState<PreviewColumnBox[]>([]);
  const width = bp === FULL ? box.width || 1440 : (breakpoints.find((b) => b.name === bp)?.width ?? breakpoints[0]?.width ?? 1440);
  const {getPreference, setPreference} = usePreferences();
  useEffect(() => {
    let live = true;
    getPreference<string | undefined>(PREFERENCE)
      .then((saved) => {
        if (live && saved && (saved === FULL || breakpoints.some((b) => b.name === saved))) setBp(saved);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [getPreference, breakpoints]);
  const choose = (name: string) => {
    setBp(name);
    void setPreference(PREFERENCE, name);
  };
  const origin = typeof window === 'undefined' ? '' : new URL(url, window.location.href).origin;
  // one key per frame, in its address (`frame`): the host keeps what each frame was sent apart
  const [src] = useState(() => `${url}${url.includes('?') ? '&' : '?'}frame=${crypto.randomUUID()}`);

  // the latest handler, read when a message arrives
  const handler = useRef(onEvent);
  useEffect(() => {
    handler.current = onEvent;
  }, [onEvent]);

  // the frame says it listens: from then on, every snapshot is sent
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || e.origin !== origin) return;
      if (isPreviewReady(e.data)) setReady((n) => n + 1);
      const height = previewSize(e.data);
      if (height !== null) setContent(height);
      const layout = previewLayout(e.data);
      if (layout) setColumns(layout);
      const event = previewEvent(e.data);
      if (event) {
        handler.current?.(event, (box) => {
          // the frame's pixels, scaled, from the frame's corner on screen
          const rect = frame.current?.getBoundingClientRect();
          const k = rect && frame.current?.offsetWidth ? rect.width / frame.current.offsetWidth : 1;
          return {x: (rect?.left ?? 0) + box.x * k, y: (rect?.top ?? 0) + box.y * k, width: box.width * k, height: box.height * k};
        });
      }
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
  // until the frame reports a height: the panel's
  const height = content > 0 ? content : box.height / scale;

  const zones = overlay?.(columns) ?? null;

  return (
    <section className="section-preview" aria-label={t(T.manager.preview)}>
      <div className="section-preview__bar">
        <span className="section-preview__title">{t(T.manager.preview)}</span>
        <div className="section-preview__widths" role="radiogroup" aria-label={t(T.manager.width)}>
          <button type="button" role="radio" aria-checked={bp === FULL} aria-label={t(T.manager.widthFull)} title={t(T.manager.widthFull)} className={`section-preview__width${bp === FULL ? ' section-preview__width--active' : ''}`} onClick={() => choose(FULL)}>
            <WidthGlyph kind="full" />
          </button>
          {breakpoints.map((b) => (
            <button key={b.name} type="button" role="radio" aria-checked={b.name === bp} aria-label={t(b.label)} title={t(b.label)} className={`section-preview__width${b.name === bp ? ' section-preview__width--active' : ''}`} onClick={() => choose(b.name)}>
              {b.icon ? <WidthGlyph kind={b.icon} /> : t(b.label)}
            </button>
          ))}
        </div>
      </div>
      <div ref={stage} className="section-preview__stage">
        {/* the frame's scaled footprint: centres it and gives the panel its scroll height */}
        <div className="section-preview__sizer" style={{width: width * scale, height: height * scale}}>
          <iframe ref={frame} src={src} title={t(T.manager.preview)} className="section-preview__frame" style={{width, height, transform: `scale(${scale})`}} />
          {zones ? (
            <div className="section-preview__overlay" style={{width, height, transform: `scale(${scale})`}}>
              {zones}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

'use client';

/**
 * SectionPreviewFrame — the page inside the « Gérer » dialog's iframe: says it listens
 * (PREVIEW_READY); for each section the admin sends, hands it to the server
 * (sendSectionPreview), then refreshes the route, which renders it. The previous rendering stays
 * on screen until the next one is ready. It also reports the height of what it shows
 * (PREVIEW_SIZE), so the admin fits the frame to the section: nothing below it.
 */
import {useRouter} from 'next/navigation';
import React, {useEffect, useRef} from 'react';

import {isPreviewData, PREVIEW_READY, PREVIEW_SIZE} from '@/fields/sections/preview';
import {sendSectionPreview} from './actions';

export function SectionPreviewFrame({frame, children}: {frame: string; children: React.ReactNode}) {
  const router = useRouter();
  const last = useRef(0);

  useEffect(() => {
    if (!frame) return;
    const onMessage = async (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== window.parent || !isPreviewData(e.data)) return;
      const {type: _type, ...input} = e.data;
      const n = ++last.current;
      const status = await sendSectionPreview(frame, input).catch(() => 'invalid' as const);
      // a newer section is on its way: only its refresh matters
      if (n === last.current && status !== 'invalid') router.refresh();
    };
    window.addEventListener('message', onMessage);
    if (window.parent !== window) window.parent.postMessage({type: PREVIEW_READY}, window.location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, [frame, router]);

  // the page is as tall as its content (the site's pages fill the screen), and says how tall
  useEffect(() => {
    if (window.parent === window) return;
    const {documentElement: html, body} = document;
    html.style.minHeight = '0';
    body.style.minHeight = '0';
    const report = () => window.parent.postMessage({type: PREVIEW_SIZE, height: Math.ceil(body.getBoundingClientRect().height)}, window.location.origin);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  return children;
}

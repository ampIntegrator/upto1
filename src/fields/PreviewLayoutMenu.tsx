'use client';

/**
 * PreviewLayoutMenu — a « Vue » menu just before the Live Preview eye (edit view of pages, posts,
 * case studies, blog and case studies settings): side by side (Payload's layout), top / bottom
 * (form above, preview stuck to the bottom half), or dialog (form full width, preview in a
 * window over it; closed with its button or Escape). Picking a layout opens the preview. The choice is remembered per user
 * (Payload preferences) and applied as `data-preview-layout` on <html>; the layouts themselves are
 * CSS in src/app/(payload)/custom.scss.
 */
import {Popup, PopupList, useLivePreviewContext, usePreferences} from '@payloadcms/ui';
import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

import {previewText as t} from '@/i18n/admin/preview';
import {useAdminText} from '@/i18n/admin/useAdminText';

export type PreviewLayout = 'vertical' | 'horizontal' | 'dialog';
const LAYOUTS: PreviewLayout[] = ['vertical', 'horizontal', 'dialog'];
const PREFERENCE = 'live-preview-layout';

const apply = (layout: PreviewLayout) => {
  document.documentElement.dataset.previewLayout = layout;
};

/** a small drawing of the layout: form (light) and preview (dark) */
function LayoutIcon({layout}: {layout: PreviewLayout}) {
  const form = 'var(--theme-elevation-150)';
  const preview = 'var(--theme-elevation-600)';
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" style={{flex: '0 0 auto'}}>
      <rect x="0.5" y="0.5" width="19" height="13" fill="none" stroke="currentColor" />
      {layout === 'vertical' ? (
        <>
          <rect x="2" y="2" width="6" height="10" fill={form} />
          <rect x="9" y="2" width="9" height="10" fill={preview} />
        </>
      ) : layout === 'horizontal' ? (
        <>
          <rect x="2" y="2" width="16" height="4" fill={form} />
          <rect x="2" y="7" width="16" height="5" fill={preview} />
        </>
      ) : (
        <>
          <rect x="2" y="2" width="16" height="10" fill={form} />
          <rect x="5" y="4" width="10" height="6" fill={preview} />
        </>
      )}
    </svg>
  );
}

export function PreviewLayoutMenu() {
  const {t: tr} = useAdminText();
  const {getPreference, setPreference} = usePreferences();
  const {url, isLivePreviewing, setIsLivePreviewing} = useLivePreviewContext();
  const [layout, setLayout] = useState<PreviewLayout>('vertical');

  useEffect(() => {
    let active = true;
    getPreference<PreviewLayout | undefined>(PREFERENCE)
      .then((saved) => {
        const value = saved && LAYOUTS.includes(saved) ? saved : 'vertical';
        if (!active) return;
        setLayout(value);
        apply(value);
      })
      .catch(() => apply('vertical'));
    return () => {
      active = false;
    };
  }, [getPreference]);

  // dialog: Escape closes the preview
  useEffect(() => {
    if (layout !== 'dialog' || !isLivePreviewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLivePreviewing(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [layout, isLivePreviewing, setIsLivePreviewing]);

  if (!url) return null;

  const choose = (value: PreviewLayout) => {
    setLayout(value);
    apply(value);
    void setPreference(PREFERENCE, value);
    setIsLivePreviewing(true);
  };

  return (
    <>
      <Popup
        horizontalAlign="right"
        verticalAlign="bottom"
        buttonType="custom"
        button={
          <span className="preview-layout-menu__button" title={tr(t.menuTitle)} aria-label={tr(t.menuTitle)}>
            <LayoutIcon layout={layout} />
            <span>{tr(t.menu)}</span>
            <span aria-hidden="true">▾</span>
          </span>
        }
        render={({close}) => (
          <PopupList.ButtonGroup>
            {LAYOUTS.map((value) => (
              <PopupList.Button
                key={value}
                active={value === layout}
                onClick={() => {
                  choose(value);
                  close();
                }}>
                <span style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
                  <LayoutIcon layout={value} />
                  {tr(t[value])}
                </span>
              </PopupList.Button>
            ))}
          </PopupList.ButtonGroup>
        )}
      />
      {layout === 'dialog' && isLivePreviewing
        ? createPortal(
            <button type="button" className="preview-layout-close" onClick={() => setIsLivePreviewing(false)}>
              {tr(t.close)} ✕
            </button>,
            document.body,
          )
        : null}
    </>
  );
}

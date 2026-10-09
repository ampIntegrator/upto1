'use client';

import {useDocumentInfo, useForm, useFormFields, useLocale, useTranslation} from '@payloadcms/ui';
import React from 'react';

import {DEFAULT_BREAKPOINTS, type PreviewBox, type PreviewColumnBox, type PreviewEvent, type SectionPreviewOptions} from './preview';
import {SectionPreview} from './SectionPreview';

/** the section just above `path` in its array (`sections.3` → `sections.2`), or none */
const pathAbove = (path: string): string | null => {
  const m = /^(.*)\.(\d+)$/.exec(path);
  return m && Number(m[2]) > 0 ? `${m[1]}.${Number(m[2]) - 1}` : null;
};

/** Collects the section's values (and the document fields the host asked for) and feeds the preview. */
export function LivePreview({parentPath, preview, onEvent, overlay}: {parentPath: string; preview: SectionPreviewOptions; onEvent: (event: PreviewEvent, toScreen: (box: PreviewBox) => PreviewBox) => void; overlay: (columns: PreviewColumnBox[]) => React.ReactNode}) {
  const {getData, getDataByPath} = useForm();
  const {id, collectionSlug, globalSlug} = useDocumentInfo();
  const locale = useLocale();
  const {i18n} = useTranslation();
  // a signature of the section's values (and of the document fields the host asked for): a new
  // snapshot when it changes, nothing when another part of the document is edited (the selector
  // runs on every change, the wrapper renders only when the signature differs)
  const prefix = parentPath ? `${parentPath}.` : '';
  const watched = preview.documentFields ?? [];
  const version = useFormFields(([fields]) => {
    let signature = '';
    for (const key in fields) {
      if (!key.startsWith(prefix) && !watched.includes(key)) continue;
      const value = fields[key]?.value;
      signature += `${key}=${typeof value === 'object' ? JSON.stringify(value) : String(value)}\u0000`;
    }
    return signature;
  });
  const message = React.useMemo(() => {
    const data = getData() as Record<string, unknown>;
    const section = (parentPath ? getDataByPath(parentPath) : data) as Record<string, unknown> | undefined;
    const abovePath = pathAbove(parentPath);
    const above = abovePath ? (getDataByPath(abovePath) as Record<string, unknown> | undefined) : undefined;
    const document: Record<string, unknown> = {};
    for (const name of preview.documentFields ?? []) document[name] = data?.[name];
    return {section: section ?? {}, above, parts: preview.parts, document, id: id ?? undefined, collection: collectionSlug ?? globalSlug ?? undefined, locale: locale?.code, language: i18n.language};
    // `version` changes on every edit: it is what triggers the new snapshot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, parentPath, id, collectionSlug, globalSlug, locale?.code, preview.parts, i18n.language]);
  return <SectionPreview url={preview.url} breakpoints={preview.breakpoints ?? DEFAULT_BREAKPOINTS} message={message} onEvent={onEvent} overlay={overlay} />;
}

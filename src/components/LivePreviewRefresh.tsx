'use client';

/**
 * LivePreviewRefresh — when the site is shown in the admin's Live Preview (inside its iframe),
 * reloads the current route each time the document is saved (Payload's RefreshRouteOnSave).
 * Outside the iframe, renders nothing.
 */
import {RefreshRouteOnSave} from '@payloadcms/live-preview-react';
import {useRouter} from 'next/navigation';
import React, {useSyncExternalStore} from 'react';

const noSubscription = () => () => {};
/** true in an iframe (the Live Preview), false for visitors and during server rendering */
const useInFrame = () => useSyncExternalStore(noSubscription, () => window.self !== window.top, () => false);
const useOrigin = () => useSyncExternalStore(noSubscription, () => window.location.origin, () => '');

export function LivePreviewRefresh() {
  const router = useRouter();
  const inFrame = useInFrame();
  const serverURL = useOrigin();
  if (!inFrame || !serverURL) return null;
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}

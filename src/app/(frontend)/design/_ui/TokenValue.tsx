'use client';

import {Text} from '@astryxdesign/core/Text';
import React, {useEffect, useRef, useState} from 'react';

/** Displays the resolved value of a CSS token in the active theme and mode. */
export function TokenValue({token}: {token: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('…');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setValue(getComputedStyle(el).getPropertyValue(token).trim() || '(non défini)');
    read();
    // Re-read when the theme changes (data-astryx-theme attribute on an ancestor).
    const root = el.closest('[data-astryx-theme]');
    if (!root) return;
    const obs = new MutationObserver(read);
    obs.observe(root, {attributes: true});
    return () => obs.disconnect();
  }, [token]);

  return (
    <Text type="body" style={{fontVariantNumeric: 'tabular-nums'}}>
      <span ref={ref}>{value}</span>
    </Text>
  );
}

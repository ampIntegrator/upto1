'use client';

import {Text} from '@astryxdesign/core/Text';
import React, {useEffect, useRef, useState} from 'react';

/** Affiche la valeur résolue d'un token CSS dans le thème et le mode actifs. */
export function TokenValue({token}: {token: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('…');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setValue(getComputedStyle(el).getPropertyValue(token).trim() || '(non défini)');
    read();
    // Re-lecture quand le thème change (attribut data-astryx-theme sur un ancêtre).
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

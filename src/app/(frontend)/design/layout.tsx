import React from 'react';

import {DesignShell} from './_ui/DesignShell';

export const metadata = {
  title: 'Orbita × Astryx — catalogue du design system',
};

export default function DesignLayout({children}: {children: React.ReactNode}) {
  return <DesignShell>{children}</DesignShell>;
}

import React from 'react';

import {DesignShell} from './_ui/DesignShell';

export const metadata = {
  title: 'Design system Vidomia — catalogue',
};

export default function DesignLayout({children}: {children: React.ReactNode}) {
  return <DesignShell>{children}</DesignShell>;
}

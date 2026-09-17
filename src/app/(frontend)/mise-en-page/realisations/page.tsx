import React from 'react';

import {CasesDemo} from '../CaseDemo';

export const metadata = {title: 'Mise en page — page des réalisations (maquette 24)'};

export default async function Page({searchParams}: {searchParams: Promise<{page?: string}>}) {
  const {page} = await searchParams;
  return <CasesDemo page={Math.max(0, Number(page ?? 1) - 1)} />;
}

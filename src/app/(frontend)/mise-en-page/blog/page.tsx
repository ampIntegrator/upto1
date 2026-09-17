import React from 'react';

import {BlogDemo} from '../PostDemo';

export const metadata = {title: 'Mise en page — page blog (maquette 19)'};

export default async function Page({searchParams}: {searchParams: Promise<{page?: string}>}) {
  const {page} = await searchParams;
  return <BlogDemo page={Math.max(0, Number(page ?? 1) - 1)} />;
}

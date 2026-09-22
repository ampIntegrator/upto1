import React from 'react'

import {LivePreviewRefresh} from '@/components/LivePreviewRefresh'
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider'
import {fontVariables} from './fonts'
import './styles.css'

export const metadata = {
  description: 'Orbita — design system Astryx',
  title: 'Orbita',
}

export default async function RootLayout(props: {children: React.ReactNode}) {
  const {children} = props

  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <body>
        <OrbitaThemeProvider>{children}</OrbitaThemeProvider>
        {/* Live Preview in the admin: reload the route on save (nothing outside the preview iframe) */}
        <LivePreviewRefresh />
      </body>
    </html>
  )
}

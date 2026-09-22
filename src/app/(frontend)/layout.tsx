import React from 'react'

import {LivePreviewRefresh} from '@/components/LivePreviewRefresh'
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider'
import {fontVariables} from './fonts'
import './styles.css'

export const metadata = {
  description: 'Orbita — design system Astryx',
  title: 'Orbita',
}

/** `modal`: the modal slot (@modal), a modal opened over the page by a client-side link to /modale/<slug> */
export default async function RootLayout(props: {children: React.ReactNode; modal: React.ReactNode}) {
  const {children, modal} = props

  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <body>
        <OrbitaThemeProvider>
          {children}
          {modal}
        </OrbitaThemeProvider>
        {/* Live Preview in the admin: reload the route on save (nothing outside the preview iframe) */}
        <LivePreviewRefresh />
      </body>
    </html>
  )
}

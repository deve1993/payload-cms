import type { Metadata } from 'next'
import React from 'react'
import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Pixarts CMS',
    template: '%s | Pixarts CMS',
  },
  description: 'Sistema di gestione contenuti multi-tenant',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="it">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './styles.css'

export const metadata = {
  title: {
    default: 'Pixarts - Soluzioni Digitali Innovative',
    template: '%s | Pixarts',
  },
  description:
    'Pixarts crea soluzioni digitali innovative: siti web, e-commerce, app e strategie di marketing per far crescere il tuo business.',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#000000',
  icons: {
    icon: '/pixarts-logo-simple.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

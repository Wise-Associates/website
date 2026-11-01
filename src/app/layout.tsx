import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import './globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wise-associates.fr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Wise Associates, cabinet de conseil en management',
    template: '%s | Wise Associates',
  },
  description:
    'Cabinet de conseil en management basé à Paris, dédié aux services financiers : risques, conformité, data management et transformation digitale.',
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'Wise Associates' },
}

export const viewport: Viewport = { themeColor: '#13211a' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

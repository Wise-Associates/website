import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
// Instrument Sans en police variable avec l'axe de chasse (wdth) : les libellés utilisent une chasse
// étroite plutôt que des capitales espacées. Space Grotesk pour les titres.
import '@fontsource-variable/instrument-sans/wdth.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import './globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { seo } from '@/content/site'
import { siteName, siteUrl } from '@/lib/seo'

// Valeurs par défaut ; chaque page précise les siennes avec pageMetadata (src/lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.home.title, template: `%s | ${siteName}` },
  description: seo.home.description,
  applicationName: siteName,
  openGraph: { type: 'website', locale: 'fr_FR', siteName },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#0e1712' }

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

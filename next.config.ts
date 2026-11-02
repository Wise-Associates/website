import type { NextConfig } from 'next'
import { legacyJobPaths, legacyRedirects } from './src/content/legacy-urls'
import { publications } from './src/content/publications'

// Le site est entièrement statique : pas de script tiers, pas d'iframe, pas de formulaire.
// La CSP est donc stricte ; l'élargir seulement si un service externe est ajouté.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // Anciennes URL du site WordPress, conservées pour les liens entrants et le référencement.
  async redirects() {
    return [
      { source: '/nos-expertises', destination: '/expertises', permanent: true },
      { source: '/risks-finance', destination: '/expertises/risks-finance', permanent: true },
      { source: '/compliance', destination: '/expertises/compliance', permanent: true },
      { source: '/data-management', destination: '/expertises/data-management', permanent: true },
      { source: '/digital-transformation', destination: '/expertises/digital-transformation', permanent: true },
      { source: '/nos-publications', destination: '/publications', permanent: true },
      { source: '/offres-demploi', destination: '/recrutement', permanent: true },
      { source: '/offres-demploie', destination: '/recrutement', permanent: true },
      { source: '/candidature-spontanee', destination: '/recrutement#candidature', permanent: true },
      { source: '/politique-de-confidentialite', destination: '/mentions-legales#confidentialite', permanent: true },
      ...publications.map((publication) => ({
        source: publication.legacyPath,
        destination: `/publications/${publication.slug}`,
        permanent: true,
      })),
      ...legacyJobPaths.map((source) => ({ source, destination: '/recrutement', permanent: true })),
      ...legacyRedirects.map((redirect) => ({ ...redirect, permanent: true })),
      // Une seule adresse canonique : www.wise-associates.fr renvoie vers wise-associates.fr.
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'www.wise-associates.fr' }],
        destination: 'https://wise-associates.fr/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

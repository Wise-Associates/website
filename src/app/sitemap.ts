import type { MetadataRoute } from 'next'
import { expertises } from '@/content/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wise-associates.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/expertises',
    ...expertises.map((expertise) => `/expertises/${expertise.slug}`),
    '/publications',
    '/recrutement',
    '/a-propos',
    '/contact',
    '/mentions-legales',
  ]
  return paths.map((path) => ({ url: `${siteUrl}${path}` }))
}

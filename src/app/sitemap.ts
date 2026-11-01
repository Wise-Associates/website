import type { MetadataRoute } from 'next'
import { publications } from '@/content/publications'
import { expertises } from '@/content/site'
import { absoluteUrl } from '@/lib/seo'

// Pages indexables uniquement : les mentions légales (noindex) n'y figurent pas.
// La date de modification n'est donnée que lorsqu'elle est connue avec certitude (articles).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    '/expertises',
    ...expertises.map((expertise) => `/expertises/${expertise.slug}`),
    '/publications',
    '/recrutement',
    '/a-propos',
    '/contact',
  ].map((path) => ({ url: absoluteUrl(path) }))

  const articles = publications.map((publication) => ({
    url: absoluteUrl(`/publications/${publication.slug}`),
    lastModified: publication.date,
  }))

  return [...pages, ...articles]
}

import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'

// Seule la production est indexable. Les previews Vercel (VERCEL_ENV=preview) sont fermées
// aux robots pour ne pas concurrencer wise-associates.fr dans les résultats de recherche.
export default function robots(): MetadataRoute.Robots {
  const isVercelNonProduction = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production'
  if (isVercelNonProduction) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return { rules: { userAgent: '*', allow: '/', disallow: '/admin' }, sitemap: absoluteUrl('/sitemap.xml') }
}

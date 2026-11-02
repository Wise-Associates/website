import type { Metadata } from 'next'
import { seo } from '@/content/site'

// Adresse canonique du site : toutes les URL absolues (canonical, Open Graph, sitemap,
// données structurées) en dérivent. Voir .env.example.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wise-associates.fr').replace(/\/+$/, '')

export const siteName = 'Wise Associates'

export function absoluteUrl(path: string): string {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

type PageSeo = {
  title: string
  description: string
  // Chemin de la page, par exemple « /expertises/compliance ».
  path: string
  // L'accueil affiche son titre tel quel, sans le suffixe « | Wise Associates ».
  absoluteTitle?: boolean
  article?: { publishedTime: string; section: string }
  noindex?: boolean
  // true si la page a son propre opengraph-image.tsx dans son dossier (accueil, expertises,
  // articles) : l'image donnée ici prendrait sinon le pas sur ce fichier.
  ownShareImage?: boolean
}

// Image de partage par défaut (src/app/opengraph-image.tsx). Elle doit être redonnée aux pages
// sans fichier opengraph-image.tsx, car l'objet openGraph d'une page remplace celui hérité.
const defaultImage = { url: '/opengraph-image', width: 1200, height: 630, alt: seo.og.homeAlt }

// Métadonnées communes à chaque page : URL canonique, aperçu de partage et indexation.
export function pageMetadata({ title, description, path, absoluteTitle, article, noindex, ownShareImage }: PageSeo): Metadata {
  const images = ownShareImage ? {} : { images: [defaultImage] }
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: 'fr_FR',
      ...images,
      ...(article
        ? { type: 'article', publishedTime: article.publishedTime, section: article.section, authors: [siteName] }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title, description, ...images },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

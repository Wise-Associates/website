import { home, seo } from '@/content/site'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

// Image de partage par défaut, reprise par toutes les pages qui n'ont pas la leur.
export const alt = seo.og.homeAlt
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({ eyebrow: seo.og.homeEyebrow, title: home.hero.title })
}

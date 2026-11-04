import { notFound } from 'next/navigation'
import { sectors, seo } from '@/content/site'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = seo.og.sectorAlt
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sector = sectors.find((item) => item.slug === slug)
  if (!sector) notFound()
  return renderOgImage({ eyebrow: seo.og.sectorEyebrow, title: sector.title })
}

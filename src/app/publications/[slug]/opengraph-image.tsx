import { notFound } from 'next/navigation'
import { formatDate } from '@/content/format'
import { publications } from '@/content/publications'
import { seo } from '@/content/site'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = seo.og.articleAlt
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const publication = publications.find((item) => item.slug === slug)
  if (!publication) notFound()
  return renderOgImage({
    eyebrow: `${publication.category} · ${formatDate(publication.date)}`,
    title: publication.title,
  })
}

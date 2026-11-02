import { notFound } from 'next/navigation'
import { expertises, seo } from '@/content/site'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = seo.og.expertiseAlt
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return expertises.map((expertise) => ({ slug: expertise.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const expertise = expertises.find((item) => item.slug === slug)
  if (!expertise) notFound()
  return renderOgImage({ eyebrow: seo.og.expertiseEyebrow, title: expertise.title })
}

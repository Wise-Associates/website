import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { publications } from '@/content/publications'
import { formatDate } from '@/content/format'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const publication = publications.find((item) => item.slug === slug)
  if (!publication) return {}
  return {
    title: publication.title,
    description: publication.excerpt,
    openGraph: { type: 'article', publishedTime: publication.date },
  }
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params
  const publication = publications.find((item) => item.slug === slug)
  if (!publication) notFound()

  const others = publications.filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <>
      <PageHero
        eyebrow={publication.category}
        title={publication.title}
        crumbs={[{ href: '/publications', label: 'Nos publications' }]}
      >
        <p className="article-meta">
          <time dateTime={publication.date}>{formatDate(publication.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{publication.readingMinutes} min de lecture</span>
        </p>
      </PageHero>
      <section className="section">
        <div className="container">
          <article className="article">
            <p className="article__lead">{publication.excerpt}</p>
            {publication.body.map((block, index) => {
              if (block.kind === 'heading') return <h2 key={index}>{block.text}</h2>
              if (block.kind === 'paragraph') return <p key={index}>{block.text}</p>
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            })}
            {publication.source && (
              <p className="article__source">
                Source :{' '}
                <a href={publication.source.url} rel="noopener noreferrer" target="_blank">
                  {publication.source.label}
                </a>
              </p>
            )}
            <Link href="/publications" className="link-arrow">
              <ArrowLeft /> Toutes nos publications
            </Link>
          </article>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">À lire aussi</p>
              <h2 className="h2">D’autres analyses</h2>
            </div>
          </div>
          <ul className="cards">
            {others.map((item) => (
              <li key={item.slug} className="card card--link">
                <span className="card__index">{item.category}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={`/publications/${item.slug}`} className="link-arrow">
                  Lire l’article <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

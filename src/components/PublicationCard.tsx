import Link from 'next/link'
import type { Publication } from '@/content/publications'
import { formatDate } from '@/content/format'
import { CoverArt } from './Art'
import { ArrowRight } from './Icons'

export function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <article className="post">
      <time dateTime={publication.date}>{formatDate(publication.date)}</time>
      <h3>{publication.title}</h3>
      <p>{publication.excerpt}</p>
      <Link className="link-arrow" href={`/publications/${publication.slug}`}>
        Lire l’article <ArrowRight />
      </Link>
      <div className="post__cover">
        <CoverArt variant={index} />
        <span className="tag">{publication.category}</span>
      </div>
    </article>
  )
}

import Link from 'next/link'
import type { Publication } from '@/content/publications'
import { formatDate } from '@/content/format'
import { CoverArt } from './Art'

// Carte d'article : la carte entière est cliquable grâce au lien du titre (.card-link).
export function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <article className="post">
      <div className="post__cover">
        <CoverArt variant={index} />
      </div>
      <p className="post-meta">
        <span className="tag">{publication.category}</span>
        <time dateTime={publication.date}>{formatDate(publication.date)}</time>
      </p>
      <h3>
        <Link className="card-link" href={`/publications/${publication.slug}`}>
          {publication.title}
        </Link>
      </h3>
      <p>{publication.excerpt}</p>
    </article>
  )
}

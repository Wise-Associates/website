import type { Publication } from '@/content/site'
import { CoverArt } from './Art'
import { ArrowRight } from './Icons'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <article className="post">
      <div className="post__cover">
        <CoverArt variant={index} />
        <span className="tag">{publication.category}</span>
      </div>
      <div className="post__body">
        <time dateTime={publication.date}>{dateFormat.format(new Date(publication.date))}</time>
        <h3 className="h3">{publication.title}</h3>
        <p>{publication.excerpt}</p>
        <a className="link-arrow" href={publication.url}>
          Lire l’article <ArrowRight />
        </a>
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { PublicationCard } from '@/components/PublicationCard'
import { publications } from '@/content/publications'
import { seo } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({ ...seo.publications, path: '/publications' })

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos publications"
        title="Nos publications"
        path="/publications"
        lead="Décryptages réglementaires, analyses de marché et regards sur l’innovation en finance, par nos consultants."
      />
      <section className="section">
        <div className="container">
          <ul className="cards" style={{ gap: 'var(--space-5)' }}>
            {publications.map((publication, index) => (
              <li key={publication.slug}>
                <PublicationCard publication={publication} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { expertises, seo, services } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({ ...seo.expertises, path: '/expertises' })

export default function ExpertisesPage() {
  return (
    <>
      <PageHero
        title="Nos expertises"
        path="/expertises"
        lead="Nos consultants interviennent au cœur des transformations des banques et des institutions financières, du cadrage réglementaire jusqu’au déploiement d’outils innovants."
      />
      <section className="section">
        <div className="container">
          <ul className="cards">
            {expertises.map((expertise) => (
              <li key={expertise.slug} className="card card--link">
                <h2 className="h3">
                  <Link href={`/expertises/${expertise.slug}`} className="card-link">
                    {expertise.title}
                  </Link>
                </h2>
                <p>{expertise.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Trois offres complémentaires</h2>
            </div>
          </div>
          <ul className="cards">
            {services.map((service) => (
              <li key={service.title} className="card">
                <h3 className="h3">{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

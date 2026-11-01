import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { expertises, services } from '@/content/site'

export const metadata: Metadata = {
  title: 'Nos expertises',
  description: 'Risks & Finance, Compliance, Data Management et Digital Transformation : les expertises de Wise Associates.',
}

export default function ExpertisesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos expertises"
        title="Nos expertises"
        lead="Nos consultants interviennent au cœur des transformations des banques et des institutions financières, du cadrage réglementaire jusqu’au déploiement d’outils innovants."
      />
      <section className="section">
        <div className="container">
          <ul className="cards">
            {expertises.map((expertise, index) => (
              <li key={expertise.slug} className="card card--link">
                <span className="card__index">0{index + 1}</span>
                <h2 className="h3">{expertise.title}</h2>
                <p>{expertise.short}</p>
                <Link href={`/expertises/${expertise.slug}`} className="link-arrow">
                  Découvrir <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nos services</p>
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { expertises, expertisesPage, sectors, seo, services } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({ ...seo.expertises, path: '/expertises' })

export default function ExpertisesPage() {
  return (
    <>
      <PageHero title={expertisesPage.title} path="/expertises" lead={expertisesPage.lead} />
      <section className="section" aria-labelledby="metiers">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="metiers" className="h2">
                {expertisesPage.domainsTitle}
              </h2>
              <p className="lead">{expertisesPage.domainsLead}</p>
            </div>
          </div>
          <ul className="cards">
            {expertises.map((expertise) => (
              <li key={expertise.slug} className="card card--link">
                <h3 className="h3">
                  <Link href={`/expertises/${expertise.slug}`} className="card-link">
                    {expertise.title}
                  </Link>
                </h3>
                <p>{expertise.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="secteurs" className="section section--tint" aria-labelledby="secteurs-titre">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="secteurs-titre" className="h2">
                {expertisesPage.sectorsTitle}
              </h2>
              <p className="lead">{expertisesPage.sectorsLead}</p>
            </div>
          </div>
          <ul className="cards">
            {sectors.map((sector) => (
              <li key={sector.slug} className="card card--link">
                <h3 className="h3">
                  <Link href={`/expertises/secteurs/${sector.slug}`} className="card-link">
                    {sector.title}
                  </Link>
                </h3>
                <p>{sector.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">{expertisesPage.servicesTitle}</h2>
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

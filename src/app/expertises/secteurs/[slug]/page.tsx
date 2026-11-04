import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { PublicationCard } from '@/components/PublicationCard'
import { expertisesPage, sectorPage, sectors } from '@/content/site'
import { pageMetadata } from '@/lib/seo'
import { sectorExpertises, sectorPublications } from '@/lib/sectors'

type Props = { params: Promise<{ slug: string }> }

// Une page qui couvre plusieurs univers (assurance et protection sociale) titre chaque volet.
function PartTitle({ title }: { title?: string }) {
  return title ? <h3 className="h3">{title}</h3> : null
}

export const dynamicParams = false

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sector = sectors.find((item) => item.slug === slug)
  if (!sector) return {}
  return pageMetadata({
    title: sector.seoTitle,
    description: sector.short,
    path: `/expertises/secteurs/${sector.slug}`,
    ownShareImage: true,
  })
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params
  const sector = sectors.find((item) => item.slug === slug)
  if (!sector) notFound()

  const related = sectorExpertises(sector)
  const readings = sectorPublications(sector)
  return (
    <>
      <PageHero
        title={sector.title}
        path={`/expertises/secteurs/${sector.slug}`}
        lead={sector.short}
        crumbs={[{ href: '/expertises', label: expertisesPage.title }]}
      />
      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <h2 className="h2">{sectorPage.issuesTitle}</h2>
            <p className="lead">{sector.intro}</p>
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-7)' }}>
            {sector.parts.map((part, index) => (
              <div key={part.title ?? index} style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <PartTitle title={part.title} />
                <ul className="list-check">
                  {part.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container" style={{ display: 'grid', gap: 'var(--space-7)' }}>
          <div className="section-head">
            <div>
              <h2 className="h2">{sectorPage.offersTitle}</h2>
              <p className="lead">{sectorPage.offersLead}</p>
            </div>
          </div>
          {sector.parts.map((part, index) => (
            <div key={part.title ?? index} style={{ display: 'grid', gap: 'var(--space-5)' }}>
              <PartTitle title={part.title} />
              <ul className="cards">
                {part.offers.map((offer) => (
                  <li key={offer.title} className="card">
                    {part.title ? <h4 className="h3">{offer.title}</h4> : <h3 className="h3">{offer.title}</h3>}
                    <p>{offer.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">{sectorPage.approachTitle}</h2>
            </div>
          </div>
          <ol className="cards">
            {sectorPage.approach.map((step, index) => (
              <li key={step.title} className="card">
                <p className="eyebrow">
                  {sectorPage.stepLabel} {index + 1}
                </p>
                <h3 className="h3">{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">{sectorPage.expertisesTitle}</h2>
            </div>
          </div>
          <ul className="cards">
            {related.map((expertise) => (
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
      {readings.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="h2">{sectorPage.publicationsTitle}</h2>
              </div>
            </div>
            <ul className="cards cards--fill" style={{ gap: 'var(--space-5)' }}>
              {readings.map((publication, index) => (
                <li key={publication.slug}>
                  <PublicationCard publication={publication} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2 className="h2">{sectorPage.cta.title}</h2>
            <p className="lead">{sectorPage.cta.text}</p>
            <Link className="btn btn--primary" href="/contact">
              {sectorPage.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

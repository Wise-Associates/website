import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { expertises } from '@/content/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return expertises.map((expertise) => ({ slug: expertise.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const expertise = expertises.find((item) => item.slug === slug)
  return expertise ? { title: expertise.title, description: expertise.short } : {}
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params
  const expertise = expertises.find((item) => item.slug === slug)
  if (!expertise) notFound()

  const others = expertises.filter((item) => item.slug !== slug)

  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title={expertise.title}
        lead={expertise.short}
        crumbs={[{ href: '/expertises', label: 'Nos expertises' }]}
      />
      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="eyebrow">Vos enjeux</p>
            <h2 className="h2">Ce qui se joue pour vous</h2>
            <p className="lead">{expertise.intro}</p>
          </div>
          <ol className="list-check">
            {expertise.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Notre expertise</p>
              <h2 className="h2">Nos interventions</h2>
              <p className="lead">
                Nos consultants interviennent au cœur de ces transformations. Liste non exhaustive.
              </p>
            </div>
          </div>
          <ul className="cards">
            {expertise.domains.map((domain) => (
              <li key={domain.title} className="card">
                <h3 className="h3">{domain.title}</h3>
                <p>{domain.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Autres expertises</p>
              <h2 className="h2">Explorer nos autres domaines</h2>
            </div>
          </div>
          <ul className="cards">
            {others.map((item) => (
              <li key={item.slug} className="card card--link">
                <h3 className="h3">{item.title}</h3>
                <p>{item.short}</p>
                <Link href={`/expertises/${item.slug}`} className="link-arrow">
                  Découvrir <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

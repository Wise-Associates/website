import type { Metadata } from 'next'
import Link from 'next/link'
import { FeatureArt } from '@/components/Art'
import { ArrowRight } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { company, services } from '@/content/site'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Wise Associates, cabinet de conseil en management parisien dédié aux services financiers.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Wise Associates en bref"
        title="À propos"
        lead="Un cabinet de conseil en management basé à Paris, qui intervient exclusivement dans les services financiers."
      />
      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="eyebrow">Notre cabinet</p>
            <h2 className="h2">L’agilité d’un cabinet indépendant, l’exigence des grandes maisons</h2>
          </div>
          <div className="prose">
            <p>
              Wise Associates accompagne ses clients dans leurs projets de transformation sur l’ensemble des
              domaines de la finance. Alternative aux grandes maisons en France comme à l’international, le
              cabinet apporte une expertise pointue en ingénierie financière et intervient sur des missions à
              forte valeur ajoutée.
            </p>
            <p>
              La gestion des risques et la mise en œuvre des exigences réglementaires auprès des banques et des
              institutions financières constituent notre <strong>cœur de métier historique</strong>.
            </p>
            <p>
              Nous intervenons à travers des pratiques dédiées : <strong>{company.practices.join(', ')}</strong>.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="feature">
            <div className="feature__body">
              <p className="eyebrow">Middle East Africa</p>
              <h2 className="h2">Une présence qui s’étend</h2>
              <p className="lead">
                Nous proposons aux institutions de la région Middle East Africa des compétences similaires à celles
                de notre bureau parisien, fondées sur des méthodologies communes. Nos consultants internationaux
                travaillent aux côtés des équipes de Paris.
              </p>
            </div>
            <div className="feature__art">
              <FeatureArt />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nos services</p>
              <h2 className="h2">Ce que nous faisons</h2>
            </div>
            <Link href="/expertises" className="link-arrow">
              Nos expertises <ArrowRight />
            </Link>
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

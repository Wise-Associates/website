import Link from 'next/link'
import { HeroArt, FeatureArt } from '@/components/Art'
import { Carousel } from '@/components/Carousel'
import { ArrowRight, Pin, ServiceIcon } from '@/components/Icons'
import { PublicationCard } from '@/components/PublicationCard'
import { publications } from '@/content/publications'
import { company, expertises, jobOffers, services } from '@/content/site'

const serviceIconNames = ['risk', 'efficiency', 'strategy'] as const

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <HeroArt />
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">{company.tagline} · Paris</p>
            <h1 className="display">
              L’expertise métier et la réglementation bancaire,{' '}
              <span className="hero__accent">portées par l’innovation.</span>
            </h1>
            <p className="lead">
              Une capacité unique à combiner l’expertise des métiers et la connaissance détaillée de la
              réglementation bancaire, grâce à l’innovation technologique.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--primary">
                Contactez-nous <ArrowRight />
              </Link>
              <Link href="/a-propos" className="btn btn--ghost">
                Wise Associates en bref
              </Link>
            </div>
          </div>
          <div className="hero__meta">
            <dl>
              <dt>Cœur de métier</dt>
              <dd>Risques et conformité réglementaire</dd>
            </dl>
            <dl>
              <dt>Clients</dt>
              <dd>Banques et institutions financières</dd>
            </dl>
            <dl>
              <dt>Présence</dt>
              <dd>Paris · Middle East Africa</dd>
            </dl>
            <dl>
              <dt>
                <Pin size={14} /> Nous trouver
              </dt>
              <dd>
                <a href={company.mapUrl} rel="noopener noreferrer" target="_blank">
                  {company.address.street}
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="eyebrow">Unis par notre expertise</p>
            <h2 className="h2">Une alternative aux grandes maisons de conseil</h2>
          </div>
          <div className="prose">
            <p>
              Wise Associates est un <strong>cabinet de conseil en management</strong> basé à Paris, qui accompagne
              ses clients dans leurs projets de transformation sur l’ensemble des domaines de la finance.
            </p>
            <p>
              Alternative aux grandes maisons en France comme à l’international, nous apportons une expertise
              pointue en ingénierie financière et intervenons sur des missions à forte valeur ajoutée. La gestion
              des risques et la mise en œuvre des exigences réglementaires constituent notre cœur de métier
              historique.
            </p>
            <p>
              <Link href="/a-propos" className="link-arrow">
                Découvrir le cabinet <ArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="expertises-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nos expertises</p>
              <h2 id="expertises-title" className="h2">
                Au cœur des transformations du secteur financier
              </h2>
            </div>
            <Link href="/expertises" className="link-arrow">
              Toutes nos expertises <ArrowRight />
            </Link>
          </div>
          <ul className="cards">
            {expertises.map((expertise, index) => (
              <li key={expertise.slug} className="card card--link">
                <span className="card__index">0{index + 1}</span>
                <h3 className="h3">{expertise.title}</h3>
                <p>{expertise.short}</p>
                <Link href={`/expertises/${expertise.slug}`} className="link-arrow">
                  En savoir plus <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="publications-title">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div>
              <p className="eyebrow">Nos dernières publications</p>
              <h2 id="publications-title" className="h2">
                Décryptages réglementaires et analyses
              </h2>
            </div>
            <Link href="/publications" className="link-arrow">
              Toutes nos publications <ArrowRight />
            </Link>
          </div>
          <Carousel label="Dernières publications">
            {publications.map((publication, index) => (
              <li key={publication.slug}>
                <PublicationCard publication={publication} index={index} />
              </li>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Nos services</p>
              <h2 id="services-title" className="h2">
                Trois offres pour accompagner vos décisions
              </h2>
            </div>
          </div>
          <ul className="cards">
            {services.map((service, index) => (
              <li key={service.title} className="card">
                <span className="card__icon">
                  <ServiceIcon name={serviceIconNames[index]} />
                </span>
                <h3 className="h3">{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature">
            <div className="feature__body">
              <p className="eyebrow">Middle East Africa</p>
              <h2 className="h2">Les mêmes standards, de Paris à la région MEA</h2>
              <p className="lead">
                Nous proposons aux institutions de la région Middle East Africa des compétences similaires à celles
                de notre bureau parisien, fondées sur des méthodologies communes : gestion des risques, conformité
                réglementaire, mise à niveau des modèles, études quantitatives et projets de transformation.
              </p>
              <Link href="/a-propos" className="link-arrow">
                En savoir plus <ArrowRight />
              </Link>
            </div>
            <div className="feature__art">
              <FeatureArt />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="careers-title">
        <div className="container careers">
          <div style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
            <p className="eyebrow">Nous rejoindre</p>
            <h2 id="careers-title" className="h2">
              Rejoignez Wise Associates
            </h2>
            <p className="lead">
              Intégrez un environnement de travail dynamique, qui encourage le partage des compétences et le
              travail en équipe.
            </p>
            <div className="btn-row">
              <Link href="/recrutement" className="btn btn--primary">
                Parcourir les offres <ArrowRight />
              </Link>
              <Link href="/recrutement#candidature" className="btn btn--ghost">
                Candidature spontanée
              </Link>
            </div>
          </div>
          <ul className="careers__panel">
            {jobOffers.slice(0, 4).map((offer) => (
              <li key={offer}>{offer}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="practices-title">
        <div className="container" style={{ display: 'grid', gap: 'var(--space-6)', textAlign: 'center' }}>
          <div style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: 'center' }}>
            <p className="eyebrow">Exclusivement les services financiers</p>
            <h2 id="practices-title" className="h2">
              Des pratiques dédiées à chaque métier
            </h2>
          </div>
          <ul className="practices">
            {company.practices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2 className="h2">Parlons de vos enjeux</h2>
            <p className="lead">
              Une question réglementaire, un projet de transformation ? Nos consultants vous répondent.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Nous contacter <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

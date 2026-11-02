import type { Metadata } from 'next'
import Link from 'next/link'
import { CoverArt, HeroBackdrop, HeroRing, IntroArt, OrbitArt, ServiceEmblem } from '@/components/Art'
import { JsonLd } from '@/components/JsonLd'
import { formatDate } from '@/content/format'
import { publications, type Publication } from '@/content/publications'
import { company, home, seo } from '@/content/site'
import { pageMetadata } from '@/lib/seo'
import { organizationLd, websiteLd } from '@/lib/structured-data'

export const metadata: Metadata = pageMetadata({ ...seo.home, path: '/', absoluteTitle: true, ownShareImage: true })

function PostMeta({ publication }: { publication: Publication }) {
  return (
    <p className="post-meta">
      <span className="tag">{publication.category}</span>
      <time dateTime={publication.date}>{formatDate(publication.date)}</time>
    </p>
  )
}

export default function HomePage() {
  const [first, second, third] = publications

  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={websiteLd()} />
      <section className="hero" aria-labelledby="hero-title">
        <HeroBackdrop />
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 id="hero-title">{home.hero.title}</h1>
            <p>{home.hero.text}</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--primary">
                {home.hero.cta}
              </Link>
              <Link href="/expertises" className="btn btn--quiet">
                {home.hero.secondary}
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <HeroRing segments={home.services} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="intro-title">
        <div className="container intro">
          <div className="intro__text">
            <h2 id="intro-title" className="h2">
              {home.intro.title}
            </h2>
            {home.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href="/a-propos" className="btn btn--dark">
              {home.intro.cta}
            </Link>
          </div>
          <div className="intro__visual">
            <IntroArt />
          </div>
        </div>
      </section>

      {/* Les trois offres s'empilent au défilement sur grand écran (voir .services-stack). */}
      <div className="services-stack">
        {home.services.map((service) => (
          <section
            key={service.key}
            id={`offre-${service.key}`}
            className={`service service--${service.key}`}
            aria-labelledby={`service-${service.key}`}
          >
            <div className="container service__grid">
              <ServiceEmblem name={service.key} label={service.label} />
              <div className="service__text">
                <h2 id={`service-${service.key}`}>{service.title}</h2>
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <Link href={service.href} className="link-more">
                  {home.readMore}
                  <span className="visually-hidden"> : {service.label}</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section" aria-labelledby="news-title">
        <div className="container bento">
          <div className="tile tile--intro">
            <h2 id="news-title">{home.news.title}</h2>
            <p>{home.news.text}</p>
          </div>
          {[first, second].map((publication, index) => (
            <article key={publication.slug} className="tile tile--post">
              <div className="tile__cover">
                <CoverArt variant={index} />
              </div>
              <PostMeta publication={publication} />
              <h3>
                <Link href={`/publications/${publication.slug}`} className="card-link">
                  {publication.title}
                </Link>
              </h3>
              <p className="tile__excerpt">{publication.excerpt}</p>
            </article>
          ))}
          <div className="tile tile--plain">
            <h3>{home.news.digestTitle}</h3>
            <p>{home.news.digestText}</p>
            <Link href="/publications" className="btn btn--dark">
              {home.news.cta}
            </Link>
          </div>
          <article className="tile tile--post tile--row bento__wide">
            <div className="tile__body">
              <PostMeta publication={third} />
              <h3>
                <Link href={`/publications/${third.slug}`} className="card-link">
                  {third.title}
                </Link>
              </h3>
              <p className="tile__excerpt">{third.excerpt}</p>
            </div>
            <div className="tile__cover">
              <CoverArt variant={2} />
            </div>
          </article>
        </div>
      </section>

      <section className="section careers" aria-labelledby="careers-title">
        <div className="container careers__grid">
          <div className="careers__text">
            <h2 id="careers-title">{home.careers.title}</h2>
            <p>{home.careers.text}</p>
            <div className="btn-row">
              <Link href="/recrutement" className="btn btn--primary">
                {home.careers.cta}
              </Link>
              <Link href="/recrutement#candidature" className="btn btn--ghost">
                {home.careers.secondary}
              </Link>
            </div>
          </div>
          <div className="careers__panel">
            <OrbitArt labels={home.careers.orbit} />
          </div>
        </div>
      </section>

      <section className="trust" aria-labelledby="trust-title">
        <div className="container trust__head">
          <h2 id="trust-title">{home.practices.title}</h2>
          <p>{home.practices.text}</p>
        </div>
        <div className="marquee">
          {/* La liste est dupliquée pour un défilement continu ; la copie est masquée aux lecteurs d'écran. */}
          <ul className="marquee__track">
            {company.practices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
            {company.practices.map((practice) => (
              <li key={`${practice}-copie`} aria-hidden="true">
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

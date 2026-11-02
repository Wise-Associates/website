import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { company, jobOffers, seo } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({ ...seo.recrutement, path: '/recrutement' })

const applyHref = (subject: string) => `mailto:${company.email}?subject=${encodeURIComponent(subject)}`

export default function RecrutementPage() {
  return (
    <>
      <PageHero
        title="Rejoignez Wise Associates"
        path="/recrutement"
        lead="Nous recrutons des profils issus de grandes universités, d’écoles de commerce et d’ingénieurs : des consultants analytiques qui partagent nos valeurs et s’intéressent au conseil et à nos secteurs d’intervention."
      />
      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <h2 className="h2">Postes ouverts</h2>
            <p className="lead">
              Envoyez votre CV et quelques lignes de motivation en précisant l’intitulé du poste.
            </p>
          </div>
          <ul className="cards cards--list">
            {jobOffers.map((offer) => (
              <li key={offer} className="card card--job">
                <h3 className="h3">{offer}</h3>
                <a className="btn btn--outline" href={applyHref(`Candidature : ${offer}`)}>
                  Postuler par e-mail
                  <span className="visually-hidden"> : {offer}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="candidature" className="section">
        <div className="container">
          <div className="cta-band">
            <p className="eyebrow">Candidature spontanée</p>
            <h2 className="h2">Aucune offre ne correspond à votre profil ?</h2>
            <p className="lead">
              Écrivez-nous à {company.email} avec votre CV : nous étudions chaque candidature avec attention.
            </p>
            <a className="btn btn--primary" href={applyHref('Candidature spontanée')}>
              Envoyer ma candidature
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

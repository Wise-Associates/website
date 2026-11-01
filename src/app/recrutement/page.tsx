import type { Metadata } from 'next'
import { ArrowRight } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { company, jobOffers } from '@/content/site'

export const metadata: Metadata = {
  title: 'Nous rejoindre',
  description: 'Offres d’emploi et candidature spontanée chez Wise Associates.',
}

const applyHref = (subject: string) => `mailto:${company.email}?subject=${encodeURIComponent(subject)}`

export default function RecrutementPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous rejoindre"
        title="Rejoignez Wise Associates"
        lead="Nous recrutons des profils issus de grandes universités, d’écoles de commerce et d’ingénieurs : des consultants analytiques qui partagent nos valeurs et s’intéressent au conseil et à nos secteurs d’intervention."
      />
      <section className="section">
        <div className="container split">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <p className="eyebrow">Nos offres d’emploi</p>
            <h2 className="h2">Postes ouverts</h2>
            <p className="lead">
              Envoyez votre CV et quelques lignes de motivation en précisant l’intitulé du poste.
            </p>
          </div>
          <ul className="cards" style={{ gridTemplateColumns: '1fr' }}>
            {jobOffers.map((offer) => (
              <li key={offer} className="card card--link" style={{ padding: 'var(--space-5)' }}>
                <h3 className="h3">{offer}</h3>
                <a className="link-arrow" href={applyHref(`Candidature : ${offer}`)}>
                  Postuler par e-mail <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="candidature" className="section">
        <div className="container">
          <div className="cta-band">
            <p className="eyebrow" style={{ color: '#fff' }}>
              Candidature spontanée
            </p>
            <h2 className="h2">Aucune offre ne correspond à votre profil ?</h2>
            <p className="lead">
              Écrivez-nous à {company.email} avec votre CV : nous étudions chaque candidature avec attention.
            </p>
            <a className="btn btn--primary" href={applyHref('Candidature spontanée')}>
              Envoyer ma candidature <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

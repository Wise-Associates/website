import type { Metadata } from 'next'
import { Pin } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { company } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contacter Wise Associates, 66 avenue des Champs-Élysées, 75008 Paris.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nos contacts"
        lead="Une question, un projet ? Écrivez-nous ou appelez-nous, nous revenons vers vous rapidement."
      />
      <section className="section">
        <div className="container contact-grid">
          <div className="card">
            <p className="eyebrow">Adresse</p>
            <address style={{ fontStyle: 'normal', fontSize: '1.125rem', fontWeight: 600 }}>
              {company.address.street}
              <br />
              {company.address.city}, {company.address.country}
            </address>
            <a className="link-arrow" href={company.mapUrl} target="_blank" rel="noopener noreferrer">
              <Pin /> Voir sur la carte
            </a>
          </div>
          <div className="card">
            <p className="eyebrow">E-mail</p>
            <a href={`mailto:${company.email}`} style={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {company.email}
            </a>
          </div>
          <div className="card">
            <p className="eyebrow">Téléphone</p>
            <a href={`tel:${company.phoneHref}`} style={{ fontSize: '1.125rem', fontWeight: 600 }}>
              {company.phone}
            </a>
            <p>{company.hours}</p>
          </div>
        </div>
      </section>
    </>
  )
}

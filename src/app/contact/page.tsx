import type { Metadata } from 'next'
import { Pin } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { company, seo } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({ ...seo.contact, path: '/contact' })

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Nos contacts"
        path="/contact"
        lead="Une question, un projet ? Écrivez-nous ou appelez-nous, nous revenons vers vous rapidement."
      />
      <section className="section">
        <div className="container contact-grid">
          <div className="card">
            <p className="eyebrow">Adresse</p>
            <address style={{ fontStyle: 'normal', fontSize: '1.125rem', fontWeight: 600 }}>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.locality}, {company.address.country}
            </address>
            <a className="link-more" href={company.mapUrl} target="_blank" rel="noopener noreferrer">
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

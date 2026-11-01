import Image from 'next/image'
import Link from 'next/link'
import { company, expertises, home } from '@/content/site'
import { Mail, Pin } from './Icons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <h2>{home.footer.title}</h2>
            <p>{home.footer.text}</p>
            <a className="btn btn--primary" href={company.mapUrl} target="_blank" rel="noopener noreferrer">
              <Pin size={20} /> {home.footer.cta}
            </a>
          </div>
          <div className="footer__cols">
            <div>
              <h3 className="footer__title">Nos expertises</h3>
              <ul className="footer__links">
                {expertises.map((expertise) => (
                  <li key={expertise.slug}>
                    <Link href={`/expertises/${expertise.slug}`}>{expertise.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer__title">Le cabinet</h3>
              <ul className="footer__links">
                <li>
                  <Link href="/a-propos">Wise Associates en bref</Link>
                </li>
                <li>
                  <Link href="/expertises">Nos services</Link>
                </li>
                <li>
                  <Link href="/contact">Nos bureaux</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer__title">Nous rejoindre</h3>
              <ul className="footer__links">
                <li>
                  <Link href="/recrutement">Offres d’emploi</Link>
                </li>
                <li>
                  <Link href="/recrutement#candidature">Candidature spontanée</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer__title">
                <Link href="/publications">Nos publications</Link>
              </h3>
              <h3 className="footer__title">
                <Link href="/contact">Nous contacter</Link>
              </h3>
              <ul className="footer__links">
                <li>
                  {company.address.street}, {company.address.city}
                </li>
                <li>
                  <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <Link href="/" className="brand" aria-label="Wise Associates, accueil">
            <Image src="/wise-logo.png" alt="" width={46} height={46} />
            <span>Wise Associates</span>
          </Link>
          <ul>
            <li>
              <Link href="/mentions-legales#confidentialite">Politique de données personnelles</Link>
            </li>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
          </ul>
          <p className="footer__contact">
            Écrivez-nous
            <a href={`mailto:${company.email}`} aria-label={`Écrire à ${company.email}`}>
              <Mail size={16} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { company, expertises } from '@/content/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Logo />
            <p>
              Cabinet de conseil en management basé à Paris, Wise Associates intervient exclusivement dans les
              services financiers, à travers des pratiques dédiées : {company.practices.join(', ')}.
            </p>
          </div>
          <div>
            <h2 className="footer__title">Expertises</h2>
            <ul className="footer__links">
              {expertises.map((expertise) => (
                <li key={expertise.slug}>
                  <Link href={`/expertises/${expertise.slug}`}>{expertise.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Le cabinet</h2>
            <ul className="footer__links">
              <li>
                <Link href="/a-propos">À propos</Link>
              </li>
              <li>
                <Link href="/publications">Nos publications</Link>
              </li>
              <li>
                <Link href="/recrutement">Nous rejoindre</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Nous trouver</h2>
            <address>
              {company.address.street}
              <br />
              {company.address.city}
              <br />
              <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </address>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Wise Associates. Tous droits réservés.</p>
          <ul>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/mentions-legales#confidentialite">Confidentialité</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

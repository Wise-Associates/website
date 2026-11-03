import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { company, seo } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

// Page utile mais sans intérêt dans les résultats de recherche : non indexée, liens suivis.
export const metadata: Metadata = pageMetadata({ ...seo.mentionsLegales, path: '/mentions-legales', noindex: true })

export default function LegalPage() {
  return (
    <>
      <PageHero title="Mentions légales" path="/mentions-legales" />
      <section className="section">
        <div className="container legal">
          <section>
            <h2 className="h3">Éditeur du site</h2>
            <dl>
              <dt>Raison sociale</dt>
              <dd>WISE ASSOCIATES, SAS au capital de 7 000,00 €</dd>
              <dt>Immatriculation</dt>
              <dd>RCS Paris B 798 256 509, SIRET 798 256 509 00026</dd>
              <dt>Siège social</dt>
              <dd>
                {company.address.street}, {company.address.postalCode} {company.address.locality}
              </dd>
              <dt>Contact</dt>
              <dd>
                {company.phone}, <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
              <dt>Directrice de la publication</dt>
              <dd>Leyla Bathaei, co-gérante</dd>
            </dl>
          </section>
          <section>
            <h2 className="h3">Hébergement</h2>
            {/* À confirmer au moment de la mise en production (ancien hébergeur : IONOS). */}
            <p>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis,{' '}
              <a href="https://vercel.com">vercel.com</a>
            </p>
          </section>
          <section>
            <h2 className="h3">Contenu du site</h2>
            <p>
              Wise Associates s’efforce de fournir des informations exactes et à jour, mais ne saurait être tenue
              responsable de l’usage ou de l’interprétation qui en est fait. Le cabinet se réserve le droit de
              modifier le contenu du site à tout moment.
            </p>
          </section>
          <section>
            <h2 className="h3">Propriété intellectuelle</h2>
            <p>
              Le site, sa présentation et son contenu sont protégés par le droit de la propriété intellectuelle.
              Toute reproduction, modification ou exploitation commerciale, totale ou partielle, nécessite
              l’autorisation écrite de WISE ASSOCIATES.
            </p>
          </section>
          <section id="confidentialite">
            <h2 className="h3">Données personnelles</h2>
            <p>
              Ce site ne comporte ni formulaire, ni outil de mesure d’audience, ni cookie publicitaire. Les seules
              données personnelles que nous recevons sont celles que vous nous adressez volontairement par e-mail
              ou par téléphone (par exemple une candidature). Elles servent uniquement à vous répondre et ne sont
              conservées que le temps nécessaire à ce traitement.
            </p>
            <p>
              L’espace d’administration réservé à notre équipe dépose un cookie de session strictement nécessaire à
              son fonctionnement. Il ne concerne pas les visiteurs du site.
            </p>
            <p>
              Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement,
              d’opposition et de limitation du traitement de vos données. Pour l’exercer, écrivez à{' '}
              <a href={`mailto:${company.email}`}>{company.email}</a>. Vous pouvez également introduire une
              réclamation auprès de la CNIL.
            </p>
          </section>
          <section>
            <h2 className="h3">Liens vers des sites tiers</h2>
            <p>
              Les liens vers des sites tiers sont fournis de bonne foi ; Wise Associates n’est pas responsable de
              leur contenu ni de leurs évolutions.
            </p>
          </section>
          <section>
            <h2 className="h3">Droit applicable</h2>
            <p>Le présent site et ses mentions légales sont soumis au droit français.</p>
          </section>
        </div>
      </section>
    </>
  )
}

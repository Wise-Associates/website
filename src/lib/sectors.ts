import { publications } from '@/content/publications'
import { expertises, type Sector } from '@/content/site'

// Expertises métier citées par un secteur. Un slug inconnu est une erreur de saisie dans
// site.ts : on la signale au build plutôt que d'afficher une page incomplète.
export function sectorExpertises(sector: Sector) {
  return sector.expertises.map((slug) => {
    const expertise = expertises.find((item) => item.slug === slug)
    if (!expertise) throw new Error(`Secteur « ${sector.slug} » : expertise inconnue « ${slug} ».`)
    return expertise
  })
}

// Publications citées par un secteur. Seules les publications en ligne sont listées : une
// publication repassée en brouillon disparaît simplement de la page, sans casser le build.
export function sectorPublications(sector: Sector) {
  return sector.publications.flatMap((slug) => publications.filter((publication) => publication.slug === slug))
}

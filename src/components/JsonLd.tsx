// Données structurées schema.org pour les moteurs de recherche. Le contenu vient de nos
// propres fichiers, mais « < » est tout de même échappé pour qu'aucun texte ne puisse
// fermer la balise script.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

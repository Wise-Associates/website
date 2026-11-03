import type { ArticleBlock } from '@/content/publications'

// Corps d'un article, partagé par la page publique et l'aperçu du backoffice.
// Texte brut uniquement : React échappe tout, aucune balise saisie n'est interprétée.
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return blocks.map((block, index) => {
    if (block.kind === 'heading') return <h2 key={index}>{block.text}</h2>
    if (block.kind === 'paragraph') return <p key={index}>{block.text}</p>
    return (
      <ul key={index}>
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    )
  })
}

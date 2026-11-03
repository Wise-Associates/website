// Publications du site public, lues au moment du build dans content/publications/*.json.
// Ces fichiers sont modifiés par le backoffice (/admin), qui les enregistre par commit dans le dépôt :
// chaque enregistrement relance donc un build et le site public reste entièrement statique.
// Seules les publications au statut « published » sont exposées ici. Format : voir content/publications/README.md.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parsePublicationFile, publishedOnly, type PublicationFile } from '../lib/publications/model.ts'

export type { ArticleBlock, Publication } from '../lib/publications/model.ts'

export const publicationsDir = join(process.cwd(), 'content', 'publications')

function readPublicationFiles(): PublicationFile[] {
  return readdirSync(publicationsDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => parsePublicationFile(JSON.parse(readFileSync(join(publicationsDir, name), 'utf8')), name))
}

export const publications = publishedOnly(readPublicationFiles())

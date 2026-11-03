// Modèle des publications : format des fichiers content/publications/<slug>.json, validation des saisies du
// backoffice et conversion du texte en blocs affichables. Fonctions pures, sans accès disque ni réseau,
// couvertes par model.test.ts. Imports relatifs : ce fichier est aussi chargé par next.config.ts et node --test.
import { adminText } from '../../content/admin.ts'

export type ArticleBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }

export const publicationStatuses = ['draft', 'published'] as const
export type PublicationStatus = (typeof publicationStatuses)[number]

export type PublicationSource = { label: string; url: string }

// Contenu d'un fichier JSON tel qu'il est stocké dans le dépôt.
export type PublicationFile = {
  slug: string
  status: PublicationStatus
  title: string
  date: string
  category: string
  excerpt: string
  // Texte au format décrit dans parseBody.
  body: string
  source?: PublicationSource
  // Adresse de l'article sur l'ancien site WordPress, redirigée vers la nouvelle page (next.config.ts).
  // Reprise des articles migrés uniquement : le backoffice ne permet pas de la saisir.
  legacyPath?: string
}

// Publication prête à afficher sur le site public.
export type Publication = {
  slug: string
  legacyPath?: string
  title: string
  date: string
  category: string
  excerpt: string
  readingMinutes: number
  body: ArticleBlock[]
  source?: PublicationSource
}

export const limits = { title: 200, slug: 80, category: 40, excerpt: 400, body: 50_000, sourceLabel: 120, sourceUrl: 500 }

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

// Format du texte, volontairement réduit pour rester lisible sans éditeur riche et sans HTML :
// - une ligne vide sépare deux blocs ;
// - « ## titre » crée un intertitre ;
// - des lignes qui commencent par « - » forment une liste ;
// - les autres lignes consécutives forment un paragraphe.
// Le texte est rendu par React comme du texte brut : aucune balise n'est interprétée.
export function parseBody(body: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flush = () => {
    if (paragraph.length > 0) blocks.push({ kind: 'paragraph', text: paragraph.join(' ') })
    if (list.length > 0) blocks.push({ kind: 'list', items: list })
    paragraph = []
    list = []
  }

  for (const rawLine of body.replace(/\r\n?/g, '\n').split('\n')) {
    const line = rawLine.trim()
    if (line === '') {
      flush()
    } else if (line.startsWith('## ')) {
      flush()
      blocks.push({ kind: 'heading', text: line.slice(3).trim() })
    } else if (line.startsWith('- ')) {
      if (paragraph.length > 0) flush()
      list.push(line.slice(2).trim())
    } else {
      if (list.length > 0) flush()
      paragraph.push(line)
    }
  }
  flush()
  return blocks
}

// Temps de lecture estimé à 200 mots par minute, chapeau compris.
export function readingMinutes(excerpt: string, body: string): number {
  const words = `${excerpt} ${body}`.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length
  return Math.max(1, Math.round(words / 200))
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, limits.slug)
    .replace(/-+$/, '')
}

function isValidDate(value: string): boolean {
  if (!datePattern.test(value)) return false
  const date = new Date(`${value}T12:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function text(input: Record<string, unknown>, key: string): string {
  const value = input[key]
  return typeof value === 'string' ? value.trim() : ''
}

export type PublicationField = 'title' | 'slug' | 'date' | 'category' | 'excerpt' | 'body' | 'status' | 'source'
export type ValidationResult =
  | { ok: true; value: Omit<PublicationFile, 'legacyPath'> }
  | { ok: false; errors: Partial<Record<PublicationField, string>> }

// Valide une saisie du backoffice (champs texte d'un formulaire). Si le slug est vide, il est déduit du titre.
export function validatePublicationInput(input: Record<string, unknown>): ValidationResult {
  const errors: Partial<Record<PublicationField, string>> = {}
  const title = text(input, 'title')
  const slug = text(input, 'slug') || slugify(title)
  const date = text(input, 'date')
  const category = text(input, 'category')
  const excerpt = text(input, 'excerpt')
  const body = typeof input.body === 'string' ? input.body.replace(/\r\n?/g, '\n').trim() : ''
  const status = text(input, 'status')
  const sourceLabel = text(input, 'sourceLabel')
  const sourceUrl = text(input, 'sourceUrl')

  if (!title || title.length > limits.title) errors.title = adminText.errors.title
  if (!slugPattern.test(slug) || slug.length > limits.slug) errors.slug = adminText.errors.slug
  if (!isValidDate(date)) errors.date = adminText.errors.date
  if (!category || category.length > limits.category) errors.category = adminText.errors.category
  if (!excerpt || excerpt.length > limits.excerpt) errors.excerpt = adminText.errors.excerpt
  if (!body || body.length > limits.body) errors.body = adminText.errors.body
  if (!(publicationStatuses as readonly string[]).includes(status)) errors.status = adminText.errors.status

  let source: PublicationSource | undefined
  if (sourceLabel || sourceUrl) {
    if (!sourceLabel || sourceLabel.length > limits.sourceLabel || !isHttpsUrl(sourceUrl)) {
      errors.source = adminText.errors.source
    } else {
      source = { label: sourceLabel, url: sourceUrl }
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return {
    ok: true,
    value: {
      slug,
      status: status as PublicationStatus,
      title,
      date,
      category,
      excerpt,
      body,
      ...(source ? { source } : {}),
    },
  }
}

// Seules les adresses https sont acceptées : le lien est affiché tel quel sur le site public,
// une adresse « javascript: » ou « data: » y serait exécutable.
function isHttpsUrl(value: string): boolean {
  if (value.length > limits.sourceUrl) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

const legacyPathPattern = /^\/[a-z0-9][a-z0-9/-]*$/

// Vérifie un fichier lu dans le dépôt. Un fichier invalide arrête le build ou l'affichage du backoffice
// avec un message explicite plutôt que de publier une page cassée.
export function parsePublicationFile(raw: unknown, fileName: string): PublicationFile {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error(`${fileName} : le contenu doit être un objet JSON.`)
  }
  const record = raw as Record<string, unknown>
  const source = record.source as Record<string, unknown> | undefined
  const result = validatePublicationInput({
    ...record,
    sourceLabel: source?.label,
    sourceUrl: source?.url,
  })
  if (!result.ok) {
    throw new Error(`${fileName} : champs invalides (${Object.keys(result.errors).join(', ')}).`)
  }
  if (`${result.value.slug}.json` !== fileName) {
    throw new Error(`${fileName} : le nom du fichier doit être « ${result.value.slug}.json ».`)
  }
  const legacyPath = record.legacyPath
  if (legacyPath !== undefined && (typeof legacyPath !== 'string' || !legacyPathPattern.test(legacyPath))) {
    throw new Error(`${fileName} : legacyPath invalide.`)
  }
  return { ...result.value, ...(legacyPath ? { legacyPath } : {}) }
}

// Ordre des clés fixe et fin de ligne finale : des diffs Git lisibles d'un enregistrement à l'autre.
export function serializePublicationFile(file: PublicationFile): string {
  const ordered: PublicationFile = {
    slug: file.slug,
    status: file.status,
    title: file.title,
    date: file.date,
    category: file.category,
    excerpt: file.excerpt,
    body: file.body,
    ...(file.source ? { source: { label: file.source.label, url: file.source.url } } : {}),
    ...(file.legacyPath ? { legacyPath: file.legacyPath } : {}),
  }
  return `${JSON.stringify(ordered, null, 2)}\n`
}

export function toPublication(file: PublicationFile): Publication {
  return {
    slug: file.slug,
    title: file.title,
    date: file.date,
    category: file.category,
    excerpt: file.excerpt,
    readingMinutes: readingMinutes(file.excerpt, file.body),
    body: parseBody(file.body),
    ...(file.legacyPath ? { legacyPath: file.legacyPath } : {}),
    ...(file.source ? { source: file.source } : {}),
  }
}

// Plus récentes d'abord ; à date égale, ordre alphabétique du titre pour un affichage stable.
export function sortByDateDesc<T extends { date: string; title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'fr'))
}

export function publishedOnly(files: PublicationFile[]): Publication[] {
  return sortByDateDesc(files.filter((file) => file.status === 'published')).map(toPublication)
}

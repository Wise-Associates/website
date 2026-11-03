// Stockage des publications du backoffice. Deux implémentations, choisies par getPublicationStore() :
// - GitHub (préproduction et production) : chaque enregistrement est un commit sur CONTENT_BRANCH via l'API
//   Contents. Le commit déclenche le build Vercel ; le site public reste statique et l'historique est dans Git.
// - Locale (npm run dev sans jeton) : écrit directement dans content/publications.
// Les deux protègent contre l'écrasement concurrent : chaque lecture renvoie une « version »
// (sha Git ou empreinte du fichier) qu'il faut fournir pour modifier ou supprimer.
import { createHash } from 'node:crypto'
import { readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { publicationsDir } from '@/content/publications'
import { parsePublicationFile, serializePublicationFile, type PublicationFile } from '@/lib/publications/model'

export type StoredPublication = { file: PublicationFile; version: string }

export class ConflictError extends Error {}
export class AlreadyExistsError extends Error {}
export class NotFoundError extends Error {}

export type PublicationStore = {
  mode: 'github' | 'local'
  branch: string
  list(): Promise<StoredPublication[]>
  get(slug: string): Promise<StoredPublication | null>
  create(file: PublicationFile): Promise<void>
  update(file: PublicationFile, version: string): Promise<void>
  remove(slug: string, version: string): Promise<void>
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Le slug sert à construire un chemin de fichier ou d'URL : on refuse tout ce qui n'est pas un slug.
function fileName(slug: string): string {
  if (!slugPattern.test(slug)) throw new NotFoundError(`Slug invalide : ${slug}`)
  return `${slug}.json`
}

// ---------- GitHub ----------

const githubTimeoutMs = 10_000
const contentPath = 'content/publications'

function githubStore(token: string, repository: string, branch: string): PublicationStore {
  const base = `https://api.github.com/repos/${repository}/contents/${contentPath}`

  async function call(method: string, url: string, body?: unknown): Promise<Response> {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'wise-associates-backoffice',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      signal: AbortSignal.timeout(githubTimeoutMs),
    })
  }

  // Message sans le corps de la réponse ni le jeton : seulement l'opération et le code HTTP.
  function failure(operation: string, response: Response): Error {
    return new Error(`GitHub ${operation} : HTTP ${response.status}`)
  }

  const ref = `ref=${encodeURIComponent(branch)}`

  async function get(slug: string): Promise<StoredPublication | null> {
    const name = fileName(slug)
    const response = await call('GET', `${base}/${name}?${ref}`)
    if (response.status === 404) return null
    if (!response.ok) throw failure(`lecture de ${name}`, response)
    const data = (await response.json()) as { sha: string; content: string }
    const json: unknown = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'))
    return { file: parsePublicationFile(json, name), version: data.sha }
  }

  async function put(file: PublicationFile, message: string, sha?: string): Promise<Response> {
    return call('PUT', `${base}/${fileName(file.slug)}`, {
      message,
      branch,
      content: Buffer.from(serializePublicationFile(file), 'utf8').toString('base64'),
      ...(sha ? { sha } : {}),
    })
  }

  return {
    mode: 'github',
    branch,
    async list() {
      const response = await call('GET', `${base}?${ref}`)
      if (response.status === 404) return []
      if (!response.ok) throw failure('liste des publications', response)
      const entries = (await response.json()) as { name: string; type: string }[]
      const slugs = entries
        .filter((entry) => entry.type === 'file' && entry.name.endsWith('.json'))
        .map((entry) => entry.name.slice(0, -'.json'.length))
      const items = await Promise.all(slugs.map(get))
      return items.filter((item): item is StoredPublication => item !== null)
    },
    get,
    async create(file) {
      const response = await put(file, `Publication : créer « ${file.title} » (backoffice)`)
      // GitHub répond 422 quand le fichier existe déjà et qu'aucun sha n'est fourni.
      if (response.status === 422) throw new AlreadyExistsError(file.slug)
      if (!response.ok) throw failure(`création de ${file.slug}`, response)
    },
    async update(file, version) {
      const response = await put(file, `Publication : modifier « ${file.title} » (backoffice)`, version)
      if (response.status === 409) throw new ConflictError(file.slug)
      if (response.status === 404) throw new NotFoundError(file.slug)
      if (!response.ok) throw failure(`modification de ${file.slug}`, response)
    },
    async remove(slug, version) {
      const response = await call('DELETE', `${base}/${fileName(slug)}`, {
        message: `Publication : supprimer ${slug} (backoffice)`,
        branch,
        sha: version,
      })
      if (response.status === 409) throw new ConflictError(slug)
      if (response.status === 404) throw new NotFoundError(slug)
      if (!response.ok) throw failure(`suppression de ${slug}`, response)
    },
  }
}

// ---------- Local (développement) ----------

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex')
}

function isMissingFile(error: unknown): boolean {
  return (error as NodeJS.ErrnoException).code === 'ENOENT'
}

function localStore(): PublicationStore {
  async function get(slug: string): Promise<StoredPublication | null> {
    const name = fileName(slug)
    let content: string
    try {
      content = await readFile(join(publicationsDir, name), 'utf8')
    } catch (error) {
      if (isMissingFile(error)) return null
      throw error
    }
    return { file: parsePublicationFile(JSON.parse(content), name), version: hash(content) }
  }

  async function expectVersion(slug: string, version: string): Promise<void> {
    const current = await get(slug)
    if (!current) throw new NotFoundError(slug)
    if (current.version !== version) throw new ConflictError(slug)
  }

  return {
    mode: 'local',
    branch: 'local',
    async list() {
      const names = (await readdir(publicationsDir)).filter((name) => name.endsWith('.json'))
      const items = await Promise.all(names.map((name) => get(name.slice(0, -'.json'.length))))
      return items.filter((item): item is StoredPublication => item !== null)
    },
    get,
    async create(file) {
      try {
        // « wx » échoue si le fichier existe : pas d'écrasement d'une publication homonyme.
        await writeFile(join(publicationsDir, fileName(file.slug)), serializePublicationFile(file), { flag: 'wx' })
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'EEXIST') throw new AlreadyExistsError(file.slug)
        throw error
      }
    },
    async update(file, version) {
      await expectVersion(file.slug, version)
      await writeFile(join(publicationsDir, fileName(file.slug)), serializePublicationFile(file))
    },
    async remove(slug, version) {
      await expectVersion(slug, version)
      await unlink(join(publicationsDir, fileName(slug)))
    },
  }
}

// ---------- Choix du stockage ----------

const repositoryPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/

export class StoreConfigError extends Error {}

// Sans jeton GitHub, le stockage local n'est permis qu'en développement : en production, le système de
// fichiers de Vercel est en lecture seule et une écriture serait perdue. On échoue donc explicitement.
export function getPublicationStore(): PublicationStore {
  const token = process.env.GITHUB_CONTENT_TOKEN
  if (token) {
    const repository = process.env.GITHUB_REPOSITORY ?? 'wise-associates/website'
    const branch = process.env.CONTENT_BRANCH ?? 'pre-dev'
    if (!repositoryPattern.test(repository)) throw new StoreConfigError('GITHUB_REPOSITORY doit être de la forme propriétaire/dépôt.')
    return githubStore(token, repository, branch)
  }
  if (process.env.NODE_ENV !== 'production') return localStore()
  throw new StoreConfigError('GITHUB_CONTENT_TOKEN est absent : le backoffice ne peut pas enregistrer de publication.')
}

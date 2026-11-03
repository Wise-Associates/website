'use server'

// Actions serveur du backoffice. Chacune vérifie elle-même la session (requireAdmin) : une action serveur
// est un point d'entrée HTTP public, appelable sans passer par les pages. Next.js vérifie en plus que
// l'origine de la requête correspond au site (protection CSRF), et le cookie de session est SameSite=Strict.
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminText } from '@/content/admin'
import { endSession, getAdminConfig, requireAdmin, startSession } from '@/lib/admin/auth'
import { verifyPassword } from '@/lib/admin/password'
import { createLoginLimiter } from '@/lib/admin/rate-limit'
import {
  AlreadyExistsError,
  ConflictError,
  getPublicationStore,
  NotFoundError,
} from '@/lib/admin/store'
import { validatePublicationInput, type PublicationField } from '@/lib/publications/model'

const loginLimiter = createLoginLimiter()

// L'adresse saisie est renvoyée pour être réaffichée : React vide le formulaire après chaque envoi.
export type LoginState = { error?: string; email?: string } | undefined

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const config = getAdminConfig()
  if (!config) return { error: adminText.login.notConfigured }

  // Sur Vercel, la première adresse de x-forwarded-for est celle du visiteur, posée par la plateforme.
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  const now = Date.now()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (loginLimiter.isBlocked(ip, now)) return { error: adminText.login.throttled, email }

  const password = String(formData.get('password') ?? '')
  // Le mot de passe est toujours vérifié, même si l'adresse est fausse : même durée de réponse dans les deux cas.
  const passwordMatches = await verifyPassword(password, config.passwordHash)
  if (!passwordMatches || email !== config.email) {
    loginLimiter.recordFailure(ip, now)
    console.warn('Backoffice : échec de connexion')
    return { error: adminText.login.invalid, email }
  }

  loginLimiter.reset(ip)
  await startSession(config)
  redirect('/admin')
}

export async function logout(): Promise<void> {
  await endSession()
  redirect('/admin/connexion')
}

export type PublicationFormValues = Record<
  'title' | 'slug' | 'date' | 'category' | 'excerpt' | 'body' | 'status' | 'sourceLabel' | 'sourceUrl',
  string
>
export type SaveState =
  | { errors: Partial<Record<PublicationField | 'form', string>>; values: PublicationFormValues }
  | undefined

function formValues(formData: FormData): PublicationFormValues {
  const read = (key: string) => String(formData.get(key) ?? '')
  return {
    title: read('title'),
    slug: read('slug'),
    date: read('date'),
    category: read('category'),
    excerpt: read('excerpt'),
    body: read('body'),
    status: read('status'),
    sourceLabel: read('sourceLabel'),
    sourceUrl: read('sourceUrl'),
  }
}

// Crée une publication (champ caché « version » vide) ou modifie celle désignée par « originalSlug ».
export async function savePublication(_previous: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin()
  const values = formValues(formData)
  const originalSlug = String(formData.get('originalSlug') ?? '')
  const version = String(formData.get('version') ?? '')
  const isEdit = originalSlug !== ''

  // Le slug d'une publication existante ne change pas : il fixe son adresse publique et le nom du fichier.
  const result = validatePublicationInput(isEdit ? { ...values, slug: originalSlug } : values)
  if (!result.ok) return { errors: { ...result.errors, form: adminText.form.errorSummary }, values }

  const store = getPublicationStore()
  try {
    if (isEdit) {
      const current = await store.get(originalSlug)
      if (!current) return { errors: { form: adminText.errors.notFound }, values }
      if (current.version !== version) return { errors: { form: adminText.errors.conflict }, values }
      // L'ancienne adresse WordPress n'est pas saisissable : on la conserve telle quelle.
      await store.update({ ...result.value, ...(current.file.legacyPath ? { legacyPath: current.file.legacyPath } : {}) }, version)
    } else {
      await store.create(result.value)
    }
  } catch (error) {
    if (error instanceof AlreadyExistsError) return { errors: { slug: adminText.errors.slugTaken }, values }
    if (error instanceof ConflictError) return { errors: { form: adminText.errors.conflict }, values }
    if (error instanceof NotFoundError) return { errors: { form: adminText.errors.notFound }, values }
    console.error('Backoffice : échec de l’enregistrement', { slug: result.value.slug, error })
    return { errors: { form: adminText.errors.storage }, values }
  }
  redirect(`/admin/publications/${result.value.slug}?enregistre=1`)
}

export type DeleteState = { error?: string } | undefined

export async function deletePublication(_previous: DeleteState, formData: FormData): Promise<DeleteState> {
  await requireAdmin()
  if (formData.get('confirm') !== 'oui') return { error: adminText.errors.deleteConfirm }
  const slug = String(formData.get('originalSlug') ?? '')
  const version = String(formData.get('version') ?? '')
  try {
    await getPublicationStore().remove(slug, version)
  } catch (error) {
    if (error instanceof ConflictError) return { error: adminText.errors.conflict }
    if (error instanceof NotFoundError) return { error: adminText.errors.notFound }
    console.error('Backoffice : échec de la suppression', { slug, error })
    return { error: adminText.errors.storage }
  }
  redirect('/admin')
}

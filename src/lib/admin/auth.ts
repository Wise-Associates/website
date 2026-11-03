// Authentification du backoffice : un compte administrateur unique, défini par variables d'environnement
// (voir .env.example). Chaque page et chaque action serveur du backoffice appelle requireAdmin() :
// aucune protection ne repose sur un middleware ou sur l'affichage.
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSessionToken, readSessionToken, sessionDurationMs, type Session } from './session'

export const sessionCookie = 'wa_admin_session'
export const loginPath = '/admin/connexion'

export type AdminConfig = { email: string; passwordHash: string; sessionSecret: string }

// Renvoie null si le backoffice n'est pas configuré : la connexion est alors refusée (échec fermé).
export function getAdminConfig(): AdminConfig | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim()
  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  // 32 caractères au moins : un secret court rendrait la signature des sessions devinable.
  if (!email || !passwordHash || !sessionSecret || sessionSecret.length < 32) return null
  return { email, passwordHash, sessionSecret }
}

export async function getSession(): Promise<Session | null> {
  // cookies() est lu en premier : il rend la page dynamique, même quand la configuration est absente au build.
  const token = (await cookies()).get(sessionCookie)?.value
  const config = getAdminConfig()
  if (!config) return null
  return readSessionToken(token, config.sessionSecret, config.email, Date.now())
}

export async function requireAdmin(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect(loginPath)
  return session
}

export async function startSession(config: AdminConfig): Promise<void> {
  ;(await cookies()).set(sessionCookie, createSessionToken(config.email, config.sessionSecret, Date.now()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: sessionDurationMs / 1000,
  })
}

export async function endSession(): Promise<void> {
  ;(await cookies()).delete({ name: sessionCookie, path: '/admin' })
}

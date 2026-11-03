// Jeton de session du backoffice : charge utile JSON signée par HMAC-SHA256 avec ADMIN_SESSION_SECRET.
// Il ne contient que l'adresse de l'administrateur et une date d'expiration ; rien n'est stocké côté serveur.
// Changer ADMIN_SESSION_SECRET invalide immédiatement toutes les sessions ouvertes.
import { createHmac, timingSafeEqual } from 'node:crypto'

export const sessionDurationMs = 8 * 60 * 60 * 1000

export type Session = { email: string; expiresAt: number }

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSessionToken(email: string, secret: string, now: number): string {
  const payload = Buffer.from(JSON.stringify({ email, expiresAt: now + sessionDurationMs })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

// Renvoie null pour tout jeton absent, altéré, expiré ou émis pour une autre adresse.
export function readSessionToken(token: string | undefined, secret: string, expectedEmail: string, now: number): Session | null {
  if (!token) return null
  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra !== undefined) return null
  const expected = Buffer.from(sign(payload, secret))
  const actual = Buffer.from(signature)
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null
  let session: unknown
  try {
    session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    // Signature valide mais contenu illisible : jeton émis par une version incompatible, traité comme absent.
    return null
  }
  if (typeof session !== 'object' || session === null) return null
  const { email, expiresAt } = session as Record<string, unknown>
  if (typeof email !== 'string' || typeof expiresAt !== 'number') return null
  if (email !== expectedEmail || expiresAt <= now) return null
  return { email, expiresAt }
}

// Limite les tentatives de connexion par adresse IP : 5 échecs par fenêtre de 15 minutes.
// La mémoire est propre à chaque instance du serveur : sur Vercel, plusieurs instances peuvent coexister,
// la limite est donc approximative. Elle complète, sans le remplacer, le coût de scrypt et un mot de passe long.
export const maxFailures = 5
export const windowMs = 15 * 60 * 1000

type Entry = { failures: number; windowStart: number }

export function createLoginLimiter() {
  const entries = new Map<string, Entry>()

  const current = (key: string, now: number): Entry | undefined => {
    const entry = entries.get(key)
    if (entry && now - entry.windowStart >= windowMs) {
      entries.delete(key)
      return undefined
    }
    return entry
  }

  return {
    isBlocked(key: string, now: number): boolean {
      return (current(key, now)?.failures ?? 0) >= maxFailures
    },
    recordFailure(key: string, now: number): void {
      const entry = current(key, now) ?? { failures: 0, windowStart: now }
      entry.failures += 1
      entries.set(key, entry)
    },
    reset(key: string): void {
      entries.delete(key)
    },
  }
}

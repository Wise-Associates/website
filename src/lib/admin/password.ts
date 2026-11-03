// Empreinte du mot de passe administrateur (scrypt, fourni par Node : aucune dépendance).
// Format stocké dans ADMIN_PASSWORD_HASH : scrypt:<N>:<r>:<p>:<sel base64url>:<empreinte base64url>.
// Séparateur « : » et non « $ » : Next.js développe les « $NOM » dans les fichiers .env.
// Générer une empreinte : node scripts/hash-password.mjs
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

const keyLength = 64
const defaultCost = { N: 2 ** 15, r: 8, p: 1 }

function derive(password: string, salt: Buffer, cost: { N: number; r: number; p: number }): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // maxmem doit couvrir 128 * N * r octets, sinon Node refuse N = 2^15.
    scrypt(password, salt, keyLength, { ...cost, maxmem: 256 * cost.N * cost.r }, (error, key) =>
      error ? reject(error) : resolve(key),
    )
  })
}

export async function hashPassword(password: string, salt: Buffer = randomBytes(16)): Promise<string> {
  const key = await derive(password, salt, defaultCost)
  const { N, r, p } = defaultCost
  return ['scrypt', N, r, p, salt.toString('base64url'), key.toString('base64url')].join(':')
}

// Une empreinte mal formée lève une erreur : c'est une erreur de configuration, pas un mauvais mot de passe.
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, N, r, p, salt, hash] = stored.split(':')
  const cost = { N: Number(N), r: Number(r), p: Number(p) }
  if (scheme !== 'scrypt' || !salt || !hash || !Object.values(cost).every((value) => Number.isInteger(value) && value > 0)) {
    throw new Error('ADMIN_PASSWORD_HASH mal formée : régénérez-la avec node scripts/hash-password.mjs.')
  }
  const expected = Buffer.from(hash, 'base64url')
  const actual = await derive(password, Buffer.from(salt, 'base64url'), cost)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

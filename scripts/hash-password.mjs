// Génère la valeur de ADMIN_PASSWORD_HASH à partir d'un mot de passe saisi au clavier (non affiché).
// Usage : node scripts/hash-password.mjs
// Même format que src/lib/admin/password.ts (scrypt, N = 2^15, r = 8, p = 1).
import { randomBytes, scryptSync } from 'node:crypto'
import { createInterface } from 'node:readline'

const minLength = 12

function ask(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    // Masque la saisie : readline réécrit chaque caractère tapé, on le remplace par rien.
    rl._writeToOutput = (text) => {
      if (text.startsWith(question)) process.stdout.write(question)
    }
    rl.question(question, (answer) => {
      rl.close()
      process.stdout.write('\n')
      resolve(answer)
    })
  })
}

const password = await ask('Mot de passe administrateur : ')
if (password.length < minLength) {
  console.error(`Le mot de passe doit contenir au moins ${minLength} caractères.`)
  process.exit(1)
}
const confirmation = await ask('Confirmez le mot de passe : ')
if (confirmation !== password) {
  console.error('Les deux saisies ne correspondent pas.')
  process.exit(1)
}

const cost = { N: 2 ** 15, r: 8, p: 1 }
const salt = randomBytes(16)
const key = scryptSync(password, salt, 64, { ...cost, maxmem: 256 * cost.N * cost.r })
console.log('\nADMIN_PASSWORD_HASH=' + ['scrypt', cost.N, cost.r, cost.p, salt.toString('base64url'), key.toString('base64url')].join(':'))

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { hashPassword, verifyPassword } from './password.ts'

describe('mot de passe administrateur', () => {
  it('vérifie le bon mot de passe et refuse les autres', async () => {
    const stored = await hashPassword('correct horse battery staple')
    assert.match(stored, /^scrypt:32768:8:1:[\w-]+:[\w-]+$/)
    assert.equal(await verifyPassword('correct horse battery staple', stored), true)
    assert.equal(await verifyPassword('Correct horse battery staple', stored), false)
    assert.equal(await verifyPassword('', stored), false)
  })

  it('signale une empreinte mal configurée au lieu de refuser silencieusement', async () => {
    await assert.rejects(verifyPassword('x', 'motdepasseenclair'), /ADMIN_PASSWORD_HASH/)
  })
})

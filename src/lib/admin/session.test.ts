import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createSessionToken, readSessionToken, sessionDurationMs } from './session.ts'

const secret = 'secret-de-test-assez-long-pour-hmac-0123456789'
const email = 'admin@exemple.fr'
const now = 1_800_000_000_000

describe('jeton de session', () => {
  it('est accepté avant expiration', () => {
    const token = createSessionToken(email, secret, now)
    assert.deepEqual(readSessionToken(token, secret, email, now + 1000), { email, expiresAt: now + sessionDurationMs })
  })

  it('est refusé après expiration', () => {
    const token = createSessionToken(email, secret, now)
    assert.equal(readSessionToken(token, secret, email, now + sessionDurationMs), null)
  })

  it('est refusé s’il est signé avec un autre secret', () => {
    const token = createSessionToken(email, 'un-autre-secret-de-test-tout-aussi-long-0000', now)
    assert.equal(readSessionToken(token, secret, email, now), null)
  })

  it('est refusé si la charge utile est modifiée', () => {
    const [, signature] = createSessionToken(email, secret, now).split('.')
    const forged = Buffer.from(JSON.stringify({ email, expiresAt: now * 2 })).toString('base64url')
    assert.equal(readSessionToken(`${forged}.${signature}`, secret, email, now), null)
  })

  it('est refusé quand l’administrateur configuré a changé', () => {
    const token = createSessionToken(email, secret, now)
    assert.equal(readSessionToken(token, secret, 'autre@exemple.fr', now), null)
  })

  it('est refusé s’il est absent ou mal formé', () => {
    for (const token of [undefined, '', 'abc', 'a.b.c', '.']) {
      assert.equal(readSessionToken(token, secret, email, now), null)
    }
  })
})

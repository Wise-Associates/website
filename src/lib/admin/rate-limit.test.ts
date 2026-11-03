import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createLoginLimiter, maxFailures, windowMs } from './rate-limit.ts'

describe('limitation des tentatives de connexion', () => {
  it('bloque après le nombre maximal d’échecs, puis libère à la fin de la fenêtre', () => {
    const limiter = createLoginLimiter()
    for (let attempt = 0; attempt < maxFailures; attempt += 1) {
      assert.equal(limiter.isBlocked('1.2.3.4', 0), false)
      limiter.recordFailure('1.2.3.4', 0)
    }
    assert.equal(limiter.isBlocked('1.2.3.4', 1), true)
    assert.equal(limiter.isBlocked('5.6.7.8', 1), false)
    assert.equal(limiter.isBlocked('1.2.3.4', windowMs), false)
  })

  it('remet le compteur à zéro après une connexion réussie', () => {
    const limiter = createLoginLimiter()
    for (let attempt = 0; attempt < maxFailures; attempt += 1) limiter.recordFailure('ip', 0)
    limiter.reset('ip')
    assert.equal(limiter.isBlocked('ip', 1), false)
  })
})

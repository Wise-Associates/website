import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  parseBody,
  parsePublicationFile,
  publishedOnly,
  readingMinutes,
  serializePublicationFile,
  slugify,
  validatePublicationInput,
  type PublicationFile,
} from './model.ts'

const valid = {
  title: 'Risque de liquidité : le NSFR',
  slug: '',
  date: '2026-11-03',
  category: 'Liquidité',
  excerpt: 'Un chapeau.',
  body: 'Premier paragraphe.',
  status: 'published',
  sourceLabel: '',
  sourceUrl: '',
}

describe('parseBody', () => {
  it('découpe paragraphes, intertitres et listes', () => {
    const body = '## Contexte\nLigne un\nligne deux\n\n- point a\n- point b\nSuite\n\n## Fin'
    assert.deepEqual(parseBody(body), [
      { kind: 'heading', text: 'Contexte' },
      { kind: 'paragraph', text: 'Ligne un ligne deux' },
      { kind: 'list', items: ['point a', 'point b'] },
      { kind: 'paragraph', text: 'Suite' },
      { kind: 'heading', text: 'Fin' },
    ])
  })

  it('accepte les fins de ligne Windows', () => {
    assert.deepEqual(parseBody('A\r\n\r\nB'), [
      { kind: 'paragraph', text: 'A' },
      { kind: 'paragraph', text: 'B' },
    ])
  })

  it('garde le HTML comme texte brut', () => {
    assert.deepEqual(parseBody('<script>alert(1)</script>'), [{ kind: 'paragraph', text: '<script>alert(1)</script>' }])
  })
})

describe('validatePublicationInput', () => {
  it('déduit le slug du titre quand il est vide', () => {
    const result = validatePublicationInput(valid)
    assert.equal(result.ok, true)
    assert.equal(result.ok && result.value.slug, 'risque-de-liquidite-le-nsfr')
  })

  it('refuse un slug qui sortirait du dossier', () => {
    const result = validatePublicationInput({ ...valid, slug: '../secret' })
    assert.equal(result.ok, false)
    assert.ok(!result.ok && result.errors.slug)
  })

  it('refuse une date impossible et un statut inconnu', () => {
    const result = validatePublicationInput({ ...valid, date: '2026-02-30', status: 'archived' })
    assert.ok(!result.ok && result.errors.date && result.errors.status)
  })

  it('refuse une source non https (lien exécutable)', () => {
    for (const sourceUrl of ['javascript:alert(1)', 'http://exemple.fr', 'data:text/html,x']) {
      const result = validatePublicationInput({ ...valid, sourceLabel: 'Source', sourceUrl })
      assert.ok(!result.ok && result.errors.source, sourceUrl)
    }
  })

  it('accepte une source https complète', () => {
    const result = validatePublicationInput({ ...valid, sourceLabel: 'Institut', sourceUrl: 'https://exemple.fr/a' })
    assert.ok(result.ok && result.value.source?.url === 'https://exemple.fr/a')
  })

  it('refuse les champs obligatoires vides', () => {
    const result = validatePublicationInput({})
    assert.ok(!result.ok)
    assert.deepEqual(Object.keys(!result.ok ? result.errors : {}).sort(), ['body', 'category', 'date', 'excerpt', 'slug', 'status', 'title'])
  })
})

describe('fichiers de publication', () => {
  const file: PublicationFile = {
    slug: 'exemple',
    status: 'published',
    title: 'Exemple',
    date: '2026-01-15',
    category: 'Innovation',
    excerpt: 'Chapeau',
    body: 'Texte',
    legacyPath: '/ancien-article',
  }

  it('relit à l’identique un fichier sérialisé', () => {
    assert.deepEqual(parsePublicationFile(JSON.parse(serializePublicationFile(file)), 'exemple.json'), file)
  })

  it('exige que le nom du fichier corresponde au slug', () => {
    assert.throws(() => parsePublicationFile(file, 'autre.json'), /exemple\.json/)
  })

  it('refuse une ancienne adresse qui ne serait pas un chemin du site', () => {
    assert.throws(() => parsePublicationFile({ ...file, legacyPath: 'https://ailleurs.fr' }, 'exemple.json'), /legacyPath/)
  })

  it('n’expose que les publications publiées, les plus récentes d’abord', () => {
    const files: PublicationFile[] = [
      { ...file, slug: 'ancienne', date: '2020-01-01' },
      { ...file, slug: 'brouillon', status: 'draft', date: '2030-01-01' },
      { ...file, slug: 'recente', date: '2026-06-01' },
    ]
    assert.deepEqual(
      publishedOnly(files).map((item) => item.slug),
      ['recente', 'ancienne'],
    )
  })
})

describe('utilitaires', () => {
  it('slugify retire accents et ponctuation', () => {
    assert.equal(slugify('  CRR2 : l’été à Bâle !  '), 'crr2-l-ete-a-bale')
  })

  it('readingMinutes vaut au moins une minute', () => {
    assert.equal(readingMinutes('', 'court'), 1)
    assert.equal(readingMinutes('', 'mot '.repeat(1000)), 5)
  })
})

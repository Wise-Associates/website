import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteName, siteUrl } from '@/lib/seo'

// Images de partage (LinkedIn, X, messageries) générées une fois au build par next/og.
// Le moteur de rendu ne lit pas le CSS : les couleurs sont relues dans les variables :root
// de globals.css pour rester la seule source de vérité du design.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const root = process.cwd()
const files = Promise.all([
  readFile(join(root, 'src/app/globals.css'), 'utf8'),
  // next/og accepte le WOFF mais pas le WOFF2 : on lit les fichiers .woff fournis par @fontsource.
  readFile(join(root, 'node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff')),
  readFile(join(root, 'node_modules/@fontsource/roboto/files/roboto-latin-500-normal.woff')),
  readFile(join(root, 'public/wise-logo.png'), 'base64'),
])

function cssToken(css: string, name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`))
  if (!match) throw new Error(`Variable CSS --${name} introuvable dans src/app/globals.css`)
  return match[1].trim()
}

// Le moteur de next/og coupe les lignes après un trait d'union (« SA-CCR ») et compte mal la
// largeur d'un mot qui contient le crénage « L’ » (espace parasite). Chaque mot du titre est donc
// posé séparément, et l'apostrophe ouvre un nouveau fragment pour neutraliser ce crénage.
function splitBeforeApostrophe(word: string): string[] {
  return word.split(/(?=[’'])/)
}

export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [css, displayFont, textFont, logo] = await files
  const color = (name: string) => cssToken(css, name)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: color('text-on-dark'),
          backgroundColor: color('black'),
          backgroundImage: `radial-gradient(circle at 85% 20%, ${color('glow-green')} 0%, transparent 55%), linear-gradient(100deg, ${color('brand-deep')} 0%, ${color('black')} 100%)`,
          fontFamily: 'Roboto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: color('paper'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og n'accepte que <img>, pas next/image. */}
            <img src={`data:image/png;base64,${logo}`} width={80} height={80} alt="" />
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 34 }}>{siteName}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: 'uppercase', color: color('accent') }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: 16,
              fontFamily: 'Space Grotesk',
              fontSize: 62,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title.split(' ').map((word, index) => (
              <div key={index} style={{ display: 'flex' }}>
                {splitBeforeApostrophe(word).map((part, partIndex) => (
                  <span key={partIndex}>{part}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 96, height: 6, backgroundColor: color('accent') }} />
          <div style={{ fontSize: 24, color: color('text-on-dark-muted') }}>{new URL(siteUrl).host}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Space Grotesk', data: displayFont, weight: 500, style: 'normal' },
        { name: 'Roboto', data: textFont, weight: 500, style: 'normal' },
      ],
    },
  )
}

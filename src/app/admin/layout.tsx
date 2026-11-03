import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { adminText } from '@/content/admin'
import styles from '@/components/admin/admin.module.css'

// Toujours rendu à la demande : la session et la configuration se lisent à l'exécution, jamais au build.
export const dynamic = 'force-dynamic'

// Le backoffice n'est jamais indexé (voir aussi l'en-tête X-Robots-Tag dans next.config.ts).
export const metadata: Metadata = {
  title: adminText.title,
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className="container">{children}</div>
    </div>
  )
}

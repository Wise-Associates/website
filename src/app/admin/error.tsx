'use client'

import styles from '@/components/admin/admin.module.css'
import { adminText } from '@/content/admin'

// Affiché si la lecture des publications échoue (GitHub indisponible, configuration absente, fichier invalide).
// Le détail technique est dans les journaux du serveur ; reset() relance le rendu de la page.
export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${styles.panel} ${styles.narrow}`}>
      <p className={styles.alert} role="alert">
        {adminText.errors.storage}
      </p>
      <button type="button" className="btn btn--outline" onClick={reset}>
        {adminText.retry}
      </button>
    </div>
  )
}

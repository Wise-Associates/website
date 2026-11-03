'use client'

import { useActionState } from 'react'
import { deletePublication, type DeleteState } from '@/app/admin/actions'
import { adminText } from '@/content/admin'
import styles from './admin.module.css'

export function DeleteForm({ slug, version }: { slug: string; version: string }) {
  const [state, action, pending] = useActionState<DeleteState, FormData>(deletePublication, undefined)
  return (
    <form action={action} className={`${styles.form} ${styles.danger}`}>
      {state?.error && (
        <p className={styles.alert} role="alert">
          {state.error}
        </p>
      )}
      <input type="hidden" name="originalSlug" value={slug} />
      <input type="hidden" name="version" value={version} />
      <label className={styles.check}>
        <input type="checkbox" name="confirm" value="oui" required />
        {adminText.form.deleteConfirm}
      </label>
      <div className={styles.actions}>
        <button type="submit" className="btn btn--outline" disabled={pending}>
          {adminText.form.delete}
        </button>
      </div>
    </form>
  )
}

'use client'

import { useActionState } from 'react'
import { login, type LoginState } from '@/app/admin/actions'
import { adminText } from '@/content/admin'
import styles from './admin.module.css'

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined)
  const text = adminText.login
  return (
    <form action={action} className={styles.form}>
      {state?.error && (
        <p className={styles.alert} role="alert">
          {state.error}
        </p>
      )}
      <div className={styles.field}>
        <label htmlFor="email">{text.email}</label>
        <input id="email" name="email" type="email" autoComplete="username" defaultValue={state?.email} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">{text.password}</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <div className={styles.actions}>
        <button type="submit" className="btn btn--dark" disabled={pending}>
          {pending ? text.pending : text.submit}
        </button>
      </div>
    </form>
  )
}

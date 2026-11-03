import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/LoginForm'
import styles from '@/components/admin/admin.module.css'
import { adminText } from '@/content/admin'
import { getAdminConfig, getSession } from '@/lib/admin/auth'

export default async function LoginPage() {
  if (await getSession()) redirect('/admin')
  const text = adminText.login
  return (
    <div className={`${styles.panel} ${styles.narrow}`}>
      <h1 className="h2">{text.title}</h1>
      <p className={styles.muted}>{text.lead}</p>
      {getAdminConfig() ? (
        <LoginForm />
      ) : (
        <p className={styles.alert} role="alert">
          {text.notConfigured}
        </p>
      )}
    </div>
  )
}

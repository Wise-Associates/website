import Link from 'next/link'
import { logout } from '@/app/admin/actions'
import { adminText } from '@/content/admin'
import styles from './admin.module.css'

export function AdminBar() {
  const nav = adminText.nav
  return (
    <div className={styles.bar}>
      <span className={styles.barTitle}>{adminText.title}</span>
      <nav aria-label={adminText.title} className={styles.barNav}>
        <Link href="/admin">{nav.list}</Link>
        <Link href="/admin/publications/nouvelle">{nav.create}</Link>
        <Link href="/publications">{nav.site}</Link>
        <form action={logout}>
          <button type="submit" className={styles.linkButton}>
            {nav.logout}
          </button>
        </form>
      </nav>
    </div>
  )
}

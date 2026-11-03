import Link from 'next/link'
import { AdminBar } from '@/components/admin/AdminBar'
import styles from '@/components/admin/admin.module.css'
import { adminText } from '@/content/admin'
import { formatDate } from '@/content/format'
import { requireAdmin } from '@/lib/admin/auth'
import { getPublicationStore } from '@/lib/admin/store'
import { sortByDateDesc } from '@/lib/publications/model'

export default async function AdminHomePage() {
  await requireAdmin()
  const store = getPublicationStore()
  const items = sortByDateDesc((await store.list()).map((item) => item.file))
  const text = adminText.list

  return (
    <>
      <AdminBar />
      <div className={styles.panel}>
        <div className={styles.heading}>
          <h1 className="h2">{text.title}</h1>
          <Link href="/admin/publications/nouvelle" className="btn btn--dark">
            {adminText.nav.create}
          </Link>
        </div>
        <p className={styles.muted}>
          {text.lead} {text.branch(store.branch, store.mode)}
        </p>
        {items.length === 0 ? (
          <p>{text.empty}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{text.columns.title}</th>
                <th scope="col">{text.columns.category}</th>
                <th scope="col">{text.columns.date}</th>
                <th scope="col">{text.columns.status}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.slug}>
                  <td>
                    <Link href={`/admin/publications/${item.slug}`}>{item.title}</Link>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </td>
                  <td>
                    <span className={`tag ${item.status === 'draft' ? styles.draft : ''}`}>
                      {adminText.status[item.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

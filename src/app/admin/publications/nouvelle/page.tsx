import { AdminBar } from '@/components/admin/AdminBar'
import { PublicationForm } from '@/components/admin/PublicationForm'
import styles from '@/components/admin/admin.module.css'
import { adminText } from '@/content/admin'
import { requireAdmin } from '@/lib/admin/auth'
import { getPublicationStore } from '@/lib/admin/store'

export default async function NewPublicationPage() {
  await requireAdmin()
  const items = await getPublicationStore().list()
  const categories = [...new Set(items.map((item) => item.file.category))].sort((a, b) => a.localeCompare(b, 'fr'))
  // Date du jour à Paris, au format attendu par le champ date.
  const today = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date())

  return (
    <>
      <AdminBar />
      <div className={styles.panel}>
        <h1 className="h2">{adminText.form.createTitle}</h1>
        <PublicationForm
          categories={categories}
          initial={{
            title: '',
            slug: '',
            date: today,
            category: '',
            excerpt: '',
            body: '',
            status: 'draft',
            sourceLabel: '',
            sourceUrl: '',
          }}
        />
      </div>
    </>
  )
}

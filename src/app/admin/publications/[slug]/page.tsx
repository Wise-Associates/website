import { notFound } from 'next/navigation'
import { ArticleBody } from '@/components/ArticleBody'
import { AdminBar } from '@/components/admin/AdminBar'
import { DeleteForm } from '@/components/admin/DeleteForm'
import { PublicationForm } from '@/components/admin/PublicationForm'
import styles from '@/components/admin/admin.module.css'
import { adminText } from '@/content/admin'
import { requireAdmin } from '@/lib/admin/auth'
import { getPublicationStore } from '@/lib/admin/store'
import { parseBody } from '@/lib/publications/model'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enregistre?: string }>
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export default async function EditPublicationPage({ params, searchParams }: Props) {
  await requireAdmin()
  const { slug } = await params
  if (!slugPattern.test(slug)) notFound()
  const { enregistre } = await searchParams

  const store = getPublicationStore()
  const [stored, all] = await Promise.all([store.get(slug), store.list()])
  if (!stored) notFound()
  const { file, version } = stored
  const categories = [...new Set(all.map((item) => item.file.category))].sort((a, b) => a.localeCompare(b, 'fr'))

  return (
    <>
      <AdminBar />
      <div className={styles.panel}>
        <h1 className="h2">{adminText.form.editTitle}</h1>
        {enregistre === '1' && (
          <p className={styles.notice} role="status">
            {adminText.form.saved}
          </p>
        )}
        <PublicationForm
          key={version}
          categories={categories}
          existing={{ slug: file.slug, version }}
          initial={{
            title: file.title,
            slug: file.slug,
            date: file.date,
            category: file.category,
            excerpt: file.excerpt,
            body: file.body,
            status: file.status,
            sourceLabel: file.source?.label ?? '',
            sourceUrl: file.source?.url ?? '',
          }}
        />
        <DeleteForm slug={file.slug} version={version} />
      </div>
      <section className={`${styles.panel} ${styles.preview}`} aria-labelledby="apercu">
        <h2 id="apercu" className="h3">
          {adminText.form.preview}
        </h2>
        <div className="article">
          <p className="article__lead">{file.excerpt}</p>
          <ArticleBody blocks={parseBody(file.body)} />
        </div>
      </section>
    </>
  )
}

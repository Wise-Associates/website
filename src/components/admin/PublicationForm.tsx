'use client'

import { useActionState } from 'react'
import { savePublication, type PublicationFormValues, type SaveState } from '@/app/admin/actions'
import { adminText } from '@/content/admin'
import { limits, publicationStatuses } from '@/lib/publications/model'
import styles from './admin.module.css'

type Props = {
  initial: PublicationFormValues
  // Publication existante : slug d'origine et version lue, pour détecter une modification concurrente.
  existing?: { slug: string; version: string }
  categories: string[]
}

export function PublicationForm({ initial, existing, categories }: Props) {
  const [state, action, pending] = useActionState<SaveState, FormData>(savePublication, undefined)
  const values = state?.values ?? initial
  const errors = state?.errors ?? {}
  const text = adminText.form

  // Après une erreur, le formulaire est réaffiché avec la saisie renvoyée par le serveur :
  // la clé force React à réinitialiser les champs non contrôlés avec ces valeurs.
  const formKey = JSON.stringify(values)

  const errorFor = (field: keyof typeof errors) =>
    errors[field] ? (
      <p id={`${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null
  const invalid = (field: keyof typeof errors) =>
    errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': `${field}-error` } : {}

  return (
    <form action={action} className={styles.form} key={formKey} noValidate>
      {errors.form && (
        <p className={styles.alert} role="alert">
          {errors.form}
        </p>
      )}
      <input type="hidden" name="originalSlug" value={existing?.slug ?? ''} />
      <input type="hidden" name="version" value={existing?.version ?? ''} />

      <div className={styles.field}>
        <label htmlFor="title">{text.title}</label>
        <input id="title" name="title" defaultValue={values.title} maxLength={limits.title} required {...invalid('title')} />
        {errorFor('title')}
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="slug">{text.slug}</label>
          <input
            id="slug"
            name="slug"
            defaultValue={existing ? existing.slug : values.slug}
            maxLength={limits.slug}
            readOnly={Boolean(existing)}
            aria-describedby="slug-help"
            {...invalid('slug')}
          />
          <p id="slug-help" className={styles.help}>
            {text.slugHelp}
          </p>
          {errorFor('slug')}
        </div>
        <div className={styles.field}>
          <label htmlFor="date">{text.date}</label>
          <input id="date" name="date" type="date" defaultValue={values.date} required {...invalid('date')} />
          {errorFor('date')}
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="category">{text.category}</label>
          <input
            id="category"
            name="category"
            list="categories"
            defaultValue={values.category}
            maxLength={limits.category}
            required
            {...invalid('category')}
          />
          <datalist id="categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          {errorFor('category')}
        </div>
        <div className={styles.field}>
          <label htmlFor="status">{text.status}</label>
          <select id="status" name="status" defaultValue={values.status} {...invalid('status')}>
            {publicationStatuses.map((status) => (
              <option key={status} value={status}>
                {adminText.status[status]}
              </option>
            ))}
          </select>
          {errorFor('status')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="excerpt">{text.excerpt}</label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={values.excerpt}
          maxLength={limits.excerpt}
          required
          aria-describedby="excerpt-help"
          {...invalid('excerpt')}
        />
        <p id="excerpt-help" className={styles.help}>
          {text.excerptHelp}
        </p>
        {errorFor('excerpt')}
      </div>

      <div className={styles.field}>
        <label htmlFor="body">{text.body}</label>
        <p id="body-help" className={styles.help}>
          {text.bodyHelp}
        </p>
        <textarea
          id="body"
          name="body"
          className={styles.long}
          defaultValue={values.body}
          maxLength={limits.body}
          required
          aria-describedby="body-help"
          {...invalid('body')}
        />
        {errorFor('body')}
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="sourceLabel">{text.sourceLabel}</label>
          <input
            id="sourceLabel"
            name="sourceLabel"
            defaultValue={values.sourceLabel}
            maxLength={limits.sourceLabel}
            aria-describedby="source-help"
            {...invalid('source')}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="sourceUrl">{text.sourceUrl}</label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            defaultValue={values.sourceUrl}
            maxLength={limits.sourceUrl}
            aria-describedby="source-help"
            {...invalid('source')}
          />
        </div>
      </div>
      <p id="source-help" className={styles.help}>
        {text.sourceHelp}
      </p>
      {errorFor('source')}

      <div className={styles.actions}>
        <button type="submit" className="btn btn--dark" disabled={pending}>
          {pending ? text.saving : text.save}
        </button>
      </div>
    </form>
  )
}

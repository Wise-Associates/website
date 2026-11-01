const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' })

// Les dates de publication sont stockées au format AAAA-MM-JJ.
export function formatDate(isoDate: string): string {
  return dateFormat.format(new Date(`${isoDate}T12:00:00Z`))
}

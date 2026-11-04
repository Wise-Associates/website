import type { Publication } from '@/content/publications'
import { company, expertises, sectors, seo } from '@/content/site'
import { absoluteUrl, siteName, siteUrl } from '@/lib/seo'

// Identifiants stables : les autres blocs (site, articles) renvoient vers l'organisation.
const organizationId = `${siteUrl}/#organisation`
const websiteId = `${siteUrl}/#site`

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: siteName,
    description: seo.home.description,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/wise-logo.png'),
    image: absoluteUrl('/opengraph-image'),
    email: company.email,
    telephone: company.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.locality,
      addressCountry: company.address.countryCode,
    },
    areaServed: ['France', 'Middle East', 'Africa'],
    knowsAbout: [
      ...expertises.map((expertise) => expertise.title),
      ...sectors.map((sector) => sector.title),
      ...company.practices,
    ],
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteName,
    url: absoluteUrl('/'),
    inLanguage: 'fr-FR',
    publisher: { '@id': organizationId },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleLd(publication: Publication) {
  const path = `/publications/${publication.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: publication.title,
    description: publication.excerpt,
    datePublished: publication.date,
    dateModified: publication.date,
    articleSection: publication.category,
    inLanguage: 'fr-FR',
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(`${path}/opengraph-image`),
    author: { '@id': organizationId, '@type': 'Organization', name: siteName, url: absoluteUrl('/') },
    publisher: { '@id': organizationId },
    isPartOf: { '@id': websiteId },
    ...(publication.source
      ? { isBasedOn: { '@type': 'CreativeWork', name: publication.source.label, url: publication.source.url } }
      : {}),
  }
}

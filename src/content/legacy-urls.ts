// Adresses indexées par l'ancien site WordPress (sitemap Yoast relevé le 1er novembre 2026),
// redirigées en 301 pour conserver les liens entrants et le référencement acquis.
// Les articles migrés sont dans publications.ts (legacyPath) ; les pages principales dans next.config.ts.

// Anciennes offres d'emploi, publiées comme articles WordPress à la racine du site.
export const legacyJobPaths = [
  '/it-equity-smarteq-developpeur-fullstack-c',
  '/maitrise-douvrage-fsi',
  '/risque-operationnel-ssi',
  '/charge-de-pilotage-si-pmo',
  '/ba-reprise-referentiel-tpe-et-offres',
  '/business-analyst-senior-chef-de-projet-salesf',
  '/consultant-metier-business-analyst-alimenta',
  '/directeur-de-projet-consultant-open-finance',
  '/data-analyst-chef-de-projet-bi',
  '/consultant-ba-risque-de-marche',
  '/consultant-commercial-grand-compte',
  '/consulatant-risk-it',
  '/consultant-ba-risque-de-marche-exemplai',
  '/consultant-risque-de-credit-exemplaire',
  '/developpeur-full-stack-java-senior',
  '/moa-risque-operationnel',
  '/coach-agile',
  '/business-analysis-risque-operationnels',
  '/consultant-risque-de-credit',
  '/consultant-support-fonctionnel-maitrise-douvrage-loaniq',
  '/consultant-compliancer-officer',
  '/consultant-developpeur-web-service-front-end-et-back-end',
  '/consultant-architecte-fonctionnel',
  '/consultant-charge-de-securite-financier',
  '/consultant-data-ingenieur',
  '/consultant-integrateur-dev',
  '/consultant-developpeur-java-copy',
  '/consultant-business-analyst-risque-de-contrepartie-produits-repo',
  '/consultant-business-analyst-risque-de-credit',
  '/consultant-gestionnaires-de-processus-seniors-crm-1-gestion-des-contrats-3-facturation-1',
  '/consultant-alm-2',
  '/consultant-alm',
  '/consultants-alm-copy',
  '/consultants-risque-de-credit-copy',
  '/consultants-business-analyste-alm-confirme',
  '/consultants-risque-de-credit',
  '/consultant-chef-de-projet-senior',
  '/consultant-expert-en-innovation-data-science-intelligence-artificielle',
  '/consultant-expert-en-innovation-data-science-intelligence-artificielle-copy',
  '/consultant-expert-en-innovation-data-science-intelligence-artificielle-copy-copy',
  '/consultant-expert-en-innovation-data-science-ia-exemplaire-exemplaire',
  '/blog-offre-demploie',
  '/category/offre-emploi',
]

// Autres pages et archives WordPress qui ont un équivalent sur le nouveau site.
// Les pages techniques de l'ancien site (paiement, factures, auteur) n'ont pas d'équivalent :
// elles répondent 404 et sortent de l'index.
export const legacyRedirects = [
  { source: '/postuler', destination: '/recrutement#candidature' },
  { source: '/category/publications', destination: '/publications' },
  { source: '/feed', destination: '/publications' },
]

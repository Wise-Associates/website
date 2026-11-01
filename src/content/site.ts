// Contenu éditorial du site. Les textes reprennent ceux de l'ancien site wise-associates.fr ;
// pour modifier une page, modifiez ce fichier plutôt que les composants.

export const company = {
  name: 'Wise Associates',
  tagline: 'Cabinet de conseil en management',
  email: 'contact@wise-associates.fr',
  phone: '01 84 20 79 58',
  phoneHref: '+33184207958',
  address: {
    street: '66 avenue des Champs-Élysées',
    postalCode: '75008',
    locality: 'Paris',
    country: 'France',
    countryCode: 'FR',
  },
  // Lien simple vers la carte : pas d'iframe Google Maps, pour éviter les cookies tiers.
  mapUrl: 'https://www.openstreetmap.org/search?query=66%20avenue%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris',
  hours: 'Du lundi au dimanche, de 7h00 à 19h00',
  practices: [
    'Retail Banking',
    'Insurance',
    'Private Banking',
    'Capital Markets',
    'Transaction Banking',
    'Securities Services',
    'Asset Management',
  ],
} as const

export type Domain = { title: string; text: string }

export type Expertise = {
  slug: string
  title: string
  short: string
  intro: string
  issues: string[]
  domains: Domain[]
}

export const expertises: Expertise[] = [
  {
    slug: 'risks-finance',
    title: 'Risks & Finance',
    short: 'Rentabilité, excellence opérationnelle et réglementations transverses pour les directions Finance, Risques et ALM.',
    intro:
      "Les enjeux des départements Finance, Risques et ALM sont étroitement liés. Ils tiennent au développement de données massives, hétérogènes et évolutives, à la disponibilité et à la maturité des technologies de traitement de ces données, et à un cadre réglementaire de plus en plus complexe.",
    issues: [
      "Collaborer avec les métiers, suivre la rentabilité de l'activité et s'appuyer sur des outils d'analyse prédictive innovants.",
      "Définir une feuille de route pour atteindre l'excellence opérationnelle.",
      "Intégrer l'innovation et l'adapter aux exigences métiers : RPA, DataViz, Data Intelligence, analyse prédictive.",
      'Accompagner la mise en œuvre des réglementations transverses (BCBS 239, IFRS 9, FRTB, IRRBB) et des initiatives comme la revue des modèles internes (TRIM).',
      'Prévenir le risque opérationnel par l’analyse croisée des données internes et externes.',
    ],
    domains: [
      {
        title: 'Business',
        text: 'Améliorer la collecte et le pilotage de la rentabilité, anticiper les risques grâce à des processus d’alerte précoce.',
      },
      {
        title: 'Processus',
        text: 'Stratégies d’offshoring et de nearshoring, data management (gouvernance, dictionnaires, architectures) et revue des processus.',
      },
      {
        title: 'Réglementaire',
        text: 'Programmes de conformité aux nouveaux reportings (IFRS 9, AnaCredit, NPL, liquidité), modèle opérationnel cible « data-centric » pour FRTB, outils de data management pour BCBS 239.',
      },
      {
        title: 'Digital',
        text: 'Processus financiers éligibles à la RPA, POC et MVP, tableaux de bord automatisés, outils de reporting et de scoring (pilotage G-SIB pour les CIB), analyse prédictive, advanced analytics et data visualisation.',
      },
    ],
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    short: 'Protéger l’établissement contre les risques de non-conformité tout en préservant les enjeux commerciaux.',
    intro:
      "La conformité occupe une place centrale dans le secteur bancaire et financier, et ce rôle s'est renforcé ces dernières années. Elle veille à l'application des nouvelles réglementations dans un cadre de gouvernance rigoureux. L'innovation offre aussi la possibilité de déléguer certaines fonctions et d'adopter une approche plus intelligente.",
    issues: [
      "Protéger l'établissement bancaire contre les risques de non-conformité.",
      'Gérer et former les équipes sur l’ensemble des sujets de conformité : protection de la clientèle, éthique professionnelle, connaissance client, délits d’initiés, prévention de la fraude.',
      'Savoir communiquer avec les autorités de régulation sans perdre de vue les enjeux commerciaux.',
      'Mettre en place de nouveaux processus et modes opératoires en tenant compte de l’internationalisation, de l’innovation et de la mutualisation.',
      'Identifier les opportunités digitales pour bâtir un modèle de travail plus efficace.',
    ],
    domains: [
      {
        title: 'Business',
        text: 'Nouveaux modèles opératoires pour limiter les coûts liés aux exigences réglementaires, accompagnement du changement et gestion de projet.',
      },
      { title: 'Processus', text: 'Mise en place d’une veille réglementaire, réalisation de benchmarks.' },
      {
        title: 'Réglementaire',
        text: 'Plans de remédiation, analyses d’impacts et projets de mise en conformité : MIFID 2, DDA, PRIIPS, RGPD, DSP2, LCB-FT, FATCA, CRS, BMR.',
      },
      {
        title: 'Digital',
        text: 'Solutions d’intelligence artificielle avec des RegTech (réduction des faux positifs, recherche de negative news en LCB-FT), gestion automatisée des dossiers KYC, automatisation intelligente des processus de conformité à l’échelle du Groupe.',
      },
    ],
  },
  {
    slug: 'data-management',
    title: 'Data Management',
    short: 'Faire des données un véritable outil d’aide à la décision, sécurisé et conforme au RGPD.',
    intro:
      "La quantité de données a fortement augmenté ces dernières années. Exploitées avec pertinence, ces données hétérogènes deviennent un outil clé d'aide à la prise de décision. Il faut donc innover en continu pour suivre un flux de données ininterrompu et mieux gérer les informations collectées.",
    issues: [
      'Collaborer avec la direction : optimiser le traitement de l’information pour améliorer les décisions.',
      'Produits innovants : mieux gérer le flux continu de données pour garder une longueur d’avance.',
      'Statut des données : l’évolution des normes IFRS/IAS impose d’évaluer les données comme des actifs immatériels.',
      'Sécurité : garantir la protection des données grâce à une gouvernance adaptée et conforme au RGPD.',
    ],
    domains: [
      {
        title: 'Business',
        text: 'Nouveaux modèles opérationnels pour réduire les coûts liés aux enjeux réglementaires, accompagnement du changement et gestion de projet.',
      },
      { title: 'Processus', text: 'Mise en place d’une veille réglementaire et réalisation de benchmarks.' },
      {
        title: 'Réglementaire',
        text: 'Plans de remédiation, analyses d’impacts et projets de mise en conformité : MIFID 2, DDA, PRIIPS, RGPD, DSP2, LCB-FT, FATCA, CRS, BMR.',
      },
      {
        title: 'Digital',
        text: 'Intelligence artificielle avec des RegTech, gestion automatisée des dossiers KYC et automatisation intelligente des processus de conformité.',
      },
    ],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    short: 'Rester à jour technologiquement, en interne comme en externe, avec une culture digitale à dimension humaine.',
    intro:
      "L'évolution constante du numérique pousse chaque entreprise à rester à jour sur le plan technologique. En interne, il s'agit d'améliorer la communication, notamment lorsque télétravail et travail sur site se combinent. En externe, l'enjeu est d'anticiper les besoins des clients, de faciliter la collecte de données et d'améliorer le marketing.",
    issues: [
      'Organiser la hiérarchie interne pour répartir les compétences, avec un accent mis sur la collaboration.',
      'Améliorer les conditions de travail en supprimant les barrières physiques grâce à la digitalisation des activités et services.',
      'Intégrer le Big Data pour exploiter et interpréter les données.',
      'Mettre en place une culture digitale, portée par une dimension humaine, pour favoriser l’innovation.',
    ],
    domains: [
      {
        title: 'Business',
        text: 'Nouveaux modèles opératoires, accompagnement du changement et gestion de projet.',
      },
      { title: 'Processus', text: 'Mise en place d’une veille réglementaire et réalisation de benchmarks.' },
      {
        title: 'Réglementaire',
        text: 'Plans de remédiation, analyses d’impacts et projets de mise en conformité : MIFID 2, DDA, PRIIPS, RGPD, DSP2, LCB-FT, FATCA, CRS, BMR.',
      },
      {
        title: 'Digital',
        text: 'Intelligence artificielle avec des RegTech, automatisation de la gestion des dossiers KYC et des processus de conformité à l’échelle du Groupe.',
      },
    ],
  },
]

export const services = [
  {
    title: 'Risque & Réglementaire',
    text: 'Déploiement des nouvelles réglementations et gestion de leurs impacts, optimisation de la fonction risque, interprétation des exigences, revue des processus et conduite du changement.',
  },
  {
    title: 'Efficacité opérationnelle',
    text: 'Évolution des modèles opératoires, amélioration du coefficient d’exploitation et refonte de la distribution.',
  },
  {
    title: 'Stratégie & Transaction',
    text: 'Rapprochements et intégrations, diagnostics stratégiques, études de marché, identification de cibles, optimisation financière et due diligence.',
  },
] as const

// Intitulés repris de l'ancienne page « Offres d'emploi », sans les doublons ni les entrées de test.
export const jobOffers = [
  'Consultant expert en innovation, Data Science & IA',
  'Consultant chef de projet senior',
  'Consultant Business Analyst ALM confirmé',
  'Consultant risque de crédit',
  'Consultant ALM',
  'Consultant gestionnaire de processus senior : CRM, gestion des contrats, facturation',
  'Consultant Business Analyst risque de contrepartie, produits REPO',
  'Consultant Business Analyst risque de crédit',
]

export const navigation = [
  { href: '/expertises', label: 'Nos expertises' },
  { href: '/publications', label: 'Nos publications' },
  { href: '/recrutement', label: 'Nous rejoindre' },
  { href: '/a-propos', label: 'À propos' },
] as const

// Textes de la page d'accueil.
export const home = {
  hero: {
    title: 'L’expertise métier au service de la finance',
    text: 'Wise Associates combine la connaissance des métiers bancaires, la maîtrise détaillée de la réglementation et l’innovation technologique pour accompagner vos transformations.',
    cta: 'Parlons de vos enjeux',
  },
  intro: {
    title: 'Wise Associates, l’alternative aux grandes maisons',
    paragraphs: [
      'Cabinet de conseil en management basé à Paris, Wise Associates accompagne les banques et les institutions financières dans leurs projets de transformation, sur l’ensemble des domaines de la finance.',
      'La gestion des risques et la mise en œuvre des exigences réglementaires sont notre cœur de métier historique. Nous y apportons une expertise pointue en ingénierie financière et intervenons sur des missions à forte valeur ajoutée, en France comme dans la région Middle East Africa.',
    ],
    cta: 'Wise Associates en bref',
  },
  services: [
    {
      key: 'risk',
      label: 'Risque & Réglementaire',
      title: 'Transformer la contrainte réglementaire en avantage',
      paragraphs: [
        'Déployer une nouvelle réglementation, en mesurer les impacts et optimiser la fonction risque : nous interprétons les exigences, revoyons vos processus et conduisons le changement.',
        'Bâle III et CRR2, IFRS 9, FRTB, BCBS 239, LCB-FT : nos consultants connaissent les textes autant que les systèmes qui les mettent en œuvre.',
      ],
      href: '/expertises/risks-finance',
    },
    {
      key: 'efficiency',
      label: 'Efficacité opérationnelle',
      title: 'Des organisations plus simples et plus performantes',
      paragraphs: [
        'Évolution des modèles opératoires, amélioration du coefficient d’exploitation, refonte de la distribution : nous aidons vos équipes à gagner en efficacité sans perdre en maîtrise des risques.',
        'Data management, automatisation et outils de pilotage viennent soutenir chaque transformation.',
      ],
      href: '/expertises/data-management',
    },
    {
      key: 'strategy',
      label: 'Stratégie & Transaction',
      title: 'Éclairer les grandes décisions',
      paragraphs: [
        'Rapprochements et intégrations, diagnostics stratégiques, études de marché, identification de cibles, optimisation financière et due diligence.',
        'Nous accompagnons les directions générales et financières à chaque étape de leurs opérations structurantes.',
      ],
      href: '/expertises',
    },
  ],
  news: {
    title: 'Nos dernières publications',
    text: 'Décryptages réglementaires, analyses et notes de lecture : nos consultants partagent leur regard sur les évolutions du secteur financier.',
    digestTitle: 'Votre veille réglementaire',
    digestText: 'CRR2, NSFR, finance durable, intelligence artificielle : retrouvez nos analyses pour anticiper les évolutions qui touchent votre établissement.',
    cta: 'Toutes nos publications',
  },
  careers: {
    title: 'Envie de rejoindre une équipe d’experts ?',
    text: 'Nous recrutons des profils issus de grandes universités, d’écoles de commerce et d’ingénieurs, dans un environnement qui encourage le partage des compétences et le travail en équipe.',
    cta: 'Rejoignez notre équipe',
    secondary: 'Candidature spontanée',
    orbit: ['Risque de crédit', 'ALM', 'Data Science & IA', 'Conformité', 'Chef de projet', 'Business Analyst'],
  },
  practices: {
    title: 'Exclusivement les services financiers.',
    text: 'Des pratiques dédiées à chaque métier, pour parler le langage de vos équipes dès le premier jour.',
  },
  footer: {
    title: 'L’expertise au service de vos décisions',
    text: 'Allier connaissance des métiers, maîtrise de la réglementation et innovation pour sécuriser vos transformations.',
    cta: 'Nous trouver',
  },
} as const

// Titres et descriptions pour les moteurs de recherche et les aperçus de partage.
// Repères : titre de 60 caractères au plus (le suffixe « | Wise Associates » est ajouté
// automatiquement sauf sur l'accueil), description entre 120 et 160 caractères.
export const seo = {
  home: {
    title: 'Wise Associates, conseil en services financiers à Paris',
    description:
      'Cabinet de conseil en management à Paris pour les banques et les assureurs : risques, réglementation, conformité, data management et transformation digitale.',
  },
  expertises: {
    title: 'Nos expertises en conseil financier',
    description:
      'Risks & Finance, Compliance, Data Management et Digital Transformation : comment Wise Associates accompagne les banques et les institutions financières.',
  },
  expertiseSuffix: 'pour la banque et l’assurance',
  publications: {
    title: 'Publications et analyses réglementaires',
    description:
      'CRR2, NSFR, finance durable, innovation : les décryptages réglementaires et analyses des consultants Wise Associates pour le secteur financier.',
  },
  recrutement: {
    title: 'Recrutement : consultants en finance à Paris',
    description:
      'Risque de crédit, ALM, Data Science, Business Analyst : consultez nos offres d’emploi à Paris ou envoyez votre candidature spontanée à Wise Associates.',
  },
  aPropos: {
    title: 'À propos du cabinet',
    description:
      'Wise Associates, cabinet de conseil en management basé à Paris, accompagne les banques et institutions financières en France et en Middle East Africa.',
  },
  contact: {
    title: 'Contacter le cabinet',
    description:
      'Contactez Wise Associates au 01 84 20 79 58 ou par e-mail. Nos bureaux vous accueillent au 66 avenue des Champs-Élysées, 75008 Paris.',
  },
  mentionsLegales: {
    title: 'Mentions légales et confidentialité',
    description:
      'Éditeur, hébergeur et politique de données personnelles du site wise-associates.fr : ni formulaire, ni mesure d’audience, ni cookie publicitaire.',
  },
  // Images de partage (Open Graph) générées au build : bandeau au-dessus du titre et texte alternatif.
  og: {
    homeEyebrow: 'Cabinet de conseil en management',
    homeAlt: 'Wise Associates, cabinet de conseil en management dédié aux services financiers',
    expertiseEyebrow: 'Expertise',
    expertiseAlt: 'Une expertise de Wise Associates',
    articleAlt: 'Une publication de Wise Associates',
  },
} as const

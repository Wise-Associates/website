// Publications du cabinet. Les textes ont été réécrits à partir des articles de l'ancien site
// (septembre 2021) : les faits et références réglementaires sont conservés, la rédaction est nouvelle.
// Les deux notes consacrées aux Cahiers Louis Bachelier résument et créditent la publication de l'Institut
// Louis Bachelier, sans reprendre ses éditoriaux.

export type ArticleBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }

export type Publication = {
  slug: string
  // Adresse de l'article sur l'ancien site WordPress, redirigée vers la nouvelle page.
  legacyPath: string
  title: string
  date: string
  category: string
  excerpt: string
  readingMinutes: number
  body: ArticleBlock[]
  source?: { label: string; url: string }
}

export const publications: Publication[] = [
  {
    slug: 'crr2-risque-de-contrepartie-sa-ccr',
    legacyPath: '/crr2-focus-risque-de-contrepartie-sa-ssr',
    title: 'CRR2\u00a0: focus sur le risque de contrepartie et la méthode SA-CCR',
    date: '2021-09-26',
    category: 'Réglementaire',
    excerpt:
      'Avec CRR2, la méthode SA-CCR devient la référence pour mesurer l’exposition au risque de contrepartie. Ce qui change par rapport aux méthodes CEM et SM, et les conséquences sur le reporting.',
    readingMinutes: 6,
    body: [
      { kind: 'heading', text: 'Le « paquet bancaire » européen' },
      {
        kind: 'paragraph',
        text: 'Initié par la Commission européenne en novembre 2016, le paquet bancaire a été adopté par le Parlement européen le 16 avril 2019 puis par le Conseil le 14 mai 2019, avant d’entrer en vigueur à l’été 2019. Il réunit quatre textes :',
      },
      {
        kind: 'list',
        items: [
          'CRR II, le règlement sur les exigences de fonds propres ;',
          'CRD V, la directive sur les exigences de fonds propres ;',
          'BRRD II, la directive sur le redressement et la résolution des banques ;',
          'SRMR, le règlement sur le mécanisme de résolution unique.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'CRR II et CRD V prolongent la réforme engagée après la crise de 2007-2008. Le régulateur européen devait rester fidèle aux recommandations de Bâle III tout en tenant compte des spécificités du marché européen, pour ne pas freiner le financement de l’économie.',
      },
      { kind: 'heading', text: 'Pourquoi le SA-CCR remplace CEM et SM' },
      {
        kind: 'paragraph',
        text: 'Le Comité de Bâle a finalisé en mars 2014 la nouvelle approche standard de calcul de l’exposition en cas de défaut (EAD) au titre du risque de contrepartie, le SA-CCR. CRR II la reprend pour remplacer la Current Exposure Method (CEM) et la Standardised Method (SM). La crise avait mis en évidence leurs limites : prise en compte insuffisante du collatéral et calibrages peu représentatifs de la volatilité en période de tension.',
      },
      {
        kind: 'paragraph',
        text: 'Plus sensible au risque réel, le SA-CCR se rapproche d’un modèle interne et tient compte de la nature de l’activité dérivés de chaque établissement.',
      },
      { kind: 'heading', text: 'Le calcul de l’EAD' },
      {
        kind: 'paragraph',
        text: 'Dans les deux approches, l’EAD combine un coût de remplacement (Replacement Cost, l’exposition courante) et une exposition future potentielle (Potential Future Exposure, la hausse possible de l’exposition à un an). Les différences portent sur chacun de ces termes :',
      },
      {
        kind: 'list',
        items: [
          'EAD : simple somme RC + PFE en CEM ; en SA-CCR, cette somme est multipliée par un facteur α de 1,4, hérité de l’approche par modèles internes.',
          'Coût de remplacement : en SA-CCR, il est calculé différemment selon que les transactions font l’objet d’appels de marge ou non, en intégrant le collatéral net, le seuil (TH) et le montant minimal de transfert (MTA).',
          'Exposition future : le produit d’un notionnel par un facteur superviseur en CEM laisse place, en SA-CCR, à un add-on calculé par classe d’actifs et modulé par un multiplicateur qui reconnaît l’excès de collatéral.',
        ],
      },
      { kind: 'heading', text: 'Les principales évolutions' },
      {
        kind: 'list',
        items: [
          'Distinction entre transactions avec et sans appel de marge.',
          'Granularité plus fine des ensembles de compensation (netting sets) et de couverture (hedging sets).',
          'Reconnaissance de l’excès de collatéral.',
          'Calibrage fondé sur la volatilité observée lors des dernières périodes de stress.',
        ],
      },
      { kind: 'heading', text: 'Proportionnalité' },
      {
        kind: 'paragraph',
        text: 'Le SA-CCR devient la méthode de référence, avec une version simplifiée prévue au titre du principe de proportionnalité. Les établissements dont l’activité dérivés reste limitée peuvent recourir à la méthode de l’exposition initiale révisée (OEM).',
      },
      { kind: 'heading', text: 'Conséquences sur le reporting' },
      {
        kind: 'paragraph',
        text: 'CRR2 renforce la transparence des reportings réglementaires. L’EBA a mis à jour la cartographie des données de surveillance et précisé la fréquence de remise de chaque état selon le type d’établissement. Les ITS 3.0 traduisent ces évolutions dans COREP et FINREP ; le suivi du risque de contrepartie s’appuie désormais sur onze nouveaux états COREP (C 34) consacrés aux expositions sur dérivés.',
      },
    ],
  },
  {
    slug: 'risque-de-liquidite-nsfr-2021',
    legacyPath: '/risque-de-liquidite-nsfr-2021',
    title: 'Risque de liquidité\u00a0: le NSFR en 2021',
    date: '2021-09-26',
    category: 'Liquidité',
    excerpt:
      'Contraignant depuis juin 2021, le NSFR impose un financement stable à un an. Comment la CRR2 a assoupli la version bâloise, ce que change le NSFR simplifié et ce qu’apportent les nouveaux ITS.',
    readingMinutes: 7,
    body: [
      {
        kind: 'paragraph',
        text: 'Le ratio de financement stable net (NSFR) est devenu contraignant en juin 2021. Dernière brique du dispositif de liquidité construit après 2008, il complète le LCR et les métriques de surveillance additionnelles (ALMM) en ajoutant un horizon d’un an : les banques doivent disposer de ressources stables cohérentes avec la structure de leurs emplois.',
      },
      {
        kind: 'paragraph',
        text: 'Jusqu’ici, le NSFR bâlois était calculé dans les exercices QIS semestriels et STE trimestriels, tandis que les ITS 60 et 61, purement descriptifs, présentaient les encours par tranche de maturité sans pondération ni ratio. De nouveaux ITS sont appelés à les remplacer.',
      },
      { kind: 'heading', text: 'Un NSFR bâlois jugé trop contraignant' },
      {
        kind: 'list',
        items: [
          'Incohérences avec le LCR : les titres HQLA de niveau 1 sans décote dans le LCR en subissaient une de 5 % dans le NSFR bâlois, et les spécificités du trade finance n’étaient pas reprises.',
          'Asymétries pénalisantes sur les prêts et emprunts financiers à court terme, qui touchaient surtout la trésorerie et la banque de financement et d’investissement, notamment les matchbooks repos.',
          'Surcharge sur les dérivés : un besoin de financement de 20 % sur la juste valeur brute des dérivés passifs, sans prise en compte du collatéral.',
        ],
      },
      { kind: 'heading', text: '… mais assoupli dans la CRR2' },
      {
        kind: 'list',
        items: [
          'Décote nulle sur la dette souveraine détenue, alignée sur le LCR.',
          'Facteurs RSF réduits sur le trade finance de moins de six mois, avec des facteurs spécifiques sur les garanties associées.',
          'Asymétries fortement réduites sur les money markets et les repos, à titre transitoire, avec un réexamen prévu en juin 2023.',
          'Besoin additionnel sur les dérivés passifs ramené au minimum bâlois de 5 %.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'L’Union a en revanche repris le traitement bâlois des actifs et passifs interdépendants. Les banques françaises qui centralisent les livrets réglementés auprès de la Caisse des dépôts en supportent un impact net d’environ 10 % du montant centralisé, inégal selon leur niveau de collecte.',
      },
      { kind: 'heading', text: 'Un NSFR simplifié pour les petits établissements' },
      {
        kind: 'paragraph',
        text: 'Les établissements de petite taille et non complexes peuvent demander à appliquer un NSFR simplifié : deux tranches de maturité seulement (moins d’un an, un an et plus), moins de lignes de reporting et des facteurs RSF moins différenciés. Plus simple, cette version se révèle souvent plus pénalisante, notamment pour les titres HQLA hors niveau 1, le trade finance, les opérations de marché monétaire et certains prêts immobiliers.',
      },
      { kind: 'heading', text: 'De nouveaux ITS' },
      {
        kind: 'paragraph',
        text: 'Dans le cadre de la version 3.0 du DPM, l’EBA a publié un outil de calcul couvrant l’ensemble des dispositions européennes : onglets 80 et 81 pour le NSFR standard (RSF et ASF), 82 et 83 pour le NSFR simplifié, 84 pour la synthèse et le ratio final.',
      },
      { kind: 'heading', text: 'Notre accompagnement' },
      {
        kind: 'list',
        items: [
          'Production du NSFR dans ses différents formats (QIS, ITS, outils de pilotage interne).',
          'Mise en œuvre des évolutions du NSFR européen : collecte des données, calcul et reporting.',
          'Coordination entre liquidité réglementaire, ALM, métiers, comptabilité et COREP.',
        ],
      },
    ],
  },
  {
    slug: 'recherche-economique-changement-climatique',
    legacyPath: '/la-mobilisation-de-la-recherche-economique-contre-le-changement-climatique',
    title: 'La recherche économique mobilisée contre le changement climatique',
    date: '2021-09-26',
    category: 'Finance durable',
    excerpt:
      'Notre sélection : un numéro des Cahiers Louis Bachelier qui réunit des recommandations de la recherche pour réussir la transition bas-carbone et développer une finance durable.',
    readingMinutes: 3,
    body: [
      {
        kind: 'paragraph',
        text: 'Après une COP 25 sans avancée notable et une décennie 2010-2019 la plus chaude jamais mesurée, l’objectif de limiter le réchauffement sous 2 °C reste menacé. L’Institut Louis Bachelier (ILB) défend l’idée qu’une recherche d’excellence est indispensable pour changer de trajectoire.',
      },
      { kind: 'heading', text: 'Les travaux de l’Institut Louis Bachelier' },
      {
        kind: 'paragraph',
        text: 'L’ILB anime depuis 2018 le programme interdisciplinaire Green and Sustainable Finance et héberge plusieurs chaires consacrées à ces sujets : Économie du Climat, Finance Durable et Investissement Responsable, Finance et Développement Durable, Énergie & Prospérité.',
      },
      { kind: 'heading', text: 'Au sommaire de ce numéro' },
      {
        kind: 'list',
        items: [
          'Christian de Perthuis, autour de son ouvrage Le tic-tac de l’horloge climatique.',
          'Christian Gollier, sur la tarification du carbone.',
          'Stéphane Voisin et Jean-Baptiste Bellon, sur les pistes de Detox Finance pour une finance plus durable.',
          'Peter Tankov, sur le manque de données fiables pour évaluer les risques climatiques physiques.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Pourquoi cette lecture nous intéresse : l’évaluation des risques climatiques et la qualité des données sont désormais au cœur des attentes des superviseurs envers les banques et les assureurs.',
      },
    ],
    source: { label: 'Les Cahiers Louis Bachelier', url: 'https://www.institutlouisbachelier.org/' },
  },
  {
    slug: 'enjeux-nouvelles-technologies-finance',
    legacyPath: '/les-enjeux-des-nouvelles-technologies-en-finance',
    title: 'Les enjeux des nouvelles technologies en finance',
    date: '2021-09-25',
    category: 'Innovation',
    excerpt:
      'Notre sélection : les Cahiers Louis Bachelier consacrés à l’intelligence artificielle en finance, de la gestion des risques aux robots-conseillers et aux biais des algorithmes.',
    readingMinutes: 3,
    body: [
      {
        kind: 'paragraph',
        text: 'Portée par les progrès de l’apprentissage profond et par des données plus exploitables, l’intelligence artificielle se diffuse rapidement dans la finance, chez les grands groupes comme chez les fintechs. L’enjeu est une intelligence augmentée, au service des équipes.',
      },
      { kind: 'heading', text: 'Un sujet suivi de longue date par l’ILB' },
      {
        kind: 'paragraph',
        text: 'L’Institut Louis Bachelier travaille sur ces questions depuis 2014 : conférences Meet the Data avec l’Université de Berkeley, création de l’ILB DataLab en 2015, puis lancement du programme Finance and Insurance Reloaded (FaIR) et de la Chaire Finance Digitale.',
      },
      { kind: 'heading', text: 'Au sommaire de ce numéro' },
      {
        kind: 'list',
        items: [
          'Charles-Albert Lehalle, directeur scientifique du programme FaIR.',
          'Driss Lamrani, sur l’apport de l’IA à la gestion des risques financiers.',
          'Marie Brière, sur l’essor des robots-conseillers pour les particuliers.',
          'David Bounie et Winston Maxwell, sur les biais et la transparence des algorithmes.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Pourquoi cette lecture nous intéresse : la transparence et l’explicabilité des modèles sont des conditions de leur acceptation par les métiers comme par les régulateurs, un point central dans nos missions Data et Digital.',
      },
    ],
    source: { label: 'Les Cahiers Louis Bachelier', url: 'https://www.institutlouisbachelier.org/' },
  },
]

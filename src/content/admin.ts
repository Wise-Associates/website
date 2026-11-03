// Textes du backoffice (/admin). Séparés de site.ts parce qu'ils ne s'affichent jamais sur le site public.

export const adminText = {
  title: 'Backoffice',
  retry: 'Réessayer',
  login: {
    title: 'Connexion au backoffice',
    lead: 'Espace réservé à l’équipe Wise Associates pour gérer les publications du site.',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    submit: 'Se connecter',
    pending: 'Connexion…',
    invalid: 'Adresse e-mail ou mot de passe incorrect.',
    throttled: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
    notConfigured:
      'Le backoffice n’est pas configuré sur cet environnement : renseignez ADMIN_EMAIL, ADMIN_PASSWORD_HASH et ADMIN_SESSION_SECRET (voir README).',
  },
  nav: {
    list: 'Publications',
    create: 'Nouvelle publication',
    site: 'Voir le site',
    logout: 'Se déconnecter',
  },
  list: {
    title: 'Publications',
    lead: 'Chaque enregistrement crée un commit dans le dépôt. Le site est reconstruit automatiquement en une à deux minutes.',
    empty: 'Aucune publication pour le moment.',
    columns: { title: 'Titre', category: 'Rubrique', date: 'Date', status: 'Statut' },
    edit: 'Modifier',
    branch: (branch: string, mode: 'github' | 'local') =>
      mode === 'github'
        ? `Les modifications sont enregistrées sur la branche « ${branch} ».`
        : 'Mode local : les modifications sont écrites dans le dossier content/publications de votre poste.',
  },
  status: { draft: 'Brouillon', published: 'Publié' },
  form: {
    createTitle: 'Nouvelle publication',
    editTitle: 'Modifier la publication',
    title: 'Titre',
    slug: 'Adresse (slug)',
    slugHelp: 'Lettres minuscules, chiffres et tirets. Laissez vide pour la déduire du titre. Non modifiable ensuite.',
    date: 'Date de publication',
    category: 'Rubrique',
    excerpt: 'Chapeau',
    excerptHelp: 'Deux ou trois phrases, affichées sur les cartes et en tête d’article.',
    body: 'Texte',
    bodyHelp:
      'Une ligne vide sépare deux paragraphes. « ## » en début de ligne crée un intertitre, « - » un élément de liste.',
    sourceLabel: 'Source (nom)',
    sourceUrl: 'Source (adresse https)',
    sourceHelp: 'Facultatif : à renseigner quand l’article résume une publication externe.',
    status: 'Statut',
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    saved: 'Publication enregistrée. Le site sera à jour après la reconstruction.',
    delete: 'Supprimer la publication',
    deleteConfirm: 'Je confirme la suppression définitive',
    preview: 'Aperçu du texte',
    errorSummary: 'Corrigez les champs signalés.',
  },
  errors: {
    title: 'Indiquez un titre (200 caractères au plus).',
    slug: 'Utilisez uniquement des lettres minuscules, des chiffres et des tirets (80 caractères au plus).',
    slugTaken: 'Une publication utilise déjà cette adresse.',
    date: 'Indiquez une date valide.',
    category: 'Indiquez une rubrique (40 caractères au plus).',
    excerpt: 'Indiquez un chapeau (400 caractères au plus).',
    body: 'Le texte est vide ou dépasse 50 000 caractères.',
    status: 'Choisissez un statut.',
    source: 'Renseignez le nom et une adresse https complète, ou laissez les deux champs vides.',
    conflict:
      'Cette publication a été modifiée entre-temps (autre onglet ou autre personne). Rechargez la page pour repartir de la dernière version.',
    notFound: 'Cette publication n’existe plus.',
    storage: 'L’enregistrement a échoué. Réessayez dans un instant ; si le problème persiste, vérifiez la configuration GitHub.',
    deleteConfirm: 'Cochez la case de confirmation pour supprimer.',
  },
} as const

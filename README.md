# Site Wise Associates

Site vitrine de Wise Associates, cabinet de conseil en management (Paris), dédié aux services financiers.

- Next.js 16 (App Router). Le site public est entièrement statique : aucune base de données, aucun formulaire, aucun script tiers.
- Contenu éditorial centralisé dans `src/content/site.ts` (accueil, expertises, services, offres d’emploi, coordonnées).
- Publications (articles) dans `content/publications/*.json`, gérées depuis le backoffice `/admin` (voir plus bas).
- Styles dans `src/app/globals.css` : toutes les couleurs, polices et espacements sont des variables CSS (`:root`).
- Polices auto-hébergées via `@fontsource` (Space Grotesk pour les titres, Instrument Sans variable pour le texte et les libellés en chasse étroite) : pas d’appel à Google Fonts.
- Logo officiel : `public/wise-logo.png` (noir, inversé en CSS sur fond sombre). Les illustrations sont des SVG maison dans `src/components/Art.tsx`, colorées par les variables `--art-*`.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

## Vérifier avant de pousser

```bash
npm test             # tests unitaires (node:test, Node 22.18 ou plus)
npm run check        # typecheck + lint + tests + build
```

## Backoffice des publications

`/admin` permet à l’équipe de créer, modifier, dépublier (statut brouillon) et supprimer les publications.

- **Stockage** : chaque publication est un fichier `content/publications/<slug>.json` (format dans
  `content/publications/README.md`). Le backoffice l’enregistre par un commit sur `CONTENT_BRANCH`
  (`pre-dev` par défaut) via l’API GitHub ; Vercel reconstruit alors le site en une à deux minutes.
  La mise en production suit le circuit habituel (pull request validée vers la branche de production).
- **Accès** : un compte administrateur unique (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`),
  session de 8 heures dans un cookie signé, `httpOnly`, `SameSite=Strict`, limité à `/admin`.
  Chaque page et action serveur vérifie la session elle-même (`src/lib/admin/auth.ts`).
- **Concurrence** : une modification faite entre-temps (autre onglet, autre personne) est détectée et refusée.

Mise en place sur Vercel (Settings > Environment Variables, environnements Preview et Production) :

1. `node scripts/hash-password.mjs`, puis copier la ligne `ADMIN_PASSWORD_HASH=…` dans Vercel.
2. Renseigner `ADMIN_EMAIL` et `ADMIN_SESSION_SECRET` (commande de génération dans `.env.example`).
3. Créer sur GitHub un jeton « fine-grained » limité au dépôt `wise-associates/website`, permission
   Contents en lecture et écriture, et le renseigner dans `GITHUB_CONTENT_TOKEN`.

En local, sans `GITHUB_CONTENT_TOKEN`, `npm run dev` écrit directement dans `content/publications`.

## Arborescence

| Chemin | Rôle |
| --- | --- |
| `src/app/` | Pages (accueil, expertises, publications, recrutement, à propos, contact, mentions légales) |
| `src/components/` | En-tête et menus, pied de page, cartes, illustrations SVG, données structurées (`JsonLd`) |
| `src/content/site.ts` | Tous les textes du site, y compris titres et descriptions pour les moteurs (`seo`) |
| `content/publications/*.json` | Articles (un fichier par article) et leur ancienne adresse WordPress |
| `src/content/publications.ts` | Lecture des articles publiés au moment du build |
| `src/content/admin.ts` | Textes du backoffice |
| `src/app/admin/`, `src/lib/admin/`, `src/components/admin/` | Backoffice : pages, actions serveur, authentification, stockage GitHub |
| `src/lib/publications/model.ts` | Format, validation et rendu des articles (fonctions pures testées) |
| `src/content/legacy-urls.ts` | Autres anciennes adresses WordPress redirigées (offres d’emploi, catégories) |
| `src/lib/seo.ts`, `src/lib/structured-data.ts`, `src/lib/og.tsx` | Référencement : métadonnées de page, schema.org, images de partage |
| `next.config.ts` | En-têtes de sécurité (CSP) et redirections des anciennes URL WordPress |

## Déploiement

Projet Vercel `wise-associates/website`, relié à ce dépôt GitHub :

- chaque push sur `pre-dev` (ou toute autre branche) crée une preview ;
- `main` est la production, mise à jour uniquement par pull request validée par un humain.

Le préréglage Next.js est imposé par `vercel.json` (le projet Vercel a été créé sur un dépôt vide et n'a pas pu le détecter).

Variable d'environnement : voir `.env.example`.

## Bascule du domaine wise-associates.fr

Les anciennes URL WordPress (pages et articles) sont redirigées en 301/308 dans `next.config.ts`, et `www.wise-associates.fr` renvoie vers `wise-associates.fr`. Pour mettre le nouveau site en ligne sur le domaine :

1. Dans Vercel (projet `wise-associates/website`, Settings > Domains), ajouter `wise-associates.fr` et `www.wise-associates.fr`.
2. Chez le registraire du domaine (IONOS aujourd'hui), créer les enregistrements DNS indiqués par Vercel pour chacun des deux domaines (un enregistrement A pour la racine, un CNAME pour `www`), en remplacement de ceux qui pointent vers l'hébergement WordPress.
3. Ne pas toucher aux enregistrements MX : la messagerie `contact@wise-associates.fr` doit continuer de fonctionner.
4. Vérifier ensuite quelques anciennes adresses (par exemple `/risks-finance`, `/offres-demploi`, `/risque-de-liquidite-nsfr-2021`).

## Référencement (SEO)

- **Métadonnées** : chaque page exporte `pageMetadata({ ...seo.xxx, path })` (`src/lib/seo.ts`), qui pose le titre, la description, l’URL canonique et l’aperçu de partage (Open Graph, X). Les textes sont dans `seo` (`src/content/site.ts`) : titre de 60 caractères au plus, description de 120 à 160.
- **Nouvelle page** : ajouter ses textes dans `seo`, appeler `pageMetadata`, passer `path` à `PageHero` (fil d’Ariane schema.org) et l’ajouter à `src/app/sitemap.ts` si elle doit être indexée.
- **Données structurées** (schema.org, JSON-LD) : organisation et site sur l’accueil, `Article` sur chaque publication, `BreadcrumbList` sur les pages intérieures.
- **Images de partage** : générées au build par les fichiers `opengraph-image.tsx` (accueil, chaque expertise, chaque article) ; les autres pages reprennent celle de l’accueil.
- **Indexation** : `robots.txt` et `sitemap.xml` sont générés ; les previews Vercel répondent `Disallow: /` et les mentions légales sont en `noindex`.
- **Icônes** : `src/app/favicon.ico`, `icon.png` et `apple-icon.png`, tirées du logo officiel (`public/wise-logo.png`).
- **Après la bascule du domaine** : déclarer `wise-associates.fr` dans Google Search Console (propriété de domaine, vérifiée par un enregistrement TXT chez IONOS), y soumettre `https://wise-associates.fr/sitemap.xml`, puis suivre le rapport « Pages » pendant quelques semaines. Faire de même dans Bing Webmaster Tools (import possible depuis Search Console).

## Points restant à traiter

- Confirmer l'hébergeur indiqué dans les mentions légales au moment de la bascule du domaine.

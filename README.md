# Site Wise Associates

Site vitrine de Wise Associates, cabinet de conseil en management (Paris), dédié aux services financiers.

- Next.js 16 (App Router), entièrement statique : aucune base de données, aucun formulaire, aucun script tiers.
- Contenu éditorial centralisé dans `src/content/site.ts` (accueil, expertises, services, offres d’emploi, coordonnées) et `src/content/publications.ts` (articles).
- Styles dans `src/app/globals.css` : toutes les couleurs, polices et espacements sont des variables CSS (`:root`).
- Polices auto-hébergées via `@fontsource` (Space Grotesk pour les titres, Roboto pour le texte) : pas d’appel à Google Fonts.
- Logo officiel : `public/wise-logo.png` (noir, inversé en CSS sur fond sombre). Les illustrations sont des SVG maison dans `src/components/Art.tsx`, colorées par les variables `--art-*`.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

## Vérifier avant de pousser

```bash
npm run check        # typecheck + lint + build
```

## Arborescence

| Chemin | Rôle |
| --- | --- |
| `src/app/` | Pages (accueil, expertises, publications, recrutement, à propos, contact, mentions légales) |
| `src/components/` | En-tête (méga-menu), pied de page, carrousel, cartes, illustrations SVG |
| `src/content/site.ts` | Tous les textes du site |
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

## Points restant à traiter

- Remplacer le monogramme provisoire (`src/components/Logo.tsx`, `src/app/icon.svg`) par le logo officiel.
- Confirmer l'hébergeur indiqué dans les mentions légales au moment de la bascule du domaine.

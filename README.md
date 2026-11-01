# Site Wise Associates

Site vitrine de Wise Associates, cabinet de conseil en management (Paris), dédié aux services financiers.

- Next.js 16 (App Router), entièrement statique : aucune base de données, aucun formulaire, aucun script tiers.
- Contenu éditorial centralisé dans `src/content/site.ts` (expertises, services, publications, offres d'emploi, coordonnées).
- Styles dans `src/app/globals.css` : toutes les couleurs, polices et espacements sont des variables CSS (`:root`).
- Polices auto-hébergées via `@fontsource-variable` (Inter, Fraunces) : pas d'appel à Google Fonts.

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

## Points restant à traiter

- Remplacer le monogramme provisoire (`src/components/Logo.tsx`, `src/app/icon.svg`) par le logo officiel.
- Migrer le texte complet des quatre publications : les cartes renvoient encore vers les articles de l'ancien site.
- Confirmer l'hébergeur indiqué dans les mentions légales au moment de la bascule du domaine.

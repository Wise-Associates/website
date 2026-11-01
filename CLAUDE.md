# Site Wise Associates : règles du projet

- Langue : textes en français, vouvoiement.
- Tout texte affiché vient de `src/content/site.ts` ; ne pas écrire de copie en dur dans les composants quand elle peut y vivre.
- Design : utiliser uniquement les variables de `:root` dans `src/app/globals.css` (couleurs, polices, rayons, espacements).
- Le site reste statique : pas de script tiers, pas d'iframe, pas de collecte de données. Si un service externe devient nécessaire, élargir la CSP dans `next.config.ts` et mettre à jour la section confidentialité des mentions légales.
- Les anciennes URL WordPress sont redirigées dans `next.config.ts` (listes dans `src/content/publications.ts` et `src/content/legacy-urls.ts`) : garder ces redirections.
- Référencement : toute page exporte ses métadonnées via `pageMetadata` (`src/lib/seo.ts`) avec des textes de `seo` dans `site.ts`, passe `path` à `PageHero` et figure dans `sitemap.ts` si elle est indexable.
- Avant tout push : `npm run check`.
- Branches : travail sur `pre-dev` (preview Vercel), production sur `main` via pull request validée par un humain.

# Site Wise Associates : règles du projet

- Langue : textes en français, vouvoiement. Espace insécable (U+00A0) avant `: ; ? ! %` et à l’intérieur des guillemets `« »`, pour qu’aucune ponctuation ne commence une ligne.
- Tout texte affiché vient de `src/content/site.ts` (backoffice : `src/content/admin.ts`) ; ne pas écrire de copie en dur dans les composants quand elle peut y vivre.
- Publications : fichiers `content/publications/*.json`, édités par le backoffice `/admin`. Toute page ou action serveur du backoffice appelle `requireAdmin()` ; aucune protection ne repose sur un middleware.
- Design : utiliser uniquement les variables de `:root` dans `src/app/globals.css` (couleurs, polices, rayons, espacements).
- Le site public reste statique : pas de script tiers, pas d'iframe, pas de collecte de données. Si un service externe devient nécessaire, élargir la CSP dans `next.config.ts` et mettre à jour la section confidentialité des mentions légales.
- Les anciennes URL WordPress sont redirigées dans `next.config.ts` (listes dans `content/publications/*.json` (champ `legacyPath`) et `src/content/legacy-urls.ts`) : garder ces redirections.
- Référencement : toute page exporte ses métadonnées via `pageMetadata` (`src/lib/seo.ts`) avec des textes de `seo` dans `site.ts`, passe `path` à `PageHero` et figure dans `sitemap.ts` si elle est indexable.
- Avant tout push : `npm run check`.
- Branches : travail sur `pre-dev` (preview Vercel), production sur `main` via pull request validée par un humain.

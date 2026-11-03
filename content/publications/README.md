# Publications

Un fichier JSON par publication, nommé `<slug>.json`. Ces fichiers sont créés et modifiés par le backoffice
(`/admin`) ; ils peuvent aussi être édités à la main, puis vérifiés avec `npm run check`.

| Champ | Contenu |
| --- | --- |
| `slug` | Adresse de la page (`/publications/<slug>`), identique au nom du fichier |
| `status` | `draft` (invisible sur le site) ou `published` |
| `title`, `date` (AAAA-MM-JJ), `category`, `excerpt` | Titre, date, rubrique, chapeau |
| `body` | Texte : ligne vide entre deux paragraphes, `## ` pour un intertitre, `- ` pour un élément de liste |
| `source` | Facultatif : `{ "label", "url" }` (https) quand l'article résume une publication externe |
| `legacyPath` | Facultatif : ancienne adresse WordPress, redirigée en 301 vers la nouvelle page |

La validation est dans `src/lib/publications/model.ts` : un fichier invalide fait échouer le build.

Les quatre articles de 2021 ont été réécrits à partir de l'ancien site : les faits et références
réglementaires sont conservés, la rédaction est nouvelle. Les deux notes consacrées aux Cahiers Louis
Bachelier résument et créditent la publication de l'Institut Louis Bachelier, sans reprendre ses éditoriaux.

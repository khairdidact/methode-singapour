# Maths visibles — Méthode de Singapour

Une page pédagogique responsive, colorée, illustrée et interactive consacrée à la méthode d’enseignement des mathématiques de Singapour.

## Contenu

- cadre officiel : résolution de problèmes et cinq composantes ;
- concret → imagé → abstrait, schémas-barres, variation, langage et métacognition ;
- déroulé interactif d’une séance ;
- dix situations résolues et comparées à des raccourcis pédagogiques moins productifs lorsqu’ils sont employés seuls ;
- filtres par cycle et domaine, checklist de préparation et sources institutionnelles.

## Publier avec GitHub Pages

1. Créez un dépôt GitHub vide.
2. Déposez tous les fichiers de ce projet à la racine du dépôt.
3. Dans **Settings → Pages**, choisissez **GitHub Actions** comme source.
4. Envoyez les fichiers sur la branche `main`.

Le workflow `.github/workflows/pages.yml` construit et publie automatiquement la page. L’adresse apparaît dans l’onglet **Actions**, puis dans **Settings → Pages**.

## Tester localement

```bash
npm ci
npm run build:github
npx vite --config vite.github.config.ts
```

La version statique générée se trouve dans `dist-github/`.

## Personnaliser

- contenu et interactions : `app/page.tsx` ;
- couleurs, responsive et impression : `app/globals.css` ;
- titre et description : `index.html` et `app/layout.tsx`.

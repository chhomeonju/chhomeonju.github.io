# Myeongju Cho's academic homepage

React and TypeScript website built with Vite and published at https://chhomeonju.github.io/.
The build generates full HTML before React hydrates it, keeping academic content readable
by search engines and when JavaScript is unavailable.

## Local development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## Editing content

- `src/data/portfolio.ts`: publications, presentations, projects, awards, education, and experience.
- `src/components/Content.tsx`: reusable content sections and project cards; profile introduction.
- `src/hooks/useSectionNavigation.ts`: mobile menu, active section, hash navigation, and project permalinks.
- `src/styles/`: typography, layout, and responsive styles.
- `public/assets/images/`: publication figures. Store the relative path in the publication data.

Project showcases use one bordered full-width card per project. Clicking a card opens
a separate static page under `projects/<slug>.html`. Detail pages and the homepage
are prerendered together, so direct links and refresh work on GitHub Pages. Add a representative image in
`public/assets/images/`, then set the project's `image` to `{ src, alt, caption }`.
Set `image` to `null` for a text-only entry. The `stack` array
controls the secondary technology line. Source evidence is recorded in `docs/project-sources.md`.

## Validation and production preview

```sh
npm test
npm run build
npm run preview
```

`npm run build` checks TypeScript, creates optimized assets, and prerenders the homepage
into `dist/`. Do not edit or commit `dist/` or `node_modules/`.

## Deployment

GitHub Pages uses **GitHub Actions** as its source. Pushing to `main` runs
`.github/workflows/deploy.yml`, which installs locked dependencies, runs tests, builds,
and deploys `dist/`. No API keys or repository secrets are required.

The visual layout originated from Jon Barron's personal website and was adapted for
this portfolio. React migration preserves the existing responsive design and content.

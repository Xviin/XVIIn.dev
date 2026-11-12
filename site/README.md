# XVIIn.dev

Personal site of XVIIn — apps and tools built with AI.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Add a project

1. Create a folder `content/projects/<slug>/` (lowercase, dashes: `my-app`).
2. Add `en.mdx` (required) and optionally `tr.mdx`:

```mdx
---
title: My App
tagline: One sentence about it.
kind: iOS app
year: 2026
status: live        # live | soon | wip
order: 3            # position on the home page
links:
  - label: App Store
    url: https://apps.apple.com/...
---

The story of the project, in Markdown.
```

The project appears on the home page and gets its own page at `/projects/<slug>` (and `/tr/projects/<slug>`). Without `tr.mdx` the Turkish page shows English with a note.

To give a project its own interactive scene, add a component under `src/components/projects/scenes/` and register it in `src/components/projects/scenes.ts`.

## Links

Edit `src/content/site.ts` (GitHub, LinkedIn, X, email). Texts for both languages live in `messages/en.json` and `messages/tr.json`.

## Tests

```bash
npm test           # unit tests (vitest)
npm run e2e        # browser tests (playwright)
```

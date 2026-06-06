# Deployment Guide

## Overview

This repository hosts a Vite-powered React marketplace and a parallel static design collection under `designs/`.

- React SPA: built from `src/`
- Static pages: `designs/`
- Interactive demos: `public/demos/`
- Public images: `public/images/`

## Local setup

```powershell
npm install
npm run dev
```

The React app runs on `http://localhost:5173`.

## Build

```powershell
npm run build
```

This runs TypeScript compilation and Vite production build, then copies `designs/` into `dist/designs/` so the static pages are included in the final output.

## Deploying to Vercel

Vercel will use the root `package.json` build command and serve the React SPA while preserving the static files in `dist/designs/`.

### Key files

- `package.json`: build command copies `designs/` into `dist/`
- `vercel.json`: SPA fallback is configured
- `.vercelignore`: keeps build artifacts and local development files out of deployment

### Recommended workflow

1. `npm install`
2. `npm run build`
3. `npm run preview`

For production via Vercel, push to the configured branch or connect the repository to the Vercel project.

## Notes

- `designs/` must remain in the repository so Vercel can deploy the standalone HTML assets.
- If you use a CI/CD pipeline, verify that the build step runs `npm run build` and that the output includes `dist/designs/`.

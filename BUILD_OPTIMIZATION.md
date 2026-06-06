# Build Optimization

## Production build command

Use the existing build command in `package.json`:

```powershell
npm run build
```

This performs:

- `tsc -b` for TypeScript type checking and incremental compilation
- `vite build` for optimized frontend bundle generation
- copy of `designs/` into `dist/designs/` for static standalone assets

## Performance recommendations

- Keep React components lean and avoid unnecessary rerenders.
- Prefer direct imports from `react`, `react-dom`, and `react-router-dom`.
- Use optimized images in `public/images/` and `designs/images/`.
- Keep large assets out of the client bundle by serving them from static folders.
- Minify and compress output assets where possible.

## Vite notes

- `vite build` already performs tree-shaking and code-splitting.
- Keep `public/` assets separate from the app code to avoid bundling them.
- Use `src` aliasing only for application code, not for static HTML asset references.

## Deployment hygiene

- Do not commit `dist/`, `node_modules/`, or generated `.tsbuildinfo` files.
- Make sure `.vercelignore` excludes local build artifacts but allows `designs/`, `public/demos/`, and `public/images/`.
- Verify the final `dist/` tree includes the copied `designs/` folder before deployment.

/* Render every React route to static HTML, as the reference the WordPress theme is compared against.

   The app's modules load through Vite's own SSR loader, so the TypeScript and JSX run exactly as the
   app ships them, with no extra dependencies; React itself is imported natively, which is the same
   copy Vite externalises the app's imports to. Effects never run on the server, which is what we want:
   the output is each page's first render — the markup the theme has to reproduce before any script
   touches it.

   Usage: node scripts/wordpress/render-reference.mjs <output-directory>
   Writes one file per route, named after the path ("/" becomes "home.html"). */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { createServer } from 'vite';

const outDir = process.argv[2];
if (!outDir) {
  console.error('Usage: node scripts/wordpress/render-reference.mjs <output-directory>');
  process.exit(1);
}

/* useTheme reads the document's theme attribute during its first render. A bare stand-in is enough
   for the server render to pick the light theme, which is the theme the WordPress output defaults to. */
globalThis.document = { documentElement: { dataset: {} } };

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });

try {
  const { App } = await vite.ssrLoadModule('/src/app/App.tsx');
  const { sourcePages } = await vite.ssrLoadModule('/src/content/sourcePages.ts');

  const routes = ['/', ...sourcePages.map((page) => page.path), '/thank-you', '/no-such-page'];

  await mkdir(outDir, { recursive: true });

  for (const route of routes) {
    const html = renderToStaticMarkup(
      React.createElement(StaticRouter, { location: route }, React.createElement(App)),
    );
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '__');
    await writeFile(join(outDir, `${name}.html`), html);
    console.log(`${route.padEnd(36)} ${html.length} bytes`);
  }
} finally {
  await vite.close();
}

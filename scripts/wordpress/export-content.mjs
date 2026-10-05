/* Export the React build's content into the WordPress theme, so the theme renders the same words.

   The theme's copy is not retyped. Every string comes from the same TypeScript modules the React app
   renders, loaded through Vite's SSR loader so they are evaluated exactly as the app evaluates them.
   Retyping is how the founder section and the hero drifted from the approved build; generating the
   data removes that whole class of mistake.

   Writes:
     wordpress-theme/virtual-office-angels/data/*.json   the content
     wordpress-theme/virtual-office-angels/assets/media/  every image the pages reference
     wordpress-theme/virtual-office-angels/assets/css/    the four stylesheets, unchanged except that
                                                          /assets/ image URLs point into assets/media/

   Article images are left out: articles already live in the WordPress media library on the client's
   site, and come across with the database.

   Usage: node scripts/wordpress/export-content.mjs
   Re-run it whenever the React content changes, then commit the result with the change. */

import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const theme = join(root, 'wordpress-theme', 'virtual-office-angels');
const dataDir = join(theme, 'data');
const mediaDir = join(theme, 'assets', 'media');

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const load = (path) => vite.ssrLoadModule(path);

try {
  const site = await load('/src/content/siteContent.ts');
  const home = await load('/src/content/homeContent.ts');
  const pages = await load('/src/content/sourcePages.ts');
  const services = await load('/src/content/serviceDetails.ts');
  const process = await load('/src/content/processContent.ts');
  const managed = await load('/src/content/managedContent.ts');
  const faqs = await load('/src/content/faqContent.ts');
  const testimonials = await load('/src/content/testimonials.ts');
  const caseStudy = await load('/src/content/caseStudy.ts');
  const navigation = await load('/src/content/navigation.ts');
  const blog = await load('/src/content/blogContent.ts');
  const clients = JSON.parse(await readFile(join(root, 'src/content/source/staging/clients.json'), 'utf8')).clients;

  const data = {
    site: {
      hero: site.siteContent.hero,
      heroBackgrounds: home.heroBackgrounds,
      contactBackgrounds: home.contactBackgrounds,
      heroStats: home.heroStats,
      sisterSites: site.sisterSites,
      navigation: navigation.navigation,
    },
    home: {
      specialistServices: home.specialistServices,
      buyerQuestions: home.buyerQuestions,
      moreThanRecruitment: home.moreThanRecruitment,
    },
    pages: Object.fromEntries(pages.sourcePages.map((page) => [page.path, page])),
    services: {
      details: services.serviceDetails,
      managedStepTitles: services.managedStepTitles,
      router: services.serviceRouter,
    },
    process: { intro: process.processIntro, stages: process.processStages },
    managed: { page: managed.managedSupportPage, ownership: managed.ownershipSplit },
    faqs: { questions: faqs.sourceFaqs, topics: faqs.faqTopics },
    testimonials: testimonials.testimonials,
    caseStudy: caseStudy.caseStudy,
    clients: clients.map(({ name, image }) => ({ name, image })),
    articles: blog.blogArticles.map((article) => ({ ...article, category: blog.articleCategory(article) })),
    accent: await accentPhrases(),
  };

  await rm(dataDir, { recursive: true, force: true });
  await mkdir(dataDir, { recursive: true });
  for (const [name, value] of Object.entries(data)) {
    await writeFile(join(dataDir, `${name}.json`), `${JSON.stringify(value, null, '\t')}\n`);
  }
  console.log(`data: ${Object.keys(data).length} files`);

  /* Every /assets/ path named anywhere in the data, the React pages or the stylesheets. */
  const sources = [
    JSON.stringify({ ...data, articles: [] }),
    await readFile(join(root, 'src/styles/global.css'), 'utf8'),
    ...(await Promise.all((await sourceFiles(join(root, 'src'))).map((file) => readFile(file, 'utf8')))),
  ].join('\n');
  const assets = [...new Set(sources.match(/\/assets\/[\w./-]+\.(?:jpe?g|png|webp|svg|gif)/g))]
    .filter((path) => !path.includes('/blog-images/') && !/^\/assets\/voa-logo/.test(path))
    .sort();

  await rm(mediaDir, { recursive: true, force: true });
  let bytes = 0;
  for (const asset of assets) {
    const from = join(root, 'public', asset);
    const to = join(mediaDir, asset.slice('/assets/'.length));
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
    bytes += (await readFile(to)).length;
  }
  console.log(`media: ${assets.length} files, ${(bytes / 1048576).toFixed(1)} MB`);

  /* The stylesheets, byte for byte, in the order main.tsx imports them. The only change: an absolute
     /assets/ URL would resolve against the site root in WordPress, so it is made relative to the
     stylesheet, which sits in assets/css/ beside assets/media/. Theme-only rules live in separate
     files (fonts.css, wordpress.css) so this copy can be regenerated at any time. */
  for (const sheet of ['tokens', 'themes', 'typography', 'global']) {
    const css = await readFile(join(root, 'src/styles', `${sheet}.css`), 'utf8');
    await writeFile(join(theme, 'assets/css', `${sheet}.css`), css.replace(/url\((['"]?)\/assets\//g, 'url($1../media/'));
  }
  console.log('css: 4 stylesheets');
} finally {
  await vite.close();
}

/* The accent phrases live in a module-private array in HeadingAccent.tsx. Read them from the source
   rather than exporting them, which would trip react-refresh/only-export-components. Sorted here,
   longest first, exactly as the component sorts them — a stable sort, so ties keep source order, which
   PHP 7.4's sort would not guarantee. */
async function accentPhrases() {
  const source = await readFile(join(root, 'src/components/ui/HeadingAccent.tsx'), 'utf8');
  const minimum = Number(/TWO_WORD_MINIMUM = (\d+)/.exec(source)[1]);
  const block = /const PHRASES = \[([\s\S]*?)\]\s*\.filter/.exec(source)[1];
  return [...block.matchAll(/'([^']+)'/g)]
    .map((match) => match[1])
    .filter((phrase) => phrase.trim().split(/\s+/).length >= minimum)
    .sort((a, b) => b.length - a.length);
}

async function sourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'source' ? [] : sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  }));
  return files.flat();
}

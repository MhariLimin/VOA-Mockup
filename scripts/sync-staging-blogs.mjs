import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = 'https://virtualofficeangels.com.au/stagingsite2/';
const api = new URL('wp-json/wp/v2/posts?per_page=100&_embed=1', site);
const root = fileURLToPath(new URL('../', import.meta.url));
const imageDir = join(root, 'public', 'assets', 'source', 'staging', 'blog-images');
const outputFile = join(root, 'src', 'content', 'source', 'staging', 'blogs.json');
const indexFile = join(root, 'src', 'content', 'source', 'staging', 'blogs-index.json');
const articleDir = join(root, 'src', 'content', 'source', 'staging', 'blog-articles');

const decodeText = (value = '') => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#0?39;|&#x27;|&apos;/gi, "'")
  .replace(/&(?:#8216|lsquo);/g, '‘')
  .replace(/&(?:#8217|rsquo);/g, '’')
  .replace(/&(?:#8220|ldquo);/g, '“')
  .replace(/&(?:#8221|rdquo);/g, '”')
  .replace(/&(?:#8211|ndash);/g, '–')
  .replace(/&(?:#8212|mdash);/g, '—')
  .replace(/&#038;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

const response = await fetch(api);
if (!response.ok) throw new Error(`WordPress API returned ${response.status}`);
const allPosts = await response.json();
// The staging /blogs page currently displays the 30 newest articles in this order.
const posts = allPosts.slice(0, 30);
const knownSlugs = new Set(posts.map((post) => post.slug));
const imageUrls = new Set();

for (const post of posts) {
  for (const match of post.content.rendered.matchAll(/(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi)) {
    try {
      const url = new URL(match[1].replace(/&amp;/g, '&'), post.link).href;
      if (/^https?:/i.test(url) && !/secure\.gravatar\.com|s\.w\.org/i.test(url)) imageUrls.add(url);
    } catch { /* Ignore malformed source attributes. */ }
  }
}

await mkdir(imageDir, { recursive: true });
await mkdir(articleDir, { recursive: true });
const localImages = new Map();
for (const url of imageUrls) {
  try {
    const assetResponse = await fetch(url);
    if (!assetResponse.ok) continue;
    const data = Buffer.from(await assetResponse.arrayBuffer());
    const pathname = new URL(url).pathname;
    const original = basename(pathname).replace(/[^a-z0-9._-]/gi, '-') || 'article-image.jpg';
    const mimeExtension = ({ 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/jpeg': '.jpg' })[assetResponse.headers.get('content-type')?.split(';')[0] || ''];
    const extension = extname(original) || mimeExtension || '.jpg';
    const stem = original.slice(0, Math.max(1, original.length - extension.length));
    const name = `${createHash('sha1').update(url).digest('hex').slice(0, 10)}-${stem}${extension}`;
    await writeFile(join(imageDir, name), data);
    localImages.set(url, `/assets/source/staging/blog-images/${name}`);
  } catch { /* A failed secondary asset must not discard its article. */ }
}

const localiseUrl = (raw, base) => {
  try {
    const absolute = new URL(raw.replace(/&amp;/g, '&'), base).href;
    return localImages.get(absolute) || absolute;
  } catch { return raw; }
};

const sanitiseArticle = (html, sourceUrl) => {
  let safe = html
    .replace(/<(script|style|form|object|embed)[\s\S]*?<\/\1>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, '')
    .replace(/\sstyle\s*=\s*(["']).*?\1/gi, '')
    .replace(/\ssrcset\s*=\s*(["']).*?\1/gi, '')
    .replace(/\ssizes\s*=\s*(["']).*?\1/gi, '');
  safe = safe.replace(/\s(src|data-src|data-lazy-src)=(["'])([^"']+)\2/gi, (whole, attribute, quote, url) => {
    if (attribute.toLowerCase() !== 'src') return '';
    return ` src=${quote}${localiseUrl(url, sourceUrl)}${quote}`;
  });
  safe = safe.replace(/\shref=(["'])([^"']+)\1/gi, (whole, quote, href) => {
    try {
      const url = new URL(href.replace(/&amp;/g, '&'), sourceUrl);
      const match = url.pathname.match(/^\/stagingsite2\/([^/]+)\/?$/);
      if (url.origin === new URL(site).origin && match && knownSlugs.has(match[1])) return ` href=${quote}/insights/${match[1]}${quote}`;
      return ` href=${quote}${url.href}${quote}`;
    } catch { return whole; }
  });
  return safe;
};

const result = posts.map((post) => {
  const sourceImages = [...post.content.rendered.matchAll(/(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi)]
    .map((match) => localiseUrl(match[1], post.link))
    .filter((url) => url.startsWith('/assets/source/staging/blog-images/'));
  return {
    slug: post.slug,
    title: decodeText(post.title.rendered),
    date: post.date,
    author: post._embedded?.author?.[0]?.name || 'Virtual Office Angels',
    excerpt: decodeText(post.excerpt.rendered),
    featuredImage: sourceImages[0] || null,
    images: [...new Set(sourceImages)],
    content: sanitiseArticle(post.content.rendered, post.link),
    sourceUrl: post.link,
  };
});

const capturedAt = new Date().toISOString();
const sourceUrl = new URL('blogs/', site).href;
const indexArticles = result.map(({ content, images, ...summary }) => summary);
await Promise.all(result.map((article) => writeFile(join(articleDir, `${article.slug}.json`), JSON.stringify(article, null, 2))));
await writeFile(indexFile, JSON.stringify({ capturedAt, source: sourceUrl, articles: indexArticles }, null, 2));
await writeFile(outputFile, JSON.stringify({ capturedAt, source: sourceUrl, articles: result }, null, 2));
console.log(`Saved ${result.length} articles and ${localImages.size} article images.`);

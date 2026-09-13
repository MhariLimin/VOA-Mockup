import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const home = 'https://virtualofficeangels.com.au/stagingsite2/';
const root = fileURLToPath(new URL('../', import.meta.url));
const stagingDir = join(root, 'src', 'content', 'source', 'staging');
const assets = JSON.parse(await readFile(join(stagingDir, 'assets.json'), 'utf8'));
const response = await fetch(home);
if (!response.ok) throw new Error(`Staging homepage returned ${response.status}`);
const html = await response.text();
const start = html.indexOf('id="sp-wp-carousel-free-id-13"');
const end = html.indexOf('Ready to build your ideal', start);
if (start < 0) throw new Error('Client carousel was not found.');
const carousel = html.slice(start, end > start ? end : start + 100000);

const decode = (value) => value
  .replace(/&amp;|&#038;/g, '&')
  .replace(/&#0?39;|&#x27;/gi, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ')
  .trim();

const clients = [];
const seen = new Set();
for (const match of carousel.matchAll(/<img\b[^>]*class=["'][^"']*skip-lazy[^"']*["'][^>]*>/gi)) {
  const tag = match[0];
  const src = decode(tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] || '');
  const sourceName = decode(tag.match(/\balt=["']([^"']*)["']/i)?.[1] || '');
  if (!src) continue;
  const key = new URL(src).pathname.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  const asset = assets.find((item) => item.sourceUrl.replace(/&amp;/g, '&') === src)
    || assets.find((item) => new URL(item.sourceUrl.replace(/&amp;/g, '&')).pathname.toLowerCase() === key);
  if (!asset) throw new Error(`No local asset found for ${src}`);
  clients.push({ name: /^\d+$/.test(sourceName) ? '' : sourceName, sourceName, image: asset.localPath, sourceUrl: src });
}

await writeFile(join(stagingDir, 'clients.json'), JSON.stringify({ capturedAt: new Date().toISOString(), source: home, clients }, null, 2));
console.log(`Saved ${clients.length} staging client logos.`);

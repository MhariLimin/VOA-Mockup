import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = 'https://virtualofficeangels.com.au/stagingsite2/';
const slugs = ['', 'about-us/', 'services/', 'how-it-works/', 'why-us/', 'blogs/', 'faqs/', 'contact-us/', 'virtual-mortgage-and-loans-processing-support/', 'digital-marketing-support-and-services/', 'financial-planning-assistance-and-administration/', 'business-back-office-and-admin-support/', 'accounting-and-bookkeeping-assistance/', 'real-estate-and-administration-support/'];
const root = fileURLToPath(new URL('../', import.meta.url));
const imageDir = join(root, 'public', 'assets', 'source', 'staging', 'images');
const contentDir = join(root, 'src', 'content', 'source', 'staging');
await mkdir(imageDir, { recursive: true });
await mkdir(contentDir, { recursive: true });
const decode = (value) => value.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—').replace(/&#(?:x27|39);|&apos;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const pages = [];
const images = new Map();
const media = new Set();
for (const slug of slugs) {
  const url = new URL(slug, base).href;
  const response = await fetch(url);
  if (!response.ok) continue;
  const html = await response.text();
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || slug || 'Home');
  const body = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const text = decode(body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, ''));
  pages.push({ slug: slug || 'home', title, url, text });
  for (const match of html.matchAll(/(?:src|data-src|poster)=["']([^"']+)["']|url\(["']?([^)'\"]+)|srcset=["']([^"']+)["']/gi)) {
    const candidates = match[3] ? match[3].split(',').map((item) => item.trim().split(/\s+/)[0]) : [match[1] || match[2]];
    for (const raw of candidates) {
      if (!raw) continue;
      let assetUrl;
      try { assetUrl = new URL(raw.replace(/&amp;/g, '&'), url); } catch { continue; }
      if (/\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(assetUrl.href) && /(wp-content\/uploads|i\d\.wp\.com)/i.test(assetUrl.href)) {
        images.set(assetUrl.href, new Set([...(images.get(assetUrl.href) || []), slug || 'home']));
      }
    }
  }
  for (const match of html.matchAll(/<(?:iframe|video|audio)[^>]+src=["']([^"']+)/gi)) media.add(new URL(match[1], url).href);
}
const assets = [];
for (const [url, usedBy] of images) {
  try {
    const response = await fetch(url);
    if (!response.ok) continue;
    const data = Buffer.from(await response.arrayBuffer());
    const original = basename(new URL(url).pathname).replace(/[^a-z0-9._-]/gi, '-');
    const name = `${createHash('sha1').update(url).digest('hex').slice(0, 10)}-${original}`;
    await writeFile(join(imageDir, name), data);
    assets.push({ sourceUrl: url, localPath: `/assets/source/staging/images/${name}`, bytes: data.length, usedBy: [...usedBy] });
  } catch {}
}
await writeFile(join(contentDir, 'content.json'), JSON.stringify({ capturedAt: new Date().toISOString(), base, pages, externalMedia: [...media] }, null, 2));
await writeFile(join(contentDir, 'assets.json'), JSON.stringify(assets, null, 2));
console.log(`Saved ${pages.length} pages and ${assets.length} images.`);

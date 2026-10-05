/* Compare the WordPress theme's output with the React reference, route by route.

   Both sides are reduced to the same token stream — one line per tag or text run — and diffed. A tag
   keeps its name and the attributes that change what is shown or how it behaves; text is entity-
   decoded and whitespace-collapsed. What legitimately differs between the two platforms is
   normalised away rather than ignored wholesale:

   - URLs: the host, trailing slashes, and where an image is served from. An image is identified by
     its file path below /assets/, which the theme keeps (assets/media/... mirrors /assets/...).
   - Attribute order, and valueless boolean attributes ("hidden" and hidden="").
   - WordPress-only plumbing: attributes named data-voa-* (data a behaviour module reads, where React
     kept it in component state) and <script> elements. Neither renders anything.
   - The enquiry form. WordPress renders it through Contact Form 7, which wraps it and adds its own
     classes, spans and hidden fields, so both forms are reduced to what a visitor meets: the text, and
     each visible control's type, autocomplete hint, rows and whether it is required, in order. Its
     look is checked in the browser instead.

   Usage: node scripts/wordpress/compare.mjs <reference-directory> <wordpress-base-url> [route ...]
   With no routes, compares every reference file. Exits non-zero when anything differs. */

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const [refDir, baseUrl, ...only] = process.argv.slice(2);
if (!refDir || !baseUrl) {
  console.error('Usage: node scripts/wordpress/compare.mjs <reference-directory> <wordpress-base-url> [route ...]');
  process.exit(1);
}

const KEEP = /^(class|id|href|alt|type|name|role|tabindex|hidden|open|disabled|required|rel|target|for|action|method|value|selected|rows|autocomplete|title|width|height|loading|style|viewbox|d|x|y|x1|x2|y1|y2|cx|cy|r|rx|points|fill|stroke|stroke-width|stroke-linecap|stroke-linejoin|opacity|offset|stop-color|stop-opacity|preserveaspectratio|vector-effect|transform|focusable|aria-[\w-]+|data-[\w-]+|src|content)$/;

const VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…', middot: '·', times: '×', minus: '−' };
const decode = (text) => text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (whole, code) => {
  if (code[0] === '#') return String.fromCodePoint(code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
  return ENTITIES[code] ?? whole;
});

function normaliseUrl(value) {
  let url = decode(value).trim();
  /* Article images live in the media library in WordPress. Every source file name starts with the
     same ten-character hash the React copy carries, so that identifies the image on both sides. */
  const articleImage = /\/(?:blog-images|wp-content\/uploads\/\d{4}\/\d{2})\/([\da-f]{10})-/.exec(url);
  if (articleImage) return `article-image:${articleImage[1]}`;
  const asset = /\/(?:assets\/media|assets)\/(.+?)(?:\?.*)?$/.exec(url);
  if (asset && !url.startsWith('#') && /\.(jpe?g|png|webp|svg|gif)/i.test(asset[1])) return `asset:${asset[1].replace(/^images\//, '')}`;
  if (/^https?:\/\//.test(url) && url.startsWith(baseUrl)) url = url.slice(baseUrl.length) || '/';
  if (url.startsWith('/')) {
    const [path, hash = ''] = url.split('#');
    let clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
    return hash ? `${clean}#${hash}` : clean;
  }
  return url;
}

function normaliseStyle(value) {
  return decode(value)
    .replace(/url\((['"]?)([^)'"]+)\1\)/g, (_, __, url) => `url(${normaliseUrl(url)})`)
    .split(';').map((rule) => rule.trim().replace(/\s*:\s*/, ':')).filter(Boolean).join(';');
}

function tokens(html) {
  const out = [];
  html = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script\b[\s\S]*?<\/script>/gi, '');
  for (const [part] of html.matchAll(/<[^>]+>|[^<]+/g)) {
    if (part[0] !== '<') {
      const text = decode(part).replace(/\s+/g, ' ').trim();
      if (text) out.push(`"${text}"`);
      continue;
    }
    if (part.startsWith('</')) { out.push(part.toLowerCase().replace(/\s+/g, '')); continue; }
    const name = /^<([\w-]+)/.exec(part)?.[1].toLowerCase();
    if (!name) continue;
    const attrs = [];
    for (const [, key, , dq, sq, bare] of part.slice(name.length + 1).matchAll(/([\w:-]+)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      const attr = key.toLowerCase();
      if (!KEEP.test(attr) || attr.startsWith('data-voa-')) continue;
      let value = dq ?? sq ?? bare ?? '';
      if (attr === 'href' || attr === 'src' || attr === 'action' || attr === 'content') value = normaliseUrl(value);
      else if (attr === 'style') value = normaliseStyle(value);
      else value = decode(value).replace(/\s+/g, ' ').trim();
      /* Computed coordinates (the systems diagram, the stage arcs) agree to the fourth decimal; past
         that, JavaScript and PHP format floats differently and their maths libraries can differ in
         the last bit. Four decimals of a percentage is far below a pixel. */
      value = value.replace(/-?\d+\.\d{5,}/g, (number) => String(Number(Number(number).toFixed(4))));
      attrs.push(`${attr}="${value}"`);
    }
    attrs.sort();
    out.push(`<${name}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`);
    /* Void HTML elements never close, however they are written; a self-closed SVG element (<path/>)
       is the same as an explicitly closed one (<path></path>). */
    if (VOID.test(name)) continue;
    if (part.endsWith('/>')) out.push(`</${name}>`);
  }
  return out;
}

/* The enquiry form as a visitor meets it; see the header. In Contact Form 7, required is
   aria-required, and the consent box is required by the form's acceptance-as-validation setting. */
function formSignature(form) {
  const acceptanceRequired = /wpcf7-acceptance-as-validation/.test(form);
  const lines = [];
  for (const [part] of form.matchAll(/<[^>]+>|[^<]+/g)) {
    if (part[0] !== '<') {
      const text = decode(part).replace(/\s+/g, ' ').trim();
      if (text) lines.push(text);
      continue;
    }
    const name = /^<(\w+)/.exec(part)?.[1].toLowerCase();
    if (!['input', 'select', 'textarea', 'button'].includes(name)) continue;
    const attr = (key) => new RegExp(String.raw`\s${key}(?:\s*=\s*["']([^"']*)["'])?`, 'i').exec(part);
    const type = attr('type')?.[1] ?? (name === 'input' ? 'text' : '');
    if (type === 'hidden') continue;
    const required = Boolean(attr('required')) || attr('aria-required')?.[1] === 'true' || (type === 'checkbox' && acceptanceRequired);
    const autocomplete = attr('autocomplete')?.[1];
    const rows = attr('rows')?.[1];
    lines.push(`[${name}${type ? ` type=${type}` : ''}${autocomplete ? ` autocomplete=${autocomplete}` : ''}${rows ? ` rows=${rows}` : ''}${required ? ' required' : ''}]`);
  }
  return `<div class="enquiry-form">${lines.map((line) => `<i>${line.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</i>`).join('')}</div>`;
}

const FORMS = /<div class="wpcf7[\s\S]*?<\/form>\s*<\/div>|<form class="contact-form"[\s\S]*?<\/form>/g;
const withFormSignatures = (html) => html.replace(FORMS, formSignature);

/* The page between the skip link and the end of the footer: the part both platforms render. */
function region(html) {
  const start = html.indexOf('<a class="skip-link"');
  const end = html.indexOf('</footer>', start);
  if (start < 0 || end < 0) return null;
  return html.slice(start, end + '</footer>'.length);
}

/* Myers-free LCS diff; the token counts here are small enough for the quadratic table. */
function diff(a, b) {
  const n = a.length, m = b.length;
  const table = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
    table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
  }
  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push([' ', a[i]]); i++; j++; }
    else if (table[i + 1][j] >= table[i][j + 1]) ops.push(['-', a[i++]]);
    else ops.push(['+', b[j++]]);
  }
  while (i < n) ops.push(['-', a[i++]]);
  while (j < m) ops.push(['+', b[j++]]);
  return ops;
}

function hunks(ops, context = 3) {
  const lines = [];
  let last = -Infinity;
  ops.forEach(([op], index) => {
    if (op === ' ') return;
    for (let k = Math.max(index - context, last + 1); k <= Math.min(index + context, ops.length - 1); k++) {
      if (k > last + 1 && lines.length) lines.push('   ...');
      lines.push(`${ops[k][0]}  ${ops[k][1]}`);
      last = k;
    }
  });
  return lines;
}

const files = (await readdir(refDir)).filter((file) => file.endsWith('.html'));
const routeOf = (file) => (file === 'home.html' ? '/' : `/${file.slice(0, -5).replaceAll('__', '/')}`);
const routes = files.map(routeOf).filter((route) => !only.length || only.includes(route));

let failures = 0;
for (const route of routes) {
  const file = route === '/' ? 'home.html' : `${route.slice(1).replaceAll('/', '__')}.html`;
  const reference = await readFile(join(refDir, file), 'utf8');
  const response = await fetch(`${baseUrl}${route === '/' ? '/' : `${route}/`}`);
  const page = region(await response.text());
  if (!page) { console.log(`✗ ${route}  (HTTP ${response.status}) no skip-link…</footer> region found`); failures++; continue; }

  const ops = diff(tokens(withFormSignatures(reference)), tokens(withFormSignatures(page)));
  const changed = ops.filter(([op]) => op !== ' ').length;
  if (!changed) { console.log(`✓ ${route}`); continue; }
  failures++;
  console.log(`✗ ${route}  ${changed} differing tokens  (- React, + WordPress)`);
  console.log(hunks(ops).slice(0, Number(process.env.LINES ?? 80)).join('\n'));
  console.log('');
}

process.exit(failures ? 1 : 0);

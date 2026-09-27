/* Week 3: section headings and inner-page hero titles carry an orange keyword, matching the home
   page's `<em>` treatment that `main h2 em` / `main h1 em` colour with --heading-accent.

   Headings that come from content modules are verbatim client copy (serviceDetails.ts was machine
   checked against SERVICE PAGES_VOA.pdf), so the emphasis is applied at render time and the stored
   strings are never edited. Only the first and longest match is wrapped, so a heading never ends up
   with two coloured fragments.

   Every phrase is at least two words — a single coloured word reads like a typo rather than an
   accent. TWO_WORD_MINIMUM enforces that at load, so a one-word phrase added later is dropped
   instead of shipping. */

const TWO_WORD_MINIMUM = 2;

const PHRASES = [
  'hr-managed virtual support',
  'managed virtual support',
  'accounting software and tools',
  'systems behind the work',
  'experience matters most',
  'specialised admin support',
  'beyond the initial match',
  'technology requirements',
  'accurate and up to date',
  'virtual assistant services',
  'australian businesses',
  'clients and listings',
  'brief to publication',
  'virtual office angels',
  'brief to execution',
  'industry experience',
  'virtual assistants',
  'specialised support',
  'business functions',
  'specialist support',
  'accounting software',
  'beyond recruitment',
  'experienced support',
  'virtual assistant',
  'reliable information',
  'consistent attention',
  'content production',
  'content workflow',
  'ongoing support',
  'business needs',
  'tools you use',
  'virtual support',
  'managed support',
  'remote support',
  'clear ownership',
  'client stories',
  'straight answers',
  'right support',
  'easy to watch',
  'under control',
  'online orders',
  'new business',
  'administrative systems',
  'technology support',
  'copywriting service',
  'e-commerce systems',
  'insurance systems',
  'digital marketing',
  'digital systems',
  'admin systems',
  'hr expertise',
  'up to date',
  'get started',
  'on track',
]
  .filter((phrase) => phrase.trim().split(/\s+/).length >= TWO_WORD_MINIMUM)
  .sort((a, b) => b.length - a.length);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function HeadingAccent({ text }: { text: string }) {
  for (const phrase of PHRASES) {
    const match = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'i').exec(text);
    if (!match) continue;
    const start = match.index;
    const end = start + match[0].length;
    return <>{text.slice(0, start)}<em>{text.slice(start, end)}</em>{text.slice(end)}</>;
  }

  return <>{text}</>;
}

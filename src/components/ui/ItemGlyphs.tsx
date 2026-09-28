import type { ReactElement } from 'react';

/* Icons for the service-page "when to hire" diagram, one per signal and per outcome.

   The four signals and the four outcomes are in no fixed order across the ten services, so an icon
   chosen by position would be wrong on most pages. These are resolved from the item's own wording
   instead: the first matching rule wins, and a short override table handles the lines where the
   plain keyword match picks the wrong idea. Every item resolves to something — `check` is the
   fallback — so a service whose copy changes later still renders. */

const GLYPHS: Record<string, ReactElement> = {
  /* Time being consumed. */
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.4V12l3 1.8" /></svg>,
  /* Paperwork, records, written content. */
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8Z" /><path d="M14 3.5V8h4.5" /><path d="M8.75 12.5h6.5M8.75 16h4.5" /></svg>,
  /* Something completed or made consistent. */
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="m8.4 12.2 2.5 2.5 4.7-5.1" /></svg>,
  /* Visibility and oversight. */
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2.8 12S6.5 5.8 12 5.8 21.2 12 21.2 12 17.5 18.2 12 18.2 2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>,
  /* Work moving from one stage to the next. */
  flow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5h11" /><path d="m11.6 5.4 3.1 3.1-3.1 3.1" /><path d="M20.5 15.5h-11" /><path d="m12.4 12.4-3.1 3.1 3.1 3.1" /></svg>,
  /* Problems, errors and rework. */
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.2 21 19.4H3Z" /><path d="M12 10v3.6" /><circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none" /></svg>,
  /* Dates, renewals and deadlines. */
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.8" y="5.4" width="16.4" height="14.2" rx="1.8" /><path d="M3.8 10h16.4M8.4 3.6v3.4M15.6 3.6v3.4" /></svg>,
  /* Clients, buyers and colleagues. */
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9.4" cy="9.2" r="3.4" /><path d="M3.4 19.4c.9-3.2 3.2-5 6-5s5.1 1.8 6 5" /><path d="M16 6.6a3.1 3.1 0 0 1 0 5.6M17.6 14.8c1.9.7 3.900000000000001 2.2 3 4.6" /></svg>,
  /* Growth and results. */
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3.6 19.4h16.8" /><path d="m6 15.4 4.2-4.3 3.2 2.9 5.2-5.8" /><path d="M14.5 7.6h4.1v4.1" /></svg>,
  /* Tools and platforms. */
  systems: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.6" y="4.6" width="16.8" height="12" rx="1.8" /><path d="M8.4 20.4h7.2M12 16.6v3.8" /><path d="M8.2 8.8 6.4 10.6l1.8 1.8M15.8 8.8l1.8 1.8-1.8 1.8" /></svg>,
};

/* Lines where a plain keyword match lands on the wrong idea. */
const OVERRIDES: Record<string, string> = {
  'You want recruitment, onboarding, and ongoing team support managed through one provider.': 'people',
  'A more dependable buying experience': 'people',
  'A more consistent voice across website pages': 'doc',
  'Clearer explanations of your products and services': 'doc',
  'Month-end reports need fewer corrections': 'doc',
  'Cash commitments are easier to review': 'chart',
  'More capacity to manage a growing loan pipeline.': 'chart',
};

/* First match wins, so the order is the priority order. */
const RULES: readonly (readonly [string, readonly string[]])[] = [
  ['clock', ['taking time away', 'competing with', 'time away from', 'not enough writing capacity']],
  ['systems', ['familiar', 'terminology', 'already understands', 'requires someone who']],
  ['calendar', ['deadline', 'expiry', 'renewal', 'upcoming review', 'fall due', 'milestone', 'appointment', 'diary', 'calendar', 'scheduling']],
  ['alert', ['bottleneck', 'error', '404', 'rework', 'broken', 'conflict', 'issue', 'avoidable', 'missed', 'delay', 'disruption', 'interrupting', 'unresolved', 'correction']],
  ['eye', ['visibility', 'insight', 'can see', 'monitoring', 'tracking', 'identified sooner', 'warning', 'are visible']],
  ['flow', ['progress', 'pipeline', 'handover', 'follow-through', 'follow-up', 'implementation', 'workflow', 'moving', 'launch', 'publication', 'checkout', 'onboarding']],
  ['doc', ['document', 'file', 'record', 'report', 'listing', 'content', 'draft', 'article', 'invoic', 'bill', 'balance']],
  ['people', ['client', 'customer', 'buyer', 'team', 'enquir', 'candidate', 'adviser', 'agent', 'broker', 'lead', 'prospect']],
  ['chart', ['capacity', 'growing', 'sales', 'performance', 'traffic', 'figures', 'cash', 'campaign', 'channel']],
  ['systems', ['crm', 'system', 'software', 'plugin', 'website', 'contact form', 'uptime', 'page speed', 'digital asset']],
  ['clock', ['timely', 'sooner', 'consistent', 'regular', 'steadier', 'dependable', 'reliable', 'ongoing']],
];

function resolve(text: string) {
  const override = OVERRIDES[text];
  if (override) return GLYPHS[override];

  const lower = text.toLowerCase();
  for (const [key, phrases] of RULES) {
    if (phrases.some((phrase) => lower.includes(phrase))) return GLYPHS[key];
  }

  return GLYPHS.check;
}

export function ItemGlyph({ text }: { text: string }) {
  return resolve(text);
}

/* The hub of the diagram: the matched specialist the signals lead to and the outcomes come from. */
export function RoleGlyph() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="14" cy="10.4" r="4.2" />
    <path d="M6.2 22.6c1.3-4 4.3-6.1 7.8-6.1s6.5 2.1 7.8 6.1" />
    <path d="M21.4 6.2 23.9 8.7 21.4 11.2" opacity="0.55" />
      <path d="M6.6 6.2 4.1 8.7l2.5 2.5" opacity="0.55" />
    </svg>
  );
}

import type { ReactNode } from 'react';

/* Shared line icons.

   These replace the typed characters that used to stand in for icons across the site — → ↗ ← + ▶.
   A character falls back to whatever font happens to load, sits on the text baseline rather than the
   optical centre, and changes weight between the two themes; a stroke path does none of that.

   Every icon is a 24x24 box drawn in `currentColor` and sized in `em`, so it inherits the colour,
   size, hover transform and transition of whatever it sits in — the existing CSS keeps working, it
   just targets `.icon` instead of a `span`. Decorative by default: each one is `aria-hidden`, since
   in every current use the neighbouring text already carries the meaning.

   Stroke weight follows the size. The inline marks render at around 1em next to running text and
   take 2; the feature icons (hero figures, About values, contact details) render at 1.5-2.5rem and
   take 1.7, matching StageGlyphs and ItemGlyphs. */

function Icon({ children, className, weight = 2, viewBox = '0 0 24 24' }: { children: ReactNode; className?: string; weight?: number; viewBox?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* --- Inline marks, in place of → ↗ ← + ▶ --- */

export function ArrowRight({ className }: { className?: string }) {
  return <Icon className={className}><path d="M4 12h14" /><path d="m12.5 6 6 6-6 6" /></Icon>;
}

export function ArrowLeft({ className }: { className?: string }) {
  return <Icon className={className}><path d="M20 12H6" /><path d="m11.5 6-6 6 6 6" /></Icon>;
}

export function ArrowUpRight({ className }: { className?: string }) {
  return <Icon className={className}><path d="M7 17 17 7" /><path d="M8.5 7H17v8.5" /></Icon>;
}

/* The accordion toggle. CSS rotates it 45 degrees when the panel opens, turning it into a close
   mark, so the two strokes have to be the same length and centred. */
export function PlusMark({ className }: { className?: string }) {
  return <Icon className={className}><path d="M12 5.5v13" /><path d="M5.5 12h13" /></Icon>;
}

export function PlayMark({ className }: { className?: string }) {
  return (
    <svg className={className ? `icon ${className}` : 'icon'} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8.5 5.6a.6.6 0 0 1 .92-.5l8.1 5.9a.6.6 0 0 1 0 1l-8.1 5.9a.6.6 0 0 1-.92-.5Z" />
    </svg>
  );
}

/* --- Contact details --- */

export function PhoneIcon({ className }: { className?: string }) {
  return <Icon className={className} weight={1.7}><path d="M6.4 3.6h3.1l1.5 3.9-2 1.4a12.3 12.3 0 0 0 6.1 6.1l1.4-2 3.9 1.5v3.1a1.8 1.8 0 0 1-2 1.8C11.7 18.8 5.2 12.3 4.6 5.6a1.8 1.8 0 0 1 1.8-2Z" /></Icon>;
}

export function MailIcon({ className }: { className?: string }) {
  return <Icon className={className} weight={1.7}><rect x="3" y="5.4" width="18" height="13.2" rx="1.8" /><path d="m3.8 6.8 8.2 6 8.2-6" /></Icon>;
}

export function PinIcon({ className }: { className?: string }) {
  return <Icon className={className} weight={1.7}><path d="M12 21.2c4.2-4.6 6.3-8 6.3-10.4a6.3 6.3 0 1 0-12.6 0c0 2.4 2.1 5.8 6.3 10.4Z" /><circle cx="12" cy="10.6" r="2.4" /></Icon>;
}

export function BuildingIcon({ className }: { className?: string }) {
  return <Icon className={className} weight={1.7}><path d="M4.2 20.4V5.4a1.4 1.4 0 0 1 1.4-1.4h8.2a1.4 1.4 0 0 1 1.4 1.4v15" /><path d="M15.2 10.2h3.2a1.4 1.4 0 0 1 1.4 1.4v8.8" /><path d="M3 20.4h18" /><path d="M7.6 8h4M7.6 12h4M7.6 16h4" /></Icon>;
}

/* --- The four hero figures, in order. Like the stage glyphs these are fixed and named, so the icon
       belongs to the figure rather than to the position it happens to occupy.

       Kept private and reached through a component, because ESLint's `react-refresh/only-export-
       components` warns as soon as a file exports both components and a plain array. --- */

const HERO_STAT_GLYPHS = [
  /* 15+ years of helping Australian businesses */
  <Icon key="years" weight={1.7}><rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2" /><path d="M3.4 9.8h17.2M8.2 3.2v4M15.8 3.2v4" /><path d="m9 15.1 2.2 2.2 4.2-4.6" /></Icon>,
  /* Top 5% hiring selection and requirements */
  <Icon key="top" weight={1.7}><circle cx="12" cy="9.4" r="5.8" /><path d="m8.4 14.4-1.6 6.4 5.2-2.8 5.2 2.8-1.6-6.4" /><path d="m10.2 9.3 1.3 1.4 2.5-2.7" /></Icon>,
  /* 12 months no-questions replacement guarantee */
  <Icon key="swap" weight={1.7}><path d="M4.2 9.2h13.4" /><path d="m14.4 5.6 3.6 3.6-3.6 3.6" /><path d="M19.8 15.2H6.4" /><path d="m9.6 11.6-3.6 3.6 3.6 3.6" /></Icon>,
  /* 100% managed: HR, payroll, and ongoing team support */
  <Icon key="managed" weight={1.7}><circle cx="9.4" cy="8.8" r="3.6" /><path d="M3.2 19.6c.9-3.4 3.3-5.3 6.2-5.3s5.3 1.9 6.2 5.3" /><path d="M16.2 6a3.3 3.3 0 0 1 0 5.8" /><path d="M18.1 14.1c2 .8 3.3 2.4 3.6 4.6" /></Icon>,
];

export function HeroStatIcon({ index }: { index: number }) {
  return HERO_STAT_GLYPHS[index] ?? null;
}

/* --- The four About values, in order: Clarity, Accountability, Consistency, Client Care. --- */

const VALUE_GLYPHS = [
  /* Clarity — clear expectations, set out before the work starts. */
  <Icon key="clarity" weight={1.7}><path d="M9.2 18.4h5.6" /><path d="M10 21.2h4" /><path d="M12 3.2a6.2 6.2 0 0 1 3.7 11.2v1.2H8.3v-1.2A6.2 6.2 0 0 1 12 3.2Z" /></Icon>,
  /* Accountability — owning the support given, and following through. */
  <Icon key="accountability" weight={1.7}><path d="M12 3.2 20 6v6.1c0 4.1-3 7.2-8 8.7-5-1.5-8-4.6-8-8.7V6Z" /><path d="m8.8 12 2.3 2.3 4.3-4.7" /></Icon>,
  /* Consistency — the same steady process, kept up over time. */
  <Icon key="consistency" weight={1.7}><path d="M20.4 12a8.4 8.4 0 1 1-2.7-6.2" /><path d="M20.4 4.2v4.4H16" /><path d="M12 8v4.4l3 1.8" /></Icon>,
  /* Client Care — staying involved after the role begins. */
  <Icon key="care" weight={1.7}><path d="M12 20.2c-4.6-3-7.2-5.8-7.2-9a3.9 3.9 0 0 1 7.2-2.1 3.9 3.9 0 0 1 7.2 2.1c0 3.2-2.6 6-7.2 9Z" /></Icon>,
];

export function ValueIcon({ index }: { index: number }) {
  return VALUE_GLYPHS[index] ?? null;
}

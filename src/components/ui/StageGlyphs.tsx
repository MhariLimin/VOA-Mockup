/* One icon per managed-support stage, shared by the home page journey diagram and the /how-it-works
   stage medallions. The four stages are fixed and named, so unlike the service-page fit statements
   these icons carry real meaning rather than being generic marks — and the same stage must not be
   given a different symbol on each page. Order matches processContent.ts / moreThanRecruitment. */
export const stageGlyphs = [
  /* Consulting & Role Planning */
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" key="plan">
    <path d="M11 5h10v3H11z" /><path d="M21 6.5h3.5v20h-17v-20H11" />
    <path d="M11.5 14h9M11.5 18.5h9M11.5 23h5.5" />
  </svg>,
  /* Sourcing & Candidate Matching. The person sits inside the lens rather than under it: the earlier
     version put a lone shoulder arc outside the circle, which read as a figure missing one side. */
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" key="match">
    <circle cx="14" cy="13.5" r="8.5" /><path d="m20.2 19.7 5.8 5.8" />
    <circle cx="14" cy="10.5" r="2.2" />
    <path d="M10 18.2c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8" />
  </svg>,
  /* Onboarding & Integration */
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" key="onboard">
    <path d="M6.5 8.5h12v15h-12z" /><path d="M13 16h12.5" /><path d="m21.5 12 4.5 4-4.5 4" />
  </svg>,
  /* Ongoing Delivery & Support */
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" key="support">
    <path d="M26 16a10 10 0 1 1-3.2-7.3" /><path d="M26 6v5h-5" />
    <path d="M16 11.5v5l3.5 2" />
  </svg>,
];

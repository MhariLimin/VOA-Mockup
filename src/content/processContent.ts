export interface ProcessStage {
  number: string;
  title: string;
  summary: string;
  checkpoints: readonly string[];
}

/* "From Role Planning to Ongoing Support", verbatim from HR-Managed Virtual Support.pdf in
   docs/updated_src. /how-it-works renders it in full; the home page shows the summaries only. */
export const processIntro = {
  eyebrow: 'End-to-end support',
  heading: 'From role planning to ongoing support.',
  text: 'The entire HR-managed virtual support solution is built around defining the role, matching the right person, and supporting the business long-term.',
} as const;

export const processStages: readonly ProcessStage[] = [
  {
    number: '01',
    title: 'Consulting & Role Planning',
    summary: 'Talk to our team and define what the role needs to achieve before candidate matching begins.',
    checkpoints: ['Role scope and task priorities', 'Working hours and reporting lines', 'Industry and system requirements'],
  },
  {
    number: '02',
    title: 'Sourcing & Candidate Matching',
    summary: 'We assess candidates against the experience and working requirements of the virtual assistant role.',
    checkpoints: ['Focused candidate sourcing', 'Interviews and experience checks', 'Relevant shortlist for your review'],
  },
  {
    number: '03',
    title: 'Onboarding & Integration',
    summary: 'After hiring, we prepare your virtual assistant to work within your business structure and established procedures.',
    checkpoints: ['Role and business orientation', 'Systems and access checklist', 'Communication and reporting'],
  },
  {
    number: '04',
    title: 'Ongoing Delivery & Support',
    summary: 'Maintain the employment and support structure around your virtual assistant after they start.',
    checkpoints: ['HR and payroll administration', 'Day-to-day performance support', 'Team Leader and Client Care support'],
  },
];

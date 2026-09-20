export interface ProcessStage {
  number: string;
  title: string;
  summary: string;
  detail: string;
  checkpoints: readonly string[];
}

/* The "More than recruitment" section from the Virtual Office Angels content proposal, kept to the
   letter: stage names, one-line summaries, detail paragraphs and checkpoints. The /how-it-works
   page renders it in the source's expandable format; the home page shows the summaries only. */
export const processStages: readonly ProcessStage[] = [
  {
    number: '01',
    title: 'Support planning',
    summary: 'Clarify the role before recruitment starts.',
    detail: 'We review the work that needs attention, the systems involved and the experience required.',
    checkpoints: ['Role scope and task priorities', 'Working hours and communication expectations', 'Industry and software requirements'],
  },
  {
    number: '02',
    title: 'Specialist matching',
    summary: 'Assess capability, experience and working fit.',
    detail: 'We screen candidates against the practical demands of your role, then present a focused shortlist for your review.',
    checkpoints: ['Relevant industry background', 'Systems and task capability', 'Communication and work-style alignment'],
  },
  {
    number: '03',
    title: 'Onboarding & integration',
    summary: 'Prepare the person and the working relationship.',
    detail: 'We help establish expectations, reporting lines and the initial working rhythm while your business provides its role-specific processes and approvals.',
    checkpoints: ['Role briefing and business orientation', 'Access and workflow checklist', 'Communication and review cadence'],
  },
  {
    number: '04',
    title: 'Ongoing delivery support',
    summary: 'Keep performance and communication on track.',
    detail: 'A dedicated support structure helps address feedback, availability and performance matters throughout the engagement.',
    checkpoints: ['Client care contact', 'Team leader and performance support', 'Replacement pathway and optional backup support'],
  },
];

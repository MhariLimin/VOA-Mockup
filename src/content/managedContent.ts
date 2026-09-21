/* The managed virtual support page of the Virtual Office Angels content proposal, shared between
   the home page Why band and the /why-voa page. The four support stages live in processContent.ts,
   on /how-it-works, so the two pages do not repeat each other. */
export const ownershipSplit = [
  {
    label: 'Stays with you',
    heading: 'Your business manages',
    summary: 'The priorities, instructions, and decisions specific to your organisation.',
    items: [
      'Daily tasks and business priorities',
      'Documented processes and approvals',
      'System access and quality standards',
      'Role-specific feedback and outcomes',
    ],
  },
  {
    label: 'Managed for you',
    heading: 'Virtual Office Angels manages',
    summary: 'The employment and support responsibilities surrounding the role.',
    items: [
      'Recruitment and employment administration',
      'Payroll and HR support',
      'Onboarding and role check-ins',
      'Client care and performance support',
    ],
  },
] as const;

/* Text below is taken verbatim from HR-Managed Virtual Support.pdf in docs/updated_src. */
export const managedSupportPage = {
  heroLead: 'Build a specialised virtual assistant role around the work your business needs. Virtual Office Angels manages recruitment, onboarding, employment administration, payroll, and ongoing people support, while you manage day-to-day operations.',
  definition: [
    'HR-managed virtual support combines a dedicated virtual assistant with ongoing employment and people support from Virtual Office Angels. Your business directs the work, while our team manages recruitment, onboarding, payroll, HR administration, and ongoing client care.',
    'The role is built around the responsibilities, systems, and experience your business requires, rather than matching you with a virtual assistant and leaving you to manage the rest.',
  ],
  includesLabel: 'What VOA manages',
  includes: [
    'Role scope and candidate requirements',
    'Recruitment and experience assessment',
    'Employment administration and payroll',
    'Onboarding and role integration',
    'HR and leave administration',
    'Client care and performance support',
  ],
  ownershipIntro: 'Your business directs the day-to-day work. Virtual Office Angels manages employment and provides ongoing support around the virtual assistant.',
  questionsIntro: 'Answers to common questions about HR-managed virtual support.',
  questions: [
    ['How is HR-managed virtual support different from hiring a freelancer?', 'With a freelancer, your business typically handles selection, agreements, onboarding, and the working relationship directly. HR-managed virtual support includes structured role planning, candidate assessment, employment administration, payroll, HR, and ongoing support from Virtual Office Angels.'],
    ['Can the role require industry or software experience?', 'Yes. The role can include the industry knowledge, software experience, and working hours your business requires. We assess candidates against those needs before you review the shortlist. Final suitability depends on the role and available candidate experience.'],
  ],
} as const;

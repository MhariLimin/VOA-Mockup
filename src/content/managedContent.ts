/* The managed virtual support page of the Virtual Office Angels content proposal, shared between
   the home page Why band and the /why-voa page. The four support stages live in processContent.ts,
   on /how-it-works, so the two pages do not repeat each other. */
export const ownershipSplit = [
  {
    label: 'Stays with you',
    heading: 'Your business manages',
    summary: 'The priorities, instructions and decisions specific to your organisation.',
    items: [
      'Daily tasks and business priorities',
      'Documented procedures and approvals',
      'Access permissions and quality standards',
      'Role-specific feedback and outcomes',
    ],
  },
  {
    label: 'Managed for you',
    heading: 'Virtual Office Angels manages',
    summary: 'The people, employment and support responsibilities surrounding the role.',
    items: [
      'Recruitment and employment administration',
      'Payroll, leave and HR support',
      'IT coordination and working continuity',
      'Client care and performance support',
    ],
  },
] as const;


export const managedSupportPage = {
  heroLead: "An HR-managed virtual support solution gives your business a specialised virtual assistant backed by role planning, recruitment, onboarding and ongoing employment support.",
  heroTags: ["Role-first planning", "Specialised matching", "Ongoing support"],
  definition: [
    "It is a complete staffing relationship rather than a candidate introduction. Virtual Office Angels helps define the position, assesses applicants against the work and systems involved, supports onboarding and remains involved after placement.",
    "The model gives Australian businesses access to professional virtual assistant services while reducing the internal administration attached to recruiting and supporting remote staff.",
  ],
  includesLabel: "What VOA manages",
  includesHeading: "Support around the person and the role",
  includes: [
    "Role scope and candidate requirements",
    "Recruitment and experience assessment",
    "Employment administration and payroll",
    "Onboarding and IT coordination",
    "Performance and client-care support",
    "Replacement pathway when required",
  ],
  ownershipIntro: "Your business remains in control of the work. Virtual Office Angels manages the employment relationship and support structure around the virtual assistant.",
  questionsIntro: "The final structure depends on the work, systems, experience and working relationship your business requires.",
  questions: [
    ["What is managed virtual support?", "Managed virtual support combines role planning, candidate matching, onboarding and ongoing employment support around a virtual assistant. Your business directs the work while Virtual Office Angels manages HR, payroll, IT and team support."],
    ["How is this different from hiring a freelance virtual assistant?", "The service continues after recruitment. Virtual Office Angels remains involved in the employment relationship, onboarding support, payroll, HR administration, IT coordination and performance support."],
    ["Who manages the virtual assistant’s daily priorities?", "Your business sets the role’s priorities, workflows, approvals and expected outcomes. Virtual Office Angels manages the employment and support structure around the person."],
    ["Can the role require industry or software experience?", "Yes. Role planning documents the terminology, tasks, systems and level of experience required before candidates are assessed and shortlisted."],
  ],
} as const;

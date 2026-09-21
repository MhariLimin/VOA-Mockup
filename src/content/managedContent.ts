/* The managed virtual support page of the Virtual Office Angels content proposal, shared between
   the home page Why band and the /why-voa page. The four support stages live in processContent.ts,
   on /how-it-works, so the two pages do not repeat each other. */
export const ownershipSplit = [
  {
    label: 'Stays with you',
    heading: 'Your business manages',
    summary: 'The priorities, instructions and decisions specific to your organisation.',
    items: [
      'Day-to-day tasks and priorities',
      'Role brief and performance expectations',
      'Business processes and approval authorities',
      'Access, tools, and working standards',
    ],
  },
  {
    label: 'Managed for you',
    heading: 'Virtual Office Angels manages',
    summary: 'The people, employment and support responsibilities surrounding the role.',
    items: [
      'Employment administration and payroll',
      'HR support and employee relations',
      'Onboarding and IT setup',
      'Virtual assistant performance and continuity',
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
    "Role scope and position brief",
    "Candidate sourcing and screening",
    "Employment administration (contracts, compliance, payroll)",
    "Onboarding and induction",
    "HR support and performance management",
    "Virtual assistant continuity (replacement, cover)",
  ],
  ownershipIntro: "Your business remains in control of the work. Virtual Office Angels manages the employment relationship and support structure around the virtual assistant.",
  questionsIntro: "The final structure depends on the work, systems, experience and working relationship your business requires.",
  questions: [
    ["What is an HR-managed virtual support solution?", "An HR-managed virtual support solution is a complete staffing arrangement for a remote virtual assistant. It includes role planning, candidate recruitment, employment administration, onboarding, payroll, HR support and ongoing client care — all managed by Virtual Office Angels."],
    ["How is this different from hiring a freelance virtual assistant?", "A freelance arrangement typically ends at hiring. Our model continues through onboarding, employment administration, payroll, HR support and performance management. You keep control of the work while we manage the employment relationship."],
  ],
} as const;

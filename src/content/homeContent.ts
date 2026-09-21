export const heroStats = [
  ['15+ years', 'of helping Australian businesses'],
  ['Top 5%', 'hiring selection and requirements'],
  ['12 months', 'No-questions replacement guarantee'],
  ['100% managed', 'HR, payroll, and ongoing team support'],
] as const;

/* Card systems lists are trimmed to keep the six cards visually even; each service page carries
   the complete list from the content proposal. */
export const specialistServices = [
  { title: 'Mortgage & Loans', href: '/services/mortgage-loans', text: 'Loan-processing and broker administration support.', image: '/assets/source/staging/images/450ffd4688-Virtual-Mortgage-and-Loans-Processing-Support.jpg', systems: ['Connective', 'Mercury', 'Symmetry', 'AdviserLogic'] },
  { title: 'Financial Planning', href: '/services/financial-planning', text: 'Application, document, and client administration.', image: '/assets/source/staging/images/07e6930800-Financial-Planning-Assistance-and-Administration.jpg', systems: ['Xplan', 'Risk Researcher', 'CALM', 'AdviserLogic'] },
  { title: 'Accounting & Bookkeeping', href: '/services/accounting-bookkeeping', text: 'Reliable recurring finance and bookkeeping assistance.', image: '/assets/source/staging/images/35b7d60f62-man-working-his-laptop-with-infographics-indoors-1024x599.jpg', systems: ['Xero', 'Saasu', 'MYOB'] },
  { title: 'Real Estate', href: '/services/real-estate-conveyancing', text: 'CRM, documentation, scheduling, and back-office support.', image: '/assets/source/staging/images/c01de0662c-Real-Estate-And-Administration-Support.jpg', systems: ['your property CRM', 'email and administration platforms'] },
  { title: 'Executive & Administrative', href: '/services/back-office-admin', text: 'Everyday operational support that protects your focus.', image: '/assets/source/staging/images/6f63e14c16-2149013955.jpg', systems: ['Your CRM', 'Microsoft 365 or Google Workspace', 'Task-management tools'] },
  { title: 'Digital Marketing', href: '/services/digital-marketing', text: 'Campaign, publishing, reporting, and content coordination.', image: '/assets/source/staging/images/a42c53bde4-2147924352-1024x683.jpg', systems: ['Google Analytics', 'Facebook and Instagram', 'Your CMS'] },
] as const;

/* Homepage FAQs, verbatim from the VOA Content homepage (saved state). Where an answer ends in a link,
   `answer` holds the text before it and `link` the linked words; the sentence closes with a full stop. */
export const buyerQuestions: readonly { question: string; answer: string; link?: { label: string; href: string } }[] = [
  { question: 'What can a virtual assistant do for an Australian business?', answer: 'A virtual assistant can support repeatable business processes such as administration, client follow-up, CRM updates, document preparation, bookkeeping support, loan processing administration and marketing execution. The right scope depends on your industry, systems and internal approval requirements. See our', link: { label: 'specialised virtual assistant services', href: '/services' } },
  { question: 'What tasks can I delegate to a virtual assistant?', answer: 'Delegate clearly documented, repeatable tasks with defined inputs, outputs and approval steps. Common examples include inbox and calendar management, data entry, reporting preparation, customer follow-up, file management, CRM administration and sector-specific processing support.' },
  { question: 'Should I hire a general or specialised virtual assistant?', answer: 'Choose a general virtual assistant for broad, lower-complexity administration. Choose a specialised virtual assistant when the role requires industry terminology, specific software, regulated workflows or experience handling technical documents. A specialist can begin with a stronger understanding of how the work fits into your business.' },
  { question: 'How are virtual assistants matched to a business?', answer: 'Virtual Office Angels first reviews the role, tasks, systems, required experience and working preferences. Candidates are then assessed against those requirements. You meet the shortlisted professional before confirming the match. Read more about', link: { label: 'how our matching process works', href: '/why-voa' } },
  { question: 'When should a growing business hire a virtual assistant?', answer: 'Consider hiring when recurring work delays client service, revenue-generating activity or important follow-up, and the workload is consistent enough to define as a role. It is also a strong signal when senior employees regularly complete administrative tasks that could be handled by an experienced support professional.' },
];

/* "More than recruitment" section, verbatim from the VOA Content homepage (saved state). */
export const moreThanRecruitment = {
  intro: 'At Virtual Office Angels, you receive more than a candidate list. Our team helps define the role, assesses the match, and supports the working relationship after placement.',
  stages: [
    { name: 'Consulting & Planning', heading: 'Clarify the role before recruitment starts.', text: 'We review the work that needs attention, the systems involved and the experience required.' },
    { name: 'Sourcing & Matching', heading: 'Assess capability, experience and working fit.', text: 'We screen candidates against the practical demands of your role, then present a focused shortlist for your review.' },
    { name: 'Onboarding & Integration', heading: 'Prepare the new hire and the working conditions.', text: 'We help establish expectations, reporting lines and the initial working rhythm while your business provides its role-specific processes and approvals.' },
    { name: 'Ongoing Delivery & Support', heading: 'Keep performance and communication on track.', text: 'A dedicated support structure helps address feedback, availability, and performance matters throughout the engagement.' },
  ],
} as const;

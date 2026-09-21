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

export const buyerQuestions = [
  ['How is a virtual assistant selected?', 'Virtual Office Angels identifies your role requirements and screens suitable candidates for skills and working fit.'],
  ['Do I manage recruitment myself?', 'No. Recruitment and matching are part of the Virtual Office Angels managed service.'],
  ['What work can I delegate?', 'The source offering covers finance, property, administration, marketing, sales, creative, and technology support.'],
  ['How do I get started?', 'Contact Virtual Office Angels to discuss the role, tasks, systems, hours, and support you need.'],
] as const;

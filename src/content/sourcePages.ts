export interface SourcePageBrief {
  path: string;
  eyebrow: string;
  title: string;
  summary: string;
  template: 'about' | 'services' | 'service' | 'process' | 'why' | 'stories' | 'insights' | 'videos' | 'faqs' | 'contact';
  tasks?: readonly string[];
  detail?: readonly string[];
  image?: string;
  imageAlt?: string;
  source?: 'staging' | 'production';
}

const service = (
  path: string,
  title: string,
  summary: string,
  tasks: readonly string[],
  detail: readonly string[],
  source: 'staging' | 'production' = 'staging',
  image?: string,
): SourcePageBrief => ({ path, eyebrow: 'Specialist service', title, summary, tasks, detail, template: 'service', source, image, imageAlt: `${title} workspace` });

export const sourcePages: readonly SourcePageBrief[] = [
  {
    path: '/services', eyebrow: 'Specialised virtual assistant services', title: 'Specialised Virtual Assistant Services for Australian Businesses',
    summary: 'Virtual Office Angels provides experienced virtual assistants for Australian businesses across finance, property, administration, marketing, technology and content.',
    image: '/assets/source/staging/images/7e3d82f785-2148908840.jpg', imageAlt: 'A business owner meeting a remote team by video call',
    template: 'services',
  },
  {
    path: '/about', eyebrow: 'About Virtual Office Angels', title: 'Born from HR expertise. Built to make business life easier.',
    summary: 'A carefully matched and managed virtual staffing service shaped by Australian human resources experience.',
    detail: ['Founded in 2010', 'Australian-owned and managed', 'Specialist professionals based in the Philippines'],
    image: '/assets/source/staging/images/feeae1b697-Anne-Villavieja.jpg', imageAlt: 'Anne Villavieja, founder of Virtual Office Angels', template: 'about',
  },
  service('/services/mortgage-loans', 'Mortgage and loans processing support', 'Accurate, process-focused assistance for mortgage brokers—from application preparation through to settlement.', ['CRM data entry and file setup', 'Serviceability calculations and lender research', 'Document collection and compliance checks', 'Valuations, lodgement, and settlement follow-up', 'Borrower and broker progress updates'], ['Mortgage processing demands accuracy, focus, and consistent follow-through.', 'A matched lending specialist can take on repetitive administration so brokers have more time for client relationships and business development.'], 'staging', '/assets/source/staging/images/450ffd4688-Virtual-Mortgage-and-Loans-Processing-Support.jpg'),
  service('/services/financial-planning', 'Financial planning assistance and administration', 'Experienced operational support for financial planning practices and their recurring client workflows.', ['Application and document preparation', 'Meeting and client administration', 'CRM and database maintenance', 'Implementation follow-up', 'Recurring back-office processes'], ['Time spent on routine administration can pull advisers away from client strategy and relationship building.', 'Virtual Office Angels matches support professionals to the practice, its systems, and the work that needs to be completed consistently.'], 'staging', '/assets/source/staging/images/07e6930800-Financial-Planning-Assistance-and-Administration.jpg'),
  service('/services/accounting-bookkeeping', 'Accounting and bookkeeping assistance', 'Recurring finance support from professionals familiar with common Australian accounting workflows.', ['Invoicing and payroll assistance', 'Accounts receivable and payable', 'Bank reconciliation', 'Balance sheet preparation support', 'Xero, Saasu, and MYOB workflows'], ['Accurate records and regular processing are essential to sound financial operations.', 'Matched assistants can support established processes and preferred accounting software under your business direction.'], 'staging', '/assets/source/staging/images/35b7d60f62-man-working-his-laptop-with-infographics-indoors-1024x599.jpg'),
  service('/services/real-estate-conveyancing', 'Real estate and administration support', 'Reliable assistance for property professionals balancing clients, listings, documents, and a busy schedule.', ['CRM data entry and maintenance', 'Lead generation and follow-up', 'Email and calendar management', 'Property and transaction documentation', 'General back-office administration'], ['Property professionals create the most value when they can focus on people, opportunities, and transactions.', 'Experienced support can keep recurring administration moving while respecting the accuracy and confidentiality the industry requires.'], 'staging', '/assets/source/staging/images/c01de0662c-Real-Estate-And-Administration-Support.jpg'),
  service('/services/back-office-admin', 'Business back office and admin support', 'Dependable day-to-day administration that protects your team’s time and keeps operations organised.', ['Executive and personal assistance', 'Client calls and customer support', 'Email, diary, and calendar management', 'Travel and event coordination', 'Data research and transcription', 'Insurance processing support'], ['Every growing business needs dependable operational support.', 'Virtual Office Angels recruits around your particular responsibilities, systems, hours, and working style.'], 'staging', '/assets/source/staging/images/6f63e14c16-2149013955.jpg'),
  service('/services/digital-marketing', 'Digital marketing support and services', 'Execution support that helps your brand publish consistently and keep campaigns organised.', ['Content and campaign coordination', 'Social media administration', 'Asset and publishing workflows', 'Reporting assistance', 'Database and marketing operations'], ['Good marketing depends on consistent execution as much as strategy.', 'A specialist assistant can support the recurring work behind campaigns while your internal team retains direction and approval.'], 'staging', '/assets/source/staging/images/a42c53bde4-2147924352-1024x683.jpg'),
  service('/services/sales-marketing', 'Sales and marketing support', 'Practical assistance for lead generation, customer communication, and sales administration.', ['Lead generation and research', 'Inbound and outbound support', 'CRM administration', 'Customer follow-up', 'Order and sales coordination'], ['This category appears on the production website and is retained for content parity.', 'Final scope and imagery should be confirmed before WordPress migration.'], 'production', '/assets/source/staging/images/20774279fe-job-5382501_1280.jpg'),
  service('/services/creative-copywriting', 'Creative writing assistance', 'Writing and publishing support for websites, campaigns, and recurring business content.', ['Website and campaign copy', 'Content preparation', 'Proofreading and editing support', 'Publishing assistance', 'Content library organisation'], ['This category appears on the production website and is retained for content parity.', 'Any published copy remains subject to the client’s subject-matter review and approval.'], 'production', '/assets/source/staging/images/9f1d7f532d-2150994380.jpg'),
  service('/services/it-technology', 'IT services and technology', 'Technical administration and systems support for technology-enabled business processes.', ['Website administration', 'Systems and account support', 'Technical documentation', 'Data and workflow maintenance', 'General technology assistance'], ['This category appears on the production website and is retained for content parity.', 'The precise technical scope, access controls, and service boundaries should be confirmed before launch.'], 'production', '/assets/source/staging/images/989ca88558-man-working-his-laptop-with-infographics-indoors-scaled.jpg'),
  { path: '/how-it-works', eyebrow: 'How it works', title: 'A clear path from role brief to managed support.', summary: 'Virtual Office Angels handles recruitment and matching, then stays involved through onboarding and the ongoing working relationship.', template: 'process' },
  {
    path: '/why-voa', eyebrow: 'Managed virtual support', title: 'HR-Managed Virtual Support for Australian Businesses',
    summary: 'An HR-managed virtual support solution gives your business a specialised virtual assistant backed by role planning, recruitment, onboarding and ongoing employment support.',
    image: '/assets/source/staging/images/13e3afc0dd-2796.jpg', imageAlt: 'A virtual assistant working at a desk',
    template: 'why',
  },
  {
    path: '/client-stories', eyebrow: 'Our clients', title: 'Client stories and testimonials.',
    summary: 'From boutique firms to growing enterprises, clients trust Virtual Office Angels to provide specialised virtual assistants who integrate into their teams.',
    template: 'stories',
  },
  { path: '/insights', eyebrow: 'Insights', title: 'Practical thinking for building better remote support.', summary: 'A searchable editorial destination based on the existing Virtual Office Angels article catalogue.', template: 'insights' },
  { path: '/videos', eyebrow: 'Videos and resources', title: 'Useful guidance, in a format that is easy to watch.', summary: 'A structured home for approved Virtual Office Angels videos, with room for captions, transcripts, and related reading.', template: 'videos' },
  { path: '/faqs', eyebrow: 'Frequently asked questions', title: 'Straight answers before you get started.', summary: 'Key operational questions and answers retained from the staging website and organised into an accessible format.', template: 'faqs' },
  { path: '/contact', eyebrow: 'Contact us', title: 'Tell us what the right support would change for your business.', summary: 'Share the role, responsibilities, systems, and working hours you have in mind. The Virtual Office Angels team can then discuss the next step.', template: 'contact' },
] as const;

export const servicePages = sourcePages.filter((page) => page.template === 'service');

/* City landing pages: a mockup for the SEO campaign, built for review. They are not linked from the
   navigation and have no WordPress equivalent yet.

   The owner asked for areas smaller than a state, so each page covers one city. The three cities, and
   every client below, come only from the current placements in the "VA & Client Info" sheet of
   260922-VOA Action Items Tracker.xlsx (sent 21 October 2026); Virtual Office Angels' own staff are
   left out. The reasoning is in docs/seo/LOCATION_LANDING_PAGES.md. Naming a client, or showing its
   logo, on a public page needs that client's permission first.

   Copy written for the mockup, not supplied by the client: the section headings, the client-count
   sentence, the hours panel items and the Brisbane and Melbourne placeholders. Everything else reuses
   existing site content. */
import { servicePages } from './sourcePages';

/* One VA placement: the client, and the service page that matches the VA's role. */
export interface Placement {
  client: string;
  suburb: string;
  industry: string;
  role: string;
  servicePath: string;
  /* A logo from the website's client library, where one exists. */
  image?: string;
}

export interface LocationPage {
  slug: string;
  name: string;
  /* The area the client list covers, when it is wider than the city itself. */
  area?: string;
  state: string;
  hours: readonly string[];
  placements: readonly Placement[];
  /* Local proof: the client case study is a consultancy in Epping, Sydney. Only Sydney has one. */
  caseStudy?: boolean;
}

const logo = (file: string) => `/assets/source/staging/images/${file}`;

const services = {
  admin: '/services/executive-and-administrative-virtual-assistance',
  marketing: '/services/digital-marketing-virtual-assistant-services',
  accounting: '/services/accounting-and-bookkeeping-virtual-assistant',
  planning: '/services/virtual-financial-planning-and-admin-assistant',
  mortgage: '/services/mortgage-loans-processing-virtual-support',
};

export const locationPages: readonly LocationPage[] = [
  {
    slug: 'sydney',
    name: 'Sydney',
    state: 'New South Wales',
    hours: [
      'Monday to Friday, 9am–5pm AEST: the same clock as your office',
      'Extra hours on weekends or holidays by prior arrangement',
      'An Australian-led team, with our office in Chatswood',
    ],
    placements: [
      { client: 'Road Surgeons', suburb: 'Botany', industry: 'Maintenance and repair', role: 'Admin Manager', servicePath: services.admin, image: logo('3c4a18231a-6.png') },
      { client: 'Industrias Services Group', suburb: 'Alexandria', industry: 'Facilities services', role: 'Operations Support', servicePath: services.admin },
      { client: 'Industrias Services Group', suburb: 'Alexandria', industry: 'Facilities services', role: 'Accountant/Bookkeeper', servicePath: services.accounting },
      { client: 'RedP Marketing', suburb: 'Revesby', industry: 'Marketing and advertising', role: 'Bing and Google Analyst', servicePath: services.marketing },
      { client: 'RedP Marketing', suburb: 'Revesby', industry: 'Marketing and advertising', role: 'Video Editor/Motion Graphic Artist', servicePath: services.marketing },
      { client: 'RedP Marketing', suburb: 'Revesby', industry: 'Marketing and advertising', role: 'Social Media & Community Management Assistant', servicePath: services.marketing },
      /* The library's "SureServ" logo is very likely this business: to confirm. */
      { client: 'Sureserve Financial Services', suburb: 'Woollahra', industry: 'Insurance services', role: 'Virtual Financial Planning Admin Assistant', servicePath: services.planning, image: logo('043e55e484-5.png') },
      /* The library's "Integra Consultancy" logo is very likely this business: to confirm. */
      { client: 'Integra Consulting', suburb: 'Eastwood', industry: 'Education work health and safety', role: 'Executive Administrative Assistant', servicePath: services.admin, image: logo('71d6f17985-3.png') },
      { client: 'Pool Aide', suburb: 'Lindfield', industry: 'Repair and maintenance', role: 'Admin and Accounts Specialist', servicePath: services.accounting, image: logo('ad6e09ce08-7.jpeg') },
      { client: 'Ressfin Total Lending Solution', suburb: 'Bondi Junction', industry: 'Mortgage broking', role: 'Loan Processor', servicePath: services.mortgage, image: logo('ff435dfa3f-9.png') },
    ],
    caseStudy: true,
  },
  {
    slug: 'brisbane',
    name: 'Brisbane',
    area: 'Brisbane and the Gold Coast',
    state: 'Queensland',
    hours: [
      'Monday to Friday, 9am–5pm AEST, Brisbane time',
      '[To confirm: hours while New South Wales is on daylight saving]',
      'Extra hours on weekends or holidays by prior arrangement',
    ],
    placements: [
      { client: 'Seet Advisory', suburb: 'Toowong', industry: 'Financial services', role: 'Virtual Financial Planner Support', servicePath: services.planning },
      { client: 'Coastal Financial Consultants', suburb: 'Helensvale, Gold Coast', industry: 'Mortgage broking', role: 'Virtual Loans Assistant/Mortgage Support', servicePath: services.mortgage },
    ],
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    state: 'Victoria',
    hours: [
      'Monday to Friday, 9am–5pm AEST, Melbourne time',
      'Victoria and New South Wales change to daylight saving together, so the hours stay the same',
      'Extra hours on weekends or holidays by prior arrangement',
    ],
    placements: [
      { client: 'Velar Finance', suburb: 'Doncaster East', industry: 'Mortgage broking', role: 'Loan Processor', servicePath: services.mortgage },
    ],
  },
];

/* Each client once, in sheet order, with its logo if any. */
export const locationClients = (page: LocationPage) =>
  page.placements.filter((placement, index) => page.placements.findIndex((other) => other.client === placement.client) === index);

/* The services this city's clients use, most VAs first; ties keep sheet order. */
export function locationServices(page: LocationPage) {
  const counts = new Map<string, number>();
  for (const { servicePath } of page.placements) counts.set(servicePath, (counts.get(servicePath) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .flatMap(([path]) => servicePages.filter((service) => service.path === path));
}

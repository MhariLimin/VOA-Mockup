export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  groups?: NavigationGroup[];
  summary?: NavigationSummary;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export interface NavigationSummary {
  kicker: string;
  heading: string;
  text: string;
  linkLabel: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    groups: [
      {
        label: 'Finance & property',
        items: [
          { label: 'Mortgage & Loans Processing', href: '/services/mortgage-loans' },
          { label: 'Financial Planning & Admin', href: '/services/financial-planning' },
          { label: 'Accounting & Bookkeeping', href: '/services/accounting-bookkeeping' },
          { label: 'Insurance Processing', href: '/services/insurance-processing' },
          { label: 'Real Estate & Admin', href: '/services/real-estate-conveyancing' },
        ],
      },
      {
        label: 'Business & growth',
        items: [
          { label: 'Executive & Administrative', href: '/services/back-office-admin' },
          { label: 'Digital Marketing', href: '/services/digital-marketing' },
          { label: 'Sales & E-Commerce', href: '/services/sales-marketing' },
          { label: 'IT Service & Technology', href: '/services/it-technology' },
          { label: 'Copywriting', href: '/services/creative-copywriting' },
        ],
      },
    ],
    summary: {
      kicker: 'Specialised experience',
      heading: 'Choose support that already understands the work.',
      text: 'Compare role scope, systems experience and the managed support included around each virtual assistant.',
      linkLabel: 'View all services',
      href: '/services',
    },
  },
  {
    label: 'Virtual Support',
    href: '/how-it-works',
    children: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Managed Virtual Support', href: '/why-voa' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'Articles & Blog', href: '/insights' },
      { label: 'Videos & Resources', href: '/videos' },
    ],
  },
  { label: 'FAQs', href: '/faqs' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About us', href: '/about' },
      { label: 'Client Stories & Testimonials', href: '/client-stories' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

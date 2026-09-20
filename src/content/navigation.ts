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
          { label: 'Mortgage & Loans Processing Support', href: '/services/mortgage-loans' },
          { label: 'Financial Planning & Admin Support', href: '/services/financial-planning' },
          { label: 'Accounting & Bookkeeping Support', href: '/services/accounting-bookkeeping' },
          { label: 'Real Estate & Admin Support', href: '/services/real-estate-conveyancing' },
        ],
      },
      {
        label: 'Business & growth',
        items: [
          { label: 'Back Office & Admin Support', href: '/services/back-office-admin' },
          { label: 'Digital Marketing Assistance', href: '/services/digital-marketing' },
          { label: 'Sales & Marketing Support', href: '/services/sales-marketing' },
          { label: 'IT Services & Technology', href: '/services/it-technology' },
          { label: 'Creative Writing Assistance', href: '/services/creative-copywriting' },
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

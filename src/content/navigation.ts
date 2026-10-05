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
          { label: 'Mortgage & Loans Processing', href: '/services/mortgage-loans-processing-virtual-support' },
          { label: 'Financial Planning & Admin', href: '/services/virtual-financial-planning-and-admin-assistant' },
          { label: 'Accounting & Bookkeeping', href: '/services/accounting-and-bookkeeping-virtual-assistant' },
          { label: 'Insurance Processing', href: '/services/insurance-processing-virtual-assistance' },
          { label: 'Real Estate & Admin', href: '/services/real-estate-virtual-assistant-services' },
        ],
      },
      {
        label: 'Business & growth',
        items: [
          { label: 'Executive & Administrative', href: '/services/executive-and-administrative-virtual-assistance' },
          { label: 'Digital Marketing', href: '/services/digital-marketing-virtual-assistant-services' },
          { label: 'Sales & E-Commerce', href: '/services/sales-and-e-commerce-virtual-assistant' },
          { label: 'IT Service & Technology', href: '/services/it-virtual-assistant-services' },
          { label: 'Copywriting', href: '/services/creative-copywriting-virtual-assistant' },
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
      { label: 'Managed Virtual Support', href: '/managed-virtual-support' },
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

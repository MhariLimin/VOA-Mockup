export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Services overview', href: '/services' },
      { label: 'Mortgage & Loans', href: '/services/mortgage-loans' },
      { label: 'Financial Planning', href: '/services/financial-planning' },
      { label: 'Accounting & Bookkeeping', href: '/services/accounting-bookkeeping' },
      { label: 'Real Estate & Conveyancing', href: '/services/real-estate-conveyancing' },
      { label: 'Back Office & Admin', href: '/services/back-office-admin' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Sales & Marketing', href: '/services/sales-marketing' },
      { label: 'Creative & Copywriting', href: '/services/creative-copywriting' },
      { label: 'IT & Technology', href: '/services/it-technology' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  {
    label: 'Why Virtual Office Angels',
    href: '/why-voa',
    children: [
      { label: 'Why Virtual Office Angels', href: '/why-voa' },
      { label: 'Client Stories & Testimonials', href: '/client-stories' },
      { label: 'FAQs', href: '/faqs' },
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
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about#story' },
      { label: 'Founder & Leadership', href: '/about#leadership' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

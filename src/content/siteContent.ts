export const siteContent = {
  hero: {
    eyebrow: 'Australian-managed specialist support',
    description:
      'Virtual Office Angels provides highly skilled virtual assistants for Australian businesses, matched to your industry, systems, and workflows. We manage recruitment, onboarding, HR, payroll, and day-to-day remote team support, so you can focus on acquiring more clients, profit, and growth.',
  },
} as const;

/* Specialist websites owned by Virtual Office Angels. Logos were downloaded from each site's header;
   descriptions are condensed from each site's own meta description. */
export const sisterSites = [
  {
    name: 'Virtual Financial Support',
    url: 'https://virtualfinancialsupport.com.au/',
    domain: 'virtualfinancialsupport.com.au',
    logo: '/assets/brands/virtual-financial-support.png',
    description: 'Specialised recruitment of virtual online support for financial planners, mortgage and insurance brokers, accountants and bookkeepers.',
  },
  {
    name: 'Virtual Loans Assistant',
    url: 'https://virtualloansassistant.com.au/',
    domain: 'virtualloansassistant.com.au',
    logo: '/assets/brands/virtual-loans-assistant.png',
    description: 'Online loans processing services through a team of professional, highly skilled and well-trained virtual assistants.',
  },
] as const;

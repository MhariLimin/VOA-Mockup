/* State landing pages: a mockup for the SEO campaign proposal of 19 October 2026, built for review.
   They are not linked from the navigation and have no WordPress equivalent yet.

   The two states are the ones where most of the 30 clients in the logo carousel are registered,
   from ABN Lookup (abr.business.gov.au) on 18 October 2026: 18 in New South Wales, 2 in
   Queensland. The full lookup is in docs/seo/STATE_LANDING_PAGES.md. Showing a client's logo on a
   public state page needs that client's permission first.

   Copy written for the mockup, not supplied by the client: the section headings, the hours panel
   items and the Queensland placeholders. Everything else reuses existing site content. */
import clientsSource from './source/staging/clients.json';
import { servicePages } from './sourcePages';

export interface StateClient {
  name: string;
  image: string;
}

export interface StatePage {
  slug: string;
  name: string;
  /* The state's own clock, named in the hours panel. */
  capital: string;
  clientCount: number;
  clients: readonly StateClient[];
  servicePaths: readonly string[];
  hours: readonly string[];
  /* Local proof: the client case study is a consultancy in Epping, NSW. Queensland has none yet. */
  caseStudy?: boolean;
}

/* Ten carousel logos were saved without a name; these are the names their artwork shows. */
const unnamedLogos: Record<string, string> = {
  '/assets/source/staging/images/e78ae24e62-2.jpeg': 'Air Exchange',
  '/assets/source/staging/images/4495fd83d7-4.png': 'Parrot Digital',
  '/assets/source/staging/images/3c4a18231a-6.png': 'Road Surgeons',
  '/assets/source/staging/images/ad6e09ce08-7.jpeg': 'Pool Aide',
  '/assets/source/staging/images/ff435dfa3f-9.png': 'RessFin',
  '/assets/source/staging/images/198b933a2c-10.png': 'BK Lending Solutions',
  '/assets/source/staging/images/9b67660c4e-11.png': 'ALRA',
};

function clientsFrom(images: readonly string[]): StateClient[] {
  return images.flatMap((image) => {
    const client = clientsSource.clients.find((entry) => entry.image === image);
    return client ? [{ name: client.name || unnamedLogos[image] || '', image }] : [];
  });
}

const logo = (file: string) => `/assets/source/staging/images/${file}`;

export const statePages: readonly StatePage[] = [
  {
    slug: 'new-south-wales',
    name: 'New South Wales',
    capital: 'Sydney',
    clientCount: 18,
    clients: clientsFrom([
      '5006e3ab08-Rezi-Finance-1.jpg', 'b68a16b74b-Jennings-Mortgages.png', '0d4c2f6253-Smart-Start-Financial.png',
      'ff435dfa3f-9.png', '198b933a2c-10.png', 'c53c5154c1-Vantage-Financial.jpg', '9b8b6c7038-Wealth-Focus.jpg',
      '94f2e4b12d-ACF-Group.png', '12344a00e8-OctopusBot.png', '04f76dfa9f-Sydney-Cabling.png', '29fc8ee8f3-GetIt-Installed.jpg',
      'e78ae24e62-2.jpeg', '3c4a18231a-6.png', '4495fd83d7-4.png', '9b67660c4e-11.png', 'b53e63daa9-SkyBlue-Dermatology.jpg',
      'ff1dd6e350-Cactus-Skin-Care.png', 'ad6e09ce08-7.jpeg',
    ].map(logo)),
    servicePaths: [
      '/services/mortgage-loans-processing-virtual-support',
      '/services/virtual-financial-planning-and-admin-assistant',
      '/services/accounting-and-bookkeeping-virtual-assistant',
    ],
    hours: [
      'Monday to Friday, 9am–5pm AEST: the same clock as your office',
      'Extra hours on weekends or holidays by prior arrangement',
      'An Australian-led team and a local point of contact',
    ],
    caseStudy: true,
  },
  {
    slug: 'queensland',
    name: 'Queensland',
    capital: 'Brisbane',
    clientCount: 2,
    clients: clientsFrom(['14a370dffb-Stratfund.png', '489c80dcf0-Thrifty-Money.png'].map(logo)),
    servicePaths: [
      '/services/mortgage-loans-processing-virtual-support',
      '/services/virtual-financial-planning-and-admin-assistant',
      '/services/real-estate-virtual-assistant-services',
    ],
    hours: [
      'Monday to Friday, 9am–5pm AEST, Brisbane time',
      '[To confirm: hours while New South Wales is on daylight saving]',
      'Extra hours on weekends or holidays by prior arrangement',
    ],
  },
];

export const stateServices = (state: StatePage) =>
  state.servicePaths.flatMap((path) => servicePages.filter((page) => page.path === path));

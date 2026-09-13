export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    name: 'Paul Godden',
    role: 'Managing Director, Vision Quest Video Productions',
    initials: 'PG',
    quote: 'With Anne’s expertise in HR Management, the process of hiring through Virtual Office Angels was both easy and efficient. My Virtual Assistant is outstanding! She saves me time, does a fantastic job and is proving invaluable to my business. As a result, I now have more time to attend to expanding the business and to tremendously increase the amount of money I can earn. Great service! Fantastic support! I unreservedly recommend the Virtual Office Angels services to anyone or any business that is struggling with time and needs quality and reliable support.',
  },
  {
    name: 'Paul Bradley',
    role: 'Branch General Manager, CRG (Elite Group)',
    initials: 'PB',
    quote: 'Being an Australian company and dealing with Virtual Office Angels, you get face to face with a person experienced in HR who can put a team together for you and custom fit it for your business. The service is excellent due to the team’s ability to select and get the right people for the right match—for each organisation. It has been an outstanding service!',
  },
  {
    name: 'Karen Robertson',
    role: 'Children’s Book Author, Treasure Kai series',
    initials: 'KR',
    quote: 'Thank you for all the work you have done. I have been working with Marie and she has been absolutely fantastic; she is very proactive and does her job very efficiently. Another good thing is that if Marie was not available, there was always backup on hand, so I had complete peace of mind working with Virtual Office Angels.',
  },
  {
    name: 'John Dwyer',
    role: 'Business Marketing Consultant and Owner, The Institute of Wow',
    initials: 'JD',
    quote: 'I have a 100% satisfaction rate with the wonderful service that I am receiving. I recommend that if you are looking for virtual assistance to help you grow your business, look no further than Virtual Office Angels. To me, they get 10 out of 10.',
  },
] as const;

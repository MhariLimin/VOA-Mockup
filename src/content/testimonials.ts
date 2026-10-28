export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
  /* The service pages whose feedback section shows this testimonial. */
  servicePaths?: readonly string[];
}

/* The first four are from the client testimonials tab of the action items tracker (column H, the
   SEO-keyword edit, 2026-10-28), with the clients' first names as the tracker gives them. The other
   four are from the source site. */
export const testimonials: readonly Testimonial[] = [
  {
    name: 'Kathryn',
    role: 'Industrias Service Group',
    initials: 'K',
    quote: 'An outstanding addition to our team! Their thoroughness and keen attention to detail have streamlined our day-to-day operation. Overall, their specialised virtual support has brought tremendous value to our business. Their flexibility, punctuality, and sound judgment give us complete confidence in the support we receive every day.',
  },
  {
    name: 'Rocky',
    role: 'Velar Finance',
    initials: 'R',
    servicePaths: ['/services/mortgage-loans-processing-virtual-support'],
    quote: 'The virtual support services we’ve received have been incredibly valuable to our business. From managing day-to-day administrative tasks to reducing our workload, their assistance has allowed us to save valuable time and focus more on client relationships and business development. As virtual loans assistants, their willingness to help, positive attitude, and responsiveness, along with the team’s excellent communication, have made the overall experience truly enjoyable.',
  },
  {
    name: 'Greg',
    role: 'Sureserve Financial Services',
    initials: 'G',
    servicePaths: ['/services/virtual-financial-planning-and-admin-assistant'],
    quote: 'For eight years, the consistent and reliable virtual financial support we’ve received has been invaluable in helping us scale our business. Having that level of stability has allowed our local team to continue growing, making our virtual assistant a truly valuable member of our team.',
  },
  {
    name: 'Steven',
    role: 'RessFin Total Lending Solutions',
    initials: 'S',
    servicePaths: ['/services/mortgage-loans-processing-virtual-support'],
    quote: 'We’ve been with Virtual Office Angels for 10 years, and the quality of their remote support for mortgage and loans processing has been excellent. Our long-standing relationship reflects the value of the services they provide.',
  },
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

/* The home page keeps its three source-site previews until the client chooses new ones. */
export const homeTestimonials = testimonials.slice(4, 7);

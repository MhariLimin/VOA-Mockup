export const sourceFaqs = [
  ['What is a Virtual Assistant?', 'A Virtual Assistant, remote worker, or virtual personal assistant is an independent professional providing administrative, website, social media, real estate, marketing, and/or technical services.'],
  ['What type of tasks can be executed by a Virtual Office Angels virtual assistant?', 'Our virtual assistants are computer savvy and can perform tasks that require no physical presence. A detailed list can be found on the Services page. If you need a specialised virtual assistant, get in touch so we can discuss options that may assist you.'],
  ['How would you know if your virtual assistant is working or not?', 'All our virtual assistants are required to be online through Microsoft Teams during their shifts and are monitored by their Team Leaders. A start-of-day report is sent once they log in, an end-of-day report is sent at the end of every shift, and updates are also sent every two hours during work shifts.'],
  ['How are accomplished tasks delivered?', 'A summary of completed tasks is sent by email, with attachments where applicable, at the end of every shift. Clients are also updated through Microsoft Teams as tasks are completed.'],
  ['Do you accept credit cards?', 'Yes, we accept all major credit cards and PayPal.'],
  ['What are the basic components covered by my investment?', 'Labour costs cover the time and services rendered by your virtual assistant, with costs varying according to skills and experience. Team Leaders manage groups of virtual assistants and communicate with clients. Management provides consultancy and guidance. Finance handles payroll and provides one bill and a monthly timesheet. Human Resources and Recruitment sources, screens, appoints, inducts, and manages your virtual worker.'],
  ['What are your business operating hours?', 'We follow Australian business hours from 9am–5pm AEST, Monday to Friday. Extra hours may be requested outside normal business hours or on weekends, subject to additional hourly fees.'],
  ['Can staff work on weekends or holidays for urgent tasks?', 'Extra hours on weekends or holidays may be accommodated with prior arrangement, subject to additional hourly fees.'],
  ['How are the communication skills of your staff?', 'All virtual assistants assigned to clients, including their Team Leaders, are highly proficient in English.'],
  ['How do you protect client privacy?', 'Virtual Office Angels values the confidentiality and privacy of every client. All virtual assistants assigned to clients sign a strict non-disclosure agreement. As part of the stated protocol, hard drives are inspected before onboarding and after a replacement, where necessary.'],
  ['How can we get in touch with our virtual assistant?', 'Clients may communicate with their assigned virtual assistants through Microsoft Teams or email.'],
  ['What is your satisfaction guarantee?', 'Assigned virtual assistants are managed by Team Leaders who monitor the tasks provided. Regular communication between Team Leaders, clients, and virtual assistants helps ensure tasks are completed according to each client’s specifications.'],
] as const;

/* Topic grouping for the FAQs page filter. Group labels are layout labels written for the prototype, not
   source copy; the questions they reference are the verbatim source FAQs above (by index). */
export const faqTopics = [
  { label: 'The service', questions: [0, 1, 11] },
  { label: 'Working with your virtual assistant', questions: [2, 3, 8, 10] },
  { label: 'Hours & availability', questions: [6, 7] },
  { label: 'Costs & privacy', questions: [4, 5, 9] },
] as const;

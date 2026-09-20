export interface ServiceDetail {
  title: string;
  lead: string;
  tags: readonly string[];
  scope: readonly (readonly [string, string])[];
  systems: readonly string[];
  fitHeading: string;
  fits: readonly string[];
  boundaryLabel: string;
  boundaryHeading: string;
  boundaryText: string;
  faqs: readonly (readonly [string, string])[];
}

/* Captured from the Virtual Office Angels content proposal. Hero leads are trimmed to their
   first sentence; everything else is the source copy verbatim. */
/* Task-based shortcuts from the content proposal's services index, for visitors who know the work
   they need covered but not which service it belongs to. */
export const serviceRouter: readonly (readonly [string, string])[] = [
  ['Loan files and settlements', '/services/mortgage-loans'],
  ['Advice administration', '/services/financial-planning'],
  ['Financial records and reconciliation', '/services/accounting-bookkeeping'],
  ['Property and CRM administration', '/services/real-estate-conveyancing'],
  ['Daily business administration', '/services/back-office-admin'],
  ['Campaign and content execution', '/services/digital-marketing'],
];

export const serviceDetails: Record<string, ServiceDetail> = {
  "/services/mortgage-loans": {
    title: "Mortgage Processing Virtual Assistant Support",
    lead: "Virtual Office Angels matches mortgage businesses with an experienced mortgage processing virtual assistant who can support application-to-settlement administration within your approved procedures.",
    tags: ["Application administration", "Broker CRM updates", "Settlement coordination"],
    scope: [
      ["CRM and file setup", "Create and maintain client records, application stages, notes and document status in the broker’s nominated CRM."],
      ["Document coordination", "Prepare checklists, follow up approved document requests and organise records for broker review."],
      ["Serviceability preparation", "Enter supplied information into approved calculators and prepare outputs for review by the mortgage broker."],
      ["Forms and valuations", "Coordinate valuation orders and prepare discharge, FHOG and other required forms using the brokerage’s process."],
      ["Lender research support", "Compile product or policy information against criteria supplied by the broker without making a credit recommendation."],
      ["Lodgement to settlement", "Support file lodgement, status tracking, stakeholder updates and settlement administration."],
    ],
    systems: ["Connective", "Mercury", "Podium", "Salestrekker", "Symmetry", "Flex", "AdviserLogic", "COIN"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Application administration is limiting the time available for client conversations.",
      "Files require more consistent document tracking and status updates.",
      "You need support from someone familiar with mortgage terminology and broker workflows.",
      "You want the employment relationship and day-to-day support managed by one provider.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant supports administration under your documented procedures. Credit decisions, product recommendations, responsible-lending judgements and regulated advice remain with the broker or appropriately authorised professional.",
    faqs: [
      ["What can a mortgage processing virtual assistant do?", "A mortgage processing virtual assistant can maintain CRM records, coordinate documents, prepare calculator inputs, organise forms, track lodgements and support settlement updates under the broker’s direction."],
      ["Can the virtual assistant work in our broker CRM?", "Yes. Matching considers the systems used by your business. VOA’s existing experience includes Connective, Mercury, Podium, Salestrekker, Symmetry, Flex, AdviserLogic and COIN."],
      ["Does the virtual assistant provide credit advice?", "No. The role supports mortgage administration. The broker retains responsibility for client advice, lender selection, credit decisions and regulatory obligations."],
    ],
  },
  "/services/financial-planning": {
    title: "Financial Planning Virtual Assistant Support",
    lead: "A financial planning virtual assistant supports advisers with client records, meeting preparation and advice administration under the direction of the licensed practice.",
    tags: ["Client administration", "Xplan support", "Meeting preparation"],
    scope: [
      ["Client record maintenance", "Update approved client details, file notes, workflow stages and outstanding actions in the practice system."],
      ["Meeting packs", "Collate existing client information, reports, handouts and supporting documents before adviser meetings."],
      ["Presentation preparation", "Format PowerPoint templates and supporting material using the practice’s approved content and branding."],
      ["Advice-document support", "Assist with data entry, formatting and document preparation under the instructions and review of an authorised adviser."],
      ["Appointment coordination", "Manage calendars, confirmations and approved follow-up communications for client meetings."],
      ["Implementation administration", "Track approved implementation actions, document receipt and workflow completion for adviser review."],
    ],
    systems: ["Xplan", "Risk Researcher", "WealthSolver", "CALM", "Midwinter", "AdviserLogic", "Microsoft Office"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Advisers are losing client time to repetitive administration.",
      "Meeting preparation and client records need a more consistent process.",
      "The role requires familiarity with financial-planning terminology and software.",
      "You need managed support around recruitment, payroll, IT and performance.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant provides administrative support to the practice. They do not provide personal financial advice, select strategies, make recommendations or replace the review and authorisation required from a licensed adviser.",
    faqs: [
      ["What does a financial planning virtual assistant support?", "A financial planning virtual assistant can maintain client records, prepare meeting packs, coordinate appointments, format approved advice documents and track implementation administration under adviser direction."],
      ["Can matching include Xplan experience?", "Yes. VOA considers your required systems during recruitment. Relevant experience may include Xplan modules such as Risk Researcher, WealthSolver and CALM, as well as Midwinter and AdviserLogic."],
      ["Can the virtual assistant provide financial advice?", "No. The virtual assistant supports administration. Advice, recommendations, strategy decisions and regulated sign-off remain with appropriately authorised professionals."],
    ],
  },
  "/services/accounting-bookkeeping": {
    title: "Accounting and Bookkeeping Virtual Assistant Support",
    lead: "An accounting and bookkeeping virtual assistant can support transaction records, invoicing, reconciliations and reporting preparation within your established controls.",
    tags: ["Reconciliation support", "Payables and receivables", "Reporting preparation"],
    scope: [
      ["Invoicing support", "Prepare and issue approved invoices, update payment status and maintain supporting records."],
      ["Accounts payable", "Organise supplier bills, enter approved information and prepare payment schedules for authorisation."],
      ["Accounts receivable", "Maintain debtor records and send approved payment reminders using the business’s communication process."],
      ["Payroll administration", "Prepare payroll inputs, employee records and supporting reports for review and approval."],
      ["Bank reconciliation", "Match transactions, flag exceptions and prepare reconciliation records for the nominated reviewer."],
      ["Reporting preparation", "Maintain ledgers and prepare balance-sheet or management-report inputs from approved source data."],
    ],
    systems: ["Xero", "MYOB", "Saasu", "Microsoft Excel", "Client document systems"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Transaction processing is taking time away from analysis or client service.",
      "Reconciliations and supporting records need more consistent attention.",
      "The business needs support familiar with its accounting platform.",
      "You want role continuity backed by managed HR, payroll and IT support.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant works within your approvals and internal controls. Tax advice, audit opinions, statutory sign-off and decisions reserved for a registered accountant, tax agent or business owner remain with those authorised parties.",
    faqs: [
      ["What can an accounting and bookkeeping virtual assistant do?", "They can support invoicing, payables, receivables, payroll administration, transaction entry, bank reconciliations and report preparation within the business’s approval process."],
      ["Which accounting platforms can be considered during matching?", "VOA can match for relevant software experience. The existing service scope identifies Xero, MYOB and Saasu, with other requirements discussed during role planning."],
      ["Who reviews and approves the work?", "Your nominated business owner, accountant or authorised reviewer retains approval and sign-off. The virtual assistant completes the assigned administration within those controls."],
    ],
  },
  "/services/real-estate-conveyancing": {
    title: "Real Estate Virtual Assistant Support",
    lead: "A real estate virtual assistant supports the recurring administration behind prospecting, client communication and property workflows.",
    tags: ["CRM administration", "Prospect follow-up", "Property documentation"],
    scope: [
      ["CRM upkeep", "Update contact details, lead stages, property notes, activities and approved follow-up dates."],
      ["Lead administration", "Research and organise prospect information, maintain lead lists and record outreach outcomes."],
      ["Approved follow-up", "Complete calls or messages using agency-approved scripts, processes and escalation rules."],
      ["Inbox and calendar support", "Sort enquiries, coordinate appointments and keep the team’s schedules current."],
      ["Listing administration", "Prepare draft listing information, organise media or documents and track required approvals."],
      ["Property file coordination", "Maintain checklists, supporting records and milestone updates across the agency workflow."],
    ],
    systems: ["Your property CRM", "Email and calendar platforms", "Cloud document storage", "Agency workflow tools"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Agents are spending too much selling time on CRM and inbox administration.",
      "Prospect records and approved follow-ups require consistent attention.",
      "Property files need clearer document and milestone tracking.",
      "The agency wants an experienced remote professional with managed support.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant follows the agency’s approved scripts, authorities and escalation process. Licensed activity, negotiation, legal interpretation and decisions requiring a local or authorised professional stay with the appropriate team member.",
    faqs: [
      ["What tasks can a real estate virtual assistant handle?", "A real estate virtual assistant can maintain CRM records, organise lead data, coordinate appointments, support approved follow-ups and maintain listing or property documentation."],
      ["Can the role be matched to our property CRM?", "Yes. VOA reviews the platforms and workflows used by your agency and includes relevant systems experience in the candidate requirements."],
      ["Will the virtual assistant replace licensed real estate work?", "No. The role supports administration. Licensed activity, negotiation, legal interpretation and local responsibilities remain with appropriately authorised staff."],
    ],
  },
  "/services/back-office-admin": {
    title: "Administrative Virtual Assistant Services",
    lead: "VOA’s administrative virtual assistant services provide experienced support for recurring business administration, executive coordination and customer workflows.",
    tags: ["Executive administration", "Inbox and calendar support", "Customer coordination"],
    scope: [
      ["Executive assistance", "Prepare schedules, action lists, meeting material and routine correspondence for business leaders."],
      ["Inbox management", "Sort messages, apply agreed priorities and prepare or send responses within approved guidelines."],
      ["Calendar coordination", "Organise appointments, meeting logistics, reminders and schedule changes."],
      ["Customer support", "Respond to routine enquiries, record issues and escalate requests using the business’s service process."],
      ["Research and data support", "Compile approved business information from sources such as LinkedIn, directories or internal records."],
      ["Document administration", "Support transcription, travel or event coordination, insurance administration and recurring back-office records."],
    ],
    systems: ["Your CRM", "Email and calendar platforms", "Microsoft 365 or Google Workspace", "Cloud document storage", "Task-management tools"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Leaders are carrying recurring administration that does not need their judgement.",
      "Customer, calendar or inbox tasks need dependable daily coverage.",
      "The role spans several connected back-office workflows.",
      "You want a right-fit professional without managing employment administration alone.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The role follows your documented permissions, approval levels and escalation points. Commercial commitments, legal decisions, sensitive approvals and work outside the agreed authority remain with your nominated team members.",
    faqs: [
      ["What is included in administrative virtual assistant services?", "The scope may include executive assistance, inbox and calendar management, customer coordination, research, transcription, travel support and recurring back-office records."],
      ["Can one role cover several administrative workflows?", "Yes, when the tasks require compatible skills and fit within a realistic workload. Role planning defines priorities, systems, working hours and approval levels before recruitment."],
      ["How is an administrative virtual assistant managed?", "VOA manages recruitment, onboarding, HR, payroll, IT and ongoing team support. Your business directs the role’s priorities, processes and expected outcomes."],
    ],
  },
  "/services/digital-marketing": {
    title: "Digital Marketing Virtual Assistant Support",
    lead: "A digital marketing virtual assistant supports the production, publishing and reporting work behind your marketing plan.",
    tags: ["Campaign administration", "Social publishing", "Analytics reporting"],
    scope: [
      ["Content production support", "Prepare approved graphics, videos, simple animations and campaign assets from supplied briefs."],
      ["Social media publishing", "Schedule and maintain approved posts across the platforms selected by the business."],
      ["Campaign coordination", "Maintain calendars, asset status, links, approvals and delivery checklists for digital campaigns."],
      ["Analytics reporting", "Compile traffic, engagement and campaign data into recurring reports for the marketing lead."],
      ["Website updates", "Upload approved page, article or media changes and complete routine content maintenance."],
      ["Search support", "Assist with approved SEO, search advertising and social optimisation tasks under the campaign owner’s direction."],
    ],
    systems: ["Google Analytics", "Facebook and Instagram", "TikTok", "YouTube", "Your CMS", "Approved design and campaign tools"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Campaign plans are ready but execution is inconsistent.",
      "Content publishing and reporting are taking strategic time from the marketing lead.",
      "The role requires a defined mix of channel and production experience.",
      "You need ongoing support around the person as well as the work.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant executes approved tasks and reports results. Brand strategy, budgets, claims, campaign approvals and access permissions remain with your authorised marketing or business lead.",
    faqs: [
      ["What can a digital marketing virtual assistant do?", "A digital marketing virtual assistant can support asset production, social publishing, campaign administration, analytics reporting, website updates and approved search-marketing tasks."],
      ["Can the role focus on selected channels?", "Yes. Matching starts with the channels, content formats, systems and level of production experience your marketing plan requires."],
      ["Who approves campaigns and published content?", "Your authorised marketing or business lead retains responsibility for strategy, budgets, claims, final approvals and platform permissions."],
    ],
  },
  "/services/sales-marketing": {
    title: "Sales and Marketing Virtual Assistant Support",
    lead: "A sales and marketing virtual assistant supports the recurring research, CRM, communication and order tasks around your revenue team.",
    tags: ["Lead research", "CRM administration", "Customer follow-up"],
    scope: [
      ["Lead research", "Build and maintain prospect lists using the markets, criteria and sources approved by the business."],
      ["CRM administration", "Update contact records, opportunity stages, activities, next steps and data-quality fields."],
      ["Inbound support", "Respond to routine enquiries, qualify required information and route opportunities to the right team member."],
      ["Approved outbound activity", "Complete calls or messages using approved scripts, contact rules and escalation points."],
      ["Order validation", "Check required order information, flag discrepancies and coordinate internal follow-up."],
      ["Order fulfilment support", "Maintain status records, customer updates and hand-offs across the approved fulfilment process."],
    ],
    systems: ["Your CRM", "Approved email and calling tools", "Lead-research sources", "Order-management platforms", "Reporting templates"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Leads are entering the business without consistent follow-up.",
      "CRM records need stronger accuracy and next-action discipline.",
      "Sales staff are spending too much time on research or order administration.",
      "You want process support backed by managed staffing.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant works from your approved scripts, offers, permissions and contact policies. Pricing decisions, commercial commitments, contract approval and regulated marketing responsibilities stay with authorised staff.",
    faqs: [
      ["What does a sales and marketing virtual assistant handle?", "The role can support lead research, CRM updates, approved inbound or outbound activity, customer administration, order validation and fulfilment coordination."],
      ["Can the role work with our existing sales process?", "Yes. Role planning documents your stages, systems, scripts, permissions, hand-offs and reporting expectations before matching begins."],
      ["Does the virtual assistant make commercial decisions?", "No. Pricing, contracts, commitments and other approval decisions remain with authorised members of your business."],
    ],
  },
  "/services/creative-copywriting": {
    title: "Copywriting Virtual Assistant Support",
    lead: "A copywriting virtual assistant supports research, drafting, editing and publishing from an approved brief and brand guidelines.",
    tags: ["Article support", "Website copy", "Proofreading and publishing"],
    scope: [
      ["Article drafting", "Prepare structured drafts from approved topics, sources, audience guidance and editorial briefs."],
      ["Website content", "Draft or update page copy around supplied positioning, service information and calls to action."],
      ["Proofreading", "Review grammar, consistency, spelling and formatting using the nominated English variant and style guide."],
      ["Content research", "Compile source material, questions and supporting information for review before drafting."],
      ["Blog administration", "Format approved articles, add supplied media and prepare posts in the content-management system."],
      ["Publishing support", "Maintain content calendars, version status, approvals and scheduled publication tasks."],
    ],
    systems: ["Your content-management system", "Shared document platforms", "Editorial calendars", "Research sources", "Brand and style guidelines"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Subject-matter experts have ideas but limited drafting time.",
      "Website and blog updates are being published inconsistently.",
      "Content needs a defined research, review and approval workflow.",
      "You need writing support matched to your audience and English style.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "The virtual assistant works from approved briefs and sources. Your business retains responsibility for factual claims, legal or compliance review, brand approval and final publication decisions.",
    faqs: [
      ["What can a copywriting virtual assistant produce?", "A copywriting virtual assistant can support articles, website copy, proofreading, research, blog administration and content publishing from approved briefs."],
      ["Can the writer follow our brand voice?", "Yes. Matching considers writing samples and relevant subject experience, while onboarding covers your audience, terminology, English variant, examples and approval process."],
      ["Who checks claims before publication?", "Your nominated reviewer retains responsibility for factual accuracy, legal or compliance checks, brand approval and the final decision to publish."],
    ],
  },
  "/services/it-technology": {
    title: "IT Virtual Assistant Services and Technology Support",
    lead: "An IT virtual assistant supports defined website, maintenance and technical-administration workflows within your access controls.",
    tags: ["Website maintenance", "WordPress support", "Technical administration"],
    scope: [
      ["Website updates", "Implement approved content, layout and media updates within the existing website environment."],
      ["WordPress maintenance", "Support routine plugin, theme and content maintenance within documented change controls."],
      ["Issue investigation", "Reproduce reported website problems, document findings and complete approved troubleshooting steps."],
      ["Interface support", "Assist with web graphics, mock-ups and user-interface updates based on supplied requirements."],
      ["Traffic monitoring", "Compile website traffic and performance information for review by the business or technical lead."],
      ["Product support administration", "Assist with documented installation, configuration and upgrade tasks within approved permissions."],
    ],
    systems: ["WordPress", "Website content systems", "Analytics platforms", "Approved design tools", "Task and issue trackers"],
    fitHeading: "Choose specialised support when the workflow needs more than general administration.",
    fits: [
      "Routine website work is waiting behind larger technical priorities.",
      "The business needs defined maintenance and update coverage.",
      "Issues require consistent documentation and follow-through.",
      "You need technical experience matched to an agreed access level.",
    ],
    boundaryLabel: "Clear role boundaries",
    boundaryHeading: "Support works best with defined authority and review.",
    boundaryText: "Access, change approval, backups, security controls and escalation paths are defined by your technical owner. High-risk infrastructure changes, security decisions and work outside the agreed technical authority remain with qualified authorised personnel.",
    faqs: [
      ["What can an IT virtual assistant support?", "An IT virtual assistant can assist with website updates, WordPress maintenance, issue documentation, approved troubleshooting, interface tasks and technical administration."],
      ["Can the role be matched to our technology stack?", "Yes. VOA reviews the platforms, task types, access requirements and experience level needed before candidate sourcing starts."],
      ["How is access to systems controlled?", "Your business defines permissions, security requirements, change approvals and escalation points. Access should be limited to what the agreed role requires."],
    ],
  },
};

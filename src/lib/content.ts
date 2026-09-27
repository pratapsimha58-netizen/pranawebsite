export const site = {
  name: "ShiftReady",
  tagline: "Get interviews, not a template.",
  description:
    "Resume, LinkedIn and interview prep for Indian professionals with 2-8 years of experience. Written with you on a call, formatted for Naukri and ATS, delivered in 3 days, backed by a 45-day call-back guarantee.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4821",
};

export type Package = {
  id: string;
  name: string;
  price: number;
  priceNote?: string;
  turnaround: string;
  summary: string;
  includes: string[];
  highlight?: boolean;
};

export const packages: Package[] = [
  {
    id: "resume",
    name: "Resume Rewrite",
    price: 2499,
    turnaround: "3 working days",
    summary: "For switchers whose applications go quiet after submit.",
    includes: [
      "20-minute intake call to pull out the numbers you undersell",
      "Full rewrite in a Naukri- and ATS-parseable format",
      "Two file versions: clean .docx for portals, designed PDF for referrals",
      "Two revision rounds",
      "15-minute review call at delivery",
    ],
  },
  {
    id: "resume-linkedin",
    name: "Resume + LinkedIn",
    price: 3999,
    turnaround: "4 working days",
    summary: "Most switchers choose this. Recruiters check both.",
    highlight: true,
    includes: [
      "Everything in Resume Rewrite",
      "LinkedIn headline, About section and experience bullets",
      "Skills reordered to match your target job descriptions",
      "Banner and photo brief",
      "Naukri profile keyword and headline pass",
    ],
  },
  {
    id: "mock-interview",
    name: "Mock Interview",
    price: 1499,
    turnaround: "Scheduled within 5 days",
    summary: "One 60-minute round, run the way your target company runs it.",
    includes: [
      "Technical, managerial or HR round: you pick",
      "Question bank for IT services, product startups or BFSI/consulting",
      "Written scorecard within 24 hours",
      "Five model answers for the questions you missed",
    ],
  },
  {
    id: "sprint",
    name: "30-Day Job-Switch Sprint",
    price: 9999,
    turnaround: "30 days",
    summary: "For a planned switch with a target list and a deadline.",
    includes: [
      "Resume + LinkedIn package",
      "Two mock interviews",
      "Weekly 30-minute check-in for four weeks",
      "Target-company list and application plan",
      "CTC and notice-period negotiation script",
      "WhatsApp support for 30 days",
    ],
  },
];

export const steps = [
  {
    title: "Send your current resume",
    body: "Join the waitlist, then share your resume on WhatsApp. Within 24 hours you get a free ATS parse score and three specific fixes. No payment, no pitch deck.",
  },
  {
    title: "Intake call",
    body: "Twenty minutes on Google Meet. We ask about the projects you do not think are impressive and find the numbers hiding in them.",
  },
  {
    title: "Draft in 48 hours",
    body: "A rewrite built around your target role, checked against an ATS parser and a ten-point quality rubric before you see it.",
  },
  {
    title: "Review call and delivery",
    body: "Two revision rounds, then a 15-minute call walking through what changed and why. You leave with a .docx, a PDF, and a one-page cheat sheet for 'walk me through your resume'.",
  },
];

export const guarantees = [
  {
    title: "45-day call-back guarantee",
    body: "Apply to 15 or more roles with the new resume. No interview call-backs within 45 days and we rewrite it again free.",
  },
  {
    title: "On time or 20% back",
    body: "If the first draft is late against the promised turnaround, 20% is refunded automatically. You do not have to ask.",
  },
  {
    title: "A human on every order",
    body: "Every package includes at least two live calls. No chatbot rewrites, no template with your text pasted in.",
  },
];

export const beforeAfter = {
  role: "Software Engineer, 4 years, IT services to product",
  before: [
    "Responsible for developing and maintaining backend services for client projects.",
    "Worked on performance improvements and bug fixes.",
    "Coordinated with onsite team and participated in daily stand-ups.",
  ],
  after: [
    "Owned the order-reconciliation service (Java, Spring Boot) for a US retail client processing 1.2M transactions a day.",
    "Cut p95 latency from 840 ms to 210 ms by introducing Redis caching and batching DB writes; reduced client escalations from 6 to 0 a month.",
    "Led a 3-engineer squad through two release cycles while the onsite lead was on leave; releases shipped on schedule with zero rollbacks.",
  ],
};

export const faqs = [
  {
    q: "ChatGPT can write a resume for free. Why pay?",
    a: "It can write bullets. It cannot ask you the questions that surface your numbers, format for Naukri's parser, or tell you which of your five projects to lead with. Bring your ChatGPT draft to the free ATS score and see what it misses.",
  },
  {
    q: "Fiverr writers charge INR 800. What is different here?",
    a: "You get an intake call, two revision rounds, a review call, two file formats and a 45-day call-back guarantee. Cheap writers give you a template with your text pasted in and no accountability.",
  },
  {
    q: "Do you guarantee a job?",
    a: "No one honest can. We guarantee interview call-backs within 45 days or a free rewrite, and on-time delivery or 20% back.",
  },
  {
    q: "I have an interview on Monday. Can you do it faster?",
    a: "A 24-hour express option is available as an add-on when capacity allows. Mention it on WhatsApp when you send your resume.",
  },
  {
    q: "Who is this for, and who is it not for?",
    a: "Professionals with roughly 2-8 years of experience in IT, product, fintech, BFSI, consulting or analytics who are switching jobs. Freshers and senior leaders need a different product; we will say so rather than sell you the wrong thing.",
  },
  {
    q: "Do I have to share my current CTC?",
    a: "No. The negotiation script works from market ranges for your role and city.",
  },
  {
    q: "What happens to my resume and personal data?",
    a: "Files are stored in a restricted folder and deleted 90 days after delivery unless you ask us to keep them. Writers only see anonymised intakes until you approve otherwise.",
  },
];

export const audience = [
  "IT services engineers moving to product or a better services firm",
  "Startup and product employees after a layoff",
  "BFSI and consulting analysts moving up",
  "Professionals returning to India or from a career break",
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

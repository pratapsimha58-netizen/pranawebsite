# Executive summary

## The business in one paragraph

**ShiftReady** (working name) is a productised career-services business for Indian professionals with 2-8 years of experience who are switching jobs. It sells fixed-price, fixed-turnaround packages: an ATS-optimised resume rewrite, a LinkedIn profile rewrite, mock interviews with structured feedback, and a 30-day "job-switch sprint" that bundles all three with weekly check-ins. It is the Indian adaptation of TopResume (done-for-you resume writing, USD 149-449) and Teal (job-search tooling, USD 9-29/month), priced in INR at a point Indians already pay and delivered over WhatsApp and Google Meet.

## Why this business, given the constraints

| Constraint | How the business meets it |
| --- | --- |
| Under INR 1 lakh starting capital | No inventory, no office, no licence. Year-one fixed costs are roughly INR 45,000 (domain, tooling, registration, design assets), leaving about INR 50,000 for paid acquisition tests. See [04-unit-economics.md](04-unit-economics.md). |
| Solo founder | Every package can be delivered by one person in 2-5 hours. Contracted writers are added only after order volume proves demand. |
| Financially sustainable | Contribution margin above 90% while founder-delivered, 60-70% after contracting writers. About 5 base-price resume orders a month cover every cost including amortised set-up. |
| Indian consumer pays for it | Naukri's own FastForward service sells resume writing at INR 1,800-6,000. Interview coaching on Preplaced, Topmate and Unstop trades at INR 1,000-5,000 per session. Paid demand is already proven; the gap is quality, turnaround and trust. |
| Replicable Western model | TopResume, Teal, Resume.io and Kickresume have all validated the category. The adaptation is pricing, distribution (WhatsApp, LinkedIn, Telegram job groups) and India-specific content (Naukri-friendly formats, notice-period negotiation, CTC positioning). |

## Offer and pricing (launch)

| Package | Price (INR) | Turnaround | Founder hours |
| --- | --- | --- | --- |
| Resume Rewrite | 2,499 | 3 working days | 2.5 |
| Resume + LinkedIn | 3,999 | 4 working days | 3.5 |
| Mock Interview (60 min, written feedback) | 1,499 | Scheduled within 5 days | 1.5 |
| 30-Day Job-Switch Sprint | 9,999 | 30 days | 8 |

Details and rationale are in [02-business-model.md](02-business-model.md).

## Twelve-month targets

| Milestone | Target month | Signal |
| --- | --- | --- |
| Waitlist of 50 | Month 1 | Landing page live, LinkedIn content and community posts running |
| 10 paid orders | Month 2 | Founder-delivered; average order value at or above INR 3,000 |
| INR 50,000 monthly revenue | Month 4 | 15-20 orders a month, first testimonials with outcomes |
| First contracted writer | Month 5 | Founder time freed for sales and interview-prep tier |
| INR 1,50,000 monthly revenue | Month 9 | Sprint tier live; 20% of orders from referrals |
| INR 2,50,000 monthly revenue | Month 12 | Two writers, founder runs interviews and sales; net margin above 40% |

Full roadmap: [07-roadmap.md](07-roadmap.md).

## What this plan does not promise

Every number in these documents is an assumption until validated. Each assumption is tagged and paired with the cheapest experiment that confirms or kills it. The two riskiest assumptions are:

1. **Conversion**: that at least 5% of waitlist sign-ups become paid orders within 30 days. Validated by the first two months of running the landing page and funnel described in [05-go-to-market.md](05-go-to-market.md).
2. **Price**: that job switchers will pay INR 2,499 for a resume when Fiverr sellers charge INR 800. Validated by running a price test on the landing page (two price points, same package) before writing a single resume.

## How the pieces of this repo fit together

- `docs/` holds the business plan (this file and 01-07).
- The Next.js app at the repo root is the landing page and waitlist that validates demand before any resume is written. Sign-ups go to a Neon Postgres database.
- The `README.md` explains how to run the site and connect it to Neon.

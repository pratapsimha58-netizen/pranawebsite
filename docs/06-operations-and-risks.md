# Operations and risks

## Order workflow (SOP)

| Step | Owner | Time | Tool | SLA |
| --- | --- | --- | --- | --- |
| 1. Payment received | Razorpay webhook or manual check | - | Razorpay | Acknowledge on WhatsApp within 2 hours during 9:00-21:00 IST |
| 2. Intake form | Customer | 10 min | Google Form: current resume, target roles, 3 job descriptions, biggest achievements, constraints (notice period, location, CTC) | Sent immediately after payment |
| 3. Intake call | Founder | 20 min | Google Meet via Cal.com | Within 24 hours of form submission |
| 4. Draft | Founder or writer | 1.5-2.5 h | Google Docs, ATS tool | Within 48 hours of the intake call |
| 5. QA against rubric | Founder | 20 min | Rubric checklist | Before the draft is sent |
| 6. Draft shared | Founder | - | Google Docs link plus PDF on WhatsApp | Day 3 at the latest |
| 7. Revisions (up to 2 rounds) | Writer | 30 min each | Google Docs comments | 24 hours per round |
| 8. Review call | Founder | 15 min | Google Meet | Within 24 hours of the final draft |
| 9. Delivery | Founder | 10 min | ATS .docx, designed PDF, LinkedIn text doc, cheat sheet | Same day as the review call |
| 10. Follow-ups | Founder (automated reminders) | 5 min | WhatsApp template | Day 14: "how are applications going"; Day 30: referral ask; Day 45: guarantee check |

Turnaround promise: 3 working days for Resume Rewrite, 4 for Resume + LinkedIn, measured from intake call to first draft. If missed, 20% is refunded automatically without the customer asking. Express (24-hour) is an add-on capped at 2 orders a day.

## Quality rubric (used for founder and writer output)

A draft ships only if all of the following pass:

1. Parses cleanly in the ATS tool: name, contact, title, dates and skills extracted correctly.
2. Headline matches the target role's title, not the current one.
3. Every experience bullet follows action, scope, result with at least one number; minimum 60% of bullets quantified.
4. Top third of page one answers "why this person for this role" without scrolling.
5. Skills section ordered by target job description keyword frequency.
6. No duty lists ("responsible for"), no personal pronouns, no objective statement, no photograph, no full address, no date of birth.
7. Length: one page for under 5 years, two pages for 5-8 years.
8. Two formats delivered: .docx for portals and PDF for sharing.
9. LinkedIn (if included): headline under 220 characters with role plus value, About section under 2,000 characters in first person, top 3 experiences with 3-4 bullets, skills reordered.
10. Consistency: tense, dates, punctuation, spelling of company names.

Writers are paid on the pass; two failed QA rounds on one order is a coaching conversation, three across a month ends the engagement.

## Contracting writers (month 5 onwards)

- Source: LinkedIn posts, Upwork India, former recruiters and HR professionals looking for side income, English-literature postgraduates with corporate exposure.
- Trial: paid sample (INR 700) on a real anonymised intake; graded against the rubric.
- Contract: independent contractor agreement, per-deliverable rates (INR 700 resume, INR 300 LinkedIn, INR 600 mock interview), 48-hour draft SLA, confidentiality clause, no direct customer contact except through the founder's account until trusted.
- Capacity: one writer handles 15-25 resumes a month alongside other work. Two writers cover the month-12 plan.
- Payment: monthly via bank transfer with a simple statement; TDS at 10% under section 194J once a writer crosses INR 30,000 in the financial year (confirm with the CA).

## Legal and compliance

| Topic | Position at launch | Notes |
| --- | --- | --- |
| Entity | Sole proprietorship | Zero cost, no compliance burden. Convert to an LLP or private limited company only when hiring or raising. |
| Registration | Udyam (MSME) registration, free | Unlocks a current account and is often asked for by payment gateways. |
| GST | Not registered while turnover is under INR 20 lakh (services threshold) | Year-one projection is INR 13.9 lakh. Register voluntarily if selling to companies (B2B outplacement) or when crossing INR 15 lakh to avoid a scramble. Once registered, 18% GST applies to these services; pricing will need to absorb or add it. |
| Income tax | Presumptive taxation under section 44ADA (50% of gross receipts deemed profit) is likely the simplest route for a professional-services proprietor | Confirm eligibility with the CA. |
| Payments | Razorpay payment links and pages; UPI, cards, net banking | Settlement in T+2; 2% fee. Keep PAN and bank details ready for KYC. |
| Terms and refunds | Published terms of service and refund policy on the site | Refunds: 100% before the intake call, 50% before the first draft, none after delivery except the 20% late-turnaround refund and the free rewrite under the guarantee. |
| Data protection | Customers' resumes contain personal data | Store in a dedicated Google Drive folder with restricted sharing; delete drafts 90 days after delivery unless the customer opts to keep them; writers see anonymised intakes only until trusted. India's Digital Personal Data Protection Act obligations are proportionate for a small business but consent and deletion on request must be honoured. |
| Guarantees and advertising | Never claim job placement | "45-day interview call-back or free rewrite" is the only outcome claim. Testimonials with consent and anonymisation. |

## Tools and stack

| Function | Tool | Cost |
| --- | --- | --- |
| Landing page and waitlist | Next.js on Vercel free tier, Neon Postgres free tier (this repo) | 0 |
| Payments | Razorpay | 2% per transaction |
| Scheduling | Cal.com free | 0 |
| Calls | Google Meet | Included in Workspace |
| Documents | Google Docs and Drive | Included in Workspace |
| ATS checks | Jobscan or Resume Worded | INR 2,000 a month |
| Messaging | WhatsApp Business | 0 |
| Books | Zoho Books free tier or a spreadsheet | 0 |
| Order tracking | Spreadsheet until 30 orders a month, then a Neon table and a small admin page in this app | 0 |

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Commoditisation by AI tools** (ChatGPT, LinkedIn's own AI rewrite) | High | High | Sell the human process (intake call, judgement about what to lead with, India-specific formatting, review call) and the outcome guarantee. Use AI internally for speed and pass savings to margin, not price. Move up the ladder toward interview prep and the sprint, which AI cannot deliver. |
| **Price pressure from cheap freelancers** | High | Medium | Do not compete on price. Show before/after quality and guarantees. Sensitivity in [04-unit-economics.md](04-unit-economics.md) shows the business survives a 20% price cut. |
| **Founder capacity bottleneck** | High | Medium | Time-track from month 1; contract the first writer at 20 orders a month, not when exhausted; templated WhatsApp messages and Cal.com to remove admin. |
| **Bursty demand** (layoff spikes, appraisal season) | Medium | Medium | Maintain a bench of 2-3 trialled writers even when not needed; express add-on priced to ration capacity. |
| **Quality variance across writers** | Medium | High | Rubric gate on every order; founder QA; pay on pass; small writer pool. |
| **Guarantee abuse** (customers claiming no call-backs) | Low | Low | Guarantee is a free rewrite, not a refund; require evidence of 15+ applications; cost is 1-2 founder hours. |
| **Platform dependence** (LinkedIn reach drops, Telegram group bans) | Medium | Medium | Diversify across LinkedIn, Reddit, Telegram, referrals; build an email and WhatsApp list the business owns. |
| **Naukri or LinkedIn launches a better in-house service** | Medium | Medium | Their incentive is volume and templates; the plan sits in the premium, human, outcome-guaranteed niche they are unlikely to staff. |
| **Regulatory** (GST threshold, TDS on writers) | Low | Low | CA on retainer for INR 1,000-2,000 a quarter; register for GST at INR 15 lakh. |
| **Data breach or misuse of resumes** | Low | High | Restricted Drive folders, anonymised writer intakes, 90-day deletion, no resumes on personal devices of writers. |
| **Reputational damage from a public complaint** | Low | Medium | Fast refunds under the published policy; respond publicly and politely; keep every promise small and specific. |

## Weekly operating rhythm (solo founder)

| Day | Focus |
| --- | --- |
| Monday | Intake calls, send free ATS scores from the weekend's sign-ups, plan the week's content |
| Tuesday to Thursday | Drafting and QA blocks (mornings), review calls (afternoons), one LinkedIn post each day |
| Friday | Deliveries, follow-ups, bookkeeping, writer payments, metrics review |
| Saturday | Mock interviews (customers prefer weekends), community replies |
| Sunday | Off, or content batching if behind |

## Metrics reviewed weekly

Waitlist sign-ups by source, free scores delivered, score-to-paid conversion, orders by package, average order value, turnaround compliance, refunds, referrals, founder hours by category. All but the last come from the Neon database and Razorpay; the last from a time tracker.

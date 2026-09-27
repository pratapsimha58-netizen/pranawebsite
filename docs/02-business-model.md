# Business model

## Western analog and what carries over

| | TopResume (USA) | Teal (USA) | ShiftReady (India) |
| --- | --- | --- | --- |
| Core offer | Done-for-you resume, cover letter, LinkedIn | Software: resume builder, job tracker, AI tailoring | Done-for-you resume and LinkedIn, plus live mock interviews and a 30-day sprint |
| Price | USD 149 / 219 / 449 packages | USD 9-29 per month | INR 2,499 / 3,999 / 1,499 / 9,999 |
| Delivery | Email, writer portal, 1-2 revision rounds | Self-serve web app | WhatsApp plus Google Meet review call, 2 revision rounds |
| Guarantee | "60-day interview guarantee" (free rewrite) | None | 45-day interview call-back guarantee (free rewrite), 3-day turnaround or 20% refund |
| Acquisition | SEO, free resume review lead magnet, job-board partnerships | SEO, content, freemium | LinkedIn content, free ATS score lead magnet, Telegram and Reddit job communities, referrals |
| Delivery cost | Contracted writers, USD 30-60 per resume | Software | Founder first, then contracted writers at INR 600-900 per resume |

What carries over: the productised package structure, the free-review lead magnet, the interview guarantee as a trust device, and the writer-network delivery model.

What changes for India: pricing at roughly one-third of Western equivalents in absolute terms; WhatsApp as the primary channel (higher open rates than email); live human touchpoints (Indians pay for a call, not a PDF); and India-specific content that Western templates get wrong.

## Customer

### Ideal customer profile (ICP)

- Age 24-34, 2-8 years of experience.
- Works in IT services, product companies, fintech, consulting, BFSI operations, or analytics. These sectors have frequent switching, structured interviews and salary jumps of 30-100% on a switch, which makes INR 2,500-10,000 an easy purchase.
- Earns INR 6-25 lakh a year. The resume package costs less than one day's pay for this group.
- Trigger: appraisal disappointment (April-June), layoff news, a friend's switch, or a target company opening.
- Pain: applications go nowhere on Naukri and LinkedIn; unsure whether the resume is the problem; uncomfortable talking about themselves; anxious about behavioural rounds and salary negotiation.

### Who is not the customer (at launch)

- Freshers (price-sensitive, colleges provide free help, outcomes depend on campus placements).
- Senior leaders with 15+ years (need executive positioning, a different product at a different price).
- Non-English-speaking blue-collar switchers (a large market but a different channel and product).

## Offer ladder

| Package | Price (INR) | What the customer gets | Turnaround | Founder hours | Direct cost at scale |
| --- | --- | --- | --- | --- | --- |
| **Free ATS Score** (lead magnet) | 0 | Automated ATS parse plus three specific fixes, delivered on WhatsApp within 24 hours | 24 hours | 0.2 | INR 0-20 (tool credit) |
| **Resume Rewrite** | 2,499 | 20-minute intake call, full rewrite in a Naukri- and ATS-friendly format, 2 revision rounds, 15-minute review call | 3 working days | 2.5 | INR 700 (writer) |
| **Resume + LinkedIn** | 3,999 | Everything above plus headline, About section, experience bullets, skills ordering, banner brief | 4 working days | 3.5 | INR 1,000 (writer) |
| **Mock Interview** | 1,499 | 60-minute role-specific mock (technical, managerial or HR round), written scorecard, 5 model answers | Scheduled within 5 days | 1.5 | INR 600 (interviewer) |
| **30-Day Job-Switch Sprint** | 9,999 | Resume + LinkedIn, 2 mock interviews, weekly 30-minute check-in, target-company list, negotiation script, WhatsApp support for 30 days | 30 days | 8 | INR 3,000 |
| **Add-ons** | 499-999 | Cover letter, Naukri profile optimisation, extra revision round, salary negotiation call | 1-2 days | 0.5-1 | INR 200-400 |

Design choices:

- **Anchor at the middle.** Resume + LinkedIn is the package most customers should choose; the resume-only package exists as an entry point and the sprint exists to make INR 3,999 look reasonable.
- **Every package includes a live call.** This is the main differentiator from Fiverr and AI tools, and it is where upsells happen.
- **Guarantees are limited and specific.** A 45-day call-back guarantee triggers a free rewrite, not a refund. The turnaround guarantee refunds 20% if late. Both are cheap to honour and strong in marketing.

## India adaptations in the product itself

1. **Two file formats per resume.** A clean ATS-parseable version for Naukri, LinkedIn Easy Apply and company portals, and a lightly designed PDF for referrals and WhatsApp forwarding. Western services deliver one.
2. **Naukri profile hygiene.** Headline keywords, "key skills" ordering, and the 30-second summary that recruiters actually read on Naukri's recruiter view.
3. **CTC and notice-period positioning.** Scripts for "current CTC", "expected CTC", "why the switch", and how to present a 90-day notice period or a buyout.
4. **Company-archetype interview prep.** Separate question banks and evaluation rubrics for Indian IT services (client-facing, process-heavy), product startups (system design, ownership stories) and BFSI/consulting (case and behavioural).
5. **Stories over duties.** Most Indian resumes list responsibilities; recruiters want quantified impact. The intake call is structured to extract numbers the customer does not think are impressive.

## Revenue model

- One-off package revenue at launch. Average order value target: INR 3,200 in months 1-4, INR 4,000 by month 9 as the sprint tier matures.
- Repeat purchases every 2-3 years per customer plus add-ons during a search. Not a subscription; Indians in this segment do not pay monthly for career tools (Teal-style SaaS is the part of the Western model that does not transfer).
- Referral credits (INR 500 to referrer and referee) rather than affiliate commissions.
- Later options (not in this plan): B2B outplacement packages for startups doing layoffs; a self-serve ATS checker at INR 199.

## Channels

Detailed in [05-go-to-market.md](05-go-to-market.md). In short: LinkedIn content by the founder, a free ATS score as the lead magnet, Telegram and Reddit job-search communities, and referrals. Paid ads are a test budget, not the plan.

## Key partners and tools

| Need | Tool | Monthly cost (INR) |
| --- | --- | --- |
| Domain and hosting | Namecheap or GoDaddy domain, Vercel free tier | ~100 (amortised) |
| Database for waitlist and orders | Neon Postgres free tier | 0 |
| Payments | Razorpay payment links (2% fee) | 0 fixed |
| Calls | Google Meet via Google Workspace | 160 |
| Messaging | WhatsApp Business app | 0 |
| ATS check | Jobscan or Resume Worded (or open-source parser) | 1,500-2,500 |
| Documents | Google Docs plus 2-3 purchased templates | 0 recurring |
| Scheduling | Cal.com free tier | 0 |
| Invoicing and books | Zoho Books free tier or a spreadsheet | 0 |

## Cost structure summary

Fixed: about INR 3,500 a month after set-up. Variable: 2% payment fees, writer or interviewer fees once contracted, referral credits. Full breakdown in [04-unit-economics.md](04-unit-economics.md).

## Assumptions to validate

| ID | Assumption | Validation | Kill criterion |
| --- | --- | --- | --- |
| BM-1 | ICP will pay INR 2,499 for a resume when INR 800 options exist | Landing-page price test at 1,999 vs 2,499 with the same package for the first 200 visitors each | Conversion at 2,499 below half of conversion at 1,999 |
| BM-2 | The live review call is valued, not tolerated | Post-delivery survey: "Would you have paid INR 500 less without the call?" | More than 60% say yes |
| BM-3 | Resume + LinkedIn becomes the modal package | Order mix after 20 orders | Under 30% choose it |
| BM-4 | Sprint tier sells at INR 9,999 without a reputation | Offer to first 20 resume customers at delivery | Under 2 takers |

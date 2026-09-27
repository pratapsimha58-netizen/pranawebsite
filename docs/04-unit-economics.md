# Unit economics

All figures in INR. Every number is an assumption (tagged UE-n) unless it is a published price. The model is deliberately conservative on volume and honest about founder time, which is the real scarce resource.

## Start-up budget: what the INR 1 lakh buys

| Item | Amount | Notes |
| --- | --- | --- |
| Domain (.in and .com, 2 years) | 1,500 | Published prices, Namecheap or GoDaddy |
| Business registration and banking | 3,000 | Udyam/MSME registration is free; budget covers a CA consult, a zero-balance current account and a Shop and Establishment registration if the state requires it |
| Google Workspace Business Starter, 12 months | 1,920 | INR 160 a month; gives a professional email and Google Meet |
| ATS scanning tool, 12 months | 24,000 | INR 2,000 a month for Jobscan or Resume Worded, or a cheaper open-source parser plus manual checks (UE-1) |
| Resume and LinkedIn templates | 2,000 | 2-3 purchased professional templates, adapted |
| Brand and design (logo, Canva Pro, landing-page imagery) | 4,000 | Canva Pro annual plus a one-off logo |
| Legal templates (terms of service, refund policy, writer contract) | 3,000 | Template purchase or a one-off drafting fee |
| Contingency | 5,000 | |
| **Fixed set-up and year-one tooling** | **44,420** | Rounded to 45,000 below |
| Paid acquisition tests (months 1-4) | 50,000 | LinkedIn and Meta ads, community sponsorships; released in INR 6,000-8,000 monthly tranches, stopped if CAC exceeds INR 800 (UE-2) |
| **Total** | **~95,000** | About INR 5,000 headroom under the INR 1 lakh limit |

Free-tier services that keep the fixed base low: Vercel (hosting), Neon (Postgres), Cal.com (scheduling), Razorpay (no fixed fee, 2% per transaction), WhatsApp Business (free), Zoho Books free tier.

Not in the budget: a laptop, phone and internet connection (assumed already owned), and founder salary (see below).

## Monthly fixed costs after launch

| Item | Monthly |
| --- | --- |
| Google Workspace | 160 |
| ATS tool | 2,000 |
| Domain (amortised) | 125 |
| Canva Pro (amortised) | 330 |
| Phone and data allocation | 500 |
| Miscellaneous (stock images, small tools) | 385 |
| **Total** | **3,500** |

Fixed costs rise to about INR 4,000 in month 9 when a paid Cal.com or CRM tier is added for two writers.

## Contribution margin per package

Direct costs: Razorpay fee at 2%, tool credits per order (~INR 20), referral credit amortised (INR 500 per referred order; assumed 20% of orders are referred, so INR 100 per order on average from month 6), and contractor fees once used.

| Package | Price | Founder-delivered direct cost | Contribution (founder) | Contractor-delivered direct cost | Contribution (contractor) |
| --- | --- | --- | --- | --- | --- |
| Resume Rewrite | 2,499 | 70 | 2,429 (97%) | 870 (writer 700) | 1,629 (65%) |
| Resume + LinkedIn | 3,999 | 100 | 3,899 (97%) | 1,200 (writer 1,000) | 2,799 (70%) |
| Mock Interview | 1,499 | 50 | 1,449 (97%) | 650 (interviewer 600) | 849 (57%) |
| 30-Day Sprint | 9,999 | 220 | 9,779 (98%) | 3,300 (writer plus interviewer 3,000) | 6,699 (67%) |
| Add-ons (average) | 749 | 35 | 714 (95%) | 335 (writer 300) | 414 (55%) |

Blended contribution: about 96% while the founder delivers everything, 65-70% once writers handle the majority of resumes. This is the "80%+ then 60-70%" quoted in the executive summary, with some slack for revisions and refunds.

Contractor rates (UE-3): INR 700 for a resume, INR 300 for a LinkedIn add-on, INR 600 for a mock interview. These are at the upper end of what experienced Indian freelance writers charge for volume work and leave room to raise rates for the best writers.

## Founder time per order

| Package | Intake | Writing | Revisions | Review call | Admin | Total hours |
| --- | --- | --- | --- | --- | --- | --- |
| Resume Rewrite | 0.33 | 1.25 | 0.5 | 0.25 | 0.17 | 2.5 |
| Resume + LinkedIn | 0.33 | 2.0 | 0.67 | 0.33 | 0.17 | 3.5 |
| Mock Interview | 0 | 0.25 (prep) | 0 | 1.0 | 0.25 (scorecard) | 1.5 |
| 30-Day Sprint | 0.5 | 2.5 | 1.0 | 3.0 (4 check-ins and 2 mocks) | 1.0 | 8.0 |

With writers contracted, founder time per resume order drops to about 0.5 hours (QA against the rubric plus the review call). Founder capacity is assumed at 120 productive hours a month, half on delivery and half on content, sales and QA (UE-4).

## Break-even

Monthly cash costs including amortised set-up and the ad-test budget spread over 12 months:

| Component | Monthly |
| --- | --- |
| Fixed running costs | 3,500 |
| Set-up amortised (45,000 / 12) | 3,750 |
| Ad tests amortised (50,000 / 12) | 4,170 |
| **Total** | **11,420** |

At INR 2,429 contribution per founder-delivered Resume Rewrite, **about 5 base-price orders a month cover every rupee spent**, including the one-off set-up. Excluding amortised set-up, 2 orders a month cover running costs. This is why the model is low-risk: the downside is a few thousand rupees a month and founder time.

## Twelve-month projection

Assumptions: order volume grows as content compounds and referrals kick in; average order value rises as the bundle and sprint tiers take share; first contracted writer in month 5 handling 40% of resume orders, rising to 70% by month 12; second writer in month 10. Marketing spend beyond the initial INR 50,000 is funded from revenue.

| Month | Orders | Avg order value | Revenue | Direct costs | Marketing | Fixed | Net before founder pay | Cumulative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 (set-up) | 0 | - | 0 | 0 | 0 | 45,000 | -45,000 | -45,000 |
| 1 | 3 | 3,000 | 9,000 | 360 | 8,000 | 3,500 | -2,860 | -47,860 |
| 2 | 10 | 3,200 | 32,000 | 1,300 | 8,000 | 3,500 | 19,200 | -28,660 |
| 3 | 14 | 3,200 | 44,800 | 1,800 | 6,000 | 3,500 | 33,500 | 4,840 |
| 4 | 17 | 3,300 | 56,100 | 2,250 | 6,000 | 3,500 | 44,350 | 49,190 |
| 5 | 22 | 3,400 | 74,800 | 10,200 | 6,000 | 3,500 | 55,100 | 1,04,290 |
| 6 | 27 | 3,500 | 94,500 | 14,000 | 5,000 | 3,500 | 72,000 | 1,76,290 |
| 7 | 32 | 3,700 | 1,18,400 | 19,100 | 5,000 | 3,500 | 90,800 | 2,67,090 |
| 8 | 36 | 3,800 | 1,36,800 | 23,500 | 5,000 | 3,500 | 1,04,800 | 3,71,890 |
| 9 | 40 | 4,000 | 1,60,000 | 29,200 | 5,000 | 4,000 | 1,21,800 | 4,93,690 |
| 10 | 46 | 4,100 | 1,88,600 | 36,000 | 5,000 | 4,000 | 1,43,600 | 6,37,290 |
| 11 | 52 | 4,200 | 2,18,400 | 44,700 | 5,000 | 4,000 | 1,64,700 | 8,01,990 |
| 12 | 60 | 4,300 | 2,58,000 | 52,300 | 5,000 | 4,000 | 1,96,700 | 9,98,690 |
| **Year 1** | **359** | **3,876** | **13,91,400** | **2,34,710** | **69,000** | **85,000** | **10,02,690** | |

Reading the table:

- **Cash low point is about INR 48,000** at the end of month 1, comfortably inside the INR 1 lakh. The business is cash-positive on a cumulative basis in month 3 (UE-5).
- **Founder pay.** Net before founder pay is what the founder can draw. Drawing INR 60,000 a month from month 5 onwards leaves a month-12 net margin of about 53% (1,96,700 - 60,000 = 1,36,700 on 2,58,000 revenue), which is where the "net margin above 40%" in the executive summary comes from.
- **Volume sanity check.** 60 orders in month 12 is 2 orders a day. With writers handling 42 of them, founder delivery time is about 18 x 3 + 42 x 0.5 = 75 hours, leaving 45 hours for sales, content and interviews. Tight but feasible for a full-time founder; the second writer in month 10 exists to keep it that way.
- **What breaks it.** Month 12 revenue below INR 1 lakh would mean conversion (UE-6) or referral (UE-7) assumptions failed. Even then, the business clears founder living costs; it just does not justify hiring.

## Customer acquisition cost and payback

| Channel | Expected CAC | Basis | Tag |
| --- | --- | --- | --- |
| Founder LinkedIn content | ~0 cash, 20 hours a month | Time cost only | |
| Free ATS score funnel | 100-200 | Tool credits and 12 minutes of founder time per score, 10-15% convert | UE-6 |
| Referrals | 500 | Credit paid to referrer | |
| Telegram and Reddit community posts | ~0 cash | Time cost | |
| Paid ads (test) | 600-800 target | INR 40-60 CPC, 3-4% landing conversion to waitlist, 30-40% waitlist to paid | UE-2 |

Blended CAC target: under INR 400 by month 6. Against a blended contribution above INR 2,200 per order, payback is immediate on the first order; there is no subscription to wait for.

## Sensitivity

| Scenario | Change | Month-12 revenue | Year-1 net before founder pay |
| --- | --- | --- | --- |
| Base | - | 2,58,000 | 10,02,690 |
| Slow growth | Orders 40% lower every month | ~1,55,000 | ~5,60,000 |
| Price pressure | All prices 20% lower, same volume | ~2,06,000 | ~7,50,000 |
| Writer costs 30% higher | Contractor fees up 30% | 2,58,000 | ~9,60,000 |
| Both slow growth and price pressure | | ~1,24,000 | ~4,10,000 |

Even the combined downside case pays a solo founder more than INR 30,000 a month by year end while costing under INR 50,000 in cash at risk. That is the definition of financially sustainable for this brief.

## Assumptions register

| ID | Assumption | Validation | Kill criterion |
| --- | --- | --- | --- |
| UE-1 | ATS tooling at INR 2,000 a month is sufficient | Try one paid tool for a month against manual parser checks | Tool adds no fixes the founder did not already spot |
| UE-2 | Paid CAC of INR 600-800 is achievable | INR 8,000 test in month 1 with two ad creatives | CAC above INR 1,200 after INR 16,000 spent means stop paid ads |
| UE-3 | Quality writers available at INR 700 a resume | Post a trial brief on LinkedIn and Upwork India; pay 3 writers for a sample | Fewer than 2 of 5 samples pass the rubric |
| UE-4 | 120 productive founder hours a month | Time-track months 1-3 | Under 80 hours means the M12 plan must slip |
| UE-5 | Cumulative cash-positive by month 3 | Bookkeeping | Not cash-positive by month 5 |
| UE-6 | 10-15% of free ATS scores convert to a paid order within 30 days | Track in the waitlist database | Under 5% after 100 scores |
| UE-7 | 20% of orders are referred by month 6 | Ask "how did you hear about us" on intake; referral code usage | Under 10% by month 8 |

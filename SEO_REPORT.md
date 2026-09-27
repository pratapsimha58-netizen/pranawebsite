# SEO + GEO implementation report — Prana Way

Date: 2026-09-27  
Site: https://thepranaway.com  
Stack: Next.js App Router (`src/app`), Netlify

---

## 1. Summary of changes by phase

### Phase 1 — Technical foundation
- Added `src/lib/site.ts` as the single source of truth for brand, person, locale, social, verification, and analytics placeholders.
- Canonical domain: `https://thepranaway.com` via `metadataBase`, per-page `alternates.canonical`, and www→non-www 301 in `netlify.toml`.
- Root metadata template `%s | Prana Way`, Open Graph (`en_IN`), Twitter `summary_large_image`, and `app/opengraph-image.tsx`.
- `app/sitemap.ts` and `app/robots.ts` (allows major AI crawlers; points to sitemap).
- `public/llms.txt` factual summary for AI tools.
- Descriptive hero `alt` text and image priority handled in the carousel.

### Phase 2 — Identity
- Homepage “About Pratap” section + credentials row + link to `/about`.
- Full `/about` page (story, approach, for / not-for).
- Testimonials component gated behind `testimonials.length >= 2` (empty until real quotes exist).
- Sitewide JSON-LD: Organization / ProfessionalService, Person, WebSite.
- Homepage JSON-LD: Service/Offer (real INR prices) + FAQPage.
- **No** AggregateRating or Review schema.

### Phase 3 — Visible / quotable content
- FAQ answers rendered with native `<details>`/`<summary>` so text is in the HTML at load.
- Expanded FAQ set (coach identity, session shape, refunds, instalments).
- Hero copy names Pratap, Bengaluru, and online.

### Phase 4 — Goal pages
Five intent pages with direct-answer blocks, for/not-for, 4-step flow, packages + prices, SSR FAQs + FAQPage schema, About coach blurb, BreadcrumbList, and waitlist CTA with goal preselected:
- `/fitness-habits-coaching`
- `/break-bad-habits`
- `/resilience-coaching`
- `/confidence-coaching`
- `/first-coaching-client`

### Phase 5 — Journal hub
- Markdown posts in `content/journal/` (six **drafts**, `draft: true` — excluded from listings and sitemap).
- `/journal` list page (empty state until drafts are published).
- `/journal/[slug]` article template with Article schema, author box, related goal link.
- RSS at `/journal/rss.xml`.

### Phase 6 — Internal linking
- Homepage goal cards link to goal pages.
- Header includes About + Journal (solid header on inner pages).
- Footer lists all goal pages, About, Journal, packages, waitlist.

### Phase 7 — Measurement
- GSC verification meta wiring in root layout (inactive until real code replaces the TODO in `site.ts`).
- Analytics loader (`Analytics` component) for Plausible / GA4 when `NEXT_PUBLIC_ANALYTICS_PROVIDER` is set; Netlify Analytics is UI-only.
- Waitlist success fires `trackWaitlistSubmit(primaryGoal)` (Plausible/GA4 custom event when configured). Goal is also stored on the waitlist row.

---

## 2. Full `{{TODO}}` list for the owner

### Identity & brand
| Placeholder | File |
|---|---|
| Confirm full public name | `src/lib/site.ts` (`person.fullName`) |
| Prana Way vs Vantage Point / @coachpratapsimha | `src/lib/site.ts` (`brandNote`) |
| LinkedIn / Instagram / YouTube URLs | `src/lib/site.ts` (`social.*`), `public/llms.txt` |
| Real headshot `public/images/pratap.jpg` | `public/images/README.md`, `src/components/about.tsx`, `src/lib/site.ts` |
| Personal “why coaching” sentences | `src/lib/about.ts` (story) |
| Extra “not for” line | `src/lib/about.ts` |
| Real testimonials (need ≥2 to show section) | `src/lib/about.ts` |

### FAQ & policies
| Placeholder | File |
|---|---|
| In-person sessions in Bengaluru? | `src/lib/content.ts`, `public/llms.txt` |
| Public session length | `src/lib/content.ts` |
| Refund policy | `src/lib/content.ts` |
| Instalments | `src/lib/content.ts` |
| First Client guarantee wording | `src/lib/goals.ts` |
| Medical / therapy referral wording on goal pages | `src/lib/goals.ts` |

### Journal drafts (set `draft: false` when ready)
| Placeholder | File |
|---|---|
| Client-safe habit story | `content/journal/why-people-quit-habit-programs.md` |
| Therapy referral criteria | `content/journal/coaching-vs-therapy.md` |
| Discovery call length | `content/journal/what-happens-in-a-discovery-call.md` |
| Optional sample fitness week | `content/journal/rebuild-fitness-routine-after-months-off.md` |
| Soft-invite example line | `content/journal/how-new-coaches-book-first-client.md` |
| Burnout language alignment | `content/journal/burnout-vs-busy-season.md` |

### Measurement
| Placeholder | File |
|---|---|
| Google Search Console verification code | `src/lib/site.ts` → `verification.google` |
| Which analytics (Netlify / Plausible / GA4) | `src/lib/site.ts`, `src/lib/analytics.ts` |
| If Plausible: `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` + `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | env |
| If GA4: `NEXT_PUBLIC_ANALYTICS_PROVIDER=ga4` + `NEXT_PUBLIC_GA4_ID` | env |

---

## 3. Skipped or limited — and why

- **Lighthouse CI run in this session:** not automated here; carousel priority/alts and form labels were addressed in earlier phases. Re-run Lighthouse on production after deploy.
- **MDX compiler:** used plain markdown + a small SSR renderer instead of adding an MDX dependency; same GEO structure.
- **Published journal articles:** all six posts remain drafts so unfinished copy is not indexed.
- **AggregateRating / Review schema:** intentionally omitted until real reviews exist.
- **Live analytics / GSC meta:** wiring only; owner must supply IDs/codes.
- **Rich Results Test:** owner should validate JSON-LD at https://search.google.com/test/rich-results after deploy.

---

## 4. Off-site checklist for Pratap (not for the agent)

These matter a lot for GEO, because AI engines lean on what *other* sites say about you:

- [ ] Decide the Prana Way vs Vantage Point brand relationship, then use identical name and description everywhere
- [ ] Submit the site in Google Search Console and Bing Webmaster Tools, and submit the sitemap
- [ ] Create a Google Business Profile (Bengaluru, service-area business)
- [ ] Get listed in the ICF coach finder with a link to the site
- [ ] Update LinkedIn headline and About to mention Prana Way, with a link
- [ ] Use the same bio and link on Instagram and YouTube
- [ ] Collect 3–5 real testimonials, ideally with permission to use names
- [ ] Answer 2–3 relevant Reddit/Quora questions a week in your niche (helpful first, link only when it fits)
- [ ] Pitch 3–5 podcasts (coaching, HR, career change, wellness)
- [ ] Turn YouTube lives into articles, and add transcripts and site links in video descriptions
- [ ] Publish one article a week in `/journal`
- [ ] Check Search Console monthly; expect 3–6 months before organic traffic moves

---

## 5. Quick verify after deploy

1. https://thepranaway.com/robots.txt  
2. https://thepranaway.com/sitemap.xml  
3. https://thepranaway.com/llms.txt  
4. View-source on `/` and confirm FAQ answers appear inside `<details>`  
5. Google Rich Results Test on `/` and one goal page  
6. Confirm `www.thepranaway.com` 301s to non-www  

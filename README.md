# ShiftReady: business plan and waitlist site

A financially sustainable, solo-founder business for India, modelled on TopResume and Teal: productised resume, LinkedIn and interview-prep packages for professionals with 2-8 years of experience who are switching jobs. Startable with under INR 1 lakh.

This repo has two parts:

1. **The business plan** in [`docs/`](docs/): why this model, who pays, what it costs, how it grows.
2. **A landing page with a waitlist** (Next.js + Neon Postgres) to validate demand before writing a single resume.

## The plan

| File | Contents |
| --- | --- |
| [docs/00-executive-summary.md](docs/00-executive-summary.md) | One-page summary, pricing, 12-month targets, riskiest assumptions |
| [docs/01-idea-shortlist.md](docs/01-idea-shortlist.md) | Six Western models scored for India under INR 1L; why career services wins |
| [docs/02-business-model.md](docs/02-business-model.md) | Customer, offer ladder, pricing, India adaptations, tools |
| [docs/03-market-and-customer.md](docs/03-market-and-customer.md) | Bottom-up sizing, segments, buying journey, objections, competitors |
| [docs/04-unit-economics.md](docs/04-unit-economics.md) | INR 1L budget line by line, margins, break-even, 12-month P&L, sensitivity |
| [docs/05-go-to-market.md](docs/05-go-to-market.md) | Funnel, channels, launch sequence, messaging, waitlist form design |
| [docs/06-operations-and-risks.md](docs/06-operations-and-risks.md) | Order SOP, quality rubric, writer contracting, legal, risk register |
| [docs/07-roadmap.md](docs/07-roadmap.md) | Evidence-gated stages from set-up to INR 2.5 lakh a month |

Every number in the plan is an assumption tagged with the experiment that validates it.

## The site

- Landing page at `/`: hero, how it works, packages and pricing, before/after sample, guarantees, FAQ, waitlist form.
- `POST /api/waitlist`: validates with zod, de-duplicates by email, writes to Neon.
- `/admin/waitlist`: lists sign-ups with per-channel counts and a CSV export at `/admin/waitlist/export`.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Drizzle ORM, `@neondatabase/serverless`.

### Run locally

```bash
npm install
cp .env.example .env.local   # optional; see below
npm run dev                  # http://localhost:4821
```

The dev server runs on port 4821. Without a `DATABASE_URL` the app still works: sign-ups are kept in memory and the admin page shows a "Not connected to Neon" warning. This is fine for previewing the page, not for collecting real sign-ups.

### Connect Neon

1. Create a project at [neon.tech](https://neon.tech) and copy the pooled connection string.
2. Put it in `.env.local`:

   ```
   DATABASE_URL=postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require
   ```

3. Create the `waitlist` table by applying the committed migration:

   ```bash
   npm run db:migrate
   ```

   (`npm run db:push` also works for a quick sync during development; `npm run db:studio` opens Drizzle Studio.)

4. Restart `npm run dev`. The admin page badge switches to "Neon Postgres".

If you are running this in a Cursor Cloud Agent, add `DATABASE_URL` as a secret in the Cursor Dashboard (Cloud Agents > Secrets) instead of `.env.local`.

### Protect the admin page

Set `ADMIN_TOKEN` in `.env.local` (or your host's environment). The admin page and CSV export then require `?token=YOUR_TOKEN` or an `x-admin-token` header. When unset, the page is open, which is intended for local development only.

### Channel attribution

Append `?utm_source=linkedin` (or `?source=` / `?ref=`) to the landing URL when sharing it. The value is stored in the `source` column so paid conversion can be compared by channel, as described in the go-to-market plan.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 4821 |
| `npm run build` / `npm start` | Production build and serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run db:generate` | Generate a new migration from `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations in `drizzle/` to `DATABASE_URL` |
| `npm run db:push` | Push schema directly (development only) |
| `npm run db:studio` | Drizzle Studio |

### Project layout

```
docs/                         Business plan
drizzle/                      SQL migrations and snapshots
src/app/page.tsx              Landing page
src/app/api/waitlist/route.ts Waitlist API
src/app/admin/waitlist/       Admin list and CSV export
src/components/               Landing sections, waitlist form, shadcn/ui primitives
src/db/                       Drizzle schema, Neon client, store with in-memory fallback
src/lib/                      Copy and pricing, validation schema, CSV and auth helpers
```

## Deploy

Vercel free tier plus Neon free tier is the intended zero-cost hosting. Set `DATABASE_URL`, `ADMIN_TOKEN` and `NEXT_PUBLIC_SITE_URL` as environment variables, run `npm run db:migrate` once against the production database, and deploy.

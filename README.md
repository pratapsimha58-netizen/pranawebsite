# Prana Way

A warm coaching waitlist site for people returning to fitness, better habits, resilience, confidence, and the clarity to book their first client.

Stack: Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Drizzle ORM, Neon Postgres.

## Run locally

```bash
npm install
cp .env.example .env.local   # or use `neon link` with NEON_API_KEY
npm run db:migrate
npm run dev                  # http://localhost:4821
```

Without `DATABASE_URL`, the waitlist falls back to in-memory storage (fine for UI preview).

## Cloud Agent

```bash
./scripts/cloud-agent-install.sh
npm run dev
```

Requires `NEON_API_KEY` to pull `DATABASE_URL` for project `frosty-brook-98657992` (production branch).

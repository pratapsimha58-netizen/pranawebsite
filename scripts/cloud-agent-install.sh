#!/usr/bin/env bash
set -euo pipefail

# Idempotent Cloud Agent bootstrap for ShiftReady (Next.js + Neon waitlist).
npm ci

# When NEON_API_KEY is present, link the project and pull DATABASE_URL into .env.local.
# Without the key the app still runs (in-memory waitlist fallback).
if [[ -n "${NEON_API_KEY:-}" ]]; then
  npx --yes neon@latest link \
    --project-id frosty-brook-98657992 \
    --branch production \
    -y \
    --no-config
fi

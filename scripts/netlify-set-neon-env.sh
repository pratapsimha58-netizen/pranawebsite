#!/usr/bin/env bash
set -euo pipefail
# Sets Neon env vars on thepranaway.com Netlify site from local .env.local
# Requires: NETLIFY_AUTH_TOKEN, and .env.local with DATABASE_URL*

SITE_ID="${NETLIFY_SITE_ID:-358b1348-0376-4b26-b3d5-f9e51706c474}"
ENV_FILE="${1:-.env.local}"

if [[ -z "${NETLIFY_AUTH_TOKEN:-}" ]]; then
  echo "NETLIFY_AUTH_TOKEN is required" >&2
  exit 1
fi
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

set_key() {
  local key="$1" value="$2"
  # strip surrounding quotes
  value="${value%\"}"; value="${value#\"}"
  value="${value%\'}"; value="${value#\'}"
  curl -fsS -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.netlify.com/api/v1/accounts/$(curl -fsS -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" https://api.netlify.com/api/v1/sites/$SITE_ID | python3 -c 'import sys,json; print(json.load(sys.stdin)["account_slug"])')/env" \
    >/dev/null 2>&1 || true
  netlify env:set "$key" "$value" --site "$SITE_ID" --context production
}

while IFS= read -r line; do
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  key="${line%%=*}"; value="${line#*=}"
  case "$key" in
    DATABASE_URL|DATABASE_URL_UNPOOLED|NEON_BRANCH)
      echo "Setting $key"
      netlify env:set "$key" "${value}" --site "$SITE_ID" --context production --force
      ;;
  esac
done < "$ENV_FILE"

echo "Triggering redeploy..."
netlify deploy --prod --build --site "$SITE_ID"

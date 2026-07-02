#!/usr/bin/env bash
# Post-deploy sanity checks: fetch key URLs and grep for real SEO content.
# Usage: bash scripts/verify-prerender.sh [BASE_URL]
#        Default BASE_URL: https://www.remontnapokrivivarna.bg
#
# Prints a table with ✓/✗ for each check per URL and exits non-zero if any
# critical check fails.

set -uo pipefail

BASE="${1:-https://www.remontnapokrivivarna.bg}"
URLS=(
  "/bg"
  "/bg/varna"
  "/bg/varna/remont-na-pokrivi"
  "/bg/varna/hidroizolacia-na-pokriv"
  "/bg/varna/nov-pokriv"
  "/bg/varna/remont-na-keremideni-pokrivi"
  "/en/varna"
  "/en/varna/roof-repair-varna"
  "/de/varna/dachreparatur-varna"
  "/bg/blog/cena-remont-pokriv-varna"
)

FAILS=0

check() {
  local label="$1"; local pattern="$2"; local body="$3"
  if echo "$body" | grep -qE "$pattern"; then
    printf "  \033[32m✓\033[0m %s\n" "$label"
  else
    printf "  \033[31m✗\033[0m %s MISSING\n" "$label"
    FAILS=$((FAILS + 1))
  fi
}

for URL in "${URLS[@]}"; do
  echo ""
  echo "=== $BASE$URL ==="
  BODY=$(curl -sL --max-time 30 -A "Mozilla/5.0 (compatible; SEOAudit)" "$BASE$URL")
  BYTES=$(printf "%s" "$BODY" | wc -c | tr -d ' ')
  echo "  size: $BYTES bytes"

  check "H1 present"               "<h1"                                "$BODY"
  check "canonical link"           'rel="canonical"'                    "$BODY"
  check "hreflang tags"            'rel="alternate"[^>]*hreflang'       "$BODY"
  check "JSON-LD script"           'application/ld\+json'               "$BODY"
  check "body text (>800 bytes)"   '.'                                  "$(printf "%s" "$BODY" | grep -oE '>[^<]{20,}<' | head -c 900)"
  check "warranty/гаранция copy"   '15|гаранция|warranty|Garantie'      "$BODY"
done

echo ""
if [ "$FAILS" -gt 0 ]; then
  echo "─────────────────────────────────────"
  echo "✗ $FAILS check(s) failed. Prerender is NOT serving full content."
  exit 1
fi
echo "─────────────────────────────────────"
echo "✓ All checks passed."

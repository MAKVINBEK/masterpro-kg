#!/usr/bin/env bash
# Использование: bash scripts/check.sh [адрес]   (по умолчанию http://localhost:3000)
BASE="${1:-http://localhost:3000}"
PAGES=(/ /ustranenie-zasorov/ /uslugi-santehnika/ /uslugi-elektrika/ /remont-ariston/ /prices/ /reviews/ /contacts/ /privacy/)

echo "== Статусы (ожидается 200, у /nope/ 404)"
for p in "${PAGES[@]}" /sitemap.xml /robots.txt /nope/; do
  printf "%-26s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE$p")"
done

echo
echo "== Редирект адреса без слэша (ожидается 308 на адрес со слэшем)"
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' "$BASE/prices"

echo
echo "== Количество H1 (ожидается 1), title, canonical"
for p in "${PAGES[@]}"; do
  html="$(curl -s "$BASE$p")"
  echo "$p"
  echo "  h1: $(printf '%s' "$html" | grep -o '<h1' | wc -l | tr -d ' ')"
  printf '%s' "$html" | grep -o -E '<title>[^<]*</title>' | head -1 | sed 's/^/  /'
  printf '%s' "$html" | grep -o -E '<link rel="canonical" href="[^"]*"' | head -1 | sed 's/^/  /'
done

echo
echo "== Заголовки безопасности (ожидается 4 заголовка, без x-powered-by)"
curl -sI "$BASE/" | grep -i -E '^(x-content-type-options|referrer-policy|x-frame-options|permissions-policy|x-powered-by)'
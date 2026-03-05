#!/usr/bin/env bash
# Safe auto-fixes: remove duplicate exact lines, dedupe CSS link hrefs, fix CSS unbalanced braces by appending '}' if needed.
set -e
TS=$(date +%s)
BACKUP_DIR="backups/fix-$TS"
mkdir -p "$BACKUP_DIR"
echo "Backing up project to $BACKUP_DIR"
cp -r . "$BACKUP_DIR/.."

echo
echo "-> 1) Remove exact duplicate lines in index.html (keeps first occurrence)"
if [ -f index.html ]; then
  awk '!seen[$0]++' index.html > index.html.tmp && mv index.html.tmp index.html
  echo "   done."
else
  echo "   index.html not found, skipping."
fi

echo
echo "-> 2) Remove duplicate stylesheet hrefs across HTML files (preserve first occurrence)"
# This will remove duplicate exact <link ... rel="stylesheet"...> tags across files but keep first
grep -rhoP '<link[^>]+rel=["'\'']stylesheet["'\''][^>]*>' . | sed -E "s/.*href=['\"]([^'\"]+)['\"].*/\1/" | awk ' { if(!seen[$0]++){print $0} else {print "__DUP__"$0} } ' > /tmp/.csslinks.$$ || true
# For each duplicate, remove the duplicate link tags from files (preserve first)
awk '$0 ~ /^__DUP__/ {print substr($0,7)}' /tmp/.csslinks.$$ | while read -r dup; do
  # remove duplicate link tag occurrences (all but first)
  grep -rl --include="*.html" -F "href=\"$dup\"" . | while read -r f; do
    # remove duplicate occurrences inside the file if more than one
    count=$(grep -o "href=\"$dup\"" "$f" | wc -l)
    if [ "$count" -gt 1 ]; then
      # keep first, remove subsequent
      awk -vdup="href=\"$dup\"" 'BEGIN{c=0} { if(index($0,dup)){ c++; if(c>1){ gsub(dup,""); gsub("link rel=\"stylesheet\"",""); } } print }' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
      echo "   cleaned duplicates in $f for $dup"
    fi
  done
done || true
rm -f /tmp/.csslinks.$$ 2>/dev/null

echo
echo "-> 3) Fix CSS brace mismatches by appending closing braces if needed (safe auto-fix)"
for f in css/*.css; do
  [ -f "$f" ] || continue
  op=$(grep -o "{" "$f" | wc -l)
  cl=$(grep -o "}" "$f" | wc -l)
  if [ "$op" -gt "$cl" ]; then
    diff=$((op-cl))
    echo "   $f has $diff missing '}' -> appending $diff '}' to file end."
    for i in $(seq 1 $diff); do echo "}" >> "$f"; done
  fi
done

echo
echo "-> 4) Check local referenced files and print missing items (no auto-delete)"
grep -rhoP '(?:src|href)=["'\''](?!https?:|data:)([^"'\''#?]+)' . | sort -u | while read -r f; do
  if [ ! -f "$f" ]; then
    echo "   MISSING: $f (please add or update reference)"
  fi
done || true

echo
echo "=== Auto-fix complete. IMPORTANT: HTML structural issues require manual review. ==="

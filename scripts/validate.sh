#!/usr/bin/env bash
# Simple validator: reports duplicates, missing files, css brace counts, and basic HTML tag balance check.

set -e

TS=$(date +%s)
BACKUP_DIR="backups/validate-$TS"
mkdir -p "$BACKUP_DIR"
echo "Backup of current files will be stored in $BACKUP_DIR"
cp -r * "$BACKUP_DIR" 2>/dev/null

echo "=== Running quick validation checks ==="

# 1) Duplicate exact lines in index.html
if [ -f index.html ]; then
  echo
  echo "-> Checking duplicate exact lines in index.html (shows duplicates if any)..."
  awk '{count[$0]++} END{for (line in count) if(count[line]>1) print count[line] "x => " line}' index.html | sed -n '1,200p' || true
else
  echo "index.html not found"
fi

# 2) Duplicate CSS link hrefs
echo
echo "-> Checking duplicate CSS <link> hrefs across HTML files..."
grep -rhoP '<link[^>]+rel=["'\'']stylesheet["'\''][^>]*>' . | sed -n '1,200p' | sed -n '1,200p' | sed -E "s/.*href=['\"]([^'\"]+)['\"].*/\1/" | sort | uniq -c | awk '$1>1{print $0}' || true

# 3) CSS brace balance
echo
echo "-> Checking CSS brace balance (counts { vs }) in css/ ..."
for f in css/*.css; do
  [ -f "$f" ] || continue
  openb=$(grep -o "{" "$f" | wc -l)
  closeb=$(grep -o "}" "$f" | wc -l)
  if [ "$openb" -ne "$closeb" ]; then
    echo "  $f : { = $openb , } = $closeb"
  fi
done

# 4) Missing local assets referenced in HTML/CSS/JS
echo
echo "-> Checking local file references (href/src) for missing files..."
# find local urls in html/css/js (skip http(s) and data:)
grep -rhoP '(?:src|href)=["'\''](?!https?:|data:)([^"'\''#?]+)' . | sort -u | while read -r f; do
  if [ ! -f "$f" ]; then
    echo "  MISSING: $f"
  fi
done || true

# 5) Basic HTML tag balance check (best-effort)
echo
echo "-> Running basic HTML tag balance check (best-effort). Void elements ignored."
python3 - <<'PY'
import re,sys,os
voids = set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"])
s=open("index.html","rb").read().decode("utf-8",errors="ignore") if os.path.exists("index.html") else ""
tags=re.findall(r'<\s*(/)?\s*([a-zA-Z0-9:-]+)[^>]*?/?>', s)
stack=[]
issues=[]
for closing,tag in tags:
    tag=tag.lower()
    if tag in voids:
        continue
    if closing:
        if stack and stack[-1]==tag:
            stack.pop()
        else:
            # mismatched close
            issues.append(("unexpected-close",tag))
    else:
        # opening
        stack.append(tag)
# report
if issues or stack:
    print("  HTML tag check: found problems.")
    if issues:
        for i in issues[:10]:
            print("   -",i)
    if stack:
        print("   - Unclosed tags (top 8):", stack[-8:])
    sys.exit(2)
else:
    print("  HTML tag check: no obvious unbalanced tags found.")
PY

echo
echo "=== Validation complete ==="

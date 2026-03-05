#!/bin/bash

echo "=============================="
echo " BADAWY TV SYSTEM VALIDATOR"
echo "=============================="

echo ""
echo "Checking HTML structure..."
find . -type f -name "*.html" \
  -not -path "./backups/*" \
  -not -path "./components/*" \
  -not -name "*.bak" \
  -exec tidy -errors -quiet {} \;

echo ""
echo "Checking empty tags..."
grep -R "<a></a>" . || true
grep -R "<h1></h1>" . || true
grep -R "<p></p>" . || true

echo ""
echo "Checking duplicate JS..."
if [ -d "assets/js" ]; then
  find assets/js -name "*.js" -exec basename {} \; | sort | uniq -d
else
  echo "assets/js not found, skipping duplicate-JS check"
fi

echo ""
echo "Checking duplicate CSS..."
if [ -d "assets/css" ]; then
  find assets/css -name "*.css" -exec basename {} \; | sort | uniq -d
else
  echo "assets/css not found, skipping duplicate-CSS check"
fi

echo ""
echo "Checking missing images..."
grep -rhoE 'src=\"[^\"]+\.(png|jpg|jpeg|gif|webp|svg)\"' . \
  | cut -d\" -f2 \
  | while read -r img; do
      if [ -z \"$img\" ]; then
        continue
      fi
      if [ ! -f \"$img\" ]; then
        echo "Missing image: $img"
      fi
    done

echo ""
echo "Checking JavaScript syntax..."
if command -v node >/dev/null 2>&1; then
  if [ -d "assets/js" ]; then
    find assets/js -name "*.js" -exec node --check {} \; 2>/dev/null || true
  else
    echo "assets/js not found, skipping JS syntax check"
  fi
else
  echo "node not installed — skipping JS syntax check"
fi

echo ""
echo "Validation complete."

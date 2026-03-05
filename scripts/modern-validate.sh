#!/bin/bash

echo "=============================="
echo " BADAWY TV SYSTEM VALIDATOR"
echo "=============================="

echo ""
echo "Checking HTML structure..."
find . -type f -name "*.html" \
-not -path "./backups/*" \
-not -name "*.bak" \
-not -name "*.backup" \
-exec tidy -errors -quiet {} \;

echo ""
echo "Checking empty tags..."
grep -R "<a></a>" . || true
grep -R "<h1></h1>" . || true
grep -R "<p></p>" . || true

echo ""
echo "Checking duplicate JS..."
find assets/js -name "*.js" -exec basename {} \; | sort | uniq -d

echo ""
echo "Checking duplicate CSS..."
find assets/css -name "*.css" -exec basename {} \; | sort | uniq -d

echo ""
echo "Checking missing images..."
grep -rho 'src="[^"]*"' . | cut -d'"' -f2 | while read img; do
    [ -f "$img" ] || echo "Missing image: $img"
done

echo ""
echo "Checking JavaScript syntax..."
find assets/js -name "*.js" -exec node --check {} \; 2>/dev/null || true

echo ""
echo "Validation complete."

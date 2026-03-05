#!/data/data/com.termux/files/usr/bin/bash

echo "=============================="
echo " BADAWY TV AUTO FIX ENGINE"
echo "=============================="

echo ""
echo "Fixing HTML..."

htmlhint index.html --fix 2>/dev/null || true

echo ""
echo "Fixing CSS..."

npx stylelint "css/*.css" --fix 2>/dev/null || true

echo ""
echo "Fixing JavaScript..."

npx eslint js/*.js --fix 2>/dev/null || true

echo ""
echo "Formatting entire project..."

prettier --write .

echo ""
echo "Auto repair complete."

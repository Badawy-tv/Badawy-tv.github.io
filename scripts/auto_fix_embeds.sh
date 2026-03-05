#!/usr/bin/env bash
set -euo pipefail

FILE="pages/lectures.html"
if [ ! -f "$FILE" ]; then
  echo "File $FILE not found"; exit 1
fi

# extract ids in order
mapfile -t IDS < <(grep -o 'youtube.com/embed/[A-Za-z0-9_-]*' "$FILE" | cut -d/ -f3)

if [ "${#IDS[@]}" -eq 0 ]; then
  echo "No youtube embeds found in $FILE"; exit 0
fi

echo "Found ${#IDS[@]} embed IDs — checking each..."

i=0
for id in "${IDS[@]}"; do
  i=$((i+1))
  printf "%2d) Checking %s ... " "$i" "$id"

  if curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json" | grep -q '"title"'; then
    echo "OK"
    continue
  fi

  echo "BROKEN -> searching replacement"

  # decide topic by slot (1-4 Salah, 5-8 Tawheed, 9-12 Seerah)
  if [ "$i" -le 4 ]; then
    query="best+salah+lecture"
    label="Salah lecture"
  elif [ "$i" -le 8 ]; then
    query="best+tawheed+lecture"
    label="Tawheed lecture"
  else
    query="best+seerah+lecture"
    label="Seerah lecture"
  fi

  # fetch YouTube search results HTML and extract first watch?v= ID
  # use timeout and retry small to avoid long hang
  SEARCH_HTML=$(curl -sL --max-time 10 "https://www.youtube.com/results?search_query=${query}" || true)
  NEWID=$(echo "$SEARCH_HTML" | grep -o 'watch?v=[A-Za-z0-9_-]*' | sed 's/watch?v=//' | sed 's/&.*//' | awk '!x[$0]++{print; exit}' || true)

  if [ -z "$NEWID" ]; then
    echo "No search result found, falling back to karSYnhOGfI"
    NEWID="karSYnhOGfI"
  else
    echo "Found $NEWID for $label"
  fi

  # replace occurrences of the broken id with the new id (safe global replace)
  sed -i "s|${id}|${NEWID}|g" "$FILE"

done

echo "Finished. Please review $FILE and then open the lectures page in browser."

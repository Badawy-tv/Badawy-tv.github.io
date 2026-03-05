#!/usr/bin/env bash
set -euo pipefail

FILE="pages/lectures.html"
TMP="/tmp/lectures.fix.$$"

# extract IDs in order
mapfile -t IDS < <(grep -o 'youtube.com/embed/[A-Za-z0-9_-]*' "$FILE" | cut -d/ -f3)

if [ "${#IDS[@]}" -eq 0 ]; then
  echo "No youtube embeds found in $FILE"
  exit 0
fi

echo "Found ${#IDS[@]} embed IDs — checking each..."

i=0
for id in "${IDS[@]}"; do
  i=$((i+1))
  echo -n "Checking $id ... "
  if curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json" | grep -q '"title"'; then
    echo "OK"
    continue
  fi
  echo "BROKEN — replacing with search placeholder"

  # decide topic by position: 1-4 Salah, 5-8 Tawheed, 9-12 Seerah
  if [ "$i" -le 4 ]; then
    topic_query="salah+lecture"
    topic_label="Salah lecture"
  elif [ "$i" -le 8 ]; then
    topic_query="tawheed+lecture"
    topic_label="Tawheed lecture"
  else
    topic_query="seerah+lecture"
    topic_label="Seerah lecture"
  fi

  # build replacement HTML (single-line)
  placeholder="<div class=\"video-card\"><a href=\"https://www.youtube.com/results?search_query=${topic_query}\" target=\"_blank\" rel=\"noopener\">🔎 Find a strong ${topic_label} on YouTube</a></div>"

  # replace the iframe element that contains this id with placeholder
  # use perl for robust multiline-safe replacement
  perl -0777 -pe "s#<iframe[^>]*${id}[^>]*></iframe>#$placeholder#gs" -i "$FILE"
done

echo "Finished checking embeds. Please review pages/lectures.html. Broken embeds were replaced by search placeholders."

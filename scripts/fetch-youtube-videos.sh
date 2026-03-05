#!/usr/bin/env bash
set -e
CHANNEL_URL="${1:-https://youtube.com/@ahmadbadawytv}"
OUT_DIR="data"
TMP="/tmp/badawytv_ytrss.$$"
mkdir -p "$OUT_DIR"

echo "Detecting channel id from $CHANNEL_URL ..."
CHANNEL_ID="$(curl -sL "$CHANNEL_URL" | grep -oP '\"channelId\"\s*:\s*\"\\K[^\"]+' | head -n1 || true)"
if [ -z "$CHANNEL_ID" ]; then
  # try alternative pattern
  CHANNEL_ID="$(curl -sL "$CHANNEL_URL" | grep -oP 'channelId=\\K[^\"]+' | head -n1 || true)"
fi
if [ -z "$CHANNEL_ID" ]; then
  echo "ERROR: could not detect channel id from $CHANNEL_URL"
  exit 1
fi
echo "Found channel id: $CHANNEL_ID"

RSS_URL="https://www.youtube.com/feeds/videos.xml?channel_id=$CHANNEL_ID"
echo "Downloading RSS feed..."
curl -sL "$RSS_URL" -o "$TMP"

if [ ! -s "$TMP" ]; then
  echo "ERROR: failed to download RSS feed $RSS_URL"
  exit 1
fi

# parse entries -> produce JSON array of {id,title}
echo "Parsing RSS and building $OUT_DIR/videos.json ..."
awk 'BEGIN{RS="</entry>"; ORS=""; print "["} /<entry>/{ if(match($0, /<yt:videoId>([^<]+)<\/yt:videoId>/,m) && match($0, /<title>([^<]+)<\/title>/,t)) { gsub(/["\\]/,"",t[1]); printf "{\"id\":\"%s\",\"title\":\"%s\"},\n", m[1], t[1] } } END{print "]"}' "$TMP" \
  | sed ':a;N;$!ba;s/,\n]/\n]/' > "$OUT_DIR/videos.json.tmp" \
  && mv "$OUT_DIR/videos.json.tmp" "$OUT_DIR/videos.json"

echo "Saved $(jq -r '. | length' "$OUT_DIR/videos.json" 2>/dev/null || echo 'N/A') videos to $OUT_DIR/videos.json"
rm -f "$TMP"
echo "Done."

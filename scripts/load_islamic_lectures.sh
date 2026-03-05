#!/usr/bin/env bash

FILE="pages/lectures.html"
API="AIzaSyCiv6whXRujv8cwN-1qfqThbC_FDeYknZE"

get_videos () {
query=$1
curl -s "https://www.googleapis.com/youtube/v3/search?part=id&type=video&maxResults=10&q=$query&key=$API" | grep videoId | cut -d '"' -f4
}

SALAH=$(get_videos "mufti+menk+salah+lecture")
TAWHEED=$(get_videos "yasir+qadhi+tawheed+lecture")
SEERAH=$(get_videos "omar+suleiman+seerah+lecture")

{
echo "<h2>Salah Lectures</h2>"
for id in $SALAH; do
echo "<iframe width=\"350\" height=\"200\" src=\"https://www.youtube.com/embed/$id\" frameborder=\"0\" allowfullscreen></iframe>"
done

echo "<h2>Tawheed Lectures</h2>"
for id in $TAWHEED; do
echo "<iframe width=\"350\" height=\"200\" src=\"https://www.youtube.com/embed/$id\" frameborder=\"0\" allowfullscreen></iframe>"
done

echo "<h2>Seerah Lectures</h2>"
for id in $SEERAH; do
echo "<iframe width=\"350\" height=\"200\" src=\"https://www.youtube.com/embed/$id\" frameborder=\"0\" allowfullscreen></iframe>"
done

} > "$FILE"

echo "Lectures page rebuilt successfully."

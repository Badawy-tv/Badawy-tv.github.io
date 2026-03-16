#!/data/data/com.termux/files/usr/bin/bash
# Kill old instances
pkill -f "node server.js"
pkill -f "./ngrok http 3000"

# Start Node server in background screen
screen -dmS live-server node server.js

# Wait a second for server to start
sleep 2

# Start ngrok in background screen
screen -dmS ngrok-live ./ngrok http 3000

# Give ngrok time to connect
sleep 5

# Fetch and display public ngrok URL
NGROK_URL=$(curl --silent http://127.0.0.1:4040/api/tunnels | grep -o 'https://[a-z0-9]*\.ngrok.io')
echo "Your live server is now running at: $NGROK_URL"

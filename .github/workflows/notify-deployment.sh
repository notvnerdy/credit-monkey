#!/bin/bash
# Simple deployment notification script
# This notifies the server to pull latest changes

set -e

SERVER_HOST="108.179.232.14"
SERVER_USER="dionros"
SERVER_PATH="/home4/dionros/public_html"
SSH_KEY="$HOME/.ssh/github_actions_deploy"

echo "🚀 Notifying server to pull latest changes..."

ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_HOST" << 'EOF'
cd /home4/dionros/public_html
git pull origin main
echo "✅ Deployment completed on server"
EOF

echo "✅ Deployment notification sent successfully"
